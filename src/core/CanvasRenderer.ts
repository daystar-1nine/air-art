import { state } from './State';

export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  
  // Undo/Redo history
  private history: ImageData[] = [];
  private historyIndex: number = -1;
  private readonly MAX_HISTORY = 10;
  private isDrawingLine = false;

  private currentStrokePoints: {x: number, y: number}[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true })!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    
    // Initial blank state
    this.saveState();
  }

  private resizeCanvas() {
    const img = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.ctx.putImageData(img, 0, 0);
  }

  public clear() {
    this.ctx.resetTransform();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.saveState();
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  // ---- Undo / Redo ----
  
  public saveState() {
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    
    this.history.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));
    
    if (this.history.length > this.MAX_HISTORY) {
      this.history.shift();
    } else {
      this.historyIndex++;
    }
  }

  public undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.ctx.putImageData(this.history[this.historyIndex], 0, 0);
    }
  }

  public redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.ctx.putImageData(this.history[this.historyIndex], 0, 0);
    }
  }

  // ---- Drawing ----

  public beginStroke() {
    this.isDrawingLine = true;
    this.currentStrokePoints = [];
  }

  public endStroke() {
    if (this.isDrawingLine) {
      this.isDrawingLine = false;
      this.detectAndDrawShape();
      this.saveState();
    }
    state.prevX = null;
    state.prevY = null;
    state.smoothedX = null;
    state.smoothedY = null;
    this.currentStrokePoints = [];
  }

  private detectAndDrawShape() {
    if (this.currentStrokePoints.length < 20 || state.erasing) return;
    
    const pts = this.currentStrokePoints;
    const start = pts[0];
    const end = pts[pts.length - 1];
    
    // Check if stroke is closed
    const distToStart = Math.hypot(start.x - end.x, start.y - end.y);
    if (distToStart > 50) return; // not closed
    
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    pts.forEach(p => {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
    });
    
    const width = maxX - minX;
    const height = maxY - minY;
    
    if (width < 30 || height < 30) return;
    
    const centerX = minX + width / 2;
    const centerY = minY + height / 2;
    
    // Circle check (rough radius variance)
    let radiusSum = 0;
    pts.forEach(p => radiusSum += Math.hypot(p.x - centerX, p.y - centerY));
    const avgRadius = radiusSum / pts.length;
    
    let variance = 0;
    pts.forEach(p => variance += Math.abs(Math.hypot(p.x - centerX, p.y - centerY) - avgRadius));
    const avgVariance = variance / pts.length;
    
    if (avgVariance / avgRadius < 0.15 && Math.abs(width - height) < width * 0.3) {
      // It's a circle!
      this.undo(); // Undo the rough stroke
      this.applyTransform();
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.strokeStyle = state.color;
      this.ctx.lineWidth = state.brushSize;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, avgRadius, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.resetTransform();
      return;
    }
    
    // Rectangle check (rough edge variance)
    // For simplicity, if it's closed but not a circle, we can assume it's a rectangle
    // if the bounding box fits well.
    let outOfBoxCount = 0;
    pts.forEach(p => {
      const distToEdge = Math.min(
        Math.abs(p.x - minX), Math.abs(p.x - maxX),
        Math.abs(p.y - minY), Math.abs(p.y - maxY)
      );
      if (distToEdge > Math.max(width, height) * 0.2) outOfBoxCount++;
    });
    
    if (outOfBoxCount / pts.length < 0.2) {
      // It's a rectangle!
      this.undo();
      this.applyTransform();
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.strokeStyle = state.color;
      this.ctx.lineWidth = state.brushSize;
      this.ctx.lineJoin = 'miter';
      this.ctx.strokeRect(minX, minY, width, height);
      this.ctx.resetTransform();
    }
  }

  private applyTransform() {
    this.ctx.resetTransform();
    // Offset is from center of canvas for scaling
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;
    
    this.ctx.translate(cx + state.offsetX, cy + state.offsetY);
    this.ctx.scale(state.scale, state.scale);
    this.ctx.translate(-cx, -cy);
  }

  public drawStroke(rawX: number, rawY: number) {
    if (!this.isDrawingLine) {
      this.beginStroke();
    }
    
    // EMA Smoothing
    const smoothingFactor = 0.4;
    
    if (state.smoothedX === null || state.smoothedY === null) {
      state.smoothedX = rawX;
      state.smoothedY = rawY;
    } else {
      state.smoothedX = state.smoothedX + smoothingFactor * (rawX - state.smoothedX);
      state.smoothedY = state.smoothedY + smoothingFactor * (rawY - state.smoothedY);
    }
    
    // Inverse transform to get logical coordinates
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;
    const logicalX = ((state.smoothedX - cx - state.offsetX) / state.scale) + cx;
    const logicalY = ((state.smoothedY - cy - state.offsetY) / state.scale) + cy;
    
    this.currentStrokePoints.push({ x: logicalX, y: logicalY });

    this.applyTransform();

    this.ctx.globalCompositeOperation = state.erasing ? 'destination-out' : 'source-over';
    this.ctx.strokeStyle = state.erasing ? 'rgba(0,0,0,1)' : state.color;
    this.ctx.fillStyle = state.color;
    
    // Reset shadow
    this.ctx.shadowBlur = 0;
    this.ctx.shadowColor = 'transparent';

    if (state.erasing || state.brushType === 'solid') {
      this.ctx.lineWidth = state.brushSize;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.beginPath();
      if (state.prevX !== null && state.prevY !== null) {
        this.ctx.moveTo(state.prevX, state.prevY);
        this.ctx.lineTo(logicalX, logicalY);
      } else {
        this.ctx.arc(logicalX, logicalY, state.brushSize / 2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.moveTo(logicalX, logicalY);
      }
      this.ctx.stroke();
    } 
    else if (state.brushType === 'neon') {
      this.ctx.lineWidth = state.brushSize;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.shadowBlur = state.brushSize * 2;
      this.ctx.shadowColor = state.color;
      this.ctx.strokeStyle = '#ffffff'; // white core
      this.ctx.beginPath();
      if (state.prevX !== null && state.prevY !== null) {
        this.ctx.moveTo(state.prevX, state.prevY);
        this.ctx.lineTo(logicalX, logicalY);
      } else {
        this.ctx.arc(logicalX, logicalY, state.brushSize / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.stroke();
      
      // Secondary stroke for extra glow
      this.ctx.strokeStyle = state.color;
      this.ctx.lineWidth = state.brushSize * 1.5;
      this.ctx.shadowBlur = state.brushSize * 4;
      this.ctx.stroke();
    }
    else if (state.brushType === 'spray') {
      const radius = state.brushSize * 1.5;
      const density = Math.floor(state.brushSize * 1.5);
      for (let i = 0; i < density; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * radius;
        const dotX = logicalX + Math.cos(angle) * r;
        const dotY = logicalY + Math.sin(angle) * r;
        this.ctx.globalAlpha = Math.random() * 0.5 + 0.1;
        this.ctx.fillRect(dotX, dotY, 1.5, 1.5);
      }
      this.ctx.globalAlpha = 1.0; // reset
    }
    else if (state.brushType === 'calligraphy') {
      this.ctx.lineWidth = 2; // thin edge
      this.ctx.beginPath();
      if (state.prevX !== null && state.prevY !== null) {
        // Draw angled line between prev and current
        const angle = Math.PI / 4; // 45 degree nib
        const width = state.brushSize;
        const dx = Math.cos(angle) * width;
        const dy = Math.sin(angle) * width;
        
        this.ctx.moveTo(state.prevX - dx, state.prevY - dy);
        this.ctx.lineTo(logicalX - dx, logicalY - dy);
        this.ctx.lineTo(logicalX + dx, logicalY + dy);
        this.ctx.lineTo(state.prevX + dx, state.prevY + dy);
        this.ctx.closePath();
        this.ctx.fill();
      }
    }

    this.ctx.resetTransform();
    
    state.prevX = logicalX;
    state.prevY = logicalY;
  }
}
