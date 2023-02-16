import { AppComponent } from "./app.component"

describe('First test group', () => {

  it('should component initialized', () => {
    const component = new AppComponent();
    expect(component).toBeTruthy();
  })

  it('should test greet method', () => {
    const component = new AppComponent();
    const str = component.greet();
    expect(str).toBe('Hello, Good afternoon!');
  })
})
