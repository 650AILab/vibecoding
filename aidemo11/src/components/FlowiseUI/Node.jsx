import { useRef, useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import NodePort from './NodePort';

const Node = ({ 
  id, 
  type, 
  title, 
  icon, 
  position, 
  onPositionChange, 
  onConnect, 
  onDelete,
  children 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState(position);
  const nodeRef = useRef(null);

  // Handle position updates from parent
  useEffect(() => {
    setPos(position);
  }, [position]);

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
      onPositionChange && onPositionChange(id, { x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
  }, [isDragging, pos]);

  const handleDelete = () => {
    onDelete && onDelete(id);
  };

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
        <button 
          className="text-gray-400 hover:text-gray-600"
          onClick={handleDelete}
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="p-3">
        {children}
      </div>
      
      <div className="flex justify-end p-2 border-t text-xs text-gray-600">
        <span>{type}</span>
      </div>
      
      {/* Input port */}
      <NodePort 
        type="input" 
        nodeId={id} 
        onConnect={onConnect} 
      />
      
      {/* Output port */}
      <NodePort 
        type="output" 
        nodeId={id} 
        onConnect={onConnect} 
      />
    </div>
  );
};

export default Node;
