import { createContext, useState } from "react";
import { productsArray  , getProductData} from "./Product";


export const CartContext = createContext({
    items: [],
    getProductQuantity: () => { },
    addOneToCart: () => { },
    removeOneFromCart: () => { },
    deleteFromCart: () => { },
    getTotalCost: () => { }
});

export function CartProvider({ children }) {

    const [cartProducts, setCartProducts] = useState([]);

    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity;
        if (quantity === undefined) {
            return 0;
        }
        return quantity;
    }
    function addOneToCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 0) {
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        id: id,
                        quantity: 1
                    }
                ]
            )
        } else { // product is in cart
            // [{id:1 , quantity:3}, {id:2 ,quantity:1+1}]
            setCartProducts(
                cartProducts.map(
                    product =>
                        product.id === id ? { ...product, quantity: product.quantity + 1 }
                            : product
                )
            )
        }
    }
function removeOneFromCart(id){
    const quantity = getProductQuantity(id);

    if(quantity === 1){
        deleteFromCart(id);
    }else{
        setCartProducts(
            cartProducts.map(
                product =>
                    product.id === id ? { ...product, quantity: product.quantity - 1 }
                        : product
            )
        )
    }
}
    function deleteFromCart(id){
        // [ ] if an object meets a condition , add the object to array
        // [product1, product2 , product3]
        // [product1 , product2 after delete]
        setCartProducts(
            cartProducts=>
            cartProducts.filter(currentProduct=>{
                return currentProduct.id !== id;
            })
        )
    }

    function getTotalCost(){
        let totalCost = 0;
        cartProducts.map((cartItem)=>{
            const ProductData = getProductData(cartItem.id)
            totalCost += (ProductData.price * cartItem.quantity)
        }) ;
        return totalCost
    }
    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    }
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )

}

export default CartProvider