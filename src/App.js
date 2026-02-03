import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:8093/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', quantity: '' });

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Connection Error", error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, form);
    setForm({ name: '', price: '', quantity: '' });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this item?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Inventory Dashboard</h1>
        <p style={styles.subtitle}>Full-Stack Spring Boot + React System</p>
      </header>

      <div style={styles.card}>
        <form onSubmit={handleAdd} style={styles.form}>
          <input style={styles.input} placeholder="Product Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input style={styles.input} type="number" placeholder="Price ($)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          <input style={styles.input} type="number" placeholder="Quantity" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} required />
          <button type="submit" style={styles.addButton}>+ Add Product</button>
        </form>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Stock</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={styles.tableRow}>
                <td style={styles.td}>#{p.id}</td>
                <td style={styles.td}><strong>{p.name}</strong></td>
                <td style={styles.td}>${p.price}</td>
                <td style={styles.td}>{p.quantity} units</td>
                <td style={styles.td}>
                  <button onClick={() => handleDelete(p.id)} style={styles.deleteButton}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Professional Styling
const styles = {
  container: { padding: '40px', backgroundColor: '#f4f7fe', minHeight: '100vh', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' },
  header: { textAlign: 'center', marginBottom: '30px' },
  title: { color: '#1e293b', margin: '0', fontSize: '2.5rem' },
  subtitle: { color: '#64748b', marginTop: '5px' },
  card: { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '30px' },
  form: { display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '200px', fontSize: '1rem' },
  addButton: { padding: '12px 24px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  tableContainer: { backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' },
  th: { padding: '15px', textAlign: 'left', color: '#475569', fontWeight: '600' },
  td: { padding: '15px', borderBottom: '1px solid #f1f5f9', color: '#334155' },
  tableRow: { transition: 'background-color 0.3s' },
  deleteButton: { padding: '6px 12px', backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }
};

export default App;