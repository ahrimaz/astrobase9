import Image from "next/image"
import formatPrice from "@/util/PriceFormat"
import { ProductType } from "@/types/ProductType"
import Link from "next/link"

export default function Product({ name, image, unit_amount, id, description, metadata }: ProductType) {
    //need this to pull features out of the stripe metadata
    const { features } = metadata
    
    return (
    //link to the product itself
    <Link href={{pathname: `/product/${id}`, query: {name,image,unit_amount,id, description, features}}}>
        <div className="text-slate-700">
            <Image 
                src={image} 
                alt={name} width={800} 
                height={800} 
                className="w-full h-96 object-cover rounded-lg" />
            <div  className="font-medium py-2">
                <h1>{name}</h1>
                <h2 className="text-sm text-teal-800">
                    {unit_amount !== null ? formatPrice(unit_amount) : 'N/A'}
                </h2>
            </div>
        </div>
    </Link>
    )
}