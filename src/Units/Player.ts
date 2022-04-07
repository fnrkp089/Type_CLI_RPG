import { Units } from "./Units";
import { Items } from "../Item/Item";
const chalk = require('chalk');
export class Player extends Units{
  public inventory: Items[]
  public deathCount: number
  constructor(name: string, maxHp: number, attack: number, speed: number, exp: number, turn: number, level: number, unitActive: boolean, inventory: Items[]) {
    super(name, maxHp, attack, speed, exp, turn, level, unitActive);
    this.inventory = inventory
    this.deathCount = 0
  }

  recovery(): void {
    this.curHp = this.maxHp;
    this.deathCount++;
    console.log(chalk`{bold -다시한번. 나아가서 진실을 목도하라-}`);
    console.log(chalk`체력이 다시 회복됩니다: {green 현재 HP: ${this.curHp}}`);
    console.log('---------------');
  }

  levelUp(): void {
    this.level += 1;
    this.attack += 1;
    this.speed += 0.2;
    this.maxHp += 5;
    this.curHp = this.maxHp
    console.log(chalk`{yellow 플레이어의 레벨이 올랐습니다! 모든 체력이 회복되고 능력치가 조금씩 상승했습니다. 현재레밸: ${this.level}}`);
  }

  addExp(target: {exp: number}): void {
    this.exp += target.exp
    if (this.exp >= 30) {
      this.levelUp();
      this.exp -= 30
    }
  }
  skillTarget(target: { curHp: number }): void {
    target.curHp -= this.attack * 3;
  }
  healPlayer(Item: { value: number }, action: number): void{
    this.curHp += Item.value
    if (this.curHp >= this.maxHp)
      this.curHp = this.maxHp
    this.inventory.splice(action)
    console.log(chalk`{green 플레이어의 체력을 10만큼 회복했습니다. 현재체력: ${this.curHp}}`);
  }
}