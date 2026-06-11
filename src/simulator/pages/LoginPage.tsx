import { useSimulatorStore } from '../useSimulatorStore';

export default function LoginPage() {
  const {
    loginPhone,
    loginCode,
    codeSent,
    countdown,
    setLoginPhone,
    setLoginCode,
    sendCode,
    doLogin,
  } = useSimulatorStore();

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 顶部渐变区域 */}
      <div className="relative pt-14 pb-20 px-8" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF9B5A 50%, #FFB88C 100%)' }}>
        <h1 className="text-3xl font-bold text-white mb-2">Hello!</h1>
        <p className="text-sm text-white/80">欢迎来到销售leads系统</p>
        {/* 装饰圆 */}
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute right-12 bottom-4 w-20 h-20 rounded-full bg-white/10" />
      </div>

      {/* 登录表单卡片 */}
      <div className="flex-1 px-6 -mt-10">
        <div className="bg-white rounded-2xl pt-8 pb-6 shadow-lg shadow-black/5">
          <h2 className="text-xl font-bold text-center text-[#1F2329] mb-8">登录</h2>

          {/* 手机号 */}
          <div className="mb-5">
            <label className="text-xs text-[#999] mb-1.5 block px-1">手机号</label>
            <div className="flex items-center bg-[#F7F8FA] rounded-xl px-4 py-3.5 border border-transparent focus-within:border-[#FF6B35]/30 focus-within:bg-white transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mr-3">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              <span className="text-sm text-[#1F2329] mr-2 shrink-0">+86</span>
              <span className="text-[#E5E5E5] mr-2">|</span>
              <input
                type="tel"
                placeholder="请输入手机号"
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                maxLength={11}
                className="flex-1 bg-transparent text-sm text-[#1F2329] placeholder:text-[#ccc] outline-none"
              />
            </div>
          </div>

          {/* 验证码 */}
          <div className="mb-8">
            <label className="text-xs text-[#999] mb-1.5 block px-1">验证码</label>
            <div className="flex items-center bg-[#F7F8FA] rounded-xl px-4 py-3.5 border border-transparent focus-within:border-[#FF6B35]/30 focus-within:bg-white transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mr-3">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type="text"
                placeholder="输入验证码"
                value={loginCode}
                onChange={(e) => setLoginCode(e.target.value)}
                maxLength={6}
                className="flex-1 bg-transparent text-sm text-[#1F2329] placeholder:text-[#ccc] outline-none"
              />
              <button
                onClick={sendCode}
                disabled={codeSent && countdown > 0}
                className={`text-sm whitespace-nowrap ml-3 shrink-0 px-2 py-1 rounded-lg transition-colors ${
                  codeSent && countdown > 0
                    ? 'text-[#ccc] bg-[#F7F8FA]'
                    : 'text-[#FF6B35] bg-[#FF6B35]/8 active:bg-[#FF6B35]/15'
                }`}
              >
                {codeSent && countdown > 0 ? `${countdown}s` : '获取验证码'}
              </button>
            </div>
          </div>

          {/* 登录按钮 */}
          <button
            onClick={doLogin}
            className="w-full py-3.5 rounded-xl text-white font-semibold text-base shadow-lg shadow-[#FF6B35]/30 active:scale-[0.98] transition-transform"
            style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8F5A 100%)' }}
          >
            立即登录
          </button>
        </div>
      </div>

      {/* 底部安全区 */}
      <div className="h-8" />
    </div>
  );
}
