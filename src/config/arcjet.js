import arcjet, { shield, detectBot, slidingWindow } from '@arcjet/node';

const isDevelopment = process.env.NODE_ENV !== 'production';

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: 'LIVE' }),

    detectBot({
      mode: isDevelopment ? 'DRY_RUN' : 'LIVE',
      allow: [
        'CATEGORY:SEARCH_ENGINE',
      ],
    }),

    slidingWindow({
      mode: 'LIVE',
      interval: '2s',
      max: 5,
    }),
  ],
});

export default aj;