import calendar from '../json/calendar.json';

export function titleCase(str: string) {
    return str.split('_')
        .map((w) => w[0].toUpperCase() + w.substring(1))
        .join(' ');
}

export function weekDays(startDate: Date, endDate: Date) {
    let count = 0;
    for (
        const curDate = new Date(startDate.getTime());
        curDate <= endDate;
        curDate.setDate(curDate.getDate() + 1)
    ) {
        const dayOfWeek = curDate.getDay();
        const [dateStr,] = curDate.toISOString().split('T');
        if (dayOfWeek !== 0
            && dayOfWeek !== 6
            && !(calendar.student_staff_holiday.includes(dateStr)
                || calendar.teacher_work_day.includes(dateStr)
                || calendar.professional_day.includes(dateStr)
            )
        ) {
            count++;
        }
        curDate.setDate(curDate.getDate() + 1);
    }
    return count;
}

export function toTime(twelveHr: boolean, date: Date, showSeconds = false): string {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (twelveHr && hours > 12) {
        hours -= 12;
        if (hours === 0) hours = 12;
    }

    const minutesS = minutes.toString().padStart(2, '0');
    const secondsS = seconds.toString().padStart(2, '0');

    let out = `${hours}:${minutesS}`;
    if (showSeconds) {
        out += `:${secondsS}`;
    }
    return out;

}

export function formatTime(seconds: number): string {
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;
    const hours = Math.floor(minutes / 60);
    minutes %= 60;

    let out = '';
    if (hours > 0) {
        out += `${hours}h `;
    }
    if (minutes > 0) {
        out += `${minutes}m `;
    }
    if (seconds > 0) {
        out += `${seconds}s `;
    }
    return out.trim();
}
