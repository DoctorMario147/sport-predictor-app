export type Prediction = {
    home: string;
    away: string;
}

export type PredictionMap = {
    [fixtureId: number]: Prediction;
}

export type UpdatePredictionBody = {
    predictions: PredictionMap;
};