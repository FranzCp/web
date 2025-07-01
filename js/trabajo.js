const toggleBtn = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');
const mainLogo = document.getElementById('main-logo');
const sidebarLogo = document.getElementById('sidebar-logo');
const contentWrapper = document.querySelector('.content-wrapper');

function applySidebarState() {
    const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';

    if (isCollapsed) {
        sidebar.classList.add('collapsed');
        mainLogo.classList.remove('d-none');
        sidebarLogo.classList.add('d-none');
        contentWrapper.classList.add('sidebar-collapsed');
    } else {
        sidebar.classList.remove('collapsed');
        mainLogo.classList.add('d-none');
        sidebarLogo.classList.remove('d-none');
        contentWrapper.classList.remove('sidebar-collapsed');
    }
}

applySidebarState();

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    const isCollapsed = sidebar.classList.contains('collapsed');

    localStorage.setItem('sidebar-collapsed', isCollapsed);

    if (isCollapsed) {
        mainLogo.classList.remove('d-none');
        sidebarLogo.classList.add('d-none');
        contentWrapper.classList.add('sidebar-collapsed');
    } else {
        mainLogo.classList.add('d-none');
        sidebarLogo.classList.remove('d-none');
        contentWrapper.classList.remove('sidebar-collapsed');
    }
});
