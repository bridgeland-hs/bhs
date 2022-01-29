export const load = async (file: string): Promise<any> => {
    try {
        const fileT = file.endsWith('.json') ? file : `${file}.json`;
        const url = `../json/${fileT}`;
        const response = await fetch(url);
        return response.json();
    } catch (ex) {
        console.error(ex);
        return null;
    }
};
