// hzfe.js
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define(["exports", "hzfe"], factory);
  } else if (
    typeof exports === "object" &&
    typeof exports.nodeName !== "string"
  ) {
    // CommonJS
    factory(exports, require("hzfe"));
  } else {
    // Browser globals
    factory((root.commonJsStrict = {}), root.hzfe);
  }
})(typeof self !== "undefined" ? self : this, function (exports, b) {
  const hzfeMember = 17;
  const getHZFEMember = () => {
    return `HZFE Member: ${hzfeMember}`;
  };

  exports.getHZFEMember = getHZFEMember;
});
