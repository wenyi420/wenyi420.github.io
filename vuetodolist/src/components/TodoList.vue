<template>
  <div class="todo-list">
    <div class="tabs">
      <span
        class="all"
        :class="{active:tabStatus == 'all'}"
        @click="updateStatus('all')"
      >全部 ({{allLength}})</span>
      <span
        class="doing"
        :class="{active:tabStatus == 'doing'}"
        @click="updateStatus('doing')"
      >進行中 ({{doingLength}})</span>
      <span
        class="complete"
        :class="{active:tabStatus == 'complete'}"
        @click="updateStatus('complete')"
      >完成 ({{completeLength}})</span>
    </div>
    <div class="main">
      <transition-group name="fade">
        <TodoListItem
          class="fade-item"
          v-for="index in loadIndex"
          :key="index"
          :index="index"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
  import TodoListItem from "./TodoListItem.vue";
  export default {
    data() {
      return {
        tabStatus: "all"
      };
    },
    created() {
      this.$store.dispatch("INIT_TODOS");
    },
    components: {
      TodoListItem
    },

    computed: {
      loadIndex() {
        return this.$store.getters["TodoIndex"];
      },
      allLength() {
        return this.$store.getters["allLength"];
      },
      doingLength() {
        return this.$store.getters["doingLength"];
      },
      completeLength() {
        return this.$store.getters["completeLength"];
      }
    },
    methods: {
      updateStatus(status) {
        this.$store.commit("UPDATE_TODO_STATUS", status);
        this.tabStatus = status;
      }
    },
    watch: {
      loadIndex() {
        return this.$store.getters["TodoIndex"];
      }
    }
  };
</script>

<style lang="scss">
  .todo-list {
    padding: 20px 0px;
    .tabs {
      margin-bottom: 10px;

      span {
        display: inline-block;
        padding: 10px 30px;
        cursor: pointer;
      }
      span.active {
        background: #224772;
        color: #fff;
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  @media screen and (max-width: 480px) {
    .todo-list .tabs span {
      padding: 8px 13px;
      font-size: 14px;
    }
  }
</style>
