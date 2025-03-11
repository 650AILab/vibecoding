import { useState } from 'react';

const useNodeDrag = (initialNodes) => {
  const [nodes, setNodes] = useState(initialNodes);
  
  // Update node position
  const updateNodePosition = (id, newPosition) => {
    setNodes(nodes.map(node => 
      node.id === id ? { ...node, position: newPosition } : node
    ));
  };
  
  // Add a new node
  const addNode = (node) => {
    setNodes([...nodes, node]);
  };
  
  // Delete a node
  const deleteNode = (id) => {
    setNodes(nodes.filter(node => node.id !== id));
  };
  
  return {
    nodes,
    setNodes,
    updateNodePosition,
    addNode,
    deleteNode
  };
};

export default useNodeDrag;