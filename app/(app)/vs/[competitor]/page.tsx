import CompetitorPage from "./competitorPage";

interface Props {
    params: Promise<{
        competitor: string;
    }>;
}

export async function generateMetadata({ params }: Props) {
    const { competitor } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    return {
        title: "Competitive advantage",
        description: "Why we are better than our competitors.",
        alternates: {
            canonical: `${baseUrl}/job/${competitor}`
        }
    };
}

export default function Page() {
    return (
        <CompetitorPage  />
    )
}