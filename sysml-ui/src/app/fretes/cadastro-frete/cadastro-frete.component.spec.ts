import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroFreteComponent } from './cadastro-frete.component';

describe('CadastroFreteComponent', () => {
  let component: CadastroFreteComponent;
  let fixture: ComponentFixture<CadastroFreteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroFreteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroFreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
