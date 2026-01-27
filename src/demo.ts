/**
 * Demo script showing multi-server orchestration in action
 */

import { MultiServerOrchestrator } from './index.js'

async function runDemo() {
  const orchestrator = new MultiServerOrchestrator()

  console.log('=' .repeat(70))
  console.log('MULTI-SERVER ORCHESTRATION DEMO')
  console.log('Powered by mcp-use + Claude Sonnet 4.5')
  console.log('=' .repeat(70))
  console.log()

  try {
    await orchestrator.initialize()

    // Run all demonstrations
    await orchestrator.listAvailableTools()
    await orchestrator.analyzeProject()
    await orchestrator.demonstrateMemoryOperations()
    await orchestrator.demonstrateFileOperations()

    console.log('\n\n')
    console.log('=' .repeat(70))
    console.log('✅ DEMO COMPLETE')
    console.log('=' .repeat(70))

  } catch (error) {
    console.error('Demo error:', error)
  } finally {
    await orchestrator.cleanup()
  }
}

runDemo().catch(console.error)
