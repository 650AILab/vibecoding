import { useState, useCallback } from 'react';

const useConnectionDrag = (initialConnections) => {
  const [connections, setConnections] = useState(initialConnections || []);
  const [activeDrag, setActiveDrag] = useState(null);
  
  // Start dragging a connection
  const startConnection = useCallback((type, endpoint) => {
    if (type === 'start') {
      setActiveDrag({ source: endpoint });
    }
  }, []);
  
  // Update the active drag during mouse movement
  const updateActiveDrag = useCallback((position) => {
    if (!activeDrag) return;
    
    setActiveDrag(prevState => ({
      ...prevState,
      currentPosition: position
    }));
  }, [activeDrag]);
  
  // Complete the connection
  const completeConnection = useCallback((targetNode) => {
    if (!activeDrag || !activeDrag.source) return false;
    
    if (targetNode && targetNode.id !== activeDrag.source.nodeId) {
      // Create new connection
      const newConnection = {
        id: `conn-${Date.now()}`,
        from: { 
          nodeId: activeDrag.source.nodeId, 
          portId: activeDrag.source.portId 
        },
        to: { 
          nodeId: targetNode.id, 
          portId: 'input' 
        }
      };
      
      setConnections(prevConnections => [...prevConnections, newConnection]);
      return true;
    }
    
    return false;
  }, [activeDrag]);
  
  // Reset active drag
  const resetActiveDrag = useCallback(() => {
    setActiveDrag(null);
  }, []);
  
  // Remove a connection
  const removeConnection = useCallback((connectionId) => {
    setConnections(prevConnections => 
      prevConnections.filter(conn => conn.id !== connectionId)
    );
  }, []);
  
  // Remove all connections related to a node
  const removeNodeConnections = useCallback((nodeId) => {
    setConnections(prevConnections => 
      prevConnections.filter(conn => 
        conn.from.nodeId !== nodeId && conn.to.nodeId !== nodeId
      )
    );
  }, []);
  
  return {
    connections,
    setConnections,
    activeDrag,
    setActiveDrag,
    startConnection,
    updateActiveDrag,
    completeConnection,
    resetActiveDrag,
    removeConnection,
    removeNodeConnections
  };
};

export default useConnectionDrag;