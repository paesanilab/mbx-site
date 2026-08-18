"use client";

import React, { useEffect, useState } from "react";
import content from "@/content/updates.json";

const RELEASES_API_URL = "https://api.github.com/repos/paesanilab/MBX/releases?per_page=100";

type Update = {
    version: string;
    date: string;
    releaseNotes: { type: string; description: string }[];
    type?: string;
    patch_notes?: string;
    download_link?: string;
    showDownloadCount?: boolean;
};

type GitHubRelease = {
    tag_name: string;
    assets: { download_count: number }[];
};

type DownloadCounts = Record<string, number>;

export default function Download() {
    const content_data: Update[] = content.updates;
    const [downloadCounts, setDownloadCounts] = useState<DownloadCounts | null>(null);
    const [downloadCountsFailed, setDownloadCountsFailed] = useState(false);

    const data: Update[] = [];
    for (const content_item of content_data) {
        const item = { ...content_item };
        item.patch_notes ??= `https://github.com/paesanilab/MBX/releases/tag/v${item.version}`;
        item.download_link ??=
            item.showDownloadCount === false
                ? `https://github.com/paesanilab/MBX/archive/refs/tags/v${item.version}.tar.gz`
                : `https://github.com/paesanilab/MBX/releases/download/v${item.version}/mbx-${item.version}.tar.gz`;
        data.push(item);
    }

    useEffect(() => {
        const controller = new AbortController();

        async function getDownloadCounts() {
            try {
                const response = await fetch(RELEASES_API_URL, {
                    headers: {
                        Accept: "application/vnd.github+json",
                        "X-GitHub-Api-Version": "2022-11-28",
                    },
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`GitHub returned ${response.status}`);
                }

                const releases = (await response.json()) as GitHubRelease[];
                const counts = Object.fromEntries(
                    releases.map((release) => [
                        release.tag_name,
                        release.assets.reduce((total, asset) => total + asset.download_count, 0),
                    ]),
                );

                setDownloadCounts(counts);
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") {
                    return;
                }

                setDownloadCountsFailed(true);
            }
        }

        // void getDownloadCounts();

        return () => controller.abort();
    }, []);

    function renderDownloadCount(item: Update) {
        if (item.showDownloadCount === false) {
            return "—";
        }

        if (downloadCountsFailed) {
            return "Unavailable";
        }

        if (downloadCounts === null) {
            return "Loading…";
        }

        return (downloadCounts[`v${item.version}`] ?? 0).toLocaleString();
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
                        <span className="w-1/6 flex justify-center">Version</span>
                        <span className="w-1/6 flex justify-center">Upload Date</span>
                        <span className="w-1/6 flex justify-center">Release Notes</span>
                        {/* <span className="w-1/6 flex justify-center">Downloads</span> */}
                        <span className="w-1/6 flex justify-center">Download</span>
                    </div>

                    {/* Data Rows */}
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between h-[65px] rounded-sm items-center bg-[#4057E6] border-b border-[#4057E6] bg-opacity-10 text-md font-medium"
                        >
                            <span className="w-1/6 flex justify-center">{item.version}</span>
                            <span className="w-1/6 flex justify-center">{item.date}</span>
                            <span className="w-1/6 flex justify-center">
                                <a
                                    href={item.patch_notes}
                                    className="bg-[#60A7FF] text-white font-bold px-4 py-1 rounded-3xl hover:bg-[#508fd4] transition text-xs text-center md:px-6 md:py-2 md:text-sm"
                                >
                                    Release Notes
                                </a>
                            </span>
                             {/* <span
                                className="w-1/6 flex justify-center"
                                aria-label={`Downloads for version ${item.version}`}
                            >
                                {renderDownloadCount(item)}
                            </span> */}
                            <span className="w-1/6 flex justify-center">
                                <a
                                    href={item.download_link}
                                    download
                                    className="bg-[#60A7FF] text-whit  font-bold px-4 py-1 rounded-3xl hover:bg-[#508fd4] transition text-xs text-center md:px-6 md:py-2 md:text-sm"
                                >
                                    Download v{item.version}.tgz
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
                            <div className="flex justify-between mt-2">
                                <span className="font-bold">Downloads:</span>
                                <span aria-label={`Downloads for version ${item.version}`}>
                                    {renderDownloadCount(item)}
                                </span>
                            </div>
                            <div className="flex justify-center mt-4">
                                <a
                                    href={item.patch_notes}
                                    className="bg-[#60A7FF] text-white font-bold px-6 py-2 rounded-3xl hover:bg-[#508fd4] transition text-sm"
                                >
                                    Release Notes
                                </a>
                            </div>
                            <div className="flex justify-center mt-4">
                                <a
                                    href={item.download_link}
                                    download
                                    className="bg-[#60A7FF] text-white font-bold px-6 py-2 rounded-3xl hover:bg-[#508fd4] transition text-sm"
                                >
                                    Download v{item.version}
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
