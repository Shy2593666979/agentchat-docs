---
layout: home

hero:
  name: "AgentChat"
  text: "智能对话系统"
  tagline: "基于大语言模型的现代化AI对话平台，支持多Agent协作、知识库检索、工具调用等高级功能"
  image:
    src: /logo.png
    alt: AgentChat Logo
  actions:
    - theme: brand
      text: 快速开始
      link: /快速入门
    - theme: alt
      text: 系统概述
      link: /系统概述
    - theme: alt
      text: GitHub
      link: https://github.com/Shy2593666979/AgentChat

features:
  - icon: 🤖
    title: 多Agent协作
    details: 支持多个智能体协同工作，智能分解复杂任务，实现高效的任务自动化和工作流编排
    link: /核心功能模块/多Agent系统

  - icon: 🧠
    title: 知识库系统
    details: 集成RAG技术，支持多格式文档解析，提供精准的知识检索和智能问答能力
    link: /核心功能模块/知识库系统

  - icon: 🔧
    title: 工具生态
    details: 丰富的内置工具和MCP协议支持，轻松扩展AI能力，构建强大的工具生态系统
    link: /核心功能模块/工具生态系统

  - icon: 🚀
    title: 高性能架构
    details: 基于FastAPI和Vue3的现代化架构，支持异步处理、实时通信和高并发访问
    link: /技术栈

  - icon: 🔒
    title: 安全可靠
    details: 完善的安全机制，包括身份认证、权限控制、数据加密和沙箱执行环境
    link: /安全考虑/安全考虑

  - icon: 📚
    title: 完整文档
    details: 详尽的技术文档、API参考和开发指南，助力快速上手和深度定制
    link: /开发指南/开发指南
---

## 🌟 核心特性

### 🎯 智能对话引擎
- **多模型支持**: 集成OpenAI、DeepSeek、通义千问等主流大语言模型
- **流式响应**: 实时显示生成内容，提供流畅的对话体验
- **上下文记忆**: 支持长对话历史，智能理解对话上下文
- **思考可视化**: 深度思考面板，展示AI推理过程

### 🔄 多Agent系统
- **智能协作**: 多个Agent协同工作，分工明确
- **任务编排**: 可视化工作流设计和执行
- **能力配置**: 灵活的Agent能力定义和管理
- **执行监控**: 实时监控Agent执行状态和结果

### 📖 知识库与RAG
- **多格式支持**: PDF、Word、Excel、Markdown等文档格式
- **智能分块**: 语义级别的文档分割和处理
- **混合检索**: 结合向量检索和关键词检索
- **精准问答**: 基于检索增强生成的准确回答

### 🛠️ MCP协议集成
- **标准化接口**: 支持Model Context Protocol服务器
- **插件生态**: 丰富的第三方工具和服务集成
- **自定义扩展**: 轻松开发和集成自定义工具
- **并发调用**: 支持多工具并发执行

## 🏗️ 技术架构

```mermaid
graph TB
    subgraph "前端层"
        A[Vue3 + TypeScript] --> B[Element Plus UI]
        B --> C[Pinia 状态管理]
    end
    
    subgraph "后端层"
        D[FastAPI] --> E[LangChain]
        E --> F[Agent系统]
        F --> G[工具管理]
    end
    
    subgraph "数据层"
        H[MySQL] --> I[Redis缓存]
        I --> J[向量数据库]
        J --> K[Elasticsearch]
    end
    
    subgraph "AI服务"
        L[OpenAI] --> M[DeepSeek]
        M --> N[通义千问]
        N --> O[嵌入模型]
    end
    
    A --> D
    G --> H
    F --> L
```

## 🚀 快速开始

### Docker 一键部署

```bash
# 克隆项目
git clone https://github.com/Shy2593666979/AgentChat.git
cd AgentChat

# 配置环境变量
cp docker/docker.env.example docker/docker.env
# 编辑 docker.env 文件，填入你的API密钥

# 启动服务
cd docker
docker-compose up -d
```

### 本地开发部署

```bash
# 后端服务
cd src/backend
pip install -r requirements.txt
uvicorn agentchat.main:app --port 7860

# 前端服务
cd src/frontend
npm install
npm run dev
```

访问 `http://localhost:8090` 开始使用！

## 📊 应用场景

| 场景 | 描述 | 核心功能 |
|------|------|----------|
| **企业智能客服** | 基于知识库的智能客服系统 | RAG问答、多轮对话、工具调用 |
| **文档助手** | 智能文档分析和问答 | 文档解析、语义检索、内容生成 |
| **代码助手** | 编程辅助和代码生成 | 代码理解、调试建议、文档生成 |
| **教育培训** | 智能答疑和学习辅导 | 知识问答、学习路径、个性化推荐 |
| **创意设计** | 内容创作和设计辅助 | 文本生成、创意建议、多模态交互 |

## 🤝 参与贡献

我们欢迎所有形式的贡献！无论是：

- 🐛 报告Bug
- 💡 提出新功能建议  
- 📝 改进文档
- 🔧 提交代码

请查看我们的 [贡献指南](https://github.com/Shy2593666979/AgentChat/blob/main/CONTRIBUTING.md) 了解详细信息。

## 📄 许可证

本项目基于 [MIT 许可证](https://github.com/Shy2593666979/AgentChat/blob/main/LICENSE) 开源。

---

<div style="text-align: center; margin-top: 2rem; padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white;">
  <h3 style="margin: 0 0 1rem 0; color: white;">🎉 开始你的AI之旅</h3>
  <p style="margin: 0; opacity: 0.9;">加入AgentChat社区，探索AI对话系统的无限可能</p>
</div>