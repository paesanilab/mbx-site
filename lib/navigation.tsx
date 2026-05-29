import {
    Link as RouterLink,
    type LinkProps as RouterLinkProps,
    useLocation,
} from "react-router-dom";
import type React from "react";

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
};

export function Link({ href, children, ...props }: LinkProps) {
    const isExternal = /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");

    if (isExternal) {
        return (
            <a href={href} {...props}>
                {children}
            </a>
        );
    }

    return (
        <RouterLink to={href as RouterLinkProps["to"]} {...props}>
            {children}
        </RouterLink>
    );
}

export function usePathname() {
    return useLocation().pathname;
}
