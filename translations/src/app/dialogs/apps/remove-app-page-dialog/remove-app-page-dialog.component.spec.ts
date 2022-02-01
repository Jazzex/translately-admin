import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAppPageDialogComponent } from './remove-app-page-dialog.component';

describe('RemoveAppPageDialogComponent', () => {
  let component: RemoveAppPageDialogComponent;
  let fixture: ComponentFixture<RemoveAppPageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveAppPageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveAppPageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
