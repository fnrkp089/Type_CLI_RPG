import readlineSync = require('readline-sync');
import { Units } from './Units/Units'
import { Player } from './Units/Player'
let playerName = readlineSync.question('당신은 어둠속에서 눈을 떴습니다, 허나 이름이 기억나지않습니다. 고심끝에 당신은 스스로를 ...라 칭하기로 결심했습니다: ');

const inTheDarkAlone = (): void => {
  let nowPlayer: any
  let encounter: any
  let encounterKillCount: number = 0;

  const generateNomalEnemy = (): void => { // 노말 적 생성 함수
    const nomalEnemies: string[] = ['비탄에 찬 노예', '허공을 응시하는 노파', '의구심을 품은 방랑자', '답을 찾아 헤메이는 자', '두 눈을 감은 자'];
    const randomInt: number = Math.floor(Math.random() * ((nomalEnemies.length - 1) - 0 + 1)) + 0;
    const nomalEnemyName: string = nomalEnemies[randomInt];
    encounter = new Units(nomalEnemyName, 10, 1, 1, 10, 0, 1, true)
  }

  const generatePlayer = (): void => { // 플레이어 생성 함수
    nowPlayer = new Player(playerName, 20, 1, 1, 30, 0, 1, true)
  }

  const userAction = (): void => { // 전투시 유저의 턴
    console.log('---------------')
    console.log('1은 일반 공격')
    console.log('2은 특수공격')
    console.log('3은 물약이 존재할 경우 회복할수 잇습니다')
    let action = readlineSync.question('당신은 마음을 가다듬고 다음 행동을 준비합니다...: ');
    console.log('---------------')
    const attackCommentList: string[] = [' 혼신의 힘을 다해 ', ' 의구심에 찬 채로 ', ' 무언갈 갈구하듯 ', ' 답을 찾기위해 ', ' 영문도 모른채 '] // 공격 Salt 메세지
    const randomInt: number = Math.floor(Math.random() * ((attackCommentList.length - 1) - 0 + 1)) + 0;
    const attackComment: string = attackCommentList[randomInt];
    switch(action) {
			case '1':
				nowPlayer.hitTarget(encounter)
        console.log('당신은  ' + encounter.name + '에게' + attackComment + nowPlayer.attack + '의 공격을 가했습니다.');
        console.log(`현재 ${encounter.name}의 남은 체력 : ${encounter.curHp}`);
        break;
      
        case '2':
          break;
      
        case '3':
          break;
			default:
				console.log('올바른 키를 입력해 주세요');
		}
  }

  const encounterAction = (): void => { //전투시 적의 턴
    if(nowPlayer.unitActive === true && encounter.curHp > 0) { 
			encounter.hitTarget(nowPlayer)
      console.log(encounter.name + '가' + encounter.attack + '의 공격을 가했습니다');
      console.log(`현재 당신의 남은 체력 : ${nowPlayer.curHp}`);

      if (nowPlayer.curHp <= 0) { // 플레이어가 죽엇을때 부활
        console.log('---------------')
        console.log('힘이 다해 쓰러질 찰나, 무언가 거대한 의지가 당신을 강제로 일으켜 세웁니다');
        console.log('- 너는 아직 이름을 찾지 못했다.-')
        nowPlayer.recovery();
			}

		} else if (encounter.curHp <= 0) { //적이 죽엇을때
			encounter.unitActive = false;
      nowPlayer.addExp(encounter.exp)
      console.log(nowPlayer.name + '은' + encounter.name + '에게 [답]을 주었습니다.');
      encounterKillCount++;
		}
  }

  const AttackStage = (): void => { // 마주침 단계
    if (encounter.unitActive) {
      while (encounter.curHp > 0) {
        if (nowPlayer.speed >= encounter.speed) {
          userAction();
          encounterAction();
        } else {

          encounterAction();
          userAction();
        }
      }
    }
  }

  const recoveryEncounter = (): void => {
    generateNomalEnemy();
  }
  const initialize = (): void => {
    generatePlayer();
    console.log('무언가 거대한 의지가 속삭입니다 - 나아가라- 홀린듯 발걸음을 옮겨봅니다.');
    console.log('어둠속에서 무언가 비명을 지르며 달려옵니다!');
    recoveryEncounter();
    AttackStage();
  }
  initialize();
}
inTheDarkAlone();
