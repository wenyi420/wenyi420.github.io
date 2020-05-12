<template>
    <div class="todo-item">
        <input type="checkbox" :id="index" v-model="complete">
        <label class="date" :for="index">
            <span class="checkbox-icon"></span>
            <span class="date">{{todo.date}}</span>
            <span class="content" v-if="!todo.edit">{{todo.content}}</span>
            <input v-focus v-else class="edit-todo-input" type="text" v-model="todo.content" @keyup.enter="editTodo">
        </label>
        <div class="btns">
            <span>
                <font-awesome-icon v-if="!todo.edit" class="icon del" icon="edit" @click="todo.edit = true" />
                <font-awesome-icon v-else class="icon edit-done" icon="check" @click="editTodo" />
            </span>
            <font-awesome-icon class="icon" icon="times" @click="deletTodo" />
        </div>
    </div>
</template>

<script>
export default {
    
    props:{
        index:{
            type:Number,
            required:true,
        }
    },
    computed:{
        todo(){
            return this.$store.state.todos[this.index]
        },
        complete:{
            get(){
                return this.todo.complete
            },
            set(val){
                this.$store.commit('TOGGLE_COMPLETE',{
                    index:this.index,
                    data:{
                        complete: val,
                    }
                })
            }
        },
        
    },
    methods:{
        isComplete(){
            this.$store.commit('TOGGLE_COMPLETE',this.index);
        },
        deletTodo(){
            this.$store.commit('DELETE_TODO',this.index)
        },
        editTodo(){
            this.$store.commit('EDIT_TODO',{
                index:this.index,
                data:{
                    content:this.todo.content,
                    edit:false
                }
            })
        }
    },
   
}
</script>

<style lang="scss">
.main .todo-item{
        display: flex;align-items: center;position: relative;
        padding: 15px 0px;
        
        input[type="checkbox"]{
            opacity: 0;
        }
        input:checked ~ label{
            text-decoration: line-through;

            .checkbox-icon{
                background: #224772;

                &::after{
                    content: "";
                    position: absolute;
                    left: 6px;
                    top: 3px;
                    width: 4px;
                    height: 7px;
                    border: solid white;
                    border-width: 0 3px 3px 0;
                    -webkit-transform: rotate(45deg);
                    transform: rotate(45deg);
                }
            }
        }
        label{
            width: 85%;
            padding-left: 30px;
            cursor: pointer;

            .checkbox-icon{
                display: inline-block;
                width: 20px;
                height: 20px;
                position: absolute;
                left: 10px;
                top: 50%;
                border-radius: 50%;
                border: 1px solid #ccc;
                transform: translateY(-50%);
            }
        }
        .date{font-size: 14px;padding-right: 15px;}
        .content{display: inline-block;padding: 6.5px 5px;}
        .edit-todo-input{
            width: 70%;
            padding: 5px;
        }
        .btns{
            position: absolute;
            right: 0px;
            
            .icon{
                cursor: pointer;
                margin: 0 10px;
                font-size: 20px;
                &:hover{
                    color:#224772;
                }
            }
        }
    }
    .main .todo-item + .todo-item{
        border-top:1px solid #d4d4d4;
    }

</style>