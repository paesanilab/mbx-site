"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import versions from "./versions_placeholder.json"; // update path as needed

export function UpdatesSideBar() {
    const pathname = usePathname();
    const updates = versions.updates;

    return (
        <div className="bg-[#030625] text-white rounded-[20px] min-w-[205px] max-w-[288px] mt-[70px] ml-[45px]">
            <div className="flex flex-col p-[20px]">
                <h1 className="text-[22px] text-[#A5A5A5] pb-[11px]">Update Versions</h1>
                <div className="flex flex-col border-l-2 border-[#60A7FF] pl-[25px]">
                    {updates.map((update) => {
                        const href = `/updates/${update.id}`;
                        return (
                            <Link
                                key={update.id}
                                href={href}
                                className={clsx("text-[20px] py-[7px] hover:font-bold", {
                                    "font-bold": pathname === href,
                                })}
                            >
                                <p>{update.version}</p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
