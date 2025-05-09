const systemConfig = require ("../../config/system")
const cateRoute = require ("./category.route")
const orderRoute = require ("./order.route")
const customerRoute = require ("./customer.route")
const staffRoute = require ("./staff.route")

function routeAdmin(app) {
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + "/order", orderRoute);
    
    app.use(PATH_ADMIN + "/category", cateRoute);

    app.use(PATH_ADMIN + "/staff", staffRoute);

    app.use(PATH_ADMIN + "/customer", customerRoute);

    app.use(PATH_ADMIN, cateRoute);
}

module.exports = routeAdmin
