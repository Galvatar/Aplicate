import RefundsPage from "./RefundsPage";

export async function generateMetadata() {
    const url = process.env.NEXT_PUBLIC_APP_URL;
    return {
        title: "Refund policy",
        description: "How we handle your refunds.",
        alternates: {
            canonical: url + "/refund"
        }
    };
}

export default function Page() {
    return (<RefundsPage />)
}