export const classNames = (classes: Record<string, boolean>): string => {
    return Object.keys(classes)
        .filter((key) => classes[key])
        .map((key) => key)
        .join(' ');
};
