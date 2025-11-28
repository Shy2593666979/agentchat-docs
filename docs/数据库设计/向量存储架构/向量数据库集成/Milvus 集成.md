# Milvus 集成

## 目录
1. [Milvus集成概述](#milvus集成概述)
2. [MilvusDB类实现](#milvusdb类实现)
3. [与ChromaDB的差异](#与chromadb的差异)
4. [集合创建与索引配置](#集合创建与索引配置)
5. [相似度度量类型](#相似度度量类型)
6. [元数据存储机制](#元数据存储机制)
7. [配置启用方式](#配置启用方式)
8. [核心功能方法](#核心功能方法)

## Milvus集成概述

Milvus向量数据库集成是本项目中用于向量存储和检索的关键组件。通过`MilvusDB`类实现了`VectorStoreBase`抽象基类，提供了完整的向量数据库操作功能。该集成支持Milvus独立部署模式和轻量级模式，通过配置文件中的mode参数进行切换。

**Section sources**
- [milvus.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/milvus.py#L1-L262)
- [config.yaml](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/config.yaml#L93-L98)

## MilvusDB类实现

`MilvusDB`类是`VectorStoreBase`的具体实现，封装了Milvus客户端的所有操作。该类在初始化时需要提供完整的连接URL、Token和数据库名，确保与Milvus/Zilliz服务器的安全连接。

```mermaid
classDiagram
class VectorStoreBase {
<<abstract>>
+create_col(name, vector_size, distance)
+insert(vectors, payloads, ids)
+search(query, vectors, limit, filters)
+delete(vector_id)
+update(vector_id, vector, payload)
+get(vector_id)
+list_cols()
+delete_col()
+col_info()
+list(filters, limit)
+reset()
}
class MilvusDB {
-collection_name : str
-embedding_model_dims : int
-metric_type : MetricType
-client : MilvusClient
+__init__(url, token, collection_name, embedding_model_dims, metric_type, db_name)
+create_col(collection_name, vector_size, metric_type)
+insert(ids, vectors, payloads, **kwargs)
+search(query, vectors, limit, filters)
+delete(vector_id)
+update(vector_id, vector, payload)
+get(vector_id)
+list_cols()
+delete_col()
+col_info()
+list(filters, limit)
+reset()
}
class MetricType {
L2
IP
COSINE
HAMMING
JACCARD
}
class OutputData {
id : Optional[str]
score : Optional[float]
payload : Optional[Dict]
}
MilvusDB --> VectorStoreBase : "继承"
MilvusDB --> MilvusClient : "使用"
MilvusDB --> MetricType : "使用"
MilvusDB --> OutputData : "返回"
```

**Diagram sources**
- [milvus.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/milvus.py#L39-L262)
- [base.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/base.py#L4-L58)

**Section sources**
- [milvus.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/milvus.py#L39-L262)
- [base.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/base.py#L4-L58)

## 与ChromaDB的差异

Milvus与ChromaDB在初始化和连接方式上存在显著差异。Milvus需要在初始化时提供完整的连接URL、Token和数据库名，而ChromaDB则支持多种连接方式。

```mermaid
flowchart TD
subgraph MilvusDB
A["初始化参数:
- url (完整URL)
- token (API密钥)
- db_name (数据库名)
- collection_name
- embedding_model_dims
- metric_type"]
end
subgraph ChromaDB
B["初始化参数:
- client (可选)
- host (可选)
- port (可选)
- path (可选)
- collection_name"]
end
A --> C["连接到远程Milvus/Zilliz服务器"]
B --> D["连接到本地或远程ChromaDB"]
C --> E["需要网络访问和认证"]
D --> F["支持本地文件存储"]
style A fill:#f9f,stroke:#333
style B fill:#bbf,stroke:#333
```

**Diagram sources**
- [milvus.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/milvus.py#L40-L48)
- [chroma.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/chroma.py#L24-L31)

**Section sources**
- [milvus.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/milvus.py#L40-L48)
- [chroma.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/chroma.py#L24-L31)

## 集合创建与索引配置

Milvus的集合创建过程包含AUTOINDEX索引配置，这是其核心特性之一。当创建新集合时，系统会自动配置最优的索引策略。

```mermaid
sequenceDiagram
participant User as "用户/应用"
participant MilvusDB as "MilvusDB类"
participant MilvusClient as "MilvusClient"
User->>MilvusDB : 初始化(MilvusDB)
MilvusDB->>MilvusDB : 设置参数(url, token, db_name等)
MilvusDB->>MilvusClient : 创建MilvusClient实例
MilvusClient-->>MilvusDB : 返回客户端
MilvusDB->>MilvusDB : 调用create_col()
MilvusDB->>MilvusDB : 检查集合是否存在
alt 集合不存在
MilvusDB->>MilvusDB : 定义字段模式
MilvusDB->>MilvusDB : 创建CollectionSchema
MilvusDB->>MilvusClient : 准备AUTOINDEX参数
MilvusClient-->>MilvusDB : 返回索引参数
MilvusDB->>MilvusClient : 创建集合
MilvusClient-->>MilvusDB : 集合创建成功
else 集合已存在
MilvusDB-->>MilvusDB : 跳过创建，记录日志
end
MilvusDB-->>User : 初始化完成
```

**Diagram sources**
- [milvus.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/milvus.py#L69-L98)
- [milvus.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/milvus.py#L62-L67)

**Section sources**
- [milvus.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/milvus.py#L69-L98)

## 相似度度量类型

Milvus支持多种相似度度量类型，通过`MetricType`枚举类定义。这些度量类型用于向量搜索时的相似性计算。

```mermaid
classDiagram
class MetricType {
<<enumeration>>
L2
IP
COSINE
HAMMING
JACCARD
}
class MilvusDB {
-metric_type : MetricType
+__init__(..., metric_type : MetricType, ...)
+create_col(..., metric_type : MetricType = MetricType.COSINE)
}
MilvusDB --> MetricType : "使用"
note right of MetricType
L2 : 欧几里得距离
IP : 内积相似度
COSINE : 余弦相似度
HAMMING : 汉明距离
JACCARD : 杰卡德距离
end note
```

**Diagram sources**
- [milvus.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/milvus.py#L25-L38)
- [milvus.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/milvus.py#L46-L47)

**Section sources**
- [milvus.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/milvus.py#L25-L38)

## 元数据存储机制

Milvus使用JSON字段存储元数据，提供了灵活的元数据管理能力。所有元数据都存储在名为"metadata"的JSON类型字段中。

```mermaid
erDiagram
COLLECTION {
VARCHAR id PK
FLOAT_VECTOR vectors
JSON metadata
}
METADATA {
string user_id
string agent_id
string run_id
string file_id
string knowledge_id
string update_time
string file_name
string chunk_id
string summary
}
COLLECTION ||--o{ METADATA : "包含"
note right of COLLECTION
集合结构:
- id: 主键，VARCHAR类型
- vectors: 向量数据，FLOAT_VECTOR
- metadata: 元数据，JSON类型
end note
note right of METADATA
支持的元数据字段:
- 用户相关: user_id
- 代理相关: agent_id, run_id
- 文件相关: file_id, file_name
- 知识库相关: knowledge_id
- 内容相关: chunk_id, summary
end note
```

**Diagram sources**
- [milvus.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/milvus.py#L87-L90)
- [milvus.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/milvus.py#L111-L127)

**Section sources**
- [milvus.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/milvus.py#L87-L90)

## 配置启用方式

通过`config.yaml`文件中的`vector_db`配置，可以使用`mode: 'standalone'`或`'lite'`来启用Milvus。系统根据配置模式自动选择相应的客户端实现。

```mermaid
flowchart TD
A["读取config.yaml配置"] --> B{mode值判断}
B --> |mode == 'chroma'| C["使用ChromaClient"]
B --> |mode == 'lite'| D["使用MilvusLiteClient"]
B --> |其他值| E["使用MilvusClient"]
C --> F["连接到ChromaDB"]
D --> G["连接到轻量级Milvus"]
E --> H["连接到独立Milvus"]
style C fill:#f96,stroke:#333
style D fill:#6f9,stroke:#333
style E fill:#69f,stroke:#333
note right of B
配置路径:
rag.vector_db.mode
end note
note right of C
适用场景:
- 本地开发
- 轻量级应用
end note
note right of D
适用场景:
- 移动端
- 边缘计算
end note
note right of E
适用场景:
- 生产环境
- 高性能需求
end note
```

**Diagram sources**
- [config.yaml](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/config.yaml#L94-L97)
- [__init__.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/rag/vector_db/__init__.py#L7-L12)

**Section sources**
- [config.yaml](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/config.yaml#L94-L97)
- [__init__.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/rag/vector_db/__init__.py#L7-L12)

## 核心功能方法

MilvusDB类实现了VectorStoreBase定义的所有核心方法，提供了完整的向量数据库操作功能。

```mermaid
flowchart LR
A["核心功能方法"] --> B["插入操作 insert()"]
A --> C["搜索操作 search()"]
A --> D["删除操作 delete()"]
A --> E["更新操作 update()"]
A --> F["查询操作 get()"]
A --> G["列表操作 list()"]
A --> H["重置操作 reset()"]
B --> I["将向量和元数据插入集合"]
C --> J["基于向量相似度搜索"]
D --> K["根据ID删除向量"]
E --> L["更新向量和元数据"]
F --> M["根据ID获取向量"]
G --> N["列出所有向量"]
H --> O["重置索引"]
style B fill:#f9f,stroke:#333
style C fill:#9f9,stroke:#333
style D fill:#99f,stroke:#333
style E fill:#ff9,stroke:#333
style F fill:#f99,stroke:#333
style G fill:#9ff,stroke:#333
style H fill:#ff9,stroke:#333
```

**Diagram sources**
- [milvus.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/milvus.py#L99-L261)

**Section sources**
- [milvus.py](https://github.com/Shy2593666979/AgentChat/tree/main/src/backend/agentchat/services/memory/vector_stores/milvus.py#L99-L261)
