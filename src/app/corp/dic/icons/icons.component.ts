import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../../../entity/LoginUser';
import {UserService} from '../../../shared/user.service';
import {Icon} from '../../../entity/Icon';
import {UPLOAD_MEDIA_PATH} from '../../../shared/const';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {IconService} from '../../../shared/service/dic/icon.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  loginUser: LoginUser = this.usersvr.getUserStorage();
  iconArray: Array<Icon> = new Array<Icon>();
  uploadMediaPath = UPLOAD_MEDIA_PATH;
  loading = false;
  constructor(private usersvr: UserService, private iconsvr: IconService, private message: NzMessageService) { }

  ngOnInit() {
    this.onQuery();
  }
  onQuery = () => {
      this.iconsvr.iconList().subscribe(
         re => {this.iconArray = re;
                this.iconArray.push( new Icon({iconUrl: ''}));
         }
      );
  }

  handleChange = (info: { file: UploadFile }) => {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        const ticon: Icon = new Icon({iconUrl : info.file.response.aliUrl});
        this.iconsvr.insertIcon(ticon).subscribe(
          re => this.iconArray.push(ticon)
        );
        this.loading = false;
        break;
      case 'error':
        this.message.error('网络错误');
        break;
    }
  }

  insertIcon = () => {

  }



}
