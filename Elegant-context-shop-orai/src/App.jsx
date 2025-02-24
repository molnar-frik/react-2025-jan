import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import {DUMMY_PRODUCTS} from './dummy-products.js';
import CartContextProvider from "./store/shopping-cart-context.jsx";
import Product from "./components/Product.jsx";

function App() {

    // A CartContextProvider komponens körülveszi az alkalmazást, hogy a kosár állapotát kezelje.
    // A Header tartalmazza az alkalmazás fejlécét, beleértve a kosár gombot, amely megnyitja a kosár modált, ill. a kosárban lévő termékek számát is megjeleníti.
    // A Shop komponens belsejében a DUMMY_PRODUCTS tömb elemei egyesével megjelennek a Product komponens segítségével.

    return (
        <CartContextProvider>
            <Header/>
            <Shop>
                {DUMMY_PRODUCTS.map((product) => (
                    <li key = {product.id}>
                        <Product {...product}/>
                    </li>
                ))}
            </Shop>
        </CartContextProvider>
    );
}

export default App;
