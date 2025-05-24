import React from "react";
import { UpdatesSideBar } from "./navbar";

export default function UpdatesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row gap-4">
            <aside className="text-white w-1/4 min-w-[250px] max-w-[333px] hidden md:block">
                <UpdatesSideBar />
            </aside>

            <main className="flex-1">{children}</main>
        </div>
    );
}