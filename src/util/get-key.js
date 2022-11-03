let lastKey = 0;

/**
 * @param {string} [prefix]
 * @returns {string}
 */
const GetKey = (prefix = 'key') => `${prefix}-${++lastKey}`;

export default GetKey;
