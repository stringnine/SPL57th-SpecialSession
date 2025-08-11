// --- 요소 선택 ---
const loginScreen = document.getElementById('login-screen');
const codeScreen = document.getElementById('code-screen');
const profileScreen = document.getElementById('profile-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');

const loginBtn = document.getElementById('login-btn');
const codeSubmitBtn = document.getElementById('code-submit-btn');
const nicknameInput = document.getElementById('nickname-input');
const checkNicknameBtn = document.getElementById('check-nickname-btn');
const signupBtn = document.getElementById('signup-btn');
const welcomeMessage = document.getElementById('welcome-message');
const startBtn = document.getElementById('start-btn');

// --- 로직을 위한 상태 변수 ---
let isNicknameChecked = false; // 닉네임 중복 확인 통과 여부를 저장하는 '스위치'

// --- 이벤트 리스너 ---

// 'Start with Google' 버튼
loginBtn.addEventListener('click', () => {
    loginScreen.classList.add('hidden');
    codeScreen.classList.remove('hidden');
});

// '인증하기' 버튼 (초대 코드)
codeSubmitBtn.addEventListener('click', () => {
    // TODO: 초대 코드 검증 로직
    codeScreen.classList.add('hidden');
    profileScreen.classList.remove('hidden');
});

// 닉네임 입력 시 중복 확인 상태를 '안함'으로 초기화
nicknameInput.addEventListener('input', () => {
    isNicknameChecked = false;
});

// '중복확인' 버튼
checkNicknameBtn.addEventListener('click', () => {
    const nickname = nicknameInput.value;
    const existingNicknames = ['코딩왕', '리액트신', '스프링57기']; // 가상 데이터

    if (!nickname || nickname.length < 2 || nickname.length > 10) {
        alert('닉네임을 2~10자 사이로 입력해주세요.');
        isNicknameChecked = false; // 실패 시 스위치를 꺼진 상태로 유지
        return;
    }

    // TODO: 실제 Firebase DB 연동 필요
    if (existingNicknames.includes(nickname)) {
        alert('이미 사용 중인 닉네임입니다!');
        isNicknameChecked = false; // 실패 시 스위치를 꺼진 상태로 유지
    } else {
        alert('사용 가능한 닉네임입니다!');
        isNicknameChecked = true; // ✨ 성공 시에만 스위치를 켬!
    }
});

// '회원가입' 버튼
signupBtn.addEventListener('click', () => {
    const nickname = nicknameInput.value;

    // 1. 닉네임 길이 규칙 검증
    if (!nickname || nickname.length < 2 || nickname.length > 10) {
        alert('닉네임을 2~10자 사이로 입력해주세요.');
        return; // 여기서 함수 종료
    }

    // 2. 중복 확인 통과 여부 검증
    if (!isNicknameChecked) {
        alert('닉네임 중복확인을 해주세요!');
        return; // 여기서 함수 종료
    }

    // 모든 검증을 통과한 경우에만 아래 코드가 실행됨
    console.log('회원가입 성공! 닉네임:', nickname);
    // TODO: Firebase에 프로필 정보 최종 저장

    // 환영 메시지 설정
    welcomeMessage.innerHTML = `${nickname}님,<br>반갑습니다.`;

    // 화면 전환
    profileScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
});

// '시작하기' 버튼 (환영 화면)
startBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
});