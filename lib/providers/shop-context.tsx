"use client"
import { createContext, useContext, useState } from "react";
import { shops } from "../data/shops";

type ShopContextProps = {
    children: React.ReactNode
}


type Shop = {
    shop_id: string;
    shop_name: string;
    username: string;
}


type ShopContextType = {
    shop: Shop;
    setShop: React.Dispatch<React.SetStateAction<Shop>>
}

export const ShopContext = createContext<ShopContextType | null>(null)


export default function ShopContextProvider({ children}: ShopContextProps) {
    const [shop, setShop] = useState(shops[0])

    return (
        <ShopContext.Provider value={{
            shop, setShop
        }}>
            {children}
        </ShopContext.Provider>
    )
}

export function useShopContext(){
    const context = useContext(ShopContext)
    if(context === undefined){
        throw new Error('useShopContext must be used within ShopContextProvider')
    }

    return context
}
