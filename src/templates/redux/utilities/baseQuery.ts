export const isDev: boolean = process.env.NODE_ENV === 'development';

const dev: string = 'http://10.10.10.10:3000/api/v1';
const prod: string = 'https://m360ict.online/api/v1';

export const baseUrl: string = isDev ? dev : prod;
