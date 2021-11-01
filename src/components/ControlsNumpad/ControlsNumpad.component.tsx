import React, { useEffect, useCallback } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { updateCurrentAreaIfEditable, clearValueIfEditable } from '../../store/slices/game';
import styles from './ControlsNumpad.module.scss';

export const ControlsNumpadComponent: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleUserKeyPress = useCallback(
        (event: any) => {
            const { key, keyCode } = event;

            if (keyCode >= 49 && keyCode <= 57) {
                dispatch(updateCurrentAreaIfEditable(parseInt(key)));
            }

            if (keyCode === 46 || keyCode === 8) {
                dispatch(clearValueIfEditable());
            }
        },
        [dispatch]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);

        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, []);

    return (
        <div className={styles.numpad}>
            {Array.from({ length: 9 }, (_, i) => i + 1).map((i) => (
                <button onClick={() => dispatch(updateCurrentAreaIfEditable(i))} key={i}>
                    {i}
                </button>
            ))}
        </div>
    );
};
