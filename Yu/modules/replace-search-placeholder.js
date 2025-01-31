export function replaceSearchPlaceholder() {
    const searchBoxInput = document.querySelector('.ytSearchboxComponentInput.yt-searchbox-input');
  
    if (searchBoxInput) {
      searchBoxInput.setAttribute('placeholder', 'Yu');
    }
}
