# API Document

## 查看车辆信息（仅限正在线路上运行的车辆）

```shell
curl https://bus.sustcra.com/api/v1/bus/timetable/
```

### 返回值

```json
[
  {
    "acc": -1, 
    "course": 0, 
    "ctrl_point": 0, 
    "depart_seconds": -1, 
    "depart_time": -1, 
    "direction": -1, 
    "gps_time": -1, 
    "imei": "866005041185986", 
    "lat": 0.0, 
    "lng": 0.0, 
    "peak_line": 0, 
    "speed": -9, 
    "status": 1, 
    "tag": 0
  }, 
  {
    "acc": 0, 
    "course": 166, 
    "ctrl_point": 0, 
    "depart_seconds": 925, 
    "depart_time": -1, 
    "direction": -1, 
    "gps_time": 0, 
    "imei": "866005041186018", 
    "lat": 22.610617, 
    "lng": 113.997377, 
    "peak": 0, 
    "peak_line": 0, 
    "speed": 0, 
    "status": 3, 
    "tag": 0
  }, 
  {
    "acc": 1, 
    "course": 141, 
    "ctrl_point": 8, 
    "depart_seconds": 48, 
    "depart_time": 42300, 
    "direction": 2, 
    "gps_time": 42348, 
    "imei": "866005041200199", 
    "lat": 22.608211, 
    "lng": 113.998835, 
    "peak": 0, 
    "peak_line": 0, 
    "speed": 14, 
    "status": 0, 
    "tag": 1
  }
]
```

| Key            | Desc                                                         |
| -------------- | ------------------------------------------------------------ |
| acc            | 设备状态（继承自gpsoo设备状态）                              |
| course         | 0-359，向上为0，顺时针递增                                   |
| ctrl_point     | 车辆目前处于的控制点（与控制点json有关）                     |
| depart_seconds | 本班车已经行驶的时间（秒）                                   |
| direction      | 运行方向，`1`表示往欣园，`2`表示往工学院                     |
| gps_time       | 车辆上报数据时，车机的GPS时间                                |
| imei           | 车辆上报设备的IMEI（唯一标识）                               |
| lat            | 纬度（WGS84）                                                |
| lng            | 经度（WGS84）                                                |
| peak           | 高峰线（DEPRECATED）                                         |
| peak_line      | 高峰线，`1`为高峰线，`0`为平峰                               |
| speed          | 速度（km/h）                                                 |
| status         | 设备平台状态信息，包括GPS定位状态、设备电池电量、外接电压等级、外接电池电量等信息。(如果设备过期，值为空字符串) |
| tag            | `tag>0`代表车辆在运行                                        |

## 参考

- GPSOO相关文档：[http://www.gpsoo.net/open/v1.0/dataApi.html](http://www.gpsoo.net/open/v1.0/dataApi.html)