'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import yes from '@/public/YES.gif'
import Link from "next/link"
import { useCartStore } from "../store"
import { useEffect } from 'react'

export default function OrderConfirmed() {
    const cartStore = useCartStore()

    useEffect(() => {
        cartStore.setPaymentIntent('')
        cartStore.clearCart()
    },[])

    const checkoutOrder = () => {
        setTimeout(() => {
            cartStore.setCheckout('cart')
        }, 1000);
        cartStore.toggleCart()
    }

    return(
        <motion.div 
        className="flex items-center justify-center my-12"
        initial={{scale: 0.5, opacity: 0}} 
        animate={{scale: 1, opacity: 1}}>
            <div className="p-12 rounded-md text-center">
                <h1 className="text-2xl font-medium">order placed, thanks</h1>
                <h2 className="text-sm my-4">check email for receipt</h2>
                <Image src={yes} className="py-8" alt="mordecai fist pumping" />
                    <div className="flex items-center justify-center gap-12 font-medium">
                    <Link href={'/dashboard'}>
                        <button onClick={checkoutOrder}>
                            check your order
                        </button>
                    </Link>
                    </div>
            </div>
        </motion.div>
    )
}