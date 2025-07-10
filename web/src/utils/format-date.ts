const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' })
const relativeFormatter = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' })

export function formatDate(date: Date | string): string {
    if (typeof date === 'string') {
        date = new Date(date)
    }
    return formatter.format(date)
}

export function formatRelative(date: Date | string): string {
    if (typeof date === 'string') {
        date = new Date(date)
    }

    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 0) {
        return 'no futuro'
    }

    if (diffInSeconds < 60) {
        return relativeFormatter.format(-diffInSeconds, 'second')
    } else if (diffInSeconds < 3600) {
        return relativeFormatter.format(-Math.floor(diffInSeconds / 60), 'minute')
    } else if (diffInSeconds < 86400) {
        return relativeFormatter.format(-Math.floor(diffInSeconds / 3600), 'hour')
    } else {
        return relativeFormatter.format(-Math.floor(diffInSeconds / 86400), 'day')
    }
}