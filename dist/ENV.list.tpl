import { envmgr, r } from 'envmgr2';
/**
 * Usage
 * Add your variable under some of main groups `General`, `Databases`, etc...
 * Format
 *  <variable_name>: r( [defaultValue:string:number]='', [required:boolean]=false, [description:string]='' )
 */
export const data = {
    "Section Name": {
        REQUIRED_VARIABLE: r(),
        ALIAS_TO_REQUIRED_VARIABLE: envmgr.registerEnv(),
        REQUIRED_VAR_WITH_DEFAULT_VALUE: r(8080),
        REQUIRED_VAR_WITH_DESCRIPTION: r('', true,'Add a hash function'),
        REQUIRED_VAR_WITH_DEFAULT_VALUE_AND_DESCRIPTION: r('aaaaa', true,'Some comment for something'),
    },
    "Another Section" : {
        NOT_REQUIRED_VAR: r('bbbbb', false,'Not required')
    }





};

