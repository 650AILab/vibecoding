// Initialize global variables for connection handling
export function initializeConnectionGlobals() {
    window.activeConnectionDrag = false;
    window.currentHoveredPort = null;
  }
  
  // Add this to your FlowiseUI component's useEffect hook
  // useEffect(() => {
  //   initializeConnectionGlobals();
  // }, []);
  