import {useContext, useRef} from 'react';
import CartModal from './CartModal.jsx';
import {CartContext} from "../store/shopping-cart-context.jsx";

export default function Header({}) {

    // A <CartModal> komponens refernciába kerül
    const modal = useRef();

    // Az useContext egy React hook, amely lehetővé teszi, hogy egy komponens hozzáférjen egy kontextus értékéhez.
    // A CartContext segítségével a Header komponens hozzáfér a kosár állapotához és a benne lévő termékekhez.
    // Ezt kizárólag a kosárban lévő termékek mennyiségének meghatározására használjuk fel: cartQuantity

    const {items} = useContext(CartContext);
    const cartQuantity = items.length;

    // Futtatja referenciában lévő <CartModal> open függvényét

    function handleOpenCartClick() {
        modal.current.open();
    }

    // Futtatja referenciában lévő <CartModal> close függvényét

    function handleCloseModal() {
        modal.current.close();
    }

    // Futtatja referenciában lévő <CartModal> checkout függvényét és bezárja a modalt

    function handleCheckout() {
        // Nem töltötte fel a végleges verziót, nem tudom hogy megy a pénztár
        console.log("Proceeding to checkout...");
        handleCloseModal();
    }

    // A modalActions egy vagy két gombot tartalmaz
    // Ha van valami a kosárban akkor megjelenik a Checkout gomb is

    let modalActions = <button onClick = {handleCloseModal}>Close</button>;

    if (cartQuantity > 0) {
        modalActions = (
            <>
                <button onClick = {handleCloseModal}>Close</button>
                <button onClick = {handleCheckout}>Checkout</button>
            </>
        );
    }

    return (
        <>
            <CartModal
                ref = {modal}
                title = "Your Cart"
                actions = {modalActions}
            />
            <header id = "main-header">
                <div id = "main-title">
                    <img src = "logo.png" alt = "Elegant model"/>
                    <h1>Elegant Context</h1>
                </div>
                <p>
                    <button onClick = {handleOpenCartClick}>Cart ({cartQuantity})</button>
                </p>
            </header>
        </>
    );
}
