(function($){
  'use strict';

  var app = {
    init:function(){
      this.$cachedTodoApp = $('#todo-app');
      this.todoTemplate = Handlebars.compile($('#todo-template').html());

      // will need to create a proper store !!!
      this.todos = [];

      this.bindEvents();
    },
    bindEvents:function(){
      this.$cachedTodoApp.find('#new-todo')
        .on('keyup',this.addTodo.bind(this));

      this.$cachedTodoApp.find('#todo-list')
        .on('change','.toggle',this.toggleTodoComplete.bind(this))
        .on('click','.destroy',this.removeTodo.bind(this))
        .on('dblclick','label',this.toggleEditing.bind(this))
        .on('keyup','.edit',this.updateKeyup)
        .on('focusout','.edit',this.updateTodo.bind(this));
    },
    addTodo:function(evt){
      var $input = evt.target,
          val = $input.value.trim();

      // key 13 is enter

      if(evt.keyCode !== 13 || !val){
        return;
      }

      // need to add uuid

      var newTodo = {
        id:this.todos.length + 1,
        text:val,
        completed:false
      };

      this.todos.push(newTodo);

      $input.value = '';

      this.render();

    },
    toggleTodoComplete:function(evt){
      var id = $(evt.target).parents('li').attr('id');
      this.todos = this.todos.map(function(todo){
        if(todo.id == id){
          todo.completed = !todo.completed;
        }
        return todo;
      });
      this.render();
    },
    removeTodo:function(evt){
      var id = $(evt.target).parents('li').attr('id');

      this.todos = this.todos.filter(function(todo){
        return todo.id != id;
      });
      this.render();
    },
    toggleEditing:function(evt){
      var $todoElm = $(evt.target).parents('li'),
          selectedTodoText = this.todos.find(function(todo){
            return todo.id == $todoElm.attr('id');}).text;
      $todoElm.addClass('editing');
      $todoElm.find('.edit').val(selectedTodoText).focus();
    },
    updateKeyup:function(evt){
      var $target = $(evt.target);
      var keyCode = evt.keyCode;

      if(keyCode === 13){
        $target.blur();
      }
      if(keyCode === 27){
        $target.data('abort',true);
        $target.blur();
      }
    },
    updateTodo:function(evt){
      var $target = $(evt.target),
          val = $target.val().trim();


      if(!val){
        this.removeTodo(evt);
        return;
      }

      if(!$target.data().abort){
        this.todos = this.todos.map(function(todo){
          if(todo.id == $target.closest('li').attr('id')){
            todo.text = val;
          }
          return todo;
        });
      }
      $target.data().abort = false;

      this.render();
    },
    render:function(){
      this.$cachedTodoApp.find('#todo-list')
        .html(this.todoTemplate(this.todos));

    }
  };

  $(function(){
    app.init();
  });

})(jQuery);
