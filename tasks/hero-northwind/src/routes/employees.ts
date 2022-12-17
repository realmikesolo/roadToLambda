import { FastifyInstance } from 'fastify';
import { EmployeesHandler } from '../handlers/employees';
import { getEmployeesOpts } from '../schemas/get-employees';

export const employeesRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get('/employees', getEmployeesOpts, (res, rep) =>
    new EmployeesHandler().getEmployees(res, rep),
  );
};
