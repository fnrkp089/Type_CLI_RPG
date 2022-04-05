import { Units } from "./Units";

export class Player extends Units{
  constructor(name: string, maxHp: number, attack: number, speed: number, exp: number, turn: number, level: number, unitActive: boolean) {
    super(name, maxHp, attack, speed, exp, turn, level, unitActive);
  }

  recovery(): void {
    this.curHp = this.maxHp;
    console.log(`-다시한번. 나아가서 진실을 목도하라-`);
    console.log(`체력이 다시 회복됩니다: 현재 HP: ${this.curHp}`);
    console.log('---------------');
  }

  levelUp(): string {
    this.level += 1;
    this.attack += 1;
    this.speed += 0.2;
    this.maxHp += 5;
    this.curHp += this.maxHp
    return `플레이어의 레벨이 올랐습니다! 현재레밸: ${this.level}`
  }

  addExp(target: {exp: number}): void {
    this.exp - target.exp
    if (this.exp <= 0) {
      this.levelUp();
      this.exp *= -1
    }
  }
}