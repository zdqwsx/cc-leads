import { Link } from 'react-router-dom';
import { flows } from '@/data/flows';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Clock, GitBranch } from 'lucide-react';

export default function FlowList() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1F2329] mb-2">流程模拟</h1>
        <p className="text-gray-400 text-sm">选择一个流程，逐步体验用户操作路径</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {flows.map((flow, index) => (
          <motion.div
            key={flow.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Link to={`/flow/${flow.id}`}>
              <div className="bg-white rounded-2xl border border-gray-100/80 p-6 hover-lift cursor-pointer group relative overflow-hidden">
                {/* 顶部渐变装饰 */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(90deg, #0089FF, #00C6FF)',
                  }}
                />

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #0089FF 0%, #00C6FF 100%)',
                      boxShadow: '0 4px 12px rgba(0, 137, 255, 0.25)',
                    }}
                  >
                    <Play size={20} className="text-white ml-0.5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1F2329] group-hover:text-[#0089FF] transition-colors">
                      {flow.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={10} />
                        {flow.steps.length} 步
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  {flow.description}
                </p>

                <div className="flex items-center justify-between">
                  {/* 步骤进度条 */}
                  <div className="flex gap-1">
                    {flow.steps.slice(0, 6).map((step, i) => (
                      <div
                        key={step.id}
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${Math.max(24, 48 - i * 4)}px`,
                          background: `linear-gradient(90deg, #0089FF${Math.round(30 + (i / flow.steps.length) * 70).toString(16).padStart(2, '0')}, #00C6FF${Math.round(30 + (i / flow.steps.length) * 70).toString(16).padStart(2, '0')})`,
                        }}
                      />
                    ))}
                    {flow.steps.length > 6 && (
                      <span className="text-[10px] text-gray-300 ml-1 self-center">+{flow.steps.length - 6}</span>
                    )}
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-gray-200 group-hover:text-[#0089FF] transition-all group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
