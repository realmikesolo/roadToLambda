import { FastifyReply, FastifyRequest } from 'fastify';
import { getEmployeesQuery } from '../schemas/get-employees';
import { EmployeeService } from '../services/employees';

export class EmployeesHandler {
  private readonly employeesService = new EmployeeService();

  public async getEmployees(request: FastifyRequest, reply: FastifyReply) {
    const { page } = request.query as getEmployeesQuery;

    const data = this.employeesService.getEmployees(page);

    return data;
  }
}
