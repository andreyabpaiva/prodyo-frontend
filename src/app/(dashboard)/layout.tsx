import Navbar from "@/components/layout/navbar";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <>  
            <Navbar/> 
            {children}
        </>
    );
}