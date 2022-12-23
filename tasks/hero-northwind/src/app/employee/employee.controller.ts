import { FastifyReply } from 'fastify';
import { Env } from '../../env';
import { GetEmployeesRequest } from './employee.router';
import { EmployeeService } from './employee.service';

export class EmployeeController {
  private readonly employeeService = new EmployeeService();

  public async getEmployees(req: GetEmployeesRequest, res: FastifyReply): Promise<void> {
    const { page } = req.query;

    const [employees, pages] = await Promise.all([
      this.employeeService.getEmployees(page),
      this.employeeService.getEmployeesCount(),
    ]);

    res.status(200).send({
      page,
      pages: Math.ceil(pages / Env.PAGE_LIMIT),
      total: employees.length,
      items: Env.PAGE_LIMIT,
      employees: employees.map((employee) => employee.toJSON()),
    });
  }
}
