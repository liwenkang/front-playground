// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind

var construct = function (C, argsLength, args) {
  if (!hasOwn(factories, argsLength)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = "a[" + i + "]";
    factories[argsLength] = Function(
      "C,a",
      "return new C(" + join(list, ",") + ")"
    );
  }
  return factories[argsLength](C, args);
};

module.exports = function bind(that /* , ...args */) {
  var F = this;
  var Prototype = F.prototype;
  var partArgs = [...arguments].slice(1);
  var boundFunction = function bound(/* args... */) {
    var args = [...partArgs, ...arguments];
    return this instanceof boundFunction
      ? construct(F, args.length, args)
      : F.apply(that, args);
  };
  if (typeof Prototype === "object") boundFunction.prototype = Prototype;
  return boundFunction;
};
