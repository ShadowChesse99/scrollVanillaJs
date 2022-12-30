document.addEventListener('DOMContentLoaded', async function () {
    let elements = [];
    let countPages = 1;
    let isBusy = false;

    const rowHeight = 54;
    const containerHeight = 540;
    const totalItems = Math.floor(containerHeight / rowHeight) + 3;
    const containerElement = document.getElementById('container');
    const viewportElement = document.getElementById('viewport');
    const tbody = document.getElementById('tbody');

    containerElement.style.height = `${containerHeight}px`;
    loadData(countPages).then(() => renderBody(countPages))

    containerElement.addEventListener('scroll', async function (e) {
        const offsetHeight = e.target.offsetHeight;
        const scrollTop = e.target.scrollTop;
        const scrollHeight = e.target.scrollHeight;
        if (!isBusy && offsetHeight + scrollTop + 1 >= scrollHeight) {
            countPages++;
            await loadData(countPages).then(() => {
                debugger;
                const array = [];
                for (let i = totalItems; i > 0; i--) {
                    let item = elements[i];
                    array.push(`
                    <tr>
                    <td><img src="${item.picture.thumbnail}"></td>
                    <td>${item.name.first} ${item.name.last}</td>
                    <td>${item.gender}</td>
                    <td>${item.registered.age}</td>
                    <td>${item.phone}</td>
                    <td>${item.cell}</td>
                    </tr>`)
                }
                tbody.innerHTML = array.join('');
            });
            // .then(() => {
            //     const start = Math.floor(e.target.scrollTop / rowHeight);
            //     const offSetY = start * rowHeight;
            //     return { start, offSetY };
            // })
            // .then(({ start, offSetY }) => {
            //     renderBody(start);
            //     return offSetY;
            // })
            // .then(offSetY => viewportElement.style.transform = `translateY(${offSetY}px)`);
        }

        // const start = Math.floor(e.target.scrollTop / rowHeight);
        // const offSetY = start * rowHeight;
        // viewportElement.style.transform = `translateY(${offSetY}px)`;
    });

    async function loadData(page) {
        isBusy = true;
        await fetch(`https://randomuser.me/api/?page=${page}&results=${totalItems}&seed=a8eb78cd70329cc7&inc=name,email,gender,registered,phone,cell,picture,id`)
            .then(response => response.json())
            .then(data => data.results)
            .then(results => {
                elements = elements.concat(results);
                const viewportHeight = rowHeight * elements.length;
                viewportElement.style.height = `${viewportHeight}px`;
            })
            .then(() => isBusy = false)
            .catch(() => isBusy = false);
    }

    function renderBody(start) {
        const array = [];
        for (let i = start; i < (start + totalItems) && i < elements.length; i++) {
            let item = elements[i];
            array.push(`
            <tr>
            <td><img src="${item.picture.thumbnail}"></td>
            <td>${item.name.first} ${item.name.last}</td>
            <td>${item.gender}</td>
            <td>${item.registered.age}</td>
            <td>${item.phone}</td>
            <td>${item.cell}</td>
            </tr>`)
        }
        tbody.innerHTML = array.join('');
    }
});