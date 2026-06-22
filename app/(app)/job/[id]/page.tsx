import JobPage from "./JobPage";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: Props) {
    const { id } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    return {
        title: "Job Application Details",
        description: "View and edit specific details from this job application.",
        alternates: {
            canonical: `${baseUrl}/job/${id}`
        }
    };
}

export default function Page() {
    return (<JobPage />)
}