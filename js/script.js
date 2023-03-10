document.addEventListener('DOMContentLoaded', function () {
    const elements = [...Array(10000).keys()];
    const rowHeight = 30;
    const containerHeight = 300;
    const totalItems = Math.round(containerHeight / rowHeight) + 1;
    const containerElement = document.getElementById('container');
    const viewportHeight = rowHeight * elements.length;
    const viewportElement = document.getElementById('viewport');
    const rowsElement = document.getElementById('rows');
    
    viewportElement.style.height = `${viewportHeight}px`;
    containerElement.style.height = `${containerHeight}px`;

    renderNodes(0);

    containerElement.addEventListener('scroll', e => {
        const start = Math.floor(e.target.scrollTop / rowHeight);
        const offSetY = start * rowHeight;
        rowsElement.style.transform = `translateY(${offSetY}px)`;
        renderNodes(start);
    });

    function renderNodes(start) {
        const array = [];
        for(let i = start; i < (start + totalItems) && i < elements.length; i++)
            array.push(`<div class="row" style="height:${rowHeight - 2}px">Row Index #${i}</div>`);
        rowsElement.innerHTML = array.join('');
    }
});