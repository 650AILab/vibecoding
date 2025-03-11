import { useRef, useState, useCallback, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Header from '../ui/Header';
import Canvas from './Canvas';
import Notification from '../ui/Notification';
import ImportExportPanel from './ImportExportPanel';
import useNodeDrag from '../../hooks/useNodeDrag';
import useConnectionDrag from '../../hooks/useConnectionDrag';
import { DEFAULT_NODES, DEFAULT_CONNECTIONS } from './constants';
import { createNewNode, calculateNewNodePosition, areNodesInConnectingDistance } from '../../utils/flowUtils';

// Initialize global variables for connection handling
const initializeConnectionGlobals = () => {
  window.activeConnectionDrag = false;
  window.currentHoveredPort = null;
};

const FlowiseUI = () => {
  const [isSaved, setSaved] = useState(true);
  const [showImportExport, setShowImportExport] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const canvasRef = useRef(null);
  
  // Initialize with default nodes and connections
  const { 
    nodes, 
    setNodes, 
    updateNodePosition, 
    addNode, 
    deleteNode 
  } = useNodeDrag(DEFAULT_NODES);
  
  const {
    connections,
    setConnections,
    activeDrag,
    setActiveDrag,
    startConnection,
    completeConnection,
    removeNodeConnections
  } = useConnectionDrag(DEFAULT_CONNECTIONS);
  
  // Initialize global variables
  useEffect(() => {
    initializeConnectionGlobals();
  }, []);

  // Handle mouse movement for active drag
  const handleMouseMove = useCallback((e) => {
    if (!activeDrag || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set a global flag to indicate active dragging (helps with port highlighting)
    window.activeConnectionDrag = true;
    
    setActiveDrag({
      ...activeDrag,
      currentPosition: { x, y }
    });
    
    // Find elements under cursor for visual feedback
    const elementsUnderCursor = document.elementsFromPoint(e.clientX, e.clientY);
    const portElement = elementsUnderCursor.find(el => 
      el.hasAttribute('data-node-id') && 
      el.getAttribute('data-port-type') === (activeDrag.source.portId === 'output' ? 'input' : 'output')
    );
    
    // Update cursor to indicate valid connection possibility
    document.body.style.cursor = portElement ? 'pointer' : 'default';
  }, [activeDrag, setActiveDrag]);

  // Handle mouse up event to complete connection
  const handleMouseUp = useCallback((e) => {
    // Reset cursor
    document.body.style.cursor = 'default';
    window.activeConnectionDrag = false;
    
    if (!activeDrag || !activeDrag.source || !canvasRef.current) {
      setActiveDrag(null);
      return;
    }
    
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Check if we're over an appropriate port by finding elements under the cursor
    const elementsUnderCursor = document.elementsFromPoint(e.clientX, e.clientY);
    
    // Find a port element that is the opposite type of the source port
    // If dragging from output, look for input and vice versa
    const portElement = elementsUnderCursor.find(el => 
      el.hasAttribute('data-node-id') && 
      el.getAttribute('data-port-type') === (activeDrag.source.portId === 'output' ? 'input' : 'output')
    );
    
    if (portElement) {
      const targetNodeId = portElement.getAttribute('data-node-id');
      const targetPortType = portElement.getAttribute('data-port-type');
      const targetNode = nodes.find(node => node.id === targetNodeId);
      
      // Don't connect to self
      if (targetNode && targetNode.id !== activeDrag.source.nodeId) {
        // Create the connection with the correct orientation
        // If dragging from output to input, source is output and target is input
        // If dragging from input to output, source is input and target is output
        let newConnection;
        
        if (activeDrag.source.portId === 'output' && targetPortType === 'input') {
          newConnection = {
            id: `conn-${Date.now()}`,
            from: { nodeId: activeDrag.source.nodeId, portId: 'output' },
            to: { nodeId: targetNodeId, portId: 'input' }
          };
        } else if (activeDrag.source.portId === 'input' && targetPortType === 'output') {
          newConnection = {
            id: `conn-${Date.now()}`,
            from: { nodeId: targetNodeId, portId: 'output' },
            to: { nodeId: activeDrag.source.nodeId, portId: 'input' }
          };
        }
        
        if (newConnection) {
          // Check for duplicate connections
          const isDuplicate = connections.some(conn => 
            (conn.from.nodeId === newConnection.from.nodeId && conn.to.nodeId === newConnection.to.nodeId) ||
            (conn.from.nodeId === newConnection.to.nodeId && conn.to.nodeId === newConnection.from.nodeId)
          );
          
          if (!isDuplicate) {
            setConnections([...connections, newConnection]);
            setLastAction({
              type: 'connection_added',
              data: newConnection
            });
            setSaved(false);
          }
        }
      }
    }
    
    // Always reset the active drag
    setActiveDrag(null);
  }, [activeDrag, nodes, connections, setConnections, setActiveDrag]);
  
  // Handle connection deletion
  const handleDeleteConnection = useCallback((connectionId) => {
    const connectionToDelete = connections.find(conn => conn.id === connectionId);
    
    setConnections(connections.filter(conn => conn.id !== connectionId));
    setLastAction({
      type: 'connection_deleted',
      data: connectionToDelete
    });
    setSaved(false);
  }, [connections, setConnections]);
  
  // Add a new node
  const handleAddNode = useCallback(() => {
    const position = calculateNewNodePosition(nodes);
    const newNode = createNewNode('NewNode', position);
    addNode(newNode);
    setLastAction({
      type: 'node_added',
      data: newNode
    });
    setSaved(false);
  }, [nodes, addNode]);
  
  // Handle node deletion
  const handleDeleteNode = useCallback((nodeId) => {
    const nodeToDelete = nodes.find(node => node.id === nodeId);
    const connectionsToDelete = connections.filter(conn => 
      conn.from.nodeId === nodeId || conn.to.nodeId === nodeId
    );
    
    deleteNode(nodeId);
    removeNodeConnections(nodeId);
    
    setLastAction({
      type: 'node_deleted',
      data: { node: nodeToDelete, connections: connectionsToDelete }
    });
    setSaved(false);
  }, [nodes, connections, deleteNode, removeNodeConnections]);
  
  // Handle import flow
  const handleImportFlow = useCallback(({ nodes: importedNodes, connections: importedConnections }) => {
    setNodes(importedNodes);
    setConnections(importedConnections);
    setSaved(false);
    setLastAction({
      type: 'flow_imported',
      data: { nodeCount: importedNodes.length, connectionCount: importedConnections.length }
    });
  }, [setNodes, setConnections]);
  
  // Open import/export panel
  const handleOpenImportExport = useCallback(() => {
    setShowImportExport(true);
  }, []);
  
  // Save flow
  const handleSaveFlow = useCallback(() => {
    // In a real app, you would save to a server here
    setSaved(true);
  }, []);
  
  // Auto-save effect
  useEffect(() => {
    if (!isSaved) {
      const timeoutId = setTimeout(() => {
        handleSaveFlow();
      }, 2000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isSaved, handleSaveFlow, nodes, connections]);
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header 
        title="wf1" 
        onBack={() => console.log('Back clicked')}
        onDelete={() => console.log('Delete workflow clicked')}
        onCodeView={() => console.log('Code view clicked')}
        onOpenImportExport={handleOpenImportExport}
      />
      
      <div className="flex-grow relative overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-[1fr] bg-white">
          <Canvas 
            ref={canvasRef}
            nodes={nodes}
            connections={connections}
            activeDrag={activeDrag}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onNodePositionChange={updateNodePosition}
            onStartConnection={startConnection}
            onDeleteNode={handleDeleteNode}
            onDeleteConnection={handleDeleteConnection}
          />
        </div>
        
        {/* Floating action button */}
        <button 
          className="absolute left-4 bottom-4 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700"
          onClick={handleAddNode}
        >
          <Plus size={24} />
        </button>
      </div>
      
      {/* Import/Export Panel */}
      <ImportExportPanel 
        isOpen={showImportExport}
        onClose={() => setShowImportExport(false)}
        nodes={nodes}
        connections={connections}
        onImport={handleImportFlow}
      />
      
      {/* Notification */}
      <Notification 
        message={
          lastAction?.type === 'connection_deleted' 
            ? "Connection removed" 
            : lastAction?.type === 'connection_added'
              ? "Connection created"
              : lastAction?.type === 'node_added'
                ? "Node added"
                : lastAction?.type === 'node_deleted'
                  ? "Node deleted"
                  : lastAction?.type === 'flow_imported'
                    ? `Flow imported (${lastAction.data.nodeCount} nodes, ${lastAction.data.connectionCount} connections)`
                    : "Chatflow saved"
        } 
        isVisible={isSaved} 
        onClose={() => setSaved(false)} 
      />
      
      {/* Page title */}
      <div className="absolute bottom-4 right-4 text-gray-500 text-sm">
        Flowise Drag & Drop UI
      </div>
    </div>
  );
};

export default FlowiseUI;