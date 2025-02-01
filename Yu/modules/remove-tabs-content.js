export function removeTabsContent() {
    const parentSection = document.querySelector('#sections');
  
    if (parentSection) {
        const guideSections = parentSection.querySelectorAll('ytd-guide-section-renderer');

        guideSections.forEach((section, index) => {
            if (index > 0) {
                section.remove();
            }
        });
        removeFooter();
    }
}

function removeFooter() {
    const footer = document.querySelector('#footer.style-scope.ytd-guide-renderer');
  
    if (footer) {
        footer.remove();
    }
}
