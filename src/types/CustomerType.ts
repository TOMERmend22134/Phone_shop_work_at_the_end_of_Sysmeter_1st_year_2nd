import { Product, ProductInCart } from "./StoreTypes"

// export type Customer={
    // email:string,
    // name:string,
    // phone:string,
    // img:string,
    // date:Date,
    // password:string,
    // isActive:boolean,
//     address:Address,
//     deliveryAddress?:Address,
//     purchaseHistory?: UserHistoryPurchases[],
//     deliveryCity?: string,
//     deliveryStreet?: string,
//     deliveryNumberOfHome?: number
// }

// export type Address={
//     city:string
//     street:string
//     numberOfHome:number
// }
// export type UserHistoryPurchases={
    // purchaseID:number
    // productsArray:ProductInCart[]
    // // amountPurchase:number,
    // // priceOnDayOfPurchase:number,
    // dateOfPurchase:Date
// }

export type Customer = {
    email:string,
    name:string,
    phone:string,
    img:string,
    date:Date,
    password:string,
    isActive:boolean,
    address: {
      city: string,
      street: string,
      numberOfHome: number
    },
    // Optional properties can be omitted or set explicitly
    deliveryAddress: {
      city: string,
      street: string,
      numberOfHome: number
    },
    purchaseHistory?: [
      {
        purchaseID:number,
        productsArray:ProductInCart[],
        dateOfPurchase:Date
      }
    ],
    // Other optional properties can be added as needed
    deliveryCity: string,
    deliveryStreet: string,
    deliveryNumberOfHome: number
  };