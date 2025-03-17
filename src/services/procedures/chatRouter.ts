import { z } from "zod";
import { publicProcedure } from "../trpc";
import axios from "axios";

const chatRouterSchema = z.object({
  prompt: z.string().nonempty(),
});

export const chatRouter = publicProcedure
  .input(chatRouterSchema)
  .mutation(async ({ input }) => {
    try {
      const response = await axios.post(
        "http://localhost:4891/v1/chat/completions",
        {
          model: "Llama 3 8B Instruct",
          messages: [{ role: "user", content: input.prompt }],
          max_tokens: 8192,
          temperature: 0.28,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  });
