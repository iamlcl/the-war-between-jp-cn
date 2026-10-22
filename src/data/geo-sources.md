# 地理数据来源

`china-provinces.geojson` 是 npm 包 [`china-geojson`](https://www.npmjs.com/package/china-geojson) 1.0.0 中的省级 GeoJSON 文件，原始项目为 [antvis/china-geojson](https://github.com/antvis/china-geojson)，包元数据标注 MIT License。下载日期：2026-10-22。

该文件包含 35 个省级/特别行政区要素，坐标为 WGS84 经纬度形式，可直接作为 Leaflet 的 `L.geoJSON` 图层。它是现代行政边界，用于地图定位和省级底图；不应被解读为 1937—1945 年的历史省界或当时的控制边界。

历史控制图层使用报告中的“城市、港口、铁路、据点、根据地和争夺区”证据分级；没有史料支持的县级边界不绘制为确定边界。

`east-asia-countries.geojson` 是从 [datasets/geo-countries](https://github.com/datasets/geo-countries) 的 `countries.geojson` 中筛出的中国、日本、朝鲜、韩国、蒙古、俄罗斯、缅甸、越南、老挝、泰国和台湾等 11 个要素。该数据集以 Natural Earth 国界资料为基础；使用时应同时遵守仓库中的许可证和 Natural Earth 的公共领域条款。它用于东亚区域上下文，不用于判定战时主权或占领线。

`war-sites.geojson` 为报告中 38 个关键事件的 GeoJSON 点图层。事件名称、日期和地点来自 `warData.js`；坐标为对应城市或战区的近似 WGS84 坐标，用于地图定位，不表示战役边界。事件史料应以 `report.md` 所列战史与档案来源为准。

`historicalAdmin.js` 是战时行政名称与军政节点索引，不是县界多边形。条目的 `historicalName`、`admin1937` 和 `level` 保留 1937—1945 年语境，`modernName` 只用于现代地图定位；`confidence` 和 `source` 用于区分可直接核验的城市/县城节点与根据地政治节点。历史行政区复原建议以 Harvard China Historical GIS（CHGIS）1935 historical administrative units 为边界底稿，再逐幅对照民国行政区划沿革和战史地图；本项目未把现代省界当作历史县界。

`historicalProvinces.js` 是独立的 1937—1945 省级分区注册表。它保留民国、满洲国和蒙疆语境下的省名、政权、存在区间和现代定位映射，并为缺少历史几何时提供后备近似轮廓。

`historical-provinces-1932-1944.geojson` 是应用当前使用的历史省界层，来自 DeanChensj/jiangshan-map 的 `atlas_snapshots.js` `s_roc` 快照（[源仓库](https://github.com/DeanChensj/jiangshan-map)，GPL-3.0）。该快照覆盖 1932—1944 的 29 个省级轮廓，包括察哈尔、绥远、热河和西康；来源项目将其定义为示意性历史轮廓，不能当作逐年测绘。文件保留 `sourceRepo`、`sourceFile`、`sourceSnapshot` 和 `geometryStatus=schematic` 字段；台湾因该快照的 ROC 对照范围未绘制，由本项目标为日本殖民时期的现代几何定位代理。若需要 1937 年逐县可审计边界，仍须按授权接入 CHGIS 时序数据并对照同期行政图。
