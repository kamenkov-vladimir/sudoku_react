export interface GameType {
    id: number;
    mission: string;
    mode: string;
    solution: string;
    difficulty: {
        type: string;
    };
}
