import Image from "next/image";
import React from "react";
import data from "@/content/content.json";

export default function Publications() {
  const publications = data.publications.items;

  function Item({ index }: { index: number }) {
    const item = publications[index];
    return (
      <div className="bg-white text-black rounded-[40px] p-4 mb-6">
        <h3 className="font-bold text-mb mb-2">{item.title}</h3>
        <div className="flex">
          <div className="w-3/5 pr-3">
            <p className="mb-1 text-xs">{item.author}</p>
            <p className="mb-1 text-xs">{item.date}</p>
            <p className="mb-1 text-xs">
              <a href={item.link} className="text-blue-500 underline">
                {item.link_title}
              </a>
            </p>
            <p className="text-xs text-[0.625rem]">{item.description}</p>
          </div>
          {item.img_src !== "" && (
            <div className="w-2/5">
              <div className="w-full h-[150px] flex items-center justify-center text-black rounded-[40px] relative overflow-hidden">
                <Image
                  src={item.img_src}
                  alt={item.img_alt}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#030625] text-white min-h-screen h-full rounded-[40px] m-[20px] md:m-[70px]">
      <div className="flex flex-col px-[20px] py-[40px] md:px-[80px] md:py-[80px]">
        {/* Page Title */}
        <h2 className="font-bold text-3xl pb-[20px] md:pb-[50px]">Publications</h2>

        {publications.map((_, i) => (
          <Item key={i} index={i} />
        ))}
      </div>
    </div>
  );
}
