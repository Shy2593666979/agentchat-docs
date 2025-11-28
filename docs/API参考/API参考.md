# API参考

## 目录
1. [简介](#简介)
2. [API版本与基础URL](#api版本与基础url)
3. [认证机制](#认证机制)
4. [错误码体系](#错误码体系)
5. [用户管理](#用户管理)
6. [Agent操作](#agent操作)
7. [对话接口](#对话接口)
8. [知识库管理](#知识库管理)
9. [工具调用](#工具调用)
10. [文件上传](#文件上传)
11. [使用示例](#使用示例)
12. [兼容性与扩展](#兼容性与扩展)

## 简介
本API参考文档为AgentChat平台提供完整的RESTful API说明。所有API端点均基于FastAPI框架自动生成的OpenAPI规范，按功能模块组织，涵盖用户管理、Agent操作、对话交互、知识库管理、工具集成等核心功能。文档详细说明了每个端点的HTTP方法、请求路径、认证要求、请求体结构和响应格式。

**Section sources**
- [router.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/api/router.py)

## API版本与基础URL
所有API端点均以`/api/v1`为前缀，实现API版本控制。基础URL结构如下：
```
https://<your-domain>/api/v1/<endpoint>
```
当前版本为v1，未来扩展将通过新增版本前缀（如`/api/v2`）实现，确保向后兼容。

**Section sources**
- [router.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/api/router.py#L6)

## 认证机制
系统采用JWT（JSON Web Token）进行认证，通过`fastapi_jwt_auth`库实现。认证信息通过HTTP请求头传递。

### 获取令牌
通过`/api/v1/user/login`端点获取访问令牌和刷新令牌：
```json
POST /api/v1/user/login
Content-Type: application/json

{
  "user_name": "your_username",
  "user_password": "your_password"
}
```

### 请求头格式
所有需要认证的API请求必须包含以下请求头：
```
Authorization: Bearer <access_token>
```

### 令牌刷新
当访问令牌过期时，可使用刷新令牌获取新的访问令牌（具体刷新端点需参考完整OpenAPI规范）。

**Section sources**
- [user.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/api/v1/user.py#L51-L78)
- [JWT.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/api/JWT.py)

## 错误码体系
系统采用统一的响应模型，所有API响应均遵循`UnifiedResponseModel`结构。

### 统一响应模型
```python
class UnifiedResponseModel(BaseModel, Generic[DataT]):
    status_code: int
    status_message: str
    data: DataT = None
```

### 常见状态码
| 状态码 | 含义 | 说明 |
|--------|------|------|
| 200 | SUCCESS | 请求成功 |
| 500 | BAD REQUEST | 通用错误 |
| 401 | UNAUTHORIZED | 认证失败 |
| 403 | FORBIDDEN | 权限不足 |
| 404 | NOT FOUND | 资源不存在 |

特定错误如用户名重复、应用名称重复等，通过`status_message`字段提供详细信息。

**Section sources**
- [schemas.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/schema/schemas.py)
- [user.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/api/v1/user.py#L31)
- [agent.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/api/v1/agent.py#L22)

## 用户管理
提供用户注册、登录、信息查询和更新功能。

### 注册用户
```http
POST /api/v1/user/register
```
**请求体**:
```json
{
  "user_name": "string",
  "user_email": "string",
  "user_password": "string"
}
```
**验证规则**:
- 用户名长度不超过20字符
- 用户名不能重复

### 用户登录
```http
POST /api/v1/user/login
```
**请求体**:
```json
{
  "user_name": "string",
  "user_password": "string"
}
```
**成功响应**:
```json
{
  "status_code": 200,
  "status_message": "SUCCESS",
  "data": {
    "user_id": "string",
    "access_token": "string"
  }
}
```

### 获取用户信息
```http
GET /api/v1/user/info?user_id={user_id}
```

### 更新用户信息
```http
PUT /api/v1/user/update
```
**请求体**:
```json
{
  "user_id": "string",
  "user_avatar": "string",
  "user_description": "string"
}
```

**Section sources**
- [user.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/api/v1/user.py)

## Agent操作
管理AI助手（Agent）的创建、查询、更新和删除。

### 创建Agent
```http
POST /api/v1/agent
```
**请求头**:
```
Authorization: Bearer <access_token>
```
**请求体** (`CreateAgentRequest`):
```json
{
  "name": "Agent名称",
  "description": "Agent描述",
  "tool_ids": ["tool_id1", "tool_id2"],
  "llm_id": "llm_id",
  "mcp_ids": ["mcp_id1"],
  "knowledge_ids": ["knowledge_id1"],
  "enable_memory": true,
  "system_prompt": "系统提示词",
  "logo_url": "logo图片URL"
}
```

### 查询用户所有Agent
```http
GET /api/v1/agent
```
**请求头**:
```
Authorization: Bearer <access_token>
```

### 更新Agent
```http
PUT /api/v1/agent
```
**请求体** (`UpdateAgentRequest`):
```json
{
  "agent_id": "要更新的Agent ID",
  "name": "新名称",
  "description": "新描述",
  "tool_ids": ["new_tool_id"],
  "knowledge_ids": ["new_knowledge_id"],
  "system_prompt": "新系统提示词",
  "logo_url": "新logo URL"
}
```

### 删除Agent
```http
DELETE /api/v1/agent
```
**请求体**:
```json
{
  "agent_id": "要删除的Agent ID"
}
```

### 搜索Agent
```http
POST /api/v1/agent/search
```
**请求体**:
```json
{
  "name": "搜索关键词"
}
```

**Section sources**
- [agent.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/api/v1/agent.py)
- [schema/agent.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/schema/agent.py)

## 对话接口
与AI助手进行实时对话的核心接口，支持流式响应。

### 发起对话
```http
POST /api/v1/chat
```
**请求头**:
```
Authorization: Bearer <access_token>
Content-Type: application/json
```
**请求体** (`ConversationReq`):
```json
{
  "user_input": "用户的问题",
  "dialog_id": "对话ID",
  "file_url": "上传文件的OSS链接"
}
```
**响应类型**: `text/event-stream` (SSE流式响应)

**功能特点**:
- 支持流式输出，实时返回AI生成内容
- 自动处理历史对话记录
- 支持附件上传和内容整合
- 内置断开连接检测和资源清理

**Section sources**
- [chat.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/api/v1/chat.py)
- [schema/chat.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/schema/chat.py)

## 知识库管理
管理知识库的创建、查询、更新、删除和检索。

### 创建知识库
```http
POST /api/v1/knowledge/create
```
**请求体**:
```json
{
  "knowledge_name": "知识库名称",
  "knowledge_desc": "知识库描述"
}
```

### 查询知识库
```http
GET /api/v1/knowledge/select
```

### 更新知识库
```http
PUT /api/v1/knowledge/update
```
**请求体**:
```json
{
  "knowledge_id": "知识库ID",
  "knowledge_name": "新名称",
  "knowledge_desc": "新描述"
}
```

### 删除知识库
```http
DELETE /api/v1/knowledge/delete
```
**请求体**:
```json
{
  "knowledge_id": "要删除的知识库ID"
}
```

### 知识库检索
```http
POST /api/v1/knowledge/retrieval
```
**请求体**:
```json
{
  "query": "用户问题",
  "knowledge_id": "知识库ID或ID列表"
}
```

**Section sources**
- [knowledge.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/api/v1/knowledge.py)
- [schema/knowledge.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/schema/knowledge.py)

## 工具调用
管理工具的创建、查询和删除。

### 创建工具
```http
POST /api/v1/tool/create
```
**请求体**:
```json
{
  "zh_name": "工具中文名",
  "en_name": "工具英文名",
  "description": "工具描述",
  "logo_url": "logo URL"
}
```

### 查询工具
- `GET /api/v1/tool/all`: 获取所有工具
- `POST /api/v1/tool/own`: 获取用户个人工具
- `POST /api/v1/tool/visible`: 获取用户可见工具

### 更新工具
```http
PUT /api/v1/tool/update
```
**请求体**:
```json
{
  "tool_id": "工具ID",
  "zh_name": "新中文名",
  "en_name": "新英文名",
  "description": "新描述",
  "logo_url": "新logo URL"
}
```

### 删除工具
```http
DELETE /api/v1/tool/delete
```
**请求体**:
```json
{
  "tool_id": "要删除的工具ID"
}
```

**Section sources**
- [tool.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/api/v1/tool.py)
- [schema/tool.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/schema/tool.py)

## 文件上传
提供文件上传功能，支持常见格式。

### 上传文件
```http
POST /api/v1/upload
```
**请求头**:
```
Authorization: Bearer <access_token>
```
**请求体**: `multipart/form-data`
- `file`: 要上传的文件（支持PDF、DOCX、TXT、JPG等）

**响应**:
```json
{
  "status_code": 200,
  "status_message": "SUCCESS",
  "data": "文件的OSS签名URL"
}
```

上传后的文件URL可用于对话接口中的`file_url`参数。

**Section sources**
- [upload.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/api/v1/upload.py)

## 使用示例
### 创建Agent的curl命令
```bash
curl -X POST "http://localhost:8000/api/v1/agent" \
  -H "Authorization: Bearer your_access_token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "我的助手",
    "description": "一个智能助手",
    "tool_ids": [],
    "llm_id": "gpt-4",
    "knowledge_ids": [],
    "enable_memory": true,
    "system_prompt": "你是一个有用的助手",
    "logo_url": ""
  }'
```

### Python客户端调用示例
```python
import requests

# 登录获取令牌
login_response = requests.post(
    "http://localhost:8000/api/v1/user/login",
    json={"user_name": "test", "user_password": "test"}
)
access_token = login_response.json()["data"]["access_token"]

# 创建对话
headers = {"Authorization": f"Bearer {access_token}"}
chat_response = requests.post(
    "http://localhost:8000/api/v1/chat",
    headers=headers,
    json={
        "user_input": "你好",
        "dialog_id": "dialog-123"
    },
    stream=True
)

# 处理流式响应
for line in chat_response.iter_lines():
    if line:
        print(line.decode('utf-8'))
```

### 上传知识库文件
```bash
curl -X POST "http://localhost:8000/api/v1/upload" \
  -H "Authorization: Bearer your_access_token" \
  -F "file=@/path/to/document.pdf"
```

**Section sources**
- [user.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/api/v1/user.py#L51)
- [chat.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/api/v1/chat.py#L49)
- [upload.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/api/v1/upload.py#L12)

## 兼容性与扩展
### 版本控制
采用URL前缀`/api/v1`进行版本控制，确保API的稳定性和向后兼容性。未来功能扩展将通过新增版本实现，不会破坏现有客户端。

### 扩展考虑
- 所有API响应采用统一的`UnifiedResponseModel`，便于添加新字段而不破坏现有解析逻辑
- Schema定义清晰，支持字段的可选性和默认值，便于未来扩展
- 错误处理机制统一，通过`status_message`提供详细的错误信息

**Section sources**
- [router.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/api/router.py)
- [schemas.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/schema/schemas.py)
