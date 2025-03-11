import React, { useState } from 'react';
import { X, Download, Upload } from 'lucide-react';
import { saveFlowAsJson, loadFlowFromJson } from '../../utils/flowUtils';

const ImportExportPanel = ({ 
  isOpen, 
  onClose, 
  nodes, 
  connections, 
  onImport 
}) => {
  const [exportedJson, setExportedJson] = useState('');
  const [importJson, setImportJson] = useState('');
  const [importError, setImportError] = useState('');
  const [activeTab, setActiveTab] = useState('export'); // 'export' or 'import'
  
  // Handle export
  const handleExport = () => {
    const json = saveFlowAsJson(nodes, connections);
    setExportedJson(json);
  };
  
  // Handle import
  const handleImport = () => {
    try {
      setImportError('');
      const flowConfig = loadFlowFromJson(importJson);
      onImport(flowConfig);
      onClose();
    } catch (error) {
      setImportError(error.message);
    }
  };
  
  // Handle copy to clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(exportedJson).then(() => {
      // Show a temporary success message
      const button = document.getElementById('copy-button');
      if (button) {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
    });
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-medium">
            {activeTab === 'export' ? 'Export Flow' : 'Import Flow'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="border-b">
          <div className="flex">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'export' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('export')}
            >
              Export
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'import' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('import')}
            >
              Import
            </button>
          </div>
        </div>
        
        <div className="p-4">
          {activeTab === 'export' ? (
            <>
              <p className="mb-2 text-sm text-gray-600">
                Export your current flow configuration as JSON. You can save this to reload your flow later.
              </p>
              <div className="flex gap-2 mb-3">
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                >
                  <Download size={16} className="mr-2" />
                  Generate JSON
                </button>
                {exportedJson && (
                  <button
                    id="copy-button"
                    onClick={handleCopyToClipboard}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    Copy to Clipboard
                  </button>
                )}
              </div>
              {exportedJson && (
                <div className="mt-2">
                  <textarea
                    value={exportedJson}
                    readOnly
                    className="w-full h-64 p-2 border border-gray-300 rounded font-mono text-sm"
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <p className="mb-2 text-sm text-gray-600">
                Paste a previously exported flow configuration JSON to restore your flow.
              </p>
              <div className="mb-3">
                <textarea
                  value={importJson}
                  onChange={(e) => setImportJson(e.target.value)}
                  placeholder="Paste your flow JSON here..."
                  className="w-full h-64 p-2 border border-gray-300 rounded font-mono text-sm"
                />
              </div>
              {importError && (
                <div className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                  {importError}
                </div>
              )}
              <button
                onClick={handleImport}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                disabled={!importJson.trim()}
              >
                <Upload size={16} className="mr-2" />
                Import Flow
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportExportPanel;