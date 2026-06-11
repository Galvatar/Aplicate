import { Application } from "@/lib/types";
import { ApplicationStoreInterface } from "./application-store.interface";
import { SupabaseClient } from "@supabase/supabase-js";

export class SupabaseApplicationStore implements ApplicationStoreInterface {
    private client: SupabaseClient;

    constructor(client: SupabaseClient) {
        this.client = client;
    }

    async getApplications(): Promise<Application[]> {
        const { data, error } = await this.client
            .from('Applications')
            .select('id, applied, lastUpdate, title, company, employmentType, foundOn, status, location, journey, rating')

        if (error) throw error;
        return data as Application[] || [];
    }

    async getApplication(id: string): Promise<Application | undefined> {
        const { data, error } = await this.client
            .from('Applications')
            .select('*')
            .eq('id', id)
            .single()
        if (error) {
            console.error("Supabase fetch failed for ID:", id, error); 
            return undefined;
        }
        return data as Application;
    }

    async createApplication(application: Application): Promise<void> {
        const { data, error } = await this.client
            .from('Applications')
            .insert(application)
        
        if (error) throw error;
    }

    async updateApplication(update: Application): Promise<void> {
        update.lastUpdate = new Date();
        const { data, error } = await this.client
            .from('Applications')
            .update(update)
            .eq('id', update.id)
        
        if (error) throw error;
    }

    async deleteApplication(id: string): Promise<void> {
        const { data, error } = await this.client
            .from('Applications')
            .delete()
            .eq('id', id)

        if (error) throw error;
    }

    async deleteApplications(): Promise<void> {
        const { data, error } = await this.client
            .from('Applications')
            .delete()
            .eq('userId', (await this.client.auth.getUser()).data.user?.id)

        if (error) throw error;
    }
}