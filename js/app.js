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
        .on('change','.toggle',this.toggleTodoComplete.bind(this));
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
    render:function(){
      this.$cachedTodoApp.find('#todo-list')
        .html(this.todoTemplate(this.todos));

    }
  };

  $(function(){
    app.init();
  });

})(jQuery);
