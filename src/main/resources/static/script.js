const API_URL = "http://localhost:8093/api/products";

async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const products = await response.json();
        
        const tableBody = document.getElementById('productTable');
        tableBody.innerHTML = '';
        
        let totalVal = 0;
        let totalQty = 0;

        products.forEach(p => {
            totalVal += (p.price * p.quantity);
            totalQty += p.quantity;

            tableBody.innerHTML += `
                <tr>
                    <td><strong>${p.name}</strong><br><small style="color:gray">ID: #${p.id}</small></td>
                    <td>$${p.price.toLocaleString()}</td>
                    <td>${p.quantity} Units</td>
                    <td>
                        <button class="btn-delete" onclick="deleteProduct(${p.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        // Update Stats
        document.getElementById('totalItems').innerText = totalQty;
        document.getElementById('totalValue').innerText = `$${totalVal.toLocaleString()}`;
        
    } catch (error) {
        document.getElementById('connectionStatus').innerText = "Offline";
        document.getElementById('connectionStatus').style.background = "#fee2e2";
        console.error("Fetch error:", error);
    }
}

async function addProduct() {
    const product = {
        name: document.getElementById('name').value,
        price: parseFloat(document.getElementById('price').value),
        quantity: parseInt(document.getElementById('quantity').value)
    };

    if (!product.name || isNaN(product.price)) return alert("Invalid Input");

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });

    loadProducts();
    // Clear inputs
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
}

async function deleteProduct(id) {
    if (confirm("Delete this product?")) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        loadProducts();
    }
}

window.onload = loadProducts;