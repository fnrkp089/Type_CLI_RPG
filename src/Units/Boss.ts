import { Units } from "./Units";
const chalk = require('chalk');
export class Boss extends Units{
  public Boss: boolean
  public shield: number
  constructor(name: string, maxHp: number, attack: number, speed: number, exp: number, turn: number, level: number, unitActive: boolean) {
    super(name, maxHp, attack, speed, exp, turn, level, unitActive);
    this.Boss = true
    this.shield = 0
  }
  
  skillTarget(target: { curHp: number }): void {
    target.curHp -= this.attack * 2;
  }

  generateShield(): void{
    console.log(chalk`{red.bold "간지럽구나" } 보스 주변이 얇은 막으로 감싸집니다!`);
    if (this.shield !== 0) {
      this.curHp += 2
    } else {
      this.shield += 2
    }
  } 

  greaterHeal(): void {
    this.curHp += 10;
    console.log(chalk`{red.bold "겨우 이정도의 힘이냐?"} 보스의 체력이 10 만큼 회복됩니다! 현재 보스의 체력{green ${this.curHp}}`);
  }
}