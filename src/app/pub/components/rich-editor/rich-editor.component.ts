import {Component, forwardRef, Input, OnInit, ViewChild} from '@angular/core';

import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {UEditorComponent} from "ngx-ueditor";
import {UPLOAD_MEDIA_PATH} from "../../../shared/const";
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {Icon} from "../../../entity/Icon";
declare var UE : any;
@Component({
  selector: 'app-rich-editor',
  templateUrl: './rich-editor.component.html',
  styleUrls: ['./rich-editor.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RichEditorComponent),
    multi: true
  }]
})
export class RichEditorComponent implements OnInit {
  @ViewChild('full') full: UEditorComponent;
  isImgUpModalShow=false;
  loading=false;
  private _CURRENTVALUE = ''; // 市州选择 ngModel
  uploadMediaPath = UPLOAD_MEDIA_PATH;
  iconUrl='';
  private onValueChangeCallBack: any = {};

  get currentValue(): string {
    return this._CURRENTVALUE;
  }

  set currentValue(value: string) {
    this._CURRENTVALUE = value;
    this.onValueChangeCallBack(value);
  }



  writeValue(obj: any): void {
    if (obj) {
      this._CURRENTVALUE = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onValueChangeCallBack = fn;
  }

  registerOnTouched(fn: any): void {
  }
  constructor( private message: NzMessageService) { }

  ngOnInit() {
  }

  onPreReady = (comp: UEditorComponent) => {
    let uiName='uploadOosImg';
    UE.registerUI('button', (editor, uiName) => {
      // 注册按钮执行时的command命令，使用命令默认就会带有回退操作
      editor.registerCommand(uiName, {
        execCommand() {
          // alert('execCommand:' + uiName);

        }
      });
      // 创建一个button
      const btn = new UE.ui.Button({
        // 按钮的名字
        name: uiName,
        // 提示
        title: '上传图片',
        // 添加额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-position: -726px -77px;',
        // 点击时执行的命令
        onclick : () => {
          // 这里可以不用执行命令,做你自己的操作也可
          // editor.execCommand(uiName);
          this.onchooseimg();
        }
      });
      // 当点到编辑内容上时，按钮要做的状态反射
      editor.addListener('selectionchange', () => {
        const state = editor.queryCommandState(uiName);
        if (state == -1) {
          btn.setDisabled(true);
          btn.setChecked(false);
        } else {
          btn.setDisabled(false);
          btn.setChecked(state);
        }
      });
      // 因为你是添加button,所以需要返回这个button
      return btn;
    }, 5, comp.id);
    // comp.id 是指当前UEditor实例Id
  }


  onchooseimg = () => {
    setTimeout(()=>{
      this.iconUrl='';
      this.isImgUpModalShow=true;

    },300);

  }

  handleChange = (info: { file: UploadFile }) => {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.iconUrl= info.file.response.aliUrl;
        this.loading = false;
        this.isImgUpModalShow=false;
        this.full.Instance.execCommand('inserthtml', `<img src="${this.iconUrl}" />`);
        break;
      case 'error':
        this.message.error('网络错误');
        break;
    }
  }
}
