import { ReactNode } from "react";

export default function AuthLayout({ children, modal }: { children: ReactNode, modal: ReactNode }) {
    return (
        <div>
            {children}
            {modal}
        </div>
    );
}