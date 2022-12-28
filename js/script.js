document.addEventListener("DOMContentLoaded", e => {
    let scrollContainer = document.getElementById('scrollContainer');
    let usersTbody = document.getElementById('usersTbody');

    loadData().then(response => {
        response.results.forEach(item => {
            let html = `
            <tr>
            <td><img src="${item.picture.thumbnail}"></td>
            <td>${item.name.first + ' ' + item.name.last}</td>
            <td>${item.gender}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
            <td>${item.cell}</td>
            </tr>`;
            usersTbody.innerHTML += html;
        });
    });

    scrollContainer.addEventListener('scroll', e => {
        const offsetHeight = e.target.offsetHeight;
        const scrollTop = e.target.scrollTop;
        const scrollHeight = e.target.scrollHeight;

        if (offsetHeight + scrollTop + 1 >= scrollHeight) {
            loadData().then(response => {
                response.results.forEach(item => {
                    let html = `
                    <tr>
                    <td><img src="${item.picture.thumbnail}"></td>
                    <td>${item.name.first + ' ' + item.name.last}</td>
                    <td>${item.gender}</td>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
                    <td>${item.cell}</td>
                    </tr>`;
                    usersTbody.innerHTML += html;
                });
            });
        }
    })
});

async function loadData() {
    try {
        const response = await fetch('https://randomuser.me/api/?results=5&inc=gender,name,nat,email,phone,cell,registered,picture,city,state,country,street', {
            method: 'GET'
        });
        return await response.json();
    } catch (error) {
        return error;
    }
}