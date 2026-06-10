import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
  NodeProps,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useNavigate } from 'react-router-dom';
import { pages, categoryColors, categoryLabels } from '@/data/pages';
import { useMemo } from 'react';
import type { PageData } from '@/data/pages';

function CustomNode({ data }: NodeProps) {
  const color = data.color as string;
  return (
    <div
      className="px-4 py-3 rounded-xl border-2 shadow-md cursor-pointer transition-all hover:shadow-lg min-w-[160px]"
      style={{
        borderColor: color,
        backgroundColor: `${color}08`,
      }}
      onClick={() => data.onClick?.()}
    >
      <Handle type="target" position={Position.Top} className="!bg-gray-300 !w-2 !h-2" />
      <div className="text-xs font-medium mb-1" style={{ color }}>
        {data.category}
      </div>
      <div className="text-sm font-semibold text-[#1F2329] leading-tight">
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-gray-300 !w-2 !h-2" />
    </div>
  );
}

const nodeTypes = { custom: CustomNode };

const categoryOrder: PageData['category'][] = ['login', 'home', 'leads', 'follow', 'mine'];

export default function FlowChart() {
  const navigate = useNavigate();

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const nodeList: Node[] = [];
    const edgeList: Edge[] = [];

    // 按分类分列，每列间距350px，行间距130px
    const colWidth = 350;
    const rowHeight = 130;

    const categoryY: Record<string, number> = {};
    categoryOrder.forEach((cat) => {
      categoryY[cat] = 0;
    });

    const categoryX: Record<string, number> = {};
    categoryOrder.forEach((cat, i) => {
      categoryX[cat] = i * colWidth;
    });

    pages.forEach((page) => {
      const cat = page.category;
      const x = categoryX[cat] ?? 0;
      const y = categoryY[cat] ?? 0;
      categoryY[cat] = (categoryY[cat] ?? 0) + rowHeight;

      nodeList.push({
        id: page.id,
        type: 'custom',
        position: { x, y },
        data: {
          label: page.title,
          category: categoryLabels[cat],
          color: categoryColors[cat],
          onClick: () => navigate(`/page/${page.id}`),
        },
      });
    });

    pages.forEach((page) => {
      page.nextPages.forEach((nextId) => {
        if (pages.find((p) => p.id === nextId)) {
          edgeList.push({
            id: `${page.id}-${nextId}`,
            source: page.id,
            target: nextId,
            animated: true,
            style: { stroke: '#0089FF', strokeWidth: 1.5 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#0089FF',
            },
          });
        }
      });
    });

    return { nodes: nodeList, edges: edgeList };
  }, [navigate]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        maxZoom={2}
      >
        <Background color="#e5e7eb" gap={20} size={1} />
        <Controls position="bottom-right" />
      </ReactFlow>
    </div>
  );
}
