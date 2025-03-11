"use client";

import { useState } from "react";

export function TextArea({
  handleGenerate,
}: {
  handleGenerate(text: string): Promise<void>;
}) {
  const [text, setText] = useState("");

  return (
    <>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-transparent h-auto border-2 border-white p-4 rounded-lg"
        placeholder="Write here the preferences and your skills"
      />
      <div className="flex w-full items-center justify-end h-auto   ">
        <button
          className="p-2 rounded-md bg-zinc-500 hover:bg-zinc-600"
          onClick={() => handleGenerate(text)}
        >
          Generate
        </button>
      </div>
    </>
  );
}
