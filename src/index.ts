import readlineSync = require('readline-sync');
const chalk = require('chalk');
import { Units } from './Units/Units' //유닛 클래스
import { Player } from './Units/Player'// 플레이어 클래스
import { adventureDark} from './adventure/Adventure' //모험 함수들
import { generatePlayer, generateNomalEnemy, generateEliteEnemy, attackStage, userAction, encounterAction, recoveryEncounter } from './adventure/Battle' //전투 함수들
import { Elite } from './Units/Elite';
console.log(chalk`{bold 당신은 어둠속에서 눈을 떴습니다, 허나 이름이 기억나지않습니다...}`)
let playerName = readlineSync.question('고심끝에 당신은 스스로를 ...라 칭하기로 결심했습니다: ');

const inTheDarkAlone = (): void => {
  let nowPlayer: Player = generatePlayer(playerName);
  let encounter: Units | Elite;
  let encounterKillCount: number = 0;

  const initialize = (): void => {
    console.log(chalk`무언가 거대한 의지가 속삭입니다 {bold - 나아가라- }홀린듯 발걸음을 옮겨봅니다.`);
    console.log('아무리 생각해도 왜 이곳에 자신이 있는지, 자신의 원래 이름이 기억이 나지않습니다.');
    console.log('생각이 깊어질수록 어둠 역시 짙어지기 시작했습니다.');
    console.log('<...>');
    console.log(chalk`{bold 그러다가 당신은 나아가기로 결심합니다.}`);
    console.log('...갑자기 어둠속에서 무언가 달려옵니다!');
    encounter = generateEliteEnemy();
    attackStage(nowPlayer, encounter, encounterKillCount);
    while (encounterKillCount < 30) {
      console.log('---------------')
      console.log('...아직도 영문을 모르겠습니다. 허나 분명한것은 어둠속에 악의가 가득찼다는것입니다.')
      console.log(chalk`무언가 거대한 의지가 속삭입니다 {bold - 나아가라- } 다시금 발걸음을 옮겨봅니다.`);
      console.log('...또다시 어둠속에서 무언가 달려옵니다!');
      encounter = generateEliteEnemy();
      attackStage(nowPlayer, encounter, encounterKillCount);
      // adventureDark(nowPlayer);
    }
  }
  initialize();
}
inTheDarkAlone();
