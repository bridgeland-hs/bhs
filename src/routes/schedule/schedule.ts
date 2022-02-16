import type Period from './Period';
import { load } from './loadSchedules';

export const today = new Date();

export const todaySchedule = () => {
    switch (today.getDay()) {
        case 1:
        case 2:
        case 4:
        case 5:
            return 'regular';
        case 3:
            return 'advisory';
        case 0:
        case 6:
            return null;
    }
};

const schedules = load();

export const surroundingPeriods = (schedule: string, lunch: string, date: Date = new Date()): { prev: Period, current: Period, next: Period } | null => {
    const currSchedule = schedules.get(schedule);

    if (!currSchedule) return null;

    const periods: Period[] = Object.entries(currSchedule)
        .filter(([key,]) => key.endsWith('lunch') || key.endsWith(lunch))
        .map(([, v]) => v)
        .flatMap(Object.values);

    const out: { prev: Period, current: Period, next: Period } = {
        prev: null,
        current: null,
        next: null,
    };
    const now = Date.now().valueOf();
    let i;
    for (i = 0; i < periods.length; ++i) {
        if (periods[i].end.valueOf() >= now) {
            break;
        }
    }
    if (periods[i].start.valueOf() > now) {
        out.prev = periods[i - 1];
        out.current = null;
        out.next = periods[i];
        return out;
    }
    out.prev = periods[i - 1];
    out.current = periods[i];
    out.next = periods[i + 1];

    return out;
};

