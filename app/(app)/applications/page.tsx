import Applications from "./ApplicationsPage";

export async function generateMetadata() {
    const url = process.env.NEXT_PUBLIC_APP_URL;
    return {
        title: "Applications",
        description: "View all your applications in a table",
        alternates: {
            canonical: url + "/applications"
        }
    };
}

export default function Page() {
    return (<Applications />)
}