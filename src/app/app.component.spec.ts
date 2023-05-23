import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
@Component({
  selector: 'app-nav-bar',
  template: `<div></div>`
})
class MockNavBarComponent { }

@Component({
  selector: 'app-products',
  template: `<div></div>`
})
class MockProductsComponent { }

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, MockNavBarComponent, MockProductsComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have app-navbar', () => {
    const navComponent = fixture.debugElement.query(By.directive(MockNavBarComponent));
    expect(navComponent).toBeTruthy();
  });

  it('should have app-products', () => {
    const productsComponent = fixture.debugElement.query(By.directive(MockProductsComponent));
    expect(productsComponent).toBeTruthy();
  });

  it('should test sum of two numbers', () => {

    // Arrange
    const a = 5;
    const b = 5;

    // Act
    const total = component.add(a, b);

    // Assert
    expect(total).toEqual(10);
  });
});
