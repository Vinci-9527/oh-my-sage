# 设备 URN 查询

## URN 格式

```
urn:miot-spec-v2:{类型}:{子类型}:{厂商代码}:{型号}:{版本}:{其他}
```

示例：
```
urn:miot-spec-v2:device:light:0000A001:xiaomi-btlm2p:2:0000C802
urn:miot-spec-v2:service:light:00007802:xiaomi-btlm2p:2
urn:miot-spec-v2:property:on:00000006:00000001
```

## 查询方式

访问 MIOT Spec 网站获取设备详细信息：

```
https://miot-spec.org/miot-spec-v2/instance?type=<设备URN>
```

返回结构：
```json
{
  "description": "设备描述",
  "services": [
    {
      "iid": 1,
      "type": "urn:miot-spec-v2:service:device-information:00007801",
      "description": "设备信息",
      "properties": [...],
      "events": [...],
      "actions": [...]
    }
  ]
}
```

## 常用服务类型

| 服务 | siid 说明 | 常见操作 |
|------|-----------|----------|
| device-information | 1 - 设备信息 | 只读 |
| light | 2 - 灯光控制 | 开关、亮度、色温 |
| switch | 2 - 开关控制 | 开关 |
| environment | 3 - 环境传感器 | 温度、湿度 |
| occupancy-sensor | 2 - 人体传感器 | 人体存在、移动 |
| physical-button | 3 - 物理按键 | 按钮事件 |
| gateway | 3 - 网关服务 | 场景触发 |

## 常用属性 URN

| URN | 说明 | 值类型 | 范围 |
|-----|------|--------|------|
| `urn:miot-spec-v2:property:on:00000006` | 开关 | boolean | true/false |
| `urn:miot-spec-v2:property:brightness:00000005` | 亮度 | int | 1-100 |
| `urn:miot-spec-v2:property:color-temperature:0000000F` | 色温 | int | 2700-6500 |
| `urn:miot-spec-v2:property:temperature:00000020` | 温度 | float | - |
| `urn:miot-spec-v2:property:relative-humidity:00000022` | 湿度 | float | 0-100 |
| `urn:miot-spec-v2:property:motion-state:0000007D` | 人体移动 | boolean | true/false |
| `urn:miot-spec-v2:property:contact-state:0000007C` | 门窗状态 | boolean | true/false |
| `urn:miot-spec-v2:property:illumination:0000007A` | 光照度 | int | - |

## 常见设备类型 URN

| 设备 | URN 后缀 |
|------|----------|
| 灯光 | `device:light:0000A001` |
| 筒灯 | `device:light:0000A001` |
| 灯带 | `device:light:0000A001` |
| 空调 | `device:air-conditioner:0000A004` |
| 窗帘 | `device:curtain:0000A00C` |
| 人体传感器 | `device:sensor:0000A077` |
| 温湿度传感器 | `device:sensor:0000A07A` |
| 门锁 | `device:lock:0000A06F` |
| 摄像头 | `device:camera:0000A05B` |
| 音箱 | `device:speaker:0000A045` |
| 开关 | `device:switch:0000A023` |

## 数据类型

| dtype | 说明 | 示例 |
|-------|------|------|
| boolean | 布尔 | true, false |
| int | 整数 | 25, 100 |
| float | 浮点数 | 25.5 |
| string | 字符串 | "hello" |

## 操作符

| 操作符 | 说明 |
|--------|------|
| eq | 等于 (==) |
| ne | 不等于 (!=) |
| gt | 大于 (>) |
| lt | 小于 (<) |
| ge | 大于等于 (>=) |
| le | 小于等于 (<=) |
| = | 字符串等于 |

## 获取设备信息的方式

1. 使用 `get_devices` 获取设备列表
2. 从设备信息中获取 `urn` 字段
3. 访问 MIOT Spec 获取详细信息
4. 从 services 中找到对应的 siid, piid, eiid, aiid
