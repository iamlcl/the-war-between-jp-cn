// 1937—1945 historical administrative and political nodes.
// These are a name/position index, not reconstructed county polygons. Coordinates
// locate the historical seat on the modern WGS84 map; the historical name and
// jurisdiction are the primary fields. Use the confidence/source fields in UI.
export const historicalAdminNodes = [
  // 满洲国与关东州（1937 年已脱离国民政府有效行政）
  { id:'xinjing', level:'special-city', historicalName:'新京特别市', modernName:'长春', admin1937:'满洲国', regime:'manchukuo', coords:[43.817,125.323], from:'1937-07', to:'1945-08', confidence:'A', source:'满洲国行政区沿革；东北战场通史', note:'伪满洲国首都；行政名义与关东军军事控制分离标注。' },
  { id:'fengtian', level:'city', historicalName:'奉天市', modernName:'沈阳', admin1937:'奉天省／满洲国', regime:'manchukuo', coords:[41.805,123.431], from:'1937-07', to:'1945-08', confidence:'A', source:'满洲国行政区沿革', note:'历史地名“奉天”，不使用当代市名替代。' },
  { id:'harbin', level:'special-city', historicalName:'哈尔滨特别市', modernName:'哈尔滨', admin1937:'滨江省／满洲国', regime:'manchukuo', coords:[45.750,126.633], from:'1937-07', to:'1945-08', confidence:'A', source:'满洲国行政区沿革', note:'铁路与重工业节点。' },
  { id:'qiqihar', level:'city', historicalName:'齐齐哈尔', modernName:'齐齐哈尔', admin1937:'龙江省／满洲国', regime:'manchukuo', coords:[47.340,123.960], from:'1937-07', to:'1945-08', confidence:'A', source:'满洲国行政区沿革', note:'龙江省省会。' },
  { id:'mudanjiang', level:'city', historicalName:'牡丹江市', modernName:'牡丹江', admin1937:'牡丹江省／满洲国', regime:'manchukuo', coords:[44.583,129.600], from:'1937-07', to:'1945-08', confidence:'B', source:'满洲国行政区沿革', note:'东满铁路节点。' },
  { id:'tonghua', level:'city', historicalName:'通化', modernName:'通化', admin1937:'通化省／满洲国', regime:'manchukuo', coords:[41.728,125.939], from:'1937-07', to:'1945-08', confidence:'B', source:'满洲国行政区沿革', note:'南满山区交通与军政节点。' },
  { id:'dalian', level:'city', historicalName:'大连市', modernName:'大连', admin1937:'关东州／日本租借地', regime:'japanese', coords:[38.914,121.615], from:'1937-07', to:'1945-08', confidence:'A', source:'关东州行政沿革', note:'关东州行政与满洲国行政区分开。' },
  // 华北省、特别市与蒙疆
  { id:'beiping', level:'special-city', historicalName:'北平市', modernName:'北京', admin1937:'北平市／华北临时政府', regime:'puppet', coords:[39.904,116.407], from:'1937-07', to:'1945-08', confidence:'A', source:'华北政务委员会沿革；卢沟桥事变战史', note:'1937—1949 年间通行历史名称为“北平”。' },
  { id:'tianjin', level:'special-city', historicalName:'天津特别市', modernName:'天津', admin1937:'天津市／华北临时政府', regime:'puppet', coords:[39.129,117.200], from:'1937-07', to:'1945-08', confidence:'A', source:'华北政务委员会沿革', note:'港口、租界与铁路节点。' },
  { id:'baoding', level:'county-seat', historicalName:'保定县城', modernName:'保定', admin1937:'河北省', regime:'mixed', coords:[38.874,115.464], from:'1937-07', to:'1945-08', confidence:'B', source:'民国河北行政区与华北战史', note:'县城及铁路控制不能外推为全县控制。' },
  { id:'shimen', level:'city', historicalName:'石门市', modernName:'石家庄', admin1937:'河北省／华北政务委员会', regime:'puppet', coords:[38.043,114.514], from:'1941-01', to:'1945-08', confidence:'B', source:'石门市沿革；华北治安战史', note:'1941 年后日伪使用“石门”名称，1947 年改回石家庄。' },
  { id:'taiyuan', level:'city', historicalName:'太原市', modernName:'太原', admin1937:'山西省', regime:'mixed', coords:[37.870,112.560], from:'1937-11', to:'1945-08', confidence:'A', source:'太原会战及山西战史', note:'城镇、铁路与外围根据地控制分层。' },
  { id:'datong', level:'county-seat', historicalName:'大同县城', modernName:'大同', admin1937:'山西省／晋北自治政府', regime:'puppet', coords:[40.076,113.300], from:'1937-09', to:'1945-08', confidence:'B', source:'晋北自治政府沿革；华北战史', note:'伪政权县城节点，非全县稳定控制。' },
  { id:'zhangjiakou', level:'city', historicalName:'张家口市', modernName:'张家口', admin1937:'察哈尔省／蒙疆联合自治政府', regime:'puppet', coords:[40.815,114.879], from:'1937-09', to:'1945-08', confidence:'A', source:'察哈尔行政沿革；蒙疆史', note:'蒙疆政治与铁路节点。' },
  { id:'baotou', level:'city', historicalName:'包头市', modernName:'包头', admin1937:'绥远省／蒙疆联合自治政府', regime:'puppet', coords:[40.657,109.840], from:'1937-10', to:'1945-08', confidence:'B', source:'绥远行政沿革；蒙疆史', note:'绥远西部城市与铁路节点。' },
  { id:'guisui', level:'city', historicalName:'归绥市', modernName:'呼和浩特', admin1937:'绥远省／蒙疆联合自治政府', regime:'puppet', coords:[40.815,111.662], from:'1937-10', to:'1945-08', confidence:'B', source:'绥远行政沿革；蒙疆史', note:'历史名称“归绥”；现代城市名为呼和浩特。' },
  { id:'chengde', level:'city', historicalName:'承德县城', modernName:'承德', admin1937:'热河省／满洲国', regime:'manchukuo', coords:[40.973,117.932], from:'1933-03', to:'1945-08', confidence:'A', source:'热河战事与满洲国行政沿革', note:'1937 年前已被日方控制，保留历史时间说明。' },
  { id:'jinan', level:'city', historicalName:'济南市', modernName:'济南', admin1937:'山东省／华北政务委员会', regime:'puppet', coords:[36.651,117.120], from:'1937-12', to:'1945-08', confidence:'A', source:'济南战事与山东行政沿革', note:'省会、铁路和日伪行政节点。' },
  { id:'qingdao', level:'special-city', historicalName:'青岛市', modernName:'青岛', admin1937:'青岛市', regime:'japanese', coords:[36.067,120.382], from:'1938-01', to:'1945-08', confidence:'A', source:'青岛战事与沿海占领史', note:'沿海港口；不等同于胶东全境控制。' },
  // 华东、华中与汪伪行政节点
  { id:'nanjing', level:'special-city', historicalName:'南京特别市', modernName:'南京', admin1937:'国民政府首都／1940 后汪伪国民政府', regime:'puppet', coords:[32.060,118.796], from:'1937-12', to:'1945-09', confidence:'A', source:'南京保卫战；汪伪政权沿革', note:'1937—1939 与 1940 后政权性质不同，按时间显示。' },
  { id:'shanghai', level:'special-city', historicalName:'上海市', modernName:'上海', admin1937:'上海特别市／租界', regime:'japanese', coords:[31.230,121.474], from:'1937-08', to:'1945-08', confidence:'A', source:'淞沪会战及上海占领史', note:'租界、城区、港口和郊县控制不可合并为单一行政色块。' },
  { id:'xuzhou', level:'city', historicalName:'徐州市', modernName:'徐州', admin1937:'江苏省', regime:'mixed', coords:[34.261,117.185], from:'1938-05', to:'1945-08', confidence:'A', source:'徐州会战战史', note:'陇海、津浦铁路枢纽。' },
  { id:'taierzhuang', level:'town', historicalName:'台儿庄镇', modernName:'台儿庄', admin1937:'山东省峄县', regime:'mixed', coords:[34.550,117.734], from:'1938-03', to:'1938-04', confidence:'A', source:'台儿庄战役战史', note:'镇级战场节点；不表示整个峄县控制。' },
  { id:'wuhan', level:'special-city', historicalName:'汉口／武昌／汉阳三镇', modernName:'武汉', admin1937:'湖北省', regime:'mixed', coords:[30.593,114.305], from:'1937-07', to:'1938-10', confidence:'A', source:'武汉会战战史', note:'战时行政与三镇地理不能简化为现代武汉市边界。' },
  { id:'nanchang', level:'city', historicalName:'南昌市', modernName:'南昌', admin1937:'江西省', regime:'mixed', coords:[28.682,115.858], from:'1939-03', to:'1945-08', confidence:'A', source:'南昌会战与江西行政沿革', note:'赣北铁路节点。' },
  { id:'changsha', level:'city', historicalName:'长沙市', modernName:'长沙', admin1937:'湖南省', regime:'mixed', coords:[28.228,112.939], from:'1937-07', to:'1945-08', confidence:'A', source:'长沙会战战史', note:'多次会战反复，不以单次占领代表全省。' },
  { id:'hengyang', level:'city', historicalName:'衡阳市', modernName:'衡阳', admin1937:'湖南省', regime:'mixed', coords:[26.896,112.601], from:'1944-06', to:'1945-08', confidence:'A', source:'衡阳保卫战战史', note:'粤汉铁路节点。' },
  { id:'guangzhou', level:'city', historicalName:'广州市', modernName:'广州', admin1937:'广东省', regime:'japanese', coords:[23.129,113.264], from:'1938-10', to:'1945-08', confidence:'A', source:'广州战役战史', note:'珠江口港口与城市控制。' },
  // 国民政府后方与敌后抗日根据地（政治/军政区，不冒充法定县界）
  { id:'chongqing', level:'special-city', historicalName:'重庆市（陪都）', modernName:'重庆', admin1937:'国民政府陪都', regime:'nationalist', coords:[29.564,106.551], from:'1937-12', to:'1945-09', confidence:'A', source:'战时国民政府迁渝史料', note:'1939 年改为直辖市；是政治与军事指挥节点。' },
  { id:'yanan', level:'county-seat', historicalName:'延安县／陕甘宁边区政府驻地', modernName:'延安', admin1937:'陕甘宁边区', regime:'communist', coords:[36.585,109.489], from:'1937-08', to:'1945-09', confidence:'A', source:'陕甘宁边区沿革与敌后战场史', note:'根据地军政中心；边区范围与国民政府法定县界有重叠。' },
  { id:'fuping', level:'county-seat', historicalName:'阜平县（晋察冀边区）', modernName:'阜平', admin1937:'晋察冀边区', regime:'communist', coords:[38.848,114.195], from:'1938-01', to:'1945-09', confidence:'B', source:'晋察冀边区史', note:'根据地政权节点，不表示全县每日稳定控制。' },
  { id:'shexian', level:'county-seat', historicalName:'涉县（晋冀鲁豫边区）', modernName:'涉县', admin1937:'晋冀鲁豫边区', regime:'communist', coords:[36.580,113.670], from:'1940-01', to:'1945-09', confidence:'B', source:'晋冀鲁豫边区史', note:'八路军一二九师与边区军政节点。' },
  { id:'junan', level:'county-seat', historicalName:'莒南县（山东抗日根据地）', modernName:'莒南', admin1937:'山东抗日根据地', regime:'communist', coords:[35.175,118.835], from:'1941-01', to:'1945-09', confidence:'B', source:'山东抗日根据地史', note:'根据地县级政权节点。' },
  { id:'yancheng', level:'county-seat', historicalName:'盐城县（苏北抗日根据地）', modernName:'盐城', admin1937:'苏北抗日根据地', regime:'communist', coords:[33.349,120.163], from:'1941-01', to:'1945-09', confidence:'B', source:'苏北抗日根据地史', note:'新四军与地方政权活动区。' }
];

export const historicalAdminMeta = {
  title: '1937—1945 历史行政名称索引',
  geometryStatus: 'point-index',
  note: '这些要素用历史行政驻地和政治节点定位，不把现代省界冒充民国县界，也不声称已经复原县域多边形。若需县界复原，应接入 CHGIS 1935 边界数据并逐幅校核。',
  sources: [
    'Harvard China Historical GIS (CHGIS), 1935 historical administrative units: https://chgis.hmdc.harvard.edu/data/',
    '《中华民国行政区域一览》（1935年前后版本）及各省县沿革资料；具体条目仍按 confidence/source 标注。'
  ]
};
