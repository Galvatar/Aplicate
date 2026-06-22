import Statistics from "./StatisticsPage";

export async function generateMetadata() {
    const url = process.env.NEXT_PUBLIC_APP_URL;
    return {
        title: "About us",
        description: "Find out what aplicate is all about.",
        alternates: {
            canonical: url + "/statistics"
        }
    };
}

export default function Page() {
    return (<Statistics />)
}