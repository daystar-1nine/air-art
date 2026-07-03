import type { Hands, Results } from '@mediapipe/hands';
import type { Camera } from '@mediapipe/camera_utils';

declare global {
  interface Window {
    Hands: typeof Hands;
    Camera: typeof Camera;
  }
}

export class HandTracker {
  private hands: Hands;
  private camera: Camera | null = null;

  constructor(private videoElement: HTMLVideoElement, private onResults: (results: Results) => void) {
    this.hands = new window.Hands({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    this.hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.75,
      minTrackingConfidence: 0.75,
    });

    this.hands.onResults(this.onResults);
  }

  public async start(): Promise<void> {
    this.camera = new window.Camera(this.videoElement, {
      onFrame: async () => {
        await this.hands.send({ image: this.videoElement });
      },
      width: 1280,
      height: 720,
    });

    return this.camera.start();
  }
}
