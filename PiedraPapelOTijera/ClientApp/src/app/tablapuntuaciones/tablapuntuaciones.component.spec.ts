import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablapuntuacionesComponent } from './tablapuntuaciones.component';

describe('TablapuntuacionesComponent', () => {
  let component: TablapuntuacionesComponent;
  let fixture: ComponentFixture<TablapuntuacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablapuntuacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablapuntuacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
