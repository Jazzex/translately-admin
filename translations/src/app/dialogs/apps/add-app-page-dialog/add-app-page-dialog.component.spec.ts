import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppPageDialogComponent } from './add-app-page-dialog.component';

describe('AddAppPageDialogComponent', () => {
  let component: AddAppPageDialogComponent;
  let fixture: ComponentFixture<AddAppPageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppPageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppPageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
