

export const threadButtonPressed = (doorGroup) => {
    console.log("threadButton");
}

export const deleteButtonPressed = (deleteButton, inputField) => {
    console.log("deleteButton");
}

// HTML 입력 창 데이터를 POST 요청으로 서버에 전송
export const submitButtonPressed = (submitButton) => {
    // 입력 필드의 데이터를 가져옴
    const inputField = document.getElementById('player-input');
    const content = inputField ? inputField.value.trim() : ''; // 공백 제거 후 값 확인

    // 제목을 공란으로 설정
    const title = '';

    // 데이터가 비어 있으면 요청을 보내지 않음
    if (!content) {
        console.log('Content is empty. Not sending data.');
        return; // content가 없으면 함수 종료
    }

    // POST 요청으로 서버에 데이터 전송
    fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }), // 서버에 보낼 데이터를 JSON으로 변환
    })
    .then(response => response.json())
    .then(data => {
        inputField.value = ''; // 입력 필드 초기화
        console.log('Success:', data); // 성공 시 서버에서 응답받은 데이터
    })
    .catch((error) => {
        console.error('Error:', error); // 오류 발생 시 콘솔 출력
    });

    console.log("Submit button pressed, data sent:", { title, content });
};


export const switchButtonPressed = (switchButton) => {
    console.log("switchButton");
}