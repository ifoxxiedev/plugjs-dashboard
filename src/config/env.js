const includesOnArray = (arg, arr) => arg && arr.includes(arg);

export const isDev = () => includesOnArray(process.env.NODE_ENV, ['development', 'dev', 'developer', 'test']);
export const isProd = () => includesOnArray(process.env.NODE_ENV, ['production', 'prod']);