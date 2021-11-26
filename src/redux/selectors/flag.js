export const selectDuplicatedEntryFlag = (state) => state.flipFlag.isDuplicatedEntry;
export const selectSuccessfulCreatedUserFlag = (state) => state.flipFlag.successfulCreated;
export const selectButtonPressedCreatedTicketFlag = (state) => state.flipFlag.buttonCreateTicketPressed;
export const selectUserUpdatedFlag = (state) => state.flipFlag.userDataUpdated;
export const selectSuccessfulPasswordUpdateFlag = (state) => state.flipFlag.successfulPasswordUpdated;
export const selectSuccessfulPasswordSendFlag = (state) => state.flipFlag.successfulSendEmail;
export const selectFailPasswordSendFlag = (state) => state.flipFlag.failSendEmail;
export const selectFailPasswordUpdateFlag = (state) => state.flipFlag.failPasswordUpdate;
export const selectTicketUpdatedFlag = (state) => state.flipFlag.ticketDataUpdated;
export const selectDuplicatedTitleFlag = (state) => state.flipFlag.isDuplicatedTitle;
export const selectSuccessfulForgotPasswordUpdateFlag = (state) => state.flipFlag.successfulForgotPasswordUpdated;
export const selectFailForgotPasswordUpdateFlag = (state) => state.flipFlag.failForgotPasswordUpdate;
<<<<<<< HEAD
export const selectUserWithTasksFlag = (state) => state.flipFlag.withTasks;
=======
export const selectIsDeletedFlag = (state) => state.flipFlag.isDeleted;
export const selectWithTicketsFlag = (state) => state.flipFlag.withTickets;

>>>>>>> 9269e145f7928ccb77a2c3da0de25254dd70ec3c
