import { Env } from '../env';
import EmployeeModel from '../models/employee';

export class EmployeeService {
  public async getEmployees(page: number) {
    const employees = await EmployeeModel.findAll({
      limit: Env.PAGE_LIMIT,
      offset: (page - 1) * 20,
    });

    return { page, employees, total: employees.length, items: Env.PAGE_LIMIT };
  }
}
