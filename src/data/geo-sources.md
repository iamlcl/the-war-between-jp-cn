# 地理数据来源

`china-provinces.geojson` 是 npm 包 [`china-geojson`](https://www.npmjs.com/package/china-geojson) 1.0.0 中的省级 GeoJSON 文件，原始项目为 [antvis/china-geojson](https://github.com/antvis/china-geojson)，包元数据标注 MIT License。下载日期：2026-10-22。

该文件包含 35 个省级/特别行政区要素，坐标为 WGS84 经纬度形式，可直接作为 Leaflet 的 `L.geoJSON` 图层。它是现代行政边界，用于地图定位和省级底图；不应被解读为 1937—1945 年的历史省界或当时的控制边界。

历史控制图层使用报告中的“城市、港口、铁路、据点、根据地和争夺区”证据分级；没有史料支持的县级边界不绘制为确定边界。

`east-asia-countries.geojson` 是从 [datasets/geo-countries](https://github.com/datasets/geo-countries) 的 `countries.geojson` 中筛出的中国、日本、朝鲜、韩国、蒙古、俄罗斯、缅甸、越南、老挝、泰国和台湾等 11 个要素。该数据集以 Natural Earth 国界资料为基础；使用时应同时遵守仓库中的许可证和 Natural Earth 的公共领域条款。它用于东亚区域上下文，不用于判定战时主权或占领线。

`war-sites.geojson` 为报告中 38 个关键事件的 GeoJSON 点图层。事件名称、日期和地点来自 `warData.js`；坐标为对应城市或战区的近似 WGS84 坐标，用于地图定位，不表示战役边界。事件史料应以 `report.md` 所列战史与档案来源为准。
