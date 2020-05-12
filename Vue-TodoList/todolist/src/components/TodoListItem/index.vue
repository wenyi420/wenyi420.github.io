<script>
  export default {
    props: {
      index: {
        type: Number,
        required: true
      }
    },
    methods: {
      destoryHandler() {
        if (confirm(`是否要刪除${this.todo.content}`)) {
          this.$store.commit("REMOVE_TODO", this.index);
        }
      }
    },
    computed: {
      todo() {
        return this.$store.state.todos[this.index];
      },
      complete: {
        get() {
          return this.todo.complete;
        },
        set(val) {
          this.$store.commit("UPDATE_TODO", {
            index: this.index,
            data: {
              content: this.todo.content,
              complete: val
            }
          });
        }
      }
    }
  };
</script>
<template src="./template.html"></template>