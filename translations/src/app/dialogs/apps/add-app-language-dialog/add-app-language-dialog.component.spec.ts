import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppLanguageDialogComponent } from './add-app-language-dialog.component';

describe('AddAppLanguageDialogComponent', () => {
  let component: AddAppLanguageDialogComponent;
  let fixture: ComponentFixture<AddAppLanguageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppLanguageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppLanguageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
