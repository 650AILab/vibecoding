import Node from '../Node';

const CalculatorNode = (props) => {
  return (
    <Node {...props}>
      <div className="text-xs text-center text-gray-500 mb-1">Output</div>
    </Node>
  );
};

export default CalculatorNode;
