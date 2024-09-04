import { Environment } from '@abp/ng.core';

const baseUrl = 'https://opera.gulfbase.com';
// const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Opera',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://operaapi.gulfbase.com/',
    // issuer: 'https://localhost:44349/',
    redirectUri: baseUrl,
    clientId: 'Opera_App',
    responseType: 'code',
    scope: 'offline_access Opera',
    requireHttps: true,
  },
  apis: {
    default: {
      // url: 'https://localhost:44349',
      url: 'https://operaapi.gulfbase.com',
      rootNamespace: 'GB.Opera',
    },
  },
} as Environment;
