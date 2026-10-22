# 控制图层数据口径

真实地图的行政边界和历史控制边界是两个不同层次。GeoJSON feature 应至少包含：

```json
{
  "properties": {
    "name": "示例地区",
    "month": "1938-10",
    "status": "japan|national|base|contested|nominal",
    "confidence": "A|B|C",
    "scope": "city|port|railway|county|province|area",
    "source": "《战史丛书》或档案页码",
    "note": "说明直接占领、据点范围或争夺区"
  }
}
```

- `A`：有明确攻占、撤退、持续驻军或行政记录。
- `B`：有战区、根据地或伪政权记载，但无法确定县内完整控制。
- `C`：依据相邻月份或交通线进行的推定，必须使用纹理、透明度并标注“推定”。

省级 GeoJSON 只用于真实地理定位和现代边界参照；除非来源明确给出整省控制，否则不得将省级 feature 填成完整占领区。城市、港口、铁路和据点应使用点或线图层，乡村争夺区使用独立 polygon 图层。

`historicalAdmin.js` 的条目是 1937—1945 年历史行政驻地／军政节点索引，使用 `historicalName`、`modernName`、`admin1937`、`level`、`confidence` 和 `source` 字段。它把特别市、市／省治、县级驻地和镇级战场点分开显示；点位不等于县界，现代省界也不应被解释为战时行政边界。县域多边形只有在接入 CHGIS 1935 等历史边界资料并逐幅核验后才能加入。

`historicalProvinces.js` 的省级定义至少包含 `historicalName`、`authority`、`from`、`to`、`modernRefs`、`geometryStatus` 和 `note`。`historical-provinces-1932-1944.geojson` 的 `schematic` 表示 1932—1944 历史示意轮廓；`modern-remap` 只能作为定位代理；`approximate-remap` 与 `approximate` 必须用虚线、低透明度和弹窗说明，不能称作精确历史界线。省界层与月度控制层分开：前者回答“当时的省级分区”，后者回答“本月哪些城市、交通线、据点和根据地处于何种控制状态”。
