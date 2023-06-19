import Sidenavbar from "../Sidebar/Sidenavbar";
import Header from "../header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <Sidenavbar />
      <div className="flex-1">
        <Header />
        <main className="p-9 w-full">{children}</main>
      </div>
    </div>
  );
}
