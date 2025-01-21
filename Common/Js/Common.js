const insertData = (table_name, data) => localStorage.setItem(table_name, data)
const insertMsg = () => swal("Data Inserted!", "Good job!", "success");

const getAllData = (table_name) => {
    if (localStorage.getItem(table_name) != null) {
        let data = JSON.parse(localStorage.getItem(table_name));
        return data;
    }
    else {
        return [];
    }
}

const editDelUpdFunc = (table_name, data, link, msg, filterData) => {
    return new Promise((resolve, reject) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    insertData(table_name, data);
                    if (link == 'Dynamic/Category.html') {
                        readCategoryData();
                    }
                    else if (link == 'Dynamic/Brand_design.html') {
                        readBrandFunc(filterData);
                    }
                    else if (link == 'Dynamic/Product_design.html') {
                        readProductFunc(filterData);
                        resolve(true);
                    }
                    swal("Poof! Your imaginary file has been " + msg + "!", {
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    });
}