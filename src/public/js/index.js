const socket = io();

document.querySelector('#createForm').addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target)
    socket.emit('createForm',[...formData.entries()])
})


document.querySelector('#deleteForm').addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target)
    socket.emit('deleteForm',[...formData.entries()])
})

const div = document.getElementById('products');

function createChild(product) {
  const html = `
                <p>Title: ${product.title}</p>
                <p>Description: ${product.description}</p>
                <p>Code: ${product.code}</p>
                <p>Price: ${product.price}</p>
                <p>Category: ${product.category}</p>
              `

  const newDiv = document.createElement('div');
  newDiv.id = product.code;

  newDiv.innerHTML = html;
  div.appendChild(newDiv);

  if (document.getElementById(product.code)) {
    return alert('Se creo el Producto N° '+ product.code);
  }

}

function deleteChild(productCode) {
  const child = document.getElementById(productCode);

  if (!child) {
    document.getElementById("code").value = productCode;
    return alert('No existe el producto');
  }else{
    document.getElementById("code").value = "";
    div.removeChild(child);
    return alert('Se elimino el producto N° ' + productCode);
  }

}

socket.on('connect', () => {
  console.log('Conectado al servidor de socket.io');
});

socket.on("newProduct", (product) => {
  createChild(product);
});

socket.on("deleteProduct", (productId) => {
  deleteChild(productId);
});

