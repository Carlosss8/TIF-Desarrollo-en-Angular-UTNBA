import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoChatModal } from './nuevo-chat-modal';

describe('NuevoChatModal', () => {
  let component: NuevoChatModal;
  let fixture: ComponentFixture<NuevoChatModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoChatModal],
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoChatModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
