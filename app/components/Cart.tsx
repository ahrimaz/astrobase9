'use client'

import Image from "next/image"
import { useCartStore } from "../store"
import formatPrice from "@/util/PriceFormat"
import {IoAddCircle, IoRemoveCircle} from 'react-icons/io5'
import basket from "@/public/basket.png"
import { motion, AnimatePresence } from 'framer-motion'
import Checkout from "./Checkout"

export default function Cart(){
    const cartStore = useCartStore()

    //total price of items
    const totalPrice = cartStore.cart.reduce((acc, item) => {
        return acc + item.unit_amount! * item.quantity!
    }, 0)

    return(
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
         onClick={() => cartStore.toggleCart()} 
         className="fixed w-full h-screen left-0 top-0 bg-black/50"
         >
            {/* cart */}
            <motion.div layout onClick={(e) => e.stopPropagation()} 
            className="bg-white absolute right-0 top-0 w-full h-screen p-12 overflow-y-scroll lg:w-2/5 text-slate-700"
            >
                {cartStore.onCheckout === 'cart' && (
                <button 
                    onClick={()=>cartStore.toggleCart()} 
                    className="text-sm font-bold pb-12">
                        back to store
                </button>
                )}
                {cartStore.onCheckout === 'checkout' && (
                <button 
                    onClick={()=>cartStore.setCheckout("cart")} 
                    className="text-sm font-bold pb-12">
                        check the cart
                </button>
                )}
                
                {/* cart items */}
                {cartStore.onCheckout === 'cart' && (
                    <>
                {cartStore.cart.map((item) => 
                <motion.div layout key={item.id} className="flex py-4 gap-4">
                    <Image 
                        className="rounded-md h-24" 
                        src={item.image} 
                        alt={item.name} 
                        width={120} 
                        height={120} 
                    />
                    <motion.div layout>
                        <h2>{item.name}</h2>
                        {/* update qty of product */}
                        <div className="flex gap-1 text-md">
                            <h2>quantity: {item.quantity}</h2>
                            <button onClick={() => cartStore.removeProduct({id: item.id,image: item.image,name: item.name,unit_amount: item.unit_amount,quantity: item.quantity})}>
                                <IoRemoveCircle/>
                            </button>
                            <button onClick={() => cartStore.addProduct({id: item.id,image: item.image,name: item.name,unit_amount: item.unit_amount,quantity: item.quantity})}>
                                <IoAddCircle/>
                            </button>
                        </div>
                        <p className="text-sm">
                            {item.unit_amount && formatPrice(item.unit_amount)}
                        </p>
                    </motion.div>
                </motion.div>
                )}
                </>
                )}
                {/* checkout and total */}
                {/* get the total price, hide if nothing is in the cart */}
                {cartStore.cart.length > 0 && cartStore.onCheckout === "cart" ? (
                <motion.div layout>
                    <p>Total: {totalPrice && formatPrice(totalPrice)}</p>
                {/* check out button, hide if nothing is in the cart */}
                    <button 
                        onClick={() => cartStore.setCheckout('checkout')} 
                        className="py-2 mt-4 bg-teal-800 w-full rounded-md text-white"
                    >
                        check out
                    </button>
                </motion.div>
                ) : null }
                {/* checkout form */}
                    {cartStore.onCheckout === 'checkout' && <Checkout />}
                <AnimatePresence>
                {/* display when cart is empty */}
                {!cartStore.cart.length && (
                    <motion.div animate={{scale: 1, rotateZ: 0, opacity: 0.75}} initial={{scale: 0.5, rotateZ: -10, opacity: 0}} exit={{scale: 0.5, rotateZ: -10, opacity: 0}}  className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75">
                        <h1>uh oh your cart is empty</h1>
                        <Image src={basket} alt="empty cart" width={200} height={200}/>
                    </motion.div>
                )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}