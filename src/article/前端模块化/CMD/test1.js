define("hzfe", [], function () {
  const hzfeMember = 17;
  const getHZFEMember = () => {
    return `HZFE Member: ${hzfeMember}`;
  };

  exports.getHZFEMember = getHZFEMember;
});
