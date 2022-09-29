let settings: Record<string, any> = {}

function setSetting(key: string, value: any) {
    settings[key] = value;
}

function getSetting(key: string, defaultValue: any) {
    return key in settings ? settings[key] : defaultValue;
}

export { setSetting, getSetting }