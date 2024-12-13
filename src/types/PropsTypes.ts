import { ReactElement } from "react"
import { Product, ProductInCart } from "./StoreTypes"

export type StoreContextProviderProps = {
    children: ReactElement | ReactElement[]
}

export type UserContextProviderProps = {
    children: ReactElement | ReactElement[]
}

export type ProductProps = {
    product?: Product,
    productsToShow:Product[],
    page?: 'admin' | 'store',
}



export type NavbarProps = {
    cart: ProductInCart
}

export type AdminProps = {
    isAdmin: boolean
}

export type cartProps = {
    cartToShow: ProductInCart[];
}