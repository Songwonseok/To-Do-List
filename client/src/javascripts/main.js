import {$, $ALL, getFetch} from './utils'
import {Column} from './components/column'

const init = () => {
    getFetch('/api/users/auth/loginCheck')
    .then((json) => {
        if(!json.data){
            window.location.replace('/login');
        }else{
            render();
            addColumnEvent();
        }
    })
    .catch((err) => {
        window.location.replace('/login');
    })
}

const render =() => {
    getFetch('/api/users/columns')
        .then((json) => {
            json.data.forEach((c) => {
                const column = new Column(c.id, c.name, c.user_id, c.list);
                column.render();
            })
        }).then(() => {
            
        })
}

const addColumnEvent = () => {
    const $columnList = $('.columnList');
    $columnList.addEventListener('dblclick', (event) => {
        if (event.target.className == 'columnName'){
            const $column = event.target.closest('.column');
            const id = $column.dataset.id;
            const name = $('.columnName', $column).innerHTML;
        }
    })
}


init();