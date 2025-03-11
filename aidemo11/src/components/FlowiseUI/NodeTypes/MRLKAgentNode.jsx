import Node from '../Node';

const MRLKAgentNode = (props) => {
  return (
    <Node {...props}>
      <div className="text-xs text-center text-gray-500 mb-1">Inputs</div>
      <div className="mb-3">
        <label className="block text-xs text-gray-600 mb-1">Allowed Tools *</label>
      </div>
      <div className="mb-3">
        <label className="block text-xs text-gray-600 mb-1">LLM Model *</label>
      </div>
      <div className="text-xs text-center text-gray-500 mb-1">Output</div>
    </Node>
  );
};

export default MRLKAgentNode;
