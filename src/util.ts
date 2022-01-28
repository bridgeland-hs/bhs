export function titleCase(str: string) {
    return str.split('_')
        .map((w) => w[0].toUpperCase() + w.substr(1))
        .join(' ');
}

export function weekDays(startDate: Date, endDate: Date) {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
        const dayOfWeek = curDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
        curDate.setDate(curDate.getDate() + 1);
    }
    return count;
}

export function toTime(twelveHr: boolean, date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes();

    if (twelveHr && hours > 12) {
        hours -= 12;
        if (hours === 0) hours = 12;
    }

    const minutesS = minutes.toString().padStart(2, '0');

    return `${hours}:${minutesS}`;

}
