import Sidenavbar from "../sidebar/Sidenavbar";
import Header from "../header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <Sidenavbar />
      <div className="flex-1">
        <Header />
        <main className="p-9 bg-gray-100 border w-full">{children}</main>
      </div>
    </div>
  );
}
