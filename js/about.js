function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const icon = document.querySelector(".theme-toggle i");
    if (document.body.classList.contains("dark-mode")) {
        icon.classList.replace("fi-br-moon-stars", "fi-br-sun");
    } else {
        icon.classList.replace("fi-br-sun", "fi-br-moon-stars");
    }
}
