import { months, stageDefinitions, eventIndex } from './data/warData.js';

const $ = (id) => document.getElementById(id);
const colors = { japan: '#d86148', partial: '#e49a63', national: '#2b9e96', base: '#d0a341', contested: '#7069a3', preexisting: '#8a6b4a' };
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
let layersControl = null;
let chinaGeoJson = null;
let warSitesGeoJson = null;

function monthLabel(value) { const [year, month] = value.split('-'); return `${year}年${Number(month)}月`; }
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
  if (state === 'partial') return `${base}。本月省级多边形只用于定位，史料确认的是主要城市、铁路、港口与驻军节点。`;
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
  return `<strong>${name}</strong><br><span style="color:${colors[state]}">${stateLabels[state]}</span><hr><small>${stateDescription(state, months[index])}</small><br><small>数据层级：现行省级 GeoJSON + 月度战局定性资料；不表示该省全部县乡均由同一方行政控制。</small>`;
}
function onEachProvince(feature, layer) {
  const state = getState(feature.properties.name, months[index].stageId);
  layer.bindPopup(popupHtml(feature, state), { maxWidth: 340 });
  layer.bindTooltip(`${feature.properties.name} · ${stateLabels[state]}`, { sticky: true, className: 'province-label' });
  layer.on({ mouseover: (event) => { event.target.setStyle({ weight: 3, color: '#fff' }); event.target.bringToFront(); }, mouseout: (event) => provinceLayer.resetStyle(event.target) });
}
function renderProvinces() {
  if (!map || !chinaGeoJson) return;
  if (provinceLayer) provinceLayer.remove();
  provinceLayer = L.geoJSON(chinaGeoJson, { style: styleFeature, onEachFeature: onEachProvince }).addTo(map);
}
function renderEventMarkers(month) {
  if (!map || !eventLayer) return;
  eventLayer.clearLayers();
  if (warSitesGeoJson) {
    L.geoJSON(warSitesGeoJson, {
      filter: (feature) => feature.properties.month === month.month,
      pointToLayer: (feature, latlng) => L.circleMarker(latlng, { radius: 7, color: '#fff7d8', weight: 2, fillColor: '#efc875', fillOpacity: .95 }),
      onEachFeature: (feature, layer) => layer.bindPopup(`<strong>${feature.properties.name}</strong><br><small>${feature.properties.date} · ${feature.properties.place}</small><br><small>事件定位点，非战役边界；证据等级 ${feature.properties.confidence || 'A'}</small>`)
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
function initMap() {
  const loading = $('mapLoading');
  if (!window.L) { loading.textContent = '本地 Leaflet 矢量组件未加载。'; loading.classList.add('error'); return; }
  map = L.map('leafletMap', { center: [34, 113], zoom: 4, minZoom: 3, maxZoom: 9, zoomControl: true });
  eventLayer = L.layerGroup().addTo(map);
  layersControl = L.control.layers({}, { '本月战役标记': eventLayer }, { collapsed: false, position: 'topright' }).addTo(map);
  L.control.attribution({ prefix: '离线 GeoJSON · Leaflet' }).addTo(map);
  L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);
  Promise.all([
    fetch('./src/data/china-provinces.geojson').then((response) => { if (!response.ok) throw new Error(`省级 GeoJSON ${response.status}`); return response.json(); }),
    fetch('./src/data/east-asia-countries.geojson').then((response) => { if (!response.ok) throw new Error(`东亚 GeoJSON ${response.status}`); return response.json(); }),
    fetch('./src/data/war-sites.geojson').then((response) => { if (!response.ok) throw new Error(`战役 GeoJSON ${response.status}`); return response.json(); })
  ]).then(([provinceGeoJson, contextGeoJson, sitesGeoJson]) => {
    chinaGeoJson = provinceGeoJson; warSitesGeoJson = sitesGeoJson;
    contextLayer = L.geoJSON(contextGeoJson, { style: { color: '#385d6a', weight: 1.5, fill: false, opacity: .65 }, onEachFeature: (feature, layer) => layer.bindTooltip(feature.properties.name || '东亚国界') }).addTo(map);
    layersControl.addOverlay(contextLayer, '东亚国界背景');
    renderProvinces(); map.fitBounds(provinceLayer.getBounds(), { padding: [8, 8] }); loading.classList.add('loaded'); renderEventMarkers(months[index]);
  }).catch((error) => { loading.textContent = `省级 GeoJSON 加载失败：${error.message}`; loading.classList.add('error'); });
}
function updateMap(month) { if (map) { renderProvinces(); renderEventMarkers(month); } }
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
  $('currentMonthLabel').textContent = monthLabel(month.month); $('mapMonthTitle').textContent = monthLabel(month.month); $('stageLabel').textContent = month.stageLabel;
  $('phaseTitle').textContent = stage.label; $('phaseSummary').textContent = stage.summary; $('phaseRange').textContent = `${stage.start.replace('-', '.')} — ${stage.end.replace('-', '.')}`;
  renderControlRows(month); renderEvents(month); updateMap(month);
  renderMonthLog();
}
function stopPlaying() { playing = false; if (timer) window.clearInterval(timer); timer = null; $('playButton').setAttribute('aria-pressed', 'false'); $('playText').textContent = '播放时间轴'; $('playButton').querySelector('.play-icon').textContent = '▶'; }
function togglePlaying() { if (playing) { stopPlaying(); return; } playing = true; $('playButton').setAttribute('aria-pressed', 'true'); $('playText').textContent = '暂停播放'; $('playButton').querySelector('.play-icon').textContent = 'Ⅱ'; timer = window.setInterval(() => { if (index >= months.length - 1) return stopPlaying(); setIndex(index + 1); }, 1050); }
$('prevMonth').addEventListener('click', () => { stopPlaying(); setIndex(index - 1); }); $('nextMonth').addEventListener('click', () => { stopPlaying(); setIndex(index + 1); }); $('playButton').addEventListener('click', togglePlaying);
$('monthSlider').addEventListener('input', (event) => { stopPlaying(); setIndex(Number(event.target.value)); }); $('monthSelect').addEventListener('change', (event) => { stopPlaying(); setIndex(Number(event.target.value)); });
$('zoomIn').addEventListener('click', () => map?.zoomIn()); $('zoomOut').addEventListener('click', () => map?.zoomOut()); $('zoomReset').addEventListener('click', () => { if (map && provinceLayer) map.fitBounds(provinceLayer.getBounds(), { padding: [8, 8] }); });
renderSelect(); setIndex(0); initMap();
