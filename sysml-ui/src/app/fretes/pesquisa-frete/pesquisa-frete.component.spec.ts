import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaFreteComponent } from './pesquisa-frete.component';

describe('PesquisaFreteComponent', () => {
  let component: PesquisaFreteComponent;
  let fixture: ComponentFixture<PesquisaFreteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisaFreteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaFreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
