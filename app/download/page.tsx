"use client";

import React from "react";
import content from "@/content/downloads.json";

interface DownloadEntry{
    version:string;
    date:string;
    type?: string;
    patch_notes?: string;
    download_link?: string;
}

export default function Download() {
    const content_data: DownloadEntry[] = content.versions;

    let data: DownloadEntry[] = [];
    for (const content_item of content_data){
        let item = {...content_item}
        item.type ??= "Source ZIP"
        item.patch_notes ??= `https://github.com/paesanilab/MBX-dev/releases/tag/v${item.version}`
        item.download_link ??= `https://github.com/paesanilab/MBX-dev/releases/tag/v${item.version}`
        data.push(item)
    }



    return (
        <div className="bg-[#030625] text-white min-h-screen h-full rounded-[40px] m-[20px] md:m-[70px]">
            <div className="flex flex-col px-[20px] py-[40px] md:px-[80px] md:py-[80px]">
                {/* Page Title */}
                <h2 className="text-[#60A7FF] font-bold text-3xl pb-[20px] md:pb-[50px]">
                    Version Downloads
                </h2>

                {/* Large Screens Table */}
                <div className="hidden md:block">
                    {/* Header Row */}
                    <div className="flex justify-between bg-[#0C1E8C] items-center rounded-sm text-md font-bold h-[42px]">
                        <span className="w-1/5 flex justify-center">Version</span>
                        <span className="w-1/5 flex justify-center">Upload Date</span>
                        <span className="w-1/5 flex justify-center">Type Download</span>
                        <span className="w-1/5 flex justify-center">Patch Notes</span>
                        <span className="w-1/5 flex justify-center">Download</span>
                    </div>

                    {/* Data Rows */}
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between h-[65px] rounded-sm items-center bg-[#4057E6] border-b border-[#4057E6] bg-opacity-10 text-md font-medium"
                        >
                            <span className="w-1/5 flex justify-center">{item.version}</span>
                            <span className="w-1/5 flex justify-center">{item.date}</span>
                            <span className="w-1/5 flex justify-center text-[#4057E6]">
                                {item.type}
                            </span>
                            <span className="w-1/5 flex justify-center">
                                <a
                                    href={item.patch_notes}
                                    className="bg-[#60A7FF] text-white font-bold px-4 py-1 rounded-3xl hover:bg-[#508fd4] transition text-xs md:px-6 md:py-2 md:text-sm"
                                >
                                    Patch Notes
                                </a>
                            </span>
                            <span className="w-1/5 flex justify-center">
                                <a
                                    href={item.download_link}
                                    download
                                    className="bg-[#60A7FF] text-white font-bold px-4 py-1 rounded-3xl hover:bg-[#508fd4] transition text-xs md:px-6 md:py-2 md:text-sm"
                                >
                                    Download
                                </a>
                            </span>
                        </div>
                    ))}
                </div>

                {/* Small Screens Cards */}
                <div className="block md:hidden">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col p-4 mb-4 rounded-md bg-[#4057E6] bg-opacity-10 border border-[#4057E6]"
                        >
                            <div className="flex justify-between">
                                <span className="font-bold">Version:</span>
                                <span>{item.version}</span>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span className="font-bold">Upload Date:</span>
                                <span>{item.date}</span>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span className="font-bold">Type Download:</span>
                                <span>{item.type}</span>
                            </div>
                            <div className="flex justify-center mt-4">
                                <a
                                    href={item.patch_notes}
                                    className="bg-[#60A7FF] text-white font-bold px-6 py-2 rounded-3xl hover:bg-[#508fd4] transition text-sm"
                                >
                                    Patch Notes
                                </a>
                            </div>
                            <div className="flex justify-center mt-4">
                                <a
                                    href={item.download_link}
                                    download
                                    className="bg-[#60A7FF] text-white font-bold px-6 py-2 rounded-3xl hover:bg-[#508fd4] transition text-sm"
                                >
                                    Download
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Packages Section */}
                {/* <div className="flex flex-col pt-[50px]">
                    <h3 className="text-2xl font-bold pb-[30px]">Packages</h3>
                    <p className="text-sm">{content.bottom_description}</p>
                </div> */}
            </div>
        </div>
    );
}

// import React from "react";

// // Placeholder data for downloads table
// import content from "@/content/content.json";

// export default function Download() {
//     const data = content.download.versions;
//     return (
//         <div className="bg-[#030625] text-white min-h-screen h-full rounded-[40px] m-[20px] md:m-[70px]">
//             <div className="flex flex-col px-[20px] py-[40px] md:px-[80px] md:py-[80px]">
//                 {/* Page Title */}
//                 <h2 className="text-[#60A7FF] font-bold text-3xl pb-[20px] md:pb-[50px]">
//                     Version Downloads
//                 </h2>

//                 {/* Large Screens Table */}
//                 <div className="hidden md:block">
//                     {/* Header Row */}
//                     <div className="flex justify-between bg-[#0C1E8C] items-center rounded-sm text-md font-bold h-[42px]">
//                         <span className="w-1/5 flex justify-center">Version</span>
//                         <span className="w-1/5 flex justify-center">Upload Date</span>
//                         <span className="w-1/5 flex justify-center">Size</span>
//                         <span className="w-1/5 flex justify-center">Type Download</span>
//                         <span className="w-1/5 flex justify-center">Download</span>
//                     </div>

//                     {/* Data Rows */}
//                     {data.map((item, index) => (
//                         <div
//                             key={index}
//                             className="flex justify-between h-[65px] rounded-sm items-center bg-[#4057E6] border-b border-[#4057E6] bg-opacity-10 text-md font-medium"
//                         >
//                             <span className="w-1/5 flex justify-center">{item.version}</span>
//                             <span className="w-1/5 flex justify-center">{item.date}</span>
//                             <span className="w-1/5 flex justify-center">{item.size}</span>
//                             <span className="w-1/5 flex justify-center text-[#4057E6]">
//                                 {item.type}
//                             </span>
//                             <span className="w-1/5 flex justify-center">
//                                 <button className="bg-[#60A7FF] text-white font-bold px-4 py-1 rounded-3xl hover:bg-[#508fd4] transition text-xs md:px-6 md:py-2 md:text-sm">
//                                     Download
//                                 </button>
//                             </span>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Small Screens Cards */}
//                 <div className="block md:hidden">
//                     {data.map((item, index) => (
//                         <div
//                             key={index}
//                             className="flex flex-col p-4 mb-4 rounded-md bg-[#4057E6] bg-opacity-10 border border-[#4057E6]"
//                         >
//                             <div className="flex justify-between">
//                                 <span className="font-bold">Version:</span>
//                                 <span>{item.version}</span>
//                             </div>
//                             <div className="flex justify-between mt-2">
//                                 <span className="font-bold">Upload Date:</span>
//                                 <span>{item.date}</span>
//                             </div>
//                             <div className="flex justify-between mt-2">
//                                 <span className="font-bold">Size:</span>
//                                 <span>{item.size}</span>
//                             </div>
//                             <div className="flex justify-between mt-2">
//                                 <span className="font-bold">Type Download:</span>
//                                 <span>{item.type}</span>
//                             </div>
//                             <div className="flex justify-center mt-4">
//                                 <button className="bg-[#60A7FF] text-white font-bold px-6 py-2 rounded-3xl hover:bg-[#508fd4] transition text-sm">
//                                     Download
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Packages Section */}
//                 <div className="flex flex-col pt-[50px]">
//                     <h3 className="text-2xl font-bold pb-[30px]">Packages</h3>
//                     <p className="text-sm">{content.download.bottom_description}</p>
//                 </div>
//             </div>
//         </div>
//     );
// }
