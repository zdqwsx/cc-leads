import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPageById, categoryLabels, categoryColors } from '@/data/pages';
import { ArrowLeft, ArrowRight, ChevronLeft, CheckCircle, AlertTriangle, MousePointer, Database, ExternalLink, Image } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PageView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const page = getPageById(id || '');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!page) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-gray-500 mb-4">页面不存在</p>
          <Link to="/" className="text-[#0089FF] hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const color = categoryColors[page.category];
  const label = categoryLabels[page.category];

  const sections = [
    { key: 'requirements', icon: CheckCircle, iconColor: '#00C853', title: '功能需求', items: page.requirements },
    { key: 'interactions', icon: MousePointer, iconColor: '#0089FF', title: '交互说明', items: page.interactions },
    { key: 'errorHandling', icon: AlertTriangle, iconColor: '#FF9100', title: '异常处理', items: page.errorHandling },
    { key: 'dataRules', icon: Database, iconColor: '#AA00FF', title: '数据规则', items: page.dataRules },
  ].filter((s) => s.items.length > 0);

  return (
    <div className="min-h-screen">
      {/* 顶部标题区 - 带渐变背景 */}
      <div
        className="relative overflow-hidden px-8 pt-6 pb-8"
        style={{
          background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-[#0089FF] transition-colors mb-5 text-sm group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          返回
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ color, backgroundColor: `${color}15` }}
            >
              {label}
            </span>
            {page.figmaUrl && (
              <a
                href={page.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1 rounded-full font-semibold bg-purple-50 text-purple-500 hover:bg-purple-100 transition-colors flex items-center gap-1"
              >
                <ExternalLink size={10} />
                Figma设计稿
              </a>
            )}
          </div>
          <h1 className="text-3xl font-bold text-[#1F2329] mb-2">{page.title}</h1>
          <p className="text-gray-500 leading-relaxed max-w-2xl">{page.description}</p>
        </motion.div>
      </div>

      <div className="px-8 -mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* 左侧：UI设计 - 占2列 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl border border-gray-100/80 overflow-hidden shadow-sm sticky top-6">
              <div className="px-5 py-4 border-b border-gray-100/50 flex items-center gap-2">
                <Image size={16} className="text-[#0089FF]" />
                <h2 className="text-sm font-semibold text-[#1F2329]">UI设计</h2>
                {page.uiImages.length > 1 && (
                  <span className="text-xs text-gray-400 ml-auto">
                    {activeImageIndex + 1} / {page.uiImages.length}
                  </span>
                )}
              </div>

              {page.uiImages.length > 0 ? (
                <>
                  <div className="p-4 flex justify-center bg-gradient-to-br from-gray-50/50 to-white min-h-[400px]">
                    <img
                      src={page.uiImages[activeImageIndex]}
                      alt={`${page.title} UI截图`}
                      className="max-w-full max-h-[500px] rounded-xl shadow-lg object-contain"
                    />
                  </div>
                  {page.uiImages.length > 1 && (
                    <div className="px-4 pb-4 flex gap-2 overflow-x-auto">
                      {page.uiImages.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImageIndex(i)}
                          className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            i === activeImageIndex
                              ? 'border-[#0089FF] shadow-md shadow-[#0089FF]/20'
                              : 'border-gray-100 hover:border-gray-200'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : page.figmaUrl ? (
                <div className="p-4">
                  <iframe
                    src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(page.figmaUrl)}`}
                    className="w-full h-[500px] rounded-xl border-0"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-[400px] text-gray-300">
                  暂无UI设计
                </div>
              )}
            </div>
          </motion.div>

          {/* 右侧：需求说明 - 占3列 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-5"
          >
            {sections.map((section, si) => (
              <div key={section.key} className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm">
                <h2 className="text-sm font-semibold text-[#1F2329] mb-4 flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${section.iconColor}10` }}
                  >
                    <section.icon size={14} style={{ color: section.iconColor }} />
                  </div>
                  {section.title}
                  <span className="text-xs text-gray-300 font-normal ml-1">{section.items.length}</span>
                </h2>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed group">
                      {section.key === 'requirements' ? (
                        <span
                          className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5"
                          style={{ backgroundColor: color }}
                        >
                          {i + 1}
                        </span>
                      ) : (
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                          style={{ backgroundColor: section.iconColor }}
                        />
                      )}
                      <span className="group-hover:text-[#1F2329] transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* 页面流程 */}
            <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-[#1F2329] mb-4 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#FF5252]/10">
                  <ArrowRight size={14} className="text-[#FF5252]" />
                </div>
                页面流程
              </h2>
              <div className="flex flex-wrap gap-4">
                {page.prevPages.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 mb-2 font-medium">上游页面</p>
                    <div className="flex flex-wrap gap-2">
                      {page.prevPages.map((pid) => {
                        const p = getPageById(pid);
                        if (!p) return null;
                        return (
                          <Link
                            key={pid}
                            to={`/page/${pid}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-sm text-gray-600 hover:bg-[#0089FF]/10 hover:text-[#0089FF] transition-colors"
                          >
                            <ArrowLeft size={12} />
                            {p.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
                {page.nextPages.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 mb-2 font-medium">下游页面</p>
                    <div className="flex flex-wrap gap-2">
                      {page.nextPages.map((pid) => {
                        const p = getPageById(pid);
                        if (!p) return null;
                        return (
                          <Link
                            key={pid}
                            to={`/page/${pid}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0089FF]/5 text-sm text-[#0089FF] hover:bg-[#0089FF]/10 transition-colors"
                          >
                            {p.title}
                            <ArrowRight size={12} />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
                {page.prevPages.length === 0 && page.nextPages.length === 0 && (
                  <p className="text-sm text-gray-400">该页面暂无上下游关联</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="h-10" />
    </div>
  );
}
