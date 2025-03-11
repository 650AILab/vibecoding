import React, { useRef, useEffect, forwardRef } from 'react';
import Connection from './Connection';
import Toolbar from './Toolbar';
import SerpAPINode from './NodeTypes/SerpAPINode';
import OpenAINode from './NodeTypes/OpenAINode';
import CalculatorNode from './NodeTypes/CalculatorNode';
import MRLKAgentNode from './NodeTypes/MRLKAgentNode';
import GenericNode from './NodeTypes/GenericNode';

const Canvas = forwardRef(({ 
  nodes, 
  connections, 
  activeDrag, 
  onMouseMove, 
  onMouseUp, 
  onNodePositionChange,
  onStartConnection,
  onDeleteNode,
  onDeleteConnection
}, ref) => {
  const canvasRef = useRef(null);
  
  // Forward the ref to parent component
  useEffect(() => {
    if (canvasRef.current && ref) {
      if (typeof ref === 'function') {
        ref(canvasRef.current);
      } else {
        ref.current = canvasRef.current;
      }
    }
  }, [ref]);
  
  // Handle canvas mouse events
  const handleCanvasMouseMove = (e) => {
    onMouseMove && onMouseMove(e);
  };
  
  const handleCanvasMouseUp = (e) => {
    console.log('Canvas mouse up event');
    onMouseUp && onMouseUp(e);
  };
  
  // Handle clicking on the canvas background to dismiss any open panels
  const handleCanvasClick = (e) => {
    // Only handle clicks on the canvas itself, not on nodes or connections
    if (e.target === e.currentTarget || e.target.classList.contains('canvas-background')) {
      // This click will bubble up to close any open panels
    }
  };
  
  // Render the appropriate node component based on node type
  const renderNode = (node) => {
    const commonProps = {
      key: node.id,
      id: node.id,
      type: node.type,
      title: node.title,
      icon: node.icon,
      position: node.position,
      onPositionChange: onNodePositionChange,
      onConnect: onStartConnection,
      onDelete: onDeleteNode
    };
    
    switch(node.id) {
      case 'serp-api':
        return <SerpAPINode {...commonProps} />;
      case 'openai':
        return <OpenAINode {...commonProps} />;
      case 'calculator':
        return <CalculatorNode {...commonProps} />;
      case 'mrlk-agent':
        return <MRLKAgentNode {...commonProps} />;
      default:
        return <GenericNode {...commonProps} />;
    }
  };
  
  // Render temporary connection when dragging
  const renderActiveDrag = () => {
    if (!activeDrag || !activeDrag.source || !activeDrag.currentPosition) return null;
    
    const sourceNode = nodes.find(n => n.id === activeDrag.source.nodeId);
    if (!sourceNode) return null;
    
    let tempConnection;
    
    // Determine the correct orientation based on which port type initiated the drag
    if (activeDrag.source.portId === 'output') {
      tempConnection = {
        from: { nodeId: activeDrag.source.nodeId, portId: 'output' },
        to: { nodeId: 'temp', portId: 'input' }
      };
    } else {
      tempConnection = {
        from: { nodeId: 'temp', portId: 'output' },
        to: { nodeId: activeDrag.source.nodeId, portId: 'input' }
      };
    }
    
    // Create a temporary node at cursor position
    const tempNode = {
      id: 'temp',
      position: { 
        x: activeDrag.currentPosition.x, 
        y: activeDrag.currentPosition.y 
      }
    };
    
    return (
      <Connection 
        connection={tempConnection} 
        nodes={[...nodes, tempNode]} 
        isActive={true} 
      />
    );
  };
  
  return (
    <div 
      ref={canvasRef}
      className="relative w-full h-full bg-gray-50 overflow-auto p-4"
      onMouseMove={handleCanvasMouseMove}
      onMouseUp={handleCanvasMouseUp}
      onClick={handleCanvasClick}
      id="flow-canvas"
    >
      {/* Canvas with dotted background */}
      <div className="canvas-background w-full h-full bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=')] relative">
        
        {/* Connection SVG layer - Place it before nodes to ensure connections are behind nodes */}
        <svg className="absolute inset-0" width="100%" height="100%" style={{ pointerEvents: 'auto' }}>
          {connections.map(connection => (
            <Connection 
              key={connection.id} 
              connection={connection} 
              nodes={nodes}
              onDelete={onDeleteConnection}
            />
          ))}
          
          {/* Render active drag connection */}
          {renderActiveDrag()}
        </svg>
        
        {/* Render all nodes */}
        {nodes.map(renderNode)}
        
        {/* Bottom toolbar */}
        <Toolbar />
      </div>
    </div>
  );
});

export default Canvas;