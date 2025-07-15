import Image from "next/image";
import React from "react";
import data from "@/content/publications.json";

export default function Publications() {
    const publications = data.items;

    function Item({ index }: { index: number }) {
        const item = publications[index];
        return (
            <a href={item.link} className="flex">
                <div className="bg-white text-black rounded-[40px] p-4 mb-6 hover:ring-4 ring-blue-500 duration-100">

                    <div>
                        <h3 className="font-bold text-mb mb-2">{item.title}</h3>
                        <div>
                            <p className="mb-1 text-xs">
                                {item.authors}, <i>{item.citation}</i>
                            </p>
                            <p className="mb-1 text-blue-500 underline">{item.link}</p>
                        </div>
                    </div>
                    <div className="text-xs">
                        {item.img_src !== "" && (
                            <div className=" float-right ml-4 h-[200px] max-w-[400px] w-full relative">
                                <Image
                                    src={"publications/" + item.img_src}
                                    alt={"Publication Image"}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        )}
                        {item.description}
                    </div>
                </div>
            </a>
        );
    }

    return (
        <div className="bg-[#030625] text-white min-h-screen h-full rounded-[40px] m-[20px] md:m-[70px]">
            <div className="flex flex-col px-[20px] py-[40px] md:px-[80px] md:py-[80px]">
                {/* Page Title */}
                <h2 className="font-bold text-3xl pb-[20px] md:pb-[50px]">Key MBX Publications</h2>

                {publications.map((_, i) => (
                    <Item key={i} index={i} />
                ))}
            </div>
        </div>
    );
}
