// 1937—1945 historical province registry.
// This registry is deliberately separate from the modern province GeoJSON.
// The app's primary geometry is a 1932—1944 schematic source snapshot;
// fallback geometries remain explicitly marked as proxies/approximations.
export const historicalProvinceDefinitions = [
  { id:'anhui', historicalName:'安徽省', authority:'中华民国', from:'1937-07', to:'1945-09', modernRefs:['安徽省'], geometryStatus:'modern-remap', note:'省名和省级位置延续；县界需以1935史料校核。' },
  { id:'fujian', historicalName:'福建省', authority:'中华民国', from:'1937-07', to:'1945-09', modernRefs:['福建省'], geometryStatus:'modern-remap', note:'厦门为沿海特别控制节点，不能外推为全省占领。' },
  { id:'gansu', historicalName:'甘肃省', authority:'中华民国', from:'1937-07', to:'1945-09', modernRefs:['甘肃省'], geometryStatus:'modern-remap', note:'边界与今甘肃并不完全相同。' },
  { id:'guangdong', historicalName:'广东省', authority:'中华民国／日伪分治', from:'1937-07', to:'1945-09', modernRefs:['广东省','海南省'], geometryStatus:'modern-remap', note:'海南岛当时属广东省，现代海南需并入历史广东定位。' },
  { id:'guangxi', historicalName:'广西省', authority:'中华民国', from:'1937-07', to:'1945-09', modernRefs:['广西壮族自治区'], geometryStatus:'modern-remap', note:'保留民国省名；现代自治区名称仅作映射。' },
  { id:'guizhou', historicalName:'贵州省', authority:'中华民国', from:'1937-07', to:'1945-09', modernRefs:['贵州省'], geometryStatus:'modern-remap', note:'省名延续。' },
  { id:'hebei', historicalName:'河北省', authority:'中华民国／华北伪政权', from:'1937-07', to:'1945-09', modernRefs:['河北省','北京市','天津市'], geometryStatus:'modern-remap', note:'北平、天津为特别市；不能把现代河北多边形直接当作民国河北省界。' },
  { id:'henan', historicalName:'河南省', authority:'中华民国／日伪分治', from:'1937-07', to:'1945-09', modernRefs:['河南省'], geometryStatus:'modern-remap', note:'郑县、开封、洛阳等历史市县点位另列。' },
  { id:'hubei', historicalName:'湖北省', authority:'中华民国／日伪分治', from:'1937-07', to:'1945-09', modernRefs:['湖北省'], geometryStatus:'modern-remap', note:'武汉三镇不能等同现代武汉市边界。' },
  { id:'hunan', historicalName:'湖南省', authority:'中华民国／日军进攻区', from:'1937-07', to:'1945-09', modernRefs:['湖南省'], geometryStatus:'modern-remap', note:'长沙、常德、衡阳为战役节点。' },
  { id:'jiangsu', historicalName:'江苏省', authority:'中华民国／汪伪／日军分治', from:'1937-07', to:'1945-09', modernRefs:['江苏省','上海市'], geometryStatus:'modern-remap', note:'上海为特别市；苏北、苏南控制并不一致。' },
  { id:'jiangxi', historicalName:'江西省', authority:'中华民国／日军进攻区', from:'1937-07', to:'1945-09', modernRefs:['江西省'], geometryStatus:'modern-remap', note:'南昌、上高等县市控制随月份变化。' },
  { id:'jilin', historicalName:'吉林省（满洲国）', authority:'满洲国', from:'1937-07', to:'1945-08', modernRefs:['吉林省'], geometryStatus:'modern-remap', note:'满洲国省制与中华民国东北省制不可混称；需按满洲国界资料校核。' },
  { id:'liaoning', historicalName:'奉天省（满洲国）', authority:'满洲国', from:'1937-07', to:'1945-08', modernRefs:['辽宁省'], geometryStatus:'modern-remap', note:'历史省名用奉天省；奉天市为省会／特别市节点。' },
  { id:'heilongjiang', historicalName:'黑龙江省（满洲国）', authority:'满洲国', from:'1937-07', to:'1945-08', modernRefs:['黑龙江省'], geometryStatus:'modern-remap', note:'满洲国黑龙江、龙江、黑河等省制曾调整，需按年份细分。' },
  { id:'rehe', historicalName:'热河省', authority:'满洲国／日军占领', from:'1937-07', to:'1945-08', modernRefs:['河北省','辽宁省','内蒙古自治区'], geometryStatus:'approximate-remap', note:'1945年前存在的省，1949后撤销；现有底图没有对应单一现代省。' },
  { id:'chahar', historicalName:'察哈尔省', authority:'中华民国／蒙疆分治', from:'1937-07', to:'1952-11', modernRefs:['河北省','内蒙古自治区'], geometryStatus:'approximate-remap', note:'张家口等地控制主体变化；需使用民国省界资料，不能用现代内蒙古整块替代。' },
  { id:'suiyuan', historicalName:'绥远省', authority:'中华民国／蒙疆分治', from:'1937-07', to:'1954-06', modernRefs:['内蒙古自治区'], geometryStatus:'approximate-remap', note:'归绥、包头为历史节点；现代内蒙古不是绥远省界。' },
  { id:'shanxi', historicalName:'山西省', authority:'中华民国／日伪分治', from:'1937-07', to:'1945-09', modernRefs:['山西省'], geometryStatus:'modern-remap', note:'晋察冀、晋冀鲁豫根据地与省界重叠，控制层另绘。' },
  { id:'shandong', historicalName:'山东省', authority:'中华民国／日伪分治', from:'1937-07', to:'1945-09', modernRefs:['山东省'], geometryStatus:'modern-remap', note:'济南、青岛、鲁南根据地控制并存。' },
  { id:'sichuan', historicalName:'四川省', authority:'中华民国', from:'1937-07', to:'1945-09', modernRefs:['四川省','重庆市'], geometryStatus:'modern-remap', note:'重庆1939年成为直辖市，不能直接并入现代四川。' },
  { id:'xikang', historicalName:'西康省', authority:'中华民国', from:'1939-01', to:'1955-09', modernRefs:['四川省','西藏自治区'], geometryStatus:'approximate-remap', note:'1939年正式建省，现有现代省界没有对应单一几何。' },
  { id:'yunnan', historicalName:'云南省', authority:'中华民国／中国远征军', from:'1937-07', to:'1945-09', modernRefs:['云南省'], geometryStatus:'modern-remap', note:'滇西、滇缅公路与后方行政需分层显示。' },
  { id:'zhejiang', historicalName:'浙江省', authority:'中华民国／日伪分治', from:'1937-07', to:'1945-09', modernRefs:['浙江省'], geometryStatus:'modern-remap', note:'浙东、浙赣铁路沿线为混合控制区。' },
  { id:'shaanxi', historicalName:'陕西省', authority:'中华民国／陕甘宁边区重叠', from:'1937-07', to:'1945-09', modernRefs:['陕西省'], geometryStatus:'modern-remap', note:'陕甘宁边区为军政区，不能直接等同陕西省界。' },
  { id:'ningxia', historicalName:'宁夏省', authority:'中华民国', from:'1937-07', to:'1954-09', modernRefs:['宁夏回族自治区'], geometryStatus:'approximate-remap', note:'1949年前后省界变化，现代宁夏自治区仅作近似定位。' },
  { id:'qinghai', historicalName:'青海省', authority:'中华民国', from:'1937-07', to:'1949-09', modernRefs:['青海省'], geometryStatus:'modern-remap', note:'西北边疆行政范围与现代青海并不完全相同。' },
  { id:'xinjiang', historicalName:'新疆省', authority:'中华民国', from:'1937-07', to:'1945-09', modernRefs:['新疆维吾尔自治区'], geometryStatus:'modern-remap', note:'保留民国省名；现代自治区仅作几何定位。' },
  { id:'tibet', historicalName:'西藏地方', authority:'西藏地方政府／中华民国名义主张', from:'1937-07', to:'1945-09', modernRefs:['西藏自治区'], geometryStatus:'approximate-remap', note:'政治地位和有效行政需单独说明，不能用现代自治区边界替代。' },
  { id:'taiwan', historicalName:'台湾总督府辖区', authority:'日本', from:'1937-07', to:'1945-10', modernRefs:['台湾省'], geometryStatus:'modern-remap', note:'1937—1945为日本殖民统治下的台湾，非中华民国省级行政。' }
];

export const historicalProvinceMeta = {
  period: '1937—1945',
  geometryStatus: 'schematic-source-plus-fallback',
  note: '省名、政权和存在区间依据民国行政沿革、满洲国／蒙疆行政沿革整理。主图使用1932—1944示意轮廓；modernRefs仅为台湾等缺口的地图定位映射，不能替代1937逐年边界。接入经授权的CHGIS时序边界后，应以逐年历史多边形替换示意和approximate-remap。'
};

// These four historical provinces have no one-to-one feature in the modern
// provincial file. Coordinates are broad cartographic reconstructions used
// to keep the period names visible; they must be replaced with CHGIS polygons
// before being treated as an audited administrative boundary.
export const historicalProvinceApproximatePolygons = [
  {
    id: 'chahar-approx', historicalName: '察哈尔省', authority: '中华民国／蒙疆分治',
    geometryStatus: 'approximate',
    coords: [[42.9, 112.5], [43.6, 115.8], [43.3, 118.0], [41.8, 117.8], [40.5, 116.5], [40.2, 114.1], [41.2, 112.2], [42.9, 112.5]],
    note: '按民国时期察哈尔省大致范围绘制；张家口及察南、察北控制随时期变化。'
  },
  {
    id: 'suiyuan-approx', historicalName: '绥远省', authority: '中华民国／蒙疆分治',
    geometryStatus: 'approximate',
    coords: [[42.9, 104.0], [42.9, 112.5], [41.2, 112.2], [39.7, 111.7], [38.6, 108.0], [38.8, 104.0], [42.9, 104.0]],
    note: '按归绥、包头及河套地区的民国省域位置绘制；不代表县界或有效控制线。'
  },
  {
    id: 'rehe-approx', historicalName: '热河省', authority: '满洲国／日军占领',
    geometryStatus: 'approximate',
    coords: [[43.6, 115.8], [43.5, 121.8], [42.5, 123.8], [40.8, 123.5], [39.6, 118.3], [40.5, 116.5], [41.8, 117.8], [43.6, 115.8]],
    note: '按承德、朝阳、赤峰之间的历史省域位置绘制；1945年前后行政归属发生变化。'
  },
  {
    id: 'xikang-approx', historicalName: '西康省', authority: '中华民国',
    geometryStatus: 'approximate',
    coords: [[34.6, 100.1], [34.1, 103.7], [32.0, 104.8], [29.7, 103.8], [27.0, 103.7], [27.0, 98.2], [29.4, 96.3], [32.4, 97.1], [34.6, 100.1]],
    note: '1939年正式建省后的大致位置；川边与藏区边界须以同期行政图校核。'
  }
];
