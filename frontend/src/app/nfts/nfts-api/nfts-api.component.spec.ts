import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftsApiComponent } from './nfts-api.component';

describe('NftsApiComponent', () => {
  let component: NftsApiComponent;
  let fixture: ComponentFixture<NftsApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftsApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftsApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
