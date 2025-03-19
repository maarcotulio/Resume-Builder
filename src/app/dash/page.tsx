"use client";

import { LoaderCircle } from "lucide-react";
import { trpc } from "../_trpc/client";
import { GenerateData } from "./components/GenerateData";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { PromptProps } from "@/types/Prompt";
import remarkGfm from "remark-gfm";
import "./style.css";

// **Jacob**
// **Software Engineer**

// **Summary:**
// Highly motivated and detail-oriented software engineer with 2 years of experience in developing scalable and efficient applications using Next.js and Nest.js. Proficient in designing and implementing robust backend systems, as well as crafting intuitive frontend interfaces. Strong passion for staying up-to-date with the latest technologies and best practices.

// **Experience:**

// * **Software Engineer**, XYZ Corporation (2020-Present)
// 	+ Designed and developed multiple web applications using Next.js and Nest.js
// 	+ Collaborated with cross-functional teams to deliver high-quality products on time
// 	+ Implemented unit testing, integration testing, and debugging techniques to ensure code quality
// 	+ Participated in code reviews and contributed to the improvement of team processes
// * **Junior Software Engineer**, ABC Startups (2019-2020)
// 	+ Assisted in the development of a real-time analytics dashboard using Nest.js
// 	+ Worked on bug fixing, testing, and debugging tasks for multiple projects
// 	+ Gained experience with Agile methodologies and version control systems

// **Skills:**

// * Programming languages: JavaScript (ES6+), TypeScript
// * Frameworks: Next.js, Nest.js
// * Databases: MongoDB, PostgreSQL
// * Operating Systems: Windows, macOS, Linux
// * Version Control Systems: Git, SVN
// * Testing frameworks: Jest, Mocha
// * Agile methodologies: Scrum, Kanban

// **Education:**

// * **Bachelor of Science in Computer Science**, [University Name] (2019)
// 	+ Coursework included data structures, algorithms, computer networks, and software engineering principles

// Note: This is just a sample resume, please make sure to customize it according to your own experiences and qualifications. Also, proofread multiple times for any grammar or formatting errors before submitting it.

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
