import React from "react";
import Image from "@/components/image";
import data from "@/content/publications.json";

type Publication = {
    title: string;
    authors: string;
    date: string;
    citation: string;
    link: string;
    description: string;
    img_src: string;
    relationship?: string;
};

export default function Publications() {
    const publications = data.items;
    const applications = data.applications;

    function Item({ item }: { item: Publication }) {
        return (
            <a href={item.link} className="flex min-w-0" target="_blank" rel="noreferrer">
                <article className="bg-white text-black rounded-[40px] p-4 mb-6 min-w-0 w-full hover:ring-4 ring-blue-500 duration-100">
                    <div>
                        {item.relationship && (
                            <p className="inline-block rounded-full bg-[#e8edff] px-3 py-1 mb-3 text-xs font-semibold text-[#243da5]">
                                {item.relationship}
                            </p>
                        )}
                        <h3 className="font-bold text-mb mb-2">{item.title}</h3>
                        <div>
                            <p className="mb-1 text-xs">
                                {item.authors}, <i>{item.citation}</i>
                            </p>
                            <p className="mb-1 text-blue-500 underline [overflow-wrap:anywhere]">
                                {item.link}
                            </p>
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
                </article>
            </a>
        );
    }

    return (
        <div className="bg-[#030625] text-white min-h-screen h-full rounded-[40px] m-[20px] md:m-[70px]">
            <div className="flex flex-col px-[20px] py-[40px] md:px-[80px] md:py-[80px]">
                {/* Page Title */}
                <h2 className="font-bold text-3xl pb-[20px] md:pb-[50px]">Key MBX Publications</h2>

                {publications.map((publication) => (
                    <Item key={publication.link} item={publication} />
                ))}

                <section className="pt-[20px] md:pt-[40px]">
                    <h2 className="font-bold text-3xl pb-[20px]">
                        Applications and Derivative Work
                    </h2>
                    <p className="max-w-4xl pb-[30px] text-sm md:text-base text-slate-200">
                        {data.applications_intro}
                    </p>

                    {applications.map((publication) => (
                        <Item key={publication.link} item={publication} />
                    ))}
                </section>
            </div>
        </div>
    );
}
