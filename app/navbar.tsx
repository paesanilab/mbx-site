"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Updates", href: "/updates" },
    { name: "Publications", href: "/publications" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "FAQ", href: "/faq" },
];

export default function NavBar() {
    const pathname = usePathname();

    return (
        <div className="flex items-center justify-start bg-[#111840] p-1 text-white m-4 ml-8 mr-8 rounded-lg">
            <div className="flex space-x-14 items-center">
                <Image
                    src="/mbx-logo.png"
                    width={93}
                    height={41}
                    alt="MBX logo"
                    className="mr-16"
                />
                {links.map((link) => {
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx("hover:text-[#5483BF]", {
                                "text-[#5483BF]": pathname === link.href,
                            })}
                        >
                            <p>{link.name}</p>
                        </Link>
                    );
                })}
            </div>
            <div className="ml-auto bg-[#3552F2] mr-2 p-1 pl-6 pr-6 rounded-[2rem]">
                <Link key="Download" href="/download" className="font-bold hover:text-[#5483BF]">
                    Download
                </Link>
            </div>
        </div>
    );
}
