import { Link } from 'react-router-dom';
import { pages, categoryLabels, categoryColors } from '@/data/pages';
import type { PageData } from '@/data/pages';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function PageCard({ page }: { page: PageData }) {
  const color = categoryColors[page.category];
  return (
    <Link to={`/page/${page.id}`}>
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
        className="bg-white rounded-xl border border-gray-100 overflow-hidden cursor-pointer group"
      >
        <div
          className="h-2"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        />
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-base font-semibold text-[#1F2329] group-hover:text-[#0089FF] transition-colors">
              {page.title}
            </h3>
            <ArrowRight
              size={16}
              className="text-gray-300 group-hover:text-[#0089FF] transition-all group-hover:translate-x-1 mt-0.5 shrink-0"
            />
          </div>
          <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
            {page.description}
          </p>
          <div className="flex items-center justify-between">
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{
                color,
                backgroundColor: `${color}15`,
              }}
            >
              {categoryLabels[page.category]}
            </span>
            <span className="text-xs text-gray-400">
              {page.requirements.length} 条需求
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function PageList() {
  const categories = Object.keys(categoryLabels) as PageData['category'][];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1F2329] mb-2">页面列表</h1>
        <p className="text-gray-500">共 {pages.length} 个页面，点击卡片查看详情</p>
      </div>

      {categories.map((cat) => {
        const catPages = pages.filter((p) => p.category === cat);
        if (catPages.length === 0) return null;
        return (
          <div key={cat} className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-1 h-6 rounded-full"
                style={{ backgroundColor: categoryColors[cat] }}
              />
              <h2 className="text-lg font-semibold text-[#1F2329]">
                {categoryLabels[cat]}
              </h2>
              <span className="text-sm text-gray-400">
                ({catPages.length})
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {catPages.map((page) => (
                <PageCard key={page.id} page={page} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
