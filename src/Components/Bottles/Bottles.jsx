import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoredCart } from "../utilities/localstorage";

const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('Bottle.json')
            .then(res => res.json())
            .then(data => setBottles(data));
    }, []);

    // load cart from local storage
    useEffect(() => {
        console.log('called the useEffect', bottles.length)
        if (bottles.length > 0) {
            const storageCart = getStoredCart();
            console.log(storageCart, bottles);

            const saveCart = [];
            for (const id of storageCart) {
                console.log(id);
                const bottle = bottles.find(bottle => bottle.id === id);
                if (bottle) {
                    saveCart.push(bottle);
                }
            }
            console.log('saveItem', saveCart);
            setCart(saveCart);
        }
    }, [bottles])

    const handleAddToCart = bottle => {
        const newCart = [...cart, bottle];
        setCart(newCart);
        addToLS(bottle.id)
    }

    return (
        <div>
            <h2>Bottles Available: {bottles.length}</h2>
            <h3>Cart: {cart.length}</h3>
            <div className="bottle-container">
                {
                    bottles.map(bottle => <Bottle
                        key={bottle.id}
                        bottle={bottle}
                        handleAddToCart={handleAddToCart}>
                    </Bottle>)
                }
            </div>
        </div>
    );
};

export default Bottles;