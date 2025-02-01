export function sign() {
    const redPath = document.querySelector('path[fill="#FF0033"]');

    if (redPath) {
        redPath.setAttribute('fill', '#3a0ca3');
    }
}
