"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { useModal } from "@/components/ui/modal";

export default function DeleteAccountButton() {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const modal = useModal();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      "Are you absolutely sure you want to delete your account? This will disconnect your Gmail integration and permanently wipe all your data."
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      // 1. Fetch the active user object to get their ID safely
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error("Could not authenticate user session. Please log in again.");
      }

      const userId = user.id;

      // 2. NEW: Unlink Google Auth Identity directly from Supabase
      console.log("Checking for linked OAuth identities...");
      
      const { data, error: identitiesError } = await supabase.auth.getUserIdentities();
      
      if (!identitiesError && data?.identities) {
        const googleIdentity = data.identities.find((id) => id.provider === 'google');
        
        if (googleIdentity) {
          console.log("Unlinking Google OAuth identity...");
          const { error: unlinkError } = await supabase.auth.unlinkIdentity(googleIdentity);
          if (unlinkError) {
             console.warn("Failed to unlink Google identity, proceeding anyway:", unlinkError.message);
          }
        }
      }

      // 3. Disconnect integrated APIs FIRST while the session is still valid
      console.log("Disconnecting Gmail integration...");
      const gmailRes = await fetch('/api/gmail/disconnect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId }),
      });

      if (!gmailRes.ok) {
        const gmailData = await gmailRes.json();
    
        if (gmailRes.status === 404 || gmailData.error?.includes("No active connection")) {
          console.warn("No active Gmail connection found. Proceeding with account deletion.");
        } else {
          throw new Error(gmailData.error || "Failed to disconnect Gmail API.");
        }
      }

      // 4. Hit your core Next.js API endpoint to delete the user via Admin API
      console.log("Deleting core account data...");
      const accountRes = await fetch("/api/account", {
        method: "DELETE",
      });

      if (!accountRes.ok) {
        const accountData = await accountRes.json();
        throw new Error(accountData.error || "Failed to delete account");
      }

      // 5. Clear frontend tokens & cookies local to Supabase browser
      await supabase.auth.signOut();

      // 6. Send them back to the login page and refresh layout states
      router.push("/login");
      router.refresh();
      
    } catch (error: any) {
      alert(error.message || "An unexpected error occurred during deletion.");
    } finally {
      setIsDeleting(false);
      // Assuming modal is defined in your component scope
      modal.hide(); 
    }
  }

  return (
    <button
      type="button"
      onClick={handleDeleteAccount}
      disabled={isDeleting}
      className="w-full px-5 py-2.5 bg-error text-on-error rounded-lg text-sm font-bold hover:bg-error/80 disabled:opacity-50 transition-all"
    >
      {isDeleting ? "Deleting Account & Integrations..." : "Delete Account"}
    </button>
  );
}