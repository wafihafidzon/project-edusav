const path = require("path");
const swal = require("sweetalert2");
require("dotenv").config({
    path: path.join(__dirname, "../.env"),
});
const ProductController = require("../controller/ProductController");
const CategoryController = require("../controller/CategoryController");
const apiProduct = process.env.API_PRODUCTS;
const authToken = process.env.API_KEY;
const apiCategory = process.env.API_CATEGORIES;
const apiStorage = process.env.API_STORAGE;

const productController = new ProductController(apiProduct, authToken);
const categoryController = new CategoryController(apiCategory, authToken);

document.addEventListener("DOMContentLoaded", () => {
    (async () => {
        async function loadProducts() {
            const loader = document.getElementById("loader");
            loader.style.display = "block";

            const productList = document.getElementById("productList");
            productList.style.display = "none";

            try {
                const products = await productController.getProducts();
                productList.innerHTML = "";
                products.forEach((product, index) => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                <td>${index + 1}. {${product.product_id}}</td>
                <td style="width: 18rem;"><img class="img-fluid mx-auto card-img-top" src="${apiStorage}${product.image_product}" alt="${product.name_product}"></td>
                <td>${product.name_product}</td>
                <td>${product.category_id}</td>
                <td>Rp ${product.amount}</td>
                <td>${product.qty}</td>
                <td>
                    <div class="d-flex gap-2">
                        <button id="edit" data-product="${product.product_id}" class="btn btn-secondary">Edit</button>
                        <button id="delete" data-product="${product.product_id}" class="btn btn-danger">Delete</button>
                    </div>
                </td>
            `;
                    productList.appendChild(tr);
                });

                loader.style.display = "none";
                productList.style.display = "";
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error}`,
                    confirmButtonColor: '#0d6efd',
                    confirmButtonText: 'Yes, reload'
                }).then((r) => {
                    if (r.isConfirmed) {
                        loadProducts()
                    }
                })
            }
        }

        await loadProducts()

        productList.addEventListener("click", async (event) => {
            const target = event.target;

            if (target.id === "delete") {
                swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#0d6efd',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const idProduct = target.dataset.product;
                        productController.deleteProduct(idProduct).then(response => {
                            if (response.success === true) {
                                swal.fire(
                                    response.message,
                                    'Your data has been deleted.',
                                    'success'
                                ).then(() => {
                                    loadProducts();
                                });
                            } else {
                                swal.fire(
                                    response.message,
                                    'Your data failed to delete.',
                                    'warning'
                                ).then(() => {
                                    loadProducts();
                                });
                            }
                        });
                    }
                });
            } else if (target.id === "edit") {
                const idProducts = target.dataset.product;
                const modal = document.getElementById("modal");
                const overlay = document.getElementById("overlay");
                const btnCloseModal = document.getElementById("closeModalBtn");

                modal.style.display = "block";
                overlay.style.display = "block";

                await productController.getProductsById(idProducts).then(async (data) => {
                    document.getElementById("name_product").value = data.name_product
                    document.getElementById("amount").value = data.amount
                    document.getElementById("qty").value = data.qty

                    const listCategory = document.querySelector('[name="category_id"]');
                    listCategory.innerHTML = "";
                    
                    const categories = await categoryController.getCategory();
                    categories.forEach((category) => {
                        const option = document.createElement("option");
                        option.value = category.id;
                        option.textContent = category.name;
                        listCategory.appendChild(option);
                    });

                    for (let i = 0; i < listCategory.options.length; i++) {
                        const option = listCategory.options[i];
                        if (option.textContent === data.category_id) {
                            option.selected = true;
                        }
                    }

                    const updateForm = document.getElementById("updateProduct");
                    updateForm.addEventListener("submit", (event) => {
                        event.preventDefault()

                        swal.fire({
                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#0d6efd',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, update it'
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

                                if (productImage.value !== null && productImage.value !== '') {
                                    formdata.append(
                                        "image_product",
                                        productImage.files[0],
                                        productImage.files[0]?.path
                                    );
                                }

                                productController.updateProduct(idProducts, formdata).then(response => {
                                    if (response.success === true) {
                                        swal.fire(
                                            response.message,
                                            'Your data has been updated.',
                                            'success'
                                        ).then(() => {
                                            loadProducts()
                                        });
                                    } else {
                                        swal.fire(
                                            response.message,
                                            'Your data failed to updated',
                                            'warning'
                                        )
                                    }
                                });
                            }
                        });
                    })
                })

                btnCloseModal.addEventListener("click", () => {
                    modal.style.display = "none";
                    overlay.style.display = "none";
                });

                document.addEventListener("keydown", (event) => {
                    if (event.key === "Escape") {
                        modal.style.display = "none";
                        overlay.style.display = "none";
                    }
                })

                window.addEventListener("click", (event) => {
                    if (event.target === overlay) {
                        modal.style.display = "none";
                        overlay.style.display = "none";
                    }
                });
            }
        });
    })();
});