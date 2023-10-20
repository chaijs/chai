const typesToLowerCase = [
  "Number",
  "String",
  "Boolean",
  "Null",
  "Undefined",
  "Function",
  "Symbol",
];

export function type(obj) {
  const type = Object.prototype.toString.call(obj).slice(8, -1);

  if (typesToLowerCase.includes(type)) {
    return type.toLowerCase();
  }
  return type;
}
