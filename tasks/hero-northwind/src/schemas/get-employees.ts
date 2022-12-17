import { RouteShorthandOptions } from 'fastify';
import { Static, Type } from '@sinclair/typebox';

const getEmployeesQuery = Type.Object({ page: Type.Number() });

export const getEmployeesOpts: RouteShorthandOptions = {
  schema: {
    querystring: getEmployeesQuery,
  },
};

export type getEmployeesQuery = Static<typeof getEmployeesQuery>;
