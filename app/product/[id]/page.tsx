import Image from "next/image"
import { SearchParamTypes } from "@/types/SearchParamsTypes"
import formatPrice from "@/util/PriceFormat"
import AddCart from "./AddCart"

//setup of dynamic page that fetches product data and displays it
export default async function Product({ searchParams }: SearchParamTypes) {
    return(
        //fart out the image
        <div className="flex flex-col 2xl:flex-row items-center justify-between gap-16">
            <Image
                src={searchParams.image}
                alt={searchParams.name}
                width={600}
                height={600} 
                className="w-full rounded-lg"
            />
            {/* output the data for product name and its description*/}
            <div className="font-medium">
                <h1 className="=text-2xl py-2">{searchParams.name}</h1>
                <p className="py-2">{searchParams.description}</p>
                <p className="py-2">{searchParams.features}</p>
            {/* use formatPrice imported from the util function, apply to unit_amount to get formatted price */}
            <div className="flex gap-2">
                <p className="font-bold text-primary">
                    {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
                </p>
            </div>
            {/*cart button coming */}
            <AddCart {...searchParams} />
            </div>
        </div>
    )
}