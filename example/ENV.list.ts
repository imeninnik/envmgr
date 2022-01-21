import { envmgr, r } from './../src/';
/**
 * Usage
 * Add your variable under some of main groups `General`, `Databases`, etc...
 * Format
 *  <variable_name>: r( [defaultValue:string:number]='', [required:boolean]=false, [description:string]='' )
 */
export const data = {
    "Sample": {
        ENV1: r(),
        ENV2: envmgr.registerEnv(),
        ENV3: r('', true,'Add a hash function'),
        ENV4: r('aaaaa', true,'Some comment for something'),
        ENV5: r(2000),
        ENV6: r('bbbbb', false,'Not required')
    },





};

