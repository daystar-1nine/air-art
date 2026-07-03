import { state } from './State';
import { CanvasRenderer } from './CanvasRenderer';

export class UIManager {
  private palette: HTMLElement;
  private colorPicker: HTMLInputElement;
  private brushSlider: HTMLInputElement;
  private sizeLabel: HTMLElement;
  private eraserBtn: HTMLButtonElement;
  private clearBtn: HTMLButtonElement;
  private saveBtn: HTMLButtonElement;
  private imageUpload: HTMLInputElement;
  private referenceImg: HTMLImageElement;
  private brushTypeSelect: HTMLSelectElement;
  private manualBtn: HTMLButtonElement;
  private manualModal: HTMLElement;
  private closeManualBtn: HTMLButtonElement;
  private cursorDot: HTMLElement;
  private statusEl: HTMLElement;
  private paintCanvas: HTMLElement;

  constructor(private renderer: CanvasRenderer) {
    this.palette = document.getElementById('palette')!;
    this.colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
    this.brushSlider = document.getElementById('brushSize') as HTMLInputElement;
    this.sizeLabel = document.getElementById('sizeLabel')!;
    this.eraserBtn = document.getElementById('eraserBtn') as HTMLButtonElement;
    this.clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;
    this.saveBtn = document.getElementById('saveBtn') as HTMLButtonElement;
    this.imageUpload = document.getElementById('imageUpload') as HTMLInputElement;
    this.referenceImg = document.getElementById('referenceImg') as HTMLImageElement;
    this.brushTypeSelect = document.getElementById('brushType') as HTMLSelectElement;
    this.manualBtn = document.getElementById('manualBtn') as HTMLButtonElement;
    this.manualModal = document.getElementById('manualModal')!;
    this.closeManualBtn = document.getElementById('closeManualBtn') as HTMLButtonElement;
    this.cursorDot = document.getElementById('cursorDot')!;
    this.statusEl = document.getElementById('status')!;
    this.paintCanvas = document.getElementById('paintCanvas')!;

    this.bindEvents();
  }

  private bindEvents() {
    this.palette.addEventListener('click', (e) => {
      const swatch = (e.target as HTMLElement).closest('.swatch') as HTMLElement;
      if (!swatch) return;
      document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      state.color = swatch.dataset.color || '#ffffff';
      this.colorPicker.value = state.color;
      state.erasing = false;
      this.updateEraserUI();
    });

    this.colorPicker.addEventListener('input', (e) => {
      state.color = (e.target as HTMLInputElement).value;
      document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
      state.erasing = false;
      this.updateEraserUI();
    });

    this.brushSlider.addEventListener('input', (e) => {
      state.baseBrushSize = +(e.target as HTMLInputElement).value;
      this.sizeLabel.textContent = state.baseBrushSize.toString();
    });

    this.eraserBtn.addEventListener('click', () => {
      state.erasing = !state.erasing;
      this.updateEraserUI();
    });

    this.clearBtn.addEventListener('click', () => {
      this.renderer.clear();
    });

    this.saveBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'finger-painting.png';
      link.href = this.renderer.getCanvas().toDataURL('image/png');
      link.click();
    });

    this.imageUpload.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        this.referenceImg.src = url;
        this.referenceImg.style.display = 'block';
      }
    });

    this.brushTypeSelect.addEventListener('change', (e) => {
      state.brushType = (e.target as HTMLSelectElement).value as any;
    });

    this.manualBtn.addEventListener('click', () => {
      this.manualModal.classList.remove('hidden');
    });

    this.closeManualBtn.addEventListener('click', () => {
      this.manualModal.classList.add('hidden');
    });
  }

  public updateEraserUI() {
    this.eraserBtn.style.background = state.erasing ? 'var(--accent)' : '';
    this.eraserBtn.style.color = state.erasing ? '#0d0d12' : '';
  }

  public hideStatus() {
    this.statusEl.classList.add('hidden');
  }

  public showStatusError(title: string, message: string) {
    const h2 = this.statusEl.querySelector('h2');
    const p = this.statusEl.querySelector('p');
    if (h2) h2.textContent = title;
    if (p) p.textContent = message;
  }

  public updateCursor(x: number, y: number, isPinching: boolean, isVisible: boolean) {
    if (!isVisible) {
      this.cursorDot.style.display = 'none';
      return;
    }
    this.cursorDot.style.left = `${x}px`;
    this.cursorDot.style.top = `${y}px`;
    this.cursorDot.style.display = 'block';
    this.cursorDot.style.background = state.erasing ? 'rgba(255,255,255,0.3)' : state.color;
    this.cursorDot.style.borderColor = isPinching ? 'rgba(255,255,255,0.4)' : '#fff';
    
    // Scale the cursor based on dynamic brush size
    const size = Math.max(8, state.brushSize);
    this.cursorDot.style.width = `${size}px`;
    this.cursorDot.style.height = `${size}px`;
  }

  public triggerAirClick(localX: number, localY: number) {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;
    
    const rect = mainEl.getBoundingClientRect();
    const globalX = rect.left + localX;
    const globalY = rect.top + localY;

    // Temporarily hide cursorDot so it doesn't block elementFromPoint
    const wasVisible = this.cursorDot.style.display;
    this.cursorDot.style.display = 'none';
    
    const el = document.elementFromPoint(globalX, globalY) as HTMLElement;
    this.cursorDot.style.display = wasVisible;

    if (el) {
      el.click();
      const originalTransition = el.style.transition;
      const originalTransform = el.style.transform;
      el.style.transition = 'transform 0.1s';
      el.style.transform = 'scale(0.9)';
      setTimeout(() => {
        el.style.transition = originalTransition;
        el.style.transform = originalTransform;
      }, 150);
    }
  }

  public updateTransform() {
    const transformStr = `translate(${state.offsetX}px, ${state.offsetY}px) scale(${state.scale})`;
    this.paintCanvas.style.transform = transformStr;
    this.referenceImg.style.transform = transformStr;
    // We shouldn't transform the webcam, it serves as the static tracking reference
  }
}
