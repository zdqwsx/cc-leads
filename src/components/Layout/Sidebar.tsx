import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, PlayCircle, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: '流程全景' },
  { to: '/pages', icon: FileText, label: '页面列表' },
  { to: '/flows', icon: PlayCircle, label: '流程模拟' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen flex flex-col transition-all duration-300 z-50 ${
        collapsed ? 'w-[68px]' : 'w-[220px]'
      }`}
      style={{
        background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
      }}
    >
      {/* Logo区域 */}
      <div className="flex items-center gap-3 px-5 h-16 shrink-0 border-b border-white/[0.06]">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: 'linear-gradient(135deg, #0089FF 0%, #00C6FF 100%)',
            boxShadow: '0 4px 12px rgba(0, 137, 255, 0.4)',
          }}
        >
          <Sparkles size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <span className="text-sm font-semibold text-white block truncate">Leads需求文档</span>
            <span className="text-[10px] text-white/30 block">Interactive Spec</span>
          </div>
        )}
      </div>

      {/* 导航 */}
      <nav className="flex-1 py-4 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive =
            item.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={() =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'
                }`
              }
              style={() =>
                isActive
                  ? {
                      background: 'linear-gradient(135deg, rgba(0, 137, 255, 0.2) 0%, rgba(0, 198, 255, 0.1) 100%)',
                      boxShadow: '0 0 20px rgba(0, 137, 255, 0.15)',
                      border: '1px solid rgba(0, 137, 255, 0.2)',
                    }
                  : { border: '1px solid transparent' }
              }
            >
              <item.icon size={18} className={`shrink-0 ${isActive ? 'text-[#00C6FF]' : ''}`} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* 底部折叠按钮 */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-11 border-t border-white/[0.06] text-white/25 hover:text-white/50 transition-colors"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
