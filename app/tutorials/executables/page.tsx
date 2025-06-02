import React from "react";

import data from "@/content/content.json";

export default function Compilation() {
    const elems = data.tutorials.executable;
    return (
        <div>
            <div className="bg-[#030625] text-white min-h-screen h-full rounded-[40px] m-[20px] md:my-[70px] md:ml-[32px] md:mr-[45px]">
                <div className="flex flex-col p-[20px] md:p-[80px] text-xs md:text-base">
                    {elems.map((item, index) => (
                        <div key={index}>
                            <h2 className="text-3xl font-bold pb-[20px]">{item.subheading}</h2>

                            <p className="mb-3 whitespace-pre-wrap pb-[30px]">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
