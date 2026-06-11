import { useSimulatorStore } from '../useSimulatorStore';

export default function HomePage() {
  const { navigateTo, activeTab, setActiveTab } = useSimulatorStore();

  return (
    <div className="flex flex-col h-full bg-[#F7F8FA]">
      {/* 头部渐变区域 */}
      <div className="relative px-5 pt-3 pb-8" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF9B5A 100%)' }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">首页</h1>
            <p className="text-sm text-white/70">销售leads管理系统</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
        {/* 装饰 */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10" />
      </div>

      {/* 功能入口 */}
      <div className="flex-1 px-5 -mt-4 pb-20">
        <div className="grid grid-cols-2 gap-3">
          {/* leads 管理 */}
          <button
            onClick={() => navigateTo('leads-manage')}
            className="bg-white rounded-2xl p-5 flex flex-col items-center justify-center gap-3 active:scale-[0.97] transition-transform shadow-sm"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF9B5A 100%)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-[#1F2329]">leads 管理</span>
            <span className="text-xs text-[#999]">管理所有线索</span>
          </button>

          {/* 新增 follow */}
          <button
            onClick={() => {
              useSimulatorStore.getState().resetFollowForm();
              navigateTo('add-follow');
            }}
            className="bg-white rounded-2xl p-5 flex flex-col items-center justify-center gap-3 active:scale-[0.97] transition-transform shadow-sm"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF9B5A 100%)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-[#1F2329]">新增 follow</span>
            <span className="text-xs text-[#999]">添加跟进记录</span>
          </button>
        </div>

        {/* 快捷信息卡片 */}
        <div className="mt-4 bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-[#1F2329]">快捷操作</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => navigateTo('my-appointments')}
              className="flex flex-col items-center gap-2 py-2 active:scale-[0.97] transition-transform"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF5F0] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <span className="text-xs text-[#666]">我的预约</span>
            </button>
            <button
              onClick={() => {
                useSimulatorStore.getState().setSearchFrom('leads-manage');
                useSimulatorStore.getState().setSearchKeyword('');
                navigateTo('search-leads');
              }}
              className="flex flex-col items-center gap-2 py-2 active:scale-[0.97] transition-transform"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF5F0] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <span className="text-xs text-[#666]">搜索线索</span>
            </button>
            <button
              onClick={() => setActiveTab('mine')}
              className="flex flex-col items-center gap-2 py-2 active:scale-[0.97] transition-transform"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF5F0] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span className="text-xs text-[#666]">个人中心</span>
            </button>
          </div>
        </div>
      </div>

      {/* 底部 Tabbar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#F0F0F0] px-10 pb-6 pt-2 flex justify-around">
        <button
          onClick={() => setActiveTab('home')}
          className="flex flex-col items-center gap-0.5"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={activeTab === 'home' ? '#FF6B35' : 'none'}
            stroke={activeTab === 'home' ? '#FF6B35' : '#999'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className={`text-xs ${activeTab === 'home' ? 'text-[#FF6B35] font-medium' : 'text-[#999]'}`}>
            首页
          </span>
        </button>
        <button
          onClick={() => setActiveTab('mine')}
          className="flex flex-col items-center gap-0.5"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={activeTab === 'mine' ? '#FF6B35' : 'none'}
            stroke={activeTab === 'mine' ? '#FF6B35' : '#999'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className={`text-xs ${activeTab === 'mine' ? 'text-[#FF6B35] font-medium' : 'text-[#999]'}`}>
            我的
          </span>
        </button>
      </div>
    </div>
  );
}
