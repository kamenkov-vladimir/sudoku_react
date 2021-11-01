import axios from 'axios';

import { GameType } from './game.types';

export const getLevel = (type = 'easy'): Promise<GameType> => {
    // const { data } = await axios.get(`/api/level/${type}`);
    //return data;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 251,
                mission: '057940800204000196390100005031000200602350980500207000005602008760015009008730000',
                solution: '157946832284573196396128745831469257672351984549287613415692378763815429928734561',
                difficulty: { type: 'easy' },
                mode: 'classic',
            });
        }, 1000);
    });
};
