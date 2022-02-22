import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftsDetailsComponent } from './nfts-details.component';

describe('NftsDetailsComponent', () => {
  let component: NftsDetailsComponent;
  let fixture: ComponentFixture<NftsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
