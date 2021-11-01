import React, { useState } from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectGame, changeCurrentCell } from '../../store/slices/game';
import { getHorizontalPosition, getBackgroundColorOfCell } from '../../helpers/game.helper';
import styles from './GameArea.module.scss';

const BORDER_WIDTH = 2;

export const GameAreaComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { area, currentCell, logger } = useAppSelector(selectGame);
    const { coubCoord, cellCoord } = currentCell;

    const [areaSize, setAreaSize] = useState<number>(0);

    const areaRef = (node: HTMLDivElement) => {
        if (!node) return;

        setAreaSize(node.getBoundingClientRect().width - BORDER_WIDTH);
    };

    const coubSize = areaSize / 3;
    const cellSize = coubSize / 3;

    if (!area.length) {
        return null;
    }

    const currentValue = area[coubCoord][cellCoord].value;

    return (
        <div ref={areaRef} className={styles.area}>
            <Stage width={areaSize} height={areaSize}>
                <Layer>
                    {area.map((subArea, index) => (
                        <Group
                            x={getHorizontalPosition(index) * coubSize}
                            y={Math.floor(index / 3) * coubSize}
                            width={coubSize}
                            height={coubSize}
                            key={index + 'subArea'}
                        >
                            <Rect x={0} y={0} width={coubSize} height={coubSize} stroke="#344861" strokeWidth={2} />
                            {subArea.map((item, subIndex) => (
                                <Group
                                    x={getHorizontalPosition(subIndex) * cellSize}
                                    y={Math.floor(subIndex / 3) * cellSize}
                                    width={cellSize}
                                    height={cellSize}
                                    key={index + subIndex + 'cell'}
                                    onClick={() =>
                                        dispatch(changeCurrentCell({ coubCoord: index, cellCoord: subIndex }))
                                    }
                                >
                                    <Rect
                                        x={0}
                                        y={0}
                                        width={cellSize}
                                        height={cellSize}
                                        fill={getBackgroundColorOfCell(currentCell, index, subIndex, area)}
                                        stroke="#eaeef4"
                                        strokeWidth={0.5}
                                    />
                                    {item && (
                                        <Text
                                            text={item.value}
                                            fontSize={30}
                                            fontFamily="Arial"
                                            fontStyle="normal"
                                            fill={!!item.byUser ? '#0065c8' : '#344861'}
                                            align="center"
                                            verticalAlign="middle"
                                            width={cellSize}
                                            height={cellSize}
                                            x={0}
                                            y={0}
                                        />
                                    )}
                                </Group>
                            ))}
                        </Group>
                    ))}
                </Layer>
            </Stage>
        </div>
    );
};
