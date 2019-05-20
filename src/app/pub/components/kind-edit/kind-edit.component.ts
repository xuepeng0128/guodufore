import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subject} from 'rxjs';
declare  var KindEditor: any;
@Component({
  selector: 'app-kind-edit',
  templateUrl: './kind-edit.component.html',
  styleUrls: ['./kind-edit.component.css']
})
export class KindEditComponent implements OnInit, OnChanges {
 @Input() editOrder$: Subject<{order: string; htmlContent: string}> = new Subject<{order: string; htmlContent: string}>();
 @Output() onHtmlTextChanged: EventEmitter<string> = new EventEmitter<string>();
  edit: any;
  constructor() {


  }

  ngOnInit() {

    KindEditor.ready( (K) => {
      this.edit = K.create('#editor_id', {
        // 这里是指定的文件上传input的的属性名
        filePostName: 'file',
        // 这里就是指定文件上传的请求地址，上面也已经说了，upload_json.jsp就相当去一个servlet去进行保存文件，这个地方很重要
        uploadJson: 'uploadueditorMediaFile',
        resizeType: 1,
        allowPreviewEmoticons: true,
        allowImageUpload: true,
      });
      console.log(this.edit);
    });



    this.editOrder$.subscribe( re => {
      if (re.order === 'setHtml' ) {
        this.edit.html(re.htmlContent);
      } else {
        this.onHtmlTextChanged.emit(this.edit.html());
      }
    });

  }

  ngOnChanges(changes: SimpleChanges): void {

  }





}