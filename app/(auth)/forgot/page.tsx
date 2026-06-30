import ForgotPasswordPage from "./ForgotPassword";

export async function generateMetadata() {
    const url = process.env.NEXT_PUBLIC_APP_URL;
    return {
        title: "Fogot Password",
        description: "Request for your password to be reset",
        alternates: {
            canonical: url + "/forgot"
        }
    };
}

export default function Page() {
    return (<ForgotPasswordPage />)
}