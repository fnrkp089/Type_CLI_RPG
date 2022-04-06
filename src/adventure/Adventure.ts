import readlineSync = require('readline-sync');
import { Player } from '../Units/Player' //플레이어 클래스
import { Units } from '../Units/Units' //유닛 클래스
const chalk = require('chalk');

export const generateNomalEnemy = (): Units => { // 노말 적 생성 함수
  const nomalEnemies: string[] = ['비탄에 찬 노예', '허공을 응시하는 노파', '의구심을 품은 방랑자', '답을 찾아 헤메이는 자', '두 눈을 감은 자'];
  const randomInt: number = Math.floor(Math.random() * ((nomalEnemies.length - 1))) ;
  const nomalEnemyName: string = nomalEnemies[randomInt];
  let encounter = new Units(nomalEnemyName, 10, 1, 1, 10, 0, 1, true)
  return encounter
}

export const adventureDark = (nowPlayer: Player): void => { //모험 단계
  let graphTurn = true;
  while (graphTurn === true) {
    console.log('---------------')
    console.log('...아직도 영문을 모르겠습니다.')
    console.log('저들은 누구고 왜 자신을 공격하려 하는지...')
    console.log(chalk`무언가 거대한 의지가 속삭입니다 {bold - 나아가라 다시금 나아가라- } 다시금 발걸음을 옮겨봅니다.`);
    console.log(chalk`{blue 1: 주위의 어둠으로 걸어간다 }|| {red 2. 더 깊은 어둠으로 걸어간다} || {green 3: 자신을 살펴본다}`);
    let nextMovment = readlineSync.question(chalk`{yellow ${nowPlayer.name}, 무얼 하고 싶으신가요?}`);
    switch (nextMovment) {
      case '1':
        console.log('노말')
        graphTurn = false;
      break;
          
      case '2':
        if (nowPlayer.level < 5) { //레벨이 부족할때
          console.log(chalk`{red 아직 더 깊은곳을 가보기에는 두려움이 앞섭니다... 그래도 도전해 보시겠습니까?}`);
          let confirm = readlineSync.question(chalk`{red 1. 들어간다} || {green 2. 아직은 떄가 아니다.}`);
          switch (confirm) {
            case '1':
              console.log(chalk`{bold 무언가 거대한 의지가 속삭입니다 - 네 운명을 눈치 채었느냐? - }`);
              graphTurn = false;
              break;
            case '2':
              console.log(chalk`{bold 무언가 거대한 의지가 속삭입니다 - 때로는 도망치는것도 현명하다 - }`);
              break;
            default:
              console.log('올바른 키를 입력해 주세요');
          }
        } else {
          console.log(chalk`{bold 무언가 거대한 의지가 속삭입니다 - 깊은곳에서 너를 기다리고 있겠다. - }`);
        }
      break;
            
      case '3': // 플레이어 스탯 확인
        console.log('---------------')
        console.log(chalk`{green 이름(임시의): }${nowPlayer.name}`)
        console.log(chalk`{red 최대 체력: ${nowPlayer.maxHp} / 현재 체력: ${nowPlayer.curHp}}`)
        console.log(chalk`{yellow 현재 레벨:${nowPlayer.level}}`)
        console.log('---------------')
        graphTurn = false;
      break;
          
      default:
      console.log('올바른 키를 입력해 주세요');
    }
  }
}