const modelCatalog = require('../../models/catalog.model.js');
const modelProduct = require('../../models/product.model.js');


class CatalogController {
  async index(req, res) {
    try {
      const user = req.session.user || null;
      const catalogList = await modelCatalog.list(); // Sửa ở đây
      res.render("client/pages/shop-grid", {
        layout: "main",
        pageTitle: "Danh mục sản phẩm",
        catalogList,
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async show(req, res) {
    const nameCat = req.params.nameCat;
    const user = req.session.user || null;
  
    try {
      const catalogList = await modelCatalog.list();
      const catalog = catalogList.find(cat => cat.nameCat === nameCat);
  
      if (!catalog) {
        return res.status(404).render('client/pages/404', {
          layout: "main",
          message: 'Danh mục không tồn tại',
          user,
          catalogList
        });
      }
  
      const products = await modelProduct.find({ categoryId: catalog._id })
  
      // ✅ Lọc trùng theo title + import
      const seen = new Set();
      const uniqueProducts = products.filter(item => {
        const key = `${item.title}-${item.import}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  
      res.render('client/pages/shop-grid', {
        layout: "main",
        pageTitle: `${nameCat}`,
        products: uniqueProducts,
        categoryName: nameCat,
        user,
        catalogList
      });
    } catch (err) {
      console.error('Lỗi khi load sản phẩm theo danh mục:', err);
      res.status(500).send('Lỗi server');
    }
  }
  
}

module.exports = new CatalogController();
