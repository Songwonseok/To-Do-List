import { Log } from '../components/log';

export const $ = (selector, base = document) => base.querySelector(selector)
export const $All = (selector, base = document) => base.querySelectorAll(selector)

export const getFetch = ((url) => {
    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
})

export const postFetch = ((url, body) => {
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((res) => res.json())
})

export const putFetch = ((url, body) => {
    return fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((res) => res.json())
})

export const deleteFetch = ((url) => {
    return fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
})


export const findColumn = (id) => {
    const columns = $All('.column');
    for (let i = 0; i < columns.length; i++) {
        if (columns[i].dataset.id == id) {
            return columns[i];
        }
    }
}

export const findNote = (id) => {
    const notes = $All('.note');
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].dataset.id == id) {
            return notes[i];
        }
    }
}

export const updateLog = () => {
    getFetch('/api/log')
        .then((json) => {
            const $logList = $('.loglist');
            const $navHeader = $('.navHeader', $logList);
            const logs = json.data;
            const now = new Date();
            let logInner = '';
            logs.forEach(l => {
                const log = new Log(l.action, l.name, l.subject, l.createdAt, now, (l.to_column) ? l.to_column:'', (l.from_column)? l.from_column:'');
                logInner += log.render();
            })
            $logList.innerHTML = $navHeader.outerHTML + logInner;
        })
}