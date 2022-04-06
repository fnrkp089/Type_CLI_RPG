import { Units } from "./Units";
const chalk = require('chalk');
export class Elite extends Units{
  public Elite: boolean
  constructor(name: string, maxHp: number, attack: number, speed: number, exp: number, turn: number, level: number, unitActive: boolean) {
    super(name, maxHp, attack, speed, exp, turn, level, unitActive);
    this.Elite = true
  }
  
  skillTarget(target: { curHp: number }): void {
    target.curHp -= this.attack * 2;
  }
}