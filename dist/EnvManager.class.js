"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.r = exports.EnvManager = void 0;
const EnvBuilder_class_1 = require("./EnvBuilder.class");
const defaultSettings = {
    compact: true,
    envListFileName: 'ENV.list.ts',
    envOutputFileName: '.env',
    path: process.cwd(),
    noComments: false,
};
class EnvManager {
    static async generateTemplate(tplName) {
        return EnvBuilder_class_1.default.GenerateTemplate(tplName);
    }
    static async generate(settingObj = defaultSettings) {
        settingObj = Object.assign(defaultSettings, settingObj);
        const envBuilder = new EnvBuilder_class_1.default();
        await envBuilder.generate(settingObj);
    }
    static async check(settingObj = defaultSettings) {
        const envBuilder = new EnvBuilder_class_1.default();
        await envBuilder.check(settingObj);
    }
    static registerEnv(defaultValue, required = true, description = '') {
        return r(...arguments);
    }
}
exports.EnvManager = EnvManager;
function r(defaultValue, required = true, description = '') {
    return {
        defaultValue,
        description,
        required,
    };
}
exports.r = r;
//# sourceMappingURL=EnvManager.class.js.map