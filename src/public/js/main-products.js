const socket = io()

const renderProducts = (data) => {
    const html = data.map((product) => {
        return (`
        <tr>
            <td>${product.title}</td>
            <td>${product.brand}</td>
            <td>${product.description}</td>
            <td>${product.category}</td>
            <td><img src=${product.thumbnail[0]} width="40%"/></td>
            <td>${product.price}</td>
            <td>${product.code}</td>
            <td>${product.stock}</td>
        </tr>
        `)
    }).join('');
    document.getElementById('productsList').innerHTML = html;
}

socket.on('products', (data) => {
    renderProducts(data)
})