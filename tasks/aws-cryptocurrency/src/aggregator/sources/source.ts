export abstract class Source {
  public abstract getPrices(symbols?: string[]): Promise<Map<string, number>>;
}
