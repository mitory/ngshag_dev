export const validateMethod = {
    checkNamesInput, checkIsEmail, checkIsOnlyRussianLetter, checkIsEmptyStr, checkAgeBetween, checkPhoneNumber, checkIsOnlyNumbers, correctiongTel, toStringDate
};

function checkNamesInput(field) {
    return !checkIsEmptyStr(field) &&
        checkIsOnlyRussianLetter(field)

}

function checkPhoneNumber(field) {
    return /^\+7\d{10}$/.test(field)
}

function correctiongTel(phone) {
    let new_phone = phone;
    if (new_phone.length < 2 || !new_phone.startsWith('+7')) {
        new_phone = '+7'
    }
    if (!/^[0-9+]+$/.test(new_phone)) {
        new_phone = '+7';
    }
    if (new_phone.length > 12) {
        new_phone = new_phone.substring(0, 12)
    }
    return new_phone;
}

function checkIsEmail(str) {
    return !checkIsEmptyStr(str) && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
}

function checkIsOnlyRussianLetter(str) {
    return /^[а-яёА-ЯЁ]+(?:-[а-яёА-ЯЁ]+)*$/.test(str);
}

function checkIsOnlyNumbers(str) {
    return /[0-9]/.test(str)
}

function checkIsEmptyStr(str) {
    return str === '' || str === null || str === undefined;
}
function toStringDate(date){
    return `${('0'+ (date.getDate())).slice(-2)}.${('0'+ (date.getMonth() + 1)).slice(-2)} ${date.getHours() < 10 ? '0' + date.getHours(): date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes(): date.getMinutes()}`
}

function checkAgeBetween(field, start, end) {
    const birthDate = new Date(field);
    const otherDate = new Date(Date.now());
    let years = (otherDate.getFullYear() - birthDate.getFullYear());
    if (otherDate.getMonth() < birthDate.getMonth() ||
        otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
        years--;
    }
    return years >= start && years <= end
}