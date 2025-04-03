export interface Launch {
    id: string
    name: string
    date_utc: string
    details: string | null
    success: boolean
    upcoming: boolean
    links: {
        patch: {
            small: string | null
            large: string | null
        }
        flickr: {
            original: string[]
        }
        webcast: string | null
        youtube_id: string | null
        article: string | null
    }
    launchpad: {
        name: string
    }
    payloads: {
        id: string
        name: string
        type: string
        customers: string[]
    }[]
}