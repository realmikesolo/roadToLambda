import { FastifyReply } from 'fastify';
import { Env } from '../../env';
import {
  GetEmployeeRequest,
  GetEmployeeResponse,
  GetEmployeesRequest,
  GetEmployeesResponse,
} from './employee.router';
import { EmployeeService } from './employee.service';

export class EmployeeController {
  private readonly employeeService = new EmployeeService();

  public async getEmployees(req: GetEmployeesRequest, res: FastifyReply): Promise<void> {
    const { page } = req.query;

    const [employees, rows] = await Promise.all([
      this.employeeService.getEmployees(page),
      this.employeeService.getEmployeesCount(),
    ]);

    const response: GetEmployeesResponse = {
      page,
      pages: Math.ceil(rows / Env.PAGE_LIMIT),
      total: rows,
      items: Env.PAGE_LIMIT,
      employees: employees.map((employee) => employee.toJSON()),
    };

    res.status(200).send(response);
  }

  public async getEmployee(req: GetEmployeeRequest, res: FastifyReply): Promise<void> {
    const { id } = req.query;

    const employee = await this.employeeService.getEmployee(id);
    if (!employee) {
      return res.status(404).send({ message: 'Employee not found' });
    }

    const response: GetEmployeeResponse = {
      employee: employee.toJSON(),
    };

    res.status(200).send(response);
  }
}
