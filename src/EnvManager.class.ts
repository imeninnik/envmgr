import EnvBuilder from "./EnvBuilder.class";
import {ISettings} from "./interfaces";

interface IRegisterEnvOutput {
  defaultValue:string|number|null,
  description: string|null
  required: boolean|string,
}


const defaultSettings:ISettings = {
  compact: true,
  envListFileName: 'ENV.list.ts',
  envOutputFileName: '.env',
  path: process.cwd(),
  noComments: false,
}

export class EnvManager {
  public static async generateTemplate(tplName?: string) {
    return EnvBuilder.GenerateTemplate(tplName);
  }

  public static async generate(settingObj: ISettings = defaultSettings) {
    settingObj = Object.assign(defaultSettings, settingObj);

    const envBuilder = new EnvBuilder();
    await envBuilder.generate(settingObj);
  }

  public static async check(settingObj: ISettings = defaultSettings) {
    const envBuilder = new EnvBuilder();
    await envBuilder.check(settingObj);
  }


  public static registerEnv(defaultValue?: string|number, required: boolean|string = true,  description: string = ''): IRegisterEnvOutput {
    return r(...arguments)
  }

}


export function r(defaultValue?: string|number, required: boolean|string = true,  description: string = ''): IRegisterEnvOutput {
   return {
     defaultValue,
     description,
     required,
  }
}


