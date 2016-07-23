(function($){
  'use strict';

  var app = {
    init:function(){
      this.$cachedTodoApp = $('#todo-app');

      // will need to create a proper store !!!
      this.todos = [];

      this.bindEvents();
    },
    bindEvents:function(){
      this.$cachedTodoApp.find('#new-todo')
        .on('keyup',this.addTodo.bind(this));
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

    }
  };

  $(function(){
    app.init();
  });

})(jQuery);
