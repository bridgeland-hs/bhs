import { toTime } from '../../util';

export default class Period {

    name: string;
    start: Date;
    end: Date;

    constructor(name: string, start: string, end: string) {
        this.name = name;
        this.start = Period.getDate(start);
        this.end = Period.getDate(end);
    }

    public startTime(twelveHr: boolean): string {
        return toTime(twelveHr, this.start);
    }

    public endTime(twelveHr: boolean): string {
        return toTime(twelveHr, this.end);
    }

    /**
     * @param date
     * @return The amount of *seconds* until the period is over
     */
    public timeLeft(date: Date = new Date()): number {
        if (date < this.start || date > this.end) {
            return -1;
        }
        const endSeconds = this.end.valueOf() / 1000;
        const current = date.valueOf() / 1000;

        return Math.floor(endSeconds - current);
    }

    private static getDate(s: string): Date {
        const [hours, minutes] = s.split(':');
        const d = new Date();
        d.setHours(+hours, +minutes, 0, 0);
        return d;
    }
}
