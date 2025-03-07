export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center h-lvh">
      <div className="bg-black p-10 w-full sm:w-96 rounded-3xl h-full sm:h-[400px]">
        {children}
      </div>
    </div>
  );
}
