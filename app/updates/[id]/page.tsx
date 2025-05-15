import { notFound } from "next/navigation";
import versions from "../versions_placeholder.json";

export default function UpdatePage({ params }: { params: { id: string } }) {
    const update = versions.updates.find((u) => u.id === params.id);

    if (!update) return notFound();

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-semibold">
                {update.date} - {update.version}
            </h1>

            {update.releaseNotes.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold mb-2">Release Notes</h2>
                    <ul className="space-y-3">
                        {update.releaseNotes.map((note, i) => (
                            <li key={i}>
                                <span className="text-[#60A7FF] font-medium">{note.type}:</span>{" "}
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
    );
}
