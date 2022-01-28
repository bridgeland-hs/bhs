let data: LocalData;

export const defData: LocalData = {
    lunch: 'a',
    hr24: true,
    clock: true,
};

export type LocalData = {
    lunch: 'a' | 'b' | 'c' | 'd';
    hr24: boolean;
    clock: boolean;
}
