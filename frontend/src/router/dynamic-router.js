const pages = import.meta.glob( '@/views/**/*.vue')

export const addMenuRoutes = ( router,menus) => {
  menus.forEach(menu => {

        if (!menu.route || !menu.component_path)
            return;

        const component = pages[`/src/views/${menu.component_path}`];

        if (!component) {
            console.warn("Component not found:", menu.component_path);
            return;
        }

        const childPath = menu.route.replace(/^\/admin\//, "");
        const routeName = `menu-${menu.id}`;
        if (router.hasRoute(routeName))
            return;

        router.addRoute("admin", {

            path: childPath,
            name: routeName,
            component,
            meta: {
                requiresAuth: true,
                menuId: menu.id,
                title: menu.menu_name,
                icon: menu.icon,
                module: menu.module_name
            }

        });

    });


}