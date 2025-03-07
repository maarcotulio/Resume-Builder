import { signIn } from "@/lib/auth";
import { loginSchema } from "@/schemas/authShema";
import { AuthError, CredentialsSignin } from "next-auth";
import Link from "next/link";
import LoginForm from "./LoginForm";

export default function SignIn() {
  async function loginAction(formData: FormData) {
    "use server";

    const { success, data } = loginSchema.safeParse(
      Object.fromEntries(formData)
    );

    if (!success) {
      return null;
    }

    const { email, password } = data;

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/dash",
      });
    } catch (error) {
      if (error instanceof CredentialsSignin) {
        return {
          error: "Invalid Credentials",
        };
      }

      if (error instanceof AuthError) {
        return {
          error: "Something went wrong. Try again.",
        };
      }

      throw error;
    }
  }

  return (
    <div className="flex flex-col w-full h-full justify-center space-y-4">
      <div>
        <h1 className="text-left font-bold text-2xl">Signin</h1>
        <Link href="/auth/signup" className="text-md underline">
          To create an account.
        </Link>
      </div>

      <LoginForm loginAction={loginAction} />
    </div>
  );
}
