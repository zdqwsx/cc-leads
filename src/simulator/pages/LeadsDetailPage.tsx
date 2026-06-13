import { useSimulatorStore } from '../useSimulatorStore';
import { genderOptions, parentTypeOptions, qualityOptions, channelSourceOptions, storeOptions } from '../mockData';
import { useState } from 'react';

export default function LeadsDetailPage() {
  const {
    leads,
    currentLeadId,
    goBack,
    editForm,
    updateEditForm,
    setShowAppointmentModal,
    setShowAddFollowModal,
    setShowFollowRecordsModal,
    showToast,
    showAlert,
  } = useSimulatorStore();

  const [isEditing, setIsEditing] = useState(false);

  const lead = leads.find((l) => l.id === currentLeadId);
  if (!lead) return <div className="p-4 text-center text-[#999]">数据不存在</div>;

  const data = isEditing && editForm ? editForm : lead;

  const canBook = ['新线索', '待预约', '已预约-待上门', '已上门-待支付'].includes(lead.lifeCycle);

  const handleEdit = () => {
    setIsEditing(true);
    useSimulatorStore.setState({ editForm: { ...lead } });
  };

  const handleSave = () => {
    showAlert('确定保存修改？', () => {
      if (editForm) {
        const updated = leads.map((l) => (l.id === lead.id ? { ...editForm } : l));
        useSimulatorStore.setState({ leads: updated });
      }
      setIsEditing(false);
      useSimulatorStore.setState({ editForm: null });
      showToast('保存成功');
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    useSimulatorStore.setState({ editForm: null });
  };

  const renderField = (label: string, value: string, required?: boolean, editable?: boolean, fieldKey?: string) => (
    <div className="flex items-center justify-between py-3 border-b border-[#F5F5F5]">
      <span className="text-sm text-[#1F2329] shrink-0">
        {label} {required && <span className="text-[#FF6B35]">*</span>}
      </span>
      {isEditing && editable && fieldKey ? (
        <input
          value={value}
          onChange={(e) => updateEditForm({ [fieldKey]: e.target.value })}
          className="w-[140px] text-sm text-right text-[#1F2329] outline-none bg-[#F7F8FA] rounded-lg px-3 py-1.5 ml-4"
        />
      ) : (
        <span className="text-sm text-[#666] ml-4 text-right truncate">{value || '-'}</span>
      )}
    </div>
  );

  const renderSelectField = (label: string, value: string, options: string[], required?: boolean, fieldKey?: string) => (
    <div className="flex items-center justify-between py-3 border-b border-[#F5F5F5]">
      <span className="text-sm text-[#1F2329] shrink-0">
        {label} {required && <span className="text-[#FF6B35]">*</span>}
      </span>
      {isEditing && fieldKey ? (
        <select
          value={value}
          onChange={(e) => updateEditForm({ [fieldKey]: e.target.value })}
          className="w-[140px] text-sm text-right text-[#1F2329] outline-none bg-[#F7F8FA] rounded-lg px-3 py-1.5 appearance-none ml-4"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <span className="text-sm text-[#666] ml-4">{value || '-'}</span>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#F7F8FA]">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 pt-10 pb-3 flex items-center justify-between">
        <button onClick={goBack} className="p-1 active:opacity-60">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F2329" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-[#1F2329]">leads 详情</h1>
        {isEditing ? (
          <div className="flex gap-3">
            <button onClick={handleCancelEdit} className="text-sm text-[#999] active:opacity-60">取消</button>
            <button onClick={handleSave} className="text-sm text-[#FF6B35] font-medium active:opacity-60">保存</button>
          </div>
        ) : (
          <button onClick={handleEdit} className="text-sm text-[#FF6B35] font-medium active:opacity-60">编辑</button>
        )}
      </div>

      {/* 详情内容 */}
      <div className={`flex-1 overflow-y-auto px-4 py-3 ${isEditing ? '' : 'pb-24'}`}>
        {/* 学生信息头部卡片 */}
        <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8F5A 100%)' }}>
              {data.nameCn?.charAt(0) || '?'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[#1F2329]">{data.nameCn}</span>
                <span className="text-sm text-[#666]">{data.nameEn}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-xs ${data.gender === '男' ? 'text-[#4A90D9]' : 'text-[#E8729A]'}`}>
                  {data.gender === '男' ? '\u2642' : '\u2640'}
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-[#FFF5F0] text-[#FF6B35]">{lead.lifeCycle}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 基本信息 */}
        <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
          <h3 className="text-sm font-semibold text-[#1F2329] mb-2">基本信息</h3>
          {renderField('学生中文名', data.nameCn, true, isEditing, 'nameCn')}
          {renderField('英文名', data.nameEn, false, isEditing, 'nameEn')}
          {renderSelectField('性别', data.gender, genderOptions, true, 'gender')}
          {renderField('出生日期', data.birthDate, true, isEditing, 'birthDate')}
          {renderField('校区', data.campus)}
          {renderSelectField('初始渠道', data.channel, channelSourceOptions, true, 'channel')}
          {renderSelectField('当前渠道', data.channel, channelSourceOptions, true, 'channel')}
          {renderSelectField('预约到店', data.expectedStore, storeOptions, true, 'expectedStore')}
          {renderSelectField('质量', data.quality, qualityOptions, false, 'quality')}
          {renderField('家庭地址', data.address)}
        </div>

        {/* 时间信息 */}
        <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
          <h3 className="text-sm font-semibold text-[#1F2329] mb-2">时间信息</h3>
          <div className="flex items-center justify-between py-3 border-b border-[#F5F5F5]">
            <span className="text-sm text-[#1F2329]">创建时间</span>
            <span className="text-sm text-[#999]">{data.createdAt}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-[#F5F5F5]">
            <span className="text-sm text-[#1F2329]">分配时间</span>
            <span className="text-sm text-[#999]">{data.assignedAt}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-[#1F2329]">最后 follow</span>
            <span className="text-sm text-[#999]">{data.lastFollowAt}</span>
          </div>
        </div>

        {/* 家长信息 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-[#1F2329] mb-2">家长信息</h3>
          {renderField('家长姓名', data.parentName)}
          {renderSelectField('家长类型', data.parentType, parentTypeOptions, true, 'parentType')}
          {renderField('手机号', data.phone)}
          {renderField('备用家长姓名', data.backupParentName, false, isEditing, 'backupParentName')}
          {renderField('备用手机号', data.backupParentPhone, false, isEditing, 'backupParentPhone')}
        </div>
      </div>

      {/* 底部操作栏 - 非编辑状态显示 */}
      {!isEditing && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#F0F0F0] px-4 py-3 pb-8 flex gap-2">
          <button
            onClick={() => setShowFollowRecordsModal(true)}
            className="flex-1 py-2.5 rounded-xl border border-[#E5E5E5] text-[#666] text-sm active:bg-[#F7F8FA] transition-colors"
          >
            follow记录
          </button>
          <button
            onClick={() => {
              useSimulatorStore.getState().resetFollowForm();
              setShowAddFollowModal(true);
            }}
            className="flex-1 py-2.5 rounded-xl border border-[#FF6B35] text-[#FF6B35] text-sm active:bg-[#FFF5F0] transition-colors"
          >
            新增follow
          </button>
          {canBook && (
            <button
              onClick={() => {
                useSimulatorStore.getState().resetAppointmentForm();
                setShowAppointmentModal(true);
              }}
              className="flex-1 py-2.5 rounded-xl text-white text-sm shadow-sm active:scale-[0.98] transition-transform"
              style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8F5A 100%)' }}
            >
              预约到店
            </button>
          )}
        </div>
      )}
    </div>
  );
}
