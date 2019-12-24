import isPlainObject from 'lodash/isPlainObject';

const buildQueryValue = (value) => {
  return Array.isArray(value) ? value.join(':') : value;
}

export const queryParams = (queryObj) => {
  let queryArray = [];
  Object.keys(queryObj).forEach(query => {
      let queryValue = queryObj[query];
      if (queryValue !== undefined) {
          if (isPlainObject(queryValue)) queryValue = Object.entries(queryValue);
          if (Array.isArray(queryValue)) {
              queryValue.length > 0 && queryValue.forEach(item => queryArray.push(`${ query }=${ buildQueryValue(item) }`));
          } else if (queryValue !== '') {
              queryArray.push(`${ query }=${ buildQueryValue(queryValue) }`);
          }
      }
  });
  return (queryArray.length !== 0 ? '?' : '') + queryArray.join('&');
}