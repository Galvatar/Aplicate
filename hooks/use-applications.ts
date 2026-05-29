import { LocalApplicationStore } from "@/stores/applications/local-application-store";
import { SupabaseApplicationStore } from "@/stores/applications/supabase-application-store";
import { Application } from "@/lib/types";
import { useUser } from "./use-user";
import { useMemo } from "react";
import { supabase } from "@/lib/supabase/client";

export const useApplications = async () => {
    const { user } = useUser();
    const store = useMemo(() => {
        return user 
        ? new SupabaseApplicationStore(supabase) 
        : new LocalApplicationStore()
    }, [user])

    return {
        getApplications: () => store.getApplications(),
        getApplication: (id: string) => store.getApplication(id),
        createApplication: (application: Application) => store.createApplication(application),
        updateApplication: (update: Application) => store.updateApplication(update),
        deleteApplication: (id: string) => store.deleteApplication(id)
    }
}