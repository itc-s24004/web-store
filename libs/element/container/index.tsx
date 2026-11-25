import React from "react";

export function Container({ className, ...props }: React.JSX.IntrinsicElements["div"]) {
    return <div {...props} className={[
        "flex justify-center flex-wrap",
        className
    ].join(" ")}/>
}