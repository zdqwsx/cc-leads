import { create } from 'zustand';
import type { MockLead, MockFollowRecord, MockAppointment } from './mockData';
import { mockLeads, mockFollowRecords, mockAppointments } from './mockData';

// 页面路由类型
export type SimulatorPage =
  | 'login'
  | 'home'
  | 'leads-manage'
  | 'leads-detail'
  | 'add-follow'
  | 'select-leads'
  | 'search-leads'
  | 'appointment'
  | 'follow-records'
  | 'edit-leads'
  | 'mine'
  | 'my-appointments';

// 排序方式
export type SortBy = 'createdAt' | 'assignedAt' | 'lastFollowAt';

interface SimulatorState {
  // 导航
  currentPage: SimulatorPage;
  pageHistory: SimulatorPage[];
  navigateTo: (page: SimulatorPage) => void;
  goBack: () => void;
  resetNavigation: () => void;

  // 登录状态
  isLoggedIn: boolean;
  loginPhone: string;
  loginCode: string;
  codeSent: boolean;
  countdown: number;
  setLoginPhone: (phone: string) => void;
  setLoginCode: (code: string) => void;
  sendCode: () => void;
  doLogin: () => void;
  doLogout: () => void;

  // Tabbar 状态（首页/我的）
  activeTab: 'home' | 'mine';
  setActiveTab: (tab: 'home' | 'mine') => void;

  // Leads 列表状态
  sortBy: SortBy;
  setSortBy: (sort: SortBy) => void;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  searchFrom: 'select-leads' | 'leads-manage'; // 搜索入口来源
  setSearchFrom: (from: 'select-leads' | 'leads-manage') => void;

  // 当前选中的 Leads
  currentLeadId: string | null;
  setCurrentLeadId: (id: string | null) => void;

  // 新增 Follow 表单
  followForm: {
    selectedLeadId: string | null;
    selectedLeadName: string;
    channel: string;
    content: string;
    attachments: string[];
  };
  updateFollowForm: (partial: Partial<SimulatorState['followForm']>) => void;
  resetFollowForm: () => void;

  // 预约表单
  appointmentForm: {
    selectedDate: string;
    selectedTime: string;
  };
  updateAppointmentForm: (partial: Partial<SimulatorState['appointmentForm']>) => void;
  resetAppointmentForm: () => void;

  // 编辑 Leads 表单
  editForm: MockLead | null;
  updateEditForm: (partial: Partial<MockLead>) => void;

  // 弹框状态
  showAppointmentModal: boolean;
  showFollowRecordsModal: boolean;
  showAddFollowModal: boolean;
  setShowAppointmentModal: (show: boolean) => void;
  setShowFollowRecordsModal: (show: boolean) => void;
  setShowAddFollowModal: (show: boolean) => void;

  // Toast / Alert
  toastMessage: string | null;
  alertMessage: string | null;
  alertOnConfirm: (() => void) | null;
  showToast: (msg: string) => void;
  showAlert: (msg: string, onConfirm?: () => void) => void;
  dismissToast: () => void;
  dismissAlert: (confirmed: boolean) => void;

  // 数据（可修改的副本）
  leads: MockLead[];
  followRecords: Record<string, MockFollowRecord[]>;
  appointments: MockAppointment[];

  // Follow 记录展开/收起
  expandedRecords: Set<string>;
  toggleRecordExpand: (id: string) => void;

  // 我的预约展开/收起
  expandedDates: Set<string>;
  toggleDateExpand: (date: string) => void;
}

const defaultFollowForm = {
  selectedLeadId: null as string | null,
  selectedLeadName: '',
  channel: '',
  content: '',
  attachments: [] as string[],
};

const defaultAppointmentForm = {
  selectedDate: '',
  selectedTime: '',
};

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  // 导航
  currentPage: 'login',
  pageHistory: ['login'],
  navigateTo: (page) =>
    set((state) => ({
      currentPage: page,
      pageHistory: [...state.pageHistory, page],
    })),
  goBack: () =>
    set((state) => {
      const history = [...state.pageHistory];
      if (history.length > 1) {
        history.pop();
        return { currentPage: history[history.length - 1], pageHistory: history };
      }
      return state;
    }),
  resetNavigation: () => set({ currentPage: 'login', pageHistory: ['login'] }),

  // 登录
  isLoggedIn: false,
  loginPhone: '',
  loginCode: '',
  codeSent: false,
  countdown: 0,
  setLoginPhone: (phone) => set({ loginPhone: phone }),
  setLoginCode: (code) => set({ loginCode: code }),
  sendCode: () => {
    const phone = get().loginPhone;
    if (!phone || phone.length < 11) {
      get().showToast('请输入正确的手机号');
      return;
    }
    set({ codeSent: true, countdown: 60 });
    get().showToast('验证码已发送');
    // 模拟倒计时
    let count = 60;
    const timer = setInterval(() => {
      count--;
      if (count <= 0) {
        clearInterval(timer);
        set({ countdown: 0, codeSent: false });
      } else {
        set({ countdown: count });
      }
    }, 1000);
  },
  doLogin: () => {
    const { loginPhone, loginCode } = get();
    if (!loginPhone || !loginCode) {
      get().showToast('请输入手机号和验证码');
      return;
    }
    // 模拟：手机号包含 "138" 为未绑定用户
    if (loginPhone.includes('138')) {
      get().showAlert('用户未注册，请联系管理开通账号');
      return;
    }
    set({ isLoggedIn: true });
    get().navigateTo('home');
    get().setActiveTab('home');
    get().showToast('登录成功');
  },
  doLogout: () => {
    set({
      isLoggedIn: false,
      loginPhone: '',
      loginCode: '',
      codeSent: false,
      activeTab: 'home',
    });
    get().navigateTo('login');
  },

  // Tabbar
  activeTab: 'home',
  setActiveTab: (tab) => {
    set({ activeTab: tab });
    if (tab === 'home') {
      get().navigateTo('home');
    } else {
      get().navigateTo('mine');
    }
  },

  // Leads 排序和搜索
  sortBy: 'createdAt',
  setSortBy: (sort) => set({ sortBy: sort }),
  searchKeyword: '',
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
  searchFrom: 'leads-manage',
  setSearchFrom: (from) => set({ searchFrom: from }),

  // 当前 Leads
  currentLeadId: null,
  setCurrentLeadId: (id) => set({ currentLeadId: id }),

  // Follow 表单
  followForm: { ...defaultFollowForm },
  updateFollowForm: (partial) =>
    set((state) => ({ followForm: { ...state.followForm, ...partial } })),
  resetFollowForm: () => set({ followForm: { ...defaultFollowForm } }),

  // 预约表单
  appointmentForm: { ...defaultAppointmentForm },
  updateAppointmentForm: (partial) =>
    set((state) => ({ appointmentForm: { ...state.appointmentForm, ...partial } })),
  resetAppointmentForm: () => set({ appointmentForm: { ...defaultAppointmentForm } }),

  // 编辑表单
  editForm: null,
  updateEditForm: (partial) =>
    set((state) => ({
      editForm: state.editForm ? { ...state.editForm, ...partial } : null,
    })),

  // 弹框
  showAppointmentModal: false,
  showFollowRecordsModal: false,
  showAddFollowModal: false,
  setShowAppointmentModal: (show) => set({ showAppointmentModal: show }),
  setShowFollowRecordsModal: (show) => set({ showFollowRecordsModal: show }),
  setShowAddFollowModal: (show) => set({ showAddFollowModal: show }),

  // Toast / Alert
  toastMessage: null,
  alertMessage: null,
  alertOnConfirm: null,
  showToast: (msg) => {
    set({ toastMessage: msg });
    setTimeout(() => set({ toastMessage: null }), 2000);
  },
  showAlert: (msg, onConfirm) => set({ alertMessage: msg, alertOnConfirm: onConfirm || null }),
  dismissToast: () => set({ toastMessage: null }),
  dismissAlert: (confirmed) => {
    const onConfirm = get().alertOnConfirm;
    set({ alertMessage: null, alertOnConfirm: null });
    if (confirmed && onConfirm) {
      onConfirm();
    }
  },

  // 数据
  leads: JSON.parse(JSON.stringify(mockLeads)),
  followRecords: JSON.parse(JSON.stringify(mockFollowRecords)),
  appointments: JSON.parse(JSON.stringify(mockAppointments)),

  // 展开/收起
  expandedRecords: new Set(),
  toggleRecordExpand: (id) =>
    set((state) => {
      const next = new Set(state.expandedRecords);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { expandedRecords: next };
    }),

  expandedDates: new Set(),
  toggleDateExpand: (date) =>
    set((state) => {
      const next = new Set(state.expandedDates);
      if (next.has(date)) next.delete(date);
      else next.add(date);
      return { expandedDates: next };
    }),
}));
