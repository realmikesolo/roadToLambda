import { Log } from '../../db';
import { Env } from '../../env';
import EmployeeModel from '../../models/employee';

export class EmployeeService {
  public async getEmployees(page: number): Promise<{ data: EmployeeModel[]; log: Log }> {
    let query!: string;
    let duration!: number;

    const data = await EmployeeModel.findAll({
      limit: Env.PAGE_LIMIT,
      offset: (page - 1) * Env.PAGE_LIMIT,
      benchmark: true,
      logging: (req: string, ms: number) => {
        query = req;
        duration = ms;
      },
    });

    return { data, log: { query, duration: `${duration}ms`, ts: new Date().toISOString() } };
  }

  public async getEmployeesCount(): Promise<{ data: number; log: Log }> {
    let query!: string;
    let duration!: number;

    const data = await EmployeeModel.count({
      benchmark: true,
      logging: (req: string, ms: number) => {
        query = req;
        duration = ms;
      },
    });

    return { data, log: { query, duration: `${duration}ms`, ts: new Date().toISOString() } };
  }

  public async getEmployee(id: number): Promise<{ data: EmployeeModel | null; log: Log }> {
    let query!: string;
    let duration!: number;

    const data = await EmployeeModel.findByPk(id, {
      include: [
        {
          model: EmployeeModel,
          attributes: ['lastName', 'firstName', 'employeeID'],
        },
      ],
      benchmark: true,
      logging: (req: string, ms: number) => {
        query = req;
        duration = ms;
      },
    });

    return { data, log: { query, duration: `${duration}ms`, ts: new Date().toISOString() } };
  }
}
