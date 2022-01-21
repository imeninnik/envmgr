import { envmgr } from './../src';

process.env.ENV1 = 'some_value';

envmgr.check().catch(e => {
    console.error('Example failed', e);
});



