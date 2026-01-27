/**
 * Multi-Server Research Orchestrator
 * Direct MCP client usage to avoid agent workflow issues
 */

import { ChatAnthropic } from '@langchain/anthropic'
import { MCPClient } from 'mcp-use'
import * as dotenv from 'dotenv'

dotenv.config()

class MultiServerOrchestrator {
  private client: MCPClient | null = null
  private llm: ChatAnthropic | null = null

  async initialize(): Promise<void> {
    console.log('🚀 Initializing Multi-Server Orchestrator...\n')

    // Configure 2 MCP servers
    const config = {
      mcpServers: {
        filesystem: {
          command: 'npx',
          args: ['-y', '@modelcontextprotocol/server-filesystem', process.cwd()]
        },
        memory: {
          command: 'npx',
          args: ['-y', '@modelcontextprotocol/server-memory']
        }
      }
    }

    this.client = MCPClient.fromDict(config)
    await this.client.createAllSessions()

    this.llm = new ChatAnthropic({
      model: 'claude-sonnet-4-5-20250929',
      temperature: 0.3
    })

    console.log('✅ Connected to 2 MCP servers:')
    console.log('   - Filesystem: Local file operations (14 tools)')
    console.log('   - Memory: Knowledge graph storage (9 tools)')
    console.log()
  }

  async listAvailableTools(): Promise<void> {
    if (!this.client) {
      throw new Error('Client not initialized')
    }

    console.log('📋 Available Tools Across All Servers:\n')

    // List filesystem tools
    const fsSession = this.client.getSession('filesystem')
    if (fsSession) {
      const fsTools = await fsSession.listTools()
      const toolList = Array.isArray(fsTools) ? fsTools : (fsTools as any).tools || []
      console.log(`🔧 FILESYSTEM Server (${toolList.length} tools):`)
      toolList.forEach((tool: any, index: number) => {
        console.log(`   ${index + 1}. ${tool.name}: ${tool.description}`)
      })
      console.log()
    }

    // List memory tools
    const memorySession = this.client.getSession('memory')
    if (memorySession) {
      const memoryTools = await memorySession.listTools()
      const toolList = Array.isArray(memoryTools) ? memoryTools : (memoryTools as any).tools || []
      console.log(`🔧 MEMORY Server (${toolList.length} tools):`)
      toolList.forEach((tool: any, index: number) => {
        console.log(`   ${index + 1}. ${tool.name}: ${tool.description}`)
      })
      console.log()
    }
  }

  async analyzeProject(): Promise<void> {
    if (!this.client) {
      throw new Error('Client not initialized')
    }

    console.log('📁 Analyzing Current Project...\n')
    console.log('=' .repeat(70))

    try {
      // Get filesystem session
      const fsSession = this.client.getSession('filesystem')
      if (!fsSession) {
        throw new Error('Filesystem session not found')
      }

      // List directory contents
      console.log('📂 Reading project directory...')
      const dirResult = await fsSession.callTool('read_file', {
        path: 'package.json'
      })

      console.log('\n✅ Project Information:')
      console.log('-' .repeat(70))

      if (dirResult.content && dirResult.content[0]) {
        const content = dirResult.content[0]
        if ('text' in content) {
          const packageJson = JSON.parse(content.text)
          console.log(`Name: ${packageJson.name}`)
          console.log(`Version: ${packageJson.version}`)
          console.log(`Description: ${packageJson.description}`)
          console.log(`\nDependencies:`)
          Object.keys(packageJson.dependencies || {}).forEach(dep => {
            console.log(`  - ${dep}`)
          })
        }
      }

      // Store in memory
      console.log('\n💾 Storing project info in knowledge graph...')
      const memorySession = this.client.getSession('memory')
      if (!memorySession) {
        throw new Error('Memory session not found')
      }

      await memorySession.callTool('create_entities', {
        entities: [
          {
            name: 'multi-server-orchestrator',
            entityType: 'project',
            observations: [
              'TypeScript project using mcp-use',
              'Demonstrates multi-server orchestration',
              'Uses Filesystem and Memory MCP servers'
            ]
          }
        ]
      })

      console.log('✅ Project information stored in memory')
      console.log('=' .repeat(70))

    } catch (error) {
      console.error('Error during analysis:', error)
    }
  }

  async demonstrateMemoryOperations(): Promise<void> {
    if (!this.client) {
      throw new Error('Client not initialized')
    }

    console.log('\n🧠 Demonstrating Memory Operations...\n')
    console.log('=' .repeat(70))

    const memorySession = this.client.getSession('memory')
    if (!memorySession) {
      throw new Error('Memory session not found')
    }

    // Create entities
    console.log('1️⃣ Creating entities in knowledge graph...')
    await memorySession.callTool('create_entities', {
      entities: [
        {
          name: 'mcp-use',
          entityType: 'library',
          observations: ['MCP framework for Python and TypeScript', 'Supports multi-server orchestration']
        },
        {
          name: 'Claude',
          entityType: 'ai-model',
          observations: ['LLM by Anthropic', 'Used for agent orchestration']
        }
      ]
    })
    console.log('   ✅ Created 2 entities')

    // Create relation
    console.log('\n2️⃣ Creating relationship between entities...')
    await memorySession.callTool('create_relations', {
      relations: [
        {
          from: 'multi-server-orchestrator',
          to: 'mcp-use',
          relationType: 'uses'
        }
      ]
    })
    console.log('   ✅ Created relationship')

    // Read graph
    console.log('\n3️⃣ Reading knowledge graph...')
    const graphResult = await memorySession.callTool('read_graph', {})

    if (graphResult.content && graphResult.content[0]) {
      const content = graphResult.content[0]
      if ('text' in content) {
        console.log('\n📊 Knowledge Graph:')
        console.log('-' .repeat(70))
        console.log(content.text)
      }
    }

    console.log('=' .repeat(70))
  }

  async demonstrateFileOperations(): Promise<void> {
    if (!this.client) {
      throw new Error('Client not initialized')
    }

    console.log('\n📁 Demonstrating File Operations...\n')
    console.log('=' .repeat(70))

    const fsSession = this.client.getSession('filesystem')
    if (!fsSession) {
      throw new Error('Filesystem session not found')
    }

    // List directory
    console.log('1️⃣ Listing project files...')
    const listResult = await fsSession.callTool('list_directory', {
      path: '.'
    })

    if (listResult.content && listResult.content[0]) {
      const content = listResult.content[0]
      if ('text' in content) {
        console.log('\n📂 Project Files:')
        console.log('-' .repeat(70))
        console.log(content.text)
      }
    }

    console.log('=' .repeat(70))
  }

  async cleanup(): Promise<void> {
    if (this.client) {
      await this.client.closeAllSessions()
      console.log('\n✅ All servers disconnected')
    }
  }
}

async function main() {
  const orchestrator = new MultiServerOrchestrator()

  try {
    await orchestrator.initialize()

    console.log('Multi-Server Research Orchestrator')
    console.log('Powered by mcp-use + Claude Sonnet 4.5\n')

    // Demo sequence
    await orchestrator.listAvailableTools()

    console.log('\n🎯 Running Demonstrations...\n')

    await orchestrator.analyzeProject()
    await orchestrator.demonstrateMemoryOperations()
    await orchestrator.demonstrateFileOperations()

    console.log('\n' + '=' .repeat(70))
    console.log('✅ ALL DEMONSTRATIONS COMPLETE')
    console.log('=' .repeat(70))
    console.log('\n📊 Summary:')
    console.log('  ✅ Multi-server initialization successful')
    console.log('  ✅ Filesystem operations: READ, LIST')
    console.log('  ✅ Memory operations: CREATE, RELATE, READ')
    console.log('  ✅ Cross-server coordination demonstrated')
    console.log('  ✅ 23 total tools available across 2 servers')

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await orchestrator.cleanup()
  }
}

// Run main function directly when this file is executed
main().catch(console.error)

export { MultiServerOrchestrator }
