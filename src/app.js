import { months, stageDefinitions, eventIndex } from './data/warData.js';
import { factionSites, factionTracks } from './data/factionSites.js';
import { factionForceStrength, forceNodes, forceDisplayMeta } from './data/forceStrength.js';
import { historicalAdminNodes } from './data/historicalAdmin.js';
import { historicalProvinceDefinitions, historicalProvinceApproximatePolygons } from './data/historicalProvinces.js';

const $ = (id) => document.getElementById(id);
const colors = { japan: '#d86148', partial: '#e49a63', national: '#2b9e96', base: '#d0a341', contested: '#7069a3', preexisting: '#8a6b4a' };
const factionStyles = {
  'japanese-army': { label: '日军', color: '#c84f43', icon: '⚔' },
  'puppet-manchukuo': { label: '伪满', color: '#a77b35', icon: '◆' },
  'puppet-nanjing': { label: '汪伪政府', color: '#9b6b6b', icon: '▣' },
  nationalist: { label: '国民党政府／国军', color: '#2b9e96', icon: '★' },
  communist: { label: '共产党／八路军／新四军', color: '#bd4d4d', icon: '✚' }
};
const adminLevelLabels = {
  'special-city': '特别市／陪都',
  city: '市／省治',
  'county-seat': '县级驻地',
  town: '镇级战场点'
};
const stateLabels = { japan: '日军／伪政权主要控制', partial: '日军控制城市／铁路，省内混合', national: '国民政府及中国军队', base: '敌后根据地／游击区', contested: '正面争夺区', preexisting: '战前日本殖民统治' };
const provinceNames = (value) => value.replace(/(维吾尔|壮族|回族|特别行政区|自治区|省|市)$/g, '').replace('特别行政区', '');
const eventPlaces = {
  '北平西南': [39.9, 116.4], '上海': [31.2, 121.5], '山西灵丘': [39.4, 114.2], '山西太原': [37.9, 112.5], '南京': [32.1, 118.8],
  '山东台儿庄': [34.6, 117.7], '江苏徐州': [34.3, 117.2], '河南郑州附近': [34.7, 113.6], '江西德安': [29.3, 115.8], '广东广州': [23.1, 113.3],
  '湖北武汉': [30.6, 114.3], '江西南昌': [28.7, 115.9], '湖南长沙': [28.2, 112.9], '华北铁路沿线': [37.5, 113.5], '江西上高': [28.2, 114.9],
  '香港': [22.3, 114.2], '缅甸仰光': [16.8, 96.2], '浙江—江西': [28.7, 117], '湖北鄂西': [30.4, 110.2], '湖南常德': [29, 111.7],
  '河南': [34.5, 113.5], '湖南衡阳': [26.9, 112.6], '广西': [24.5, 109.5], '滇西—缅北': [25.5, 98.5], '湖南芷江': [27.4, 109.7],
  '东北': [45, 126], '东京／中国战区': [35, 121], '东京湾': [35.3, 139.8]
};

// 省级几何只是定位底图；状态按报告中的“城市、铁路、港口和争夺区”口径填写。
// partial 专门表示省内多重控制，避免把一座城市的失守写成整省沦陷。
const controlByStage = {
  '1937-a': { japan: ['黑龙江', '吉林', '辽宁', '北京', '天津', '台湾'], partial: ['河北', '山西', '内蒙古'], contested: ['山东', '江苏', '上海', '安徽', '河南'], base: ['河北', '山西'] },
  '1937-b': { japan: ['黑龙江', '吉林', '辽宁', '北京', '天津', '上海', '台湾'], partial: ['河北', '山西', '山东', '江苏', '安徽', '内蒙古'], contested: ['河南', '湖北', '江西'], base: ['河北', '山西', '山东'] },
  '1938-a': { japan: ['黑龙江', '吉林', '辽宁', '北京', '天津', '上海', '台湾'], partial: ['河北', '山西', '山东', '江苏', '安徽', '内蒙古'], contested: ['河南', '湖北', '江西', '湖南'], base: ['河北', '山西', '山东', '江苏'] },
  '1938-b': { japan: ['黑龙江', '吉林', '辽宁', '北京', '天津', '上海', '台湾'], partial: ['河北', '山西', '山东', '江苏', '安徽', '河南', '湖北', '广东', '内蒙古'], contested: ['江西', '湖南', '广西'], base: ['河北', '山西', '山东', '江苏', '安徽', '湖北'] },
  '1938-c': { japan: ['黑龙江', '吉林', '辽宁', '北京', '天津', '上海', '台湾'], partial: ['河北', '山西', '山东', '江苏', '安徽', '河南', '湖北', '湖南', '广东', '广西', '内蒙古'], contested: ['江西', '福建'], base: ['河北', '山西', '山东', '江苏', '安徽', '湖北', '湖南'] },
  '1941-b': { japan: ['黑龙江', '吉林', '辽宁', '北京', '天津', '上海', '台湾', '香港'], partial: ['河北', '山西', '山东', '江苏', '安徽', '河南', '湖北', '湖南', '江西', '广东', '广西', '海南', '内蒙古'], contested: ['福建', '浙江'], base: ['河北', '山西', '山东', '江苏', '安徽', '湖北', '湖南', '江西'] },
  '1942-c': { japan: ['黑龙江', '吉林', '辽宁', '北京', '天津', '上海', '台湾', '香港'], partial: ['河北', '山西', '山东', '江苏', '安徽', '河南', '湖北', '湖南', '江西', '浙江', '广东', '广西', '海南', '内蒙古'], contested: ['福建', '贵州'], base: ['河北', '山西', '山东', '江苏', '安徽', '湖北', '湖南', '江西', '浙江'] },
  '1944': { japan: ['黑龙江', '吉林', '辽宁', '北京', '天津', '上海', '台湾', '香港'], partial: ['河北', '山西', '山东', '江苏', '安徽', '河南', '湖北', '湖南', '江西', '浙江', '广东', '广西', '海南', '内蒙古'], contested: ['贵州', '云南', '福建'], base: ['河北', '山西', '山东', '江苏', '安徽', '湖北', '湖南', '江西', '浙江'] },
  '1945-a': { japan: ['黑龙江', '吉林', '辽宁', '北京', '天津', '上海', '台湾', '香港'], partial: ['河北', '山西', '山东', '江苏', '安徽', '河南', '湖北', '湖南', '江西', '浙江', '广东', '广西', '海南', '内蒙古'], contested: ['贵州', '云南', '福建'], base: ['河北', '山西', '山东', '江苏', '安徽', '湖北', '湖南', '江西', '浙江'] },
  '1945-b': { japan: [], partial: [], contested: ['黑龙江', '吉林', '辽宁', '河北', '山西', '山东', '江苏', '安徽', '河南', '湖北', '湖南', '江西', '浙江', '广东', '广西', '内蒙古'], base: ['河北', '山西', '山东', '江苏', '安徽', '湖北', '湖南', '江西', '浙江'], national: ['北京', '天津', '上海', '重庆'] }
};

let index = 0;
let playing = false;
let timer = null;
let map = null;
let provinceLayer = null;
let eventLayer = null;
let contextLayer = null;
let factionLayer = null;
let armyLayer = null;
let historicalAdminLayer = null;
let historicalProvinceLayer = null;
let layersControl = null;
let chinaGeoJson = null;
let historicalProvinceGeoJson = null;
let warSitesGeoJson = null;
let adminLevelFilter = 'all';

function monthLabel(value) { const [year, month] = value.split('-'); return `${year}年${Number(month)}月`; }
function monthIsBetween(value, from, to) { return value >= from && value <= to; }
function currentStage(month) { return stageDefinitions.find((stage) => stage.id === month.stageId); }
function getState(name, stageId) {
  const key = provinceNames(name);
  if (key === '台湾') return 'preexisting';
  const stage = controlByStage[stageId] || {};
  if (stage.japan?.includes(key)) return 'japan';
  if (stage.partial?.includes(key)) return 'partial';
  if (stage.base?.includes(key)) return 'base';
  if (stage.contested?.includes(key)) return 'contested';
  if (stage.national?.includes(key)) return 'national';
  return ['新疆', '西藏', '青海', '甘肃', '四川', '云南', '贵州', '陕西', '宁夏', '重庆', '福建', '澳门', '西南'].includes(key) ? 'national' : 'national';
}
function stateDescription(state, month) {
  const base = stateLabels[state];
  if (state === 'partial') return `${base}。地图颜色只用于定位，史料确认的重点是城市、铁路、港口和驻军节点。`;
  if (state === 'preexisting') return `${base}；台湾不计入1937年以后新增占领。`;
  if (state === 'base') return `${base}。根据地与日伪据点可能在同一省内重叠。`;
  return `${base}。${month.summary}`;
}
function styleFeature(feature) {
  const state = getState(feature.properties.name, months[index].stageId);
  return { color: state === 'contested' ? '#d7cfff' : '#f3f4e7', weight: state === 'contested' ? 2 : 1, dashArray: state === 'contested' || state === 'partial' ? '5 4' : null, fillColor: colors[state], fillOpacity: state === 'partial' ? .48 : .62 };
}
function popupHtml(feature, state) {
  const name = feature.properties.name;
  return `<strong>${name}</strong><br><span style="color:${colors[state]}">${stateLabels[state]}</span><hr><small>${stateDescription(state, months[index])}</small><br><small>这里显示的是主要城市、铁路、港口和乡村战线的总体情况，不表示该省每个县乡都由同一方控制。</small>`;
}
function onEachProvince(feature, layer) {
  const state = getState(feature.properties.name, months[index].stageId);
  layer.bindPopup(popupHtml(feature, state), { maxWidth: 340 });
  layer.bindTooltip(`${feature.properties.name} · ${stateLabels[state]}`, { sticky: true, className: 'province-label' });
  layer.on({ mouseover: (event) => { event.target.setStyle({ weight: 3, color: '#fff' }); event.target.bringToFront(); }, mouseout: (event) => provinceLayer.resetStyle(event.target) });
}
function renderProvinces() {
  if (!map || !chinaGeoJson) return;
  if (!provinceLayer) {
    provinceLayer = L.geoJSON(null, { style: styleFeature, onEachFeature: onEachProvince }).addTo(map);
  } else {
    provinceLayer.clearLayers();
  }
  provinceLayer.addData(chinaGeoJson);
}
function historicalProvinceStatusLabel(status) {
  if (status === 'schematic') return '1932—1944历史示意边界';
  return status === 'modern-remap' ? '现代几何代理' : '近似复原';
}
function historicalProvincePopup(properties) {
  const status = historicalProvinceStatusLabel(properties.geometryStatus);
  const modernName = properties.modernName ? `今天地图上的位置：${properties.modernName}<br>` : '';
  const source = properties.source ? `<br><small>几何来源：${properties.source}</small>` : '';
  const sourcePeriod = properties.sourcePeriod ? `<br><small>几何年代：${properties.sourcePeriod}</small>` : '';
  const sourceRepo = properties.sourceRepo ? `<br><small>来源仓库：${properties.sourceRepo}</small>` : '';
  const basis = properties.geometryStatus === 'schematic'
    ? '这条省界是1932—1944年间的历史轮廓示意，并非逐年测绘；1937年的精确变化仍需逐年核对。'
    : '这里的轮廓用于把历史名称放回今天的地图位置，不能当作精确的历史县界。';
  return `<strong>${properties.historicalName}</strong><br><small>当时所属：${properties.authority}</small><br><small>使用时间：${properties.from || '1937-07'}—${properties.to || '1945-09'}</small><br><small>边界说明：${status}</small><br><small>${modernName}${properties.note || ''}</small>${sourcePeriod}${source}${sourceRepo}<hr><small>${basis}</small><br><small>颜色、战役标记和兵力图标分别说明控制情况、事件位置和兵力分布。</small>`;
}
function historicalProvinceStyle(feature) {
  const approximate = feature.properties.geometryStatus !== 'modern-remap';
  const schematic = feature.properties.geometryStatus === 'schematic';
  return {
    color: schematic ? '#bb7b2f' : approximate ? '#9b632c' : '#806b3b',
    weight: schematic ? 2 : approximate ? 2.2 : 1.65,
    dashArray: schematic ? '5 4' : approximate ? '7 5' : '4 4',
    fillColor: schematic ? '#f1c36f' : '#efc875',
    fillOpacity: schematic ? .085 : approximate ? .10 : .045,
    className: schematic ? 'historical-province-border schematic' : approximate ? 'historical-province-border approximate' : 'historical-province-border'
  };
}
function onEachHistoricalProvince(feature, layer) {
  const status = historicalProvinceStatusLabel(feature.properties.geometryStatus);
  layer.bindTooltip(`${feature.properties.historicalName} · ${status}`, { sticky: true, className: 'historical-province-label' });
  layer.bindPopup(historicalProvincePopup(feature.properties), { maxWidth: 360 });
  layer.on({ mouseover: (event) => event.target.setStyle({ weight: 3, color: '#f5d38a', fillOpacity: .12 }), mouseout: (event) => event.target.setStyle(historicalProvinceStyle(feature)) });
}
function historicalProvinceFeatures() {
  if (historicalProvinceGeoJson?.features?.length) {
    const aliases = { 辽宁: 'liaoning', 河北: 'hebei', 台湾: 'taiwan' };
    const byId = new Map(historicalProvinceDefinitions.map((definition) => [definition.id, definition]));
    const byCompactName = new Map(historicalProvinceDefinitions.map((definition) => [definition.historicalName.replace(/省|地方|总督府辖区|（.*?）/g, ''), definition]));
    const normalized = historicalProvinceGeoJson.features.map((feature) => {
      const sourceName = feature.properties.historicalName;
      const definition = byId.get(aliases[sourceName]) || byCompactName.get(sourceName);
      return {
        ...feature,
        properties: {
          ...feature.properties,
          historicalName: definition?.historicalName || `${sourceName}省`,
          authority: definition?.authority || '中华民国',
          from: definition?.from || '1937-07',
          to: definition?.to || '1945-09',
          geometryStatus: 'schematic',
          note: feature.properties.note || definition?.note || '1932—1944历史省级边界示意。',
          source: 'DeanChensj/jiangshan-map · atlas_snapshots.js · s_roc',
          sourcePeriod: '1932—1944'
        }
      };
    });
    // The historical snapshot does not draw Taiwan in this ROC comparison.
    // Add its period-correct Japanese colonial outline as a clearly marked
    // modern-geometry proxy so the map does not silently omit the island.
    if (chinaGeoJson) {
      const presentNames = new Set(historicalProvinceGeoJson.features.map((feature) => feature.properties.historicalName));
      const taiwan = historicalProvinceDefinitions.find((definition) => definition.id === 'taiwan');
      if (taiwan && !presentNames.has('台湾')) chinaGeoJson.features.filter((feature) => taiwan.modernRefs.includes(feature.properties.name)).forEach((feature) => normalized.push({
        ...feature,
        properties: { ...feature.properties, historicalName: taiwan.historicalName, authority: taiwan.authority, from: taiwan.from, to: taiwan.to, geometryStatus: taiwan.geometryStatus, note: taiwan.note, modernName: feature.properties.name }
      }));
    }
    return normalized;
  }
  if (!chinaGeoJson) return [];
  const customGeometryIds = new Set(historicalProvinceApproximatePolygons.map((polygon) => polygon.id.replace(/-approx$/, '')));
  const definitionsByModernRef = new Map();
  historicalProvinceDefinitions.forEach((definition) => {
    // The four provinces with custom outlines must not also inherit an entire
    // modern province such as 内蒙古 or 河北; that would visually duplicate
    // unrelated territory and make the approximation look authoritative.
    if (customGeometryIds.has(definition.id)) return;
    definition.modernRefs.forEach((modernRef) => definitionsByModernRef.set(modernRef, definition));
  });
  return chinaGeoJson.features.flatMap((feature) => {
    const definition = definitionsByModernRef.get(feature.properties.name);
    if (!definition) return [];
    return [{
      ...feature,
      properties: {
        ...feature.properties,
        historicalName: definition.historicalName,
        authority: definition.authority,
        from: definition.from,
        to: definition.to,
        geometryStatus: definition.geometryStatus,
        note: definition.note,
        modernName: feature.properties.name
      }
    }];
  });
}
function renderHistoricalProvinces() {
  if (!map || (!chinaGeoJson && !historicalProvinceGeoJson)) return;
  if (!historicalProvinceLayer) historicalProvinceLayer = L.layerGroup().addTo(map);
  historicalProvinceLayer.clearLayers();
  L.geoJSON({ type: 'FeatureCollection', features: historicalProvinceFeatures() }, {
    style: historicalProvinceStyle,
    onEachFeature: onEachHistoricalProvince
  }).addTo(historicalProvinceLayer);
  if (!historicalProvinceGeoJson?.features?.length) historicalProvinceApproximatePolygons.forEach((polygon) => {
    const properties = {
      historicalName: polygon.historicalName,
      authority: polygon.authority,
      from: '1937-07',
      to: polygon.id === 'xikang-approx' ? '1945-09' : '1945-08',
      geometryStatus: polygon.geometryStatus,
      note: polygon.note,
      modernName: '无一对一现代省界'
    };
    const layer = L.polygon(polygon.coords, historicalProvinceStyle({ properties }));
    layer.bindTooltip(`${polygon.historicalName} · 近似复原`, { sticky: true, className: 'historical-province-label' });
    layer.bindPopup(historicalProvincePopup(properties), { maxWidth: 360 });
    layer.addTo(historicalProvinceLayer);
  });
}
function renderEventMarkers(month) {
  if (!map || !eventLayer) return;
  eventLayer.clearLayers();
  if (warSitesGeoJson) {
    L.geoJSON(warSitesGeoJson, {
      filter: (feature) => feature.properties.month === month.month,
      pointToLayer: (feature, latlng) => L.circleMarker(latlng, { radius: 7, color: '#fff7d8', weight: 2, fillColor: '#efc875', fillOpacity: .95, className: 'battle-site-marker' }),
      onEachFeature: (feature, layer) => layer.bindPopup(`<strong>${feature.properties.name}</strong><br><small>${feature.properties.date} · ${feature.properties.place}</small><br><small>地图上的事件位置，不代表完整战役范围；史料把握度 ${feature.properties.confidence || 'A'}</small>`)
    }).addTo(eventLayer);
    return;
  }
  month.events.forEach((event) => {
    const coords = eventPlaces[event.place];
    if (!coords) return;
    const marker = L.circleMarker(coords, { radius: 7, color: '#fff7d8', weight: 2, fillColor: '#efc875', fillOpacity: .95, className: 'event-marker' });
    marker.bindPopup(`<strong>${event.name}</strong><br><small>${event.date} · ${event.place}</small>`);
    marker.addTo(eventLayer);
  });
}
function renderHistoricalAdmin(month) {
  if (!map || !historicalAdminLayer) return;
  historicalAdminLayer.clearLayers();
  historicalAdminNodesForMonth(month).forEach((node) => {
    const level = adminLevelLabels[node.level] || node.level;
    const marker = L.circleMarker(node.coords, {
      radius: node.level === 'special-city' ? 6 : node.level === 'city' ? 5 : node.level === 'county-seat' ? 4 : 3,
      color: '#314e58', weight: 1.5, fillColor: '#f5e5b7', fillOpacity: .92, className: `historical-admin-marker ${node.level}`
    });
    marker.bindTooltip(`${node.historicalName} · ${level}`, { permanent: node.level === 'special-city', sticky: true, direction: 'right', offset: [5, 0], className: 'historical-admin-label' });
    marker.bindPopup(`<strong>${node.historicalName}</strong><br><small>当时的行政层级：${level}</small><br><small>当时所属：${node.admin1937}</small><br><small>今天地图上的位置：${node.modernName}</small><hr><small>${node.note}</small><br><small>资料来源：${node.source}；把握度 ${node.confidence}</small>`);
    marker.addTo(historicalAdminLayer);
  });
}
function historicalAdminNodesForMonth(month) {
  return historicalAdminNodes.filter((node) => monthIsBetween(month.month, node.from, node.to) && (adminLevelFilter === 'all' || node.level === adminLevelFilter));
}
const equipmentGlyphs = {
  '步兵': '♟', '轻机枪': '▰', '炮兵': '◈', '迫击炮': '◉', '装甲车': '▣',
  '航空': '✦', '空军': '✦', '航空支援': '✦', '舰炮': '⌁', '警备': '▥',
  '坦克': '▣', '火炮': '◈', '山炮': '◈', '重炮': '◈', '机枪': '▰', '骑兵': '♞',
  '汽车': '▰', '卡车': '▰', '运输车': '▰', '工兵器材': '⚒', '地雷': '✹', '装甲': '▣'
};
function forceUnitCount(site) {
  const value = Number(site.unitCount);
  return Number.isFinite(value) ? Math.max(2, Math.min(9, Math.round(value))) : 3;
}
function forceStrengthLabel(site) {
  const range = site.strengthWan;
  if (!Array.isArray(range) || range.length < 2) return '量级未估算';
  return `约 ${range[0]}—${range[1]} 万人`;
}
function equipmentHtml(site) {
  return (site.equipment || []).map((item) => `<span class="unit-equipment-chip" title="${item}"><i>${equipmentGlyphs[item] || '·'}</i>${item}</span>`).join('');
}
function forcePopupHtml(site, style) {
  const count = forceUnitCount(site);
  return `<strong>${site.label} · ${site.historicalName}</strong><br><span style="color:${style.color}">${style.label}</span><div class="force-popup"><div><b>部队</b>${site.unit || '历史节点部队'}</div><div><b>估算兵力</b><span class="force-strength">${forceStrengthLabel(site)}</span> <em>（${site.confidence || 'C'}级）</em></div><div><b>常见装备</b><span class="force-popup-equipment">${equipmentHtml(site) || '未列'}</span></div><div><b>图标说明</b>${count} 个人形；数量和大小用于比较兵力规模</div></div><hr><small>${site.role}</small><br><small>${site.forceNote || '这里是指挥或驻军集中地，不代表整座城市或整个省份都驻有这些兵力。'}</small><br><small>活动时间：${site.from}—${site.to}；${site.source}</small><br><small>数字来自公开战史整理，仅供数量级比较。</small>`;
}
function factionMarkerIcon(site) {
  const style = factionStyles[site.faction] || factionStyles.nationalist;
  return L.divIcon({
    className: `faction-marker ${site.faction}`,
    html: `<span class="faction-marker-core hq" style="--faction-color:${style.color}" aria-label="${site.label}">${style.icon}</span>`,
    iconSize: [32, 40], iconAnchor: [16, 20], tooltipAnchor: [0, -20]
  });
}
function renderFactionLayer(month) {
  if (!map || !factionLayer) return;
  factionLayer.clearLayers();
  factionTracks.filter((track) => monthIsBetween(month.month, track.from, track.to)).forEach((track) => {
    const style = factionStyles[track.faction] || factionStyles.nationalist;
    L.polyline(track.coords, {
      className: `faction-track ${track.faction}`,
      color: style.color, weight: 3, opacity: .82, dashArray: '8 10', lineCap: 'round'
    }).bindTooltip(`${track.label}<br><small>表示部队活动和推进的大致方向，不是行政边界</small>`, { sticky: true, className: 'faction-track-tip' }).addTo(factionLayer);
  });
  factionSites.filter((site) => monthIsBetween(month.month, site.from, site.to)).forEach((site) => {
    const style = factionStyles[site.faction] || factionStyles.nationalist;
    const marker = L.marker(site.coords, { icon: factionMarkerIcon(site), zIndexOffset: 700 });
    marker.bindPopup(forcePopupHtml(site, style), { maxWidth: 350 });
    marker.bindTooltip(`${site.label} · ${site.historicalName} · ${forceStrengthLabel(site)}`, { permanent: true, direction: 'top', offset: [0, -20], className: `faction-label ${site.faction}` });
    marker.addTo(factionLayer);
  });
}
function formatForceNumber(value) {
  if (!Number.isFinite(value) || value <= 0) return '0';
  const wan = value / 10000;
  if (wan >= 100) return `${Math.round(wan)}万`;
  return `${wan.toFixed(wan >= 10 ? 0 : 1).replace(/\.0$/, '')}万`;
}
function formatForceRange(range) {
  if (!Array.isArray(range) || range.length < 2 || range[1] <= 0) return '暂无兵力估算';
  return `约 ${formatForceNumber(range[0])}—${formatForceNumber(range[1])}人`;
}
function activeForceNodesForMonth(month) {
  return forceNodes.filter((node) => monthIsBetween(month.month, node.from, node.to));
}
function forceRangeForNode(node, month) {
  const total = factionForceStrength[node.faction]?.[month.stageId] || [0, 0];
  const activeNodes = activeForceNodesForMonth(month).filter((candidate) => candidate.faction === node.faction);
  const shareTotal = activeNodes.reduce((sum, candidate) => sum + candidate.share, 0) || 1;
  const share = node.share / shareTotal;
  return [Math.round(total[0] * share), Math.round(total[1] * share)];
}
function forceTokenCount(range) {
  const midpoint = (range[0] + range[1]) / 2;
  return Math.max(1, Math.min(8, Math.round(midpoint / forceDisplayMeta.unitToken)));
}
function renderArmySummary(month) {
  const summary = $('armySummary');
  if (!summary) return;
  const labels = ['japanese-army', 'puppet-manchukuo', 'puppet-nanjing', 'nationalist', 'communist'];
  summary.innerHTML = `本阶段各方估算兵力：${labels.map((faction) => {
    const style = factionStyles[faction];
    const range = factionForceStrength[faction]?.[month.stageId] || [0, 0];
    return `<span style="--army-summary-color:${style.color}"><i></i>${style.label} <b>${formatForceRange(range)}</b></span>`;
  }).join('')}`;
}
function armyDeploymentIcon(node, range) {
  const style = factionStyles[node.faction] || factionStyles.nationalist;
  const count = forceTokenCount(range);
  const figures = Array.from({ length: count }, (_, index) => `<i class="army-soldier soldier-${index % 3}" aria-hidden="true"></i>`).join('');
  const equipment = node.equipment.slice(0, 3).map((item) => `<i title="${item}">${equipmentGlyphs[item] || '·'}</i>`).join('');
  return L.divIcon({
    className: `army-deployment-marker ${node.faction}`,
    html: `<span class="army-deployment-stack" style="--army-color:${style.color};--army-count:${count};--army-scale:${(0.82 + count * 0.055).toFixed(2)}" aria-label="${node.label}，${formatForceRange(range)}"><span class="army-deployment-figures">${figures}</span><span class="army-deployment-equipment">${equipment}</span><b class="army-deployment-count">${formatForceNumber((range[0] + range[1]) / 2)}</b></span>`,
    iconSize: [112, 72], iconAnchor: [56, 60], tooltipAnchor: [0, -54]
  });
}
function armyDeploymentPopup(node, month, range) {
  const style = factionStyles[node.faction] || factionStyles.nationalist;
  const equipment = node.equipment.map((item) => `<span class="unit-equipment-chip"><i>${equipmentGlyphs[item] || '·'}</i>${item}</span>`).join('');
  return `<strong>${node.label} · ${node.historicalName}</strong><br><span style="color:${style.color}">${style.label}</span><div class="force-popup"><div><b>估算兵力</b><span class="force-strength">${formatForceRange(range)}</span></div><div><b>部队类型</b>${node.unitType}</div><div><b>常见装备</b><span class="force-popup-equipment">${equipment}</span></div><div><b>军队形象</b>${node.appearance}</div><div><b>分布</b>约 ${(node.share * 100).toFixed(0)}%（在该方当前部署点中）</div></div><hr><small>${monthLabel(month.month)} · ${currentStage(month)?.label || '阶段'}</small><br><small>${forceDisplayMeta.note}</small><br><small>说明：${forceDisplayMeta.source}</small><br><small>这里显示的是战区和驻军集中地的估计，不表示整座城市或整个省份都驻有这些兵力。</small>`;
}
function renderArmyLayer(month) {
  if (!map || !armyLayer) return;
  armyLayer.clearLayers();
  activeForceNodesForMonth(month).forEach((node) => {
    const range = forceRangeForNode(node, month);
    if (range[1] <= 0) return;
    const style = factionStyles[node.faction] || factionStyles.nationalist;
    const count = forceTokenCount(range);
    const ring = L.circle(node.coords, {
      radius: 18000 + count * 12000,
      color: style.color,
      weight: 1.5,
      dashArray: '3 5',
      fillColor: style.color,
      fillOpacity: .08,
      className: `army-strength-ring ${node.faction}`
    });
    ring.bindTooltip(`${node.label} · ${formatForceRange(range)}<br><small>圆环越大，兵力估算越高</small>`, { sticky: true, className: `army-force-tip ${node.faction}` });
    ring.addTo(armyLayer);
    const marker = L.marker(node.coords, { icon: armyDeploymentIcon(node, range), zIndexOffset: 820 });
    marker.bindTooltip(`${node.label} · ${formatForceRange(range)}`, { sticky: true, direction: 'top', offset: [0, -52], className: `army-force-label ${node.faction}` });
    marker.bindPopup(armyDeploymentPopup(node, month, range), { maxWidth: 370 });
    marker.addTo(armyLayer);
  });
}
function initMap() {
  const loading = $('mapLoading');
  if (!window.L) { loading.textContent = '本地 Leaflet 矢量组件未加载。'; loading.classList.add('error'); return; }
  map = L.map('leafletMap', { center: [34, 113], zoom: 4, minZoom: 3, maxZoom: 9, zoomControl: true });
  eventLayer = L.layerGroup().addTo(map);
  factionLayer = L.layerGroup().addTo(map);
  armyLayer = L.layerGroup().addTo(map);
  historicalAdminLayer = L.layerGroup().addTo(map);
  layersControl = L.control.layers({}, { '本月战役': eventLayer, '各方指挥点与推进方向': factionLayer, '兵力与装备（估算）': armyLayer, '当时城市与行政名称': historicalAdminLayer }, { collapsed: false, position: 'topright' }).addTo(map);
  L.control.attribution({ prefix: '历史矢量地图' }).addTo(map);
  L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);
  Promise.all([
    fetch('./src/data/china-provinces.geojson').then((response) => { if (!response.ok) throw new Error(`省级 GeoJSON ${response.status}`); return response.json(); }),
    fetch('./src/data/east-asia-countries.geojson').then((response) => { if (!response.ok) throw new Error(`东亚 GeoJSON ${response.status}`); return response.json(); }),
    fetch('./src/data/war-sites.geojson').then((response) => { if (!response.ok) throw new Error(`战役 GeoJSON ${response.status}`); return response.json(); }),
    fetch('./src/data/historical-provinces-1932-1944.geojson').then((response) => { if (!response.ok) throw new Error(`历史省界 GeoJSON ${response.status}`); return response.json(); })
  ]).then(([provinceGeoJson, contextGeoJson, sitesGeoJson, historicalProvinceGeoJsonData]) => {
    chinaGeoJson = provinceGeoJson; warSitesGeoJson = sitesGeoJson; historicalProvinceGeoJson = historicalProvinceGeoJsonData;
    contextLayer = L.geoJSON(contextGeoJson, { style: { color: '#385d6a', weight: 1.5, fill: false, opacity: .65 }, onEachFeature: (feature, layer) => layer.bindTooltip(feature.properties.name || '东亚国界') }).addTo(map);
    layersControl.addOverlay(contextLayer, '东亚范围');
    renderProvinces();
    layersControl.addOverlay(provinceLayer, '现代省界（定位参考）');
    renderHistoricalProvinces();
    layersControl.addOverlay(historicalProvinceLayer, '当时省界（示意）');
    renderFactionLayer(months[index]); renderArmyLayer(months[index]); renderHistoricalAdmin(months[index]); map.fitBounds(provinceLayer.getBounds(), { padding: [8, 8] }); loading.classList.add('loaded'); renderEventMarkers(months[index]);
  }).catch((error) => { loading.textContent = `省级 GeoJSON 加载失败：${error.message}`; loading.classList.add('error'); });
}
function updateMap(month) { if (map) { renderProvinces(); renderFactionLayer(month); renderArmyLayer(month); renderHistoricalAdmin(month); renderEventMarkers(month); } }
function renderControlRows(month) {
  const rows = [['japan', '日军／伪政权', month.japan], ['national', '国民政府及中国军队', month.national], ['base', '敌后根据地／游击区', month.base], ['contested', '正面与交通线争夺', month.contested]];
  $('controlRows').innerHTML = rows.map(([type, label, text]) => `<div class="control-row"><div class="control-row-head"><i class="${type}"></i><strong>${label}</strong></div><p>${text.join('；')}</p></div>`).join('');
}
function renderEvents(month) {
  $('eventCount').textContent = `${month.events.length} 条`;
  $('eventList').innerHTML = month.events.length ? month.events.map((event) => `<article class="event-item"><span class="event-date">${event.date.replaceAll('-', '.')}</span><strong class="event-name">${event.name}</strong><span class="event-place">${event.place}</span></article>`).join('') : '<p class="empty-event">本月没有单独列出的关键节点。主要战线以阶段性推进、扫荡、反扫荡或交通线争夺为主。</p>';
}
function renderMonthLog() {
  $('monthLog').innerHTML = months.map((month, i) => `<button class="month-cell ${i === index ? 'active' : ''} ${month.events.length ? 'has-event' : ''}" data-index="${i}" type="button" aria-label="${monthLabel(month.month)}"><span class="year">${month.month.slice(0, 4)}</span><span class="month">${month.month.slice(5)}月</span></button>`).join('');
  document.querySelectorAll('.month-cell').forEach((button) => button.addEventListener('click', () => setIndex(Number(button.dataset.index))));
}
function renderSelect() { $('monthSelect').innerHTML = months.map((month, i) => `<option value="${i}">${monthLabel(month.month)} · ${month.stageLabel}</option>`).join(''); }
function setIndex(next) {
  index = Math.max(0, Math.min(months.length - 1, next));
  const month = months[index]; const stage = currentStage(month);
  $('monthSlider').value = String(index); $('monthSelect').value = String(index);
  $('currentMonthLabel').textContent = monthLabel(month.month); $('mapMonthTitle').textContent = monthLabel(month.month); $('fullscreenMonthLabel')?.replaceChildren(document.createTextNode(monthLabel(month.month))); $('stageLabel').textContent = month.stageLabel;
  $('phaseTitle').textContent = stage.label; $('phaseSummary').textContent = stage.summary; $('phaseRange').textContent = `${stage.start.replace('-', '.')} — ${stage.end.replace('-', '.')}`;
  renderControlRows(month); renderEvents(month); renderArmySummary(month); updateMap(month);
  renderMonthLog();
}
const fullscreenPrev = $('fullscreenPrev');
const fullscreenPlay = $('fullscreenPlay');
const fullscreenNext = $('fullscreenNext');
function syncFullscreenPlayButton() {
  if (!fullscreenPlay) return;
  fullscreenPlay.setAttribute('aria-pressed', String(playing));
  $('fullscreenPlayText').textContent = playing ? '暂停' : '播放';
  $('fullscreenPlayIcon').textContent = playing ? 'Ⅱ' : '▶';
}
function stopPlaying() { playing = false; if (timer) window.clearInterval(timer); timer = null; $('playButton').setAttribute('aria-pressed', 'false'); $('playText').textContent = '播放时间轴'; $('playButton').querySelector('.play-icon').textContent = '▶'; syncFullscreenPlayButton(); }
function togglePlaying() { if (playing) { stopPlaying(); return; } playing = true; $('playButton').setAttribute('aria-pressed', 'true'); $('playText').textContent = '暂停播放'; $('playButton').querySelector('.play-icon').textContent = 'Ⅱ'; syncFullscreenPlayButton(); timer = window.setInterval(() => { if (index >= months.length - 1) return stopPlaying(); setIndex(index + 1); }, 1050); }
$('prevMonth').addEventListener('click', () => { stopPlaying(); setIndex(index - 1); }); $('nextMonth').addEventListener('click', () => { stopPlaying(); setIndex(index + 1); }); $('playButton').addEventListener('click', togglePlaying);
fullscreenPrev?.addEventListener('click', () => { stopPlaying(); setIndex(index - 1); }); fullscreenNext?.addEventListener('click', () => { stopPlaying(); setIndex(index + 1); }); fullscreenPlay?.addEventListener('click', togglePlaying);
$('monthSlider').addEventListener('input', (event) => { stopPlaying(); setIndex(Number(event.target.value)); }); $('monthSelect').addEventListener('change', (event) => { stopPlaying(); setIndex(Number(event.target.value)); });
$('zoomIn').addEventListener('click', () => map?.zoomIn()); $('zoomOut').addEventListener('click', () => map?.zoomOut()); $('zoomReset').addEventListener('click', () => { if (map && provinceLayer) map.fitBounds(provinceLayer.getBounds(), { padding: [8, 8] }); });
const adminLevelSelect = $('adminLevelSelect');
adminLevelSelect?.addEventListener('change', (event) => { adminLevelFilter = event.target.value; renderHistoricalAdmin(months[index]); });
const fullscreenMapButton = $('fullscreenMap');
const mapCard = document.querySelector('.map-card');
function setMapFullscreen(enabled) {
  if (!fullscreenMapButton || !mapCard) return;
  document.body.classList.toggle('map-fullscreen', enabled);
  mapCard.classList.toggle('map-card-fullscreen', enabled);
  fullscreenMapButton.setAttribute('aria-pressed', String(enabled));
  fullscreenMapButton.setAttribute('aria-label', enabled ? '退出全屏地图' : '全屏地图');
  fullscreenMapButton.textContent = enabled ? '×' : '⛶';
  window.setTimeout(() => {
    if (!map) return;
    map.invalidateSize({ animate: false });
    if (provinceLayer) map.fitBounds(provinceLayer.getBounds(), { padding: enabled ? [96, 120] : [8, 8], animate: false });
  }, 80);
}
fullscreenMapButton?.addEventListener('click', () => setMapFullscreen(!document.body.classList.contains('map-fullscreen')));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && document.body.classList.contains('map-fullscreen')) setMapFullscreen(false); });
renderSelect(); setIndex(0); initMap();
