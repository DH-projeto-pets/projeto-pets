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
  createWhereClause(query) {
    let queryString = [];
    for (const prop in query) {
      if (query[prop]) {
        if (Array.isArray(query[prop])) {
          const q = query[prop].reduce((a, c, i, ar) => {
            if (i === ar.length - 1) {
              return (a += `pet.${[prop]} = "${c}"`);
            }
            return (a += `pet.${[prop]} = "${c}" OR `);
          }, "");
          queryString = queryString.concat(`(${q})`);
        } else {
          queryString = queryString.concat(`(pet.${prop} = "${query[prop]}")`);
        }
      }
    }
    return queryString.reduce(
      (a, c, i, arr) => (a += `${c} ${i !== arr.length - 1 ? "AND" : ""} `),
      ""
    );
  },
  createUrl(query) {
    let url = [];
    for (const prop in query) {
      if (query[prop]) {
        if (Array.isArray(query[prop])) {
          const q = query[prop].reduce((a, c, i, l) => {
            return (a += `${prop}=${c}${i == l.length - 1 ? "" : "&"}`);
          }, "");
          url = url.concat(q);
        } else {
          q = `${prop}=${query[prop]}`;
          url = url.concat(q);
        }
      }
    }
    return url.join("&");
  },
};
