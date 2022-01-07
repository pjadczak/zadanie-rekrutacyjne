import React , { useState, useEffect, useContext } from 'react';
import Lottie from "lottie-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

import Confirm from '../../Components/Confirm/Confirm';
import { stringDateToFormat } from '../../actions/functions';
import Stars from '../../Components/Stars/Stars';
import BooksListStyle from './BooksListStyle';
import { StateContext } from '../../App';
import api from '../../actions/api';

import LottieNotFound from "../../assets/lotties/86045-no-data-found-json.json";

const BooksList = () => {

    const CONTEXT = useContext(StateContext);
    const [showConfirmData, setShowConfirmData] = useState(null);
    const history = useHistory();
    const [search, setSearch] = useState('');
    const [books,setBooks] = useState(CONTEXT.books);
    const [categoryId,setCategoryId] = useState(0);

    useEffect(() => {
        setBooks(CONTEXT.books);
    },[CONTEXT.books]);

    useEffect(() => {
        let tmpBooks = CONTEXT.books;
        if (search !== ''){
            tmpBooks = CONTEXT.books.filter(book => {

                let  valid = false;
                if (search){
                    if (book.author.toLowerCase().indexOf(search.toLowerCase()) >=0){
                        valid = true;
                    }
                    if (!valid && book.tags && book.tags.toLowerCase().indexOf(search.toLowerCase()) >=0){
                        valid = true;
                    }
                    if (!valid && book?.names && book.names.some(book => book.name.toLowerCase().indexOf(search.toLowerCase()) >=0 )){
                        valid = true;
                    }
                }

                return valid;
            })
        }

        if (categoryId>0){
            tmpBooks = tmpBooks.filter(book => book?.category_id === categoryId);
        }

        setBooks(tmpBooks);
    },[search, categoryId]);

    const getName = book => {
        const name = book.names.find(n => n.lang_id === CONTEXT.actualLang.id);
        if (name) return name.name;
        const nameOther = book.names.find(n => n?.default );
        if (nameOther){
            return nameOther.name;
        }
        return ' - ';
    }

    const handleRemoveBook = (ev,book) => {
        ev.preventDefault();
        ev.stopPropagation();
        setShowConfirmData(book);

    }

    const actionRemoveBook = () => {
        api('books/'+showConfirmData.id,{},r => {
            if (r.result){
                CONTEXT.setState({ type: 'SET_BOOKS', data: CONTEXT.books.filter(book => book.id !== showConfirmData.id) });
                setShowConfirmData(null);
            }
        },'delete');
    }

    const handleShowBook = (ev,book) => {
        ev.stopPropagation();
        history.push("books/"+book.id);
    }

    const getCategory = book => {
        const category = CONTEXT.categories.find(cat => cat.id === book.category_id);
        if (category){
            return category.name;
        }
        return '-';
    }

    return (
        <BooksListStyle>
            {CONTEXT.books.length>0 &&
                <div className="filter">
                    <div className="search searchCategory">
                        <label>Kategoria</label>
                        <select onChange={ev => setCategoryId(+ev.target.value)} value={categoryId}>
                            <option value={0}>-- Wszystkie --</option>
                            {CONTEXT.categories.map(cat => (
                                <option key={`cat_${cat.id}`} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="search searchName">
                        <label>Szukaj</label>
                        <input type="text" value={search} onChange={ev => setSearch(ev.target.value)} />
                    </div>
                </div>
            }
            {CONTEXT.books.length === 0 ?
                <div className="notFound">
                    <Lottie
                        animationData={LottieNotFound}
                        style={{ maxWidth: 400 }}
                    />
                </div> :
                <div className="list">
                    {books.map(book => (
                        <div className="book" key={`book_${book.id}`} onClick={ev => handleShowBook(ev,book)}>

                            <div className="image">
                                {book.imageUrl &&
                                    <img src={book.imageUrl} />
                                }
                            </div>

                            <div className="bookBody">
                                <div className="name">
                                    {getName(book)}
                                </div>
                                <div className="stars">
                                    <Stars rate={book.rate} />
                                </div>
                                <div className="category">
                                    {book.author} / {getCategory(book)}
                                </div>
                            </div>
                            <div className="dates">
                                Data rozpoczęcia: <strong>{book?.dateStart ? stringDateToFormat(book.dateStart) : '-'}</strong><br />
                                Data zakończenia: <strong>{book?.dateEnd ? stringDateToFormat(book.dateEnd) : '-'}</strong>
                            </div>

                            <div className="actions">
                                <a className="remove" href="" onClick={ev => handleRemoveBook(ev,book)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </a>
                            </div>

                        </div>
                    ))}
                </div>
            }
            {showConfirmData &&
                <Confirm
                    label={"Usunięcie"}
                    title={"Czy na pewno usunąć tę książkę ?"}
                    content={"Książka na pewno jest dobra, operacji nie można cofnąć!"}
                    closeModal={() => setShowConfirmData(null)}
                    action={actionRemoveBook}
                    actionLabel="Usuń książkę"
                />
            }
        </BooksListStyle>
    );
}
export default BooksList;