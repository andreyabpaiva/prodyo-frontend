import { ReactNode } from "react";

export default function IndicatorsLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}
