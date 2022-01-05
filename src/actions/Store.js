const Store = (state, action) => {

    switch(action.type){

        case 'SET_ALL_DATA': 

            return {
                ...state,
                books: action.data.books,
                categories: action.data.categories,
                langs: action.data.langs,
                actualLang: action.data.langs.length > 0 ? ( action.data.langs.some(l => l.default) ? action.data.langs.find(l => l.default) : action.data.langs[0] ) : null
            }

        case 'SET_LANG':

            return {
                ...state,
                actualLang: action.data
            }

        case 'SET_BOOKS':

            return {
                ...state,
                books: action.data
            }

    }

    return {...state };
}

export default Store;