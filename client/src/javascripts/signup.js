const { $, $All } = require('./utils')
const signupForm = $('.signupForm');

const signupEventHandler = (event) => {
    event.preventDefault()
    const payload = {
        email: signupForm.email.value,
        password: signupForm.password.value,
        name: signupForm.name.value,
        phone: signupForm.phone.value
    };

    fetch('/api/users', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then((res) => res.json())
        .then((res) => {
            alert('회원가입 되었습니다.')
            window.location.replace('/');
        })
        .catch((err) => {
            alert(err);
            window.location.href='/signup';
        })


}

const init = () => {

    signupForm.addEventListener('submit', signupEventHandler);
}

init();