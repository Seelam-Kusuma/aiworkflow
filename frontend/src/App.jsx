import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import axios from 'axios';

const initialNodes = [
  {
    id: '1',
    type: 'default',
    data: { label: 'Node 1: Sum' },
    position: { x: 100, y: 100 },
  },
  {
    id: '2',
    type: 'default',
    data: { label: 'Node 2: Square' },
    position: { x: 400, y: 100 },
  },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // Handle drag/drop updates
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const handleCompute = async () => {
    try {
      const a = parseInt(prompt("Enter number A:"));
      const b = parseInt(prompt("Enter number B:"));

      const sumResponse = await axios.post('http://127.0.0.1:5000/sum', { a, b });
      const sum = sumResponse.data.sum;

      const squareResponse = await axios.post('http://127.0.0.1:5000/square', { value: sum });
      const square = squareResponse.data.square;

      alert(`Sum: ${sum}, Square: ${square}`);

      setNodes((nds) =>
        nds.map((node) =>
          node.id === '1'
            ? { ...node, data: { label: `Node 1: Sum = ${sum}` } }
            : node.id === '2'
            ? { ...node, data: { label: `Node 2: Square = ${square}` } }
            : node
        )
      );
    } catch (error) {
      console.error(error);
      alert("Error performing operations.");
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <button onClick={handleCompute} style={{ margin: 10 }}>
        Compute
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default App;
