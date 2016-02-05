$(function() {

  var list = '';
  var $grid = $('.grid');
// search hashtag
  $('#button').on('click', function(event) {
      event.preventDefault();

        var hashtag = $('#search').val();


        $.ajax({
          dataType: 'jsonp',
          method: 'GET',
          url: 'https://api.instagram.com/v1/tags/'+ hashtag +'/media/recent?count=12&client_id=b8586475183a4ad89a5a0ebd4a36fbc2'
        })

        .done(function(instaData) {
          console.log(instaData);
          $.each(instaData.data, function(i, el) {
            list += '<li>';
            list +=   '<a href="' + el.link + '">';
            list +=     '<img src=' + el.images.standard_resolution.url + '>';
            list +=   '</a>';
            list +=   '<p>' + el.user.username + '</p>';
            list +=   '<img src=' + el.user.profile_picture + '>';
            list +=   '<p>' + el.likes.count + '</p>';
            list +=   '<p>' + el.comments.count + '</p>';
            list += '</li>';



          });
          $grid.append(list);
        })

        .fail(function(error) {
          console.log(error);
        });
  });


// end of document ready
});
