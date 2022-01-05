import React , { useReducer, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import DatePicker from "react-datepicker";

import { setImage } from '../../Components/Header/Header';
import Stars from '../../Components/Stars/Stars';
import EditBookStyle from './EditBookStyle';
import { StateContext } from '../../App';
import api from '../../actions/api';
import Store from './Store';

const defaultValidate = {
    author: true,
    imageUrl: true,
    rate: true,
    category_id: true,
    names: {},
}

const defaultState = {
    book: null,
    validate: defaultValidate,
    clearErrorValidate: false
}

let interval = null;
const extinctionErrorValidSeconds = 5000;

/*
 * Komponent edytujący książkę
 **/

const EditBook = () => {

    const CONTEXT = useContext(StateContext);
    const [state, setState] = useReducer(Store, defaultState);
    const { id } = useParams();
    const history = useHistory();
    const { addToast } = useToasts();

    useEffect(() => {
        if (+id > 0){
            const data = CONTEXT.books.find(b => b.id === +id);
            if (data){
                setState({ type: 'SET_BOOK', data });
            }
        } else {
            setState({ type: 'SET_BOOK', data: null });
        }

        return () => {
            clearTimeout(interval);
        }
    },[id, CONTEXT.books]);

    useEffect(() => {
        if (CONTEXT.langs.length > 0){
            setState({ type: 'SET_VALID_NAMES', data: CONTEXT.langs });
        }
    },[CONTEXT.langs]);

    useEffect(() => {
        if (state.clearErrorValidate){
            interval = setTimeout(() => {
                setState({ type: 'SET_CLEAR_ERR_VALIDATE', data: false });
                const names = {};
                CONTEXT.langs.forEach(lang => {
                    names[lang.code] = true;
                });

                setState({
                    type: 'SET_FIELD',
                    data: {...defaultValidate, names },
                    field: 'validate'
                });
            },extinctionErrorValidSeconds);
        }
    },[state.clearErrorValidate]);

    const handleChangeData = (ev, field) => {
        setState({
            type: 'SET_FIELD_BOOK',
            data: ev.target.value,
            field
        });
    }

    const handleSetField = (field, value) => {
        setState({
            type: 'SET_FIELD_BOOK',
            data: value,
            field
        });
    }

    const submitAction = ev => {
        ev.preventDefault();

        const names = {};
        CONTEXT.langs.forEach(lang => {
            names[lang.code] = true;
        });

        const validate = {...defaultValidate, names };

        if (!state.book?.author || state.book?.author?.length < 2){
            validate.author = false;
        }

        if (!state.book?.imageUrl || state.book?.imageUrl?.length < 2){
            validate.imageUrl = false;
        }

        if (!(state.book?.rate >= 1)){
            validate.rate = false;
        }

        if (!(state.book?.category_id > 0)){
            validate.category_id = false;
        }

        let validNames = true;

        Object.keys(state.validate.names).map((key) => {
            const dataLang = CONTEXT.langs.find(lang => lang.code === key);
            const name = state.book?.names?.find(n => n.lang_id === dataLang.id)?.name || '';
            if (name.length < 2 ){
                validate.names[dataLang.code] = false;
                validNames = false;
            }
        })

        setState({
            type: 'SET_FIELD',
            data: validate,
            field: 'validate'
        });

        if (validate.author && validate.imageUrl && validate.rate && validate.category_id && validNames){
            // zapisujemy dane

            // jeśli do jest nowa książka
            if (+id === 0){
                api('books',state.book,r => {
                    if (r.result){
                        addToast('Dodałem nową książkę', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000 });
                        CONTEXT.setState({ type: 'SET_BOOKS', data: [...CONTEXT.books,...[r.data]] });
                        history.push("books/"+r.data.id);
                    } else {
                        addToast(r.comm, { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000 });
                    }
                },'post');
            } else {
                api('books/'+state.book.id,state.book,r => {
                    if (r.result){
                        addToast('Zmieniłem dane książki', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000 });
                        CONTEXT.setState({ type: 'SET_BOOKS', data: CONTEXT.books.map(book => {
                            if (book.id === state.book.id) {
                                if (state.book?.dateStart && typeof state.book.dateStart === 'object') state.book.dateStart = state.book.dateStart.toISOString();
                                if (state.book?.dateEnd && typeof state.book.dateEnd === 'object') state.book.dateEnd = state.book.dateEnd.toISOString();
                                return state.book
                            };
                            return book;
                        }) });
                    } else {
                        addToast(r.comm, { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000 });
                    }
                },'patch');
            }
            
        } else {
            setState({ type: 'SET_CLEAR_ERR_VALIDATE', data: true });
            addToast('Wypełnij poprawnie zaznaczone pola', { appearance: 'error' });
        }

    }

    const setLangName = (value, lang) => {

        let idValue = 1;
        if (state.book?.names){
            // idValue = state.book.names.reduce((acc, value) => acc > value ? acc : value,0);
            const bookName = state.book.names.find(name => name.lang_id === lang.id);
            if (bookName){
                idValue = bookName.id;
            } else {
                idValue = state.book.names.reduce((acc, value) => acc > value.id ? acc : value.id,0) + 1;
            }
        }

        const data = {
            id: idValue,
            lang_id: lang.id,
            name: value,
            default: !!lang?.default
        }

        let names = null;
        if (!state.book?.names){
            names = [data];
        } else {
            if (state.book.names.some(name => name.id === data.id)){
                names = state.book.names.map(name => {
                    if (name.id === data.id) name = data;
                    return name;
                });
            } else {
                names = [...state.book.names, ...[data]];
            }
        }

        setState({
            type: 'SET_FIELD_BOOK',
            data: names,
            field: 'names'
        });

    }

    const handleChangeCategory = ev => {
        setState({
            type: 'SET_FIELD_BOOK',
            data: +ev.target.value,
            field: 'category_id'
        });
        setState({ type: 'SET_CLEAR_FOCUS', field: 'category_id', data: true })
    }

    const gateDate = dateField => {
        if (state.book?.[dateField]){
            if (typeof state.book[dateField] === 'string'){
                return new Date(state.book[dateField]);
            } else {
                return state.book[dateField];
            }
        }
        return null;
    }

    const handleBackToList = () => {
        history.push("/books");
    }

    return (
        <EditBookStyle>
            <form onSubmit={submitAction}>
                <div className="row">
                    <div className={"col col-50"+(!state.validate.author ? ' noValid' : '')}>
                        <label>Autor książki</label>
                        <input 
                            type="text" 
                            value={state.book?.author || ''} 
                            onChange={ev => handleChangeData(ev,'author')}
                            onFocus={() => setState({ type: 'SET_CLEAR_FOCUS', field: 'author', data: true })}
                        />
                    </div>
                    <div className={"col col-50"+(!state.validate.rate ? ' noValid' : '')}>
                        <label>Ocena</label>
                        <Stars 
                            rate={state.book?.rate || 0} 
                            actionSetRate={rate => {
                                handleSetField('rate',rate);
                                setState({ type: 'SET_CLEAR_FOCUS', field: 'rate', data: true })
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col col-50">
                        <label>Data rozpoczęcia</label>
                        <DatePicker
                            selected={gateDate('dateStart')}
                            onChange={data => setState({ type: 'SET_FIELD_BOOK', data, field: 'dateStart' })}
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div className="col col-50">
                        <label>Data zakończenia</label>
                        <DatePicker
                            selected={gateDate('dateEnd')}
                            onChange={data => setState({ type: 'SET_FIELD_BOOK', data, field: 'dateEnd' })}
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className={"col col-30"+(!state.validate.imageUrl ? ' noValid' : '')}>
                        <label>Url zdjęcia</label>
                        <input 
                            value={state.book?.imageUrl || ''} 
                            onChange={ev => handleSetField('imageUrl',ev.target.value)} 
                            onFocus={() => setState({ type: 'SET_CLEAR_FOCUS', field: 'imageUrl', data: true })}
                        />
                    </div>
                    <div className="col col-30">
                        <label>Tagi</label>
                        <input value={state.book?.tags || ''} onChange={ev => handleSetField('tags',ev.target.value)} />
                    </div>
                    <div className={"col col-30"+(!state.validate.category_id ? ' noValid' : '')}>
                        <label>Kategoria</label>
                        {(CONTEXT.categories && CONTEXT.categories.length>0) ?
                            <select onChange={handleChangeCategory} value={state.book?.category_id || 0}>
                                <option value={0} disabled>-- wybierz kategorię --</option>
                                {CONTEXT.categories.map(cat => (
                                    <option key={`cat_${cat.id}`} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select> :
                            <div className="Empty">-</div>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>Tytuł książki</label>
                        <div className="names">
                            {CONTEXT.langs.map(lang => (
                                <div className={"langCol"+(CONTEXT.actualLang?.id === lang.id ? ' selected' : '')} key={`lang_layer_${lang.id}`}>
                                    <img src={setImage(lang.code)} />
                                    <input
                                        className={!state.validate.names[lang.code] ? 'noValid' : ''}
                                        type="text" 
                                        value={state.book?.names ? state.book?.names.find(n => n.lang_id === lang.id)?.name || '' : ''}
                                        onChange={ev => setLangName(ev.target.value,lang)}
                                        onFocus={ev => {
                                            setState({ type: 'SET_CLEAR_FOCUS_NAMES', field: lang.code, data: true });
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button type="submit">{!!(+id) ? 'Zapisz' : 'Dodaj'}</button>
                    <button type="button" onClick={handleBackToList}>Cofnij do listy książek</button>
                </div>
            </form>
        </EditBookStyle>
    );
}
export default EditBook;