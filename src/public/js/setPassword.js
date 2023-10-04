const form = document.getElementById('setForm');

form.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    fetch('/api/session/setPassword',{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        console.log(result)
        if(result.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Password updated',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            }).then(function() {
                window.location.href = "/views/login";
            }); 
        }else{
            switch (result.status) {
                case 401:
                    titles = "Incomplete values";
                    break;
                case 402:
                    titles = "New and Old password are the same"
                    break;
                default:
                    titles = "There was an error"
                    break;
            }
            Swal.fire({
                icon: 'error',
                title: titles,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }    
    })
})
