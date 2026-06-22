import LoginPage from "./LoginPage";

export async function generateMetadata() {
    const url = process.env.NEXT_PUBLIC_APP_URL;
    return {
        title: "Sign in",
        description: "Get back into your dashboard",
        alternates: {
            canonical: url + "/login"
        }
    };
}

export default function Page() {
    return (<LoginPage />)
}