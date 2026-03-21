# 节点类型详解

## 触发器节点

### deviceInput - 设备触发器

监听设备事件或属性变化时触发。

```json
{
  "id": "node_<timestamp>",
  "type": "deviceInput",
  "cfg": {
    "urn": "<设备URN>",
    "pos": {"x": 100, "y": 100, "width": 200, "height": 100}
  },
  "props": {
    "did": "<设备ID>",
    "siid": <服务ID>,
    "eiid": <事件ID>,  // 事件触发时使用
    // 或
    "piid": <属性ID>,  // 属性触发时使用
    "dtype": "bool|int|float|string",
    "operator": "eq|ne|gt|lt|ge|le",
    "value": <触发值>,
    "preload": false
  },
  "inputs": {},
  "outputs": {"output": [["<下一节点ID>", "trigger"]]}
}
```

**触发条件**：
- `piid` 存在：属性值满足条件时触发
- `eiid` 存在：事件发生时触发

**操作符**：
| 操作符 | 说明 | 适用类型 |
|--------|------|----------|
| eq | 等于 | 所有类型 |
| ne | 不等于 | 所有类型 |
| gt | 大于 | int, float |
| lt | 小于 | int, float |
| ge | 大于等于 | int, float |
| le | 小于等于 | int, float |

### timer - 定时触发

```json
{
  "id": "node_<timestamp>",
  "type": "timer",
  "cfg": {"pos": {...}},
  "props": {
    "type": "periodicAlarm",
    "hour": 8,
    "minute": 0,
    "second": 0,
    "filter": {
      "type": "weekday",
      "days": [1, 2, 3, 4, 5]  // 1=周一, 7=周日
    }
  },
  "outputs": {"output": [["<下一节点>", "trigger"]]}
}
```

## 执行节点

### deviceOutput - 设备控制

```json
{
  "id": "node_<timestamp>",
  "type": "deviceOutput",
  "cfg": {"urn": "<设备URN>", "pos": {...}},
  "props": {
    "did": "<设备ID>",
    "siid": <服务ID>,
    "aiid": <动作ID>,  // 执行动作
    // 或
    "piid": <属性ID>,  // 设置属性
    "dtype": "<数据类型>",
    "params": [<参数值>]
  },
  "inputs": {"trigger": null},
  "outputs": {}
}
```

### deviceGet - 查询状态

```json
{
  "id": "node_<timestamp>",
  "type": "deviceGet",
  "cfg": {"urn": "<设备URN>", "pos": {...}},
  "props": {
    "did": "<设备ID>",
    "siid": <服务ID>,
    "piid": <属性ID>,
    "dtype": "<数据类型>"
  },
  "inputs": {"trigger": null},
  "outputs": {
    "output": [["<满足节点>", "trigger"]],
    "output2": [["<不满足节点>", "trigger"]]
  }
}
```

## 逻辑节点

### condition - 条件判断

```json
{
  "id": "node_<timestamp>",
  "type": "condition",
  "cfg": {"pos": {...}},
  "inputs": {
    "trigger": null,
    "condition": null
  },
  "outputs": {
    "met": [["<满足节点>", "trigger"]],
    "unmet": [["<不满足节点>", "trigger"]]
  }
}
```

### signalOr - 事件或

任一输入触发时输出。

```json
{
  "id": "node_<timestamp>",
  "type": "signalOr",
  "cfg": {"pos": {...}},
  "inputs": {
    "input0": null,
    "input1": null
  },
  "outputs": {"output": [["<下一节点>", "trigger"]]}
}
```

### logicAnd - 逻辑与

所有输入都满足时触发。

```json
{
  "id": "node_<timestamp>",
  "type": "logicAnd",
  "cfg": {"pos": {...}},
  "inputs": {
    "input0": null,
    "input1": null
  },
  "outputs": {"output": [["<下一节点>", "trigger"]]}
}
```

### logicOr - 逻辑或

任一输入满足时触发。

```json
{
  "id": "node_<timestamp>",
  "type": "logicOr",
  "cfg": {"pos": {...}},
  "inputs": {
    "input0": null,
    "input1": null
  },
  "outputs": {"output": [["<下一节点>", "trigger"]]}
}
```

### logicNot - 逻辑非

输入状态取反。

```json
{
  "id": "node_<timestamp>",
  "type": "logicNot",
  "cfg": {"pos": {...}},
  "inputs": {"input": null},
  "outputs": {"output": [["<下一节点>", "trigger"]]}
}
```

## 辅助节点

### delay - 延时

```json
{
  "id": "node_<timestamp>",
  "type": "delay",
  "cfg": {"pos": {...}},
  "props": {"timeout": 60000},  // 毫秒
  "inputs": {"trigger": null},
  "outputs": {"output": [["<下一节点>", "trigger"]]}
}
```

### loop - 循环

```json
{
  "id": "node_<timestamp>",
  "type": "loop",
  "cfg": {"pos": {...}},
  "props": {"interval": 600000},  // 毫秒
  "inputs": {
    "start": null,
    "stop": null
  },
  "outputs": {"output": [["<下一节点>", "trigger"]]}
}
```

### counter - 计数器

```json
{
  "id": "node_<timestamp>",
  "type": "counter",
  "cfg": {"pos": {...}},
  "inputs": {
    "count": null,
    "reset": null
  },
  "outputs": {"output": [["<下一节点>", "trigger"]]}
}
```

## 数据节点

### variableGet - 获取变量

```json
{
  "id": "node_<timestamp>",
  "type": "variableGet",
  "cfg": {"pos": {...}},
  "props": {
    "scope": "global",
    "id": "var_xxx",
    "dtype": "number|string"
  },
  "inputs": {"trigger": null},
  "outputs": {
    "output": [["<下一节点>", "trigger"]],
    "output2": [["<下一节点>", "value"]]
  }
}
```

### variableSet - 设置变量

```json
{
  "id": "node_<timestamp>",
  "type": "variableSet",
  "cfg": {"pos": {...}},
  "props": {
    "scope": "global",
    "id": "var_xxx",
    "dtype": "number|string",
    "value": <值>
  },
  "inputs": {"trigger": null},
  "outputs": {}
}
```
