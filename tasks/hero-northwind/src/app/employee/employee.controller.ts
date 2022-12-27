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
      items: Env.PAGE_LIMIT,
      total: rows,
      employees: employees.map((employee) => {
        employee = employee.toJSON();

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

    const employeeJSON = employee.toJSON();

    const response: GetEmployeeResponse = {
      employee: {
        reportID: employeeJSON.employee?.employeeID ?? null,
        reportFirstName: employeeJSON.employee?.firstName ?? null,
        reportLastName: employeeJSON.employee?.lastName ?? null,
        employeeID: employeeJSON.employeeID,
        lastName: employeeJSON.lastName,
        firstName: employeeJSON.firstName,
        title: employeeJSON.title,
        titleOfCourtesy: employeeJSON.titleOfCourtesy,
        birthDate: employeeJSON.birthDate,
        hireDate: employeeJSON.hireDate,
        address: employeeJSON.address,
        city: employeeJSON.city,
        region: employeeJSON.region,
        postalCode: employeeJSON.postalCode,
        country: employeeJSON.country,
        homePhone: employeeJSON.homePhone,
        extension: employeeJSON.extension,
        notes: employeeJSON.notes,
        reportsTo: employeeJSON.reportsTo,
      },
    };

    res.status(200).send(response);
  }
}
