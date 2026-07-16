import Statistics from "./StatisticsPage";

export async function generateMetadata() {
    const url = process.env.NEXT_PUBLIC_APP_URL;
    return {
        title: "Statistics",
        description: "View how your applications have been performing.",
        alternates: {
            canonical: url + "/statistics"
        }
    };
}

export default function Page() {
    return (<Statistics />)
}