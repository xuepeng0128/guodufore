import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IconService} from "../../../shared/service/dic/icon.service";
import {Icon} from "../../../entity/Icon";
import {Subject} from "rxjs";
import {HabitTemplate} from "../../../entity/HabitTemplate";
import {Teacher} from "../../../entity/Teacher";

@Component({
  selector: 'app-win-icon-choose',
  templateUrl: './win-icon-choose.component.html',
  styleUrls: ['./win-icon-choose.component.css']
})
export class WinIconChooseComponent implements OnInit {
  @Input() iconWinOrder$: Subject<string> = new Subject<string>();
  @Output() onIconChoosed: EventEmitter<String> = new EventEmitter<String>();
  isWinIconModalShow=false;
  iconArray : Array<Icon> = new Array<Icon>();
  constructor(private iconsvr : IconService) { }

  ngOnInit() {
    this.iconWinOrder$.subscribe(
      re => this.isWinIconModalShow=true
    )
    this.iconsvr.iconList().subscribe(
      re => this.iconArray=re
    )
  }

  onChooseIcon=(icon:Icon)=>{
    this.isWinIconModalShow=false;
    this.onIconChoosed.emit(icon.iconUrl);
}
}
