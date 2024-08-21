import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../shared/material.module';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check menuItems array is initialized', () => {
    expect(component.menuItems).toBeDefined();
    expect(component.menuItems.length).toBe(4);
  });

  it('should check menuItem is rendered', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const menuItems = component.menuItems;
    expect(menuItems.length).toBe(4);
    expect(menuItems[0].name).toBe('Home');
    expect(menuItems[1].name).toBe('Gallery');
    expect(menuItems[2].name).toBe('About Us');
    expect(menuItems[3].name).toBe('Contact Us');
  });
});
