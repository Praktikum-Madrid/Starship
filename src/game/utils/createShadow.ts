export default function createShadowForImage(ctx: CanvasRenderingContext2D, drawImageCallback: () => void) {
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 60;
  ctx.shadowColor = '#00000090'; // устанавливаем тень для холста, которая добавится ко всем отрисованным в дальнейшем картинкам
  ctx.shadowBlur = 30;
  drawImageCallback(); // рисуем картинку
  ctx.shadowColor = '#00000000'; // устанавливаем прозрачную тень для холста, чтобы дальнейшие отрисованные картинки были без тени
}
