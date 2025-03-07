import Link from "next/link";
import RegisterForm from "./RegisterForm";
import service from "@/services";
import { hash } from "bcryptjs";
import { registerSchema } from "@/schemas/authShema";

export default function Signup() {
  async function registerAction(formData: FormData) {
    "use server";

    const { success, data } = registerSchema.safeParse(
      Object.fromEntries(formData)
    );

    if (!success) {
      return null;
    }

    const password = await hash(data.password, 12);

    const hasUserEmail = await service.findUserByEmail({
      email: data.email,
    });

    if (hasUserEmail) {
      return { error: "Email is already in use" };
    }

    await service.createUser({
      name: data.name,
      email: data.email,
      password,
    });
    return;
  }

  return (
    <div className="flex flex-col w-full h-full justify-center space-y-4">
      <div>
        <h1 className="text-left font-bold text-2xl">Signup</h1>
        <Link href="/auth/signin" className="text-md underline">
          To login in the account.
        </Link>
      </div>

      <RegisterForm registerAction={registerAction} />
    </div>
  );
}
