import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Sidebar />
      <main className="ml-[220px] min-h-screen transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}
