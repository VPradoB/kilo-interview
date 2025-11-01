class Reservation {
  private zone: number;
  private date: Date;

  constructor(zone: number, date: Date) {
    this.zone = zone;
    this.date = date;
  }
}
export class Application {
  private readonly id: number;
  private reservations: Reservation[];
  private is_awarded: boolean;
  private award_id: number | null;

  private constructor(
    id: number,
    reservations: Reservation[],
    is_awarded: boolean,
    award_id: number | null,
  ) {
    this.id = id;
    this.reservations = reservations;
    this.is_awarded = is_awarded;
    this.award_id = award_id;
  }

  static create(
    id: number,
    date1: Date,
    date2: Date,
    date3: Date,
    zone1: number,
    zone2: number,
    zone3: number,
    is_awarded: boolean,
    award_id: number | null,
  ) {
    const reservations: Reservation[] = [];
    for (const [zone, date] of [
      [zone1, date1],
      [zone2, date2],
      [zone3, date3],
    ]) {
      reservations.push(new Reservation(zone, date));
    }

    return new Application(id, reservations, is_awarded, award_id);
  }
}
