import React from "react";
import { updates as content } from "@/lib/content";
import { Link } from "@/lib/navigation";

export default function UpdatesIndex() {
    const updates = content.updates;

    return (
        <div className="bg-[#030625] text-white min-h-screen rounded-[40px] m-[20px] md:m-[70px]">
            <div className="flex flex-col px-[20px] py-[40px] md:px-[80px] md:py-[80px]">
                <h2 className="text-3xl font-bold mb-6">All Updates</h2>

                <ul className="list-disc pl-5 space-y-3 text-lg font-mono">
                    {updates.map((u) => {
                        const isMajorUpdate = u.releaseNotes.some(
                            (note) => note.type.toLowerCase() === "major update",
                        );

                        return (
                            <li key={u.version}>
                                <Link
                                    href={`/updates/${u.version}`}
                                    className={`text-blue-400 hover:underline ${isMajorUpdate ? "font-bold" : ""}`}
                                >
                                    MBX v{u.version} [{u.date}]
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
