import PrivacyPolicyPage from "./PrivacyPolicyPage";

export async function generateMetadata() {
    const url = process.env.NEXT_PUBLIC_APP_URL;
    return {
        title: "Privacy Policy",
        description: "How we use your data and keep it safe.",
        alternates: {
            canonical: url + "/privacy"
        }
    };
}

export default function Page() {
    return (<PrivacyPolicyPage />)
}