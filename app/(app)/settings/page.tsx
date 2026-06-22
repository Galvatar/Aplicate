import SettingsPage from "./SettingsPage";

export async function generateMetadata() {
    const url = process.env.NEXT_PUBLIC_APP_URL;
    return {
        title: "Settings",
        description: "Customise your experience and toggle integrations",
        alternates: {
            canonical: url + "/settings"
        }
    };
}

export default function Page() {
    return (<SettingsPage />)
}