import React, { useState, useRef, useEffect } from 'react';
import { Trash2, Plus, Minus, Maximize2, Code, Save, ChevronLeft, X } from 'lucide-react';

// Node component for draggable widgets
const Node = ({ id, type, title, icon, position, onPositionChange, children, onConnect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState(position);
  const nodeRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.node-header')) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = pos.x + e.movementX;
      const newY = pos.y + e.movementY;
      setPos({ x: newX, y: newY });
      onPositionChange(id, { x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handlePortMouseDown = (e, portId) => {
    e.stopPropagation();
    onConnect && onConnect('start', { nodeId: id, portId: portId });
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, pos, id, onPositionChange]);

  return (
    <div
      ref={nodeRef}
      className="absolute bg-white rounded-lg border shadow-sm"
      style={{ 
        left: `${pos.x}px`, 
        top: `${pos.y}px`,
        width: '16rem',
        cursor: isDragging ? 'grabbing' : 'default',
        zIndex: isDragging ? 10 : 1
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center justify-between p-2 border-b node-header cursor-grab">
        <div className="flex items-center gap-2">
          <div className={`${icon.bgColor} w-6 h-6 rounded flex items-center justify-center text-white`}>
            <span className="text-xs">{icon.text}</span>
          </div>
          <span className="font-medium">{title}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Trash2 size={16} />
        </button>
      </div>
      <div className="p-3">
        {children}
      </div>
      <div className="flex justify-end p-2 border-t text-xs text-gray-600">
        <span>{type}</span>
      </div>
      
      {/* Output port */}
      <div 
        className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white cursor-pointer"
        onMouseDown={(e) => handlePortMouseDown(e, 'output')}
      />
      
      {/* Input port */}
      <div 
        className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-white cursor-pointer"
      />
    </div>
  );
};

const FlowiseUI = () => {
  const [isSaved, setSaved] = useState(true);
  const [nodes, setNodes] = useState([
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
  ]);
  
  const [connections, setConnections] = useState([
    { id: 'conn1', from: { nodeId: 'serp-api', portId: 'output' }, to: { nodeId: 'mrlk-agent', portId: 'input' } },
    { id: 'conn2', from: { nodeId: 'calculator', portId: 'output' }, to: { nodeId: 'mrlk-agent', portId: 'input' } },
    { id: 'conn3', from: { nodeId: 'openai', portId: 'output' }, to: { nodeId: 'mrlk-agent', portId: 'input' } }
  ]);
  
  const [activeDrag, setActiveDrag] = useState(null);
  const canvasRef = useRef(null);

  // Function to handle node position updates
  const handleNodePositionChange = (id, newPosition) => {
    setNodes(nodes.map(node => 
      node.id === id ? { ...node, position: newPosition } : node
    ));
  };

  // Function to initiate connection drawing
  const handleStartConnection = (type, endpoint) => {
    if (type === 'start') {
      setActiveDrag({ source: endpoint });
    }
  };

  // Function to handle mouse move during connection drawing
  const handleMouseMove = (e) => {
    if (!activeDrag || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setActiveDrag({
      ...activeDrag,
      currentPosition: { x, y }
    });
  };

  // Function to handle mouse up to complete connection
  const handleMouseUp = (e) => {
    if (!activeDrag || !canvasRef.current) {
      setActiveDrag(null);
      return;
    }

    // Find if we're over a node input port
    // In a real implementation, you'd check more precisely
    const targetNode = nodes.find(node => {
      const nodeX = node.position.x;
      const nodeY = node.position.y;
      const portX = nodeX; // Approximate input port x position
      const portY = nodeY + 50; // Approximate input port y position
      
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const distanceToPort = Math.sqrt(
        Math.pow(mouseX - portX, 2) + 
        Math.pow(mouseY - portY, 2)
      );
      
      return distanceToPort < 20; // If within 20px of port
    });

    if (targetNode && targetNode.id !== activeDrag.source.nodeId) {
      // Create new connection
      const newConnection = {
        id: `conn-${Date.now()}`,
        from: { nodeId: activeDrag.source.nodeId, portId: activeDrag.source.portId },
        to: { nodeId: targetNode.id, portId: 'input' }
      };
      
      setConnections([...connections, newConnection]);
    }
    
    setActiveDrag(null);
  };

  // Function to calculate bezier curve for connections
  const createPath = (from, to) => {
    // Find source and target node positions
    const sourceNode = nodes.find(node => node.id === from.nodeId);
    const targetNode = nodes.find(node => node.id === to.nodeId);
    
    if (!sourceNode || !targetNode) return '';
    
    // Calculate port positions
    const sourceX = sourceNode.position.x + 256; // Right side for output port
    const sourceY = sourceNode.position.y + 60; // Middle of node
    const targetX = targetNode.position.x; // Left side for input port
    const targetY = targetNode.position.y + 60; // Middle of node
    
    // Create bezier curve
    return `M ${sourceX},${sourceY} C ${sourceX + 100},${sourceY} ${targetX - 100},${targetY} ${targetX},${targetY}`;
  };

  // Function to add a new node
  const addNode = () => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: 'NewNode',
      title: 'New Node',
      position: { x: 400, y: 200 },
      icon: { bgColor: 'bg-blue-500', text: 'N' }
    };
    
    setNodes([...nodes, newNode]);
    setSaved(false);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="flex items-center px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <button className="p-1 text-gray-500 bg-gray-100 rounded-full">
            <ChevronLeft size={18} />
          </button>
          <div className="font-medium text-gray-700">wf1</div>
          <button className="p-1 text-gray-500 hover:text-gray-700">
            <Code size={16} />
          </button>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="p-1 text-gray-500 hover:text-gray-700">
            <Trash2 size={18} />
          </button>
          <button className="p-1 text-gray-500 hover:text-gray-700">
            <code>{`{}`}</code>
          </button>
        </div>
      </header>

      {/* Main content with canvas */}
      <div className="flex-grow relative overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-[1fr] bg-white">
          <div 
            ref={canvasRef}
            className="relative w-full h-full bg-gray-50 overflow-auto p-4"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            {/* Canvas with dotted background */}
            <div className="w-full h-full bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=')] relative">
              
              {/* Render Nodes */}
              {nodes.map(node => {
                switch(node.id) {
                  case 'serp-api':
                    return (
                      <Node 
                        key={node.id}
                        id={node.id}
                        type={node.type}
                        title={node.title}
                        icon={node.icon}
                        position={node.position}
                        onPositionChange={handleNodePositionChange}
                        onConnect={handleStartConnection}
                      >
                        <div className="text-xs text-center text-gray-500 mb-1">Inputs</div>
                        <div className="mb-3">
                          <label className="block text-xs text-gray-600 mb-1">Serp Api Key *</label>
                          <input
                            type="password"
                            className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                            value="••••••••••••••••••••••••••••••••••••••"
                            readOnly
                          />
                        </div>
                        <div className="text-xs text-center text-gray-500 mb-1">Output</div>
                      </Node>
                    );
                  case 'openai':
                    return (
                      <Node 
                        key={node.id}
                        id={node.id}
                        type={node.type}
                        title={node.title}
                        icon={node.icon}
                        position={node.position}
                        onPositionChange={handleNodePositionChange}
                        onConnect={handleStartConnection}
                      >
                        <div className="text-xs text-center text-gray-500 mb-1">Inputs</div>
                        <div className="mb-3">
                          <label className="block text-xs text-gray-600 mb-1">OpenAI Api Key *</label>
                          <input
                            type="password"
                            className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                            value="••••••••••••••••••••••••••••••••••••"
                            readOnly
                          />
                        </div>
                        <div className="mb-3">
                          <label className="block text-xs text-gray-600 mb-1">Model Name</label>
                          <div className="relative">
                            <select className="w-full rounded border border-gray-300 px-2 py-1 text-sm appearance-none">
                              <option>text-davinci-003</option>
                            </select>
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="block text-xs text-gray-600 mb-1">Temperature</label>
                          <input
                            type="number"
                            className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                            defaultValue="0"
                          />
                        </div>
                        <div className="text-xs text-center text-gray-500 mb-1">Output</div>
                      </Node>
                    );
                  case 'calculator':
                    return (
                      <Node 
                        key={node.id}
                        id={node.id}
                        type={node.type}
                        title={node.title}
                        icon={node.icon}
                        position={node.position}
                        onPositionChange={handleNodePositionChange}
                        onConnect={handleStartConnection}
                      >
                        <div className="text-xs text-center text-gray-500 mb-1">Output</div>
                      </Node>
                    );
                  case 'mrlk-agent':
                    return (
                      <Node 
                        key={node.id}
                        id={node.id}
                        type={node.type}
                        title={node.title}
                        icon={node.icon}
                        position={node.position}
                        onPositionChange={handleNodePositionChange}
                        onConnect={handleStartConnection}
                      >
                        <div className="text-xs text-center text-gray-500 mb-1">Inputs</div>
                        <div className="mb-3">
                          <label className="block text-xs text-gray-600 mb-1">Allowed Tools *</label>
                        </div>
                        <div className="mb-3">
                          <label className="block text-xs text-gray-600 mb-1">LLM Model *</label>
                        </div>
                        <div className="text-xs text-center text-gray-500 mb-1">Output</div>
                      </Node>
                    );
                  default:
                    return (
                      <Node 
                        key={node.id}
                        id={node.id}
                        type={node.type}
                        title={node.title}
                        icon={node.icon}
                        position={node.position}
                        onPositionChange={handleNodePositionChange}
                        onConnect={handleStartConnection}
                      >
                        <div className="text-xs text-center text-gray-500 mb-1">New Node Content</div>
                      </Node>
                    );
                }
              })}

              {/* Connection Lines */}
              <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
                {connections.map(connection => (
                  <g key={connection.id}>
                    <path
                      d={createPath(connection.from, connection.to)}
                      stroke="#ccc"
                      strokeWidth="1"
                      fill="none"
                    />
                    <circle 
                      cx={nodes.find(n => n.id === connection.to.nodeId)?.position.x} 
                      cy={nodes.find(n => n.id === connection.to.nodeId)?.position.y + 60} 
                      r="3" 
                      fill="#ccc" 
                    />
                  </g>
                ))}
                
                {/* Active connection line when dragging */}
                {activeDrag && activeDrag.currentPosition && (
                  <path
                    d={`M ${
                      nodes.find(n => n.id === activeDrag.source.nodeId).position.x + 256
                    },${
                      nodes.find(n => n.id === activeDrag.source.nodeId).position.y + 60
                    } C ${
                      nodes.find(n => n.id === activeDrag.source.nodeId).position.x + 356
                    },${
                      nodes.find(n => n.id === activeDrag.source.nodeId).position.y + 60
                    } ${
                      activeDrag.currentPosition.x - 100
                    },${
                      activeDrag.currentPosition.y
                    } ${
                      activeDrag.currentPosition.x
                    },${
                      activeDrag.currentPosition.y
                    }`}
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    fill="none"
                  />
                )}
              </svg>

              {/* Bottom toolbar */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white border rounded-md shadow-sm px-2">
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Plus size={16} />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Minus size={16} />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Maximize2 size={16} />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Code size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating action button */}
        <button 
          className="absolute left-4 bottom-4 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700"
          onClick={addNode}
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Notification */}
      {isSaved && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center bg-green-600 text-white px-4 py-2 rounded shadow-lg">
          <Save size={18} className="mr-2" />
          <span>Chatflow saved</span>
          <button onClick={() => setSaved(false)} className="ml-4 text-white hover:text-gray-200">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Page title */}
      <div className="absolute bottom-4 right-4 text-gray-500 text-sm">
        Flowise Drag & Drop UI
      </div>
    </div>
  );
};

export default FlowiseUI;