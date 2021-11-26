export const getUserListBySpecialty = (state) => state.ticket.usersList;
export const selectTicketId = (state) => state.ticket.ticketId;
export const selectTicketById = (state) => state.ticket.ticketById;
export const selectTicketList = (state) => state.ticket.ticketList;
export const selectTicketListForKanban = (state) => state.ticket.ticketListForKanban;
export const selectIsFetching = (state) => state.ticket.isFetching;
export const selectStatuses = (state) => state.ticket.statuses;
export const selectPriorities = (state) => state.ticket.priorities;
export const selestBacklogOneValue = (state) => state.kanban.backlogOneValue;
export const isDuplicateTicketTitle = (state) => state.ticket.isDuplicateTitle;

