<template>
  <div class="container py-5"> 
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <h1 class="navbar-brand" >AndiApp</h1>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            
            <li class="nav-item">
              <router-link class="nav-link" to="/list">Catatan</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">Tentang</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view></router-view>
    <div class="row d-flex justify-content-center align-items-center">
      <template v-if="$route.path === '/list'">
      <div class="col-10">
        <div class="card rounded">
          <div class="card-body p-5">
            <h3 class="mb-3 fw-bold">
              Catatan
              
            </h3>

            <form
              @submit.prevent="addTodo"
              class="row align-items-center mb-3 gy-2"
            >
              <div class="col-sm-12 col-md-10">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control fs-4"
                    id="floatingInput"
                    placeholder="Todos"
                    autocomplete="off"
                    v-model="todo"
                  />
                  <label for="floatingInput">Apa rencana anda hari ini?</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-2">
                <div class="d-grid">
                  <button
                    type="submit"
                    class="btn btn-primary btn-lg"
                    :disabled="todo.length === 0"
                  >
                    <font-awesome-icon icon="circle-plus" />
                    Tambah
                  </button>
                </div>
              </div>
            </form>

              <List
                :todos="filteredTodos"
                @deleteTodo="deleteTodo"
                @doneTodo="doneTodo"
              />
            
          </div>
        </div>
      </div> 
    </template>
    </div>
    
  </div>
  
</template>


<script>
import List from "./components/List.vue";

export default {
  components: { List },
  data() {
    return {
      todo: "",
      todos: [],
      currentFilter: "all",
    };
  },
  mounted() {
    if (localStorage.getItem("todos") != null) {
      this.todos = JSON.parse(localStorage.getItem("todos"));
      
    }
    
  },
  methods: {
    addTodo() {
      if (this.todo != "") {
        this.todos.unshift({
          activity: this.todo,
          isDone: false,
        });
        this.todo = "";
        this.saveToLocalStorage();
      }
    },
    deleteTodo(indexDelete) {
      this.todos = this.todos.filter((item, index) => {
        if (index != indexDelete) {
          return item;
        }
      });
      this.saveToLocalStorage();
    },
    doneTodo(indexDone) {
      this.todos[indexDone].isDone = !this.todos[indexDone].isDone;
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
  },
  computed: {
   
    filteredTodos() {
      if (this.filter === "done") {
        return this.todos.filter((todo) => todo.isDone);
      } else if (this.filter === "undone") {
        return this.todos.filter((todo) => !todo.isDone);
      } else {
        return this.todos;
      }
    },
  },
};
</script>
<style>
@import "./assets/styles.css";
</style>
