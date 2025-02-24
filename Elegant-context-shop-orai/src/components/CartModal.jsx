import {forwardRef, useContext, useImperativeHandle, useRef} from 'react';
import {createPortal} from 'react-dom';
import Cart from './Cart';
import {CartContext} from "../store/shopping-cart-context.jsx";

// A <Header> komponens a felugró modal-t kezeli
// Kap egy title stringet és egy actions HTML-t (egy vagy két gomb)
// Benne van a <Cart> komponens, ami a kosár tartalmát listázza

const CartModal = forwardRef(function Modal(
    {title, actions},
    ref
) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                dialog.current.showModal();
            },
            close: () => {
                dialog.current.close();
            },
        };
    });

    return createPortal(
        <dialog id = "modal" ref = {dialog}>
            <h2>{title}</h2>
            <Cart/>
            <form method = "dialog" id = "modal-actions">
                {actions}
            </form>
        </dialog>,
        document.getElementById('modal')
    );
});

export default CartModal;
