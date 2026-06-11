// 模拟器 Mock 数据

export interface MockLead {
  id: string;
  nameCn: string;
  nameEn: string;
  age: number;
  gender: '男' | '女';
  phone: string; // 原始手机号
  phoneMasked: string; // 掩码手机号
  campus: string;
  lifeCycle: string;
  createdAt: string;
  assignedAt: string;
  lastFollowAt: string;
  birthDate: string;
  channel: string;
  quality: string;
  parentType: string;
  address: string;
  parentName: string;
  parentPhone: string;
  backupParentName: string;
  backupParentPhone: string;
  expectedStore: string;
}

export interface MockFollowRecord {
  id: string;
  leadId: string;
  time: string;
  channel: string;
  content: string;
  attachments: { name: string; type: string }[];
}

export interface MockAppointment {
  id: string;
  leadId: string;
  leadNameCn: string;
  leadNameEn: string;
  leadGender: '男' | '女';
  ccName: string;
  bookedAt: string; // 预约提交时间
  appointmentTime: string; // 预约到店时间
  actualArrivalTime?: string; // 实际到店时间
  phone: string;
}

export interface MockUser {
  name: string;
  phone: string;
  campuses: string[];
}

// 模拟 CC 用户
export const mockUser: MockUser = {
  name: '赵德群',
  phone: '18200869694',
  campuses: ['BJt天通苑华联'],
};

// 模拟 Leads 数据
export const mockLeads: MockLead[] = [
  {
    id: 'lead-1',
    nameCn: '张一飞',
    nameEn: 'Lily',
    age: 5,
    gender: '男',
    phone: '18609091256',
    phoneMasked: '186****1256',
    campus: 'BJt天通苑华联',
    lifeCycle: '在读',
    createdAt: '2026/4/16 12:23:69',
    assignedAt: '2026/4/16 09:23:69',
    lastFollowAt: '2026/4/16 09:23:69',
    birthDate: '2018年11月10日',
    channel: '出生日期',
    quality: '优质',
    parentType: '爸爸',
    address: '北京市昌平区天通苑北一区12号楼3单元1502室',
    parentName: '张国杨',
    parentPhone: '18200869694',
    backupParentName: '张国杨',
    backupParentPhone: '18200869694',
    expectedStore: '万达店',
  },
  {
    id: 'lead-2',
    nameCn: '张一飞',
    nameEn: 'Lily',
    age: 5,
    gender: '女',
    phone: '18609091256',
    phoneMasked: '186****1256',
    campus: 'BJt天通苑华联',
    lifeCycle: '新线索',
    createdAt: '2026/4/15 10:30:00',
    assignedAt: '2026/4/15 14:20:00',
    lastFollowAt: '2026/4/16 08:15:00',
    birthDate: '2019年3月22日',
    channel: '线上咨询',
    quality: '普通',
    parentType: '妈妈',
    address: '北京市朝阳区望京SOHO T1',
    parentName: '李芳',
    parentPhone: '13800138001',
    backupParentName: '',
    backupParentPhone: '',
    expectedStore: '万达店',
  },
  {
    id: 'lead-3',
    nameCn: '王小明',
    nameEn: 'Tom',
    age: 7,
    gender: '男',
    phone: '13912345678',
    phoneMasked: '139****5678',
    campus: 'BJt天通苑华联',
    lifeCycle: '待预约',
    createdAt: '2026/4/14 09:00:00',
    assignedAt: '2026/4/14 11:30:00',
    lastFollowAt: '2026/4/15 16:45:00',
    birthDate: '2017年6月8日',
    channel: '地推活动',
    quality: '优质',
    parentType: '爸爸',
    address: '北京市海淀区中关村大街1号',
    parentName: '王强',
    parentPhone: '13912345678',
    backupParentName: '刘敏',
    backupParentPhone: '15012345678',
    expectedStore: '回龙观店',
  },
  {
    id: 'lead-4',
    nameCn: '陈思雨',
    nameEn: 'Amy',
    age: 4,
    gender: '女',
    phone: '13766668888',
    phoneMasked: '137****8888',
    campus: 'BJt天通苑华联',
    lifeCycle: '已预约-待上门',
    createdAt: '2026/4/13 14:20:00',
    assignedAt: '2026/4/13 16:00:00',
    lastFollowAt: '2026/4/16 10:30:00',
    birthDate: '2020年1月15日',
    channel: '朋友推荐',
    quality: '优质',
    parentType: '妈妈',
    address: '北京市昌平区龙泽苑西区',
    parentName: '陈静',
    parentPhone: '13766668888',
    backupParentName: '',
    backupParentPhone: '',
    expectedStore: '天通苑店',
  },
  {
    id: 'lead-5',
    nameCn: '刘子轩',
    nameEn: 'Kevin',
    age: 6,
    gender: '男',
    phone: '13699990000',
    phoneMasked: '136****0000',
    campus: 'BJt天通苑华联',
    lifeCycle: '已上门-待支付',
    createdAt: '2026/4/12 11:00:00',
    assignedAt: '2026/4/12 13:30:00',
    lastFollowAt: '2026/4/16 11:00:00',
    birthDate: '2018年8月20日',
    channel: '出生日期',
    quality: '优质',
    parentType: '爸爸',
    address: '北京市昌平区立水桥南',
    parentName: '刘伟',
    parentPhone: '13699990000',
    backupParentName: '周婷',
    backupParentPhone: '18811112222',
    expectedStore: '万达店',
  },
  {
    id: 'lead-6',
    nameCn: '赵欣怡',
    nameEn: 'Cindy',
    age: 5,
    gender: '女',
    phone: '13577776666',
    phoneMasked: '135****6666',
    campus: 'BJt天通苑华联',
    lifeCycle: '在读',
    createdAt: '2026/3/20 09:30:00',
    assignedAt: '2026/3/20 15:00:00',
    lastFollowAt: '2026/4/14 09:00:00',
    birthDate: '2019年2月28日',
   channel: '线上咨询',
    quality: '普通',
    parentType: '妈妈',
    address: '北京市昌平区东小口镇',
    parentName: '赵莉',
    parentPhone: '13577776666',
    backupParentName: '',
    backupParentPhone: '',
    expectedStore: '回龙观店',
  },
];

// 模拟 Follow 记录
export const mockFollowRecords: Record<string, MockFollowRecord[]> = {
  'lead-1': [
    {
      id: 'fr-1',
      leadId: 'lead-1',
      time: '2026/4/16',
      channel: '微信',
      content:
        '微信联系家长，介绍绘本馆上课内容：课上带着孩子读绘本、玩互动，顺便识字练表达，课后还有小练习练习小习练习习练习微信联系家长，介绍绘本馆上课内容：课上带着孩子读绘本、玩互动，顺便识字练表达，课后还有小练习练习小习练习习练习',
      attachments: [
        { name: '绘本书程介绍.pdf', type: 'pdf' },
        { name: '孩子试听课堂实拍.jpg', type: 'image' },
      ],
    },
    {
      id: 'fr-2',
      leadId: 'lead-1',
      time: '2026/4/14',
      channel: '电话',
      content: '电话回访家长，确认周末到店时间，家长表示周六下午两点可以过来体验课程。',
      attachments: [],
    },
    {
      id: 'fr-3',
      leadId: 'lead-1',
      time: '2026/4/10',
      channel: '微信',
      content: '发送课程介绍和价目表给家长，家长对创意美术课比较感兴趣。',
      attachments: [{ name: '课程价目表.pdf', type: 'pdf' }],
    },
  ],
  'lead-2': [
    {
      id: 'fr-4',
      leadId: 'lead-2',
      time: '2026/4/16',
      channel: '微信',
      content: '初次联系，介绍绘本馆基本情况，家长表示想先了解课程安排。',
      attachments: [],
    },
    {
      id: 'fr-5',
      leadId: 'lead-2',
      time: '2026/4/15',
      channel: '电话',
      content: '电话沟通了解孩子年龄和兴趣方向，推荐了启蒙阅读课程。',
      attachments: [],
    },
  ],
  'lead-3': [
    {
      id: 'fr-6',
      leadId: 'lead-3',
      time: '2026/4/15',
      channel: '微信',
      content: '跟进地推活动获取的线索，家长对英语启蒙有需求。',
      attachments: [],
    },
  ],
  'lead-4': [
    {
      id: 'fr-7',
      leadId: 'lead-4',
      time: '2026/4/16',
      channel: '微信',
      content: '确认周六上午10点的预约，提醒家长带上孩子和水杯。',
      attachments: [],
    },
    {
      id: 'fr-8',
      leadId: 'lead-4',
      time: '2026/4/13',
      channel: '电话',
      content: '电话沟通后确定预约时间，发送定位信息。',
      attachments: [],
    },
  ],
  'lead-5': [
    {
      id: 'fr-9',
      leadId: 'lead-5',
      time: '2026/4/16',
      channel: '微信',
      content: '跟进上周到店情况，家长反馈孩子很喜欢，正在考虑报名套餐。',
      attachments: [{ name: '套餐方案.pdf', type: 'pdf' }],
    },
  ],
};

// 模拟预约记录
export const mockAppointments: MockAppointment[] = [
  {
    id: 'apt-1',
    leadId: 'lead-1',
    leadNameCn: '张一飞',
    leadNameEn: 'Lily',
    leadGender: '男',
    ccName: '赵德群',
    bookedAt: '2026/4/16 12:30',
    appointmentTime: '2026/4/17 14:00',
    actualArrivalTime: '2026/4/17 14:15',
    phone: '18609091256',
  },
  {
    id: 'apt-2',
    leadId: 'lead-2',
    leadNameCn: '张一飞',
    leadNameEn: 'Lily',
    leadGender: '女',
    ccName: '赵德群',
    bookedAt: '2026/4/16 12:30',
    appointmentTime: '2026/4/18 10:00',
    phone: '18609091256',
  },
  {
    id: 'apt-3',
    leadId: 'lead-3',
    leadNameCn: '王小明',
    leadNameEn: 'Tom',
    leadGender: '男',
    ccName: '赵德群',
    bookedAt: '2026/4/16 12:30',
    appointmentTime: '2026/4/19 15:30',
    phone: '13912345678',
  },
  {
    id: 'apt-4',
    leadId: 'lead-4',
    leadNameCn: '陈思雨',
    leadNameEn: 'Amy',
    leadGender: '女',
    ccName: '赵德群',
    bookedAt: '2026/4/16 12:30',
    appointmentTime: '2026/4/16 09:20',
    actualArrivalTime: '2026/4/16 09:35',
    phone: '13766668888',
  },
];

// 沟通渠道选项（从馆台系统同步）
export const channelOptions = ['微信', '电话', '短信', '面谈', '其他'];

// 性别选项
export const genderOptions = ['男', '女'];

// 家长类型选项
export const parentTypeOptions = ['爸爸', '妈妈', '爷爷', '奶奶', '其他'];

// 质量选项
export const qualityOptions = ['优质', '普通', '低质'];

// 渠道选项
export const channelSourceOptions = ['出生日期', '线上咨询', '地推活动', '朋友推荐', '其他'];

// 校区选项
export const campusOptions = ['BJt天通苑华联', '回龙观店', '万达店', '天通苑店'];

// 预约门店选项
export const storeOptions = ['万达店', '回龙观店', '天通苑店'];
