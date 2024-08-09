
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Cart({ cart, onRemoveItem, onConfirmOrder }) {
    const [showEmptyState, setShowEmptyState] = useState(cart.length === 0);

    // Update the empty state after the cart changes
    useEffect(() => {
        if (cart.length === 0) {
            // Delay the empty state to allow exit animations to finish
            const timeout = setTimeout(() => setShowEmptyState(true), 300); // Adjust the delay if necessary
            return () => clearTimeout(timeout);
        } else {
            setShowEmptyState(false);
        }
    }, [cart]);

    let totalQuantity = 0;
    cart.map(items => totalQuantity += items.totalPrice);

    return (
        <motion.div className="w-1/4 bg-white p-4 rounded-lg mobile:w-full mobile:mt-6">
            <h1 className="text-2xl font-bold text-rose-700">Your Cart({cart.length})</h1>
            
            <AnimatePresence>
                {cart.length === 0 && showEmptyState ? (
                    <motion.div
                        key="empty-state"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center p-2 gap-4"
                    >
                        <img src="images/illustration-empty-cart.svg" alt="empty cart" />
                        <p>Your added items will appear here</p>
                    </motion.div>
                ) : (
                    <>
                        {cart.map(item => (
                            <motion.div
                                key={item.name}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex justify-between items-center mt-3">
                                    <div>
                                        <span>{item.name}</span>
                                        <div className="flex gap-3">
                                            <span className="text-rose-700 font-semibold">{item.quantity}x</span>
                                            <span className="text-sm text-rose-400">@ ${item.price}</span>
                                            <span className="font-medium text-sm">${item.totalPrice}</span>
                                        </div>
                                    </div>
                                    <button
                                        className="border-2 rounded-full h-5 w-5 text-center flex items-center justify-center"
                                        onClick={() => onRemoveItem(item.name)}
                                    >
                                        <img src="images/icon-remove-item.svg" alt="remove-item-icon" />
                                    </button>
                                </div>
                                <hr className="mt-4" />
                            </motion.div>
                        ))}

                        <motion.div layout>
                            <div className="flex justify-between items-center py-6">
                                <span>Order Total</span>
                                <span className="font-bold text-lg">${totalQuantity}</span>
                            </div>
                            <div className="text-center bg-rose-100 py-4 justify-center rounded-lg flex items-center">
                                <img src="images/icon-carbon-neutral.svg" alt="carbon-neutral" className="mr-2" />
                                <span>This is a <b>carbon-neutral</b> delivery</span>
                            </div>

                            <button
                                className="block mx-auto bg-rose-700 text-sm text-white py-3 w-full mt-3 rounded-3xl"
                                onClick={onConfirmOrder}
                            >
                                Confirm Order
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

