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
                <p>ID: ${product.id}</p>
                <p>Title: ${product.title}</p>
                <p>Description: ${product.description}</p>
                <p>Code: ${product.code}</p>
                <p>Price: ${product.price}</p>
                <p>Status: ${product.status}</p>
                <p>Stock: ${product.stock}</p>
                <p>Category: ${product.category}</p>
              `

  // Actualizar el HTML de la página
  const newDiv = document.createElement('div');
  newDiv.id = product.id;

  newDiv.innerHTML = html;
  div.appendChild(newDiv);

  if (document.getElementById(product.id)) {
    return alert('Se creo el Producto N° '+ product.id);
  }

}

function deleteChild(productId) {
  const child = document.getElementById(productId);

  if (!child) {
    document.getElementById("id").value = "";
    return alert('No existe el producto');
  }else{
    document.getElementById("id").value = "";
    div.removeChild(child);
    return alert('Se elimino el producto N° ' + productId);
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

