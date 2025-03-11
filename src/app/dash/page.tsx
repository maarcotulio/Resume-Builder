"use client";

import { LoaderCircle } from "lucide-react";
import { trpc } from "../_trpc/client";
import { TextArea } from "./components/TextArea";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [response, setResponse] = useState();
  const { mutateAsync, isLoading } = trpc.chat.useMutation();

  const handleGenerate = async (text: string) => {
    const response = await mutateAsync({ prompt: text });

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
        <div className="p-8">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}
    </>
  );
}
