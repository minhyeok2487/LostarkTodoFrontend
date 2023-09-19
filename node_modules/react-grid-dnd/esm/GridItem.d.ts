import * as React from "react";
interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export declare function GridItem({ children, style, className, ...other }: GridItemProps): any;
export {};
