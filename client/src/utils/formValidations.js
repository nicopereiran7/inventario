export function nombreValidation(inputData) {
    const { value } = inputData;

    removeClassErrorSuccess(inputData);

    if(!value === "") {
        inputData.classList.add('success');
        return true;
    }else {
        inputData.classList.add('error');
        return false;
    }
}

export function minLengthValidation(inputData, minLength) {
    const { value } = inputData;

    removeClassErrorSuccess(inputData);

    if(value.length >= minLength) {
        inputData.classList.add('success');
        return true;
    } else {
        inputData.classList.add('error');
        return false;
    }
}
//inputData = <input />
export function emailValidation(inputData) {
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const { value } = inputData; //value = valor dentro del input
    
    removeClassErrorSuccess(inputData);

    const resultValitadion = emailValid.test(value);
    if(resultValitadion) {
        inputData.classList.add("success");
        return true;
    } else {
        inputData.classList.add("error");
        return false;
    }
}

function removeClassErrorSuccess(inputData) {
    inputData.classList.remove('success');
    inputData.classList.remove('error');
}