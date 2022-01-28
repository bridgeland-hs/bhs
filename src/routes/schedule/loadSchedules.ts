import schedules from '../../schedule.json';
import Period from './Period';

function getPeriods(thing: any[]): Period[] {
    return thing.map(n => new Period(n.name, n.start, n.end));
}

type schedule = {
    before_lunch: Period[],
    lunch_a: Period[],
    lunch_b: Period[],
    lunch_c: Period[],
    lunch_d: Period[],
    after_lunch: Period[],
}

type out = Map<string, schedule>

export const load = (): out => {
    const val: out = new Map<string, schedule>();
    for (const key in schedules) {
        const sched = schedules[key];

        const sch: schedule = {
            before_lunch: getPeriods(sched.before_lunch),
            lunch_a: getPeriods(sched.lunch_a),
            lunch_b: getPeriods(sched.lunch_b),
            lunch_c: getPeriods(sched.lunch_c),
            lunch_d: getPeriods(sched.lunch_d),
            after_lunch: getPeriods(sched.after_lunch),

        };

        val.set(key, sch);
    }
    return val;
};
