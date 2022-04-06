const chalk = require('chalk');
import readlineSync = require('readline-sync');
import { Player } from '../Units/Player' //플레이어 클래스
import { Units } from '../Units/Units' //유닛 클래스
import { Items } from '../Item/Item';
import { Elite } from '../Units/Elite';


export const generatePlayer = (playerName: string): Player => { // 플레이어 생성 함수
  let nowPlayer = new Player(playerName, 20, 1, 1, 0, 0, 1, true, [])
  return nowPlayer
}

export const generateNomalEnemy = (): Units => { // 노말 적 생성 함수
  const nomalEnemies: string[] = ['비탄에 찬 노예', '허공을 응시하는 노파', '의구심을 품은 방랑자', '답을 찾아 헤메이는 자', '두 눈을 감은 자'];
  const randomInt: number = Math.floor(Math.random() * ((nomalEnemies.length - 1)));
  const nomalEnemyName: string = nomalEnemies[randomInt];
  let encounter = new Units(nomalEnemyName, 10, 1, 1, 10, 0, 1, true)
  return encounter
}

export const generateEliteEnemy = (): Elite => { 
  const nomalEnemies: string[] = ['노예상인 무리', '낡은 기사', '배회자', '실성한 자', '비명자'];
  const randomInt: number = Math.floor(Math.random() * ((nomalEnemies.length - 1)));
  const nomalEnemyName: string = nomalEnemies[randomInt];
  let encounter = new Elite(nomalEnemyName, 15, 2, 1.2, 15, 0, 1, true)
  return encounter
}

export const userAction = (nowPlayer: Player, encounter: Units | Elite): void => { // 전투시 유저의 턴
  let graphTurn = true;
  while (graphTurn === true) {
    console.log('---------------')
    console.log(chalk`{red 1:일반 공격 }|| {blue 2: 특수공격} || {green 3: 아이템사용}`);
    let action = readlineSync.question('당신은 마음을 가다듬고 다음 행동을 준비합니다...: ');
    console.log('---------------')
    const attackCommentList: string[] = ['얼떨떨하게', '의구심에 찬 채로', '무언갈 갈구하듯', '답을 찾기위해', '영문도 모른채'] // 공격 Salt 메세지
    const skillCommentList: string[] = ['치즈를 자르듯', '회심의', '혼신의 힘을 다해', '의지가 이끄는 대로', '마무리짓기 위해'] // 특수 공격 Salt 메세지
    const randomInt: number = Math.floor(Math.random() * ((attackCommentList.length))) ;
    const attackComment: string = attackCommentList[randomInt];
    const skillComment: string = skillCommentList[randomInt];
    switch (action) {
      case '1':
        nowPlayer.hitTarget(encounter)
        console.log(chalk`당신은 ${encounter.name}에게 ${attackComment}{red ${nowPlayer.attack}} 의 공격을 가했습니다.`);
        console.log(chalk`현재 ${encounter.name}의 남은 체력 : {green [${encounter.maxHp}/${encounter.curHp}]}`);
        if (nowPlayer.turn < 2) {
          nowPlayer.turn += 1
        }
        graphTurn = false;
        break;
      
      case '2':
        if (nowPlayer.turn === 2) {
          nowPlayer.skillTarget(encounter)
          console.log(chalk`당신은 ${encounter.name}에게 {yellow ${skillComment}} {red ${nowPlayer.attack * 3}}의 공격을 가했습니다.`);
          nowPlayer.turn = 0;
          graphTurn = false;
          break;
        } else {
          console.log(chalk`아직 특수 공격을 사용할 수 없습니다, {yellow 두번 공격 적중 후 사용 가능합니다.} 현재 공격 적중수 : ${nowPlayer.turn}회`)
          break;
        }
        
      case '3':
        console.log(nowPlayer)
        if (nowPlayer.inventory.length === 0) {
          console.log(`소지품에 아무런 물건도 존재하지 않습니다.`);
          break;

        } else {
          for (let i = 0; i < nowPlayer.inventory.length; i++){
            console.log(chalk` {green ${[i]}. ${nowPlayer.inventory[i].name} : 회복 ${nowPlayer.inventory[i].value}}`)
          }
          let action = readlineSync.question('사용할 아이템의 번호를 입력해주세요: ');
          if (nowPlayer.inventory[action] === undefined) {
            console.log(`올바른 아이템 번호를 입력해 주세요`)
            break;
          } else {
            nowPlayer.healPlayer(nowPlayer.inventory[action], action)
            graphTurn = false;
            break;
          }
        }
        
      default:
        console.log('올바른 키를 입력해 주세요');
    }
  }
}
export const encounterAction = (nowPlayer: Player, encounter: Units | Elite , encounterKillCount: number): void => { //전투시 적의 턴 함수
  if (nowPlayer.unitActive === true && encounter.curHp > 0) {
    if ('Elite' in encounter && encounter.turn === 2) {
      encounter.skillTarget(nowPlayer)
      console.log(chalk`{bold ${encounter.name}}가 검은 기운으로 넘실거리더니 {red.bold ${encounter.attack * 2}}의 공격을 가했습니다!!!`);
      console.log(`현재 당신의 남은 체력 : ${chalk.green(`[${nowPlayer.maxHp}/${nowPlayer.curHp}]`)}`);
      encounter.turn = 0;
    } else {
      encounter.hitTarget(nowPlayer)
      console.log(chalk`{bold ${encounter.name}}가 {red ${encounter.attack}}의 공격을 가했습니다`);
      console.log(`현재 당신의 남은 체력 : ${chalk.green(`[${nowPlayer.maxHp}/${nowPlayer.curHp}]`)}`);
      encounter.turn++;
    }
    
    if (nowPlayer.curHp <= 0) { // 플레이어가 죽엇을때 부활
      console.log('---------------')
      console.log('힘이 다해 쓰러질 찰나, 무언가 거대한 의지가 당신을 강제로 일으켜 세웁니다');
      console.log('- 너는 아직 이름을 찾지 못했다.-')
      nowPlayer.recovery();
    }
  } else if (encounter.curHp <= 0) { //적이 죽엇을때
    encounter.unitActive = false;
    nowPlayer.addExp(encounter)
    console.log(nowPlayer.name + '은' + encounter.name + '에게 [답]을 주었습니다.');
    const portion: Items = {name: '작은 포션', info: '작은 포션이다', value: 10}
    console.log(portion)
    nowPlayer.inventory.push(portion)
    encounterKillCount++;
  }
}

export const attackStage = (nowPlayer: Player, encounter: Units | Elite, encounterKillCount: number): void => { // 마주침 단계
  if (encounter.unitActive) {
    while (encounter.curHp > 0) {
      if (nowPlayer.speed >= encounter.speed) {
        userAction(nowPlayer, encounter);
        encounterAction(nowPlayer, encounter, encounterKillCount);
      } else {
        encounterAction(nowPlayer, encounter, encounterKillCount);
        userAction(nowPlayer, encounter);
      }
    }
  }
}

export const recoveryEncounter = (encounter): Units | Elite => {
  encounter = generateNomalEnemy();
  return encounter
}
