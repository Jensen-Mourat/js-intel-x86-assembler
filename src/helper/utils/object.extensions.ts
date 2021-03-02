export const removeFalsy = (obj: any): any => {
    if (obj) {
        for (const [key, value] of Object.entries(obj)) {
            if (!obj[key]) {
                delete obj[key];
            }
        }
        return obj;
    }
    return undefined;
};
