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

const GetEmployeeOptions = {
  schema: {
    querystring: Type.Object({ id: Type.Number() }),
  },
};

export async function employeeRouter(fastify: FastifyInstance): Promise<void> {
  fastify.get('/employees', GetEmployeesOptions, (req: GetEmployeesRequest, res) =>
    employeeController.getEmployees(req, res),
  );

  fastify.get('/employee', GetEmployeeOptions, (req: GetEmployeeRequest, res) =>
    employeeController.getEmployee(req, res),
  );
}

export type GetEmployeeRequest = FastifyRequest<{
  Querystring: Static<typeof GetEmployeeOptions['schema']['querystring']>;
}>;

export type GetEmployeesRequest = FastifyRequest<{
  Querystring: Static<typeof GetEmployeesOptions['schema']['querystring']>;
}>;

export type GetEmployeesResponse = {
  page: number;
  pages: number;
  items: number;
  total: number;
  employees: EmployeeModel[];
};

export type GetEmployeeResponse = {
  employee: EmployeeModel;
};
