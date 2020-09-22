const {$, $ALL} = require('./utils')

const init = () => {
    fetch('/api/users/loginCheck', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((json) => {
        if(!json.data){
            window.location.href = '/login';
        }
    })
    .catch((err) => {
        window.location.replace('/login');
    })
}

init();