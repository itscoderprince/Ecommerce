const showProduct = () => {
    const productData = getAllData('productData');
    console.log(productData);
    
    const productList = document.querySelector('.product-list');
    productData.forEach((product, index) => {
        productList.innerHTML += ` 
        <div class="col-md-3 mb-4">
                <div class="card h-100 shadow-sm">
                    <div class="card-img-top text-center p-2">
                        <img src="${product.thumb}" alt="Product_Img" class="w-50">
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title fw-bold">${product.brand}</h5>
                        <p class="card-text text-muted">${product.title}</p>
                        <div class="d-flex justify-content-center mb-2">
                            <i class="fa fa-star text-warning"></i>
                            <i class="fa fa-star text-warning"></i>
                            <i class="fa text-warning fa-star"></i>
                            <i class="fa text-warning fa-star"></i>
                            <i class="fa-regular text-warning fa-star"></i>
                        </div>
                        <p class="fw-bold mb-2 text-muted">
                            <i class="fa fa-indian-rupee-sign me-1 text-dark "></i>${product.price}
                        </p>
                        <div class="d-flex justify-content-around">
                            <button index="${index}" product-id="${index}" class="btn btn-primary">
                                <i class="fa fa-shopping-cart"></i> Add to Cart
                            </button>
                            <button index="${index}" product-id="${index}" class="btn btn-danger">
                                <i class="fa fa-shopping-bag"></i> Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
};

showProduct();