import { useSimulatorStore } from '../useSimulatorStore';
import { useState } from 'react';

export default function AppointmentPage() {
  const {
    currentLeadId,
    leads,
    appointments,
    appointmentForm,
    updateAppointmentForm,
    goBack,
    showToast,
    showAlert,
  } = useSimulatorStore();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const lead = leads.find((l) => l.id === currentLeadId);

  const today = new Date();
  const dateOptions = Array.from({ length: 15 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return {
      value: `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`,
      label: `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`,
      isToday: i === 0,
    };
  });

  const timeOptions = Array.from({ length: 23 }, (_, i) => {
    const h = Math.floor(i / 2) + 9;
    const m = (i % 2) * 30;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  });

  const sortedAppointments = [...appointments].sort((a, b) =>
    new Date(b.appointmentTime.replace(/\//g, '-')).getTime() -
    new Date(a.appointmentTime.replace(/\//g, '-')).getTime()
  );

  const handleSubmit = () => {
    if (!appointmentForm.selectedDate) {
      showToast('请选择日期');
      return;
    }
    if (!appointmentForm.selectedTime) {
      showToast('请选择时间');
      return;
    }

    const selectedDateTime = new Date(
      `${appointmentForm.selectedDate.replace(/\//g, '-')}T${appointmentForm.selectedTime}`
    );
    if (selectedDateTime < today) {
      showToast('不可选择过去时间');
      return;
    }

    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 15);
    if (selectedDateTime > maxDate) {
      showToast('时间范围最大为未来15天');
      return;
    }

    showAlert('确定预约？', () => {
      const now = new Date();
      const newAppointment = {
        id: `apt-${Date.now()}`,
        leadId: currentLeadId || '',
        leadNameCn: lead?.nameCn || '张一飞',
        leadNameEn: lead?.nameEn || 'Lily',
        leadGender: lead?.gender || '男',
        ccName: '赵德群',
        bookedAt: `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
        appointmentTime: `${appointmentForm.selectedDate} ${appointmentForm.selectedTime}`,
        phone: lead?.phoneMasked || '186****1256',
      };

      useSimulatorStore.setState({
        appointments: [newAppointment, ...useSimulatorStore.getState().appointments],
        appointmentForm: { selectedDate: '', selectedTime: '' },
      });

      showToast('预约成功');
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#F7F8FA]">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 pt-10 pb-3 flex items-center">
        <button onClick={goBack} className="p-1 active:opacity-60">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F2329" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-[#1F2329] flex-1 text-center pr-6">预约</h1>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {/* 新增预约 */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-[#1F2329] mb-3">新增预约</p>
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
            {/* 选择日期 */}
            <div className="relative">
              <label className="text-xs text-[#999] mb-1.5 block px-1">选择日期</label>
              <button
                onClick={() => { setShowDatePicker(!showDatePicker); setShowTimePicker(false); }}
                className="w-full flex items-center justify-between bg-[#F7F8FA] rounded-xl px-4 py-3 text-sm border border-transparent active:bg-[#F0F1F3] transition-colors"
              >
                <span className={`flex items-center gap-2 ${appointmentForm.selectedDate ? 'text-[#1F2329]' : 'text-[#ccc]'}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  {appointmentForm.selectedDate || '选择日期'}
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {showDatePicker && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-[#F0F0F0] z-20 max-h-48 overflow-y-auto">
                  {dateOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        updateAppointmentForm({ selectedDate: opt.value });
                        setShowDatePicker(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm active:bg-[#F7F8FA] transition-colors ${
                        appointmentForm.selectedDate === opt.value ? 'text-[#FF6B35] font-medium bg-[#FFF5F0]' : 'text-[#1F2329]'
                      }`}
                    >
                      {opt.label} {opt.isToday && <span className="text-[#FF6B35] text-xs ml-1">今天</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 选择时间 */}
            <div className="relative">
              <label className="text-xs text-[#999] mb-1.5 block px-1">选择时间</label>
              <button
                onClick={() => { setShowTimePicker(!showTimePicker); setShowDatePicker(false); }}
                className="w-full flex items-center justify-between bg-[#F7F8FA] rounded-xl px-4 py-3 text-sm border border-transparent active:bg-[#F0F1F3] transition-colors"
              >
                <span className={`flex items-center gap-2 ${appointmentForm.selectedTime ? 'text-[#1F2329]' : 'text-[#ccc]'}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  {appointmentForm.selectedTime || '选择时间'}
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {showTimePicker && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-[#F0F0F0] z-20 max-h-48 overflow-y-auto">
                  {timeOptions.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        updateAppointmentForm({ selectedTime: t });
                        setShowTimePicker(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm active:bg-[#F7F8FA] transition-colors ${
                        appointmentForm.selectedTime === t ? 'text-[#FF6B35] font-medium bg-[#FFF5F0]' : 'text-[#1F2329]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 预约记录 */}
        <div>
          <p className="text-sm font-semibold text-[#1F2329] mb-3">预约记录</p>
          {sortedAppointments.length === 0 ? (
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E5E5E5" strokeWidth="1.5" className="mx-auto mb-2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <p className="text-xs text-[#ccc]">暂无预约记录</p>
            </div>
          ) : (
            <div className="space-y-2">
              {sortedAppointments.map((apt) => (
                <div key={apt.id} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8F5A 100%)' }}>
                        {apt.leadNameCn?.charAt(0) || '?'}
                      </div>
                      <span className="text-sm font-bold text-[#1F2329]">{apt.leadNameCn}</span>
                    </div>
                    <span className="text-xs text-[#999]">{apt.ccName}</span>
                  </div>
                  <div className="bg-[#F7F8FA] rounded-lg p-2.5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#999]">预约时间</span>
                      <span className="text-[#666]">{apt.appointmentTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#999]">到店时间</span>
                      <span className="text-[#666]">{apt.actualArrivalTime || '待到店'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 提交按钮 */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-4 pb-8 bg-white border-t border-[#F0F0F0]">
        <button
          onClick={handleSubmit}
          disabled={!appointmentForm.selectedDate || !appointmentForm.selectedTime}
          className={`w-full py-3.5 rounded-xl text-white font-semibold text-base shadow-lg active:scale-[0.98] transition-transform ${
            appointmentForm.selectedDate && appointmentForm.selectedTime
              ? 'shadow-[#FF6B35]/20'
              : 'opacity-50 shadow-none'
          }`}
          style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8F5A 100%)' }}
        >
          预约
        </button>
      </div>
    </div>
  );
}
