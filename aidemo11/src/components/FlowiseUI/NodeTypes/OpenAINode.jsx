import Node from '../Node';

const OpenAINode = (props) => {
  return (
    <Node {...props}>
      <div className="text-xs text-center text-gray-500 mb-1">Inputs</div>
      <div className="mb-3">
        <label className="block text-xs text-gray-600 mb-1">OpenAI Api Key *</label>
        <input
          type="password"
          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
          value="••••••••••••••••••••••••••••••••••••"
          readOnly
        />
      </div>
      <div className="mb-3">
        <label className="block text-xs text-gray-600 mb-1">Model Name</label>
        <div className="relative">
          <select className="w-full rounded border border-gray-300 px-2 py-1 text-sm appearance-none">
            <option>text-davinci-003</option>
          </select>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label className="block text-xs text-gray-600 mb-1">Temperature</label>
        <input
          type="number"
          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
          defaultValue="0"
        />
      </div>
      <div className="text-xs text-center text-gray-500 mb-1">Output</div>
    </Node>
  );
};

export default OpenAINode;