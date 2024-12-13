import { ReactElement } from "react"

export type Product={
    id:number
    name:string
    shortDesc:string
    longDesc?:string
    img:string
    minimalQty:number
    currentQty:number
    price:number
    salePrice?:number
}

export type ProductProps={
    productsToShow:Array<Product>
    productsInDiscount:Product[]
}

export type StoreContextProviderProps = {
    children: ReactElement | ReactElement[]
}

export type ProductInCart = Product & {
    amount: number
}