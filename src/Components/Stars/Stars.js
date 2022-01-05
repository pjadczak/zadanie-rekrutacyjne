import React , { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons'

import StarsStyle from './StarsStyle';

const colors = ['orange','#dfdfdf','lightblue'];

const Stars = ({ rate, max = 10, actionSetRate }) => {

    const [overRate, setOverRate] = useState(null);

    const changeColor = i => {
        if (overRate !== null){
            if (overRate >= i){
                return colors[2]
            } else {
                return colors[1]
            }
        } else {
            if (rate > i){
                return colors[0]
            } else {
                return colors[1]
            }
        }
    }

    return (
        <StarsStyle onMouseOut={() => setOverRate(null)}>
            {[ ...Array(max).keys() ].map( i => (
                <div className="star" key={`star_${i}`} onMouseOver={() => actionSetRate ? setOverRate(i) : null} onClick={() => {
                    if (actionSetRate){
                        actionSetRate(i+1);
                        setOverRate(null);
                    }
                }}>
                    <FontAwesomeIcon icon={faStar} color={changeColor(i)} size={'lg'} />
                </div>
            ))}
        </StarsStyle>
    );
}
export default Stars;