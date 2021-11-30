import {getToken} from './utils.ts';

export type UseSecondsRemaining = [number];

export type GetSecondsRemaining = number;

export const getSecondsRemaining = (): GetSecondsRemaining => {
    const token = getToken();
    if (token !== null && typeof token !== 'undefined' && token.sessionSecondsRemaining !== null) return token.sessionSecondsRemaining;

    return 0;
};

export const useSecondsRemaining = (allSecondsRemaining: number): UseSecondsRemaining => {
    return [allSecondsRemaining];
};
