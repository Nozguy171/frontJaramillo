"use client";

type OBBDet = {
  class?: string;
  score?: number;
  quad?: [number, number][];                  
  xywhr?: [number, number, number, number, number]; 
  aabb?: [number, number, number, number];   
  iou_with_det?: number;
};

type OBB = {
  center?: [number, number];
  size?: [number, number];
  angle?: number;                          
  box?: [number, number][];                  
};

type Pose = {
  kpts: [number, number, number][];      
  bbox_from_kpts?: [number, number, number, number];
};

export default function ObjectExtras({ o }: { o: any }) {

  const obb: OBB | null = (o?.obb as OBB) || null;
  const obbDet: OBBDet | null = (o?.obb_det as OBBDet) || null;

  const quad: [number, number][] | null =
    (obb?.box as [number, number][]) ||
    (obbDet?.quad as [number, number][]) ||
    null;

  const angleRaw =
    (typeof obb?.angle === "number" ? obb.angle : null) ??
    (Array.isArray(obbDet?.xywhr) ? obbDet!.xywhr![4] : null);

  let angleDeg: number | null = null;
  if (typeof angleRaw === "number") {
    angleDeg = Math.abs(angleRaw) <= Math.PI * 2 ? (angleRaw * 180) / Math.PI : angleRaw;
  }

  const size =
    (obb?.size as [number, number]) ??
    (Array.isArray(obbDet?.xywhr)
      ? ([obbDet!.xywhr![2], obbDet!.xywhr![3]] as [number, number])
      : null);

  const center =
    (obb?.center as [number, number]) ??
    (Array.isArray(obbDet?.xywhr)
      ? ([obbDet!.xywhr![0], obbDet!.xywhr![1]] as [number, number])
      : null);

  const aabb =
    (obbDet?.aabb as [number, number, number, number]) ||
    (o?.bbox as [number, number, number, number]) ||
    null;

  const OBBMini = () => {
    if (!quad || !aabb) return null;
    const [x1, y1, x2, y2] = aabb;
    const w = Math.max(1, x2 - x1);
    const h = Math.max(1, y2 - y1);
    const toLocal = (p: [number, number]) => {
      const lx = ((p[0] - x1) / w) * 64;
      const ly = ((p[1] - y1) / h) * 64;
      return [lx, ly] as [number, number];
    };
    const pts = quad.map(toLocal);
    const d = `M ${pts[0][0]},${pts[0][1]} L ${pts[1][0]},${pts[1][1]} L ${pts[2][0]},${pts[2][1]} L ${pts[3][0]},${pts[3][1]} Z`;
    return (
      <svg viewBox="0 0 64 64" className="w-16 h-16 rounded border border-black/10 bg-white">
        <path d={d} fill="none" stroke="#f59e0b" strokeWidth={2} />
      </svg>
    );
  };

  const pose: Pose | null = (o?.pose as Pose) || null;
  const kpts = Array.isArray(pose?.kpts) ? pose!.kpts : null;
  const kptsAabb =
    (pose?.bbox_from_kpts as [number, number, number, number]) ||
    (kpts && kpts.length
      ? ([
          Math.min(...kpts.map((p) => p[0])),
          Math.min(...kpts.map((p) => p[1])),
          Math.max(...kpts.map((p) => p[0])),
          Math.max(...kpts.map((p) => p[1])),
        ] as [number, number, number, number])
      : null);

  const PoseMini = () => {
    if (!kpts || !kpts.length || !kptsAabb) return null;
    const [x1, y1, x2, y2] = kptsAabb;
    const w = Math.max(1, x2 - x1);
    const h = Math.max(1, y2 - y1);
    const toLocal = (p: [number, number, number]) => {
      const lx = ((p[0] - x1) / w) * 64;
      const ly = ((p[1] - y1) / h) * 64;
      return [lx, ly] as [number, number];
    };
    const pts = kpts.map(toLocal);
    return (
      <svg viewBox="0 0 64 64" className="w-16 h-16 rounded border border-black/10 bg-white">
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2.2} fill="#10b981" />
        ))}
      </svg>
    );
  };

  const hasOBB = !!(quad || size || center || typeof angleDeg === "number" || obbDet);
  const hasPose = !!(kpts && kpts.length);

  if (!hasOBB && !hasPose) return null;

  return (
    <div className="mt-2 grid grid-cols-[auto,1fr] gap-x-3 gap-y-1 text-xs text-slate-700">
      {hasOBB && (
        <>
          <div className="col-span-2 font-semibold text-slate-800">OBB</div>
          <div className="row-span-3">
            <OBBMini />
          </div>
          <div>
            {typeof angleDeg === "number" && (
              <div>
                <span className="text-slate-500">ángulo:&nbsp;</span>
                {angleDeg.toFixed(1)}°
              </div>
            )}
            {size && (
              <div>
                <span className="text-slate-500">tamaño:&nbsp;</span>
                {size[0].toFixed(1)}×{size[1].toFixed(1)}
              </div>
            )}
            {center && (
              <div>
                <span className="text-slate-500">centro:&nbsp;</span>
                ({center[0].toFixed(1)}, {center[1].toFixed(1)})
              </div>
            )}
            {typeof obbDet?.iou_with_det === "number" && (
              <div>
                <span className="text-slate-500">IoU:&nbsp;</span>
                {(obbDet.iou_with_det * 100).toFixed(1)}%
              </div>
            )}
            {obbDet?.class && (
              <div>
                <span className="text-slate-500">best_obb:&nbsp;</span>
                {obbDet.class} {obbDet.score ? `(${(obbDet.score * 100).toFixed(0)}%)` : ""}
              </div>
            )}
          </div>
        </>
      )}

      {hasPose && (
        <>
          <div className="col-span-2 mt-2 font-semibold text-slate-800">Pose</div>
          <div className="row-span-2">
            <PoseMini />
          </div>
          <div>
            <div>
              <span className="text-slate-500">kpts:&nbsp;</span>
              {kpts?.length}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
