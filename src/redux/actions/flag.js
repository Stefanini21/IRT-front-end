export const flagActions = {
    RESET_EDIT_USER_FLAGS: "RESET_EDIT_USER_FLAGS"
}

export const resetEditUserFlags = () => (dispatch) => {
    return dispatch({
        type: flagActions.RESET_EDIT_USER_FLAGS,
    })
}