import React , { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBook } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

import HeaderStyle from './HeaderStyle';

import ImgPl from '../../assets/images/flags/pl.png';
import ImgDe from '../../assets/images/flags/de.png';
import ImgEn from '../../assets/images/flags/en.png';

const Header = ({ CONTEXT }) => {

    const handleChangeLang = (ev,langId) => {
        ev.preventDefault();

        const lang = CONTEXT.langs.find(l => l.id === langId);
        if (lang){
            CONTEXT.setState({ type: 'SET_LANG', data: lang });
        }
    }

    return (
        <HeaderStyle>
            <h1>
                Zarządzanie książkami
                <span>
                    Wykonanie: <strong>Paweł Jadczak</strong><br />
                    e-mail: <a href="mailto:majgot@gmail.com">majgot@gmail.com</a><br />
                    tel.: 609 777 384
                </span>
            </h1>
            <div className="langs">
                <ul>
                    {CONTEXT.langs.map(lang => (
                        <li key={`k_${lang.id}`} className={CONTEXT.actualLang?.id === lang.id ? 'selected' : ''}>
                            <a href="#" onClick={ev => handleChangeLang(ev,lang.id)}>
                                <img src={setImage(lang.code)} />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="actions">
                <ul>
                    <li>
                        <Link to={"/books/0"}><FontAwesomeIcon icon={faPlus} /> Dodaj nową książkę</Link>
                    </li>
                    <li>
                        <Link to={"/books"}><FontAwesomeIcon icon={faBook} /> List wszystkich książek</Link>
                    </li>
                </ul>
            </div>
        </HeaderStyle>
    );
}
export default Header;

export const setImage = code => {
    switch(code){

        case 'de': return ImgDe;
        case 'en': return ImgEn;

        default: return ImgPl;

    }
}