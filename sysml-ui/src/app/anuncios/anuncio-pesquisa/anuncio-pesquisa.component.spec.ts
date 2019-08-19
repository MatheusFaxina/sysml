import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioPesquisaComponent } from './anuncio-pesquisa.component';

describe('AnuncioPesquisaComponent', () => {
  let component: AnuncioPesquisaComponent;
  let fixture: ComponentFixture<AnuncioPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnuncioPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
