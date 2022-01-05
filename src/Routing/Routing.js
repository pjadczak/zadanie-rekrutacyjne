import React from 'react';
import { Switch , Route, Redirect } from 'react-router-dom';

import BooksList from '../Pages/BooksList/BooksList';
import EditBook from '../Pages/EditBook/EditBook';

const Routing = () => {

    return (
        <Switch>
            <Route exact path={"/books"} component={BooksList} />
            <Route exact path={"/books/:id"} component={EditBook} />

            <Redirect from="/" to="/books" />
        </Switch>
    );
}
export default Routing;