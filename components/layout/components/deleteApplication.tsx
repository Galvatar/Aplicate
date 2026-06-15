import { useModal } from "@/components/ui/modal";
import { useApplications } from "@/hooks/use-applications";
import { Application } from "@/lib/types";
import { useRouter } from "next/navigation";

interface DeleteApplicationProps {
  app: Application;
}

export default function DeleteApplication({ app }: DeleteApplicationProps) {
  const { deleteApplication, loading } = useApplications();
  const modal = useModal();
  const router = useRouter();

  async function handleDelete() {
    if (loading) return;
    if (app.id) await deleteApplication(app.id);
    modal.hideWithRefresh();
    router.push("/applications");
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="font-jakarta flex flex-col max-w-110 bg-surface-container p-8 rounded-xl">
        <span className="flex justify-between items-start">
          <div className="text-error bg-error/20 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm330.5-51.5Q520-263 520-280t-11.5-28.5Q497-320 480-320t-28.5 11.5Q440-297 440-280t11.5 28.5Q463-240 480-240t28.5-11.5ZM440-360h80v-200h-80v200Zm40-100Z" />
            </svg>
          </div>
          <button
            onClick={() => modal.hide()}
            className="text-on-surface hover:bg-surface-container-lowest/50 p-1 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </span>
        <h1 className="font-bold text-2xl tracking-tight mt-5">
          Remove Application?
        </h1>
        <p className="mt-3">
          This will permanently remove the application for <b>{app.title}</b> at{" "}
          <b>{app.company}</b>. This action cannot be undone.
        </p>
        <div className="flex gap-3 mt-8">
          <button
            onClick={() => modal.hide()}
            className="w-full py-3 font-bold  rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete()}
            className="w-full py-3 font-bold text-error-container  rounded-xl bg-error/80 hover:bg-error transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
