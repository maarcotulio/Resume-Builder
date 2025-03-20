import resumeImg from "@/assets/images/resume.png";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center h-lvh overflow-hidden">
      <div className="bg-white flex-1 relative">
        <div className="p-10 w-full sm:w-[400px] h-full sm:h-[400px] flex-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {children}
        </div>
      </div>

      <div className="bg-brandMidBlue w-1/2 h-full lg:flex justify-center items-center rotate-3 scale-110 hidden overflow-hidden">
        <Image
          src={resumeImg}
          alt="Ilustrative resume"
          className="-rotate-3 w-full rounded-lg scale-x-105 drop-shadow-xl"
        />
      </div>
    </div>
  );
}
