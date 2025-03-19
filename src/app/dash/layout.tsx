import { LogOut } from "lucide-react";
import logoutAction from "./components/Logout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="w-full h-20 flex items-center justify-between bg-zinc-700 p-4">
        <h1 className="font-bold">Resume Builder</h1>

        <form action={logoutAction}>
          <button>
            <LogOut />
          </button>
        </form>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
