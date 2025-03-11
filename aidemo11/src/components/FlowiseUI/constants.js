// Default nodes
export const DEFAULT_NODES = [
    {
      id: 'serp-api',
      type: 'SerpAPI',
      title: 'Serp API',
      position: { x: 380, y: 80 },
      icon: { bgColor: 'bg-indigo-500', text: 'S' }
    },
    {
      id: 'openai',
      type: 'OpenAI',
      title: 'OpenAI',
      position: { x: 380, y: 380 },
      icon: { bgColor: 'bg-slate-800', text: 'O' }
    },
    {
      id: 'calculator',
      type: 'Calculator',
      title: 'Calculator',
      position: { x: 700, y: 120 },
      icon: { bgColor: 'bg-gray-700', text: '=' }
    },
    {
      id: 'mrlk-agent',
      type: 'AgentExecutor',
      title: 'MRLK Agent for LLMs',
      position: { x: 700, y: 300 },
      icon: { bgColor: 'bg-gray-700', text: 'M' }
    }
  ];
  
  // Default connections
  export const DEFAULT_CONNECTIONS = [
    { id: 'conn1', from: { nodeId: 'serp-api', portId: 'output' }, to: { nodeId: 'mrlk-agent', portId: 'input' } },
    { id: 'conn2', from: { nodeId: 'calculator', portId: 'output' }, to: { nodeId: 'mrlk-agent', portId: 'input' } },
    { id: 'conn3', from: { nodeId: 'openai', portId: 'output' }, to: { nodeId: 'mrlk-agent', portId: 'input' } }
  ];
  
  // Node types
  export const NODE_TYPES = {
    SERP_API: 'SerpAPI',
    OPENAI: 'OpenAI',
    CALCULATOR: 'Calculator',
    AGENT: 'AgentExecutor',
    GENERIC: 'GenericNode'
  };
  