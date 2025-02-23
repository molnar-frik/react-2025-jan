import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import { createPortal } from 'react-dom';

function  Modal ({ modalIsOpen, onClose, children }){
  const dialog = useRef();
  
  useEffect(() => {
    if(modalIsOpen) {
      dialog.current.showModal();
    }else{
      dialog.current.close();
    }
  }, [modalIsOpen]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
