import { Outlet } from "react-router-dom";

export default function DashBoard() {
  return (
    <div className="
      flex flex-col relative
      w-full min-h-screen bg-white shadow-md
      max-w-[1200px] mx-auto
      px-4
    ">
      <Outlet />
    </div>
  );
}
