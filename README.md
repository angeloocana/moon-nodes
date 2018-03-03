# moon-nodes

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b6752492e861418bbf62791233006c7d)](https://www.codacy.com/app/polutz/moon-nodes?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=angeloocana/moon-nodes&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/angeloocana/moon-nodes.svg)](https://travis-ci.org/angeloocana/moon-nodes)
[![codecov.io](http://codecov.io/github/angeloocana/moon-nodes/coverage.svg)](http://codecov.io/github/angeloocana/moon-nodes)
[![Dependency Status](https://gemnasium.com/angeloocana/moon-nodes.svg)](https://gemnasium.com/angeloocana/moon-nodes)
[![bitHound Code](https://www.bithound.io/github/angeloocana/moon-nodes/badges/code.svg)](https://www.bithound.io/github/angeloocana/moon-nodes)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Calculate ascending and descending moon between 2001 and 2100.

Data from: http://astropixels.com/ephemeris/moon/moonnodes2001.html

```js

import getMoonNode from 'moon-nodes';

getMoonNode('2018-03-03'); // asc

getMoonNode('2018-03-15'); // desc
  
  
getMoonNode('2014-01-01', { latitude: 42.885066, longitude: -94.349219 }); // asc

getMoonNode('2020-01-01', { latitude: 42.885066, longitude: -94.349219 }); // desc

getMoonNode('2014-01-01', { latitude: -17.883294, longitude: -48.294531 }); // desc

getMoonNode('2020-01-01', { latitude: -17.883294, longitude: -48.294531 }); // asc

```
