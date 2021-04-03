export const initialState = {
    user: null
};

const reducer = (state, action)  => {
    switch (action.type) {
   /*     case 'addAuthor':
            return {...state, authors: [...(state.authors || []), action.author]}
        case  'removeAuthor':
            return {...state, authors: [...state.authors.filter(author => author.name !== action.name)]}
        case 'setBook':
            return {
                ...state,
                book: [...(state.book || ""), action.book]}*/

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }


        default:
            return state;
    }
}

export default reducer;