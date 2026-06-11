import { Application } from "@/lib/types";
import { ApplicationStoreInterface } from "./application-store.interface";

export class LocalApplicationStore implements ApplicationStoreInterface {
    async getApplications(): Promise<Application[]> {
        const data = localStorage.getItem('applications');
        return data ? JSON.parse(data) : [];
    }

    async getApplication(id: string): Promise<Application | undefined> {
        const data = localStorage.getItem('applications');
        if (!data) return undefined;
        var applications = JSON.parse(data) as Application[];

        const res = applications.find(a => a.id === id);
        return res;
    }

    async createApplication(application: Application): Promise<void> {
        const data = localStorage.getItem('applications');
        var applications = data ? JSON.parse(data) as Application[] : [];
        applications.push(application);
        localStorage.setItem('applications', JSON.stringify(applications));
    }

    async updateApplication(update: Application): Promise<void> {
        update.lastUpdate = new Date();
        const data = localStorage.getItem('applications');
        if (!data) return;
        var applications = JSON.parse(data) as Application[];

        var updatedApps = applications.filter(a => a.id !== update.id);
        updatedApps.push(update);
        localStorage.setItem('applications', JSON.stringify(updatedApps));
    }

    async deleteApplication(id: string): Promise<void> {
        const data = localStorage.getItem('applications');
        if (!data) return;
        var applications = JSON.parse(data) as Application[];

        var updatedApps = applications.filter(a => a.id !== id);
        localStorage.setItem('applications', JSON.stringify(updatedApps));
    }

    async deleteApplications(): Promise<void> {
        localStorage.removeItem("applications");
    }
}