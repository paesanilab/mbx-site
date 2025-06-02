import Link from "next/link";
import versions from "./versions_placeholder.json";

export default function UpdatesIndex() {
    return (
        <div className="bg-[#030625] text-white min-h-screen rounded-[40px] m-[20px] md:m-[70px]">
            <div className="flex flex-col px-[20px] py-[40px] md:px-[80px] md:py-[80px]">
                <h2 className="text-3xl font-bold mb-6">All Updates</h2>

                <ul className="list-disc pl-5 space-y-3">
                    {versions.updates.map((u) => (
                        <li key={u.id}>
                            <Link
                                href={`/updates/${u.id}`}
                                className="text-blue-400 hover:underline"
                            >
                                {u.date}-{u.version}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
