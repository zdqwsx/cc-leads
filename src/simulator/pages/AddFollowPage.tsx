import { useSimulatorStore } from '../useSimulatorStore';
import { channelOptions } from '../mockData';

export default function AddFollowPage() {
  const {
    followForm,
    updateFollowForm,
    goBack,
    navigateTo,
    showToast,
    showAlert,
  } = useSimulatorStore();

  const handleSubmit = () => {
    if (!followForm.selectedLeadId) {
      showToast('请选择follow（leads）');
      return;
    }
    if (!followForm.channel) {
      showToast('请选择沟通渠道');
      return;
    }
    if (!followForm.content.trim()) {
      showToast('请填写跟进内容');
      return;
    }

    showAlert('确定提交follow记录？', () => {
      const newRecord = {
        id: `fr-${Date.now()}`,
        leadId: followForm.selectedLeadId!,
        time: new Date().toLocaleDateString('zh-CN').replace(/\//g, '/'),
        channel: followForm.channel,
        content: followForm.content,
        attachments: followForm.attachments.map((name, i) => ({
          name: name || `附件${i + 1}`,
          type: name.endsWith('.pdf') ? 'pdf' : name.endsWith('.jpg') || name.endsWith('.png') ? 'image' : 'doc',
        })),
      };
      const state = useSimulatorStore.getState();
      const existing = state.followRecords[followForm.selectedLeadId!] || [];
      useSimulatorStore.setState({
        followRecords: {
          ...state.followRecords,
          [followForm.selectedLeadId!]: [newRecord, ...existing],
        },
      });

      const now = new Date();
      const timeStr = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      useSimulatorStore.setState({
        leads: state.leads.map((l) =>
          l.id === followForm.selectedLeadId ? { ...l, lastFollowAt: timeStr } : l
        ),
      });

      showToast('提交成功');
      useSimulatorStore.getState().resetFollowForm();
      goBack();
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
        <h1 className="text-lg font-semibold text-[#1F2329] flex-1 text-center pr-6">新增 follow</h1>
      </div>

      {/* 表单内容 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-5">
          {/* 选择 follow */}
          <div>
            <label className="text-xs text-[#999] mb-1.5 block px-1">
              选择 follow <span className="text-[#FF6B35]">*</span>
            </label>
            <div
              onClick={() => navigateTo('select-leads')}
              className="flex items-center justify-between bg-[#F7F8FA] rounded-xl px-4 py-3.5 cursor-pointer active:bg-[#F0F1F3] transition-colors border border-transparent"
            >
              <span className={`text-sm ${followForm.selectedLeadName ? 'text-[#1F2329]' : 'text-[#ccc]'}`}>
                {followForm.selectedLeadName || '请选择'}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </div>
          </div>

          {/* 沟通渠道 */}
          <div>
            <label className="text-xs text-[#999] mb-1.5 block px-1">
              沟通渠道 <span className="text-[#FF6B35]">*</span>
            </label>
            <div className="bg-[#F7F8FA] rounded-xl px-4 py-3.5 border border-transparent">
              <select
                value={followForm.channel}
                onChange={(e) => updateFollowForm({ channel: e.target.value })}
                className="w-full text-sm text-[#1F2329] outline-none appearance-none bg-transparent"
              >
                <option value="" className="text-[#ccc]">请选择沟通渠道</option>
                {channelOptions.map((ch) => (
                  <option key={ch} value={ch}>{ch}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 跟进内容 */}
          <div>
            <label className="text-xs text-[#999] mb-1.5 block px-1">
              跟进内容 <span className="text-[#FF6B35]">*</span>
            </label>
            <textarea
              value={followForm.content}
              onChange={(e) => updateFollowForm({ content: e.target.value })}
              placeholder="请填写跟进内容"
              rows={5}
              className="w-full bg-[#F7F8FA] rounded-xl px-4 py-3 text-sm text-[#1F2329] placeholder:text-[#ccc] outline-none resize-none border border-transparent focus:border-[#FF6B35]/30 transition-colors"
            />
          </div>

          {/* 上传附件 */}
          <div>
            <label className="text-xs text-[#999] mb-1.5 block px-1">上传附件</label>
            <div className="bg-[#F7F8FA] rounded-xl px-4 py-3.5 border border-dashed border-[#E5E5E5] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#FFF5F0] flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                </div>
                <div className="text-xs">
                  <p className="text-[#666]">上传附件</p>
                  <p className="text-[#ccc] mt-0.5">支持png、JPG、word、pdf</p>
                </div>
              </div>
              <button
                onClick={() => {
                  const fileName = `附件${followForm.attachments.length + 1}.pdf`;
                  updateFollowForm({
                    attachments: [...followForm.attachments, fileName],
                  });
                  showToast(`已添加 ${fileName}`);
                }}
                className="px-3 py-1.5 rounded-lg text-white text-xs active:scale-[0.97] transition-transform"
                style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8F5A 100%)' }}
              >
                上传
              </button>
            </div>
            {followForm.attachments.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {followForm.attachments.map((f, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 bg-[#FFF5F0] text-[#FF6B35] rounded-lg flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                    {f}
                    <button
                      onClick={() =>
                        updateFollowForm({
                          attachments: followForm.attachments.filter((_, idx) => idx !== i),
                        })
                      }
                      className="ml-0.5 text-[#FF6B35]/60 active:text-red-500"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 提交按钮 */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-4 pb-8 bg-white border-t border-[#F0F0F0]">
        <button
          onClick={handleSubmit}
          className="w-full py-3.5 rounded-xl text-white font-semibold text-base shadow-lg shadow-[#FF6B35]/20 active:scale-[0.98] transition-transform"
          style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8F5A 100%)' }}
        >
          提交
        </button>
      </div>
    </div>
  );
}
