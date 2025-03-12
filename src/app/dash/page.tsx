"use client";

import { LoaderCircle } from "lucide-react";
import { trpc } from "../_trpc/client";
import { TextArea } from "./components/TextArea";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { PromptProps } from "@/types/Prompt";

export default function Home() {
  const [response, setResponse] = useState();
  const { mutateAsync, isLoading } = trpc.chat.useMutation();

  const contentRef = useRef("");

  const handleDownloadPdf = async () => {
    const element = contentRef.current;
    if (!element) return;

    const html2pdf = (await import("html2pdf.js")).default;

    const opt = {
      margin: 0.5,
      filename: "exported-document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

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
      {isLoading && <LoaderCircle className="animate-spin" size={48} />}

      {!!response && isLoading && (
        <div className="flex justify-center flex-col items-center w-1/2 gap-2 my-8">
          <h1 className="text-2xl font-bold">Resume</h1>
          <div>
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
          <button
            onClick={handleDownloadPdf}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Download PDF
          </button>
        </div>
      )}
    </>
  );
}
