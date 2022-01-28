import Period from './Period';

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

export const currentPeriod = (): Period => {
    // TODO;
    return null;
}

