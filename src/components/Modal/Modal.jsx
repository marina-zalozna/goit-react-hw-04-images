import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('root');

export function Modal({ onClose, modalImage }) {
  useEffect(() => {
    const handleKeyDown = e => {
        if (e.code === 'Escape') {
         onClose();
        }
    };
    
    const handleCloseClick = e => {

        if (e.currenttarget !== e.target) {
        onClose();
        }      
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('click', handleCloseClick)

    return () => {
        window.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('click', handleCloseClick)
    } 
})

  return createPortal(
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src={modalImage} alt="modalPicture" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalImage: PropTypes.string.isRequired,
};

// import React, { Component } from 'react';
// import { createPortal } from 'react-dom';
// import css from './Modal.module.css';
// import PropTypes from 'prop-types';

// const modalRoot = document.getElementById('root');

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleCloseClick = e => {
//     if (e.currenttarget !== e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={css.Overlay} onClick={this.handleCloseClick}>
//         <div className={css.Modal}>
//           <img src={this.props.modalImage} alt="modalPicture" />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }

// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   modalImage: PropTypes.string.isRequired,
// };
