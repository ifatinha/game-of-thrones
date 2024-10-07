export function createElement({ elementName = "div", classes = "" } = {}) {
    const element = document.createElement(elementName);
  
    if (classes) {
      element.classList.add(...classes.split(" "));
    }
  
    return element;
  }