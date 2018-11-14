export const swapBtnProps = (arr: any[], index: number, direction: "down" | "up"): { disabled?: boolean, readOnly?: boolean } => {
    if (arr.length < 2) {
        return { disabled: true, readOnly: true };
    }

    if (index === 0 && direction === "up") {
        return { disabled: true, readOnly: true };
    }

    if (index === arr.length - 1 && direction === "down") {
        return { disabled: true, readOnly: true };
    }
};