export const flagActions = {
    RESET_EDIT_USER_FLAGS: "RESET_EDIT_USER_FLAGS",
    RESET_EDIT_TICKET_FLAGS: "RESET_EDIT_TICKET_FLAGS",
    RESET_DELETE_USER_FLAGS: "RESET_DELETE_USER_FLAGS",

}

export const resetEditUserFlags = () => (dispatch) => {
    return dispatch({
        type: flagActions.RESET_EDIT_USER_FLAGS,
    })
}

export const resetEditTicketFlags = () => (dispatch) => {
    return dispatch({
        type: flagActions.RESET_EDIT_TICKET_FLAGS,
    })
}

export const resetDeleteUserFlags = () => (dispatch) => {
    return dispatch({
        type: flagActions.RESET_DELETE_USER_FLAGS,
    })
}