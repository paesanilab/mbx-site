"use client";

import Image from "next/image";
import React, { useState } from "react";
import data from "@/content/about.json";

type Person = { name: string; role: string; image: string };

export default function Contributors() {
    const curData = data.current as Person[];
    const forData = data.former as Person[];
    const [activeTab, setActiveTab] = useState<"current" | "former">("current");
    const contributors = activeTab === "current" ? curData : forData;

    return (
        <div>
            {/* Tabs */}
            <div className="flex border-b border-gray-500 mb-6">
                <button
                    className={`pb-2 px-4 font-semibold ${
                        activeTab === "current" ? "border-b-2 border-blue-500" : "text-gray-400"
                    }`}
                    onClick={() => {
                        setActiveTab("current");
                    }}
                >
                    Current Contributors
                </button>
                <button
                    className={`pb-2 px-4 font-semibold ${
                        activeTab === "former" ? "border-b-2 border-blue-500" : "text-gray-400"
                    }`}
                    onClick={() => {
                        setActiveTab("former");
                    }}
                >
                    Former Contributors
                </button>
            </div>

            {/* Contributors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contributors.map((person, index) => (
                    <div
                        key={index}
                        className="relative bg-gray-400 rounded-lg flex flex-col justify-end overflow-hidden max-w-200"
                    >
                        {/* Only render the photo if person.image is non‑empty */}
                        {person.image && (
                            <div className="w-full h-[200px] relative">
                                <Image
                                    src={"/people/" + person.image}
                                    alt={person.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        {/* Name & Role at the bottom; stays on top of the image */}
                        <div className="bg-white text-black p-4 rounded-b-lg relative z-10">
                            <h3 className="font-bold">{person.name}</h3>
                            <p>{person.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
