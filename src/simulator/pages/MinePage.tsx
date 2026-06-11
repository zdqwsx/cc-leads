import { useSimulatorStore } from '../useSimulatorStore';
import { mockUser } from '../mockData';

export default function MinePage() {
  const { navigateTo, doLogout, activeTab, setActiveTab } = useSimulatorStore();

  return (
    <div className="flex flex-col h-full bg-[#F7F8FA]">
      {/* 头部个人信息区域 */}
      <div className="relative px-5 pt-12 pb-8" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF9B5A 100%)' }}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{mockUser.name}</h1>
            <p className="text-sm text-white/70 mt-1">
              负责校区：{mockUser.campuses.join('、')}
            </p>
          </div>
        </div>
        {/* 装饰 */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute right-20 -top-4 w-16 h-16 rounded-full bg-white/5" />
      </div>

      {/* 功能菜单 */}
      <div className="px-5 -mt-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* 我的预约 */}
          <button
            onClick={() => navigateTo('my-appointments')}
            className="w-full px-4 py-4 flex items-center justify-between active:bg-[#F7F8FA] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FFF5F0] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#1F2329]">我的预约</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="h-[1px] bg-[#F5F5F5] mx-4" />

          {/* 退出登录 */}
          <button
            onClick={() =>
              useSimulatorStore.getState().showAlert('确定退出登录？', () => doLogout())
            }
            className="w-full px-4 py-4 flex items-center justify-between active:bg-[#F7F8FA] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FFF5F0] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#1F2329]">退出登录</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* 底部 Tabbar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#F0F0F0] px-10 pb-6 pt-2 flex justify-around">
        <button onClick={() => setActiveTab('home')} className="flex flex-col items-center gap-0.5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill={activeTab === 'home' ? '#FF6B35' : 'none'} stroke={activeTab === 'home' ? '#FF6B35' : '#999'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className={`text-xs ${activeTab === 'home' ? 'text-[#FF6B35] font-medium' : 'text-[#999]'}`}>首页</span>
        </button>
        <button onClick={() => setActiveTab('mine')} className="flex flex-col items-center gap-0.5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill={activeTab === 'mine' ? '#FF6B35' : 'none'} stroke={activeTab === 'mine' ? '#FF6B35' : '#999'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
          <span className={`text-xs ${activeTab === 'mine' ? 'text-[#FF6B35] font-medium' : 'text-[#999]'}`}>我的</span>
        </button>
      </div>
    </div>
  );
}
