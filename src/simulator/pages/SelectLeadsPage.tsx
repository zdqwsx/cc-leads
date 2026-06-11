import { useSimulatorStore } from '../useSimulatorStore';
import type { SortBy } from '../useSimulatorStore';

export default function SelectLeadsPage() {
  const {
    leads,
    sortBy,
    setSortBy,
    searchKeyword,
    goBack,
    navigateTo,
    updateFollowForm,
    setSearchKeyword,
  } = useSimulatorStore();

  let filtered = leads;
  if (searchKeyword.trim()) {
    const kw = searchKeyword.toLowerCase();
    filtered = leads.filter(
      (l) =>
        l.nameCn.includes(kw) ||
        l.nameEn.toLowerCase().includes(kw) ||
        l.phone.includes(kw) ||
        l.phoneMasked.includes(kw)
    );
  }

  const sorted = [...filtered].sort((a, b) => {
    const timeA = new Date(a[sortBy].replace(/\//g, '-')).getTime();
    const timeB = new Date(b[sortBy].replace(/\//g, '-')).getTime();
    return timeB - timeA;
  });

  const sortLabels: Record<SortBy, string> = {
    createdAt: '创建时间',
    assignedAt: '分配时间',
    lastFollowAt: '最后follow',
  };

  const handleSelect = (lead: (typeof leads)[0]) => {
    updateFollowForm({
      selectedLeadId: lead.id,
      selectedLeadName: `${lead.nameCn} ${lead.nameEn}`,
    });
    goBack();
  };

  return (
    <div className="flex flex-col h-full bg-[#F7F8FA]">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 pt-10 pb-3 flex items-center justify-between">
        <button onClick={goBack} className="p-1 active:opacity-60">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F2329" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-[#1F2329]">选择 follow</h1>
        <button
          onClick={() => {
            setSearchKeyword('');
            navigateTo('search-leads');
          }}
          className="p-1 active:opacity-60"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1F2329" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      {/* 排序条件 */}
      <div className="bg-white px-4 py-2.5 flex gap-2 border-t border-[#F5F5F5]">
        {(Object.keys(sortLabels) as SortBy[]).map((key) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className={`px-3.5 py-1.5 rounded-full text-xs flex items-center gap-1 transition-all active:scale-[0.97] ${
              sortBy === key
                ? 'text-white shadow-sm'
                : 'bg-[#F7F8FA] text-[#666]'
            }`}
            style={sortBy === key ? { background: 'linear-gradient(135deg, #FF6B35 0%, #FF8F5A 100%)' } : {}}
          >
            {sortLabels[key]}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        ))}
      </div>

      {/* 列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-6">
        {sorted.length === 0 ? (
          <div className="text-center text-[#ccc] text-sm mt-10">暂无数据</div>
        ) : (
          sorted.map((lead) => (
            <div
              key={lead.id}
              onClick={() => handleSelect(lead)}
              className="bg-white rounded-xl p-4 mb-3 shadow-sm active:scale-[0.99] transition-transform cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#1F2329]">{lead.nameCn}</span>
                  <span className="text-sm text-[#666]">{lead.nameEn}</span>
                  <span className={`text-sm ${lead.gender === '男' ? 'text-[#4A90D9]' : 'text-[#E8729A]'}`}>
                    {lead.gender === '男' ? '\u2642' : '\u2640'}
                  </span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#FFF5F0] text-[#FF6B35]">{lead.lifeCycle}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#999] mb-2.5">
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  {lead.phoneMasked}
                </span>
                <span>{lead.campus}</span>
                <span>{lead.age}岁</span>
              </div>
              <div className="bg-[#F7F8FA] rounded-lg p-2.5 space-y-1.5">
                {[
                  { label: '创建时间', value: lead.createdAt },
                  { label: '分配时间', value: lead.assignedAt },
                  { label: '最后 follow', value: lead.lastFollowAt },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-xs">
                    <span className="text-[#999]">{item.label}</span>
                    <span className="text-[#666]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
