import ResetPasswordPage from "./ResetPassword";

export async function generateMetadata() {
    const url = process.env.NEXT_PUBLIC_APP_URL;
    return {
        title: "Reset Password",
        description: "Set your new password",
        alternates: {
            canonical: url + "/reset"
        }
    };
}

export default function Page() {
    return (<ResetPasswordPage />)
}