import React from "react";
import { MobileSideBar, TutorialsSideBar } from "./navbar";

export default function TutorialsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row">
            <div className="text-white w-1/4 min-w-[250px] max-w-[333px] hidden md:block">
                <TutorialsSideBar />
            </div>
            <div className="block md:hidden">
                <MobileSideBar />
            </div>

            {/* Main content that fills remaining space */}
            <main className="md:flex-1">{children}</main>
        </div>
    );
}
