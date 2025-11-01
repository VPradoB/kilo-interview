export class Award {
  private readonly id: string;
  private pref: number;
  private size: number;
  private entry: string;
  private application_id: string;
  private zone_id: string;

  private constructor(
    id: string,
    pref: number,
    size: number,
    entry: string,
    application_id: string,
    zone_id: string,
  ) {
    this.id = id;
    this.pref = pref;
    this.size = size;
    this.entry = entry;
    this.application_id = application_id;
    this.zone_id = zone_id;
  }

  static create(
    id: string,
    pref: number,
    size: number,
    entry: string,
    application_id: string,
    zone_id: string,
  ): Award {
    return new Award(id, pref, size, entry, application_id, zone_id);
  }
}
