import {ISettings} from "./interfaces";
const fs = require('fs');

export default class EnvBuilder {
    public static async GenerateTemplate(tplName = 'ENV.list.ts') {
        return new Promise((resolve,reject) => {
            fs.copyFile(__dirname+'/ENV.list.tpl',  process.cwd()+'/'+tplName, (err) => {
                if (err) return reject(err) ;

                console.log('template has been generated');
                return resolve(true);
            });
        });


    }

    constructor() {}


    public generate(settings: ISettings) {
        let envFileData;
        let fileString = '';
        const envsFolder = settings.path;
        const defaultFileName = `${envsFolder}/${settings.envListFileName}`;

        try {
            console.log(`Loading ${defaultFileName}`);
            envFileData = require(defaultFileName).data;
        } catch (e) {
            console.warn(`There is no ${defaultFileName}`);
            throw `There is no ${defaultFileName}`
        }

        for (let section in envFileData) {
            fileString += `#### ${section} #`.padEnd(100, '#');
            fileString += `\n\n`;

            handleAppEnvs(envFileData, section, settings);

            fileString += `\n\n`;

        }


        function handleAppEnvs(envFileData, section, settings?) {
            const required = [];
            const notRequired = [];

            for (let key in envFileData[section]) {
                const env = envFileData[section][key];
                env.name = key;
                env.required ? required.push(env) : notRequired.push(env);
            }

            required.forEach((env) => {
                addLine(env, false, settings?.compact);
            });

            notRequired.forEach(env => {
                addLine(env, true, settings?.compact);
            });
        }


        function addLine(env, notRequired: boolean = false, compact = false) {
            const mutePrefix = notRequired ? '#' : '';
            if (typeof env.defaultValue !== "string") env.defaultValue = JSON.stringify(env.defaultValue);

            if (env.description && env.description.length && !settings.noComments) fileString += `# ↓ ${env.description}\n`;
            const value = (env.defaultValue && env.defaultValue.length) ? env.defaultValue : '';
            fileString += `${mutePrefix}${env.name}=${value}`;

            if (!compact) fileString += '\n';
            fileString += '\n';
        }

        fileString += '\n\n';

        const fileNameAndPath = settings.envOutputFileName;

        fs.writeFile(fileNameAndPath, Buffer.from(fileString), (err) => {
            if (err) throw err;
            console.log('\n\n' +
                'File "'+fileNameAndPath+'" has been saved!'+'\n'+
                'NB: don\'t forget to add mandatory environmental variables values in "'+fileNameAndPath+'"');
        });

    }


    public check(settingsObj: ISettings) {
        let envFileName = settingsObj.envListFileName;

        let fullEnvFilePath = `${settingsObj.path}/${envFileName}`;

        this._checkForRequiredEnvs(fullEnvFilePath);
    }


    private _checkForRequiredEnvs(fileName) {

        const allEnvs = this._getEnvsFromFile(fileName);

        if (!allEnvs) throw `Failed to load data from "${fileName}"`;

        let isErr = false;

        for (let key in allEnvs) {
            const section = allEnvs[key];

           for (let sectionKey in section) {
               const env = section[sectionKey];

               if (env.required && !process.env[sectionKey]) {
                   console.warn(`REQUIRED ENVIRONMENT VARIABLE HAS BEEN MISSED: "${key}" > "${sectionKey}"`);
                   isErr = true
               }
           }


        }

        if (isErr) {
            const e = 'Required Env variable has been missed';
            console.log('\n');
            console.warn(e);
            process.exit(1);
        }

    }

    private _getEnvsFromFile(fileName) {
        let file;
        try {
            file = require(fileName);
            if (!file || !file.data) {
                console.error(`List file "${fileName}" does not export data. See README.md for details`);
                return null
            }
        } catch (e) {
            console.warn('_getEnvsFromFile > ERROR: ', e);
        }

        return file.data;
    };


}
