const chalk = require('chalk');
interface IPortion {
  name: string;
  info: string;
  heal: number;
}
export class Units { //유닛
  public name: string; //이름
  public maxHp: number; // 최대 체력
  public curHp: number; // 현재 체력
  public attack: number; // 공격력
  public speed: number; // 스피드
  public exp: number; // 경험치
  public turn: number; // 현재 턴
  public level: number; // 레벨
  public unitActive: boolean; // 사망여부
  
  constructor(name: string, maxHp: number, attack: number, speed: number, exp: number, turn: number, level: number, unitActive:boolean ){
    this.name = name;
    this.maxHp = maxHp;
    this.curHp = maxHp;
    this.attack = attack;
    this.speed = speed;
    this.exp = exp;
    this.turn = turn;
    this.level = level;
    this.unitActive = unitActive;
  }
  hitTarget(target: { curHp: number, shield?: number }) {
    if (target.shield > 0) {
      console.log(chalk`{blue.bold 상대방의 얇은 막이 공격을 조금 흡수하고 사라집니다!}`);
      let trueDmg = this.attack -= target.shield;
      target.shield = 0;
      target.curHp -= trueDmg
    }
    target.curHp -= this.attack;
  }
}



