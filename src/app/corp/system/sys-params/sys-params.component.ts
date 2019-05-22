import { Component, OnInit } from '@angular/core';

import {SystemParams} from '../../../entity/SystemParams';
import {isNullOrUndefined} from 'util';

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
  constructor(private sysparamssvr: SysParamsService) { }

  ngOnInit() {
    this.sysparamssvr.getParams().subscribe(re => {
         if (! isNullOrUndefined(re)) {
           this.params = re;
         }
      });
  }
  onSave = () => {
     this.sysparamssvr.setParams(this.params).subscribe(
          re => console.log(re)
     );
  }

}

