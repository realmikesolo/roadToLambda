import { expect } from 'chai';
import { startServer } from './server';
import fetch from 'node-fetch';

describe('geoposition', () => {
  before(() => startServer(3000));

  const data = [
    {
      input: { ip: '185.182.120.34' },
      output: {
        country: 'Armenia',
        ip: '185.182.120.34',
        ipRange: '185.182.120.0 - 185.182.123.255',
      },
    },
    {
      input: { ip: '45.177.176.23' },
      output: {
        country: 'Mexico',
        ip: '45.177.176.23',
        ipRange: '45.177.176.0 - 45.177.179.255',
      },
    },
    {
      input: { ip: '5.44.80.51' },
      output: {
        country: 'Turkey',
        ip: '5.44.80.51',
        ipRange: '5.44.80.0 - 5.44.95.255',
      },
    },
    {
      input: { ip: '91.149.48.22' },
      output: {
        country: 'Norway',
        ip: '91.149.48.22',
        ipRange: '91.149.48.0 - 91.149.63.255',
      },
    },

    {
      input: { ip: '203.24.108.65' },
      output: {
        country: 'Cyprus',
        ip: '203.24.108.65',
        ipRange: '203.24.108.0 - 203.24.108.255',
      },
    },
    {
      input: { ip: '23.43.23.15' },
      output: {
        country: 'United Kingdom of Great Britain and Northern Ireland',
        ip: '23.43.23.15',
        ipRange: '23.43.16.0 - 23.43.35.255',
      },
    },
    {
      input: { ip: '89.28.176.5' },
      output: {
        country: 'Ireland',
        ip: '89.28.176.5',
        ipRange: '89.28.176.0 - 89.28.183.255',
      },
    },
    {
      input: { ip: '77.83.248.211' },
      output: {
        country: 'Romania',
        ip: '77.83.248.211',
        ipRange: '77.83.248.0 - 77.83.251.255',
      },
    },
  ];

  for (const { input, output } of data) {
    it(`GIVEN ip: ${input.ip}, RESULT country: ${output.country}`, async () => {
      const result = await fetch(`http://localhost:3000/`, {
        headers: { 'x-forwarded-for': input.ip },
      });
      const body = await result.json();
      expect(body).eql(output);
    });
  }
});
