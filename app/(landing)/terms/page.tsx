import TermsAndConditionsPage from "./TNCsPage";

export async function generateMetadata() {
    const url = process.env.NEXT_PUBLIC_APP_URL;
    return {
        title: "Terms and Conditions",
        description: "The conditions for using aplicate",
        alternates: {
            canonical: url + "/terms"
        }
    };
}

export default function Page() {
    return (<TermsAndConditionsPage />)
}