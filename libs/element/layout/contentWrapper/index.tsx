import React from "react";

export function ContentWrapper({className, children, ...props}: React.JSX.IntrinsicElements["div"]) {
    return (
        <div
            className={
                [
                    "flex-1 flex flex-col overflow-y-hidden sm:overflow-y-auto relative",
                    "sm:flex-col-reverse",
                    className ?? ""
                ].join(" ")
            }
            {...props}
        >
            {children}
        </div>
    )
}