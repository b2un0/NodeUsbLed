This is a NodeJS driver/framework for the "Dream Cheeky USB Message Board".
It contains preinstalled plugins for weather, clock and Bitcoin exchange rate. Custom plugins can be easily written.

### run examples
```bash
git clone https://github.com/b2un0/node-dcled.git
cd node-dcled
npm install
npm install --only=dev
npm run-script examples
```

### install as dependency in your project
```bash
npm install dcled
```

#### use in your project

```js
const dcled = require('dcled');
let board = new dcled();
board.connect();

// inspect the examples for more

```