import { FastifyInstance, FastifyRequest } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { EmployeeController } from './employee.controller';
import EmployeeModel from '../../models/employee';
import { Log } from '../../db';

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
  stats: {
    queries: number;
    log: Log[];
  };
  employees: Array<Omit<Employee, 'reportID' | 'reportFirstName' | 'reportLastName'>>;
};

export type GetEmployeeResponse = {
  stats: {
    queries: number;
    log: Log[];
  };
  employee: Employee;
};

export type Employee = {
  reportID: number | null;
  reportFirstName: string | null;
  reportLastName: string | null;
} & Pick<
  EmployeeModel,
  | 'employeeID'
  | 'lastName'
  | 'firstName'
  | 'title'
  | 'titleOfCourtesy'
  | 'birthDate'
  | 'hireDate'
  | 'address'
  | 'city'
  | 'region'
  | 'postalCode'
  | 'country'
  | 'homePhone'
  | 'extension'
  | 'notes'
  | 'reportsTo'
>;
