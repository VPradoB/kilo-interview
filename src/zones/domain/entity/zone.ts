export class Zone {
  private readonly id: string;
  private name: string;

  private constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static create(id: string, name: string): Zone {
    return new Zone(id, name);
  }
}
