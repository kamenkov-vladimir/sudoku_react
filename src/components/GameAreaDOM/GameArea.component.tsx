import React from 'react';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectGame, changeCurrentCell } from '../../store/slices/game';
import { classNames } from '../../helpers/classNames.helper';
import { getDirectionCells } from '../../helpers/game.helper';
import styles from './GameArea.module.scss';

export const GameAreaComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { area, currentCell, logger } = useAppSelector(selectGame);
    const { coubCoord, cellCoord } = currentCell;

    if (!area.length) {
        return null;
    }

    console.log(logger);

    const currentValue = area[coubCoord][cellCoord].value;
    const { horizontal: horizontalCell, vertical: verticalCell } = getDirectionCells(cellCoord);
    const { horizontal: horizontalCoub, vertical: verticalCoub } = getDirectionCells(coubCoord);

    return (
        <div className={styles.area}>
            {area.map((subArea, index) => (
                <div className={styles.subArea} key={index + 'subArea'}>
                    {subArea.map((item, subIndex) => (
                        <div
                            onClick={() => dispatch(changeCurrentCell({ coubCoord: index, cellCoord: subIndex }))}
                            className={classNames({
                                [styles.cell]: true,
                                [styles.directionCell]:
                                    index === coubCoord ||
                                    (horizontalCell.includes(subIndex) && horizontalCoub.includes(index)) ||
                                    (verticalCell.includes(subIndex) && verticalCoub.includes(index)),
                                [styles.similarValue]: !!currentValue && currentValue === item.value,
                                [styles.activeCell]: coubCoord === index && cellCoord === subIndex,
                                [styles.userNumber]: !!item.byUser,
                            })}
                            key={index + subIndex + 'cell'}
                        >
                            {item && item.value}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
