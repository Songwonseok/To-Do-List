import {$, $All, getFetch, deleteFetch} from './utils'
import {Column} from './components/column'
import { Modal } from './components/modal'

const init = () => {
    getFetch('/api/users/auth/loginCheck')
    .then((json) => {
        if(!json.data){
            window.location.replace('/login');
        }else{
            render();
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
            setEventHandler();
        }).catch(err => {
            console.log(err);
        })
}
const setEventHandler = () => {
    addOverlayEvent();
    addColumnEvent();
    editColumnEvent();
    removeColumnEvent();
}


const editColumnEvent = () => {
    const $columnList = $('.columnList');
    const $column_modal = $('.column_modal');
    const $modalContent = $('.modal_content', $column_modal);
    $columnList.addEventListener('dblclick', (event) => {
        if (event.target.className == 'columnName'){
            const $column = event.target.closest('.column');
            const id = $column.dataset.id;
            const name = $('.columnName', $column).innerHTML;
            const modal = new Modal('Edit Column', 'Edit', name, id);
            $modalContent.innerHTML = modal.render();
            modal.addEventHandler($column_modal);
            $column_modal.classList.toggle('hidden');
        }
    })
}

const addColumnEvent = () => {
    const $addColumn = $('.addColumn');
    const $column_modal = $('.column_modal');
    const $modalContent = $('.modal_content', $column_modal);
    $addColumn.addEventListener('click', (event) => {
        const modal = new Modal('Add Column', 'Add');
        $modalContent.innerHTML = modal.render();
        modal.addEventHandler($column_modal);
        $column_modal.classList.toggle('hidden');
    })
}

const removeColumnEvent = () => {
    const $columnList = $('.columnList');
    const $column_modal = $('.column_modal');
    const $modalContent = $('.modal_content', $column_modal);
    $columnList.addEventListener('click', (event) => {
        if (event.target.className == 'closeBtn') {
            const $column = event.target.closest('.column');
            const id = $column.dataset.id;
            let isSure = confirm("정말 삭제하시겠습니까?")
            if(isSure){
                deleteFetch(`/api/columns/${id}`)
                .then(() => {
                    $columnList.removeChild($column);
                })
            }

        }
    })
}

const addOverlayEvent = () => {
    const overlays = $All('.modal_overlay');
    overlays.forEach( el => {
        const $modal = el.parentElement;
        el.addEventListener('click', ()=> {
            $modal.classList.toggle('hidden');
        })
    })
}

init();