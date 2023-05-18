'use client'

import Image from "next/image"
import { useCartStore } from "../store"
import formatPrice from "@/util/PriceFormat"
import {IoAddCircle, IoRemoveCircle} from 'react-icons/io5'

export default function Cart(){
    const cartStore = useCartStore()
    console.log(cartStore.isOpen)

    return(
        <div onClick={() => cartStore.toggleCart()} className="fixed w-full h-screen left-0 top-0 bg-black/50">
            <div onClick={(e) => e.stopPropagation()} className="bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-slate-700">
                <h1>
                    here's your cart
                </h1>
                {cartStore.cart.map((item) => 
                <div className="flex py-4 gap-4">
                    <Image 
                        className="rounded-md h-24" 
                        src={item.image} 
                        alt={item.name} 
                        width={120} 
                        height={120} 
                    />
                    <div>
                        <h2>{item.name}</h2>
                        {/* update qty of product */}
                        <div className="flex gap-1 text-md">
                            <h2>quantity: {item.quantity}</h2>
                            <button><IoRemoveCircle/></button>
                            <button><IoAddCircle/></button>
                        </div>
                        <p className="text-sm">
                            {item.unit_amount && formatPrice(item.unit_amount)}
                        </p>
                    </div>
                </div>
                )}
                <button className="py-2 mt-4 bg-teal-800 w-full rounded-md text-white">check out</button>
            </div>
        </div>
    )
}