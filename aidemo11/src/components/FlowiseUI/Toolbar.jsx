import { Plus, Minus, Maximize2, Code } from 'lucide-react';

const Toolbar = ({ onZoomIn, onZoomOut, onMaximize, onCodeView }) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white border rounded-md shadow-sm px-2">
      <button 
        className="p-2 text-gray-500 hover:text-gray-700"
        onClick={onZoomIn}
      >
        <Plus size={16} />
      </button>
      <button 
        className="p-2 text-gray-500 hover:text-gray-700"
        onClick={onZoomOut}
      >
        <Minus size={16} />
      </button>
      <button 
        className="p-2 text-gray-500 hover:text-gray-700"
        onClick={onMaximize}
      >
        <Maximize2 size={16} />
      </button>
      <button 
        className="p-2 text-gray-500 hover:text-gray-700"
        onClick={onCodeView}
      >
        <Code size={16} />
      </button>
    </div>
  );
};

export default Toolbar;
