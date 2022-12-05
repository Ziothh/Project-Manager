import clsx from "clsx";
import { LinkProps } from "next/link"
import { CirclesFour, Planet, ShareNetwork } from "phosphor-react";
import { FC, ReactNode } from "react"
import { AppLinkProps } from "~/components/primitives";




interface SidebarNavItem {
    label: ReactNode,
    icon: FC
    href: AppLinkProps["href"]
}

export const SIDEBAR_NAV_ITEMS = [
    {
        icon: Planet,
        href: (routes) => routes.home,
        label: "Overview",
    },
    {
        icon: ShareNetwork,
        href: (routes) => routes.NOT_IMPLEMENTED,
        label: "Nodes",
    },
    {
        icon: CirclesFour,
        href: (routes) => routes.NOT_IMPLEMENTED,
        label: "Spaces",
    },
] satisfies SidebarNavItem[]