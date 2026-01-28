# Multi-Server Research Orchestrator

AI agent that coordinates multiple MCP servers simultaneously using **mcp-use** and **Claude Sonnet 4.5**.

## 🎯 Purpose

Demonstrates advanced mcp-use capabilities for the **MCP Use Software Engineer** role:
- Multi-server orchestration with `useServerManager`
- TypeScript + Claude integration
- Complex agent workflows across different MCP servers
- Production-ready TypeScript architecture

## ✨ Features

- **2 MCP Servers**: Filesystem and Memory working together
- **Smart Server Selection**: `useServerManager` auto-routes requests
- **Research Tasks**: Combines local files + knowledge storage
- **Codebase Analysis**: Scans projects and stores insights
- **Knowledge Graph**: Stores findings in persistent memory

## 🚀 Installation
```bash
# Install dependencies
npm install

# Set up API key
echo "ANTHROPIC_API_KEY=your_key_here" > .env
```

## 💻 Usage

### Run Main Demo
```bash
npm start
```

### Run Full Demo
```bash
npm run demo
```

### Development Mode
```bash
npm run dev
```

## 🏗️ Architecture
```
User Query → MCPAgent → Server Manager → [Filesystem | Memory]
                              ↓
                        Claude Sonnet 4.5
                              ↓
                      Orchestrated Result
```

## 🔧 Tech Stack

- **mcp-use**: Multi-server MCP framework
- **Claude Sonnet 4.5**: AI orchestration
- **TypeScript**: Type-safe implementation
- **LangChain**: LLM integration

## 📊 Example Output
```
🚀 Initializing Multi-Server Orchestrator...

✅ Connected to 2 MCP servers:
   - Filesystem: Local file operations & search
   - Memory: Knowledge graph storage

📊 Researching: MCP protocol best practices
======================================================================

[Agent coordinates across servers automatically]
[Filesystem searches for local docs]
[Memory stores key findings in knowledge graph]

📋 Research Complete!
======================================================================
```

## 🎓 Key Learnings

- How `useServerManager` intelligently routes requests
- Coordinating multiple MCP servers in one workflow
- TypeScript best practices with mcp-use
- Building production-ready multi-server agents

## 📚 Citation

If you use this project or mcp-use in your research or work, please cite:

@software{mcp_use2025,
  author = {Zullo, Pietro and Contributors},
  title = {MCP-Use: Complete MCP Ecosystem for Python and TypeScript},
  year = {2025},
  publisher = {GitHub},
  url = {https://github.com/mcp-use/mcp-use}
}

## 🔗 Links

- [mcp-use GitHub](https://github.com/mcp-use/mcp-use)
- [Project 1: Terminal Safety Analyzer](https://github.com/dbustosjr/terminal-safety-analyzer)

## 📝 License

MIT
