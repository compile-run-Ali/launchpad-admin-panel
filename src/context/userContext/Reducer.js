export default function UserReducer(state, action) {
    switch (action.type) {
        case "SET_USER":
            return {
                user: action.payload
            }
        default:
            return state;
    }
}