import SignupPage from "./SignupPage";

export async function generateMetadata() {
    const url = process.env.NEXT_PUBLIC_APP_URL;
    return {
        title: "Sign up",
        description: "Create your account for free today",
        alternates: {
            canonical: url + "/signup"
        }
    };
}

export default function Page() {
    return (<SignupPage />)
}