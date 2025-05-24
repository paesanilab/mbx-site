import { notFound } from "next/navigation";
import versions from "../versions_placeholder.json";

export default async function UpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const update = versions.updates.find((u) => u.id === id);
  if (!update) return notFound();

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