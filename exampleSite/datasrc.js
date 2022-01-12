function datasrc(id) {
  var anchor = document.getElementById(id);
  var img = anchor.getElementsByTagName('img')[0];
  img.src = img.getAttribute('data-src');
}
