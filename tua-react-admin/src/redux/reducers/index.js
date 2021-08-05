import ThemeReducer from "./ThemeReducer"
import CategoryReducer from "./CategoryReducer"
import UserReducer from "./UserReducer"
import { combineReducers } from "redux"
import AuthReducer from "./AuthReducer";

const rootReducer = combineReducers({
    categoryReducer: CategoryReducer,
    userReducer: UserReducer,
    themeReducer: ThemeReducer,
    authReducer: AuthReducer
});

export default rootReducer;