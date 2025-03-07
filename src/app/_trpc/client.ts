import { createTRPCReact } from "@trpc/react-query";

import { AppRouter } from "@/services/appRouter";

export const trpc = createTRPCReact<AppRouter>({});
