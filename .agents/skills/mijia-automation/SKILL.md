---
name: mijia-automation
description: 米家自动化极客版规则创建指南。当用户想要创建智能场景、设备联动、定时任务、条件触发等自动化规则时使用此skill。
metadata:
  author: oh-my-sage
  version: "3.0"
---

# 米家自动化规则创建

## 规则结构

```json
{
  "id": "graph_时间戳",
  "nodes": [节点1, 节点2, ...],
  "cfg": {
    "id": "graph_时间戳",
    "enable": true,
    "uiType": "graph",
    "userData": {
      "name": "规则名称",
      "lastUpdateTime": 1710000000000,
      "transform": {"x": 0, "y": 0, "scale": 1, "rotate": 0}
    }
  }
}
```

**节点位置自动布局**：create_graph 会根据节点连接关系自动计算位置，无需手动设置 `cfg.pos`。布局规则：
- 从左到右表示流程方向
- 分支节点上下排列
- 节点尺寸：528×164

## 关键校验规则

1. **节点 id**：只允许 `[0-9a-zA-Z]`，不能用下划线、连字符
2. **outputs 连接格式**：`"portName": ["nodeId.inputPort"]`（必须是点分隔，如 `"cond1.trigger"`）
   - ❌ 错误：`"output": ["range1"]`（缺少 `.inputPort`）
   - ✅ 正确：`"output": ["range1.trigger"]`
3. **deviceOutput**：即使无后续节点，必须有 `"output": []`
4. **deviceGet**：必须有 `outputs.output` 和 `outputs.output2`
5. **inputs 命名**：
   - `deviceGet`, `varGet`, `statusLast` 等用 `input`
   - `deviceOutput`, `delay`, `condition` 等用 `trigger`
   - `timeRange`, `alarmClock` 等**状态节点没有输入端口**（`inputs: {}`）
6. **dtype 映射**：`bool`→`boolean`，`uint8`/`int32`→`int`，`float`→`float`
7. **props 必须存在**：`"props": {}` 不能省略
8. **cfg.name**：值为节点类型名（如 `"deviceInput"`）

## 节点模板（直接复制使用）

### deviceInput - 设备触发（属性变化）
```json
{"id":"$ID","type":"deviceInput","cfg":{"urn":"$URN","name":"deviceInput","version":1,"pos":{"x":100,"y":100,"width":528,"height":164}},"props":{"did":"$DID","siid":$SIID,"piid":$PIID,"preload":false,"dtype":"$DTYPE","operator":"=","v1":$V1},"inputs":{},"outputs":{"output":["$NEXT.trigger"]}}
```

### deviceInput - 设备触发（事件）
```json
{"id":"$ID","type":"deviceInput","cfg":{"urn":"$URN","name":"deviceInput","version":1,"pos":{"x":100,"y":100,"width":528,"height":164}},"props":{"did":"$DID","siid":$SIID,"eiid":$EIID,"preload":false},"inputs":{},"outputs":{"output":["$NEXT.trigger"]}}
```

### deviceOutput - 控制设备（设置属性）
```json
{"id":"$ID","type":"deviceOutput","cfg":{"urn":"$URN","name":"deviceOutput","version":1,"pos":{"x":100,"y":100,"width":528,"height":164}},"props":{"did":"$DID","siid":$SIID,"piid":$PIID,"value":$VALUE},"inputs":{"trigger":null},"outputs":{"output":[]}}
```

### deviceOutput - 控制设备（执行动作）
```json
{"id":"$ID","type":"deviceOutput","cfg":{"urn":"$URN","name":"deviceOutput","version":1,"pos":{"x":100,"y":100,"width":528,"height":164}},"props":{"did":"$DID","siid":$SIID,"aiid":$AIID,"ins":[{"piid":$PIID,"value":$VALUE}]},"inputs":{"trigger":null},"outputs":{"output":[]}}
```

### deviceGet - 查询状态
```json
{"id":"$ID","type":"deviceGet","cfg":{"urn":"$URN","name":"deviceGet","version":1,"pos":{"x":100,"y":100,"width":528,"height":164}},"props":{"did":"$DID","siid":$SIID,"piid":$PIID,"dtype":"$DTYPE","operator":"=","v1":$V1},"inputs":{"input":null},"outputs":{"output":["$NEXT1.trigger"],"output2":["$NEXT2.trigger"]}}
```

### alarmClock - 定时触发
```json
{"id":"$ID","type":"alarmClock","cfg":{"name":"alarmClock","version":1,"happenType":"now","tempOffset":0,"pos":{"x":100,"y":100,"width":528,"height":164}},"props":{"type":"periodicAlarm","hour":$H,"minute":$M,"second":0,"filter":{"day":[0,1,2,3,4,5,6]}},"inputs":{},"outputs":{"output":["$NEXT.trigger"]}}
```

### timeRange - 时间段
```json
{"id":"$ID","type":"timeRange","cfg":{"name":"timeRange","version":1,"pos":{"x":100,"y":100,"width":528,"height":164}},"props":{"start":{"hour":$SH,"minute":$SM,"second":0},"end":{"hour":$EH,"minute":$EM,"second":0},"filter":{"day":[0,1,2,3,4,5,6]}},"inputs":{},"outputs":{"output":["$NEXT.trigger"]}}
```
⚠️ timeRange 的 `inputs` 必须是空 `{}`（不能有 trigger），`outputs` 只有 `output`（没有 output2）。它是状态节点，通过连接到 `condition.condition` 来判断时间段。

### delay - 延时
```json
{"id":"$ID","type":"delay","cfg":{"name":"delay","version":1,"unit":"s","value":$SEC,"pos":{"x":100,"y":100,"width":528,"height":164}},"props":{"timeout":$MS},"inputs":{"trigger":null},"outputs":{"output":["$NEXT.trigger"]}}
```

### condition - 条件判断
```json
{"id":"$ID","type":"condition","cfg":{"name":"condition","version":1,"pos":{"x":100,"y":100,"width":528,"height":164}},"props":{},"inputs":{"trigger":null,"condition":null},"outputs":{"met":["$NEXT1.trigger"],"unmet":["$NEXT2.trigger"]}}
```

### signalOr - 任一事件
```json
{"id":"$ID","type":"signalOr","cfg":{"name":"signalOr","version":1,"pos":{"x":100,"y":100,"width":528,"height":164}},"props":{},"inputs":{"input0":null,"input1":null},"outputs":{"output":["$NEXT.trigger"]}}
```

## 操作符与 dtype

| dtype | 允许的 operator | v1 值类型 |
|-------|----------------|----------|
| boolean | `=` | true/false |
| int | `>=`, `<=`, `=`, `!=`, `>`, `<`, `between`, `include` | 整数 |
| float | `>`, `<`, `between` | 数字 |
| string | `=` | 字符串 |

## 设备控制常见模式

- 开关灯：`siid=2, piid=1, value=true/false`
- 亮度：`siid=2, piid=2, value=1-100`
- 窗帘开合：`siid=2, piid=1, value=0-100`

## timeRange 正确用法

timeRange 是**状态节点**，不能被触发，只能作为 condition 的条件：

```
❌ 错误：query.output2 → range1.trigger（timeRange 没有 trigger）
❌ 错误：range1.output2（timeRange 只有 output，没有 output2）

✅ 正确模式：
deviceInput → condition1（判断触发条件）
                ├─ met → condition2（判断时间段）
                │         ├─ met → action1（时间段内）
                │         └─ unmet → action2（时间段外）
                └─ unmet → action3（不触发）

连接：
- timeRange.output → condition2.condition
- deviceInput.output → condition1.trigger
- condition1.met → condition2.trigger
```

## 详细参考

- [完整节点定义与校验规则](references/mijia-complete-reference.md)
