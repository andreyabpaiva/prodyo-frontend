import Navbar from "@/components/organisms/navbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="pt-14">{children}</div>
    </>
  );
}
