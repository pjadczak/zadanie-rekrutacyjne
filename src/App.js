import React , { useEffect, useReducer } from 'react';

import AppStyle, { GlobalStyle } from './AppStyle';
import Header from './Components/Header/Header';
import Routing from './Routing/Routing';
import Store from './actions/Store';
import api from './actions/api';

export const StateContext = React.createContext({});

const defaultState = {
    books: [],
    categories: [],
    langs: [],
    actualLang: null
}

const App = () => {

    const [state, setState] = useReducer(Store, defaultState);

    useEffect(() => {
        readData();
    },[]);

    const readData = () => {
        api('db',{}, r => {
            setState({ type: 'SET_ALL_DATA', data: r.data });
        },"get");
    }

    const Context = { ...state, setState };

    return (
        <StateContext.Provider value={Context}>
            <GlobalStyle />
            <AppStyle>
                <div className="body">
                    <Header CONTEXT={Context} />
                    <div className="dataContext">
                        <Routing />
                    </div>
                </div>
            </AppStyle>
        </StateContext.Provider>
    );
}
export default App;