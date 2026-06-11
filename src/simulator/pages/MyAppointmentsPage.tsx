import { useSimulatorStore } from '../useSimulatorStore';
import { useState, useMemo } from 'react';

function getWeekDay(dateStr: string): string {
  const days = ['日', '一', '二', '三', '四', '五', '六'];
  const d = new Date(dateStr.replace(/\//g, '-'));
  return `星期${days[d.getDay()]}`;
}

function isToday(dateStr: string): boolean {
  const today = new Date();
  const d = new Date(dateStr.replace(/\//g, '-'));
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}

function formatDateLabel(dateStr: string): string {
  const d = dateStr.replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3');
  const weekDay = getWeekDay(d);
  if (isToday(d)) {
    return `${d} ${weekDay} 今日`;
  }
  return `${d} ${weekDay}`;
}

export default function MyAppointmentsPage() {
  const {
    appointments,
    navigateTo,
    setCurrentLeadId,
    expandedDates,
    toggleDateExpand,
    showToast,
  } = useSimulatorStore();

  const today = new Date();
  const formatDate = (d: Date) =>
    `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;

  const [startDate, setStartDate] = useState(formatDate(today));
  const [endDate, setEndDate] = useState(() => {
    const end = new Date(today);
    end.setDate(end.getDate() + 15);
    return formatDate(end);
  });

  const startDateOptions = useMemo(() => {
    const opts = [];
    for (let i = 30; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      opts.push(formatDate(d));
    }
    for (let i = 1; i <= 15; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      opts.push(formatDate(d));
    }
    return opts;
  }, []);

  const endDateOptions = useMemo(() => {
    const opts = [];
    for (let i = -30; i <= 15; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      opts.push(formatDate(d));
    }
    return opts;
  }, []);

  const groupedAppointments = useMemo(() => {
    const filtered = appointments.filter((apt) => {
      const aptDate = apt.appointmentTime.split(' ')[0];
      return aptDate >= startDate && aptDate <= endDate;
    });

    const groups: Record<string, typeof filtered> = {};
    filtered.forEach((apt) => {
      const dateKey = apt.appointmentTime.split(' ')[0];
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(apt);
    });

    Object.keys(groups).forEach((key) => {
      groups[key].sort(
        (a, b) =>
          new Date(a.appointmentTime.replace(/\//g, '-')).getTime() -
          new Date(b.appointmentTime.replace(/\//g, '-')).getTime()
      );
    });

    const sortedKeys = Object.keys(groups).sort(
      (a, b) =>
        new Date(b.replace(/\//g, '-')).getTime() -
        new Date(a.replace(/\//g, '-')).getTime()
    );

    return sortedKeys.map((key) => ({ date: key, items: groups[key] }));
  }, [appointments, startDate, endDate]);

  const handleCallPhone = (phone: string) => {
    showToast(`拨打 ${phone}`);
  };

  const handleClickStudent = (leadId: string) => {
    setCurrentLeadId(leadId);
    navigateTo('leads-detail');
  };

  return (
    <div className="flex flex-col h-full bg-[#F7F8FA]">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 pt-10 pb-3 flex items-center">
        <button onClick={() => useSimulatorStore.getState().goBack()} className="p-1 active:opacity-60">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F2329" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-[#1F2329] flex-1 text-center pr-6">我的预约</h1>
      </div>

      {/* 日期筛选 */}
      <div className="bg-white px-4 py-3 flex gap-3 border-t border-[#F5F5F5]">
        <div className="flex-1 flex items-center gap-2 bg-[#F7F8FA] rounded-xl px-3 py-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          <select
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="flex-1 bg-transparent text-xs text-[#1F2329] outline-none appearance-none"
          >
            {startDateOptions.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <span className="text-xs text-[#999] self-center">至</span>
        <div className="flex-1 flex items-center gap-2 bg-[#F7F8FA] rounded-xl px-3 py-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          <select
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="flex-1 bg-transparent text-xs text-[#1F2329] outline-none appearance-none"
          >
            {endDateOptions.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 预约列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-6">
        {groupedAppointments.length === 0 ? (
          <div className="text-center mt-16">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E5E5E5" strokeWidth="1.5" className="mx-auto mb-3">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <p className="text-sm text-[#ccc]">该时间段暂无预约</p>
          </div>
        ) : (
          groupedAppointments.map(({ date, items }) => {
            const isExpanded = !expandedDates.has(date);
            const label = formatDateLabel(date);

            return (
              <div key={date} className="mb-4">
                {/* 日期头部 */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 rounded-full" style={{ background: 'linear-gradient(180deg, #FF6B35 0%, #FF8F5A 100%)' }} />
                    <h3 className="text-sm font-bold text-[#1F2329]">{label}</h3>
                    <span className="text-xs text-[#999]">{items.length}人</span>
                  </div>
                  <button
                    onClick={() => toggleDateExpand(date)}
                    className="text-xs text-[#FF6B35] px-2.5 py-1 rounded-full bg-[#FFF5F0] active:bg-[#FFE8DD] transition-colors"
                  >
                    {isExpanded ? '收起' : '展开'}
                  </button>
                </div>

                {/* 学员列表 */}
                {isExpanded && (
                  <div className="space-y-2">
                    {items.map((apt) => (
                      <div
                        key={apt.id}
                        onClick={() => handleClickStudent(apt.leadId)}
                        className="bg-white rounded-xl p-4 shadow-sm active:scale-[0.99] transition-transform cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8F5A 100%)' }}>
                              {apt.leadNameCn?.charAt(0) || '?'}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-bold text-[#1F2329]">{apt.leadNameCn}</span>
                                <span className="text-xs text-[#666]">{apt.leadNameEn}</span>
                                <span className={`text-xs ${apt.leadGender === '男' ? 'text-[#4A90D9]' : 'text-[#E8729A]'}`}>
                                  {apt.leadGender === '男' ? '\u2642' : '\u2640'}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 mt-1 text-xs text-[#999]">
                                <span>预约 {apt.appointmentTime.split(' ')[1]}</span>
                                <span>到店 {apt.actualArrivalTime?.split(' ')[1] || '--:--'}</span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCallPhone(apt.phone);
                            }}
                            className="w-9 h-9 rounded-full bg-[#E8F5E9] flex items-center justify-center active:bg-[#C8E6C9] transition-colors"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
