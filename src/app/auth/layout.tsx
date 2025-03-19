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

      <div className="bg-brandMidBlue w-1/2 h-full lg:flex justify-center items-center rotate-3 scale-110 hidden"></div>
    </div>
  );
}
