import Image from "next/image"
import { SearchParamTypes } from "@/types/SearchParamsTypes"
import formatPrice from "@/util/PriceFormat"

//setup of dynamic page that fetches product data and displays it
export default async function Product({ searchParams }: SearchParamTypes) {
    return(
        //fart out the image
        <div className="flex justify-between gap-24 p-12 text-slate-700">
            <Image
                src={searchParams.image}
                alt={searchParams.name}
                width={600}
                height={600} 
            />
            {/* output the data for product name and its description*/}
            <div className="font-medium text-slate-700">
                <h1 className="=text-2xl py-2">{searchParams.name}</h1>
                <p className="py-2">{searchParams.description}</p>
                <p className="py-2">{searchParams.features}</p>
            {/* use formatPrice imported from the util function, apply to unit_amount to get formatted price */}
            <div className="flex gap-2">
                <p className="font-bold text-teal-800">
                    {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
                </p>
            </div>
            {/*cart button coming */}
            <button className="my-12 text-white py-2 px-6 rounded-md bg-teal-800">
                add to cart
                </button>
            </div>
        </div>
    )
}