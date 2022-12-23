import { FastifyInstance, FastifyRequest } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { EmployeeController } from './employee.controller';
import EmployeeModel from '../../models/employee';

const employeeController = new EmployeeController();

const GetEmployeesOptions = {
  schema: {
    querystring: Type.Object({ page: Type.Number() }),
  },
};

export async function employeeRouter(fastify: FastifyInstance): Promise<void> {
  fastify.get('/employees', GetEmployeesOptions, (req: GetEmployeesRequest, res) =>
    employeeController.getEmployees(req, res),
  );
}

export type GetEmployeesRequest = FastifyRequest<{
  Querystring: Static<typeof GetEmployeesOptions['schema']['querystring']>;
}>;

export type GetEmployeesResponse = {
  page: number;
  pages: number;
  total: number;
  items: number;
  employees: EmployeeModel[];
};
