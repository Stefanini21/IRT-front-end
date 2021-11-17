export const selectDuplicatedEntryFlag = (state) => state.flipFlag.isDuplicatedEntry;
export const selectSuccessfulCreatedUserFlag = (state) => state.flipFlag.successfulCreated;
export const selectUserUpdatedFlag = (state) => state.flipFlag.userDataUpdated;
export const selectSuccessfulPasswordUpdateFlag = (state) => state.flipFlag.successfulPasswordUpdated;
export const selectSuccessfulPasswordSendFlag = (state) => state.flipFlag.successfulSendEmail;
export const selectFailPasswordSendFlag = (state) => state.flipFlag.failSendEmail;
export const selectFailPasswordUpdateFlag = (state) => state.flipFlag.failPasswordUpdate;

