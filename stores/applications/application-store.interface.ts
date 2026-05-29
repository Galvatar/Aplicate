import { Application } from "@/lib/types";

export interface ApplicationStoreInterface {
    getApplications(): Promise<Application[]>;
    getApplication(id: string): Promise<Application | undefined>;
    createApplication(application: Application): Promise<void>;
    updateApplication(update: Application): Promise<void>;
    deleteApplication(id: string): Promise<void>;
}