import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-apps-list',
  templateUrl: './apps-list.component.html',
  styleUrls: ['./apps-list.component.scss']
})
export class AppsListComponent implements OnInit {

  @Input() apps;

  constructor() { }

  ngOnInit(): void {
    console.log(this.apps);
  }

}
