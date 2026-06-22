"use client"

import { useUser } from "@/hooks/use-user"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    LemonSqueezy: any;
    createLemonSqueezy: () => void;
  }
}

interface BuyButtonProps {
    yearly: boolean
    manage: boolean
}

export default function LemonButton({ yearly, manage }: BuyButtonProps) {
    const { user, subscription, isProUser } = useUser();
    const [isPro, setIsPro] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined" && window.LemonSqueezy) {
            window.LemonSqueezy.Setup({
                eventHandler: (event: { event: string }) => {
                    if (event.event === 'Checkout.Success') {
                        router.push('/settings'); 
                    }
                }
            });
        }
    }, [router]);

    const handleUpgrade = () => {
        const variantId = yearly 
            ? 'f1a11030-0ce9-4df5-be4c-b772c8b509e6' 
            : 'ea3cd3cd-8c58-4662-a5df-17254c76bb3c';
    
        const checkoutUrl = new URL(`https://aplicate.lemonsqueezy.com/checkout/buy/${variantId}`);
        
        checkoutUrl.searchParams.set('embed', '1');
        checkoutUrl.searchParams.set('logo', '1');
        checkoutUrl.searchParams.set('discount', '0');

        if (!user) {
            router.push('/signup');
            return;
        }
        
        if (user.id) {
            checkoutUrl.searchParams.set('checkout[custom][user_id]', user.id);
        }
        checkoutUrl.searchParams.set('checkout[custom][user_id]', user.id);
        window.LemonSqueezy.Url.Open(checkoutUrl.toString());
    };

    useEffect(() => {
        if (window.createLemonSqueezy) {
            window.createLemonSqueezy();
        }
    }, []);

    useEffect(() => {
        if (subscription == null) return;
        setIsPro(isProUser());
    }, [subscription])

    if (manage) {
        return (
            <button
                disabled={!isPro}
                onClick={() => window.LemonSqueezy.Url.Open(subscription?.customer_portal_url)}
                className="flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary justify-center gap-1 w-full py-3 bg-primary rounded-lg text-on-primary text-center font-medium hover:bg-primary/90 transition-colors"
            >
                Manage Subscription
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/>
                </svg>
            </button>
        )
    }

    return (
        <button
            disabled={isPro}
            onClick={handleUpgrade}
            className="w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary bg-primary rounded-lg text-on-primary text-center font-medium hover:bg-primary/60 transition-colors"
        >
            {!user ? 'Sign up/Sign' : 'Upgrade to Pro'}
        </button>
    )
}