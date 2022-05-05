export function transformData(input: InputData): OutputData {
  const output: OutputData = [];

  for (const item of input) {
    const temp = {
      userId: item.user._id,
      name: item.user.name,
      weekendDates: [{ startDate: item.startDate, endDate: item.endDate }],
    };

    const index = output.findIndex((user) => temp.userId === user.userId);

    if (index === -1) {
      output.push(temp);
    } else {
      output[index].weekendDates.push(...temp.weekendDates);
    }
  }

  return output;
}

type InputData = Array<{
  _id: string;
  user: { _id: string; name: string };
  usedDays: number;
  startDate: string;
  endDate: string;
  status?: string;
}>;

type OutputData = Array<{
  userId: string;
  name: string;
  weekendDates: Array<{ startDate: string; endDate: string }>;
}>;
