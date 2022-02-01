import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-apps-card',
  templateUrl: './apps-card.component.html',
  styleUrls: ['./apps-card.component.scss']
})
export class AppsCardComponent implements OnInit {

  @Input() app;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.app)
  }

  openApp(app) {
      this.router.navigate(['apps/', app.id]);
  }

}
