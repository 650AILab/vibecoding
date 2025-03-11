import React from 'react';

const NodePort = ({ type, nodeId, onConnect }) => {
  const isInput = type === 'input';
  
  const handleMouseDown = (e) => {
    e.stopPropagation();
    console.log(`Port clicked: ${nodeId} - ${type}`);
    onConnect && onConnect('start', { nodeId, portId: type });
  };
  
  return (
    <div 
      id={`port-${nodeId}-${type}`}
      className={`absolute ${isInput ? '-left-2' : '-right-2'} top-1/2 transform -translate-y-1/2 w-4 h-4 ${isInput ? 'bg-green-500' : 'bg-blue-500'} rounded-full border-2 border-white cursor-pointer`}
      data-port-id={`${nodeId}-${type}`}
      data-node-id={nodeId}
      data-port-type={type}
      onMouseDown={handleMouseDown}
    />
  );
};

export default NodePort;