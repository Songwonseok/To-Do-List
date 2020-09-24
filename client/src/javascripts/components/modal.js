import { $, $All, getFetch, postFetch, putFetch, updateLog} from '../utils'
import { Column } from '../components/column'
export class Modal {
    constructor(name, type, content=null, column_id=null){
        this.name = name;
        this.type = type
        this.content = content;
        this.column_id = column_id;
    }

    render() {
        return `<div class="modal_header">${this.name}<input class="modal_columnText" type="text" placeholder="컬럼 이름" name="name"${(this.content)? "value="+"'"+this.content +"'": ''} required />
                    <div class="modal_btns">
                        <div class="submitBtn">${this.type}</div>
                        <div class="cancelBtn">Cancel</div>
                    </div>
                </div>`
    }

    addEventHandler($modal) {
        const $cancelBtn = $('.cancelBtn',$modal);
        const $submitBtn = $('.submitBtn', $modal);

        $cancelBtn.addEventListener('click', this.cancelModal);

        if(this.type == 'Add')
            $submitBtn.addEventListener('click', this.addColumn);
        else if(this.type == 'Edit')
            $submitBtn.addEventListener('click', this.editColumn);
    }
    
    cancelModal = (event) => {
        const $modal = getModalRoot(event);
        $modal.classList.toggle('hidden');
    }

    addColumn = (event) => {
        const $modal = getModalRoot(event);
        const name = $('.modal_columnText', $modal).value;
        if (!name) {
            alert('이름을 입력해주세요')
            return;
        }
        const payload = {
            name: name
        }
        postFetch('/api/columns', payload)
            .then((json) => {
                const data = json.data;
                getFetch(`/api/columns/${data.column_id}`)
                    .then((json) => {
                        const $columnList = $('.columnList');
                        const data = json.data;
                        const column = new Column(data.id, data.name, data.user_id, []);
                        $columnList.innerHTML += column.render();
                        $modal.classList.toggle('hidden');
                    })
                    .then(() => {
                        updateLog();
                    })
            })
    }

    editColumn = (event) => {
        const $modal = getModalRoot(event);
        const name = $('.modal_columnText', $modal).value;
        if (!name) {
            alert('이름을 입력해주세요')
            return;
        }
        const payload = {
            id: this.column_id,
            name: name
        }
        putFetch('/api/columns/rename', payload)
            .then((json) => {
                const columns = $All('.column');
                for(let i=0;i<columns.length;i++){
                    if (columns[i].dataset.id == this.column_id) {
                        const $name = $('.columnName', columns[i]);
                        $name.innerHTML = name;
                        break;
                    }
                }
                $modal.classList.toggle('hidden');
            })
            .then(() => {
                updateLog();
            })
    }
}
const getModalRoot = (event) => {
    if (event.target.closest('.column_modal')) {
        return $('.column_modal');
    } else if (event.target.closest('.note_modal')) {
        return $('.note_modal');
    }
}

