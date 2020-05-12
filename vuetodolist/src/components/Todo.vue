<template>
    <div class="todo">
        <h1>TODO LIST</h1>
        <TodoInput />
        <TodoList />
    </div>
</template>

<script>
import TodoInput from './TodoInput.vue'
import TodoList from './TodoList.vue'
export default {
    components:{
        TodoInput,
        TodoList
    }
}
</script>

<style lang="scss">
h1{
    margin-bottom: 15px;
    color: #224772;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;
}
</style>