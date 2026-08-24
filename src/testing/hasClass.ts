export function hasClass(el: Element, name: string): boolean {
  return el.className.split(/\s+/).includes(name)
}
