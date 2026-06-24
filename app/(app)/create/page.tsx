import ApplicationModal from "@/components/layout/components/applicationModal";

export async function generateMetadata() {
    const url = process.env.NEXT_PUBLIC_APP_URL;
    return {
        title: "Create",
        description: "Create a new application right from your mobile device",
        alternates: {
            canonical: url + "/create"
        }
    };
}

export default function page() {
    return (
        <ApplicationModal />
    )
}