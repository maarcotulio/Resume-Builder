"use client";

import { LoaderCircle } from "lucide-react";
import { trpc } from "../_trpc/client";
import { GenerateData } from "./components/GenerateData";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { PromptProps } from "@/types/Prompt";
import remarkGfm from "remark-gfm";
import "./style.css";
import toast from "react-hot-toast";

export default function Home() {
  const [response, setResponse] = useState("");
  const { mutateAsync, isLoading } = trpc.chat.useMutation();

  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (contentRef.current) {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = contentRef.current;

      const options = {
        margin: 10,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      html2pdf().from(element).set(options).save();
    }
  };

  const handleGenerate = async ({
    name,
    job,
    skills,
    experienceYears,
  }: PromptProps) => {
    try {
      const response = await mutateAsync({
        prompt: `Generate a professional resume for a ${job} named ${name}.  The person has ${experienceYears} years of experience. Skills include ${skills}. Use a formal tone. Include a summary, experience, skills, and education sections.`,
      });

      setResponse(response.choices[0].message.content);
    } catch {
      toast.error("Failed to connect to the AI");
    }
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
        <div className="relative">
          <div className="flex flex-col sm:flex-row items-center w-full h-full justify-center p-4 gap-4 overflow-hidden">
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="w-full sm:h-full h-screen border border-gray-400 p-4 bg-transparent scroll-smooth resize-none"
            />
            <div
              className="p-4 w-full h-full bg-white markdown-body drop-shadow-xl"
              ref={contentRef}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {response}
              </ReactMarkdown>
            </div>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-brandMidBlue text-white rounded-md hover:bg-brandDarkBlue absolute right-4 transition-all"
          >
            Download as PDF
          </button>
        </div>
      )}
    </>
  );
}
