import { defineStore } from 'pinia';

const STORAGE_KEY = 'myStore';

export const useMyStore = defineStore({
  id: 'myStore',
  state: () => ({
    counter: 0,
    items: [],
  }),
  actions: {
    increment() {
      this.counter++;
    },
    addItem(item) {
      this.items.push(item);
      this.saveToStorage();
    },
    removeItem(item) {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.saveToStorage();
      }
    },
    loadFromStorage() {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const { counter, items } = JSON.parse(data);
        this.counter = counter;
        this.items = items;
      }
    },
    saveToStorage() {
      const data = JSON.stringify({ counter: this.counter, items: this.items });
      localStorage.setItem(STORAGE_KEY, data);
    },
  },
  getters: {
    totalItems() {
      return this.items.length;
    },
  },
});
