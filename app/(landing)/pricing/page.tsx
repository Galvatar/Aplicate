import PricingPage from "./PricingPage";

export async function generateMetadata() {
    const url = process.env.NEXT_PUBLIC_APP_URL;
    return {
        title: "Pricing",
        description: "Stop typing and start automating",
        alternates: {
            canonical: url + "/pricing"
        }
    };
}

export default function Page() {
    return (<PricingPage />)
}