import { registerSchema } from "@/schemas/authShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof registerSchema>;

export function useRegisterForm() {
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  return {
    register,
    errors,
  };
}
