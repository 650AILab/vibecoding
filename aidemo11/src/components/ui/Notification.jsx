import { Save, X } from 'lucide-react';

const Notification = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center bg-green-600 text-white px-4 py-2 rounded shadow-lg">
      <Save size={18} className="mr-2" />
      <span>{message}</span>
      <button 
        onClick={onClose} 
        className="ml-4 text-white hover:text-gray-200"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Notification;
