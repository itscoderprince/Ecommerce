setTimeout(() => {
    dynamicNavabrFunc();
    createFooterFunc();
}, 400)

const brandingData = getAllData('allBrandingData');

// Define the dynamicNavabrFunc function
const dynamicNavabrFunc = () => {
    let categoryData = getAllData('categoryData');
    let dynamiclinkBox = document.querySelector('.navlinks-box');

    for (let category of categoryData) {
        dynamiclinkBox.innerHTML +=
            `<li class="nav-item">
                    <a href="#" class="nav-link fw-bold">${category.category}</a>
                </li>`;
    }

    dynamiclinkBox.innerHTML +=
        ` <div class="btn-group">
                <button class="btn">
                    <i class="fa fa-shopping-cart"></i>
                </button>
                <button class="btn">
                    <i class="fa fa-search"></i>
                </button>
                <div class="dropdown">
                    <button class="btn dropdown-toggle" data-bs-toggle="dropdown">
                        <i class="fa fa-user"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="http://127.0.0.1:5501/Pages/Signup.html" class="dropdown-item"> <i class="fa fa-user"></i> SignUp</a>
                        </li>
                        <li>
                            <a href="http://127.0.0.1:5501/Pages/Login.html" class="dropdown-item">
                                <i class="fa fa-sign-out"></i>
                                LogIn</a>
                        </li>
                    </ul>
                </div>
            </div>`;
};

const createFooterFunc = () => {
    let footerLinkBox = document.querySelector('.footer-link-box');
    let socialMediaBox = document.querySelector('#socicalmedia-box');
    let allATag = socialMediaBox.querySelectorAll('a');
    let venuBox = document.querySelector('.venu-box');
    let allPTag = venuBox.querySelectorAll('p');

    let categoryData = getAllData('categoryData');
    for (let category of categoryData) {
        footerLinkBox.innerHTML +=
            `<li>
                <a href="#" class="nav-link text-primary">${category.category}</a>
            </li>`;
    }

    // Social Media
    allATag[0].href = brandingData[0].brand_facebook;
    allATag[1].href = brandingData[0].brand_twitter;
    allATag[2].href = brandingData[0].brand_watsapp;
    allATag[3].href = brandingData[0].brand_instragram;

    // Social Media
    allPTag[0].innerHTML += brandingData[0].brand_address;
    allPTag[1].innerHTML += brandingData[0].brand_email;
    allPTag[2].innerHTML += brandingData[0].brand_mobile;
    allPTag[3].innerHTML += brandingData[0].brand_domain;
}

// Define the dynamicRequest function
const dynamicRequest = (el, pageReq) => {
    const ajax = new XMLHttpRequest();
    ajax.open('GET', pageReq, true);
    ajax.send();

    // Get response
    ajax.onload = () => {
        el.innerHTML = ajax.response;
    };
};
