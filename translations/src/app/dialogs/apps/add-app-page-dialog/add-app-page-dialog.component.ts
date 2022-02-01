import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AppsService } from 'src/app/services/apps/apps.service';

@Component({
  selector: 'app-add-app-page-dialog',
  templateUrl: './add-app-page-dialog.component.html',
  styleUrls: ['./add-app-page-dialog.component.scss'],
})
export class AddAppPageDialogComponent implements OnInit {
  public pageName = '';

  constructor(
    protected dialogRef: NbDialogRef<AddAppPageDialogComponent>,
    public appsService: AppsService
  ) {}

  close() {
    this.dialogRef.close(false);
  }
  add() {
    this.appsService.createPage(this.appsService.curAppId, this.pageName).subscribe((res) => {
      this.dialogRef.close(true);
    })
  }
  ngOnInit(): void {}
}
