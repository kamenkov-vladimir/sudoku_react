import { CellCoords } from '../store/slices/game';

const AREA_SIZE = 9;
const VERTICAL_INDEXES = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];
const HORIZONTAL_INDEXES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
];

type DirectionCells = {
    vertical: number[];
    horizontal: number[];
};

export interface GameCell {
    editable: boolean;
    value: string;
    expectedValue: string;
    byUser?: boolean;
    // notes?: string[];
}

const getVerticalIndexes = (cell: number): Array<number> =>
    VERTICAL_INDEXES.find((item) => item.includes(cell)) || VERTICAL_INDEXES[0];
const getHorizontalIndexes = (cell: number): Array<number> =>
    HORIZONTAL_INDEXES.find((item) => item.includes(cell)) || HORIZONTAL_INDEXES[0];

const checkBasicValidation = (area: GameCell[][], cellValue: string, coubCell: number, cellCell: number): boolean => {
    return !!cellValue && area[coubCell].filter((i) => i.value === cellValue).length > 1;
};

export const prepareArea = (mission: string, solution: string): Array<Array<GameCell>> => {
    return mission.split('').reduce((acc: GameCell[][], item: any, index: number) => {
        const ch = Math.floor(index / AREA_SIZE);
        const element = {
            editable: !parseInt(item),
            value: item !== '0' ? item : '',
            expectedValue: solution[index],
        };

        if (!acc[ch]) {
            acc[ch] = [];
        }

        acc[ch].push(element);

        return acc;
    }, []);
};

export const getDirectionCells = (cell: number): DirectionCells => {
    return {
        vertical: getVerticalIndexes(cell),
        horizontal: getHorizontalIndexes(cell),
    };
};

export const getHorizontalPosition = (num: number): number => {
    // 0, 1, 2, 3, 4, 5, 6, 7, 8
    // 0, 1, 2, 0, 1, 2, 0, 1, 2
    let answer = num;

    if (answer >= 6) {
        answer = answer - 6;
    } else if (answer >= 3) {
        answer = answer - 3;
    }

    return answer;
};

export const getBackgroundColorOfCell = (
    currentCell: CellCoords,
    coubCell: number,
    cellCell: number,
    area: GameCell[][]
): string => {
    const { coubCoord, cellCoord } = currentCell;
    const currentValue = area[coubCoord][cellCoord].value;
    const cellValue = area[coubCell][cellCell].value;

    const { horizontal: horizontalCell, vertical: verticalCell } = getDirectionCells(cellCoord);
    const { horizontal: horizontalCoub, vertical: verticalCoub } = getDirectionCells(coubCoord);

    const inHorizontalLine = horizontalCell.includes(cellCell) && horizontalCoub.includes(coubCell);
    const inVerticalLine = verticalCell.includes(cellCell) && verticalCoub.includes(coubCell);

    switch (true) {
        case coubCoord === coubCell && cellCoord === cellCell:
            return '#bbdefb'; //$lightBlue
        case checkBasicValidation(area, cellValue, coubCell, cellCell):
            return '#f7cfd6';
        case coubCell === coubCoord || inHorizontalLine || inVerticalLine:
            return '#eaeef4'; //$mainGrey
        case !!currentValue && currentValue === cellValue:
            return '#dce3ed'; //$darkGrey
        default:
            return '#fff';
    }
};
