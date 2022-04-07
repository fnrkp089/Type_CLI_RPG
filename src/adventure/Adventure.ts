import readlineSync = require('readline-sync');
import { Player } from '../Units/Player' //플레이어 클래스
const chalk = require('chalk');

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
        console.log(nowPlayer)
        graphTurn = false;
      break;
          
      default:
      console.log('올바른 키를 입력해 주세요');
    }
  }
}

export const endingTheme = (nowPlayer: Player):void => {
  console.log('답을 찾아낸듯한 자가 단말마의 비명을 지르며 쓰러졌습니다.');
  setTimeout(function(){
    console.log('이젠 의문점을 알수 있을것같습니다.');
    console.log('여기는 어디고 나는 누구인지에 대한 답이, 여기 죽어버린 시체의 품에 있는 쪽지에 적혀있을것입니다...');
  }, 1000);
  setTimeout(function () {
    console.log(chalk`-----------------------------------`);
    console.log(chalk`{yellow 제작기간 2일}`);
  }, 2000);
  setTimeout(function(){
    console.log(chalk`{green 플랫폼팀 화이팅!}`);
  }, 3000);
  setTimeout(function(){
    console.log(chalk`{bold 타입스크립트 어렵다...}`);
  }, 4000);
  setTimeout(function(){
    console.log(chalk`{bold 플레이해주시고 시청해주셔서 감사합니다}`);
    console.log(chalk`-----------------------------------`);
  }, 5000);
  setTimeout(function(){
    console.log(chalk`{bold 이제서야 당신은 당신이 누구인지, 위대한 의지가 누구인지 깨닫고 세상을 끝낼 하나의 주문을 외칩니다}`);
  }, 6000);
  setTimeout(function () {
    console.log(chalk`{green "컨트롤 + C"}`);
  }, 8000);
}