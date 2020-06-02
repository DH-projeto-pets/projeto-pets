module.exports = {
  costumizeErrors({ errors }) {
    return errors.reduce((a, c) => Object.assign({ [c.param]: c.msg }, a), {});
  },
};
