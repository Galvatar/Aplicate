import AboutPage from "./AboutPage";

export async function generateMetadata() {
    const url = process.env.NEXT_PUBLIC_APP_URL;
    return {
        title: "About us",
        description: "Find out what aplicate is all about.",
        alternates: {
            canonical: url + "/about"
        }
    };
}

export default function Page() {
    return (<AboutPage />)
}