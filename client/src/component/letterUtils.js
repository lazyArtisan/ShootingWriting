import { gsap } from "gsap";

// 랜덤 알파벳 생성 함수
export const getRandomLetter = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
};

// 랜덤 알파벳을 생성하고 화면에서 좌측으로 이동시키는 함수
export const createLetter = () => {
  const letter = document.createElement("div");
  letter.innerText = getRandomLetter();
  letter.classList.add("moving-letter"); // 스타일을 적용할 클래스

  // 초기 위치 설정 (화면 오른쪽에서 나타남)
  letter.style.position = "absolute";
  letter.style.top = `${Math.random() * (window.innerHeight - 50)}px`; // 화면 내에서 생성
  letter.style.left = `${window.innerWidth}px`; // 정확히 화면 오른쪽 끝에 위치

  // 문서를 추가하고 애니메이션
  document.body.appendChild(letter);

  // GSAP 애니메이션: 글자를 왼쪽으로 이동
  gsap.to(letter, {
    x: -window.innerWidth - 100, // 화면 왼쪽 바깥으로 이동
    duration: Math.random() * 5 + 3, // 랜덤 속도
    ease: "linear",
    onComplete: () => {
      letter.remove(); // 화면을 벗어나면 제거
    },
  });
};
