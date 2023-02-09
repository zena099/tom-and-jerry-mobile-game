const $html = document.querySelector('html');
const $timer = document.querySelector('.timer'); //타이머
const $score = document.querySelector('.score'); //누적점수
const $game = document.querySelector('.game');
const $$cells = document.querySelectorAll('.cell');
const $failBox = document.querySelector('.failed');
const $winbox = document.querySelector('.win');
const $socBox = document.querySelector('.soc');
const $scoreBtn = document.querySelector('.sc_btn');
const $scoreResult = document.querySelector('.sc');
const $$result = document.querySelectorAll('.result');

/* 기능별 변수 지정 */
const holes = [0, 0, 0, 0, 0, 0, 0, 0];
let started = false;
let score = 0;
let time = 30;

/* 이미지 움직이기 */
window.addEventListener('load', function(){
    if(started) return; // 이미 시작했으면 무시, 사용자가 여러번 클릭했을 때 다시 눌리지 않도록 하는 장치
    started = true;

    //타이머
    const timerId = setInterval(function(){
        time--;
        $timer.textContent = time;
        if(time === 0){
            clearInterval(timerId);
            clearInterval(tickId);
            setTimeout(doDisplay,1100); // 스코어 점수 결과 화면 출력
        }      
    }, 1000);// 타이머가 1초씩 감소
    const tickId = setInterval(tick, 1000); //이미지가 1초마다 올라왔다 내려갔다 하게 함
    tick();
});

/* 스코어 점수별로 다른 창 나오게 하는 함수 */
function doDisplay(){   
    if(score < 50){
        $failBox.classList.replace('hide','show');
    }else if((score >= 50)){
        $winbox.classList.replace('hide','show');
    }
}

/* 비율을 설정해서 랜덤하게 나오게 하기 */
let jerryPercent = 0.2;
let bombPercent = 0.3;
function tick() {
    holes.forEach(function(hole, index){
        if(hole)return;
        const randomValue = Math.random();
        if(randomValue < jerryPercent){
            const $jerry = $$cells[index].querySelector('.jerry');
            holes[index] = setTimeout(function(){
                $jerry.classList.add('hidden');
                holes[index] = 0;
            },1000);
            $jerry.classList.remove('hidden');
        }else if(randomValue < bombPercent){
            const $bomb = $$cells[index].querySelector('.bomb');
            holes[index] = setTimeout(function(){
                $bomb.classList.add('hidden');
                holes[index]=0;
            },1000);
            $bomb.classList.remove('hidden');
        }
    });
}

/* 클릭하면 이미지 바꾸기 */
$$cells.forEach(function($cell, index){//$cell --> 각 배열의 요소
    $cell.querySelector('.jerry').addEventListener('click',function(e){
        //if조건문을 통해 점수주기 (조건문 사용 => 여러번 클릭시 점수가 중복해서 증가되는 것을 방지)
        if(!e.target.classList.contains('dead')){
            score += 2;
            $score.textContent = score;
        }

        // 제리 이미지 체인지
        e.target.classList.add('dead');
        e.target.classList.add('hidden');
        clearTimeout(holes[index]); //기존 타이머 제거, 누르는 즉시 사라지게 하기
        setTimeout(function(){
            holes[index]=0;//배열 정보 원래대로 되돌리기
            e.target.classList.remove('dead'); // 제거 안하면 바뀐 이미지가 계속 올라옴
        }, 1000);
    });
    $cell.querySelector('.bomb').addEventListener('click',function(e){
        //if조건문을 통해 점수주기 (조건문 사용 => 여러번 클릭시 점수가 중복해서 증가되는 것을 방지)
        if(!e.target.classList.contains('boom')){
            score -= 2;
            $score.textContent = score;
        }

        // 폭탄 이미지 체인지
        e.target.classList.add('boom');
        e.target.classList.add('hidden');
        clearTimeout(holes[index]); //기존 타이머 제거, 누르는 즉시 사라지게 하기
        setTimeout(function(){
            holes[index]=0;//배열 정보 원래대로 되돌리기
            e.target.classList.remove('boom'); // 제거 안하면 바뀐 이미지가 계속 올라옴
        }, 1000);
    });
});

/* 버튼 클릭 - 스코어 결과 화면 출력, 다시하기 버튼 누르면 재시작, a태그 누르면 화면 숨기기 */
$$result.forEach(function($result){
    $result.querySelector('.re_btn').addEventListener('click',function(){
        location.reload(true);
    });
    $result.querySelector('.sc_btn').addEventListener('click',function(){
        $failBox.classList.replace('show', 'hide');
        $winbox.classList.replace('show', 'hide');
        $socBox.classList.replace('hide', 'show');
        $scoreResult.textContent= score;
    })
    $result.querySelector('a').addEventListener('click',function(){
        $failBox.classList.replace('show', 'hide');
        $winbox.classList.replace('show', 'hide');
        $socBox.classList.replace('show', 'hide');
    });
});