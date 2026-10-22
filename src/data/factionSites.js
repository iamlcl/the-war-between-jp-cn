// Historical headquarters, political centres and command nodes.
// These are point anchors for the animated faction layer, not claimed control polygons.
// Coordinates locate the historical city; the label preserves the wartime name where it differs.
export const factionSites = [
  {
    id: 'manchukuo-xinjing', faction: 'puppet-manchukuo', label: '伪满洲国',
    historicalName: '新京（长春）', coords: [43.817, 125.323], from: '1937-07', to: '1945-08',
    role: '伪满洲国政府与关东军控制中心', source: '东北战场通史；报告“东北”阶段',
    unit: '关东军与伪满治安军节点', strengthWan: [8, 12], unitCount: 5,
    equipment: ['步兵', '装甲车', '炮兵'], confidence: 'B',
    forceNote: '以关东军驻屯、铁路守备和伪满治安军合并估算；不等同于整个东北驻军总数。'
  },
  {
    id: 'japan-north-china', faction: 'japanese-army', label: '日军',
    historicalName: '北平', coords: [39.904, 116.407], from: '1937-07', to: '1945-08',
    role: '华北方面军司令部与占领节点', source: '卢沟桥事变及华北战局',
    unit: '华北方面军正规师团／守备队', strengthWan: [12, 18], unitCount: 8,
    equipment: ['步兵', '炮兵', '航空'], confidence: 'B',
    forceNote: '表示华北方面军在北平指挥网的量级；部队沿铁路、城市与据点分散部署。'
  },
  {
    id: 'japan-central-china', faction: 'japanese-army', label: '日军',
    historicalName: '上海', coords: [31.230, 121.474], from: '1937-08', to: '1945-08',
    role: '华中方面的港口、铁路与作战节点', source: '淞沪会战及华中战局',
    unit: '华中方面军与海军陆战队节点', strengthWan: [8, 13], unitCount: 6,
    equipment: ['步兵', '炮兵', '航空', '舰炮'], confidence: 'B',
    forceNote: '覆盖上海港、铁路和周边作战集群的量级示意；不表示全线同时集结。'
  },
  {
    id: 'wang-puppet-nanjing', faction: 'puppet-nanjing', label: '汪伪政府',
    historicalName: '南京（国民政府旧都）', coords: [32.060, 118.796], from: '1940-03', to: '1945-09',
    role: '汪精卫政权名义首都；行政依附日军', source: '1940年汪伪政权成立；报告“伪政权”节点',
    unit: '汪伪绥靖军与警备队', strengthWan: [3, 5], unitCount: 3,
    equipment: ['步兵', '警备', '装甲车'], confidence: 'C',
    forceNote: '伪军番号、整编与实际可用兵力差异较大，此处只表达南京周边警备量级。'
  },
  {
    id: 'national-chongqing', faction: 'nationalist', label: '国民政府',
    historicalName: '重庆', coords: [29.564, 106.551], from: '1937-12', to: '1945-09',
    role: '战时陪都、国民政府和军事指挥中心', source: '战时国民政府迁渝史料',
    unit: '军事委员会与西南后方部队', strengthWan: [15, 22], unitCount: 8,
    equipment: ['步兵', '炮兵', '空军'], confidence: 'B',
    forceNote: '表达西南后方可调度的战区级兵力量级；部队并不集中驻于重庆市区。'
  },
  {
    id: 'national-wuhan', faction: 'nationalist', label: '国军战区',
    historicalName: '武汉三镇', coords: [30.593, 114.305], from: '1937-07', to: '1938-10',
    role: '武汉会战前后的全国战区指挥与交通枢纽', source: '武汉会战阶段资料',
    unit: '第五／第九战区指挥节点', strengthWan: [10, 16], unitCount: 7,
    equipment: ['步兵', '炮兵', '空军'], confidence: 'B',
    forceNote: '以武汉会战期间战区编组作量级示意；战役阶段会随增援与撤退快速变化。'
  },
  {
    id: 'ccp-yanan', faction: 'communist', label: '中共／八路军',
    historicalName: '延安', coords: [36.585, 109.489], from: '1937-08', to: '1945-09',
    role: '陕甘宁边区与敌后抗战指挥中心', source: '敌后战场通史；报告“根据地”阶段',
    unit: '八路军总部与陕甘宁边区部队', strengthWan: [4, 7], unitCount: 4,
    equipment: ['步兵', '轻机枪', '迫击炮'], confidence: 'B',
    forceNote: '以总部、边区留守与可联系部队的量级示意；主力分散于华北敌后。'
  },
  {
    id: 'new-fourth-army', faction: 'communist', label: '新四军',
    historicalName: '皖南军部（泾县一带）', coords: [30.688, 118.413], from: '1938-01', to: '1945-09',
    role: '华中敌后抗战与游击区节点', source: '新四军军部沿革；报告“华中根据地”阶段',
    unit: '新四军军部与华中支队', strengthWan: [2, 4], unitCount: 3,
    equipment: ['步兵', '轻机枪', '迫击炮'], confidence: 'B',
    forceNote: '军部坐标是指挥节点；支队分布于华中敌后，不能按点位覆盖半径理解。'
  }
];

// Dashed tracks are operational axes, not front-line boundaries. They are intentionally
// labelled as approximate movement/command routes in the UI.
export const factionTracks = [
  {
    id: 'japanese-expansion-1937-38', faction: 'japanese-army', label: '日军推进轴（示意）',
    from: '1937-07', to: '1938-10',
    coords: [[39.904, 116.407], [31.230, 121.474], [32.060, 118.796], [30.593, 114.305], [23.129, 113.264]]
  },
  {
    id: 'nationalist-retreat-counterattack', faction: 'nationalist', label: '国军战区转移／反攻轴（示意）',
    from: '1937-12', to: '1945-09',
    coords: [[32.060, 118.796], [30.593, 114.305], [29.564, 106.551], [26.900, 112.600], [27.400, 109.700]]
  },
  {
    id: 'communist-rear-areas', faction: 'communist', label: '敌后根据地联络轴（示意）',
    from: '1937-08', to: '1945-09',
    coords: [[36.585, 109.489], [37.870, 113.580], [32.950, 114.620], [30.688, 118.413]]
  },
  {
    id: 'manchukuo-rail-corridor', faction: 'puppet-manchukuo', label: '伪满铁路控制轴（示意）',
    from: '1937-07', to: '1945-08',
    coords: [[41.805, 123.431], [43.817, 125.323], [45.750, 126.633]]
  }
];
