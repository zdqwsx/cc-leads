import { useSimulatorStore } from '../useSimulatorStore';

export default function FollowRecordsPage() {
  const {
    currentLeadId,
    followRecords,
    goBack,
    expandedRecords,
    toggleRecordExpand,
  } = useSimulatorStore();

  const records = followRecords[currentLeadId || ''] || [];

  const sortedRecords = [...records].sort((a, b) =>
    new Date(b.time.replace(/\//g, '-')).getTime() -
    new Date(a.time.replace(/\//g, '-')).getTime()
  );

  return (
    <div className="flex flex-col h-full bg-[#F7F8FA]">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 pt-10 pb-3 flex items-center">
        <button onClick={goBack} className="p-1 active:opacity-60">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F2329" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-[#1F2329] flex-1 text-center pr-6">follow记录</h1>
      </div>

      {/* 记录列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-6">
        {sortedRecords.length === 0 ? (
          <div className="text-center mt-16">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E5E5E5" strokeWidth="1.5" className="mx-auto mb-3">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            <p className="text-sm text-[#ccc]">暂无跟进记录</p>
          </div>
        ) : (
          <div className="relative">
            {/* 时间线 */}
            <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-[#F0F0F0]" />

            {sortedRecords.map((record, index) => {
              const isExpanded = expandedRecords.has(record.id);
              const shouldTruncate = record.content.length > 80;

              return (
                <div key={record.id} className="relative pl-10 mb-4">
                  {/* 时间线节点 */}
                  <div className="absolute left-[13px] top-3 w-3 h-3 rounded-full border-2 border-[#FF6B35] bg-white z-10" />

                  {/* 记录卡片 */}
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    {/* 记录时间 */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        <span className="text-xs text-[#666]">{record.time}</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#FFF5F0] text-[#FF6B35]">{record.channel}</span>
                    </div>

                    {/* 沟通内容 */}
                    <div className="mb-2">
                      <p
                        className={`text-sm text-[#1F2329] leading-relaxed ${!isExpanded && shouldTruncate ? 'line-clamp-3' : ''}`}
                        style={!isExpanded && shouldTruncate ? { WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' } : {}}
                      >
                        {record.content}
                      </p>
                      {shouldTruncate && (
                        <button
                          onClick={() => toggleRecordExpand(record.id)}
                          className="text-xs text-[#FF6B35] mt-1 active:opacity-60"
                        >
                          {isExpanded ? '收起' : '展开全部'}
                        </button>
                      )}
                    </div>

                    {/* 附件 */}
                    {record.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#F5F5F5]">
                        {record.attachments.map((att, i) => (
                          <button
                            key={i}
                            onClick={() =>
                              useSimulatorStore.getState().showToast(`打开附件：${att.name}`)
                            }
                            className="flex items-center gap-1 text-xs text-[#FF6B35] bg-[#FFF5F0] px-2.5 py-1 rounded-lg active:bg-[#FFE8DD] transition-colors"
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                            {att.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
