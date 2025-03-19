"use client";

import { Input } from "@/app/_components/Input";
import { PasswordSVG } from "@/assets/svg/password";
import { useLoginForm } from "./useLoginForm";
import { AtSign } from "@/assets/svg/atSign";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

interface LoginFormProps {
  loginAction: (
    formData: FormData
  ) => Promise<null | undefined | { error: string }>;
}

export default function LoginForm({ loginAction }: LoginFormProps) {
  const { errors, register } = useLoginForm();

  const [, dispatchAction, isPending] = useActionState(
    async (_previousData: any, formData: FormData) => {
      const response = await loginAction(formData);

      if (response?.error) {
        toast.error(response.error);
      }
    },
    null
  );

  return (
    <form action={dispatchAction} className="flex flex-col gap-4" noValidate>
      <Input
        icon={AtSign}
        placeholder="Email"
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
        className="bg-brandMidBlue hover:bg-brandLightBlue hover:text-black text-white transition-all p-2 rounded-md flex items-center justify-center"
        disabled={isPending}
      >
        {isPending ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          "Logar na Conta"
        )}
      </button>
    </form>
  );
}
