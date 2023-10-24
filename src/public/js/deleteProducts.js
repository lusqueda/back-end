const form = document.getElementById('delProductsForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch(`/carts/${obj.cart}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if(result.status===200){
            const success = `Se vacio el carrito.`;
            window.location.replace(`/views/carts/${obj.cart}?success+=${success}`);
        }
    })
})