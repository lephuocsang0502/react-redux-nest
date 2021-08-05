import { userContants } from "../actions/constants"


const initState = {
    users: [],
    error: null,
    message: '',
    loading: false
}


const UserReducer = (state =initState,action)=>{

    console.log(action);
    switch(action.type) {
        case userContants.USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            }
            
        case userContants.USER_REGISTER_SUCCESS:
            return  {
                ...state,
                loading: false,
                message: action.payload.message
            }
    
        case userContants.USER_REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case userContants.GET_ALL_USERS_REQUEST:
            return{
                ...state,
                loading: true,
                ...action.payload
            }
        case userContants.GET_ALL_USERS_SUCCESS:
                return {
                    ...state,
                    users: action.payload.users
                }
            default:
                return state;
    }
}
export default UserReducer;