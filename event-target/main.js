class EventTarget {
  constructor() {
    this.listeners = {};
  }

  addEventListener(name, callback) {
    if (typeof callback !== "function") {
      throw new Error("secound parameter should be a callback");
    }
    const hasProperty = this.listeners.hasOwnProperty(name);

    if (hasProperty) {
      this.listeners[name].add(callback);
    } else {
      this.listeners[name] = new Set([callback]);
    }
  }

  removeEventListener(name) {
    delete this.listeners[name];
  }

  dispatchEvent(name) {
    this.listeners[name]?.forEach((callback) => callback());
  }
}
