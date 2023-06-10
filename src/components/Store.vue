<template>
    <div class="container py-5">
      <h2 class="mt-4">Tambah Barang</h2>
      <form @submit.prevent="addItem">
        <div class="mb-3">
          <label for="name" class="form-label">Nama Barang:</label>
          <input type="text" id="name" v-model="newItem.name" class="form-control" required>
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Harga:</label>
          <input type="text" id="price" v-model="newItem.price" class="form-control" placeholder="Masukkan harga" required>
        </div>
        <div class="mb-3">
          <label for="quantity" class="form-label">Jumlah:</label>
          <input type="number" id="quantity" v-model="newItem.quantity" class="form-control" required>
        </div>
        
        <button type="submit" class="btn btn-primary">Tambahkan</button>
      </form>
  
      <h2 class="mt-4">Daftar Barang</h2>
    <table class="table mt-2">
      <thead>
        <tr>
          <th>Nama Barang</th>
          <th>Jumlah</th>
          <th>Harga</th>
          <th>Total Harga</th> <!-- Tambah kolom total harga -->
          <th>Aksi</th> <!-- Tambah kolom aksi -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.items" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.price }}</td>
          <td>{{ calculateTotalPrice(item) }}</td> <!-- Tampilkan total harga -->
          <td>
            <button class="btn btn-danger btn-sm" @click="removeItem(item)">
              Hapus
            </button> <!-- Tambahkan tombol hapus -->
          </td>
        </tr>
      </tbody>
    </table>

    <h3 class="mt-4">Total Barang: {{ store.totalItems }}</h3>
    <h3 class="mt-4">Total Seluruh Harga: {{ calculateGrandTotalPrice() }}</h3> <!-- Tampilkan total harga keseluruhan -->
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useMyStore } from '../store/myStore';

export default defineComponent({
  name: 'Store',
  setup() {
    const store = useMyStore();

    const newItem = {
      name: '',
      quantity: 0,
      price: '',
    };

    const addItem = () => {
      const parsedPrice = parseFloat(newItem.price);
      if (isNaN(parsedPrice)) {
        // Harga tidak valid, tidak menambahkan item
        return;
      }
      newItem.price = parsedPrice.toFixed(2);
      store.addItem({ ...newItem });
      newItem.name = '';
      newItem.quantity = 0;
      newItem.price = '';
    };

    const removeItem = (item) => {
      store.removeItem(item);
    };

    const calculateTotalPrice = (item) => {
      return (item.quantity * item.price).toFixed(2);
    };

    const calculateGrandTotalPrice = () => {
      let grandTotal = 0;
      store.items.forEach((item) => {
        grandTotal += item.quantity * item.price;
      });
      return grandTotal.toFixed(2);
    };

    return {
      store,
      newItem,
      addItem,
      removeItem,
      calculateTotalPrice,
      calculateGrandTotalPrice,
    };
  },
});
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
}

form {
  width: 100%;
  max-width: 400px;
  margin-bottom: 1rem;
}
</style>