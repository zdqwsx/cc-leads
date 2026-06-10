export interface PageData {
  id: string;
  title: string;
  category: 'login' | 'home' | 'follow' | 'leads' | 'mine';
  description: string;
  figmaUrl?: string;
  uiImages: string[];
  requirements: string[];
  interactions: string[];
  errorHandling: string[];
  dataRules: string[];
  prevPages: string[];
  nextPages: string[];
}

const FIGMA_BASE = 'https://www.figma.com/design/HeHHCPzbX3nVTeBgAgM2wA/%E7%BB%98%E6%9C%AC%E9%A6%86?node-id=1-657&t=4b8ILhZ1HtHcbxkS-1';

export const pages: PageData[] = [
  {
    id: 'login',
    title: '登录页',
    category: 'login',
    description: 'CC通过手机号+验证码方式登录销售Leads系统，手机号需先在馆台系统中绑定。',
    figmaUrl: FIGMA_BASE,
    uiImages: ['/ui/登录.png', '/ui/登录获取验证码.png', '/ui/立即登录.png'],
    requirements: [
      'CC手机号先由馆台系统"机构入驻→机构管理→员工管理"绑定',
      'CC输入手机号后，点击"获取验证码"进行判断',
      '手机号已在"馆台系统"中绑定 → 跳转至"首页"',
      '手机号未在"馆台系统"中绑定 → 弹出alert"用户未注册，请联系管理开通账号"',
      '登录有效期：24h',
    ],
    interactions: [
      '输入手机号 → 点击"获取验证码"',
      '验证码验证成功 → 跳转首页',
      '验证码验证失败（手机号未绑定）→ 弹出alert提示',
    ],
    errorHandling: [
      '手机号未在馆台系统绑定：弹出alert"用户未注册，请联系管理开通账号"',
    ],
    dataRules: [
      '登录有效期24小时',
      '手机号需在馆台系统"员工管理"中预先绑定',
    ],
    prevPages: [],
    nextPages: ['home'],
  },
  {
    id: 'home',
    title: '首页',
    category: 'home',
    description: '系统首页，包含leads管理和新增follow两个核心入口，底部tabbar切换首页和个人中心。',
    figmaUrl: FIGMA_BASE,
    uiImages: ['/ui/首页.png'],
    requirements: [
      '首页包含两个按钮："leads管理"、"新增follow"',
      '底部tabbar包含两个按钮："首页"、"我的"',
    ],
    interactions: [
      '点击"leads管理" → 跳转至leads管理页',
      '点击"新增follow" → 跳转至新增follow页',
      '点击底部tabbar"首页" → 停留在首页',
      '点击底部tabbar"我的" → 跳转至我的页面',
    ],
    errorHandling: [],
    dataRules: [],
    prevPages: ['login'],
    nextPages: ['leads-manage', 'add-follow', 'mine'],
  },
  {
    id: 'add-follow',
    title: '新增follow',
    category: 'follow',
    description: 'CC新增一条跟进记录，需选择leads、填写沟通渠道、跟进内容和附件。',
    figmaUrl: FIGMA_BASE,
    uiImages: ['/ui/新增 follow.png', '/ui/新增 follow (1).png', '/ui/新增follow（提交）.png'],
    requirements: [
      '选择leads：必填项，点击跳转"选择leads"页',
      '沟通渠道：必填项，接口同步"馆台系统→新增follow→沟通渠道"数据',
      '跟进内容：必填项，CC自主填写',
      '附件：非必填项，最多5个，支持图片(png/JPG/jpeg)、Excel(xls/x)、Word(doc/x)、pdf，最大10M',
      '"提交"按钮：校验必填项是否填写',
    ],
    interactions: [
      '点击"选择leads" → 跳转选择leads页面',
      '选择leads后返回 → 将"学生姓名/英文名"带回选择leads选择框',
      '未填写必填项点击提交 → toast提示"请填写必填项"',
      '已填写必填项点击提交 → alert提示"确定提交follow记录"，按钮"确定""取消"',
      '点击"确定" → 提交follow记录',
    ],
    errorHandling: [
      '未填写必填项：toast提示"请填写必填项"',
      '附件超过5个：提示限制',
      '附件超过10M：提示大小限制',
      '附件格式不支持：提示格式限制',
    ],
    dataRules: [
      '根据CC用户id、leads用户id，同步至馆台系统对应CC、leads的跟进记录',
      'follow记录的时间为点击"提交"按钮时间',
    ],
    prevPages: ['home', 'leads-detail'],
    nextPages: ['select-leads'],
  },
  {
    id: 'select-leads',
    title: '选择leads',
    category: 'leads',
    description: '从CC被分配的学生列表中选择目标leads，支持排序和搜索。',
    figmaUrl: FIGMA_BASE,
    uiImages: ['/ui/选择 follow.png', '/ui/选择 follow (1).png'],
    requirements: [
      '排序条件：leads分配时间 | 创建时间 | 最后提交follow记录的时间',
      '学生信息list展示：学生中文名/英文名 | 年龄 | 性别',
      '家长手机号：掩码中间四位',
      '校区：学生所属校区',
      '生命周期：同步"馆台系统"中学生生命周期',
      '创建时间：leads的创建时间',
      '分配时间：leads被分配给最新CC的时间',
      '最后跟进时间：最后提交follow记录的时间',
      '单选模式',
    ],
    interactions: [
      '点击目标leads → 返回"新增follow"页，将"学生姓名/英文名"带回选择leads选择框',
      '点击排序条件 → 切换排序方式（参见公共排序规则）',
      '点击左上角"搜索"按钮 → 跳转搜索leads页面',
    ],
    errorHandling: [],
    dataRules: [
      '数据范围：CC被分配的学生',
      '家长手机号掩码中间四位',
    ],
    prevPages: ['add-follow'],
    nextPages: ['search-leads', 'add-follow'],
  },
  {
    id: 'search-leads',
    title: '搜索leads',
    category: 'leads',
    description: '通过学生姓名、英文名、手机号搜索目标leads。',
    figmaUrl: FIGMA_BASE,
    uiImages: ['/ui/搜索.png', '/ui/搜索 (1).png'],
    requirements: [
      '输入搜索内容，支持搜索"学生姓名、英文名、手机号"',
      '搜索范围：CC被分配的学生信息',
      '搜索规则支持：',
      '手机号后四位、学生中英文名拼音/字母搜索（模糊匹配）',
      '学生中文名模糊匹配',
      '手机号搜索：支持前三、后四、全手机号',
    ],
    interactions: [
      '输入搜索关键词 → 实时搜索匹配结果',
      '从"新增follow"进入 → 选择目标学生，将"中文姓名/英文名"信息带回"新增follow"页面',
      '从"leads管理"进入 → 点击学生信息，跳转至"学生详情"页面',
    ],
    errorHandling: [
      '若模糊搜索后期搜索速度慢，后期再评估优化',
    ],
    dataRules: [
      '搜索范围：CC被分配的学生信息',
    ],
    prevPages: ['select-leads', 'leads-manage'],
    nextPages: ['add-follow', 'leads-detail'],
  },
  {
    id: 'leads-manage',
    title: 'leads管理',
    category: 'leads',
    description: 'CC管理被分配的所有leads，支持排序、搜索和查看详情。',
    figmaUrl: FIGMA_BASE,
    uiImages: ['/ui/leads 管理.png'],
    requirements: [
      '右上角"搜索"按钮，点击跳转"搜索leads"页面',
      '排序条件：leads分配时间 | 创建时间 | 最后提交follow记录的时间',
      '学生信息list展示：学生中文名/英文名 | 年龄 | 性别',
      '家长手机号',
      '校区：学生所属校区',
      '生命周期：同步"馆台系统"中学生生命周期',
      '创建时间：同步"馆台系统"中leads创建时间',
      '分配时间：同步"馆台系统"中leads分配给当前CC的时间',
      '最后follow：同步"馆台系统"中leads最后follow记录的时间',
      '"学生信息"点击事件 → 跳转至"leads详情页"',
      '底部悬浮按钮：预约、新增follow、follow记录',
    ],
    interactions: [
      '点击右上角"搜索" → 跳转搜索leads页面',
      '点击学生信息 → 跳转leads详情页',
      '点击底部"预约" → 跳转预约功能',
      '点击底部"新增follow" → 跳转新增follow页',
      '点击底部"follow记录" → 查看follow记录',
    ],
    errorHandling: [],
    dataRules: [
      '数据获取范围：CC被分配的学生信息',
    ],
    prevPages: ['home'],
    nextPages: ['search-leads', 'leads-detail', 'add-follow'],
  },
  {
    id: 'leads-detail',
    title: 'leads详情页',
    category: 'leads',
    description: '查看leads详细信息，支持编辑、预约、新增follow和查看follow记录。',
    figmaUrl: FIGMA_BASE,
    uiImages: ['/ui/leads 详情.png', '/ui/leads 详情（保存）.png', '/ui/leads 详情（保存） (1).png'],
    requirements: [
      '右侧顶部"编辑"按钮 → 跳转"编辑"页面',
      '底部悬浮按钮：',
      '预约：点击弹出"预约弹框"（仅部分生命周期可见：新线索/待预约/已预约-待上门/已上门-待支付）',
      '新增follow：点击弹出"新增follow弹框"',
      'follow记录：点击弹出"follow弹窗"',
    ],
    interactions: [
      '点击"编辑" → 跳转编辑leads页面',
      '点击"预约" → 弹出预约弹框（生命周期限制）',
      '点击"新增follow" → 弹出新增follow弹框',
      '点击"follow记录" → 弹出follow记录弹窗',
    ],
    errorHandling: [
      '预约按钮在非指定生命周期状态下不可见',
    ],
    dataRules: [
      '预约仅部分生命周期可见：新线索/待预约/已预约-待上门/已上门-待支付',
    ],
    prevPages: ['leads-manage', 'search-leads'],
    nextPages: ['edit-leads', 'appointment', 'add-follow', 'follow-records'],
  },
  {
    id: 'appointment',
    title: '预约',
    category: 'follow',
    description: 'CC预约家长与学生到馆，选择预约到店时间并提交。',
    figmaUrl: FIGMA_BASE,
    uiImages: ['/ui/新增预约.png', '/ui/新增预约（选择日期）.png', '/ui/新增预约（选择时间）.png', '/ui/预约确认.png'],
    requirements: [
      '预约到店时间：时间选择器',
      '选择时间不可小于当前时间',
      '选择时间最大范围：未来≤15天',
      '预约记录展示：',
      '预约人：展示CC姓名（CC存在交接客户情况，新CC要知道历史哪些记录不是自己要约的）',
      '预约时间：点击"提交"按钮时间',
      '预约到店时间：CC选择的"预约到店时间"',
      '排序规则：预约到店时间倒序',
      '列表区域可上下滑动',
      '"提交"按钮：alert提示"确定预约？"，按钮"确定""取消"',
    ],
    interactions: [
      '选择预约到店时间 → 时间选择器',
      '点击"提交" → alert提示"确定预约？"',
      '点击"确定" → 预约信息提交，同步至"馆台系统"，列表自动刷新',
      '点击"取消" → 弹框消失，无操作',
    ],
    errorHandling: [
      '选择时间小于当前时间：提示不可选择过去时间',
      '选择时间超过15天：提示时间范围限制',
    ],
    dataRules: [
      '预约信息同步至馆台系统',
      '预约到店时间最大范围未来≤15天',
    ],
    prevPages: ['leads-detail'],
    nextPages: [],
  },
  {
    id: 'follow-records',
    title: 'follow记录',
    category: 'follow',
    description: '查看leads的所有跟进记录列表，支持展开/收起长文本。',
    figmaUrl: FIGMA_BASE,
    uiImages: ['/ui/follow记录.png'],
    requirements: [
      'follow记录list展示：',
      '记录时间：提交follow记录的时间',
      '沟通渠道：提交follow记录的渠道',
      '沟通内容：最多显示三行',
      '超过三行：第三行截断文字，字后追加"...展开"',
      '"...展开"点击事件：文字全部展开',
      '文字全部展开后：文字最后追加"收起"',
      '"收起"点击事件：文字折叠回三行',
      '附件：新增follow时上传的附件',
      '附件点击事件：默认浏览器打开规则（打开新的url查看）',
      '排序规则：根据记录时间从新到老',
    ],
    interactions: [
      '点击"...展开" → 文字全部展开',
      '点击"收起" → 文字折叠回三行',
      '点击附件 → 浏览器新标签打开',
    ],
    errorHandling: [
      '不支持的附件格式：下载处理（待调研）',
    ],
    dataRules: [
      '排序规则：记录时间从新到老',
    ],
    prevPages: ['leads-detail'],
    nextPages: [],
  },
  {
    id: 'edit-leads',
    title: '编辑leads',
    category: 'leads',
    description: '编辑leads的学生信息，提交后与馆台系统同步。',
    figmaUrl: FIGMA_BASE,
    uiImages: ['/ui/leads 详情（保存）.png', '/ui/leads 详情（保存） (1).png'],
    requirements: [
      '手机号不可编辑',
      '编辑规则与"馆台系统"一致',
      '下拉选项：性别、出生日期、渠道、质量、家长类型',
      '提交后信息流转：修改后的学员信息与"馆台系统"对应学员信息同步',
    ],
    interactions: [
      '编辑字段 → 修改信息',
      '点击提交 → 同步至馆台系统',
    ],
    errorHandling: [],
    dataRules: [
      '手机号不可编辑',
      '编辑规则与馆台系统一致',
      '修改后信息同步至馆台系统',
    ],
    prevPages: ['leads-detail'],
    nextPages: [],
  },
  {
    id: 'mine',
    title: '我的',
    category: 'mine',
    description: 'CC个人中心，展示个人信息、我的预约入口和退出登录。',
    figmaUrl: FIGMA_BASE,
    uiImages: ['/ui/我的@2x.png'],
    requirements: [
      'CC个人信息模块：CC姓名、手机号',
      '负责校区：一个CC可能负责多个校区',
      '无点击事件',
      '"我的预约"：点击跳转至"我的预约"页面',
      '"退出登录"：点击退出登录状态，跳转至"登录页"',
    ],
    interactions: [
      '点击"我的预约" → 跳转我的预约页面',
      '点击"退出登录" → 退出登录状态，跳转登录页',
    ],
    errorHandling: [],
    dataRules: [],
    prevPages: ['home'],
    nextPages: ['my-appointments', 'login'],
  },
  {
    id: 'my-appointments',
    title: '我的预约',
    category: 'mine',
    description: '查看CC的所有预约记录，按日期分组展示，支持下拉刷新和日期范围筛选。',
    figmaUrl: FIGMA_BASE,
    uiImages: ['/ui/我的预约.png', '/ui/我的预约 (1).png'],
    requirements: [
      'list支持下拉刷新',
      '日期范围：',
      '起止时间：默认最近15天',
      '起始时间：默认为今天，选择未来≤15天，选择过去≤30天',
      '截止时间：默认为今天往后15天，选择未来≤15天，选择过去≤30天',
      '预约列表：',
      '排序规则：按日期从现在到过去',
      '以日期为组，支持展开/收起，默认展开',
      '当日展示：YYYY-MM-DD 星期X 今日',
      '往日展示：YYYY-MM-DD 星期X',
      '日期组内学员展示：',
      '日期组内学员排序：按预约到店的时间排序',
      '学员中文姓名/英文姓名 性别',
      '手机号：家长手机号，支持点击拨打',
      '预约到店：预约到店的时间，显示HH:mm',
      '实际到店：同步"馆台系统"行政记录该学员的今日最早到店时间',
      '点击事件：跳转至学员详情页',
      '日期组内无预约学员：展示"今日无预约"',
    ],
    interactions: [
      '下拉刷新 → 刷新预约列表',
      '修改日期范围 → 筛选对应范围的预约',
      '点击日期组展开/收起 → 切换展开状态',
      '点击手机号 → 拨打电话',
      '点击学员信息 → 跳转学员详情页',
    ],
    errorHandling: [],
    dataRules: [
      '起始时间选择未来≤15天，过去≤30天',
      '截止时间选择未来≤15天，过去≤30天',
      '实际到店时间同步馆台系统行政记录',
    ],
    prevPages: ['mine'],
    nextPages: ['leads-detail'],
  },
];

export const categoryLabels: Record<PageData['category'], string> = {
  login: '登录鉴权',
  home: '首页',
  follow: '跟进管理',
  leads: 'Leads管理',
  mine: '个人中心',
};

export const categoryColors: Record<PageData['category'], string> = {
  login: '#0089FF',
  home: '#00C853',
  follow: '#FF9100',
  leads: '#AA00FF',
  mine: '#FF5252',
};

export function getPageById(id: string): PageData | undefined {
  return pages.find((p) => p.id === id);
}

export function getPagesByCategory(category: PageData['category']): PageData[] {
  return pages.filter((p) => p.category === category);
}
