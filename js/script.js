document.addEventListener('DOMContentLoaded', function () {
    let elements = [];

    const rowHeight = 54;
    const containerHeight = 300;
    const viewportHeight = rowHeight * elements.length;
    const containerElement = document.getElementById('container');
    const viewportElement = document.getElementById('viewport');

    

    const tbody = document.getElementById('tbody');

    loadData();

    function loadData() {
        fetch('https://randomuser.me/api/?page=0&results=10&seed=a8eb78cd70329cc7&inc=name,email,gender,registered,phone,cell,picture,id')
            .then(response => response.json())
            .then(data => data.results)
            .then(results => {
                tbody.innerHTML = results
                .map(item => `
                <tr>
                <td><img src="${item.picture.thumbnail}"></td>
                <td>${item.name.first} ${item.name.last}</td>
                <td>${item.gender}</td>
                <td>${item.registered.age}</td>
                <td>${item.phone}</td>
                <td>${item.cell}</td>
                </tr>`)
                .join('');
            });
    }
});