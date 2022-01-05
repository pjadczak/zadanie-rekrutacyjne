import React from 'react';
import Modal from 'react-modal';

import ConfirmStyle from './ConfirmStyle';

const Confirm = ({ title, content, closeModal, label, actionLabel, action }) => {

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.7)'
        }
      };

    return (
        <Modal
            isOpen
            onRequestClose={closeModal || null}
            style={customStyles}
            contentLabel={label}
            ariaHideApp={false}
        >
            <ConfirmStyle>
                <h2>{title}</h2>
                <div className="content">
                    {content}
                </div>
                <div className="buttons">
                    <button onClick={closeModal}>Zamknij</button>
                    <button onClick={action} className="action">{actionLabel}</button>
                </div>
            </ConfirmStyle>

      </Modal>
    );
}
export default Confirm;