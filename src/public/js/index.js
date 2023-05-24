const productForm = document.getElementById('product-form');

const productListContainer = document.getElementById('product_list')

function deleteProductWithSocket(id) {
    socket.emit('product:delete', id)
}

async function deleteProduct(id) {
    const response = await fetch(`/api/products/${id}`, {
        method: 'delete'
    })

    if (response.ok) {
        const li = document.querySelector(`li[data-product-id="${id}"]`);
        if (li) {
            li.remove();
        }
    } else {
        alert('Could not delete product');
    }
}


try {

    socket.on('connect', () => {
        console.log('Conexion establecida con el servidor')
    })

    socket.on('product:created', product => {
        const li = `
    <li id="${product.id}">
        <div>
        <p>${product.title}</p>
        <button onclick="deleteProductWithSocket('${product.id}')">Delete</button>
        </div>
    </li>`
        productListContainer.innerHTML += li
    })

    socket.on('product:deleted', (id) => {
        const li = document.createElement('li');
        li.setAttribute('data-product-id', product.id);
        li.remove()
    })


    productForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = form.elements.title.value;
        const description = form.elements.description.value;
        const price = form.elements.price.value;

        const newProduct = {
            title,
            description,
            price
        }
        console.log(newProduct);
        socket.emit("new-product", newProduct);
        productForm.reset()
    });
} catch (error) { }