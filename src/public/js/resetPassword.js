const form = document.getElementById('resetForm');

form.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    fetch('/api/session/resetPassword',{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if(result.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Link Sent',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            }).then(function() {
                window.location.href = "/login";
            }); 
        }else{
            console.log(result.status)
            switch (result.status) {
                case 401:
                    titles = "Incomplete values";
                    break;
                case 402:
                    titles = "User not exist"
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
