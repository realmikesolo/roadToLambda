import { Env } from '../../env';
import EmployeeModel from '../../models/employee';

export class EmployeeService {
  public async getEmployees(page: number): Promise<EmployeeModel[]> {
    return EmployeeModel.findAll({
      limit: Env.PAGE_LIMIT,
      offset: (page - 1) * Env.PAGE_LIMIT,
    });
  }

  public async getEmployeesCount(): Promise<number> {
    return EmployeeModel.count();
  }

  public async getEmployee(id: number): Promise<EmployeeModel | null> {
    return EmployeeModel.findByPk(id);
  }
}
