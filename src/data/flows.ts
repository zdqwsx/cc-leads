export interface FlowChoice {
  label: string;
  nextStepId: string;
}

export interface FlowStep {
  id: string;
  pageId: string;
  label: string;
  description?: string;
  choices?: FlowChoice[];
}

export interface FlowData {
  id: string;
  name: string;
  description: string;
  steps: FlowStep[];
}

export const flows: FlowData[] = [
  {
    id: 'login-flow',
    name: '登录流程',
    description: 'CC通过手机号+验证码登录系统',
    steps: [
      {
        id: 'lf-1',
        pageId: 'login',
        label: '输入手机号',
        description: '输入已在馆台系统绑定的手机号',
        choices: [
          { label: '手机号已绑定 → 获取验证码', nextStepId: 'lf-2' },
          { label: '手机号未绑定 → 弹出alert', nextStepId: 'lf-err' },
        ],
      },
      {
        id: 'lf-2',
        pageId: 'login',
        label: '输入验证码',
        description: '输入手机收到的验证码，验证成功后跳转首页',
      },
      {
        id: 'lf-err',
        pageId: 'login',
        label: '未注册提示',
        description: '弹出alert"用户未注册，请联系管理开通账号"',
      },
    ],
  },
  {
    id: 'add-follow-flow',
    name: '新增follow流程',
    description: 'CC新增一条跟进记录的完整操作流程',
    steps: [
      {
        id: 'af-1',
        pageId: 'home',
        label: '点击新增follow',
        description: '在首页点击"新增follow"按钮',
      },
      {
        id: 'af-2',
        pageId: 'add-follow',
        label: '选择leads',
        description: '点击选择leads，跳转选择leads页面',
      },
      {
        id: 'af-3',
        pageId: 'select-leads',
        label: '选择目标学生',
        description: '从学生列表中选择目标leads，支持排序和搜索',
        choices: [
          { label: '直接选择学生', nextStepId: 'af-4' },
          { label: '搜索学生', nextStepId: 'af-search' },
        ],
      },
      {
        id: 'af-search',
        pageId: 'search-leads',
        label: '搜索leads',
        description: '通过姓名、英文名、手机号搜索目标学生',
      },
      {
        id: 'af-4',
        pageId: 'add-follow',
        label: '填写跟进信息',
        description: '填写沟通渠道（必填）、跟进内容（必填）、附件（选填）',
      },
      {
        id: 'af-5',
        pageId: 'add-follow',
        label: '提交follow',
        description: '校验必填项后提交，alert确认"确定提交follow记录"',
      },
    ],
  },
  {
    id: 'leads-manage-flow',
    name: 'Leads管理流程',
    description: 'CC管理被分配的leads，查看详情、预约、跟进',
    steps: [
      {
        id: 'lm-1',
        pageId: 'home',
        label: '点击leads管理',
        description: '在首页点击"leads管理"按钮',
      },
      {
        id: 'lm-2',
        pageId: 'leads-manage',
        label: '查看leads列表',
        description: '浏览CC被分配的所有leads，支持排序',
        choices: [
          { label: '搜索leads', nextStepId: 'lm-search' },
          { label: '点击学生信息', nextStepId: 'lm-3' },
        ],
      },
      {
        id: 'lm-search',
        pageId: 'search-leads',
        label: '搜索leads',
        description: '通过姓名、英文名、手机号搜索',
      },
      {
        id: 'lm-3',
        pageId: 'leads-detail',
        label: '查看leads详情',
        description: '查看学生详细信息，支持编辑、预约、新增follow、查看follow记录',
        choices: [
          { label: '编辑leads', nextStepId: 'lm-edit' },
          { label: '预约', nextStepId: 'lm-apt' },
          { label: '新增follow', nextStepId: 'lm-follow' },
          { label: 'follow记录', nextStepId: 'lm-records' },
        ],
      },
      {
        id: 'lm-edit',
        pageId: 'edit-leads',
        label: '编辑leads',
        description: '编辑学生信息，提交后同步至馆台系统',
      },
      {
        id: 'lm-apt',
        pageId: 'appointment',
        label: '预约到店',
        description: '选择预约到店时间，提交预约',
      },
      {
        id: 'lm-follow',
        pageId: 'add-follow',
        label: '新增follow',
        description: '填写跟进记录并提交',
      },
      {
        id: 'lm-records',
        pageId: 'follow-records',
        label: 'follow记录',
        description: '查看所有跟进记录',
      },
    ],
  },
  {
    id: 'appointment-flow',
    name: '预约流程',
    description: 'CC预约家长与学生到馆',
    steps: [
      {
        id: 'ap-1',
        pageId: 'leads-detail',
        label: '点击预约',
        description: '在leads详情页点击底部"预约"按钮（仅特定生命周期可见）',
      },
      {
        id: 'ap-2',
        pageId: 'appointment',
        label: '选择预约时间',
        description: '选择预约到店时间，不可小于当前时间，最大范围未来≤15天',
      },
      {
        id: 'ap-3',
        pageId: 'appointment',
        label: '确认预约',
        description: '点击提交，alert确认"确定预约？"，确定后同步至馆台系统',
      },
    ],
  },
  {
    id: 'my-appointments-flow',
    name: '我的预约流程',
    description: 'CC查看自己的所有预约记录',
    steps: [
      {
        id: 'ma-1',
        pageId: 'home',
        label: '切换到我的',
        description: '点击底部tabbar"我的"',
      },
      {
        id: 'ma-2',
        pageId: 'mine',
        label: '点击我的预约',
        description: '在"我的"页面点击"我的预约"',
      },
      {
        id: 'ma-3',
        pageId: 'my-appointments',
        label: '查看预约列表',
        description: '按日期分组查看预约记录，支持日期范围筛选和下拉刷新',
      },
    ],
  },
];

export function getFlowById(id: string): FlowData | undefined {
  return flows.find((f) => f.id === id);
}
