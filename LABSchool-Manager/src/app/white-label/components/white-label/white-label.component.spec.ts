import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteLabelComponent } from './white-label.component';

describe('WhiteLabelComponent', () => {
  let component: WhiteLabelComponent;
  let fixture: ComponentFixture<WhiteLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhiteLabelComponent]
    });
    fixture = TestBed.createComponent(WhiteLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
