import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppsService } from 'src/app/services/apps/apps.service';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit, OnDestroy {

  apps = [];

  private $destroy = new Subject();

  constructor(public appsService: AppsService) { }

  ngOnInit(): void {
    this.appsService.getApps();
    this.appsService.apps$.pipe(distinctUntilChanged(), takeUntil(this.$destroy)).subscribe(res => {
      console.log(res);
    })
  }

  ngOnDestroy(): void {
      this.$destroy.next();
  }

}
