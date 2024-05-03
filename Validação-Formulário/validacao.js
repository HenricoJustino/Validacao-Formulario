const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidUsername = nome => {
    const no = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
    return no.test(String(nome).toLowerCase());
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const isValidCpf = cpf => {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999" 
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(9, 10)) ) return false
    soma = 0
    for (var i = 1; i <= 10; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true
}
const isValidTell = tell => {
    tell = tell.replace(/\D/g, '');
    if (!(tell.length >= 10 && tell.length <= 11)) return false;
    if (tell.length == 11 && parseInt(tell.substring(2, 3)) != 9) return false;
    for (var n = 0; n < 10; n++) {
        if (tell == new Array(11).join(n) || tell == new Array(12).join(n)) return false;
    }
    var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99];
    if (codigosDDD.indexOf(parseInt(tell.substring(0, 2))) == -1) return false;
    if (new Date().getFullYear() < 2017) return true;
    if (tell.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(tell.substring(2, 3))) == -1) return false;
    return true;
}
const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const cpfValue = CPF.value.trim();
    const tellValue = TELL.value.trim();

    if(usernameValue === '') {
        setError(username, 'Preencha este campo');
    } else if (!isValidUsername(usernameValue, 'Digite o nome e sobrenome válido')) {
        setError(username, 'Digite um nome válido');
    } else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Preencha este campo');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Insira um e-mail válido');
    } else {
        setSuccess(email);
    }
    if(cpfValue === ''){
        setError(CPF, 'Preencha este campo');
    } else if (!isValidCpf(cpfValue)) {
        setError(CPF, 'Insira um CPF válido')
    } else {
        setSuccess(CPF);
    }
    
    if(tellValue === ''){
        setError(TELL, 'Preencha este campo');
    } else if (!isValidTell(tellValue)) {
        setError(TELL, 'Insira um número de telefone válido')
    } else {
        setSuccess(TELL);
    }

};




