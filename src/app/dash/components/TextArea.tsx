"use client";

import { PromptProps } from "@/types/Prompt";
import { useState } from "react";

export function TextArea({
  handleGenerate,
}: {
  handleGenerate({
    name,
    job,
    skills,
    experienceYears,
  }: PromptProps): Promise<void>;
}) {
  const [skills, setSkills] = useState("");
  const [name, setName] = useState("");
  const [job, setJobType] = useState("");
  const [experienceYears, setExperienceYears] = useState(0);

  return (
    <>
      <textarea
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        className="w-full bg-transparent h-auto border-2 border-white p-4 rounded-lg"
        placeholder="Write here your skills"
      />
      <div className="flex w-full items-center justify-between h-auto">
        <input
          type="text"
          placeholder="Name"
          value={name}
          className="bg-transparent p-2 border-white border-2 rounded-md"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Job"
          value={job}
          className="bg-transparent p-2 border-white border-2 rounded-md"
          onChange={(e) => setJobType(e.target.value)}
        />
        <input
          type="number"
          value={experienceYears}
          placeholder="Years of experience"
          className="bg-transparent p-2 border-white border-2 rounded-md"
          onChange={(e) => setExperienceYears(Number(e.target.value))}
          min={0}
        />

        <button
          className="p-2 rounded-md bg-zinc-500 hover:bg-zinc-600"
          onClick={() => handleGenerate({ name, job, skills, experienceYears })}
        >
          Generate
        </button>
      </div>
    </>
  );
}
