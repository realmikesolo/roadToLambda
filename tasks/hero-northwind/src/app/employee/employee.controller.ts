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

    const response: GetEmployeesResponse = {
      page,
      pages: Math.ceil(rows / Env.PAGE_LIMIT),
      items: Env.PAGE_LIMIT,
      total: rows,
      employees: employees.map((employee) => {
        return {
          employeeID: employee.employeeID,
          lastName: employee.lastName,
          firstName: employee.firstName,
          title: employee.title,
          titleOfCourtesy: employee.titleOfCourtesy,
          birthDate: employee.birthDate,
          hireDate: employee.hireDate,
          address: employee.address,
          city: employee.city,
          region: employee.region,
          postalCode: employee.postalCode,
          country: employee.country,
          homePhone: employee.homePhone,
          extension: employee.extension,
          notes: employee.notes,
          reportsTo: employee.reportsTo,
        };
      }),
    };

    res.status(200).send(response);
  }

  public async getEmployee(req: GetEmployeeRequest, res: FastifyReply): Promise<void> {
    const { id } = req.query;

    const employee = await this.employeeService.getEmployee(id);
    if (!employee) {
      return res.status(404).send({ message: 'Employee not found' });
    }

    const employeeReportsTo: EmployeeModel | null = employee.getDataValue('employee');

    const response: GetEmployeeResponse = {
      employee: {
        reportID: employeeReportsTo?.employeeID ?? null,
        reportFirstName: employeeReportsTo?.firstName ?? null,
        reportLastName: employeeReportsTo?.lastName ?? null,
        employeeID: employee.employeeID,
        lastName: employee.lastName,
        firstName: employee.firstName,
        title: employee.title,
        titleOfCourtesy: employee.titleOfCourtesy,
        birthDate: employee.birthDate,
        hireDate: employee.hireDate,
        address: employee.address,
        city: employee.city,
        region: employee.region,
        postalCode: employee.postalCode,
        country: employee.country,
        homePhone: employee.homePhone,
        extension: employee.extension,
        notes: employee.notes,
        reportsTo: employee.reportsTo,
      },
    };

    res.status(200).send(response);
  }
}
