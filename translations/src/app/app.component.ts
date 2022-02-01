import { Component, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'translations';
  items: NbMenuItem[] = [
    {
      title: 'Apps',
      icon: 'browser-outline',
      link: '/apps',
      home: true,
    },
    {
      title: 'Languages',
      icon: 'globe-2-outline',
      link: '/languages',
      home: true,
    }
  ];

  constructor(private sidebarService: NbSidebarService) {
  }

  ngOnInit() {
    this.toggle();
  }

  toggle() {
    this.sidebarService.toggle(true);
  }


}
