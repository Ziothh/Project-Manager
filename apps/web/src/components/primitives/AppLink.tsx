import { LinkProps, default as NextLink } from "next/link"
import { usePathname } from "next/navigation"
import { FC, PropsWithChildren, ReactNode } from "react"
import ROUTES from "~/constants/routes"

interface Props {
    href: (routes: typeof ROUTES) => LinkProps["href"] | string
}

type NextLinkProps = Parameters<typeof NextLink>[0]

type THref = ReturnType<Props["href"]>

export type AppLinkProps = Omit<NextLinkProps, "href" | "children"> & Props & (
    PropsWithChildren | {
        isActiveValidator?: (href: THref) => boolean,
        children?: FC<{
            isActive: boolean,
            href: THref
        }>
    } 
)

export const AppLink: React.FC<AppLinkProps> = ({
    href,
    children: Children,
    ...props
}) => {
    const pathName = usePathname()

    const parsedHref = href(ROUTES)

    return (
        <NextLink 
        {...props} 
        href={parsedHref}
        children={
            typeof Children === "function"
            ? (
                <Children 
                href={parsedHref}   
                isActive={("isActiveValidator" in props && props.isActiveValidator)
                    ? props.isActiveValidator(parsedHref)
                    : pathName === (
                        typeof parsedHref === "string" 
                        ? parsedHref 
                        : parsedHref.pathname!
                    )
                }
                />
            )
            : Children
        }
        />
    )
}

