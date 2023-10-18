const path = require("path");
const swal = require("sweetalert2");
require("dotenv").config({
    path: path.join(__dirname, "../.env"),
});

const ProductController = require("../controller/ProductController");
const CategoryController = require("../controller/CategoryController");
const { ipcRenderer } = require("electron");
const apiProduct = process.env.API_PRODUCTS;
const apiCategory = process.env.API_CATEGORIES;
const authToken = process.env.API_KEY;

const productController = new ProductController(apiProduct, authToken);
const categoryController = new CategoryController(apiCategory, authToken);

const createProductForm = document.getElementById("productForm");

createProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add it'
    }).then((result) => {
        if (result.isConfirmed) {
            const productName = document.querySelector('[name="name_product"]').value;
            const productCategory = document.querySelector('[name="category_id"]').value;
            const productImage = document.querySelector('[name="image_product"]');
            const amount = document.querySelector('[name="amount"]').value;
            const qty = document.querySelector('[name="qty"]').value;

            const formdata = new FormData();
            formdata.append("category_id", productCategory);
            formdata.append("name_product", productName);
            formdata.append("amount", amount);
            formdata.append("qty", qty);
            formdata.append(
                "image_product",
                productImage.files[0],
                productImage.files[0]?.path
            );

            productController.createProduct(formdata).then(response => {
                if (response.success === true) {
                    swal.fire(
                        response.message,
                        'Your data has been added.',
                        'success'
                    ).then(() => {
                        createProductForm.reset()
                        ipcRenderer.send("reload");
                    });
                }
            });
        }
    });
});

async function loadCategory() {
    const listCategory = document.querySelector('[name="category_id"]');
    const categories = await categoryController.getCategory();
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        listCategory.appendChild(option);
    });
}


loadCategory();