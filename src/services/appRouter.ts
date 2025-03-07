import { chatRouter } from "./procedures/chatRouter";
import { router } from "./trpc";

export const appRouter = router({
  chat: chatRouter,
});

export type AppRouter = typeof appRouter;
