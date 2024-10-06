import Phaser from "phaser";
import { threadButtonPressed, deleteButtonPressed, submitButtonPressed, switchButtonPressed } from "./buttonUtils";

// Phaser 게임 초기화 함수
export const initializePhaserGame = (parentId, onShowPopup) => {
  let player;
  let cursors;
  let zKey;
  let cKey;
  let ground;
  let inputField;
  let deleteButton;
  let submitButton;
  let switchButton;
  let doorGroup;
  let playerTouchingDoor = false;
  let playerTouchingDeleteButton = false;
  let playerTouchingSubmitButton = false;
  let playerTouchingSwitchButton = false;

  const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 400,
    parent: parentId,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 750 },
        debug: false,
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
    dom: {
      createContainer: true, // DOM 요소 활성화
    },
  };

  new Phaser.Game(config);

  function preload() {
    this.load.image("character", "/assets/character/idle.png");
    this.load.image("ground", "/assets/Tiles/floor.png");
    this.load.image("background", "/assets/Tiles/wall2.png");
    this.load.image("delete", "/assets/delete.png");
    this.load.image("submit", "/assets/submit.png"); // 버튼 이미지 로드
    this.load.image("switch", "/assets/switch.png"); // 스위치 이미지 로드
    this.load.image("door_top", "/assets/door_openTop.png"); // 문 위쪽 이미지
    this.load.image("door_mid", "/assets/door_openMid.png"); // 문 중간 이미지
  }

  function create() {
    // 배경 이미지 추가
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        this.add.image(50 + i * 100, 50 + j * 100, "background").setOrigin(0.5, 0.5).setDisplaySize(100, 100).setDepth(-10);
      }
    }

    // 바닥 생성
    ground = this.physics.add.staticGroup();
    for (let i = 0; i < 7; i++) {
      ground.create(100 * i, 390, "ground").setScale(2).refreshBody();
    }

    // 캐릭터 추가
    player = this.physics.add.sprite(300, 250, "character");
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, ground);

    // 키보드 입력 감지
    cursors = this.input.keyboard.createCursorKeys();
    zKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C); // C 키 추가

    // 문을 그룹으로 묶음
    doorGroup = this.physics.add.staticGroup();

    // 문 이미지 추가
    const doorTop = doorGroup.create(100, 225, "door_top").setInteractive();
    const doorMid = doorGroup.create(100, 285, "door_mid").setInteractive();

    // 문을 플레이어보다 아래에 표시되게 설정
    doorGroup.setDepth(-1);

    // 버튼과 스위치 추가 (물리 엔진 적용)
    deleteButton = this.physics.add.staticImage(230, 285, "delete").setInteractive();
    submitButton = this.physics.add.staticImage(360, 285, "submit").setInteractive();
    switchButton = this.physics.add.staticImage(500, 285, "switch").setInteractive();

    // 텍스트 추가
    this.add.text(65, 190, "Thread", { fontSize: "18px", fill: "#fff" });
    this.add.text(201, 240, "Delete", { fontSize: "18px", fill: "#fff" });
    this.add.text(337, 240, "Submit", { fontSize: "18px", fill: "#fff" });
    this.add.text(475, 230, "Typing", { fontSize: "18px", fill: "#fff" });

    // HTML 입력 창을 Phaser 위에 추가
    inputField = this.add.dom(this.cameras.main.width / 2, 100).createFromHTML(`
      <textarea type="text" id="player-input" name="player-input" placeholder="글을 입력하세요" 
             style="font-size: 24px; width: 300px; height: 100px; padding: 10px;" readonly></textarea>
    `);
    inputField.setDepth(10);

    // 충돌 감지 추가 및 상태 기록
    this.physics.add.overlap(player, doorGroup, () => {
      playerTouchingDoor = true;
    });

    this.physics.add.overlap(player, deleteButton, () => {
      playerTouchingDeleteButton = true;
    });

    this.physics.add.overlap(player, submitButton, () => {
      playerTouchingSubmitButton = true;
    });

    this.physics.add.overlap(player, switchButton, () => {
      playerTouchingSwitchButton = true;
    });
  }

  function update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-320); // 왼쪽 이동
    } else if (cursors.right.isDown) {
      player.setVelocityX(320); // 오른쪽 이동
    } else {
      player.setVelocityX(0); // 정지
    }

    if (Phaser.Input.Keyboard.JustDown(zKey) && player.body.touching.down) {
      player.setVelocityY(-400); // 점프
    }

    // C 키가 눌렸고, 플레이어가 해당 객체와 충돌 중일 때 콘솔 로그 출력
    if (Phaser.Input.Keyboard.JustDown(cKey)) {
      if (playerTouchingDoor) {
        threadButtonPressed(doorGroup);
        onShowPopup();
      }
      if (playerTouchingDeleteButton) {
        const textarea = inputField.node.querySelector('textarea');
        textarea.value = ''; // 값 초기화
        // deleteButtonPressed(deleteButton, inputField);
        console.log("deleteButton");
      }
      if (playerTouchingSubmitButton) {
        submitButtonPressed(submitButton);
      }
      if (playerTouchingSwitchButton) {
        switchButtonPressed(switchButton);
      }
    }

    // 충돌 상태 초기화 (플레이어가 떨어졌을 때 상태 초기화)
    playerTouchingDoor = this.physics.overlap(player, doorGroup);
    playerTouchingDeleteButton = this.physics.overlap(player, deleteButton);
    playerTouchingSubmitButton = this.physics.overlap(player, submitButton);
    playerTouchingSwitchButton = this.physics.overlap(player, switchButton);
  }
};
