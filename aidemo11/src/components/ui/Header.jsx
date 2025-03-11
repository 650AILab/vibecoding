import { ChevronLeft, Trash2, Code, Save, Download } from 'lucide-react';

const Header = ({ 
  title, 
  onBack, 
  onDelete, 
  onCodeView, 
  onOpenImportExport 
}) => {
  return (
    <header className="flex items-center px-4 py-2 border-b">
      <div className="flex items-center gap-2">
        <button 
          className="p-1 text-gray-500 bg-gray-100 rounded-full"
          onClick={onBack}
        >
          <ChevronLeft size={18} />
        </button>
        <div className="font-medium text-gray-700">{title}</div>
        <button 
          className="p-1 text-gray-500 hover:text-gray-700"
          onClick={onCodeView}
        >
          <Code size={16} />
        </button>
      </div>
      <div className="ml-auto flex gap-2">
        <button 
          className="p-1 text-gray-500 hover:text-gray-700"
          onClick={onOpenImportExport}
          title="Import/Export Flow"
        >
          <Download size={18} />
        </button>
        <button 
          className="p-1 text-gray-500 hover:text-gray-700"
          onClick={onDelete}
          title="Delete Flow"
        >
          <Trash2 size={18} />
        </button>
        <button className="p-1 text-gray-500 hover:text-gray-700">
          <code>{`{}`}</code>
        </button>
      </div>
    </header>
  );
};

export default Header;