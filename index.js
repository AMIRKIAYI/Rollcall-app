

document.addEventListener('DOMContentLoaded', function () {
    const createForm = document.querySelector('.create_form');
    const updateForm = document.querySelector('.update_form');
    const tableBody = document.querySelector('.table_data');

    let data = [];
    let updateIndex = null;

    createForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = createForm.elements['name'].value.trim();
        const email = createForm.elements['email'].value.trim();

        if (name && email) {
            data.push({ name, email });
            renderTable();
            createForm.reset();
        }
    });

    updateForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const newName = updateForm.elements['newname'].value.trim();
        const newEmail = updateForm.elements['newemail'].value.trim();

        if (newName && newEmail && updateIndex !== null) {
            data[updateIndex] = { name: newName, email: newEmail };
            renderTable();
            updateForm.reset();
            updateIndex = null;
        }
    });

    function renderTable() {
        tableBody.innerHTML = '';
        data.forEach((item, index) => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;

            const emailCell = document.createElement('td');
            emailCell.textContent = item.email;

            const actionCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('btn', 'btn-primary', 'me-2');
            editButton.addEventListener('click', () => editItem(index));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.addEventListener('click', () => deleteItem(index));

            actionCell.appendChild(editButton);
            actionCell.appendChild(deleteButton);

            row.appendChild(nameCell);
            row.appendChild(emailCell);
            row.appendChild(actionCell);

            tableBody.appendChild(row);
        });
    }

    function editItem(index) {
        updateIndex = index;
        updateForm.elements['newname'].value = data[index].name;
        updateForm.elements['newemail'].value = data[index].email;
    }

    function deleteItem(index) {
        data.splice(index, 1);
        renderTable();
    }

    window.readAll = function () {
        renderTable();
    }
});