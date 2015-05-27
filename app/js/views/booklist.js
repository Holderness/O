var app = app || {};


(function($) {

  app.BookListView = Backbone.View.extend({
  
    initialize: function() {
      this.listenTo(this.collection, 'add', this.renderBook);
      this.listenTo(this.collection, 'reset', this.render);
    },

    render: function() {
      console.log('render each');
      this.collection.each(function (item) {
        this.renderBook(item);
      }, this);
      $(".starrr").starrr();
    },

    renderBook: function(item) {
      var bookView = new app.BookView({
        model: item
      });
      $('#bookList').append(bookView.render().el);
    }

  });

})(jQuery);