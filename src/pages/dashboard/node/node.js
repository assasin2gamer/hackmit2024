import React, { useState, useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const SimpleGraph = () => {
  const graphRef = useRef();
  const [graphData, setGraphData] = useState({
    nodes: [
      { id: 'A', label: 'Node A' },
      { id: 'B', label: 'Node B' },
      { id: 'C', label: 'Node C' },
    ],
    links: [
      { source: 'A', target: 'B' },
      { source: 'B', target: 'C' },
    ],
  });
  const [pulseRadius, setPulseRadius] = useState({});
  const [animatingNodes, setAnimatingNodes] = useState([]); // Track nodes being animated

  // Pulse effect handler: this will run for a limited time and stop
  const handleNodeClick = (node) => {
    const startNodeId = node.id;
    setAnimatingNodes([startNodeId]); // Start with the clicked node

    // Set the initial pulse for the clicked node
    setPulseRadius({ [startNodeId]: 10 });

    propagatePulse(startNodeId);
  };

  const propagatePulse = (startNodeId) => {
    const visited = new Set();
    const queue = [startNodeId];
    const delay = 500;

    while (queue.length) {
      const nodeId = queue.shift();
      visited.add(nodeId);

      // Find connected nodes and propagate outward
      graphData.links.forEach(link => {
        if (link.source.id === nodeId && !visited.has(link.target.id)) {
          setTimeout(() => {
            setAnimatingNodes((prev) => [...prev, link.target.id]); // Add new node to animation
            setPulseRadius((prevRadius) => ({
              ...prevRadius,
              [link.target.id]: 10, // Add pulse effect to connected nodes
            }));
          }, delay * queue.length); // Outward propagation delay
          queue.push(link.target.id);
        } else if (link.target.id === nodeId && !visited.has(link.source.id)) {
          setTimeout(() => {
            setAnimatingNodes((prev) => [...prev, link.source.id]); // Add new node to animation
            setPulseRadius((prevRadius) => ({
              ...prevRadius,
              [link.source.id]: 10,
            }));
          }, delay * queue.length);
          queue.push(link.source.id);
        }
      });
    }

    // Stop the pulse animation after it's complete
    setTimeout(() => {
      setAnimatingNodes([]); // Clear animating nodes after the pulse reaches the end
      setPulseRadius({}); // Reset the pulse radius
    }, delay * (visited.size + 1)); // Delay until the pulse reaches all nodes
  };

  return (
    <div>
      <h2>Simple Graph with react-force-graph</h2>
      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        nodeLabel="label"
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkColor={() => 'white'}
        linkWidth={2} // Adjust width of the line
        width={800}
        height={600}
        onNodeClick={handleNodeClick} // Handle node clicks
        // Customize node appearance to show pulse effect
        nodeCanvasObject={(node, ctx) => {
          ctx.fillStyle = animatingNodes.includes(node.id) ? 'lightblue' : 'gray'; // Change color if animating
          const radius = pulseRadius[node.id] || 10; // Pulse radius
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
      />
    </div>
  );
};

export default SimpleGraph;
