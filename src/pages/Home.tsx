import { Link } from 'react-router-dom';
import FlowChart from '@/components/FlowChart/FlowChart';
import { pages, categoryLabels, categoryColors } from '@/data/pages';
import { flows } from '@/data/flows';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  ArrowRight,
  Play,
  FileText,
  LayoutDashboard,
  Database,
  BookOpen,
  Users,
  MapPin,
  Zap,
  RefreshCcw,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Smartphone,
} from 'lucide-react';
import type { PageData } from '@/data/pages';

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  gradient,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
  gradient: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-5 hover-lift" style={{ background: gradient }}>
      <div className="relative z-10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Icon size={22} className="text-white" />
        </div>
        <div>
          <p className="text-3xl font-bold text-white">{value}</p>
          <p className="text-xs text-white/70">{label}</p>
        </div>
      </div>
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
      <div className="absolute -right-2 -bottom-6 w-16 h-16 rounded-full bg-white/5" />
    </div>
  );
}

function QuickPageCard({ page, index }: { page: PageData; index: number }) {
  const color = categoryColors[page.category];
  return (
    <Link to={`/page/${page.id}`}>
      <div className="bg-white rounded-2xl border border-gray-100/80 p-5 hover-lift cursor-pointer group relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}66)` }}
        />
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: color }}
            >
              {index + 1}
            </span>
            <h4 className="text-sm font-semibold text-[#1F2329] group-hover:text-[#0089FF] transition-colors truncate">
              {page.title}
            </h4>
          </div>
          <ArrowRight size={14} className="text-gray-200 group-hover:text-[#0089FF] group-hover:translate-x-1 transition-all shrink-0" />
        </div>
        <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">{page.description}</p>
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] px-2.5 py-0.5 rounded-full font-medium"
            style={{ color, backgroundColor: `${color}10` }}
          >
            {categoryLabels[page.category]}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-400">
            {page.requirements.length} 条需求
          </span>
        </div>
      </div>
    </Link>
  );
}

function CollapsibleSection({
  title,
  icon,
  iconBg,
  iconColor,
  defaultOpen = true,
  children,
  extra,
}: {
  title: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  extra?: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const Icon = icon;
  return (
    <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center`} style={{ backgroundColor: iconBg }}>
            <Icon size={16} style={{ color: iconColor }} />
          </div>
          <h2 className="text-lg font-semibold text-[#1F2329]">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          {extra}
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
            {open ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
          </div>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const valueItems = [
  { icon: TrendingUp, color: '#00C853', text: 'CC可随时记录跟进内容，避免信息遗漏，提升客户转化率' },
  { icon: RefreshCcw, color: '#0089FF', text: '与馆台系统数据同步，确保CC和后台信息一致，支持客户交接' },
  { icon: Zap, color: '#FF9100', text: '预约管理帮助CC合理安排到店接待，减少空档和冲突' },
];

export default function Home() {
  const totalRequirements = pages.reduce((sum, p) => sum + p.requirements.length, 0);
  const totalDataRules = pages.reduce((sum, p) => sum + p.dataRules.length, 0);

  return (
    <div className="min-h-screen">
      {/* Hero 区域 */}
      <div
        className="relative overflow-hidden px-8 pt-8 pb-10"
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0F172A 100%)',
        }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #0089FF 0%, transparent 70%)', transform: 'translate(30%, -40%)' }} />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #00C6FF 0%, transparent 70%)', transform: 'translateY(50%)' }} />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mb-2"
              >
                销售Leads系统
                <span className="ml-3 text-lg font-normal text-white/40">可交互需求文档</span>
              </motion.h1>
              <p className="text-sm text-white/40">
                满足CC在馆外接待客户，随时记录客户情况意向 — H5实现方案
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/pages"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white/80 hover:bg-white/15 transition-colors text-sm backdrop-blur-sm border border-white/10"
              >
                <FileText size={16} />
                页面列表
              </Link>
              <Link
                to="/flows"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #0089FF 0%, #00C6FF 100%)',
                  boxShadow: '0 8px 24px rgba(0, 137, 255, 0.35)',
                }}
              >
                <Play size={16} />
              流程模拟
            </Link>
            <Link
              to="/simulator"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #FF8F5A 100%)',
                boxShadow: '0 8px 24px rgba(255, 107, 53, 0.35)',
              }}
            >
              <Smartphone size={16} />
              交互模拟
            </Link>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <StatCard icon={LayoutDashboard} label="总页面数" value={pages.length} color="#0089FF" gradient="linear-gradient(135deg, #0089FF 0%, #0057B7 100%)" />
            <StatCard icon={FileText} label="功能需求数" value={totalRequirements} color="#00C853" gradient="linear-gradient(135deg, #00C853 0%, #009624 100%)" />
            <StatCard icon={Database} label="数据规则数" value={totalDataRules} color="#FF9100" gradient="linear-gradient(135deg, #FF9100 0%, #E65100 100%)" />
            <StatCard icon={Play} label="流程数" value={flows.length} color="#AA00FF" gradient="linear-gradient(135deg, #AA00FF 0%, #7B00CC 100%)" />
          </div>
        </div>
      </div>

      {/* 需求背景 - 可折叠 */}
      <div className="px-8 -mt-2 py-6">
        <CollapsibleSection
          title="需求背景"
          icon={BookOpen}
          iconBg="rgba(0, 137, 255, 0.1)"
          iconColor="#0089FF"
          defaultOpen={true}
        >
          <div className="space-y-5">
            {/* 核心问题 */}
            <div
              className="rounded-xl p-5"
              style={{ background: 'linear-gradient(135deg, rgba(0, 137, 255, 0.06) 0%, rgba(0, 198, 255, 0.03) 100%)' }}
            >
              <p className="text-xs text-[#0089FF] font-semibold mb-2 uppercase tracking-wider">核心问题</p>
              <p className="text-sm text-[#1F2329] leading-relaxed">
                CC（课程顾问）在馆外接待客户时，缺乏便捷的工具随时记录客户沟通情况和意向，导致客户跟进信息滞后、遗漏，影响转化效率。
              </p>
            </div>

            {/* 目标用户 & 场景 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-100/50">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={14} className="text-[#0089FF]" />
                  <p className="text-xs text-gray-400 font-medium">目标用户</p>
                </div>
                <p className="text-sm font-semibold text-[#1F2329]">CC（课程顾问）</p>
                <p className="text-xs text-gray-500 mt-1">负责接待客户、跟进leads、预约到店</p>
              </div>
              <div className="rounded-xl p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-100/50">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-[#FF9100]" />
                  <p className="text-xs text-gray-400 font-medium">使用场景</p>
                </div>
                <p className="text-sm font-semibold text-[#1F2329]">馆外移动办公</p>
                <p className="text-xs text-gray-500 mt-1">外出接待、通勤途中、随时记录</p>
              </div>
            </div>

            {/* 业务价值 */}
            <div>
              <p className="text-xs text-gray-400 font-medium mb-3">业务价值</p>
              <div className="space-y-2.5">
                {valueItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                      <item.icon size={14} style={{ color: item.color }} />
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 实现方案 & 数据流转 */}
            <div className="flex items-center gap-3 text-sm text-gray-500 border-t border-gray-100 pt-4">
              <span className="px-3 py-1.5 rounded-lg bg-[#0089FF]/5 text-[#0089FF] font-medium text-xs border border-[#0089FF]/10">实现方案</span>
              <span className="text-gray-600 font-medium">H5 移动端</span>
              <span className="text-gray-200">|</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#AA00FF]/5 text-[#AA00FF] font-medium text-xs border border-[#AA00FF]/10">数据流转</span>
              <span className="text-gray-600 font-medium">与馆台系统双向同步</span>
            </div>

            {/* 需求项 */}
            <div>
              <p className="text-xs text-gray-400 font-medium mb-3">需求项</p>
              <div className="flex flex-wrap gap-2">
                {['登录鉴权', '新增follow', '选择/搜索leads', 'leads管理', 'leads详情', '预约', 'follow记录', '我的预约', '退出登录'].map((item) => (
                  <span key={item} className="text-xs px-3 py-1.5 rounded-lg bg-gray-50 text-gray-500 border border-gray-100/80 hover:border-[#0089FF]/30 hover:text-[#0089FF] hover:bg-[#0089FF]/5 transition-colors cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>
      </div>

      {/* 流程全景图 - 可折叠 */}
      <div className="px-8 py-2">
        <CollapsibleSection
          title="流程全景图"
          icon={LayoutDashboard}
          iconBg="rgba(0, 137, 255, 0.1)"
          iconColor="#0089FF"
          defaultOpen={true}
          extra={
            <div className="flex items-center gap-4 text-xs text-gray-400">
              {Object.entries(categoryLabels).map(([key, label]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: categoryColors[key as PageData['category']] }}
                  />
                  {label}
                </div>
              ))}
            </div>
          }
        >
          <div className="rounded-2xl overflow-hidden border border-gray-100/50" style={{ height: '480px' }}>
            <FlowChart />
          </div>
        </CollapsibleSection>
      </div>

      {/* 快速访问页面 */}
      <div className="px-8 py-6 pb-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#00C853]/10 flex items-center justify-center">
              <FileText size={16} className="text-[#00C853]" />
            </div>
            <h2 className="text-lg font-semibold text-[#1F2329]">快速访问</h2>
          </div>
          <Link to="/pages" className="text-sm text-[#0089FF] hover:underline flex items-center gap-1 group">
            查看全部 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {pages.map((page, i) => (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <QuickPageCard page={page} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
