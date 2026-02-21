import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div className="flex min-h-screen bg-[#020617]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto lg:pl-0 pt-20 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
}