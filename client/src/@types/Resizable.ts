import { HTMLAttributes } from "react";

export interface Resizable extends HTMLAttributes<HTMLDivElement> {
  isSmallDevice?: boolean;
}

export type FCResizable = (props: Resizable) => Resizable;
