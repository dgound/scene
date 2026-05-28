(function () {
  var active = (document.body && document.body.dataset.page) || '';
  var html =
    '<div class="container">' +
      '<h1 class="logo">./SCENE<sup> a data-driven archive</sup></h1>' +
      '<nav aria-label="Primary">' +
        '<ul>' +
          '<li><a href="index.html"' + (active === 'graph' ? ' aria-current="page"' : '') + '>Graph</a></li>' +
          '<li><a href="about.html"' + (active === 'about' ? ' aria-current="page"' : '') + '>About</a></li>' +
        '</ul>' +
      '</nav>' +
    '</div>';
  var header = document.querySelector('header[data-shared]');
  if (header) header.innerHTML = html;
})();
