export const isSameSet = (set1, set2) => {
    if (set1 === set2) {
        return true;
    }
    if (set1.size !== set2.size) {
        return false;
    }
    for (const item of set1) {
        if (!set2.has(item)) {
            return false;
        }
    }
    return true;
};
