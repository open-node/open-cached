const Cache = require("../");

describe("Cached", () => {
  it("get", async () => {
    const data = {
      name: "Redstone Zhao",
      age: 39
    };
    const redis = {
      async get(name) {
        expect(name).toBe("cachekey");
        return JSON.stringify(data);
      }
    };
    const _ = {};
    const cache = Cache(redis, _);
    const str = await cache.get("cachekey");
    expect(JSON.parse(str)).toEqual(data);
  });

  it("set", async () => {
    const redis = {
      async set(key, value) {
        expect(key).toBe("cachekey");
        expect(value).toBe("value");
      },
      async setex(key, life, value) {
        expect(key).toBe("cachekey");
        expect(life).toBe(300);
        expect(value).toBe("value");
      }
    };
    const _ = {};
    const cache = Cache(redis, _);
    await cache.set("cachekey", "value");
    await cache.set("cachekey", "value", 300);
  });

  it("del", async () => {
    const redis = {
      async del(key) {
        expect(key).toBe("cachekey");
      }
    };
    const _ = {};
    const cache = Cache(redis, _);
    await cache.del("cachekey");
  });

  it("caching", async () => {
    const data = {
      name: "Redstone Zhao",
      age: 39
    };
    const redis = {
      async setex(key, life, value) {
        expect(key).toBe("key: name:age");
        expect(life).toBe(300);
        expect(JSON.parse(value)).toEqual({ arg1: "name", arg2: "age", data });
      }
    };

    redis.get = async key => {
      expect(key).toBe("key: name:age");
      redis.get = async k => {
        expect(k).toBe("key: name:age");
        return JSON.stringify({ arg1: "name", arg2: "age", data });
      };
      return Promise.resolve(null);
    };
    const _ = {
      isFunction(fn) {
        return fn instanceof Function;
      },
      isNumber(n) {
        return Number.isInteger(n) && 0 < n;
      }
    };
    const cache = Cache(redis, _);
    let times = 0;
    const fn = (arg1, arg2) => {
      times += 1;
      return Promise.resolve({ arg1, arg2, data });
    };

    const cached = cache.caching(
      fn,
      300,
      (arg1, arg2) => `key: ${arg1}:${arg2}`
    );

    let res = await cached("name", "age");
    expect(res).toEqual({ arg1: "name", arg2: "age", data });
    expect(times).toEqual(1);
    res = await cached("name", "age");
    expect(res).toEqual({ arg1: "name", arg2: "age", data });
    expect(times).toEqual(1);
    res = await cached("name", "age");
    expect(res).toEqual({ arg1: "name", arg2: "age", data });
    expect(times).toEqual(1);

    expect(() => cache.caching("test")).toThrow();
    expect(() => cache.caching(fn, "abc")).toThrow();
    expect(() => cache.caching(fn, 300, "test")).toThrow();
  });
});
