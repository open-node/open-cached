# Open-cached

async cache function, Base on ioredis with async/await

[![Build status](https://api.travis-ci.org/open-node/open-cached.svg?branch=master)](https://travis-ci.org/open-node/open-cached)
[![codecov](https://codecov.io/gh/open-node/open-cached/branch/master/graph/badge.svg)](https://codecov.io/gh/open-node/open-cached)

## Node version
<pre> >= 8 </pre>


## Installation
```bash
npm install open-cached --save
```

## Usage
```javascript
const Redis = require("ioredis");
const _ = require("lodash");
const Cached = require('open-cached');

const redis = new Redis();
const cache = Cache(redis, _);
```



<!-- Generated by documentation.js. Update this documentation by updating the source code. -->


<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [Cache][1]
    -   [Parameters][2]
    -   [get][3]
        -   [Parameters][4]
    -   [set][5]
        -   [Parameters][6]
    -   [del][7]
        -   [Parameters][8]
    -   [caching][9]
        -   [Parameters][10]

## Cache

利用 redis 实现cache

### Parameters

-   `redis` **[object][11]** ioredis 实例
-   `_` **[object][11]** lodash 库

Returns **[Cache][12]** Instance

### get

获取缓存的值

#### Parameters

-   `key` **[string][13]** 缓存的 key

Returns **Anyone** 缓存的值

### set

设置一个cache

#### Parameters

-   `key` **[string][13]** 缓存的 key
-   `value` **[string][13]** 缓存的值
-   `life` **[number][14]** 有效期，单位秒，默认 0 永久有效 (optional, default `0`)

Returns **Anyone** 缓存的值

### del

删除缓存

#### Parameters

-   `key` **[string][13]** 缓存的 key

Returns **[number][14]** 删除的条目数

### caching

caching 让某个函数具有cache的能力

#### Parameters

-   `fn` **[function][15]** 要加工的函数
-   `life` **[number][14]** 缓存有效期，单位秒
-   `getKey` **[function][15]** 计算缓存key的函数

[1]: #cache

[2]: #parameters

[3]: #get

[4]: #parameters-1

[5]: #set

[6]: #parameters-2

[7]: #del

[8]: #parameters-3

[9]: #caching

[10]: #parameters-4

[11]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[12]: #cache

[13]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[14]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[15]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function


### Contributing
- Fork this repo
- Clone your repo
- Install dependencies
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Open a pull request, and enjoy <3

### MIT license
Copyright (c) 2019 Open-node
Author Redstone Zhao
Email: 13740080@qq.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

