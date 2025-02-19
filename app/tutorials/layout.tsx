import React from "react";
import TutorialsSideBar from "./navbar";

export default function TutorialsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row">
            <div className="text-white md:w-[333px]">
                <TutorialsSideBar />
            </div>

            {/* Main content that fills remaining space */}
            <main className="flex-1">{children}</main>
        </div>
    );
}
