import { FastifyReply } from 'fastify';
import { Env } from '../../env';
import EmployeeModel from '../../models/employee';
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

    const logs = [employees.log, rows.log];

    const response: GetEmployeesResponse = {
      page,
      pages: Math.ceil(rows.data / Env.PAGE_LIMIT),
      items: Env.PAGE_LIMIT,
      total: rows.data,
      stats: {
        queries: logs.length,
        log: logs,
      },
      employees: employees.data.map((employee) => employee.toAPI),
    };

    res.status(200).send(response);
  }

  public async getEmployee(req: GetEmployeeRequest, res: FastifyReply): Promise<void> {
    const { id } = req.query;

    const { data: employee, log } = await this.employeeService.getEmployee(id);
    if (!employee) {
      return res.status(404).send({ message: 'Employee not found' });
    }

    const employeeReportsTo: EmployeeModel | null = employee.getDataValue('employee');

    const response: GetEmployeeResponse = {
      stats: {
        queries: 1,
        log: [log],
      },
      employee: {
        reportID: employeeReportsTo?.employeeID ?? null,
        reportFirstName: employeeReportsTo?.firstName ?? null,
        reportLastName: employeeReportsTo?.lastName ?? null,
        ...employee.toAPI,
      },
    };

    res.status(200).send(response);
  }
}
