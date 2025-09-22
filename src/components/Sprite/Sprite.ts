interface SpriteProps {
  position: {
    x: number;
    y: number;
  };
  velocity?: {
    x: number;
    y: number;
  };
  image?: HTMLImageElement;
}

type DrawImageProps =
  | { image: CanvasImageSource; dx: number; dy: number }
  | { image: CanvasImageSource; dx: number; dy: number; dw: number; dh: number }
  | {
      image: CanvasImageSource;
      sx: number;
      sy: number;
      sw: number;
      sh: number;
      dx: number;
      dy: number;
      dw: number;
      dh: number;
    };
export class Sprite {
  props: SpriteProps;
  constructor(props: SpriteProps) {
    this.props = props;
  }

  draw({
    ctx,
    drawImageProps,
  }: {
    ctx: CanvasRenderingContext2D;
    drawImageProps?: DrawImageProps;
  }): void {
    if (!this.props.image || !drawImageProps) {
      return;
    }

    const image = drawImageProps.image ?? this.props.image;
    const dx = drawImageProps.dx ?? this.props.position.x;
    const dy = drawImageProps.dy ?? this.props.position.y;
    const dw = "dw" in drawImageProps ? drawImageProps.dw : undefined;
    const dh = "dh" in drawImageProps ? drawImageProps.dh : undefined;
    const sx = "sx" in drawImageProps ? drawImageProps.sx : undefined;
    const sy = "sy" in drawImageProps ? drawImageProps.sy : undefined;
    const sw = "sw" in drawImageProps ? drawImageProps.sw : undefined;
    const sh = "sh" in drawImageProps ? drawImageProps.sh : undefined;

    if (
      sx !== undefined &&
      sy !== undefined &&
      sw !== undefined &&
      sh !== undefined &&
      dw !== undefined &&
      dh !== undefined
    ) {
      console.log("drawImage with sx, sy, sw, sh, dw and dh");
      ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
      return;
    }
    if (dw !== undefined && dh !== undefined) {
      console.log("drawImage with dw and dh");
      ctx.drawImage(image, dx, dy, dw, dh);
      return;
    }

    console.log("drawImage with dx and dy");
    ctx.drawImage(image, dx, dy);
  }
}
