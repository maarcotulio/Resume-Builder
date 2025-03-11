"use client";

import { LoaderCircle } from "lucide-react";
import { trpc } from "../_trpc/client";
import { TextArea } from "./components/TextArea";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { PromptProps } from "@/types/Prompt";

export default function Home() {
  const [response, setResponse] = useState();
  const { mutateAsync, isLoading } = trpc.chat.useMutation();

  const handleGenerate = async ({
    name,
    job,
    skills,
    experienceYears,
  }: PromptProps) => {
    const response = await mutateAsync({
      prompt: `Generate a professional resume for a ${job} named ${name}.  The person has ${experienceYears} years of experience. Skills include ${skills}. Use a formal tone. Include a summary, experience, skills, and education sections.`,
    });

    setResponse(response.choices[0].message.content);
  };

  return (
    <>
      {!isLoading && (
        <div className="w-1/2 my-4">
          <TextArea handleGenerate={handleGenerate} />
        </div>
      )}
      {isLoading && <LoaderCircle className="animate-spin" />}

      {!!response && (
        <div className="p-8 mt-8 w-1/2 margin-auto">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}
    </>
  );
}
