import Home from "./HomePage";

export async function generateMetadata() {
    const url = process.env.NEXT_PUBLIC_APP_URL;
    return {
        title: "Home",
        description: "Get key statistics about your application journey all on one page",
        alternates: {
            canonical: url + "/home"
        }
    };
}

export default function Page() {
    return (<Home />)
}