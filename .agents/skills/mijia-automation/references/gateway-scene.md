# 网关场景触发

## 概述

小米智能多模网关支持场景触发功能，可以通过预设的场景名称触发自动化规则。

## 触发节点配置

```json
{
  "id": "node_<timestamp>",
  "type": "deviceInput",
  "cfg": {
    "urn": "urn:miot-spec-v2:device:gateway:0000A019:xiaomi-hub1:3",
    "pos": {"x": 100, "y": 100, "width": 200, "height": 100}
  },
  "props": {
    "did": "<网关设备ID>",
    "siid": 4,
    "eiid": 1,
    "arguments": [
      {
        "dtype": "string",
        "piid": 1,
        "operator": "=",
        "v1": "<场景名称>"
      }
    ]
  },
  "inputs": {},
  "outputs": {"output": [["<下一节点>", "trigger"]]}
}
```

## 参数说明

| 字段 | 说明 | 示例 |
|------|------|------|
| did | 网关设备ID | "1179053616" |
| siid | 场景服务ID | 4 |
| eiid | 场景事件ID | 1 |
| arguments | 触发参数 | 见下文 |
| piid | 场景名称属性ID | 1 |
| operator | 匹配操作符 | "=" |
| v1 | 场景名称 | "客厅明亮" |

## 常见场景名称

- "客厅明亮" - 客厅明亮模式
- "客厅温馨" - 客厅温馨模式
- "回家" - 回家场景
- "离家" - 离家场景
- "晚安" - 睡眠场景
- "起床" - 起床场景

## 使用示例

### 场景触发开灯

```json
{
  "nodes": [
    {
      "id": "node_1",
      "type": "deviceInput",
      "cfg": {
        "urn": "urn:miot-spec-v2:device:gateway:0000A019:xiaomi-hub1:3",
        "pos": {"x": 100, "y": 100, "width": 200, "height": 100}
      },
      "props": {
        "did": "1179053616",
        "siid": 4,
        "eiid": 1,
        "arguments": [
          {"dtype": "string", "piid": 1, "operator": "=", "v1": "客厅明亮"}
        ]
      },
      "inputs": {},
      "outputs": {"output": [["node_2", "trigger"]]}
    },
    {
      "id": "node_2",
      "type": "deviceOutput",
      "cfg": {
        "urn": "urn:miot-spec-v2:device:light:0000A001:xiaomi-btlm2p:2",
        "pos": {"x": 300, "y": 100, "width": 200, "height": 100}
      },
      "props": {
        "did": "950058664",
        "siid": 2,
        "piid": 2,
        "dtype": "int",
        "params": [100]
      },
      "inputs": {"trigger": null},
      "outputs": {}
    }
  ]
}
```

### 多场景触发（signalOr）

```json
{
  "nodes": [
    {
      "id": "node_1",
      "type": "deviceInput",
      "cfg": {"urn": "urn:miot-spec-v2:device:gateway:0000A019:xiaomi-hub1:3"},
      "props": {
        "did": "1179053616",
        "siid": 4,
        "eiid": 1,
        "arguments": [{"dtype": "string", "piid": 1, "operator": "=", "v1": "客厅明亮"}]
      },
      "inputs": {},
      "outputs": {"output": [["node_or", "input0"]]}
    },
    {
      "id": "node_2",
      "type": "deviceInput",
      "cfg": {"urn": "urn:miot-spec-v2:device:gateway:0000A019:xiaomi-hub1:3"},
      "props": {
        "did": "1179053616",
        "siid": 4,
        "eiid": 1,
        "arguments": [{"dtype": "string", "piid": 1, "operator": "=", "v1": "客厅温馨"}]
      },
      "inputs": {},
      "outputs": {"output": [["node_or", "input1"]]}
    },
    {
      "id": "node_or",
      "type": "signalOr",
      "cfg": {"pos": {"x": 200, "y": 300, "width": 200, "height": 100}},
      "inputs": {"input0": null, "input1": null},
      "outputs": {"output": [["node_3", "trigger"]]}
    },
    {
      "id": "node_3",
      "type": "deviceOutput",
      "cfg": {"urn": "urn:miot-spec-v2:device:light:0000A001:lemesh-wy0d02:1"},
      "props": {
        "did": "2076971127",
        "siid": 2,
        "piid": 2,
        "dtype": "int",
        "params": [80]
      },
      "inputs": {"trigger": null},
      "outputs": {}
    }
  ]
}
```

## 注意事项

1. **网关ID** - 使用网关设备的 did，不是名称
2. **场景名称** - 必须与米家APP中设置的场景名称完全一致
3. **arguments 格式** - 使用 `piid: 1` 和 `operator: "="` 匹配场景名称
4. **多场景触发** - 使用 signalOr 节点合并多个场景触发
