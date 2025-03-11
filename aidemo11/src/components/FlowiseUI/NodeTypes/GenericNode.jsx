import Node from '../Node';

const GenericNode = (props) => {
  return (
    <Node {...props}>
      <div className="text-xs text-center text-gray-500 mb-1">New Node Content</div>
    </Node>
  );
};

export default GenericNode;
