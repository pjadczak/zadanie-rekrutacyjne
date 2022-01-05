const Store = (state,action) => {

    switch(action.type){

        case 'SET_BOOK':

            return {
                ...state, 
                book: action.data
            }

        case 'SET_FIELD_BOOK':

            return {
                ...state, 
                book: {
                    ...state.book,
                    [action.field]: action.data
                }
            }

        case 'SET_FIELD':

            return {
                ...state, 
                [action.field]: action.data
            }

        // zczytujemy do walidacji pola z każdym językiem
        case 'SET_VALID_NAMES':

            const names = {};
            action.data.forEach(lang => {
                names[lang.code] = true;
            });

            return {
                ...state,
                validate: {
                    ...state.validate,
                    names
                }
            }

        case 'SET_CLEAR_ERR_VALIDATE':

            return{
                ...state,
                clearErrorValidate: action.data
            }

        case 'SET_CLEAR_FOCUS':

            return {
                ...state,
                validate: {
                    ...state.validate,
                    [action.field]: action.data
                }
            }

        case 'SET_CLEAR_FOCUS_NAMES':

            return {
                ...state,
                validate: {
                    ...state.validate,
                    names: {
                        ...state.validate.names,
                        [action.field]: action.data
                    }
                }
            }

    }


    return {...state };
}

export default Store;