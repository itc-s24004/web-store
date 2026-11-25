import { Styles } from "../../style/style"

type BaseProps = {
    className?: string,
    children?: React.ReactNode
}

type ExtendedProps = {
    loadingClassName?: string
}

export function Loading<p extends BaseProps>(ElementClass: (props: p) => React.ReactElement<p>) {
    return function LoadingElement(props: p & ExtendedProps) {
        return <ElementClass {...props} className={[
            props.children === undefined ? `${Styles.loading} ${props.loadingClassName}` : "",
            props.className
        ].join(" ")} loadingClassName={undefined}/>
    }
}

