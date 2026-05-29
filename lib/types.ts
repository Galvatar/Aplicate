export interface SankeyData {

}

export interface Application {
    id: string
    userId: string
    title: string
    company: string
    employmentType?: string
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