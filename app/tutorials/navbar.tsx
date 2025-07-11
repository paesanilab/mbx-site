"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import content_data from "@/content/tutorials.json";

type Tutorial = {
    heading: string;
    markdown_text: string;
    path?: string;
}

let links = [
    { name: "Introduction", href: "/tutorials/" },
];

const data: { tutorials: Tutorial[] } = content_data;

for (const key of data.tutorials) {
    const path = key.path ?? key.heading.toLowerCase().replace(/\s+/g, '-');
    links.push({ name: key.heading, href: `/tutorials/${path}` });
}
    

export function TutorialsSideBar() {
    const pathname = usePathname();

    return (
        <div className="bg-[#030625] text-white rounded-[20px] min-w-[205px] max-w-[288px] mt-[70px] ml-[45px]">
            <div className="flex flex-col p-[20px]">
                <h1 className="text-[22px] text-[#A5A5A5] pb-[11px]">Tutorials</h1>
                <div className="flex flex-col border-l-2 border-[#60A7FF] pl-[25px]">
                    {links.map((link) => {
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={clsx("text-[20px] py-[7px] hover:font-bold", {
                                    "font-bold": pathname === link.href,
                                })}
                            >
                                <p>{link.name}</p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
