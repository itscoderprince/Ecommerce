window.onload = () => {
    dynamicReqFunc();
};

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
    let page = document.querySelector(".page");
    let ajax = new XMLHttpRequest();
    ajax.open("GET", link, true);
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
            }, 600);

            menuTogglerFunc();
            if (link == 'Dynamic/Category.html') {
                createCategoryFunc();
            }
            else if (link == 'Dynamic/Brand_design.html') {
                createBrandFunc();
            }
        }, 300);
    }

}

// Create Category Function
const createCategoryFunc = () => {
    let categoryData = [];
    if (localStorage.getItem('categoryData') != null) {
        categoryData = JSON.parse(localStorage.getItem('categoryData'))
    }
    let categoryList = document.querySelector('.category-list')
    let categoryForm = document.querySelector('.category-form');
    let inputBox = document.querySelector('.input-box');
    let addFieldBtn = document.querySelector('.add-field-btn');

    addFieldBtn.onclick = () => {
        inputBox.innerHTML +=
            `
            <div>
                <i class="fa fa-trash c_del-btn float-end"></i>
                <input type="text" required placeholder="Category" class="form-control mb-3">
            </div>
        `;

        // Delete coding here                    
        let allDelBtn = document.querySelectorAll('.del-btn');
        for (let btn of allDelBtn) {
            btn.onclick = function () {
                this.parentElement.remove();
            }
        }
    }

    categoryForm.onsubmit = (e) => {
        e.preventDefault();

        let inputs = categoryForm.querySelectorAll('input');
        for (let input of inputs) {
            categoryData.push({
                category: input.value
            });
        }
        localStorage.setItem('categoryData', JSON.stringify(categoryData));
        readCategoryData();
        categoryForm.reset('');
    }

    const readCategoryData = () => {
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

        for (let btn of delBtn) {
            btn.onclick = () => {
                let parent = btn.parentElement.parentElement;
                let index = parent.getAttribute('index');

                categoryData.splice(index, 1);
                localStorage.setItem('categoryData', JSON.stringify(categoryData))
                readCategoryData();
            }
        }
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
                    localStorage.setItem('categoryData', JSON.stringify(categoryData))
                    readCategoryData();
                }
            }
        }
    }
    readCategoryData();
}

// brand link code here
const createBrandFunc = () => {
    let categoryData = [];
    if (localStorage.getItem('categoryData') != null) {
        categoryData = JSON.parse(localStorage.getItem('categoryData'))
    }

    let brandForm = document.querySelector('.brand-form'),
        brandSelect = brandForm.querySelector('select'),
        brandListSelect = document.querySelector('.brand-list-select')

    for (let data of categoryData) {
        brandSelect.innerHTML += `
        <option>${data.category}</option> `;
    }
    for (let data of categoryData) {
        brandListSelect.innerHTML += `
        <option>${data.category}</option> `;
    }
}