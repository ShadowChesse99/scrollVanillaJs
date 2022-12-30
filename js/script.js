document.addEventListener('DOMContentLoaded', async function () {
    let elements = [];
    let countPages = 1;
    let isResize = false;

    const rowHeight = 54;
    const containerHeight = 300;
    const totalItems = Math.floor(containerHeight / rowHeight) + 2;
    const containerElement = document.getElementById('container');
    const viewportElement = document.getElementById('viewport');
    const tbody = document.getElementById('tbody');

    containerElement.style.height = `${containerHeight}px`;
    await loadData(countPages);
    renderBody(0);

    containerElement.addEventListener('scroll', async function (e) {
        const offsetHeight = e.target.offsetHeight;
        const scrollTop = e.target.scrollTop;
        const scrollHeight = e.target.scrollHeight;
        if (offsetHeight + scrollTop + 1 >= scrollHeight) {
            countPages++;
            await loadData(countPages);
        }
        else {
            //Esto es la esta cagango
            // const start = Math.floor(e.target.scrollTop / rowHeight);
            // const offSetY = start * rowHeight;
            // viewportElement.style.transform = `translateY(${offSetY}px)`;
            // renderBody(start);
        }
    });

    async function loadData(page) {
        await fetch(`https://randomuser.me/api/?page=${page}&results=${totalItems}&seed=a8eb78cd70329cc7&inc=name,email,gender,registered,phone,cell,picture,id`)
            .then(response => response.json())
            .then(data => data.results)
            .then(results => {
                elements = elements.concat(results);
                const viewportHeight = rowHeight * elements.length + 20;
                viewportElement.style.height = `${viewportHeight}px`;
            });
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