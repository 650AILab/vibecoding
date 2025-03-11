// Generate a unique ID for new nodes and connections
export const generateId = (prefix = 'node') => {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// Find a node in an array by ID
export const findNodeById = (nodes, id) => {
  return nodes.find(node => node.id === id);
};

// Create a new node with default values
export const createNewNode = (type = 'Generic', position = { x: 400, y: 200 }) => {
  return {
    id: generateId(),
    type: type,
    title: type,
    position: position,
    icon: { bgColor: 'bg-blue-500', text: type.charAt(0) }
  };
};

// Calculate the position for a new node based on existing nodes
export const calculateNewNodePosition = (nodes) => {
  if (nodes.length === 0) {
    return { x: 400, y: 200 };
  }
  
  // Find the rightmost node
  const rightmostNode = nodes.reduce((prev, current) => {
    return (prev.position.x > current.position.x) ? prev : current;
  });
  
  // Position the new node to the right of the rightmost node
  return {
    x: rightmostNode.position.x + 320,
    y: rightmostNode.position.y
  };
};

// Check if two nodes are close enough to establish a connection
export const areNodesInConnectingDistance = (sourceNode, mousePosition, targetNode, threshold = 30) => {
  if (!sourceNode || !targetNode) return false;
  
  // Calculate the position of the target node's input port
  const targetPortX = targetNode.position.x;
  const targetPortY = targetNode.position.y + 60; // Approximate middle of node
  
  const distance = Math.sqrt(
    Math.pow(mousePosition.x - targetPortX, 2) + 
    Math.pow(mousePosition.y - targetPortY, 2)
  );
  
  return distance < threshold;
};

// Get port element position for more accurate connections
export const getPortPosition = (nodeId, portType) => {
  const portElement = document.getElementById(`port-${nodeId}-${portType}`);
  if (!portElement) return null;
  
  const rect = portElement.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
};

/**
 * Save the current flow configuration as JSON
 * @param {Array} nodes - Array of node objects
 * @param {Array} connections - Array of connection objects
 * @returns {string} - JSON string of the flow configuration
 */
export const saveFlowAsJson = (nodes, connections) => {
  const flowConfig = {
    version: "1.0",
    timestamp: new Date().toISOString(),
    nodes: nodes,
    connections: connections
  };
  
  const jsonString = JSON.stringify(flowConfig, null, 2);
  console.log("Saved Flow Configuration:", jsonString);
  return jsonString;
};

/**
 * Load a flow configuration from JSON
 * @param {string} jsonString - JSON string of the flow configuration
 * @returns {Object} - Object with nodes and connections arrays
 */
export const loadFlowFromJson = (jsonString) => {
  try {
    const flowConfig = JSON.parse(jsonString);
    
    if (!flowConfig.nodes || !flowConfig.connections) {
      throw new Error("Invalid flow configuration: missing nodes or connections");
    }
    
    // Validate nodes
    if (!Array.isArray(flowConfig.nodes)) {
      throw new Error("Invalid flow configuration: nodes is not an array");
    }
    
    // Validate each node has required properties
    flowConfig.nodes.forEach(node => {
      if (!node.id || !node.position || !node.type || !node.title || !node.icon) {
        throw new Error(`Invalid node configuration: ${JSON.stringify(node)}`);
      }
    });
    
    // Validate connections
    if (!Array.isArray(flowConfig.connections)) {
      throw new Error("Invalid flow configuration: connections is not an array");
    }
    
    // Validate each connection has required properties
    flowConfig.connections.forEach(conn => {
      if (!conn.id || !conn.from || !conn.to || !conn.from.nodeId || !conn.to.nodeId) {
        throw new Error(`Invalid connection configuration: ${JSON.stringify(conn)}`);
      }
    });
    
    return {
      nodes: flowConfig.nodes,
      connections: flowConfig.connections
    };
  } catch (error) {
    console.error("Error loading flow configuration:", error);
    throw error;
  }
};