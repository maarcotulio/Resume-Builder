"use client";

import { Input } from "@/app/_components/Input";
import { PasswordSVG } from "@/assets/svg/password";
import { AtSign } from "@/assets/svg/atSign";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { useRegisterForm } from "./useRegisterForm";
import { PersonIcon } from "@radix-ui/react-icons";

interface RegisterFormProps {
  registerAction: (
    formData: FormData
  ) => Promise<null | undefined | { error: string }>;
}

export default function RegisterForm({ registerAction }: RegisterFormProps) {
  const { errors, register } = useRegisterForm();

  const [, dispatchAction, isPending] = useActionState(
    async (_previousData: any, formData: FormData) => {
      const response = await registerAction(formData);

      if (response?.error) {
        toast.error(response.error);
      }
    },
    null
  );

  return (
    <form action={dispatchAction} className="flex flex-col gap-4" noValidate>
      <Input
        icon={PersonIcon}
        placeholder="Username"
        error={errors.name?.message}
        {...register("name")}
      />
      <Input
        type="email"
        icon={AtSign}
        placeholder="example@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        type="password"
        icon={PasswordSVG}
        placeholder="Password"
        error={errors.password?.message}
        {...register("password")}
      />

      <button
        className="border-2 border-white p-2 rounded-md flex items-center justify-center"
        disabled={isPending}
      >
        {isPending ? <LoaderCircle className="animate-spin" /> : "Criar Conta"}
      </button>
    </form>
  );
}
