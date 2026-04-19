import { useEffect, useRef, useState } from 'react';

/**
 * High-DPI bar chart with crisp rendering — no external dependency.
 * Props:
 *   data:   [{ label, value, color? }]
 *   title:  string
 *   height: number (CSS height, default 240)
 */
export default function ChartComponent({ data = [], title, height = 240 }) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  // Observe container size for responsiveness
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const obs = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect;
      setDims({ w: Math.floor(width), h: height });
    });
    obs.observe(wrapper);
    return () => obs.disconnect();
  }, [height]);

  // Render the chart on a hi-DPI canvas
  useEffect(() => {
    if (!canvasRef.current || !data.length || !dims.w) return;
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    const W = dims.w;
    const H = dims.h;

    // Scale canvas for crisp rendering
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const max     = Math.max(...data.map(d => d.value), 1);
    const padLeft = 64;
    const padBot  = 48;
    const padTop  = 24;
    const chartW  = W - padLeft - 20;
    const chartH  = H - padBot - padTop;
    const barGap  = 8;
    const barW    = Math.max(16, Math.floor((chartW / data.length) - barGap));

    // Grid lines + Y-axis labels
    const steps = [0, 0.25, 0.5, 0.75, 1];
    ctx.textBaseline = 'middle';
    steps.forEach(f => {
      const y = padTop + chartH * (1 - f);
      ctx.strokeStyle = '#1e2a3d';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(W - 10, y);
      ctx.stroke();

      ctx.fillStyle = '#6b7a90';
      ctx.font = '11px "DM Mono", monospace';
      ctx.textAlign = 'right';
      const label = max * f;
      ctx.fillText(label >= 1000 ? Math.round(label / 1000) + 'k' : Math.round(label), padLeft - 10, y);
    });

    // Bars
    data.forEach((d, i) => {
      const barH  = Math.max(2, (d.value / max) * chartH);
      const x     = padLeft + i * (barW + barGap);
      const y     = padTop + chartH - barH;
      const color = d.color || '#4f8eff';

      // Bar gradient
      const grad = ctx.createLinearGradient(0, y, 0, y + barH);
      grad.addColorStop(0, color);
      grad.addColorStop(1, color + '44');
      ctx.fillStyle = grad;

      // Rounded top bar
      const r = Math.min(4, barW / 4);
      ctx.beginPath();
      ctx.moveTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.lineTo(x + barW - r, y);
      ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
      ctx.lineTo(x + barW, y + barH);
      ctx.lineTo(x, y + barH);
      ctx.closePath();
      ctx.fill();

      // Hover glow
      ctx.shadowColor = color + '33';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      const cx = x + barW / 2;

      // Value label above bar
      ctx.fillStyle = '#e0e8f8';
      ctx.font = 'bold 10px "DM Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      const valStr = d.value >= 100000
        ? (d.value / 100000).toFixed(1) + 'L'
        : d.value >= 1000
        ? (d.value / 1000).toFixed(1) + 'k'
        : String(d.value);
      ctx.fillText(valStr, cx, y - 4);

      // X-axis label
      ctx.fillStyle = '#8892a4';
      ctx.font = '10px "DM Sans", sans-serif';
      ctx.textBaseline = 'top';
      const maxLen = Math.max(6, Math.floor(barW / 6));
      const lbl = d.label.length > maxLen ? d.label.slice(0, maxLen) + '…' : d.label;
      ctx.fillText(lbl, cx, H - padBot + 8);
    });
  }, [data, dims]);

  if (!data.length) {
    return (
      <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
        No data available
      </div>
    );
  }

  return (
    <div ref={wrapperRef} style={{ width: '100%' }}>
      {title && (
        <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 14, color: 'var(--text-secondary)' }}>
          {title}
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
}