## [WEEK13] 실력 다지기 : 게시판 과제

영상 : https://www.youtube.com/watch?v=Fej_Fc2lXto

하얀 사각형 안은 Phaser,<br>
그 바깥은 전부 React로 구현. <br>
서버는 Node.js + MongoDB 사용. <br>

총알을 쏴서 맞추어 글을 입력하는 게임형 게시판.

 <br>

## 기술적 챌린지
### 파일 간 정보 주고받기
리액트만 쓴게 아니라 페이저도 같이 쓰다보니<br>
리액트의 메인 파일인 App.js와 페이저의 메인 파일인 PhaserGame.js가 상호작용할 때 머리가 아팠다.

예를 들어 페이저 캔버스 안에서 캐릭터가 문 앞에서 c를 누르면<br>
페이저 캔버스 바깥에 있는 리액트 담당 영역에서 팝업창이 떠야 하는데,<br>
그걸 구현하기 위해 App.js에 있던 팝업창 생성 함수를 <br>
페이저 초기화 함수에 억지로 인자로 넣어준 뒤<br>
인자로 받은 해당 함수를 PhaserGame.js에서 사용했다.

그리고 닉네임은 App.js에서 input 태그로 값을 입력받는데,<br>
이 값은 역시 페이저 캔버스 안에서 캐릭터가 Submit을 할 때<br>
서버에 content와 함께 보내져야 한다.<br>

인자로 닉네임 변수를 전달해보았지만 제대로 업데이트가 되지 않았다.<br>
그래서 브라우저의 세션 저장소(Session Storage)를 사용하여<br>
페이저, 리액트 어디에서나 쉽게 접근할 수 있게 하였다.<br>
써도 되는거 맞나 싶을 정도로 편했다.

 <br>

## 스크린샷

![스크린샷 2024-10-06 21-07-01](https://github.com/user-attachments/assets/f0614248-8df3-4bac-a996-9d73ac6c1aeb)
![스크린샷 2024-10-06 21-08-20](https://github.com/user-attachments/assets/125b47bf-d38d-414b-af90-05d6d6ae7cbe)
![스크린샷 2024-10-06 21-08-33](https://github.com/user-attachments/assets/30e1646e-a7bc-40f1-aa04-2697446a4037)
![스크린샷 2024-10-06 21-08-45](https://github.com/user-attachments/assets/0407f8a3-9b5b-4ca1-b9f0-f38140d6c527)
![스크린샷 2024-10-06 21-17-55](https://github.com/user-attachments/assets/359a4173-cb57-4e19-ba04-b3257c55e787)

