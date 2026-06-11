import PhoneFrame from '@/components/PhoneFrame/PhoneFrame';
import { useSimulatorStore } from '@/simulator/useSimulatorStore';
import { RotateCcw, ArrowLeft, Monitor, MousePointerClick, AlertTriangle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { pages } from '@/data/pages';

export default function SimulatorView() {
  const navigate = useNavigate();
  const { resetNavigation, currentPage, isLoggedIn } = useSimulatorStore();

  const currentPageData = pages.find((p) => p.id === currentPage);

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* 顶部栏 */}
      <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-[#0089FF] transition-colors text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            返回首页
          </button>
          <div className="w-px h-5 bg-gray-200" />
          <div className="flex items-center gap-2">
            <Monitor size={20} className="text-[#0089FF]" />
            <h1 className="text-xl font-bold text-[#1F2329]">操作演示</h1>
          </div>
          <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            销售Leads系统 H5
          </span>
        </div>
        <button
          onClick={resetNavigation}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:border-[#0089FF]/30 hover:text-[#0089FF] transition-all text-sm shadow-sm"
        >
          <RotateCcw size={14} />
          重置模拟
        </button>
      </div>

      {/* 主体内容 */}
      <div className="flex-1 flex items-stretch">
        {/* 左侧：手机模拟框 */}
        <div className="flex-1 flex items-center justify-center p-8">
          <PhoneFrame simulatorMode />
        </div>

        {/* 右侧：信息面板 */}
        <div className="w-[380px] bg-white border-l border-gray-100 overflow-y-auto p-6 space-y-5">
          {/* 当前页面信息 */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-100/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#0089FF] animate-pulse" />
              <span className="text-xs font-medium text-[#0089FF]">当前页面</span>
            </div>
            <h3 className="text-lg font-bold text-[#1F2329] mb-1">
              {currentPageData?.title || '登录页'}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {currentPageData?.description || 'CC通过手机号+验证码方式登录销售Leads系统'}
            </p>
            {isLoggedIn && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-600 font-medium">已登录</span>
                <span className="text-[10px] text-gray-400">模拟数据模式</span>
              </div>
            )}
          </div>

          {/* 操作指南 */}
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
              <MousePointerClick size={14} className="text-[#FF6B35]" />
              <h3 className="text-sm font-semibold text-[#1F2329]">操作指南</h3>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-orange-100 text-[#FF6B35] flex items-center justify-center text-xs font-bold shrink-0">1</span>
                <div>
                  <p className="text-sm text-[#1F2329] font-medium">登录系统</p>
                  <p className="text-xs text-gray-400 mt-0.5">输入手机号（非138开头）+ 验证码登录</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#0089FF] flex items-center justify-center text-xs font-bold shrink-0">2</span>
                <div>
                  <p className="text-sm text-[#1F2329] font-medium">浏览功能</p>
                  <p className="text-xs text-gray-400 mt-0.5">点击各按钮跳转不同功能页面</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-green-100 text-[#00C853] flex items-center justify-center text-xs font-bold shrink-0">3</span>
                <div>
                  <p className="text-sm text-[#1F2329] font-medium">管理Leads</p>
                  <p className="text-xs text-gray-400 mt-0.5">排序、搜索、查看详情、编辑</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-[#AA00FF] flex items-center justify-center text-xs font-bold shrink-0">4</span>
                <div>
                  <p className="text-sm text-[#1F2329] font-medium">跟进 & 预约</p>
                  <p className="text-xs text-gray-400 mt-0.5">新增follow、预约到店、查看记录</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-red-100 text-[#FF5252] flex items-center justify-center text-xs font-bold shrink-0">5</span>
                <div>
                  <p className="text-sm text-[#1F2329] font-medium">个人中心</p>
                  <p className="text-xs text-gray-400 mt-0.5">查看预约、退出登录</p>
                </div>
              </div>
            </div>
          </div>

          {/* 异常流程提示 */}
          <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={14} className="text-amber-500" />
              <span className="text-xs font-medium text-amber-600">异常流程测试</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              输入包含 "138" 的手机号将触发「用户未注册」的异常流程。
            </p>
          </div>

          {/* 数据说明 */}
          <div className="rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Info size={14} className="text-gray-400" />
              <span className="text-xs font-medium text-gray-500">数据说明</span>
            </div>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li>- 所有数据均为模拟数据</li>
              <li>- 操作不会持久化保存</li>
              <li>- 点击"重置模拟"可恢复初始状态</li>
              <li>- 预约时间范围：未来15天内</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
