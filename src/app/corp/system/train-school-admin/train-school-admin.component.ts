import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-train-school-admin',
  templateUrl: './train-school-admin.component.html',
  styleUrls: ['./train-school-admin.component.css']
})
export class TrainSchoolAdminComponent implements OnInit {

  constructor( private message: NzMessageService) { }

  ngOnInit() {
  }

}
