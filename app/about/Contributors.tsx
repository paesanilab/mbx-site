"use client";

import React, { useState } from "react";
import data from "@/content/content.json";

export default function Contributors() {
  const curData = data.about.current;
  const forData = data.about.former;
  const [activeTab, setActiveTab] = useState<"current" | "former">("current");
  const contributors = activeTab === "current" ? curData : forData;

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-gray-500 mb-6">
        <button
          className={`pb-2 px-4 font-semibold ${
            activeTab === "current"
              ? "border-b-2 border-blue-500"
              : "text-gray-400"
          }`}
          onClick={() => {
            setActiveTab("current");
          }}
        >
          Current Contributors
        </button>
        <button
          className={`pb-2 px-4 font-semibold ${
            activeTab === "former"
              ? "border-b-2 border-blue-500"
              : "text-gray-400"
          }`}
          onClick={() => {
            setActiveTab("former");
          }}
        >
          Former Contributors
        </button>
      </div>

      {/* Contributors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contributors.map((person, index) => (
          <div
            key={index}
            className="relative bg-gray-400 h-[300px] rounded-lg flex flex-col justify-end overflow-hidden"
          >
            {/* Only render the photo if person.image is non-empty */}
            {person.image && (
              <img
                src={person.image}
                alt={person.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* Name & Role at the bottom; stays on top of the image */}
            <div className="bg-white text-black p-4 rounded-b-lg relative z-10">
              <h3 className="font-bold">{person.name}</h3>
              <p>{person.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
