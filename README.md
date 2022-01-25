
```javascript
import {envmgr, r} from "envmgr2";

/**
 * usual case
 */
  run();
  async function run() {
  await envmgr.generateTemplate('TEST.list.ts')
  envmgr.generate().catch(e => console.error('Example failed', e));
  }



/**
 * case with settings
 */
  const settings: ISettings = {
  compact: false,
  envOutputFileName: '.full-size.env'
  }
  envmgr.generate(settings).catch(e => console.error('Example failed', e));

/**
 * case with no comments
 */

const settings2 = {
noComments: true,
compact: true,
envOutputFileName: '.no-comments.env'
}
envmgr.generate(settings2).catch(e => console.error('Example failed', e));

/**
 * Checking
 */
process.env.ENV1 = 'some_value';

envmgr.check().catch(e => {
    console.error('Example failed', e);
});

```
