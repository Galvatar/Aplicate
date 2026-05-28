export interface SankeyData {

}

export interface Application {
    id: string
    title: string
    company: string
    role?: string
    foundOn?: string
    status: string
    location?: string
    applied: Date
    lastUpdate: Date
    journey: string
    notes?: string
    jobDescription?: string
    pay?: number
}