import { useState, useEffect, useCallback } from "react";
import Tree from "react-d3-tree";

export function ApiTree() {
  const [treeData, setTreeData] = useState(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const projectId = localStorage.getItem("currentProjectId");

  // Fetch tree data
  useEffect(() => {
    async function fetchTree() {
      const res = await fetch(
        `https://apivision.onrender.com/api/v1/createproject/project/${projectId}/tree`
      );
      const data = await res.json();

      if (data.success) {
        setTreeData(convertToTree(data.data));
      }
    }
    fetchTree();
  }, [projectId]);

  // Center tree horizontally
  const containerRef = useCallback((container) => {
    if (container !== null) {
      const dimensions = container.getBoundingClientRect();
      setTranslate({ x: dimensions.width / 2, y: 100 });
    }
  }, []);

  if (!treeData) return <div className="p-6">Loading tree...</div>;

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "90vh",
        background: "#f7f7f7",
        borderRadius: "12px",
        padding: "10px",
      }}
    >
      <Tree
        data={treeData}
        translate={translate}
        orientation="vertical"
        zoom={0.9}
        zoomable
        collapsible
        pathFunc={"step"}
        renderCustomNodeElement={CustomNode}
        separation={{ siblings: 1.5, nonSiblings: 2.2 }} // More spacing!
      />
    </div>
  );
}

/* -----------------------------------------------------------
   🌟 CUSTOM NODE DESIGN (MODERN, CLEAN, SPACED)
----------------------------------------------------------- */
const CustomNode = ({ nodeDatum }) => {
  const level = nodeDatum.__rd3t.depth;

  const colors = [
    "#374151", // project (dark gray)
    "#2563eb", // feature (blue)
    "#16a34a", // parent API (green)
    "#f59e0b", // child API (orange)
  ];

  const circleColor = colors[level] || "#6b7280";

  return (
    <g>
      {/* Node Circle */}
      <circle
        r={20}
        fill={circleColor}
        stroke="#111"
        strokeWidth="1.5"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
      />

      {/* Main Title */}
      <text
        x={30}
        y={4}
        fontSize={15}
        fontWeight="700"
        fill="#111"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {nodeDatum.name}
      </text>

      {/* Route */}
      {nodeDatum.attributes?.route && (
        <text
          x={30}
          y={28}
          fontSize={12}
          fill="#444"
          style={{ fontFamily: "monospace" }}
        >
          {nodeDatum.attributes.route}
        </text>
      )}

      {/* Method */}
      {nodeDatum.attributes?.method && (
        <text
          x={30}
          y={44}
          fontSize={12}
          fill="#444"
          style={{ fontFamily: "monospace" }}
        >
          {nodeDatum.attributes.method}
        </text>
      )}
    </g>
  );
};

/* -----------------------------------------------------------
   Convert backend → React-D3-Tree structure
----------------------------------------------------------- */
function convertToTree(apiData) {
  return {
    name: apiData.projectName,
    children: apiData.features.map((f) => ({
      name: f.featureName,
      children: f.parentApis.map((p) => ({
        name: p.name,
        attributes: { route: p.route, method: p.method },
        children: p.children.map((c) => ({
          name: c.name,
          attributes: { route: c.route, method: c.method },
        })),
      })),
    })),
  };
}
