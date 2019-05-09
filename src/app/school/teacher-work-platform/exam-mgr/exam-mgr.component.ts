import { Component, OnInit } from '@angular/core';
declare  var KindEditor : any;
@Component({
  selector: 'app-exam-mgr',
  templateUrl: './exam-mgr.component.html',
  styleUrls: ['./exam-mgr.component.css']
})
export class ExamMgrComponent implements OnInit {
  ss =false;
  edit :any;
  constructor() { }

  ngOnInit() {
    KindEditor.ready( (K) => {
       this.edit= K.create('#editor_id', {
//这里是指定的文件上传input的的属性名
         filePostName: "file",
//这里就是指定文件上传的请求地址，上面也已经说了，upload_json.jsp就相当去一个servlet去进行保存文件，这个地方很重要
         uploadJson: 'uploadueditorMediaFile',
         resizeType: 1,
         allowPreviewEmoticons: true,
         allowImageUpload: true,
       });
       console.log(this.edit)
    });
  }
 showhtml=()=>{
    this.edit.html('sdfsdlfjdsifdsifsdi');
}
}
