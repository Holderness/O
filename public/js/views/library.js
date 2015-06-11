var app = app || {};

(function($) {

  app.LibraryView = Backbone.View.extend({
    el: '#page-content',

    template: _.template($('#libraryTemplate').html()),

    events: {
      'click #add': 'addBook',
      'click #update': 'updateBook',
    },

    initialize: function() {
      this.thumbnailView = new app.ThumbnailView();
      this.bookListView = new app.BookListView( { collection: app.booklist } );

      this.listenTo(this.thumbnailView, 'image-uploaded', this.updateInput);
      this.listenTo(app.booklist, 'filter', this.filter);
      this.listenTo(this.bookListView, 'update-Comment', this.updateComment);

    },

    render: function() {
      this.$el.html(this.template());
      this.thumbnailView.setElement(this.$('#imageCoverUpload')).render();
    },

    start: function() {
      this.render();
      app.booklist.fetch({ reset: true });
    },

    addBook: function(e) {
      e.preventDefault();
      this.thumbnailView.submit();
      $('#addBookModal').modal('hide');
    },

    updateBook: function() {
      app.book.trigger('updateBook');
    },

    updateComment: function() {
      console.log('update comment triggererd');
      app.book.trigger('updateComment');
      $('#commentModal').modal('hide');
      this.stopListening(this.bookListView, 'update-Comment');
    },

    filter: function() {
       app.booklist.sortByField(app.BookFilter);
    },

    updateInput: function(path) {
      console.log(path);
      $('#coverImage').val(path);
      this.createData();
    },

    createData: function( e ) {
      var formData = {};
        $( '#addBook div' ).children( 'input' ).each( function( i, el ) {
          if ( $(el).val() !== '' ) {
            if ( el.id === 'keywords' ) {
              formData[ el.id ] = [];
              _.each( $( el ).val().split( ' ' ), function( keyword ) {
                formData[ el.id ].push({ 'keyword': keyword });
              });
            } else if ( el.id === 'dateCompleted' ) {
              formData[ el.id ] = $( '#dateCompleted' ).datepicker( 'getDate' ).getTime();
            } else {
              formData[ el.id ] = $( el ).val();
            }
          }
          $( el ).val('');
        });
        app.booklist.create( formData );
        $('#uploadedImage').val('');
    }

  });

})(jQuery);