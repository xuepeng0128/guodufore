import { Component, OnInit } from '@angular/core';

import {SystemParams} from '../../../entity/SystemParams';
import {isNullOrUndefined} from 'util';
import {SysParamsService} from '../../../shared/service/system/sys-params.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-sys-params',
  templateUrl: './sys-params.component.html',
  styleUrls: ['./sys-params.component.css']
})
export class SysParamsComponent implements OnInit {
  params: SystemParams = new SystemParams(10, [1, 2, 3, 4, 5], {
    bronze: 100,
    silver: 200,
    gold: 300,
    diamond: 400,
    Supreme: 500
  });
  constructor(private message: NzMessageService, private sysparamssvr: SysParamsService ) { }

  ngOnInit() {
    this.sysparamssvr.getParams().subscribe(re => {
         if (! isNullOrUndefined(re)) {
           this.params = re;
         }
      });
  }
  onSave = () => {
    // 验证
    this.message.remove();
    if (this.params.honerSet.Supreme <= this.params.honerSet.diamond || this.params.honerSet.diamond <= this.params.honerSet.gold
        ||  this.params.honerSet.gold <= this.params.honerSet.silver || this.params.honerSet.silver <= this.params.honerSet.bronze
    ) {
      this.message.create('error', '勋章数量录入非法'); return;
    }


    this.sysparamssvr.setParams(this.params).subscribe(
          re =>     this.message.create('success', '保存成功')
     );
  }

}

