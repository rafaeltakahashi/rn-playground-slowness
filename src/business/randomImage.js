/**
 * @param {string} seed
 * @param {number} height
 * @param {number} width
 * @returns {string}
 */
function generateUrl(seed, height, width) {
  return `https://picsum.photos/seed/${seed}/${height}/${width}`;
}

/**
 * @param {number} firstSeed
 * @param {number} amount
 * @param {number} height
 * @param {number} width
 * @returns {string[]}
 */
function generateUrlArray(firstSeed, amount, height, width) {
  /** @type {string[]} */
  const randomUrls = [];
  for (let i = firstSeed; i < firstSeed + amount; i++) {
    randomUrls.push(generateUrl(i, height, width));
  }
  return randomUrls;
}

export default {
  generateUrl,
  generateUrlArray,
};
