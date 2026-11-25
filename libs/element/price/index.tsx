
export function Price({className, children, ...props}: React.JSX.IntrinsicElements["span"]) {
    return <span {...props} className={[
        "flex items-start  text-3xl",
        className
    ].join(" ")}>
        <span className="text-xl shrink-0">¥</span>
        {children}
    </span>
}