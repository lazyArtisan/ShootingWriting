
export const threadButtonPressed = (doorGroup) => {
    console.log("threadButton");
}

export const deleteButtonPressed = (deleteButton, inputField) => {
    console.log("deleteButton");
    inputField.node.value = "";
}

export const submitButtonPressed = (submitButton) => {
    console.log("submitButton");
}

export const switchButtonPressed = (switchButton) => {
    console.log("switchButton");
}