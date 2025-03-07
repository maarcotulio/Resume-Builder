export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-auto">
      <div className="w-full h-20 flex items-center justify-between bg-zinc-700 p-4">
        <h1>Resume Builder</h1>

        <div>Logout</div>
      </div>

      {children}
    </div>
  );
}
