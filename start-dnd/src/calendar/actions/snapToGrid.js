export default function snapToGrid(x, y, widthPX) {
  const nextX = Math.round(x * widthPX);
  const nextTop = Math.round(y / 100) * 100;

  return {
    nextTop: nextTop > 0 ? nextTop : 0,
    nextX
  };
}
