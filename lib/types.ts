export interface SankeyData {

}

export interface Application {
    id?: string
    userId: string
    title: string
    company: string
    employmentType?: string
    foundOn?: string
    status: Status
    location?: string
    applied: Date
    lastUpdate: Date
    journey: string
    notes?: string
    jobDescription?: string
    pay?: string
    url?: string
    mainContact?: string
    minPay?: number
    maxPay?: number
    currency?: string
    rating: number
    closingDate?: Date | null
    followUpDate?: Date | null
    autoUpdated: boolean
}

export enum Status {
    PreRegister = "PreRegister", Apply = "Apply", Assessment = "Assessment",
    Interview = "Interview", Offer = "Offer", Rejected = "Rejected"
}

export interface GmailToken {
    id: string
    user_id: string
    access_token: string
    refresh_token: string
    expires_at: Date
    created_at?: Date
    last_history_id?: string
}

export interface Settings {
    active_columns: string[]
    first_time: boolean
}

export interface Subscription {
    id: string
    user_id: string
    subscription_id: string
    status: string
    variant_id: string
    renews_at?: string
    ends_at?: string
    customer_id?: string
    customer_portal_url?: string
    created_at: string
    updated_at: string
}