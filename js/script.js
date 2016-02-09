$(function () {

  //  search function

  $('.loader').hide();

  $(button).on('click', function (event) {

    event.preventDefault();

    var hashtag = $('#search').val();
    var list = '';
    var $grid = $('.grid');

    $('header').css({
      'height': 'auto',
      'padding': '1rem',
    });

    $(document).bind("ajaxSend", function(){
     $(".loader").show();
   }).bind("ajaxComplete", function(){
     $(".loader").hide();
   });

    $.ajax({
      dataType: 'jsonp',
      method: 'GET',
      url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent?count=12&client_id=b8586475183a4ad89a5a0ebd4a36fbc2',
    })

    .done(function (instaData) {
      console.log(instaData);
      $.each(instaData.data, function (i, el) {
        list += '<li>';
        list +=   '<a href="' + el.link + '">';
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

      $grid.empty().append(list);
      $list = '';
    })

    .fail(function () {
      $grid.append("<li>Please enter a search term</li>").css({
        'text-align': 'center',
        'font-style': 'italic',
        'font-family': 'Open Sans'
        });
        $list= '';
    });


    //  end of search function

  });

    //  end of document ready

});
