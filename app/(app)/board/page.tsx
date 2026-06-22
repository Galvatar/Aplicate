import Board from "./BoardPage";

export async function generateMetadata() {
    const url = process.env.NEXT_PUBLIC_APP_URL;
    return {
        title: "Board",
        description: "View and move your applications from one status to the other",
        alternates: {
            canonical: url + "/board"
        }
    };
}

export default function Page() {
    return (<Board />)
}