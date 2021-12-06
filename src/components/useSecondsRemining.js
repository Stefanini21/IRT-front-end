import {getToken} from './utils';

// export type UseSecondsRemaining = [number];

// export type GetSecondsRemaining = number;

export const getSecondsRemaining = () => {
    const token = getToken();
    if (token !== null && typeof token !== 'undefined' && token.sessionSecondsRemaining !== null) 
    return token.sessionSecondsRemaining;

    return 0;
};

export const useSecondsRemaining = (allSecondsRemaining) => {
    return allSecondsRemaining;
};