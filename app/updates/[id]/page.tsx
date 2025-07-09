// app/updates/[id]/page.tsx
import { notFound } from "next/navigation";
import content from "@/content/updates.json";

type Update {
    id: string;
    version: string;
    date: string;
    releaseNotes: { type: string; description: string }[];
    newFeatures: string[];
}

export function generateStaticParams() {
    return (content as { updates: Update[] }).updates
  }

export default async function UpdatePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const updates = (content as { updates: Update[] }).updates;

    const update = updates.find((u) => u.id === id);
    if (!update) {
        return notFound();
    }

    return (
        <div className="space-y-8">
            <div className="bg-[#030625] text-white min-h-screen h-full rounded-[40px] m-[20px] md:my-[70px] md:ml-[32px] md:mr-[45px]">
                <div className="flex flex-col p-[20px] md:p-[80px]">
                    <h2 className="font-bold text-3xl pb-[30px] md:pb-[50px]">
                        {update.date} ({update.version})
                    </h2>

                    {update.releaseNotes.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-2">Release Notes</h2>
                            <ul className="space-y-3">
                                {update.releaseNotes.map((note, i) => (
                                    <li key={i}>
                                        <span className="text-[#60A7FF] font-medium">
                                            {note.type}:
                                        </span>{" "}
                                        {note.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {update.newFeatures.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-2">New Features</h2>
                            <ul className="list-disc pl-5 text-[#CCCCCC] space-y-1">
                                {update.newFeatures.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// import { notFound } from "next/navigation";
// import React from "react";
// import content from "@/content/content.json";

// type ReleaseNote = { type: string; description: string };
// type Update = {
//     id: string;
//     version: string;
//     date: string;
//     releaseNotes: ReleaseNote[];
//     newFeatures: string[];
// };

// export default function UpdatePage({ params }: { params: { id: string } }) {
//     const { id } = params;

//     // Cast content.updates to our typed Update[] without using `any`
//     const updates = content.updates as unknown as Update[];

//     const update = updates.find((u) => u.id === id);
//     if (!update) {
//         return notFound();
//     }

//     return (
//         <div className="space-y-8">
//             <div className="bg-[#030625] text-white min-h-screen h-full rounded-[40px] m-[20px] md:my-[70px] md:ml-[32px] md:mr-[45px]">
//                 <div className="flex flex-col p-[20px] md:p-[80px]">
//                     <h2 className="font-bold text-3xl pb-[30px] md:pb-[50px]">
//                         {update.date} ({update.version})
//                     </h2>

//                     {update.releaseNotes.length > 0 && (
//                         <div>
//                             <h2 className="text-xl font-bold mb-2">Release Notes</h2>
//                             <ul className="space-y-3">
//                                 {update.releaseNotes.map((note, i) => (
//                                     <li key={i}>
//                                         <span className="text-[#60A7FF] font-medium">
//                                             {note.type}:
//                                         </span>{" "}
//                                         {note.description}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}

//                     {update.newFeatures.length > 0 && (
//                         <div>
//                             <h2 className="text-xl font-bold mb-2">New Features</h2>
//                             <ul className="list-disc pl-5 text-[#CCCCCC] space-y-1">
//                                 {update.newFeatures.map((feature, i) => (
//                                     <li key={i}>{feature}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
