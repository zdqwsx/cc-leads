import { useSimulatorStore } from '../useSimulatorStore';
import { useState, useEffect } from 'react';

export default function SearchLeadsPage() {
  const {
    leads,
    searchKeyword,
    setSearchKeyword,
    goBack,
    navigateTo,
    setCurrentLeadId,
    searchFrom,
    updateFollowForm,
  } = useSimulatorStore();

  const [localKeyword, setLocalKeyword] = useState(searchKeyword);

  useEffect(() => {
    setLocalKeyword(searchKeyword);
  }, [searchKeyword]);

  const filtered = localKeyword.trim()
    ? leads.filter(
        (l) =>
          l.nameCn.includes(localKeyword) ||
          l.nameEn.toLowerCase().includes(localKeyword.toLowerCase()) ||
          l.phone.includes(localKeyword) ||
          l.phoneMasked.includes(localKeyword)
      )
    : [];

  const handleClick = (lead: (typeof leads)[0]) => {
    if (searchFrom === 'select-leads') {
      updateFollowForm({
        selectedLeadId: lead.id,
        selectedLeadName: `${lead.nameCn} ${lead.nameEn}`,
      });
      goBack();
    } else {
      setCurrentLeadId(lead.id);
      navigateTo('leads-detail');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F7F8FA]">
      {/* 搜索框 */}
      <div className="bg-white px-4 pt-10 pb-3">
        <div className="flex items-center bg-[#F7F8FA] rounded-xl px-4 py-3 border border-transparent focus-within:border-[#FF6B35]/30 focus-within:bg-white transition-all">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mr-2.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="搜索学生姓名/英文名/手机号"
            value={localKeyword}
            onChange={(e) => {
              setLocalKeyword(e.target.value);
              setSearchKeyword(e.target.value);
            }}
            className="flex-1 bg-transparent text-sm text-[#1F2329] placeholder:text-[#ccc] outline-none"
            autoFocus
          />
          {localKeyword && (
            <button
              onClick={() => {
                setLocalKeyword('');
                setSearchKeyword('');
              }}
              className="ml-2 shrink-0 w-5 h-5 rounded-full bg-[#ccc] flex items-center justify-center active:bg-[#999]"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
          <button
            onClick={() => {
              setLocalKeyword('');
              setSearchKeyword('');
              goBack();
            }}
            className="text-sm text-[#FF6B35] ml-3 shrink-0 font-medium active:opacity-60"
          >
            取消
          </button>
        </div>
      </div>

      {/* 搜索结果 */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {localKeyword.trim() && filtered.length === 0 && (
          <div className="text-center mt-16">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E5E5E5" strokeWidth="1.5" className="mx-auto mb-3">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p className="text-sm text-[#ccc]">未找到匹配的学生</p>
          </div>
        )}
        {!localKeyword.trim() && (
          <div className="text-center mt-16">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E5E5E5" strokeWidth="1.5" className="mx-auto mb-3">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p className="text-sm text-[#ccc]">输入关键词开始搜索</p>
          </div>
        )}
        {filtered.map((lead) => (
          <div
            key={lead.id}
            onClick={() => handleClick(lead)}
            className="bg-white rounded-xl p-4 mb-3 shadow-sm active:scale-[0.99] transition-transform cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1 flex items-center gap-2 min-w-0 mr-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8F5A 100%)' }}>
                  {lead.nameCn?.charAt(0) || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-sm font-bold text-[#1F2329] whitespace-nowrap">{lead.nameCn}</span>
                    <span className="text-xs text-[#666] whitespace-nowrap">{lead.nameEn}</span>
                    <span className={`text-xs ${lead.gender === '男' ? 'text-[#4A90D9]' : 'text-[#E8729A]'}`}>
                      {lead.gender === '男' ? '\u2642' : '\u2640'}
                    </span>
                  </div>
                  <div className="text-xs text-[#999] mt-5">{lead.phoneMasked} | {lead.campus}</div>
                </div>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#FFF5F0] text-[#FF6B35] whitespace-nowrap shrink-0">{lead.lifeCycle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
