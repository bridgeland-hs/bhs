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

export const surroundingPeriods = (schedule: string, lunch: string, date: Date): { prev: Period, current: Period, next: Period } | null => {
    const currSchedule = schedules.get(schedule);

    if (!currSchedule) return null;

    const periods: Period[] = Object.entries(currSchedule)
        .filter(([key, value]) => key.endsWith('lunch') || key.endsWith(lunch))
        .flatMap(Object.values);

    const out: { prev: Period, current: Period, next: Period } = {
        prev: null,
        current: null,
        next: null,
    };

    let i = 0;
    for (i; i < periods.length; i++) {

        out.prev = periods[i - 1] || null;
        out.current = periods[i] || null;

        if (out.current?.start > date) {
            out.next = out.current;
            out.current = null;
        }

        if (out.prev?.end < date && out.next?.start > date) {
            return out;
        }

    }

    return out;
};

