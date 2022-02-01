import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AppsService } from 'src/app/services/apps/apps.service';

@Component({
  selector: 'app-remove-app-page-dialog',
  templateUrl: './remove-app-page-dialog.component.html',
  styleUrls: ['./remove-app-page-dialog.component.scss']
})
export class RemoveAppPageDialogComponent implements OnInit {

  pages;
  selectedPageId;
  appId;
  appPages;

  constructor(
    protected dialogRef: NbDialogRef<RemoveAppPageDialogComponent>,
    public appsService: AppsService
  ) {}

  ngOnInit(): void {
    console.log(this.appId, this.appPages)
  }

  close() {
    this.dialogRef.close(false);
  }

  deletePage() {
    if (this.selectedPageId) {
      this.appsService.deletePage(this.appsService.curAppId, this.selectedPageId).subscribe((res) => {
        this.dialogRef.close(true);
      })
    }
  }

}
