"use client";

import { LoaderCircle } from "lucide-react";
import { trpc } from "../_trpc/client";
import { GenerateData } from "./components/GenerateData";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { PromptProps } from "@/types/Prompt";
import remarkGfm from "remark-gfm";
import "./style.css";

export default function Home() {
  const [response, setResponse] = useState("");
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

  const hasResponse = !!response;

  return (
    <>
      {!isLoading && !hasResponse && (
        <div className="w-1/2 my-4">
          <GenerateData handleGenerate={handleGenerate} />
        </div>
      )}
      {isLoading && !hasResponse && (
        <LoaderCircle className="animate-spin" size={48} />
      )}

      {hasResponse && !isLoading && (
        <div className="flex items-center w-full h-full justify-center p-4 gap-4">
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="w-full h-full border p-2 rounded-lg bg-transparent scroll-smooth "
          />
          <div className="p-4 border w-full h-full markdown-body rounded-lg">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {response}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </>
  );
}
