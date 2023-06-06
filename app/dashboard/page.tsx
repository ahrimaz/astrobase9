import { PrismaClient } from "@prisma/client";
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import formatPrice from "@/util/PriceFormat";
import Image from "next/image";

export const revalidate = 0;

const fetchOrders = async () => {
    const prisma = new PrismaClient()
    const user = await getServerSession(authOptions)
    if(!user){
        return null
    }
    const orders = await prisma.order.findMany({
        where: {userId: user?.user?.id},
        include: {products: true}
    })
    return orders
}

export default async function Dashboard(){
    const orders = await fetchOrders()
    if(orders === null)
    return<div>you must login to view orders</div>
    if(orders.length === 0){
        return <div><h1>you have no orders</h1></div>
    }
    return(
        <div>
            <div className="font-medium">
                {orders?.map((order) => (
                    <div key={order.id} className="rounded-lg p-8 my-4 space-y-2">
                        <h2 className="text-xs font-medium">order reference: {order.id}</h2>
                        <p className="text-xs">Time: {new Date(order.createdDate).toString()}</p>
                        <p className="text-md py-2">
                            Status: 
                            <span 
                                className={`${
                                    order.status === 'complete' ? "bg-teal-700" : 'bg-orange-700'}
                                     text-white py-1 rounded-md px-2 mx-2 text-sm`}>
                                    {order.status}
                            </span>
                        </p>
                        <p className="text-xs">
                            total: {formatPrice(order.amount)}
                        </p>
                        <div className="text-sm lg:flex items-center gap-4">
                            {order.products.map((product) => (
                                <div key={product.id} className="py-2">
                                    <h2 className="py-2">{product.name}</h2>
                                    <div className="flex items-baseline gap-4">
                                        <Image 
                                        src={product.image!} 
                                        width={48} 
                                        height={48} 
                                        alt={product.name}>
                                        </Image>
                                        <p>{formatPrice(product.unit_amount)}</p>
                                        <p>quantity: {product.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}