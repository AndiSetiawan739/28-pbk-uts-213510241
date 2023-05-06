<template>
    <div>
      <div class="btn-group mb-3" role="group" aria-label="Filter todos">
        <button
          type="button"
          class="btn"
          :class="{'btn-primary': show === 'all'}"
          @click="showAll"
        >
          Semua
        </button>
        <button
          type="button"
          class="btn"
          :class="{'btn-primary': show === 'active'}"
          @click="showActive"
        >
          Belum Selesai
        </button>
        <button
          type="button"
          class="btn"
          :class="{'btn-primary': show === 'done'}"
          @click="showDone"
        >
          Selesai
        </button>
      </div>
  
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          v-for="(todo, index) in filteredTodos"
          :key="index"
        >
          <div class="row gy-2">
            <div
              class="col-sm-12 col-md-auto me-auto align-self-center fs-5"
              :class="{'text-decoration-line-through text-muted': todo.isDone}"
            >
              {{ todo.activity }}
            </div>
            <div class="col-sm-12 col-md-auto">
              <div class="row gx-2">
                <div class="col-auto">
                  <button
                    class="btn"
                    :class="[
                      todo.isDone ? 'btn-outline-secondary' : 'btn-outline-success',
                    ]"
                    @click="doneTodo(index)"
                  >
                    <font-awesome-icon icon="circle-check" />
                  </button>
                </div>
                <div class="col-auto">
                  <button
                    class="btn"
                    :class="[
                      todo.isDone ? 'btn-outline-secondary' : 'btn-outline-danger',
                    ]"
                    @click="deleteTodo(index)"
                  >
                    <font-awesome-icon icon="eraser" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      todos: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {
        show: "all",
      };
    },
    methods: {
      deleteTodo: function (index) {
        this.$emit("deleteTodo", index);
      },
      doneTodo: function (index) {
        this.$emit("doneTodo", index);
      },
      showAll: function () {
        this.show = "all";
      },
      showActive: function () {
        this.show = "active";
      },
      showDone: function () {
        this.show = "done";
      },
    },
    computed: {
      filteredTodos: function () {
        if (this.show === "all") {
          return this.todos;
        } else if (this.show === "active") {
          return this.todos.filter(function (todo) {
            return !todo.isDone;
          });
        } else if (this.show === "done") {
          return this.todos.filter(function (todo) {
            return todo.isDone;
          });
        }
      },
    },
  };
  </script>
  