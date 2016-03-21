$(function () {

  var pagination = '';
  var list = '';
  var $grid = $('.grid');

  var createInstagrid = function (instaData) {

    $.each(instaData.data, function (i, el) {
      list += '<li>';
      list +=   '<a target="_blank" href="' + el.link + '">';
      list +=     '<img src=' + el.images.standard_resolution.url + '>';
      list +=   '</a>';
      list +=   '<div class="image-info">';
      list +=     '<div class="profile-pic"><img src=' + el.user.profile_picture + '></div>';
      list +=     '<div class=profile-info>';
      list +=       '<p>' + el.user.username + '</p>';
      list +=       '<p>' + el.comments.count;
      list +=       '<i class="fa fa-comments"></i>';
      list +=       el.likes.count;
      list +=       '<i class="fa fa-heart"></i>';
      list +=       '</p>';
      list +=     '</div>';
      list +=    '</div>';
      list += '</li>';
    });
    pagination = instaData.pagination.next_url;
    $grid.append(list);
    list = '';
  };

  //Initially hide loader.gif and load-more button
  $('.loader').hide();
  $('.load-more').hide();

  //  search function
  $('.search').on('click', function (event) {

    event.preventDefault();

    var hashtag = $('#search').val();

    $(document).bind('ajaxSend', function() {
      $('.loader').show();
    }).bind('ajaxComplete', function() {
      $('.loader').slideUp('slow');
      $('.load-more').show();
      $('header').css({
        height: 'auto',
        padding: '1.5rem',
      });
    });

    $.ajax({
      dataType: 'jsonp',
      method: 'GET',
      url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent?count=12&client_id=b8586475183a4ad89a5a0ebd4a36fbc2',
    })

    .done(createInstagrid)

    .fail(function () {
      $grid.empty().append("<li class='error'>Please enter a valid search term.</li>");
      list= '';
    });

    $grid.empty().append(list);

    //  end of search function
  });

  // load more function
  $('.load-more').on('click', function() {

    $(document).bind('ajaxSend', function() {
      $('.loader').show();
    }).bind('ajaxComplete', function() {
      $('.loader').hide();
    });

    $.ajax({
      dataType: 'jsonp',
      method: 'GET',
      url:  pagination,
    })

    .done(createInstagrid);

    // end of load more
  });

  //  end of document ready
});
