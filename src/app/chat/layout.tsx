import SideBar from "./components/SideBar";

export const metadata = {
  title: "Chat GPT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* @ts-ignore */}
      <SideBar />
      {children}
    </div>
  );
}
