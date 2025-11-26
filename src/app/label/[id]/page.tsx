"use client";

import { useEffect, useRef, useState } from "react";
import RequireAuth from "@/components/RequireAuth";
import {
  getManualDetail,
  saveAnnotations,
  exportManualJson,
  exportManualYolo,
} from "@/lib/manualApi";
import { useParams } from "next/navigation";

type Point = [number, number];

interface BBox {
  type: "bbox";
  class: string;
  bbox: [number, number, number, number];
}

interface OBB {
  type: "obb";
  class: string;
  points: Point[]; // 4 points
  angle: number;
}

interface Seg {
  type: "seg";
  class: string;
  points: Point[];
}

interface Pose {
  type: "pose";
  class: string;
  points: Point[];
}

type Annotation = BBox | OBB | Seg | Pose;

const DEFAULT_CLASSES = ["car", "human", "robot", "tractor", "hilera"];

export default function DetailPage() {
  const params = useParams();
  const id = Number(params.id);

  return (
    <RequireAuth>
      <Editor assetId={id} />
    </RequireAuth>
  );
}

function Editor({ assetId }: { assetId: number }) {
  // image and annotations
  const [loading, setLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });

  const [anns, setAnns] = useState<Annotation[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const [currentClass, setCurrentClass] = useState("car");
  const [mode, setMode] = useState<"bbox" | "obb" | "seg" | "pose">("bbox");

  // drawing state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tempPoints, setTempPoints] = useState<Point[]>([]);
  const [dragging, setDragging] = useState<
    null | {
      annIndex: number;
      pointIndex: number | "all";
      offset: Point;
    }
  >(null);

  // pan + zoom
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<Point | null>(null);
  const [offset, setOffset] = useState<Point>([0, 0]);
  const [zoom, setZoom] = useState(1);

  // ---------------------------------------
  // LOAD IMAGE + ANNS
  // ---------------------------------------
  useEffect(() => {
    (async () => {
      const data = await getManualDetail(assetId);
      setImgUrl(data.url);
      setImgSize({ w: data.width, h: data.height });
      setAnns(data.results[0]?.annotations ?? []);
      setLoading(false);
    })();
  }, [assetId]);

  // ---------------------------------------
  // MATH UTILITIES
  // ---------------------------------------
  const pointInPolygon = (p: Point, poly: Point[]): boolean => {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0], yi = poly[i][1];
      const xj = poly[j][0], yj = poly[j][1];

      const intersect =
        yi > p[1] !== yj > p[1] &&
        p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  };

  const screenToImage = (e: any): Point => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    // apply inverse of transform
    const x = (sx / zoom) - offset[0];
    const y = (sy / zoom) - offset[1];
    return [x, y];
  };

  // ---------------------------------------
  // RENDERER (1:1 PyQt)
  // ---------------------------------------
  useEffect(() => {
    if (!imgUrl || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.src = imgUrl;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // apply zoom + pan
      ctx.setTransform(zoom, 0, 0, zoom, offset[0] * zoom, offset[1] * zoom);

      // draw image
      ctx.drawImage(img, 0, 0);

      // draw annotations
      anns.forEach((ann, index) => {
        ctx.lineWidth = index === selected ? 3 : 2;
        ctx.strokeStyle = index === selected ? "#3b82f6" : "#22c55e";

        ctx.font = "16px sans-serif";
ctx.fillStyle = "yellow";
ctx.strokeStyle = "black";
ctx.lineWidth = 3;

const label = `${ann.class} (${ann.type})`;

// Para bbox
if (ann.type === "bbox") {
  const [x1, y1] = ann.bbox;
  ctx.strokeText(label, x1, y1 - 5);
  ctx.fillText(label, x1, y1 - 5);
}

// Para obb / seg / pose (usamos primer punto)
if (ann.type !== "bbox") {
  const [lx, ly] = ann.points[0];
  ctx.strokeText(label, lx, ly - 8);
  ctx.fillText(label, lx, ly - 8);
}

        if (ann.type === "bbox") {
          const [x1, y1, x2, y2] = ann.bbox;
          ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
          return;
        }

        // polygon-based annotations
        const pts = ann.points;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        pts.forEach((p) => ctx.lineTo(p[0], p[1]));
        if (ann.type !== "pose") ctx.closePath();
        ctx.stroke();

        // points
        pts.forEach(([x, y]) => {
          ctx.fillStyle = "red";
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        });
        if (ann.type === "seg") {
  ctx.fillStyle = "rgba(255, 165, 0, 0.25)"; // naranja semi-transparente
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  pts.forEach((p) => ctx.lineTo(p[0], p[1]));
  ctx.closePath();
  ctx.fill();
}

      });

      // draw temp shape (pyqt style)
      if (tempPoints.length > 0) {
        ctx.strokeStyle = "#f59e0b";
        ctx.beginPath();
        ctx.moveTo(tempPoints[0][0], tempPoints[0][1]);
        tempPoints.forEach((p) => ctx.lineTo(p[0], p[1]));
        ctx.stroke();

        tempPoints.forEach(([x, y]) => {
          ctx.fillStyle = "#f59e0b";
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    };
  }, [imgUrl, anns, selected, tempPoints, zoom, offset]);

  // ---------------------------------------
  // MOUSE DOWN
  // ---------------------------------------
  const onMouseDown = (e: any) => {
    if (isPanning) {
      setPanStart([e.clientX, e.clientY]);
      return;
    }

    const [x, y] = screenToImage(e);

    // check if clicking on a point
    for (let i = anns.length - 1; i >= 0; i--) {
      const ann = anns[i];

      if (ann.type === "bbox") {
        const [x1, y1, x2, y2] = ann.bbox;
        if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
          setSelected(i);
          setDragging({ annIndex: i, pointIndex: "all", offset: [x - x1, y - y1] });
          return;
        }
      }

      if (ann.type !== "bbox") {
        // point drag?
        for (let p = 0; p < ann.points.length; p++) {
          const [px, py] = ann.points[p];
          if (Math.hypot(px - x, py - y) < 10 / zoom) {
            setSelected(i);
            setDragging({
              annIndex: i,
              pointIndex: p,
              offset: [px - x, py - y],
            });
            return;
          }
        }

        // polygon drag?
        if (pointInPolygon([x, y], ann.points)) {
          setSelected(i);
          setDragging({
            annIndex: i,
            pointIndex: "all",
            offset: [x, y],
          });
          return;
        }
      }
    }

    // start new shape
    setSelected(null);

    if (mode === "bbox" || mode === "obb") {
      setTempPoints([[x, y]]);
    } else {
      setTempPoints((prev) => [...prev, [x, y]]);
    }
  };

  // ---------------------------------------
  // MOUSE MOVE
  // ---------------------------------------
  const onMouseMove = (e: any) => {
    if (dragging) {
      const [x, y] = screenToImage(e);

      setAnns((prev) => {
        const copy = [...prev];
        const ann = { ...copy[dragging.annIndex] } as any;

        if (dragging.pointIndex === "all") {
          const dx = x - dragging.offset[0];
          const dy = y - dragging.offset[1];

          ann.points = ann.points.map(([px, py]: Point) => [
            px + dx,
            py + dy,
          ]);

          dragging.offset = [x, y];
        } else {
          const pts = [...ann.points];
          pts[dragging.pointIndex] = [
            x + dragging.offset[0],
            y + dragging.offset[1],
          ];
          ann.points = pts;
        }

        copy[dragging.annIndex] = ann;
        return copy;
      });

      return;
    }

    if (tempPoints.length > 0 && (mode === "bbox" || mode === "obb")) {
      const [x, y] = screenToImage(e);
      const first = tempPoints[0];
      setTempPoints([first, [x, y]]);
    }

    if (isPanning && panStart) {
      const dx = (e.clientX - panStart[0]) / zoom;
      const dy = (e.clientY - panStart[1]) / zoom;
      setOffset(([ox, oy]) => [ox + dx, oy + dy]);
      setPanStart([e.clientX, e.clientY]);
    }
  };

  // ---------------------------------------
  // MOUSE UP (finalize shapes)
  // ---------------------------------------
  const onMouseUp = (e: any) => {
    if (dragging) {
      setDragging(null);
      return;
    }

    if (mode === "seg") {
      if (e.button === 2 && tempPoints.length >= 3) {
        // RIGHT CLICK: close polygon
        const ann: Seg = { type: "seg", class: currentClass, points: tempPoints };
        setAnns((prev) => [...prev, ann]);
        setTempPoints([]);
      }
      return;
    }

    if (mode === "pose") {
      if (e.button === 2 && tempPoints.length >= 1) {
        const ann: Pose = { type: "pose", class: currentClass, points: tempPoints };
        setAnns((prev) => [...prev, ann]);
        setTempPoints([]);
      }
      return;
    }

    // bbox/obb
    if (tempPoints.length === 2) {
      const [p1, p2] = tempPoints;

      if (mode === "bbox") {
        const ann: BBox = {
          type: "bbox",
          class: currentClass,
          bbox: [p1[0], p1[1], p2[0], p2[1]],
        };
        setAnns((prev) => [...prev, ann]);
      }

      if (mode === "obb") {
        const pts: Point[] = [
          p1,
          [p2[0], p1[1]],
          p2,
          [p1[0], p2[1]],
        ];

        const angle =
          Math.atan2(pts[1][1] - pts[0][1], pts[1][0] - pts[0][0]) * (180 / Math.PI);

        const ann: OBB = {
          type: "obb",
          class: currentClass,
          points: pts,
          angle,
        };

        setAnns((prev) => [...prev, ann]);
      }

      setTempPoints([]);
    }
  };

  // ---------------------------------------
  // SAVE / DELETE / EXPORT
  // ---------------------------------------
  const save = async () => {
    await saveAnnotations(assetId, anns);
    alert("Guardado");
  };

  const deleteSelected = () => {
    if (selected == null) return;
    setAnns((prev) => prev.filter((_, i) => i !== selected));
    setSelected(null);
  };

  const downloadJSON = async () => {
    const d = await exportManualJson(assetId);
    const blob = new Blob([JSON.stringify(d, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = d.image + ".json";
    a.click();
  };

  const downloadYOLO = async () => {
    const d = await exportManualYolo(assetId);
    const blob = new Blob([d.content], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = d.filename;
    a.click();
  };

  // ---------------------------------------
  // UI
  // ---------------------------------------
  if (loading) return <div className="p-6">Cargando…</div>;

  return (
    <main className="min-h-screen bg-background p-6"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="grid grid-cols-4 gap-6">

        {/* LEFT PANEL */}
        <div className="col-span-3 space-y-3">

          <div className="flex gap-3 items-center">

            <select
              className="border p-2 rounded"
              value={mode}
              onChange={(e) => setMode(e.target.value as any)}
            >
              <option value="bbox">BBox</option>
              <option value="obb">OBB</option>
              <option value="seg">Seg</option>
              <option value="pose">Pose</option>
            </select>

            <select
              className="border p-2 rounded"
              value={currentClass}
              onChange={(e) => setCurrentClass(e.target.value)}
            >
              {DEFAULT_CLASSES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            {selected !== null && (
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={deleteSelected}
              >
                Borrar
              </button>
            )}

            <button onClick={save} className="px-3 py-1 bg-primary rounded">
              Guardar
            </button>
            <button onClick={downloadJSON} className="px-3 py-1 bg-secondary rounded">
              Export JSON
            </button>
            <button onClick={downloadYOLO} className="px-3 py-1 bg-secondary rounded">
              Export YOLO
            </button>
          </div>

          {/* CANVAS */}
          <div
            className="border rounded overflow-auto"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onWheel={(e) => {
              const delta = e.deltaY > 0 ? -0.1 : 0.1;
              setZoom((z) => Math.max(0.1, z + delta));
            }}
            onMouseLeave={() => setDragging(null)}
          >
            <canvas
              ref={canvasRef}
              className="cursor-crosshair"
              width={imgSize.w}
              height={imgSize.h}
            />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="border-l pl-4 space-y-3">
          <h2 className="font-semibold mb-2">Anotaciones</h2>

          {anns.map((ann, i) => (
            <div
              key={i}
              className={`p-2 border rounded cursor-pointer ${
                i === selected ? "bg-primary/20" : ""
              }`}
              onClick={() => setSelected(i)}
            >
              <b>#{i}</b> — {ann.type} — {ann.class}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
