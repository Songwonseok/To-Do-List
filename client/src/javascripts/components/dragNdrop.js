import { $, $All, getFetch, postFetch, putFetch, updateLog, findNote, findColumn } from '../utils'
import { Column } from '../components/column'


const onDragleave = (event) => {
    if (event.target.closest('.note')) {
        event.target.closest('.note').style.backgroundColor = "white";
    }
}


const onDragover = (event) => {
    event.preventDefault();
    if(event.target.closest('.note')){
        const $note = event.target.closest('.note');
        const rect = $note.getBoundingClientRect();
        const centerY = rect.y + (rect.bottom- rect.top)/2;
        if (event.clientY < centerY - ((rect.bottom - rect.top) / 5) ){
            $note.style.backgroundColor="darkgrey";
        }
    }
}

const onDragstart = (event) => {
    console.log(event.target);
    console.log('드래그 시작 id:' + event.target.dataset.id);
    event.dataTransfer.setData("text/plain", event.target.dataset.id);
}

const onDragend = (event) => {
    console.log('드래그 끝');
}

const onclick = (event) => {
    console.log(event.target.dataset.id);
}

const onDrop = (event) => {
    console.log('드랍');
    const id = event.dataTransfer.getData('text');
    const $note = findNote(id);
    const $origin = $note.closest('.column');
    let $column = event.target;
    if ($column.className != 'column') {
        $column = $column.closest('.column');
    }

    if (event.target.closest('.note')) {
        const $nextNote = event.target.closest('.note');
        if ($nextNote.style.backgroundColor== 'darkgrey'){
            const payload = {
                id: $note.dataset.id,
                columns_id: $column.dataset.id,
                next_note: $nextNote.dataset.id
            }
            putFetch('/api/note/move', payload)
            .then(json => {
                $nextNote.style.backgroundColor = "white";
                $('.columnBody', $origin).removeChild($note);
                $('.columnBody', $column).insertBefore($note, $nextNote);
            })
        }
    }else{
        const payload = {
            id: $note.dataset.id,
            columns_id: $column.dataset.id,
            next_note: null
        }
        putFetch('/api/note/move', payload)
            .then(json => {
                $('.columnBody', $origin).removeChild($note);
                $('.columnBody', $column).appendChild($note);
            })
    }
}

export const dndColumnHandler = ($column) => {
    $column.addEventListener('dragover', onDragover);
    $column.addEventListener('drop', onDrop);
    $column.addEventListener('dragleave', onDragleave)
}

export const dndNoteHandler = ($note) => {
    $note.addEventListener('dragstart', onDragstart);
    $note.addEventListener('dragend', onDragend);
    $note.addEventListener('click', onclick)
}

