window.onload = () => {
    dynamicReqFunc();
};

// Global Variable:-
let categoryData = [];
let brandData = [];
let productData = [];
let dyLink = ""
let brandLogo = "";
let thumb = "", front = "", back = "", right = "", left = "";


// Navigation toggle here
const menuTogglerFunc = () => {
    let menuToggler = document.querySelector("#menu-toggler");
    let sideNav = document.querySelector('.side-nav');
    let page = document.querySelector('.page');

    menuToggler.onclick = () => {
        sideNav.classList.toggle('side-nav-open');
        sideNav.classList.toggle('side-nav-close');
        page.classList.toggle('page-open');
        page.classList.toggle('page-close');
    }
}

// Start DynamicRequest Function 👇🏻
const dynamicReqFunc = () => {
    let activeEl = document.querySelector(".active");
    let activeLink = activeEl.getAttribute("access-link");
    let allCollapseLink = document.querySelectorAll(".nav_link");
    dynamicAjaxFunc(activeLink);

    for (let el of allCollapseLink) {
        el.onclick = (e) => {
            for (let el of allCollapseLink) {
                el.classList.remove('active')
            }
            let link = e.target.getAttribute("access-link");
            dynamicAjaxFunc(link);
            el.classList.add('active')
        }
    }
}

const dynamicAjaxFunc = (link) => {
    dyLink = link;
    let page = document.querySelector(".page");
    let ajax = new XMLHttpRequest();
    ajax.open("GET", dyLink, true);
    ajax.send();

    // get Response
    ajax.onload = () => {
        let response = ajax.response;
        page.classList.add('fade-out');

        setTimeout(() => {
            page.innerHTML = response;
            page.classList.remove('fade-out');
            page.classList.add('fade-in');

            setTimeout(() => {
                page.classList.remove('fade-in');
            }, 400);

            menuTogglerFunc();
            if (dyLink == 'Dynamic/Category.html') {
                createCategoryFunc();
                readCategoryData();
            }
            else if (dyLink == 'Dynamic/Brand_design.html') {
                createBrandFunc();
            }
            else if (dyLink == 'Dynamic/Product_design.html') {
                createProductFunc();
            }
            else if (dyLink == 'Dynamic/Branding_design.html') {
                createBrandingFunc();
            }
            else {
                "Page Not Found...."
            }
        }, 200);
    }
}

// Create Category Function
const createCategoryFunc = () => {
    categoryData = getAllData('categoryData');
    let categoryForm = document.querySelector('.category-form'),
        inputBox = document.querySelector('.input-box'),
        addFieldBtn = document.querySelector('.add-field-btn');

    addFieldBtn.onclick = () => {
        inputBox.innerHTML += `
            <div>
                <i class="fa fa-trash c_del-btn float-end"></i>
                <input type="text" required placeholder="Category" class="form-control mb-3">
            </div>
        `;

        // Delete coding here                    
        let allDelBtn = document.querySelectorAll('.c_del-btn');
        for (let btn of allDelBtn) {
            btn.onclick = function () {
                this.parentElement.remove();
            };
        }
    };

    categoryForm.onsubmit = (e) => {
        e.preventDefault();

        let inputs = categoryForm.querySelectorAll('input');
        for (let input of inputs) {
            categoryData.push({
                category: input.value
            });
        }

        // Update localStorage and global categoryData
        insertData('categoryData', JSON.stringify(categoryData));
        categoryData = getAllData('categoryData'); // Update global categoryData

        // Update UI
        readCategoryData();
        insertMsg();
        categoryForm.reset();
    };
};

const readCategoryData = () => {
    let categoryList = document.querySelector('#category-list');
    categoryList.innerHTML = '';
    categoryData.forEach((data, index) => {
        categoryList.innerHTML += `
                <tr index="${index}">
                    <td>${index + 1}</td>
                    <td>${data.category}</td>
                    <td>
                        <button class="btn btn-sm edit-btn btn-primary me-2" aria-label="Edit Category">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button class="btn btn-sm save-btn d-none btn-success me-2" aria-label="Edit Category">
                            <i class="fa fa-save"></i>
                        </button>
                        <button class="btn btn-sm del-btn btn-danger" aria-label="Delete Category">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
                    `;
    });

    // Delete/Edit/Save Function here;
    let editBtn = categoryList.querySelectorAll('.edit-btn');
    let saveBtn = categoryList.querySelectorAll('.save-btn');
    let delBtn = categoryList.querySelectorAll('.del-btn');


    // Update coding:-
    for (let btn of editBtn) {
        btn.onclick = () => {
            let parent = btn.parentElement.parentElement,
                index = parent.getAttribute('index'),
                allTd = parent.querySelectorAll('td'),
                saveBtn = parent.querySelector('.save-btn')

            allTd[1].contentEditable = true;
            allTd[1].focus();
            btn.classList.add('d-none')
            saveBtn.classList.remove('d-none');

            saveBtn.onclick = () => {
                let category = allTd[1].innerHTML;
                categoryData[index] = {
                    category: category
                }
                editDelUpdFunc("categoryData", JSON.stringify(categoryData), dyLink, "Data Updated")
            }
        }
    }

    // Delete coding:-
    for (let btn of delBtn) {
        btn.onclick = () => {
            let parent = btn.parentElement.parentElement;
            let index = parent.getAttribute('index');
            categoryData.splice(index, 1);
            editDelUpdFunc('categoryData', JSON.stringify(categoryData), dyLink, ' Deleted');
        }
    }
}

// <============== Brand Code Start's Here ===================>

// brand link code here
const createBrandFunc = () => {
    let categoryData = getAllData("categoryData"),
        brandData = getAllData("brandData"),
        brandForm = document.querySelector('.brand-form'),
        categorySelect = brandForm.querySelector('select'),
        inputBox = brandForm.querySelector('.input-box'),
        FormBtns = brandForm.querySelectorAll('button'),
        brandListSelect = document.querySelector('.brand-list-select');

    for (let data of categoryData) {
        categorySelect.innerHTML += `<option>${data.category}</option> `;
        brandListSelect.innerHTML += `<option>${data.category}</option> `;
    }

    // Add a new input field for a brand
    FormBtns[0].onclick = () => {
        inputBox.innerHTML += `
            <div>
                <i class="fa fa-trash del-btn float-end my-2 c_del-btn"></i>
                <input type="text" placeholder="Brand" class="form-control">
            </div>`

        // Delete input boxes 
        let delBtns = inputBox.querySelectorAll('.del-btn');
        for (let btn of delBtns) {
            btn.onclick = () => btn.parentElement.remove();
        }
    }

    // Handle form submission
    brandForm.onsubmit = (e) => {
        e.preventDefault();

        let allInputs = brandForm.querySelectorAll('input');
        if (categorySelect.value != "Choose Category") {
            for (let input of allInputs) {

                brandData.push({
                    category: categorySelect.value,
                    brand: input.value
                });
            }

            insertData('brandData', JSON.stringify(brandData));
            insertMsg();
            brandForm.reset('');
        }
        else {
            swal("Warning!", "Choose Category is Empty !", "warning");
        }
    }

    // Update the brand list UI based on selected category
    brandListSelect.onchange = () => {
        let id = 0;
        let filterData = [];

        if (brandListSelect.value != 'Choose Category') {
            for (let brand of brandData) {

                if (brand.category == brandListSelect.value) {
                    brand['id'] = id;
                    filterData.push(brand);
                }
                id++;
            }
            readBrandFunc(filterData);
        }
        else {
            swal("Warning!", "Field's are Empty !", "warning");
        }
    }
}

// Show the brand list based on the selected category
const readBrandFunc = (filterData) => {
    brandList = document.querySelector('.brand-list');
    let index = 0;
    brandList.innerHTML = '';
    for (let brand of filterData) {
        brandList.innerHTML += `
            <tr id="${brand.id}" index="${index}"> 
                <td>${index + 1}</td>
                <td>${brand.category}</td>
                <td>${brand.brand}</td>
                <td>
                    <button class="btn btn-sm btn-primary edit-btn me-2" aria-label="Edit Category">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-sm d-none btn-success save-btn me-2" aria-label="Edit Category">
                        <i class="fa fa-save"></i>
                    </button>
                    <button class="btn btn-sm btn-danger del-btn" aria-label="Delete Category">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
            `;
        index++;
    }

    // Delete brand coding code here 
    let delBtns = brandList.querySelectorAll('.del-btn');
    for (let btn of delBtns) {
        btn.onclick = () => {
            let tr = btn.parentElement.parentElement;
            let index = tr.getAttribute("index");
            let id = tr.getAttribute("id");

            brandData.splice(id, 1);
            editDelUpdFunc('brandData', JSON.stringify(brandData), dyLink, 'Deleted', filterData);
            filterData.splice(index, 1);
        }
    }

    // Delete brand coding code here 
    let allEditBtn = brandList.querySelectorAll('.edit-btn');
    for (let btn of allEditBtn) {

        btn.onclick = () => {
            let parent = btn.parentElement.parentElement;
            id = parent.getAttribute('id'),
                index = parent.getAttribute('index'),
                allTd = parent.querySelectorAll('td'),
                saveBtn = parent.querySelector('.save-btn');

            allTd[2].contentEditable = true;
            allTd[2].focus();

            btn.classList.add('d-none');
            saveBtn.classList.remove('d-none')
            saveBtn.onclick = () => {
                let category = allTd[1].innerHTML;
                let brand = allTd[2].innerHTML;
                saveBtn.classList.add('d-none');
                btn.classList.remove('d-none');

                brandData[id] = { category: category, brand: brand }
                filterData[index] = { category: category, brand: brand, id: id }

                editDelUpdFunc('brandData', JSON.stringify(brandData), dyLink, 'Brand Updated', filterData);
            }
        }
    }
}


// <------ Product Page Function's ------->

const createProductFunc = () => {
    categoryData = getAllData('categoryData');
    brandData = getAllData('brandData');
    productData = getAllData('productData');
    let productForm = document.querySelector('.product-form');
    let allSelect = productForm.querySelectorAll('select');
    let descripition = productForm.querySelector('textarea');
    let allInputs = productForm.querySelectorAll('input');
    let proCategoryList = document.querySelector('.produt_cat-select');
    let proBrandList = document.querySelector('.produt_brand-select');

    // Read brand for Select
    for (let category of categoryData) {
        allSelect[0].innerHTML += `<option ">${category.category}</option>`
        proCategoryList.innerHTML += `<option ">${category.category}</option>`
    }

    // Read create Product for Select
    allSelect[0].onchange = () => {
        allSelect[1].innerHTML = '<option value="Choose brand">Choose brand</option>';

        if (allSelect[0].value != "Choose category") {
            let filterData = brandData.filter((brand) => {
                return brand.category == allSelect[0].value;
            });

            for (let brand of filterData) {
                allSelect[1].innerHTML += `<option ">${brand.brand}</option>`
            }
        } else {
            swal("Warning!", "Field's are Empty !", "warning");
        }
    }

    // Read Product list for Select
    proCategoryList.onchange = () => {
        proBrandList.innerHTML = '<option value="Choose brand">Choose brand</option>';

        if (proCategoryList.value != "Choose category") {
            let filterData = brandData.filter((brand) => {
                return brand.category == proCategoryList.value;
            });

            for (let brand of filterData) {
                proBrandList.innerHTML += `<option ">${brand.brand}</option>`
            }
        } else {
            swal("Warning!", "Field's are Empty !", "warning");
        }
    }

    // Create file reading Function
    let fileReader = new FileReader();

    allInputs[3].onchange = () => {
        fileReader.onload = (e) => thumb = e.target.result;
        fileReader.readAsDataURL(allInputs[3].files[0]);
    }
    allInputs[4].onchange = () => {
        fileReader.onload = (e) => front = e.target.result;
        fileReader.readAsDataURL(allInputs[4].files[0]);
    }
    allInputs[5].onchange = () => {
        fileReader.onload = (e) => back = e.target.result;
        fileReader.readAsDataURL(allInputs[5].files[0]);
    }
    allInputs[6].onchange = () => {
        fileReader.onload = (e) => right = e.target.result;
        fileReader.readAsDataURL(allInputs[6].files[0]);
    }
    allInputs[7].onchange = () => {
        fileReader.onload = (e) => left = e.target.result;
        fileReader.readAsDataURL(allInputs[7].files[0]);
    }


    // Create Product Coding
    productForm.onsubmit = (e) => {
        e.preventDefault();
        if (allSelect[1].value != "Choose brand") {

            productData.push({
                category: allSelect[0].value,
                brand: allSelect[1].value,
                title: allInputs[0].value,
                desc: descripition.value,
                price: allInputs[1].value,
                quantity: allInputs[2].value,
                thumb: thumb != "" ? thumb : "../../Common/Imgs/Avtr.com.png",
                front: front != "" ? front : "../../Common/Imgs/Avtr.com.png",
                back: back != "" ? back : "../../Common/Imgs/Avtr.com.png",
                right: right != "" ? right : "../../Common/Imgs/Avtr.com.png",
                left: left != "" ? left : "../../Common/Imgs/Avtr.com.png",
            });

            insertData('productData', JSON.stringify(productData));
            insertMsg();
            console.log(productData);

        }
        else {
            swal("Select Brand!", "Please choose brand First !", "warning");
        }
    }

    // 
    proBrandList.onchange = function () {
        if (this.value != "Choose brand") {
            let id = 0;
            let filterProductData = [];

            for (let product of productData) {
                if (product.category == proCategoryList.value && product.brand == this.value) {

                    product['id'] = id;
                    filterProductData.push(product);
                }
                id++;
            }
            readProductFunc(filterProductData);
        }
        else {
            swal("Select Brand!", "Please choose brand First !", "warning");
        }
    }
}

// Show Product in Table or Ui

const readProductFunc = (filterProductData) => {
    let productForm = document.querySelector('.product-form');
    let submitUpdate = productForm.querySelectorAll('button');
    let allSelect = productForm.querySelectorAll('select');
    let descripition = productForm.querySelector('textarea');
    let allInputs = productForm.querySelectorAll('input');
    let ProductBrandList = document.querySelector('.Product_brand-list');
    let option = allSelect[1].querySelector('option')

    ProductBrandList.innerHTML = "";
    filterProductData.forEach((product, index) => {
        ProductBrandList.innerHTML += `
        <tr id="${product.id}"  index="${index}">
            <td class="text-nowrap text-center">${index + 1}</td>
            <td class="text-nowrap text-center">${product.category}</td>
            <td class="text-nowrap text-center">${product.brand}</td>
            <td class="text-nowrap text-center">${product.title}</td>
            <td class="text-nowrap text-center">${product.desc}</td>
            <td class="text-nowrap text-center">${product.price}</td>
            <td class="text-nowrap text-center">${product.quantity}</td>
            <td class="text-nowrap text-center"> <img src="${product.thumb}" width="37" alt="Avtar"></td>
            <td class="text-nowrap text-center"> <img src="${product.front}" width="37" alt="Avtar"></td>
            <td class="text-nowrap text-center"> <img src="${product.back}" width="37" alt="Avtar"></td>
            <td class="text-nowrap text-center"> <img src="${product.right}" width="37" alt="Avtar"></td>
            <td class="text-nowrap text-center"> <img src="${product.left}" width="37" alt="Avtar"></td>
            <td class="text-nowrap text-center">
                <button class=" edit-btn btn btn-sm btn-primary me-2" aria-label="Edit Category">
                    <i class="fa fa-edit"></i>
                </button>
                <button class=" del-btn btn btn-sm btn-danger" aria-label="Delete Category">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    });

    //Delete coding
    let delBtns = ProductBrandList.querySelectorAll('.del-btn');

    for (let btn of delBtns) {
        btn.onclick = function () {
            let parent = btn.parentElement.parentElement;
            let id = parent.getAttribute('id')
            let index = parent.getAttribute('index');
            productData.splice(id, 1)
            filterProductData.splice(index, 1);
            editDelUpdFunc('productData', JSON.stringify(productData), dyLink, 'Deleted', filterProductData);
        }
    }

    let editBtns = ProductBrandList.querySelectorAll('.edit-btn');
    for (let btn of editBtns) {
        btn.onclick = function () {
            let parent = btn.parentElement.parentElement;
            let id = parent.getAttribute('id');
            let index = parent.getAttribute('index');
            let allTd = parent.querySelectorAll('td');
            let imgs = parent.querySelectorAll('img');

            // Extract product details
            let category = allTd[1].innerHTML;
            let brand = allTd[2].innerHTML;
            let title = allTd[3].innerHTML;
            let description = allTd[4].innerHTML;
            let price = allTd[5].innerHTML;
            let quantity = allTd[6].innerHTML;

            // Assign image sources
            thumb = imgs[0].src;
            front = imgs[1].src;
            back = imgs[2].src;
            right = imgs[3].src;
            left = imgs[4].src;

            // Populate form fields with the selected product details
            allSelect[0].value = category;
            allSelect[0].disabled = true;
            allSelect[1].innerHTML = `<option value="${brand}">${brand}</option>`;
            allSelect[1].disabled = true;

            allInputs[0].value = title;
            descripition.value = description;
            allInputs[1].value = price;
            allInputs[2].value = quantity;

            submitUpdate[0].classList.add('d-none');
            submitUpdate[1].classList.remove('d-none');

            submitUpdate[1].onclick = async function () {
                productData[id] = {
                    category: allSelect[0].value,
                    brand: allSelect[1].value,
                    title: allInputs[0].value,
                    desc: descripition.value,
                    price: allInputs[1].value,
                    quantity: allInputs[2].value,
                    thumb: thumb != "" ? thumb : "../../Common/Imgs/Avtr.com.png",
                    front: front != "" ? front : "../../Common/Imgs/Avtr.com.png",
                    back: back != "" ? back : "../../Common/Imgs/Avtr.com.png",
                    right: right != "" ? right : "../../Common/Imgs/Avtr.com.png",
                    left: left != "" ? left : "../../Common/Imgs/Avtr.com.png",
                },
                    filterProductData[index] = {
                        category: allSelect[0].value,
                        brand: allSelect[1].value,
                        title: allInputs[0].value,
                        desc: descripition.value,
                        price: allInputs[1].value,
                        quantity: allInputs[2].value,
                        thumb: thumb != "" ? thumb : "../../Common/Imgs/Avtr.com.png",
                        front: front != "" ? front : "../../Common/Imgs/Avtr.com.png",
                        back: back != "" ? back : "../../Common/Imgs/Avtr.com.png",
                        right: right != "" ? right : "../../Common/Imgs/Avtr.com.png",
                        left: left != "" ? left : "../../Common/Imgs/Avtr.com.png",
                    }
                const isUpdated = await editDelUpdFunc('productData', JSON.stringify(productData), dyLink, "Data Updated", filterProductData)
                if (isUpdated) {
                    submitUpdate[0].classList.remove('d-none');
                    submitUpdate[1].classList.add('d-none');
                    productForm.reset('');
                }
            }
        };
    }
}

// <----------------------------------------------------------------------->

// Create Branding Function
const createBrandingFunc = () => {
    let brandingForm = document.querySelector('.branding-form');
    let allInputs = brandingForm.querySelectorAll('input');
    let textarea = brandingForm.querySelectorAll('textarea');
    let largeTextarea = brandingForm.querySelectorAll('.textarea');
    let allBtn = brandingForm.querySelectorAll('button');
    let EditBrandingBtn = document.querySelector('.edit-branding-btn');

    // Update character count for large text areas
    for (let textarea of largeTextarea) {
        textarea.oninput = () => {
            let parent = textarea.parentElement;
            let span = parent.querySelector('span')
            let length = textarea.value.length;
            span.innerHTML = length;
        }
    }

    // Handle file upload
    allInputs[1].onchange = () => {
        let fReader = new FileReader();
        fReader.onload = (e) => brandLogo = e.target.result;
        fReader.readAsDataURL(allInputs[1].files[0]);
    }

    // Collect branding details and Store
    brandingForm.onsubmit = (e) => {
        e.preventDefault();
        insertBranadingFunc();
        readBrandingFunc();
    }

    // Collect branding details for Reading
    const readBrandingFunc = () => {
        let branding = getAllData('allBrandingData');
        if (branding.length > 0) {
            EditBrandingBtn.classList.remove('d-none')
            allInputs[0].value = branding[0].brand_name;
            brandLogo.value = branding[0].brand_logo;
            allInputs[2].value = branding[0].brand_domain;
            allInputs[3].value = branding[0].brand_email;
            allInputs[4].value = branding[0].brand_facebook;
            allInputs[5].value = branding[0].brand_twitter;
            allInputs[6].value = branding[0].brand_watsapp;
            allInputs[7].value = branding[0].brand_instragram;
            allInputs[8].value = branding[0].brand_mobile;
            textarea[0].value = branding[0].brand_address;
            textarea[1].value = branding[0].brand_about;
            textarea[2].value = branding[0].brand_privacy;
            textarea[3].value = branding[0].brand_cookie;
            textarea[4].value = branding[0].brand_terms;

            for (let input of allInputs) {
                input.disabled = true;
            }
            for (let texta of textarea) {
                texta.disabled = true;
            }
            allBtn[0].classList.add('d-none');
            allBtn[1].classList.remove('d-none');

            EditBrandingBtn.onclick = () => {
                for (let input of allInputs) {
                    input.disabled = false;
                }
                for (let texta of textarea) {
                    texta.disabled = false;
                }

                allBtn[1].disabled = false;
            }
            allBtn[1].disabled = true;
        }
    }
    readBrandingFunc();

    const insertBranadingFunc = () => {
        let allBrandingData = [];
        allBrandingData.push({
            brand_name: allInputs[0].value,
            brand_logo: brandLogo,
            brand_domain: allInputs[2].value,
            brand_email: allInputs[3].value,
            brand_facebook: allInputs[4].value,
            brand_twitter: allInputs[5].value,
            brand_watsapp: allInputs[6].value,
            brand_instragram: allInputs[7].value,
            brand_mobile: allInputs[8].value,
            brand_address: textarea[0].value,
            brand_about: textarea[1].value,
            brand_privacy: textarea[2].value,
            brand_cookie: textarea[3].value,
            brand_terms: textarea[4].value,
        });

        // Push details to the array and save
        insertData('allBrandingData', JSON.stringify(allBrandingData))
        insertMsg();
    }
}
