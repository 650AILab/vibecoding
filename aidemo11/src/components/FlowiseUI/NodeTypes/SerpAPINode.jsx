import Node from '../Node';

const SerpAPINode = (props) => {
  return (
    <Node {...props}>
      <div className="text-xs text-center text-gray-500 mb-1">Inputs</div>
      <div className="mb-3">
        <label className="block text-xs text-gray-600 mb-1">Serp Api Key *</label>
        <input
          type="password"
          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
          value="••••••••••••••••••••••••••••••••••••••"
          readOnly
        />
      </div>
      <div className="text-xs text-center text-gray-500 mb-1">Output</div>
    </Node>
  );
};

export default SerpAPINode;