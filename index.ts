import { fromEvent, range, from } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';

//emit 1-10 in sequence
const setting = {
  element: {
    dynamicDownload: null as HTMLElement
  }
};
let text = '';

function dynamicDownloadTxt(res) {
  dyanmicDownloadByHtmlTag({
    fileName: 'tiennghich.txt',
    text: res
  });
}

function generate(fromValue, to) {
  const arr = Array.from(Array(to + 1).keys()).filter(i => i >= fromValue);

  return from(arr).pipe(
    map(
      (val: number) =>
        `https://ia801403.us.archive.org/10/items/tien-nghich-full/tien-nghich-tap-${val}.mp3`
    ),
    toArray(),
    map((val: Array<string>) => val.join('\n'))
  );
}

function dyanmicDownloadByHtmlTag(arg: { fileName: string; text: string }) {
  if (!setting.element.dynamicDownload) {
    setting.element.dynamicDownload = document.createElement('a');
  }
  const element = setting.element.dynamicDownload;
  const fileType =
    arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
  element.setAttribute(
    'href',
    `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`
  );
  element.setAttribute('download', arg.fileName);

  var event = new MouseEvent('click');
  element.dispatchEvent(event);
}

fromEvent(document.getElementById('download'), 'click')
  .pipe(
    switchMap(val => {
      return generate(350, 370);
    })
  )
  .subscribe(res => {
    dynamicDownloadTxt(res);
  });
