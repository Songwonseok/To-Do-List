import { $, getFetch, postFetch, putFetch, updateLog, findColumn, findNote, watchBtn, $All} from '../utils'
import { Column } from '../components/column';
import { dndColumnHandler, dndNoteHandler} from './dragNdrop';
export class Modal {
    constructor(name, type, content=null, id=null){
        this.name = name;
        this.type = type
        this.content = content;
        this.id = id;
    }

    render() {
        if(this.name == 'Edit Note'){
            return `<div class="modal_header">${this.name}
                    <textarea class="modal_textarea" placeholder="내용" name="content">${this.content}</textarea>
                        <div class="modal_btns">
                            <div class="submitBtn">${this.type}</div>
                            <div class="cancelBtn">Cancel</div>
                        </div>
                    </div>`
        }else{
            return `<div class="modal_header">${this.name}<input class="modal_columnText" type="text" placeholder="컬럼 이름" name="name"${(this.content)? "value="+"'"+this.content +"'": ''} />
                        <div class="modal_btns">
                            <div class="submitBtn">${this.type}</div>
                            <div class="cancelBtn">Cancel</div>
                        </div>
                    </div>`
        }
    }

    addEventHandler($modal) {
        const $cancelBtn = $('.cancelBtn',$modal);
        const $submitBtn = $('.submitBtn', $modal);
        $cancelBtn.addEventListener('click', this.cancelModal);

        if(this.type == 'Add')
            $submitBtn.addEventListener('click', this.addColumn);
        else if(this.type == 'Edit')
            if (this.name == 'Edit Note')
                $submitBtn.addEventListener('click', this.editNote);
            else
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
                        return column.id
                    })
                    .then( _ => {
                        $All('.column').forEach($c => {
                            dndColumnHandler($c);
                            $All('.note', $c).forEach( $n => {
                                dndNoteHandler($n);
                            })
                        });
                        watchBtn();
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
            id: this.id,
            name: name
        }
        putFetch('/api/columns/rename', payload)
            .then((json) => {
                const $column = findColumn(this.id);
                const $name = $('.columnName', $column);
                $name.innerHTML = name;
                $modal.classList.toggle('hidden');
            })
            .then(() => {
                updateLog();
            })
    }

    editNote = (event) => {
        const $modal = getModalRoot(event);
        const content = $('.modal_textarea', $modal).value;
        if (!content) {
            alert('내용을 입력해주세요')
            return;
        }
        const payload = {
            id: this.id,
            content: content
        }
        putFetch('/api/note/update', payload)
            .then((json) => {
                const $note = findNote(this.id);
                const $name = $('.noteName', $note);
                $name.innerHTML = content;
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

