// Needed to make Prettier plugins for Tailwind work with template literals.
// Without this, sorting of tailwind classes and auto indenting for long strings doesn't work.
function tw(strings: TemplateStringsArray) {
  return String.raw(strings);
}

export default tw;
