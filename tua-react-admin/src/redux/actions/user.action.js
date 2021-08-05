// import axios from "../../helper/axios";
import axios from "axios";
import { api } from "../../urlConfig";
import { userContants } from "./constants";

export const getAllUser = () => {


    console.log("aaa")
    return async dispatch => {

        dispatch({ type: userContants.GET_ALL_USERS_REQUEST });
        const res = await axios.get(`${api}/user`);
        console.log("res", res);
        if (res.status === 200) {

            const { items } = res.data;
            dispatch({
                type: userContants.GET_ALL_USERS_SUCCESS,
                payload: { users: items }
            });
        } else {
            dispatch({
                type: userContants.GET_ALL_USERS_FAILURE,
                payload: { error: res.data.error }
            });
        }


    }
}

