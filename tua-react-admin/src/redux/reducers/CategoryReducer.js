const initState = {
    categories: [],
    loading: false,
    error: null
};


const CategoryReducer = (state = initState, action) => {
    switch(action.type) {
        case 'SET_MODE':
            return {
                ...state,
                mode: action.payload
            }
        case 'SET_COLOR':
            return {
                ...state,
                color: action.payload
            }
        default:
            return state
    }
}

export default CategoryReducer