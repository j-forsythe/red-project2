$(function () {

// search function

  $(button).on('click', function (event) {

      event.preventDefault();

        var hashtag = $('#search').val();
        var list = '';
        var $grid = $('.grid');

        $.ajax({
          dataType: 'jsonp',
          method: 'GET',
          url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent?count=12&client_id=b8586475183a4ad89a5a0ebd4a36fbc2'
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

          $grid.append(list);
        })

        .fail(function (error) {
          console.log(error);
        });

  // end of search function

  });


//   end of document ready

});
