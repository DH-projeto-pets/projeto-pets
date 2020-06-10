module.exports = {
  costumizeErrors({ errors }) {
    return errors.reduce((a, c) => Object.assign({ [c.param]: c.msg }, a), {});
  },
  queryBuilder(obj) {
    // console.log(obj);
    let subQuery = [];
    for (const item in obj) {
      if (Array.isArray(obj[item])) {
        const join = obj[item].map((value) => {
          return { [item]: value };
        });
        subQuery = subQuery.concat(join);
      } else if (obj[item]) {
        subQuery = subQuery.concat({ [item]: obj[item] });
      }
    }
    return subQuery;
  },
};
