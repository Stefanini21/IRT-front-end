export const flagActions = {
    RESET_EDIT_USER_FLAGS: "RESET_EDIT_USER_FLAGS"
}

export const resetEditUserFlags = () => (dispatch) => {
    console.log("hueta")
    return dispatch({
        type: flagActions.RESET_EDIT_USER_FLAGS,
    })
}