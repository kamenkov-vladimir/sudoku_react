import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';

import { getLevel } from '../../api/Game/game.request';
import { prepareArea, GameCell } from '../../helpers/game.helper';

export interface CellCoords {
    coubCoord: number;
    cellCoord: number;
}

interface LoggerEvent {
    cell: CellCoords;
    prevValue: string;
    currentValue: string;
}

export interface GameState {
    level: string;
    area: GameCell[][];
    status: 'loading' | 'done';
    currentCell: CellCoords;
    logger: LoggerEvent[];
}

const initialState: GameState = {
    level: 'easy',
    area: [],
    status: 'loading',
    currentCell: { coubCoord: 0, cellCoord: 0 },
    logger: [],
};

export const getLevelAsync = createAsyncThunk('game/fetchLevel', async (type: string) => {
    const response = await getLevel(type);
    return response;
});

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        changeCurrentCell(state, action: PayloadAction<CellCoords>) {
            state.currentCell = action.payload;
        },
        updateCurrentArea(state, action: PayloadAction<number>) {
            const { coubCoord, cellCoord } = state.currentCell;

            state.logger.push({
                cell: state.currentCell,
                prevValue: state.area[coubCoord][cellCoord].value,
                currentValue: action.payload.toString(),
            });

            state.area[coubCoord][cellCoord] = {
                ...state.area[coubCoord][cellCoord],
                value: action.payload.toString(),
                byUser: true,
            };
        },
        setHintValue(state) {
            const { coubCoord, cellCoord } = state.currentCell;

            state.area[coubCoord][cellCoord] = {
                ...state.area[coubCoord][cellCoord],
                value: state.area[coubCoord][cellCoord].expectedValue,
                editable: false,
                byUser: false,
            };
        },
        clearValue(state) {
            const { coubCoord, cellCoord } = state.currentCell;

            state.logger.push({
                cell: state.currentCell,
                prevValue: state.area[coubCoord][cellCoord].value,
                currentValue: '',
            });

            state.area[coubCoord][cellCoord].value = '';
        },
        removeLogEvent(state) {
            if (state.logger.length) {
                const item = state.logger[state.logger.length - 1];
                const { coubCoord, cellCoord } = item.cell;

                state.currentCell = item.cell;
                state.area[coubCoord][cellCoord].value = item.prevValue;
            }

            state.logger.pop();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getLevelAsync.fulfilled, (state, action) => {
            const { mission, solution } = action.payload;

            state.status = 'done';
            state.area = prepareArea(mission, solution);
        });
    },
});

export const { changeCurrentCell, updateCurrentArea, setHintValue, clearValue, removeLogEvent } = gameSlice.actions;

// selectors functions
export const selectGame = (state: RootState) => state.game;

// conditions functions
export const updateCurrentAreaIfEditable =
    (num: number): AppThunk =>
    (dispatch, getState) => {
        const { currentCell, area } = selectGame(getState());
        const { coubCoord, cellCoord } = currentCell;

        if (area[coubCoord][cellCoord].editable) {
            dispatch(updateCurrentArea(num));
        }
    };

export const setHintIfEditable = (): AppThunk => (dispatch, getState) => {
    const { currentCell, area } = selectGame(getState());
    const { coubCoord, cellCoord } = currentCell;

    if (area[coubCoord][cellCoord].editable) {
        dispatch(setHintValue());
    }
};

export const clearValueIfEditable = (): AppThunk => (dispatch, getState) => {
    const { currentCell, area } = selectGame(getState());
    const { coubCoord, cellCoord } = currentCell;

    if (area[coubCoord][cellCoord].editable && area[coubCoord][cellCoord].value) {
        dispatch(clearValue());
    }
};

export default gameSlice.reducer;
