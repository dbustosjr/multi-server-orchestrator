/**
 * Simple test of multi-server orchestration
 */

import { MultiServerOrchestrator } from './index.js'

async function test() {
  console.log('🧪 Simple Multi-Server Test\n')

  const orchestrator = new MultiServerOrchestrator()

  try {
    await orchestrator.initialize()

    console.log('\n📚 Running quick tests...\n')
    await orchestrator.listAvailableTools()
    await orchestrator.analyzeProject()

    console.log('\n✅ Test complete!')
  } catch (error) {
    console.error('❌ Test failed:', error)
  } finally {
    await orchestrator.cleanup()
  }
}

test()
