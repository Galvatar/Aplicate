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
}

export enum Status {
    PreRegister = "PreRegister", Apply = "Apply", Assessment = "Assessment",
    Interview = "Interview", Offer = "Offer", Rejected = "Rejected"
}