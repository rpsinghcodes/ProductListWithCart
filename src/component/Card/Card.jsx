import { motion } from 'framer-motion'

export default function Card({ category, name, price, img, onAddToCart, items, addQuantity, reduceQuantity }) {


    // const isCart = false;
    const isCart = items.some(item => item.name === name);
    const index = items.findIndex(item => item.name === name);
    return (

        <div className="flex flex-col relative">
            <motion.div className="h-80 w-[20.9rem] mobile:w-80 mobile:h-64 ">
                <motion.img layout transition={{ duration: 0.1 }} animate={{
                    borderWidth: isCart ? "4px" : "0px", // Animating the border width
                    borderColor: isCart ? "#F43F5E" : "transparent" // Ensuring border color matches when border is applied
                }} src={img.desktop} className="border-rose-600 h-full w-full object-contain mobile:object-cover rounded-3xl overflow-hidden" alt="Waffle" />
                
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 200 }}
                className={` ${isCart ? "bg-rose-600" : "bg-white"}  inline-block rounded-3xl absolute border border-rose-600 w-[70%]  left-[15%] mobile:left-[15%] bottom-[18%] mobile:bottom-[21%] text-center m-auto px-6 py-2  `}
            >
                {!isCart ? <button onClick={() => onAddToCart(name, price, img)}>
                    <img src='images/icon-add-to-cart.svg' alt='add-to-cart' className="inline-block" />
                    <span> Add To Cart</span>
                </button> :
                    <div whileHover={{ scale: 1.3 }} transition={{ type: "spring" }} className="text-white flex justify-around items-center">
                        <button onClick={() => reduceQuantity(name)} className="border rounded-full h-4 w-4 text-center flex items-center justify-center">
                            <img src='images/icon-decrement-quantity.svg' alt='icon-decrement' />
                        </button>
                        <span>{items[index].quantity}</span>
                        <button onClick={() => addQuantity(name)} className="border rounded-full h-4 w-4 text-center flex items-center justify-center">
                            <img src='images/icon-increment-quantity.svg' alt='icon-increment' />
                        </button>
                    </div>
                }

            </motion.div>
            <div className="flex flex-col mt-4">
                <span className="text-rose-300">{category}</span>
                <span className="font-bold text-base">{name}</span>
                <span className="text-rose-700 font-bold text-lg">${price}</span>
            </div>
        </div>
    )
}