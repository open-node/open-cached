/**
 * 利用 redis 实现cache
 * @param {object} redis ioredis 实例
 * @param {object} _ lodash 库
 * @class
 * @return {Cache} Instance
 */
function Cache(redis, _) {
  /**
   * 获取缓存的值
   * @memberof Cache
   * @instance
   *
   * @param {string} key 缓存的 key
   *
   * @return {Anyone} 缓存的值
   */
  const get = key => redis.get(key);

  /**
   * 设置一个cache
   * @memberof Cache
   * @instance
   *
   * @param {string} key 缓存的 key
   * @param {string} value 缓存的值
   * @param {number} life 有效期，单位秒，默认 0 永久有效
   *
   * @return {Anyone} 缓存的值
   */
  const set = (key, value, life = 0) => {
    if (life === 0) return redis.set(key, value);
    return redis.setex(key, life, value);
  };

  /**
   * 删除缓存
   * @memberof Cache
   * @instance
   *
   * @param {string} key 缓存的 key
   *
   * @return {number} 删除的条目数
   */
  const del = key => redis.del(key);

  /**
   * caching 让某个函数具有cache的能力
   * @memberof Cache
   * @instance
   *
   * @param {function} fn 要加工的函数
   * @param {number} life 缓存有效期，单位秒
   * @param {function} getKey 计算缓存key的函数
   *
   * @return {async function} 具有了cache能力的函数
   */
  const caching = (fn, life, getKey) => {
    if (!_.isFunction(fn)) throw Error("The first argument must be a function");
    if (!_.isNumber(life))
      throw Error("The second argument must be a number and great then 0");
    if (!_.isFunction(getKey))
      throw Error("The third argument must be a function");

    return async (...args) => {
      const key = getKey(...args);
      const data = await redis.get(key);
      if (data) return JSON.parse(data);

      const res = await fn(...args);
      set(key, JSON.stringify(res), life);

      return res;
    };
  };

  return { redis, get, set, del, caching };
}

module.exports = Cache;
