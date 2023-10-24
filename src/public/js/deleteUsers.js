const form = document.getElementById('delUsersForm');

form.addEventListener('submit', e => {
    e.preventDefault();

    fetch(`/api/users/`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if(result.status===200){
            const success = `Se elimino los usuarios inactivos.`;
            window.location.replace(`/views/users?msg=${success}`);
        }
    })
})