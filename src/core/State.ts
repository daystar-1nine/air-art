export const state = {
  color: '#b48aff',
  baseBrushSize: 10,
  brushSize: 10,
  brushType: 'solid' as 'solid' | 'neon' | 'spray' | 'calligraphy',
  erasing: false,
  drawing: false,
  prevX: null as number | null,
  prevY: null as number | null,
  smoothedX: null as number | null,
  smoothedY: null as number | null,
  lastActionTime: 0,
  
  // Canvas Transform
  scale: 1,
  offsetX: 0,
  offsetY: 0,
};
