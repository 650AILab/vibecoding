import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Connection = ({ connection, nodes, isActive = false, onDelete }) => {
  const { from, to } = connection;
  const [showDeletePanel, setShowDeletePanel] = useState(false);
  const [pathData, setPathData] = useState('');
  const [midpoint, setMidpoint] = useState({ x: 0, y: 0 });
  
  // Calculate exact port positions and path
  useEffect(() => {
    const calculatePathAndMidpoint = () => {
      // Find port elements by their IDs
      const sourcePortId = `port-${from.nodeId}-${from.portId}`;
      const targetPortId = `port-${to.nodeId}-${to.portId}`;
      
      const sourcePortElement = document.getElementById(sourcePortId);
      const targetPortElement = document.getElementById(targetPortId);
      
      // Default positions based on node positions (fallback)
      const sourceNode = nodes.find(node => node.id === from.nodeId);
      const targetNode = nodes.find(node => node.id === to.nodeId);
      
      let sourceX, sourceY, targetX, targetY;
      
      if (sourcePortElement && targetPortElement) {
        // Get exact port positions from DOM
        const sourceRect = sourcePortElement.getBoundingClientRect();
        const targetRect = targetPortElement.getBoundingClientRect();
        const canvasRect = document.getElementById('flow-canvas').getBoundingClientRect();
        
        // Adjust coordinates relative to canvas
        sourceX = sourceRect.right - canvasRect.left;
        sourceY = sourceRect.top + sourceRect.height/2 - canvasRect.top;
        targetX = targetRect.left - canvasRect.left;
        targetY = targetRect.top + targetRect.height/2 - canvasRect.top;
      } else if (sourceNode && targetNode) {
        // Fallback to calculated positions
        sourceX = sourceNode.position.x + 256; // Right side for output port
        sourceY = sourceNode.position.y + 60; // Middle of node
        targetX = targetNode.position.x; // Left side for input port
        targetY = targetNode.position.y + 60; // Middle of node
      } else {
        // No data available
        return { path: '', midpoint: { x: 0, y: 0 } };
      }
      
      // Generate a smoother bezier curve with appropriate control points
      const dx = Math.abs(targetX - sourceX);
      const controlPointOffset = Math.min(100, dx * 0.5);
      
      // Create bezier curve
      const path = `M ${sourceX},${sourceY} C ${sourceX + controlPointOffset},${sourceY} ${targetX - controlPointOffset},${targetY} ${targetX},${targetY}`;
      
      // Calculate midpoint (approximate for bezier)
      const mid = {
        x: (sourceX + targetX) / 2,
        y: (sourceY + targetY) / 2 - 15 // Offset slightly above the line
      };
      
      return { path, midpoint: mid };
    };
    
    // Only calculate when the component is mounted and when nodes change
    const { path, midpoint } = calculatePathAndMidpoint();
    setPathData(path);
    setMidpoint(midpoint);
    
    // Recalculate on window resize
    const handleResize = () => {
      const { path, midpoint } = calculatePathAndMidpoint();
      setPathData(path);
      setMidpoint(midpoint);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [from, to, nodes]);
  
  const handleConnectionClick = (e) => {
    e.stopPropagation();
    if (!isActive) {
      setShowDeletePanel(!showDeletePanel);
    }
  };
  
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete && onDelete(connection.id);
    setShowDeletePanel(false);
  };
  
  return (
    <g>
      {/* Invisible wider path for easier clicking */}
      <path
        d={pathData}
        stroke="transparent"
        strokeWidth="15"
        fill="none"
        style={{ cursor: 'pointer' }}
        onClick={handleConnectionClick}
      />
      
      {/* Visible connection path */}
      <path
        d={pathData}
        stroke={isActive ? "#2563eb" : (showDeletePanel ? "#ef4444" : "#ccc")}
        strokeWidth={isActive ? "2" : "1"}
        strokeDasharray={isActive ? "5,5" : "none"}
        fill="none"
      />
      
      {/* Delete panel */}
      {showDeletePanel && (
        <g>
          <rect
            x={midpoint.x - 15}
            y={midpoint.y - 15}
            width="30"
            height="30"
            rx="4"
            fill="white"
            stroke="#ef4444"
            strokeWidth="1"
            style={{ cursor: 'pointer' }}
          />
          <foreignObject
            x={midpoint.x - 15}
            y={midpoint.y - 15}
            width="30"
            height="30"
          >
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              className="flex items-center justify-center w-full h-full"
              onClick={handleDeleteClick}
              style={{ cursor: 'pointer' }}
            >
              <X size={18} className="text-red-500" />
            </div>
          </foreignObject>
        </g>
      )}
    </g>
  );
};

export default Connection;