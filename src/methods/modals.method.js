import store from '../store/store'

export const modalsMethod = { showTextModal, showListModal, showMiniListModal };

function showTextModal(message){
    const attr = `<h5 class="text-center py-5">${message}</h5>`
    store.dispatch('modal/openModal', attr);
}

function showListModal(header_text, messages){
    let attr = `<h5 class="mb-3 text-center">${header_text}</h5><ul>`;
        for (let key in messages){
            attr += `<li>${key}<ul>`
            for(let el in messages[key]){
                attr += `<li>${messages[key][el]}</li>`
            }
            attr += '</ul></li>'
        }
        attr += '</ul>'
    store.dispatch('modal/openModal', attr);
}

function showMiniListModal(messages){
    let attr = `<ul>`;
    for(let el in messages){
        attr += `<li>${messages[el]}</li>`
    }
    attr += '</ul>'
    store.dispatch('modal/openModal', attr);
}
