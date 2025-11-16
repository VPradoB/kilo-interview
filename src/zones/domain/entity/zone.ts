export class Zone {
  private readonly id: number;
  private name: string;

  private constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static create(id: number, name: string): Zone {
    return new Zone(id, name);
  }
}
