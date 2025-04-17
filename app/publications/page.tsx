import React from "react";

export default function Publications() {
    return (
        <div className="bg-[#030625] text-white min-h-screen h-full rounded-[40px] m-[20px] md:m-[70px]">
            <div className="flex flex-col px-[20px] py-[40px] md:px-[80px] md:py-[80px]">
                {/* Page Title */}
                <h2 className="font-bold text-3xl pb-[20px] md:pb-[50px]">Publications</h2>

                {/* Example Publication 1 */}
                <div className="bg-white text-black rounded-[40px] p-6 mb-6">
                    <h3 className="font-bold text-xl mb-2">[Publication Title Placeholder]</h3>
                    <div className="flex">
                        {/* Left column for text */}
                        <div className="w-1/2 pr-4">
                            <p className="mb-1">[Author 1, Author 2, ...]</p>
                            <p className="mb-1">1 January 2025</p>
                            <p className="mb-1">
                                <a href="#" className="text-blue-500 underline">
                                    [Link Placeholder]
                                </a>
                            </p>
                            <p className="text-sm mb-4">
                                [Short summary placeholder text describing the publication’s
                                content...]
                            </p>
                        </div>
                        {/* Right column for image placeholder */}
                        <div className="w-1/2">
                            <div className="w-full h-[150px] bg-gray-300 flex items-center justify-center text-black rounded-[40px]">
                                <span>Placeholder for image</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Example Publication 2 */}
                <div className="bg-white text-black rounded-[40px] p-6 mb-6">
                    <h3 className="font-bold text-xl mb-2">[Publication Title Placeholder]</h3>
                    <div className="flex">
                        {/* Left column for text */}
                        <div className="w-1/2 pr-4">
                            <p className="mb-1">[Author 1, Author 2, ...]</p>
                            <p className="mb-1">1 January 2025</p>
                            <p className="mb-1">
                                <a href="#" className="text-blue-500 underline">
                                    [Link Placeholder]
                                </a>
                            </p>
                            <p className="text-sm mb-4">
                                [Short summary placeholder text describing the publication’s
                                content...]
                            </p>
                        </div>
                        {/* Right column for image placeholder */}
                        <div className="w-1/2">
                            <div className="w-full h-[150px] bg-gray-300 flex items-center justify-center text-black rounded-[40px]">
                                <span>Placeholder for image</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Example Publication 3 */}
                <div className="bg-white text-black rounded-[40px] p-6 mb-6">
                    <h3 className="font-bold text-xl mb-2">[Publication Title Placeholder]</h3>
                    <div className="flex">
                        {/* Left column for text */}
                        <div className="w-1/2 pr-4">
                            <p className="mb-1">[Author 1, Author 2, ...]</p>
                            <p className="mb-1">1 January 2025</p>
                            <p className="mb-1">
                                <a href="#" className="text-blue-500 underline">
                                    [Link Placeholder]
                                </a>
                            </p>
                            <p className="text-sm mb-4">
                                [Short summary placeholder text describing the publication’s
                                content...]
                            </p>
                        </div>
                        {/* Right column for image placeholder */}
                        <div className="w-1/2">
                            <div className="w-full h-[150px] bg-gray-300 flex items-center justify-center text-black rounded-[40px]">
                                <span>Placeholder for image</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
