export function getValueFromSubType(subType) {
    const match = subType.match(/\d+/);
    return !!match?.length ? match[match?.length - 1] : '';
}
