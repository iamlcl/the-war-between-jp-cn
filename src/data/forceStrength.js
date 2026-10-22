// 战时兵力可视化模型。数值是公开战史中的数量级估算，用于比较节点和分布，
// 不是逐月点名册；每个节点按本势力当阶段总兵力的 share 分配一个区间。
export const factionForceStrength = {
  'japanese-army': {
    '1937-a': [220000, 280000], '1937-b': [360000, 450000], '1938-a': [500000, 620000],
    '1938-b': [620000, 740000], '1938-c': [700000, 840000], '1941-b': [760000, 900000],
    '1942-c': [820000, 960000], '1944': [900000, 1080000], '1945-a': [780000, 940000], '1945-b': [420000, 600000]
  },
  'puppet-manchukuo': {
    '1937-a': [90000, 130000], '1937-b': [100000, 145000], '1938-a': [115000, 160000],
    '1938-b': [125000, 175000], '1938-c': [145000, 200000], '1941-b': [165000, 225000],
    '1942-c': [180000, 245000], '1944': [200000, 270000], '1945-a': [190000, 250000], '1945-b': [120000, 180000]
  },
  'puppet-nanjing': {
    '1937-a': [0, 0], '1937-b': [0, 0], '1938-a': [25000, 45000], '1938-b': [55000, 85000],
    '1938-c': [100000, 150000], '1941-b': [150000, 220000], '1942-c': [220000, 300000],
    '1944': [300000, 390000], '1945-a': [360000, 460000], '1945-b': [400000, 520000]
  },
  nationalist: {
    '1937-a': [1500000, 1900000], '1937-b': [1700000, 2200000], '1938-a': [1900000, 2400000],
    '1938-b': [2000000, 2500000], '1938-c': [2200000, 2800000], '1941-b': [2400000, 3000000],
    '1942-c': [2550000, 3200000], '1944': [2700000, 3400000], '1945-a': [2900000, 3700000], '1945-b': [3000000, 3900000]
  },
  communist: {
    '1937-a': [45000, 70000], '1937-b': [55000, 90000], '1938-a': [80000, 130000],
    '1938-b': [120000, 190000], '1938-c': [220000, 340000], '1941-b': [300000, 450000],
    '1942-c': [430000, 600000], '1944': [600000, 780000], '1945-a': [760000, 950000], '1945-b': [850000, 1100000]
  }
};

// share 是节点在该势力本阶段估算兵力中的分配权重。节点出现时间和装备
// 用历史编制类型表达，避免把一个城市标记误读成整省驻军。
export const forceNodes = [
  { id:'japan-north-front', faction:'japanese-army', label:'华北方面军', historicalName:'北平／天津', coords:[39.904,116.407], from:'1937-07', to:'1945-08', share:.28, unitType:'师团、旅团与铁路守备队', equipment:['步兵炮','坦克','航空支援'], appearance:'钢盔、土黄色军服、三八式步枪' },
  { id:'japan-central-front', faction:'japanese-army', label:'华中方面军', historicalName:'上海／南京', coords:[31.230,121.474], from:'1937-08', to:'1945-08', share:.30, unitType:'师团与独立混成旅团', equipment:['山炮','坦克','舰炮支援'], appearance:'钢盔、土黄色军服、三八式步枪' },
  { id:'japan-wuhan-front', faction:'japanese-army', label:'武汉—长江作战群', historicalName:'武汉三镇', coords:[30.593,114.305], from:'1938-06', to:'1945-08', share:.18, unitType:'师团、炮兵与工兵', equipment:['火炮','工兵器材','航空支援'], appearance:'钢盔、土黄色军服、轻重机枪' },
  { id:'japan-south-front', faction:'japanese-army', label:'华南派遣队', historicalName:'广州／香港', coords:[23.129,113.264], from:'1938-10', to:'1945-08', share:.12, unitType:'师团与守备队', equipment:['步兵炮','装甲车','航空支援'], appearance:'钢盔、土黄色军服、三八式步枪' },
  { id:'japan-rail-garrison', faction:'japanese-army', label:'华北铁路守备', historicalName:'太原—郑州线', coords:[37.870,113.580], from:'1937-10', to:'1945-08', share:.12, unitType:'独立混成旅团、铁路警备队', equipment:['装甲车','机枪','迫击炮'], appearance:'钢盔、土黄色军服、铁路守备装具' },
  { id:'manchukuo-xinjing', faction:'puppet-manchukuo', label:'伪满中央军', historicalName:'新京（长春）', coords:[43.817,125.323], from:'1937-07', to:'1945-08', share:.35, unitType:'伪满军师团与警备队', equipment:['步枪','骑兵','轻炮'], appearance:'军帽、灰绿色军服、骑兵马刀' },
  { id:'manchukuo-fengtian', faction:'puppet-manchukuo', label:'奉天守备', historicalName:'奉天（沈阳）', coords:[41.805,123.431], from:'1937-07', to:'1945-08', share:.35, unitType:'伪满军守备与工矿警察', equipment:['步枪','机枪','装甲车'], appearance:'军帽、灰绿色军服、轻机枪' },
  { id:'manchukuo-harbin', faction:'puppet-manchukuo', label:'北满警备', historicalName:'哈尔滨', coords:[45.750,126.633], from:'1937-07', to:'1945-08', share:.30, unitType:'伪满军、铁路警察与骑兵', equipment:['骑兵','步枪','迫击炮'], appearance:'军帽、灰绿色军服、骑兵马刀' },
  { id:'wang-nanjing', faction:'puppet-nanjing', label:'汪伪中央军', historicalName:'南京', coords:[32.060,118.796], from:'1940-03', to:'1945-09', share:.42, unitType:'和平建国军与警备部队', equipment:['步枪','机枪','迫击炮'], appearance:'军帽、灰褐军服、步枪' },
  { id:'wang-shanghai', faction:'puppet-nanjing', label:'汪伪沪宁守备', historicalName:'上海—南京线', coords:[31.230,121.474], from:'1940-03', to:'1945-09', share:.25, unitType:'警备师与交通线守备', equipment:['步枪','机枪','装甲车'], appearance:'军帽、灰褐军服、轻机枪' },
  { id:'wang-central', faction:'puppet-nanjing', label:'汪伪华中军', historicalName:'武汉', coords:[30.593,114.305], from:'1940-03', to:'1945-09', share:.18, unitType:'警备师与地方保安队', equipment:['步枪','迫击炮','汽车'], appearance:'军帽、灰褐军服、步枪' },
  { id:'wang-south', faction:'puppet-nanjing', label:'汪伪华南警备', historicalName:'广州', coords:[23.129,113.264], from:'1940-03', to:'1945-09', share:.15, unitType:'地方保安队与警察', equipment:['步枪','机枪','汽车'], appearance:'军帽、灰褐军服、步枪' },
  { id:'nationalist-chongqing', faction:'nationalist', label:'国民政府军委', historicalName:'重庆', coords:[29.564,106.551], from:'1937-12', to:'1945-09', share:.26, unitType:'中央军、后方训练与补充部队', equipment:['步枪','山炮','运输车'], appearance:'军帽、灰绿色军服、步枪' },
  { id:'nationalist-wuhan', faction:'nationalist', label:'武汉战区', historicalName:'武汉三镇', coords:[30.593,114.305], from:'1937-07', to:'1938-10', share:.22, unitType:'集团军与炮兵军', equipment:['山炮','重炮','工兵器材'], appearance:'军帽、灰绿色军服、步枪' },
  { id:'nationalist-changsha', faction:'nationalist', label:'第九战区', historicalName:'长沙', coords:[28.228,112.939], from:'1938-11', to:'1945-09', share:.20, unitType:'集团军、炮兵与地方部队', equipment:['山炮','机枪','迫击炮'], appearance:'军帽、灰绿色军服、步枪' },
  { id:'nationalist-kunming', faction:'nationalist', label:'滇缅后方', historicalName:'昆明', coords:[25.038,102.718], from:'1937-07', to:'1945-09', share:.17, unitType:'远征军、运输与训练部队', equipment:['山炮','卡车','航空支援'], appearance:'军帽、灰绿色军服、步枪' },
  { id:'nationalist-guizhou', faction:'nationalist', label:'西南补给线', historicalName:'贵阳', coords:[26.647,106.630], from:'1937-07', to:'1945-09', share:.15, unitType:'地方军、运输队与补充部队', equipment:['步枪','迫击炮','运输车'], appearance:'军帽、灰绿色军服、步枪' },
  { id:'communist-yanan', faction:'communist', label:'八路军总部', historicalName:'延安', coords:[36.585,109.489], from:'1937-08', to:'1945-09', share:.22, unitType:'八路军总部与陕甘宁边区部队', equipment:['步枪','机枪','迫击炮'], appearance:'布军帽、灰色军服、步枪' },
  { id:'communist-jinchaji', faction:'communist', label:'晋察冀军区', historicalName:'阜平', coords:[38.847,114.195], from:'1937-10', to:'1945-09', share:.24, unitType:'军区主力、地方武装与民兵', equipment:['步枪','机枪','地雷'], appearance:'布军帽、灰色军服、步枪' },
  { id:'communist-jiluyu', faction:'communist', label:'晋冀鲁豫军区', historicalName:'涉县', coords:[36.573,113.670], from:'1938-11', to:'1945-09', share:.22, unitType:'军区主力、地方武装与民兵', equipment:['步枪','机枪','迫击炮'], appearance:'布军帽、灰色军服、步枪' },
  { id:'communist-new-fourth', faction:'communist', label:'新四军军部', historicalName:'皖南／泾县', coords:[30.688,118.413], from:'1938-01', to:'1945-09', share:.18, unitType:'新四军主力与地方武装', equipment:['步枪','机枪','迫击炮'], appearance:'布军帽、灰色军服、步枪' },
  { id:'communist-subei', faction:'communist', label:'华中敌后军区', historicalName:'盐城—苏北', coords:[33.348,120.163], from:'1940-01', to:'1945-09', share:.14, unitType:'新四军、地方武装与民兵', equipment:['步枪','地雷','迫击炮'], appearance:'布军帽、灰色军服、步枪' }
];

export const forceDisplayMeta = {
  unitToken: 50000,
  source: '综合抗日战争正面战场、敌后战场与伪军编制公开战史的阶段性数量级；节点为战区与交通线分布模型。',
  note: '兵力区间按阶段性战史数量级估算；节点按分布权重分配，人物图标为分档符号，不是逐人统计。装备为该类部队常见装备概览。'
};
