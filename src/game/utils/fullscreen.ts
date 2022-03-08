import { FsDocument, FsDocumentElement } from 'types';

export function isFullScreen(): boolean {
  const fsDoc = <FsDocument>document;

  return !!(
    fsDoc.fullscreenElement
    || fsDoc.mozFullScreenElement
    || fsDoc.webkitFullscreenElement
    || fsDoc.msFullscreenElement
  );
}

export function toggleFullScreen(): void {
  const fsDoc = <FsDocument>document;

  if (!isFullScreen()) {
    const fsDocElem = <FsDocumentElement>document.documentElement;

    if (fsDocElem.requestFullscreen) fsDocElem.requestFullscreen();
    else if (fsDocElem.msRequestFullscreen) fsDocElem.msRequestFullscreen();
    else if (fsDocElem.mozRequestFullScreen) fsDocElem.mozRequestFullScreen();
    else if (fsDocElem.webkitRequestFullscreen) fsDocElem.webkitRequestFullscreen();
    console.log('requestFullscreen');
  } else {
    if (fsDoc.exitFullscreen) fsDoc.exitFullscreen();
    else if (fsDoc.msExitFullscreen) fsDoc.msExitFullscreen();
    else if (fsDoc.mozCancelFullScreen) fsDoc.mozCancelFullScreen();
    else if (fsDoc.webkitExitFullscreen) fsDoc.webkitExitFullscreen();
    console.log('exitFullscreen');
  }
}

export function setFullScreen(full: boolean): void {
  if (full !== isFullScreen()) toggleFullScreen();
}
