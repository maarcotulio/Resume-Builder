"use client";

import { Input } from "@/app/_components/Input";
import { PromptProps } from "@/types/Prompt";
import { useState } from "react";

export function GenerateData({
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
      <div className="w-full">
        <div className="grid grid-cols-3 gap-4">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Job"
            value={job}
            handleChange={(e) => setJobType(e.target.value)}
          />
          <Input
            type="number"
            value={experienceYears}
            placeholder="Years of experience"
            handleChange={(e) => setExperienceYears(Number(e.target.value))}
            min={0}
          />
        </div>
        <textarea
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full bg-gray-200 border-gray-200 rounded-md border-2 h-auto p-4 my-4"
          placeholder="Write here your skills"
        />
        <div className="flex justify-end items-center">
          <button
            className="py-2 px-4 rounded-md bg-brandMidBlue hover:bg-brandDarkBlue text-white"
            onClick={() =>
              handleGenerate({ name, job, skills, experienceYears })
            }
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
}
