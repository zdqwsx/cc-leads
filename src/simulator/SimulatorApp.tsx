import { useSimulatorStore, type SimulatorPage } from './useSimulatorStore';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LeadsManagePage from './pages/LeadsManagePage';
import LeadsDetailPage from './pages/LeadsDetailPage';
import AddFollowPage from './pages/AddFollowPage';
import SelectLeadsPage from './pages/SelectLeadsPage';
import SearchLeadsPage from './pages/SearchLeadsPage';
import AppointmentPage from './pages/AppointmentPage';
import FollowRecordsPage from './pages/FollowRecordsPage';
import MinePage from './pages/MinePage';
import MyAppointmentsPage from './pages/MyAppointmentsPage';
import { AnimatePresence, motion } from 'framer-motion';

// 页面组件映射
const pageComponents: Record<SimulatorPage, React.ComponentType> = {
  login: LoginPage,
  home: HomePage,
  'leads-manage': LeadsManagePage,
  'leads-detail': LeadsDetailPage,
  'add-follow': AddFollowPage,
  'select-leads': SelectLeadsPage,
  'search-leads': SearchLeadsPage,
  appointment: AppointmentPage,
  'follow-records': FollowRecordsPage,
  'edit-leads': LeadsDetailPage, // 编辑模式在 LeadsDetailPage 内部处理
  mine: MinePage,
  'my-appointments': MyAppointmentsPage,
};

export default function SimulatorApp() {
  const {
    currentPage,
    showAppointmentModal,
    showFollowRecordsModal,
    showAddFollowModal,
    setShowAppointmentModal,
    setShowFollowRecordsModal,
    setShowAddFollowModal,
    toastMessage,
    alertMessage,
    dismissToast,
    dismissAlert,
    navigateTo,
    currentLeadId,
    setCurrentLeadId,
  } = useSimulatorStore();

  const PageComponent = pageComponents[currentPage] || LoginPage;

  // 处理从 leads-manage 底部按钮触发的弹框
  const handleAppointmentFromList = () => {
    setCurrentLeadId(currentLeadId || 'lead-1');
    navigateTo('appointment');
    setShowAppointmentModal(false);
  };

  const handleFollowRecordsFromList = () => {
    setCurrentLeadId(currentLeadId || 'lead-1');
    navigateTo('follow-records');
    setShowFollowRecordsModal(false);
  };

  const handleAddFollowFromList = () => {
    useSimulatorStore.getState().resetFollowForm();
    if (currentLeadId) {
      const lead = useSimulatorStore.getState().leads.find((l) => l.id === currentLeadId);
      if (lead) {
        useSimulatorStore.getState().updateFollowForm({
          selectedLeadId: lead.id,
          selectedLeadName: `${lead.nameCn} ${lead.nameEn}`,
        });
      }
    }
    navigateTo('add-follow');
    setShowAddFollowModal(false);
  };

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
      {/* 页面内容 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full h-full"
        >
          <PageComponent />
        </motion.div>
      </AnimatePresence>

      {/* Toast 提示 */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-12 left-4 right-4 z-50 flex justify-center pointer-events-none"
          >
            <div className="bg-black/75 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg backdrop-blur-sm">
              {toastMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alert 弹窗 */}
      <AnimatePresence>
        {alertMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            onClick={() => dismissAlert(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 mx-8 shadow-2xl max-w-[260px] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-sm text-[#1F2329] text-center leading-relaxed mb-5">{alertMessage}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => dismissAlert(false)}
                  className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-600 text-sm active:bg-gray-200 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={() => dismissAlert(true)}
                  className="flex-1 py-2 rounded-xl text-white text-sm shadow-md active:scale-[0.97] transition-transform"
                  style={{ background: 'linear-gradient(90deg, #FF6B35 0%, #FF8F5A 100%)' }}
                >
                  确定
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 预约弹框（从leads管理/详情底部触发） */}
      <AnimatePresence>
        {showAppointmentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-end justify-center bg-black/30 backdrop-blur-sm"
            onClick={() => setShowAppointmentModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-t-2xl p-5 w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-base font-medium text-[#1F2329] text-center mb-4">选择操作</p>
              <div className="space-y-2">
                <button
                  onClick={handleAppointmentFromList}
                  className="w-full py-3 rounded-xl bg-orange-50 text-[#FF6B35] text-sm font-medium active:bg-orange-100 transition-colors"
                >
                  新建预约
                </button>
                <button
                  onClick={() => setShowAppointmentModal(false)}
                  className="w-full py-3 rounded-xl bg-gray-50 text-gray-500 text-sm active:bg-gray-100 transition-colors"
                >
                  取消
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Follow记录弹框 */}
      <AnimatePresence>
        {showFollowRecordsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-end justify-center bg-black/30 backdrop-blur-sm"
            onClick={() => setShowFollowRecordsModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-t-2xl p-5 w-full shadow-2xl max-h-[70vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-base font-medium text-[#1F2329]">follow记录</p>
                <button
                  onClick={() => setShowFollowRecordsModal(false)}
                  className="text-gray-400 text-sm"
                >
                  关闭
                </button>
              </div>
              <div className="overflow-y-auto flex-1 -mx-2 px-2">
                <button
                  onClick={handleFollowRecordsFromList}
                  className="w-full py-3 rounded-xl bg-blue-50 text-[#0089FF] text-sm font-medium mb-2 active:bg-blue-100 transition-colors"
                >
                  查看完整 follow 记录
                </button>
                <p className="text-xs text-gray-400 text-center py-4">点击上方查看详细跟进记录</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 新增Follow弹框 */}
      <AnimatePresence>
        {showAddFollowModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-end justify-center bg-black/30 backdrop-blur-sm"
            onClick={() => setShowAddFollowModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-t-2xl p-5 w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-base font-medium text-[#1F2329] text-center mb-4">新增 follow</p>
              <div className="space-y-2">
                <button
                  onClick={handleAddFollowFromList}
                  className="w-full py-3 rounded-xl bg-orange-50 text-[#FF6B35] text-sm font-medium active:bg-orange-100 transition-colors"
                >
                  填写跟进信息
                </button>
                <button
                  onClick={() => setShowAddFollowModal(false)}
                  className="w-full py-3 rounded-xl bg-gray-50 text-gray-500 text-sm active:bg-gray-100 transition-colors"
                >
                  取消
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
