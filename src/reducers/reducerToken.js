const changeToken = (state = false, action) => {
    console.log(action)
    if (action.type ==="CHANGE") {
        return action.status;
    }
    else {
        return state;
    }

}
export default changeToken;