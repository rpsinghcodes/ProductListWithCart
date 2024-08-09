import { motion } from "framer-motion";

export default function Modal({ items, open, onNewOrder }) {

    let totalQuantity = 0;
    items.map(item => totalQuantity += item.totalPrice)
    return open && <motion.dialog initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} exit={{opacity:0, y: 30}} open={open}  className="z-10 p-4 rounded-lg w-[30%] mt-[5%] mobile:fixed mobile:bottom-0  mobile:w-[95%]" >
        <img src="images/icon-order-confirmed.svg" alt="confirm-order" />
        <h1 className="font-bold text-3xl">Order Confired</h1>
        <p className="text-customRed">We hope you enjoy your food!</p>
        <div >
            <div className="bg-rose-50 rounded-lg p-4 mt-5 mobile:overflow-auto mobile:max-h-[60vh] ">
                {/* Map this part of the code */}
                {items.map(item => (
                    <div key={item.name}>

                        <div className="flex justify-between items-center ">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12"> 
                                    <img src={item.img.thumbnail} alt="#" className="w-full h-full" />
                                </div>
                                <div>
                                    <h1 className="font-bold">{item.name}</h1>
                                    <div>
                                        <span className="text-customRed">{item.quantity}x</span>
                                        <span className="text-rose-300 ml-2">@ $5.50</span>
                                    </div>
                                </div>
                            </div>
                            <span className="font-bold ">${item.totalPrice}</span>
                        </div>
                        <hr className="m-4" />
                    </div>
                ))}

                <div className="flex justify-between">
                    <span>Order Total</span>
                    <span className="font-bold text-lg">${totalQuantity}</span>
                </div>
            </div>
        </div>
        <button onClick={onNewOrder} className="bg-customRed text-white rounded-full inline-block w-full py-3 mt-4">Start New Order</button>
    </motion.dialog>
}