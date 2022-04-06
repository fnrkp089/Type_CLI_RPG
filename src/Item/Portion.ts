export class Portion {
  public name: string
  public info: string
  public heal: number
  constructor(name: string, info: string, heal: number) {
    this.name = name;
    this.info = info;
    this.heal = heal;
  }
}