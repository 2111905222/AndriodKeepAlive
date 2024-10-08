//**********************人脸*****************************

//查询全部人脸信息
function getFacedata() { //pageNum
    $.ajax({
        url: "/SearchAllFaces",//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            // console.log(data);
            if (data != null) {
                if (data.length == 0) {
                    img_face.style.display = "inline";
                    table_face.style.display = "none";
                }
                else {
                    img_face.style.display = "none";
                    table_face.style.display = "table";
                    data_face.length = 0;
                    for (var i = 0; i < data.length; i++) {
                        gen_data_face(table_face, data[i].face.firstname, data[i].face.lastname);
                    }
                }
            }
        }
    })
}



//上传文件(人脸)
function fileUpload_face() {
    var fileInput_face = document.getElementById('fileUpload-face');//命名不能重复
    var imgPreview = document.querySelector('#imgPreview');
    var formData_face = new FormData();

    fileInput_face.addEventListener('change', function () {
        // 清空显示区域
        // while (imgPreview.firstChild) {
        //     imgPreview.removeChild(imgPreview.firstChild);  //
        // }

        imgPreview.innerHTML = ""; //两种方式均可用

        var im_file = document.getElementById('image-file');

        var file = fileInput_face.files[0];

        // 通过文件类型判断是不是图片
        if (file.type.startsWith('image/')) {
            formData_face.append('imageFile', file);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'data:image/png,image/jpg,image/jpeg;base64,');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // 上传成功，将上传的图片显示在<img>标签中
                    var img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.width = 160;
                    img.height = 160;
                    imgPreview.appendChild(img);
                    im_file.value = file.name; //获取文件名
                    im_file.style.color = "black";
                } else {
                    alert('上传失败：' + xhr.statusText);
                }
            };
        }
        else {
            imgPreview.textContent = '不支持的文件类型';
        }
        xhr.send(formData_face);
    });
}

function fileUpload_facebj() {
    var fileInput_face = document.getElementById('fileUpload-face-bj');//命名不能重复
    var imgPreview = document.querySelector('#imgPreview-bj');
    var formData_face = new FormData();

    fileInput_face.addEventListener('change', function () {
        // 清空显示区域
        // while (imgPreview.firstChild) {
        //     imgPreview.removeChild(imgPreview.firstChild);  //
        // }

        imgPreview.innerHTML = ""; //两种方式均可用

        var im_file = document.getElementById('image-file-bj');

        var file = fileInput_face.files[0];
        // 通过文件类型判断是不是图片
        if (file.type.startsWith('image/')) {
            formData_face.append('imageFile', file);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'data:image/png,image/jpg,image/jpeg;base64,');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // 上传成功，将上传的图片显示在<img>标签中
                    var img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.width = 160;
                    img.height = 160;
                    imgPreview.appendChild(img);
                    im_file.value = file.name; //获取文件名
                    im_file.style.color = "black";
                } else {
                    alert('上传失败：' + xhr.statusText);
                }
            };
        }
        else {
            imgPreview.textContent = '不支持的文件类型';
        }
        xhr.send(formData_face);
    });
}


//添加遮挡层,必须用这种函数才成功
function addCover(parent) {
    var cover = parent.querySelector('.cover'); //必须为var
    if (!cover) {
        cover = document.createElement("div");
        cover.classList.add("cover");
        parent.appendChild(cover);
        cover.style.display = "block";
    }
}

//删除遮挡层
function removeCover(parent) {
    var cover = parent.querySelector('.cover'); //必须为const
    if (cover) {
        cover.remove();
    }
}

function addface() {
    var parent = document.getElementById("content");
    // 获取侧边栏元素
    var sidebar_face = document.getElementById("pullsidebar-face");
    // 显示侧边栏
    sidebar_face.style.display = "block";
    // 添加遮挡层
    addCover(parent);
}

//***获取添加数据按钮
function addDataBtn_face() {
    var addDataBtn_face = document.getElementById("add-data-btn-face");

    // 添加事件监听器，当按钮被单击时显示侧边栏
    addDataBtn_face.removeEventListener("click", addface());
    addDataBtn_face.addEventListener("click", addface());
}

//重置选择文件按钮
function resetInput(fileInput) {
    fileInput.value = '';
    fileInput.form.reset();
}




//保存和取消时关闭侧边栏
function removefaceview() {
    // 获取侧边栏和上传表单元素
    var sidebar_face = document.getElementById("pullsidebar-face");
    var parent = document.getElementById("content");

    // 关闭侧边栏
    sidebar_face.style.display = 'none';
    //删除遮挡
    removeCover(parent);
    // // 清空显示区域
    var imgPreview = document.querySelector('#imgPreview');
    imgPreview.innerHTML = "";
    var fileInput = document.getElementById('fileUpload-face');
    resetInput(fileInput);
}


function save_button_face() {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    var saveButton = document.getElementById('save-button-face');
    var not_save = addtrface(event);

    if (!not_save) {
        saveButton.removeEventListener('click', removefaceview()); //监听前要先删除原先的
        saveButton.addEventListener('click', removefaceview());
    }
    else {
        // var fileInput = document.getElementById("name");
        var firstInput = document.getElementById("first-name");
        var lastInput = document.getElementById("last-name");
        var imgInput = document.getElementById("image-file");
        var manInput = document.getElementById("man");
        var womanInput = document.getElementById("woman");
        var chooseSex = document.getElementById("choose_sex");
        var chooseFile = document.getElementById("choose_file");
        var uploadFile = document.getElementById("fileUpload-face");
        // if (fileInput.value == "") {
        //     fileInput.value = "必须输入姓名"
        //     fileInput.style.color = "red";
        // }
        if (firstInput.value == "") {
            firstInput.value = "必须输入姓"
            firstInput.style.color = "red";
        }
        else if (lastInput.value == "") {
            lastInput.value = "必须输入名"
            lastInput.style.color = "red";
        }
        else if ((manInput.checked == false) && (womanInput.checked == false)) {
            chooseSex.style.display = 'inline';
        }
        else if ((imgInput.value == "") || (imgInput.value.indexOf("jpg") === -1) && (imgInput.value.indexOf("png") === -1) && (imgInput.value.indexOf("jpeg") === -1)) {
            // imgInput.value = "必须上传图片文件"
            // imgInput.style.color = "red";
            chooseFile.style.display = 'inline';
        }
        else {
            firstInput.value = "已有该姓名,请重新输入"
            lastInput.value = ""
            firstInput.style.color = "red";
        }


        // fileInput.addEventListener('click', () => {
        //     fileInput.value = "";
        //     fileInput.style.color = "black";
        // });
        firstInput.addEventListener('click', () => {
            firstInput.value = "";
            firstInput.style.color = "black";
        });
        lastInput.addEventListener('click', () => {
            lastInput.value = "";
            lastInput.style.color = "black";
        });

        manInput.addEventListener('click', () => {
            chooseSex.style.display = 'none';
        });

        womanInput.addEventListener('click', () => {
            chooseSex.style.display = 'none';
        });

        uploadFile.addEventListener('click', () => {
            chooseFile.style.display = 'none';
        });
    }

}

function cancel_button_face() {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    var cancelButton = document.getElementById('cancel-button-face');

    cancelButton.removeEventListener('click', removefaceview()); //监听前要先删除原先的
    cancelButton.addEventListener('click', removefaceview());
}

//////////////////添加表格数据

//自动添加表格行
function addtrface(event) {
    var fileUploadForm = document.getElementById("file-upload-form-face");
    // 阻止表单默认提交行为
    event.preventDefault();

    // 获取文件输入框
    // var fileInput = document.getElementById("name"); //原始输入姓名的
    var firstInput = document.getElementById("first-name");
    var lastInput = document.getElementById("last-name");
    var imgInput = document.getElementById("image-file").value;
    var manInput = document.getElementById("man");
    var womanInput = document.getElementById("woman");

    // if (manInput.checked == true)
    //     console.log("男");
    // else if (womanInput.checked == true)
    //     console.log("女");

    // // 获取表格元素
    var table = document.getElementById("data-table-face");

    var have_name = false;

    for (var i = 0; i < data_face.length; i++) {
        // console.log(i);
        if (data_face[i].children[1].innerText == firstInput.value + lastInput.value) {
            have_name = true;
        }
    }

    //原始输入姓名的
    // if ((fileInput.value == "") || (fileInput.value == "必须输入姓名") || (imgInput.value == "") || (imgInput.value == "必须上传图片文件")) {
    //     return 1;
    // }
    if (have_name || (firstInput.value == "") || (firstInput.value == "必须输入姓") || (firstInput.value == "已有该姓名,请重新输入") || (lastInput.value == "") || (lastInput.value == "必须输入名") || (imgInput == "") || ((manInput.checked == false) && (womanInput.checked == false)) || (imgInput == "必须选择图片文件") || ((imgInput.indexOf("jpg") === -1) && (imgInput.indexOf("png") === -1) && (imgInput.indexOf("jpeg") === -1))) {
        return 1;
    }
    else {
        gen_data_face(table, firstInput.value, lastInput.value);
        return 0;
    }

}

//// 原始输入姓名的
// function gen_data_face(table, fileInput) {
//     // 创建新的数据行
//     // 创建新的一行
//     var row = table.insertRow(-1);
//     // var newRow = document.createElement("tr");

//     // 创建新的数据单元格，并设置其内容为文件名
//     // 获取表格中最后一行的序号，如果表格中没有行，则从 1 开始
//     var lastRowIndex = table.rows.length - 2;
//     var lastRowNumber = lastRowIndex >= 1 ? parseInt(table.rows[lastRowIndex].cells[0].innerText) : 0;
//     // console.log(lastRowIndex) //控制端显示

//     // 设置新行的序号
//     var cell0 = row.insertCell(0);
//     var RowNumber = lastRowNumber + 1;
//     cell0.innerText = RowNumber;

//     // 设置新行的其他单元格
//     var cell1 = row.insertCell(1);
//     cell1.innerText = fileInput.value;
//     var cell2 = row.insertCell(2);
//     var link1 = document.createElement("a");
//     link1.href = "#";
//     link1.textContent = "编辑";
//     cell2.appendChild(link1);
//     var link2 = document.createElement("a");
//     link2.href = "#";
//     link2.textContent = "删除";
//     link2.className = "delete-face-link";
//     link2.onclick = del_face();
//     cell2.appendChild(link2);

//     table.querySelector("tbody").appendChild(row);
//     // 将 tr 数据加入到 data 数组中
//     data_face.push(row);
//     console.log(data_face)

//     // 更新总行数和总页数
//     // totalRows_face = table.rows.length; //算上的th行
//     totalRows_face = data_face.length;
//     totalPages_face = Math.ceil(totalRows_face / rowsPerPage_face);

//     // 计算新行所处的页码
//     var newRowIndex_face = totalRows_face - 1;
//     var newPage_face = Math.ceil((newRowIndex_face + 1) / rowsPerPage_face);
//     currentPage_face = newPage_face;

//     // console.log(table.rows.length, totalRows_face % rowsPerPage_face, totalRows_face, currentPage_face, totalPages_face)

//     // 如果当前页满了，就换页
//     if (totalRows_face % rowsPerPage_face == 1 && currentPage_face != 1) {
//         // showPage(currentPage_face - 1);
//         displayTable_face();
//         updatePageNumber_face();
//     }
// }

function gen_data_face(table, fileInput0, fileInput1) {
    // 创建新的数据行
    // 创建新的一行
    var row = table.insertRow(-1);
    // var newRow = document.createElement("tr");

    // 创建新的数据单元格，并设置其内容为文件名
    // 获取表格中最后一行的序号，如果表格中没有行，则从 1 开始
    var lastRowIndex = table.rows.length - 2;
    var lastRowNumber = lastRowIndex >= 1 ? parseInt(table.rows[lastRowIndex].cells[0].innerText) : 0;
    // console.log(lastRowIndex) //控制端显示

    // 设置新行的序号
    var cell0 = row.insertCell(0);
    var RowNumber = lastRowNumber + 1;
    cell0.innerText = RowNumber;//序号

    // 设置新行的其他单元格
    var cell1 = row.insertCell(1);
    // cell1.innerText = fileInput0.value + fileInput1.value;
    cell1.innerText = fileInput0 + fileInput1;
    var cell2 = row.insertCell(2);
    var link1 = document.createElement("a");
    link1.href = "#";
    link1.textContent = "编辑";
    link1.className = "write-face-link";
    link1.onclick = write_face();
    cell2.appendChild(link1);
    var link2 = document.createElement("a");
    link2.href = "#";
    link2.textContent = "删除";
    link2.className = "delete-face-link";
    link2.onclick = del_face();
    cell2.appendChild(link2);

    table.querySelector("tbody").appendChild(row);
    // 将 tr 数据加入到 data 数组中
    data_face.push(row);
    // console.log(data_face)

    // 更新总行数和总页数
    // totalRows_face = table.rows.length; //算上的th行
    totalRows_face = data_face.length;
    totalPages_face = Math.ceil(totalRows_face / rowsPerPage_face);

    // 计算新行所处的页码
    var newRowIndex_face = totalRows_face - 1;
    var newPage_face = Math.ceil((newRowIndex_face + 1) / rowsPerPage_face);
    currentPage_face = newPage_face;

    // console.log(table.rows.length, totalRows_face % rowsPerPage_face, totalRows_face, currentPage_face, totalPages_face)

    // 如果当前页满了，就换页
    if (totalRows_face % rowsPerPage_face == 1 && currentPage_face != 1) {
        // showPage(currentPage_face - 1);
        updatePageNumber_face();
    }
    displayTable_face();
}

// 显示表格
function displayTable_face() {
    if (data_face.length > 0) {
        // 如果数据长度为空，则显示图片
        // 否则不显示img，以便表格数据显示
        img_face.style.display = "none";
        table_face.style.display = "table";
    }
    else {
        img_face.style.display = "inline";
        table_face.style.display = "none";
    }
    // 清空表格
    table_face.querySelector("tbody").innerHTML = "";

    // 计算当前页的数据
    var startIndex_face = (currentPage_face - 1) * rowsPerPage_face;
    var endIndex_face = Math.min(startIndex_face + rowsPerPage_face, data_face.length);
    var pageData_face = data_face.slice(startIndex_face, endIndex_face);

    // console.log(pageData);

    // 生成表格数据
    pageData_face.forEach(row => {
        // const row = document.createElement("tr");
        // rowData.forEach(cellData => {
        //     const cell = document.createElement("td");
        //     cell.textContent = cellData;
        //     row.appendChild(cell);
        // });
        table_face.querySelector("tbody").appendChild(row);
    });

    var tableBody = document.getElementById("tbody-face");


    var rows = tableBody.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        // console.log(i);
        rows[i].children[0].innerText = (currentPage_face - 1) * rowsPerPage_face + i + 1;
    }

    if (totalPages_face > 1) {
        var pagination = document.getElementById("pagination-face");
        pagination.style.display = "flex";
    }
}

// 更新页码函数
function updatePageNumber_face() {
    // 找到页码元素
    var pageNumberElement_face = document.getElementById("page-number-face");

    if (currentPage_face > totalPages_face) currentPage_face = totalPages_face;

    // 更新页码文本
    pageNumberElement_face.innerHTML = `${currentPage_face}/${totalPages_face}`;

    // 找到上一页和下一页元素
    var prevPageLink_face = document.getElementById("prev-page-face");
    var nextPageLink_face = document.getElementById("next-page-face");

    // 根据当前页码是否是第一页或最后一页来禁用或启用上一页和下一页链接
    if (currentPage_face == 1) {
        prevPageLink_face.classList.add("disabled");
    } else {
        prevPageLink_face.classList.remove("disabled");
    }

    if (currentPage_face == totalPages_face) {
        nextPageLink_face.classList.add("disabled");
    } else {
        nextPageLink_face.classList.remove("disabled");
    }

    //当页数只剩1页时,则不显示上下页和跳转,并回到第一页显示
    if ((totalPages_face == 1) || (totalPages_face == 0)) {
        currentPage_face = 1;
        displayTable_face();
        var pagination = document.getElementById("pagination-face");
        pagination.style.display = "none";
    }
}

// 首页显示
function show_first_face() {
    currentPage_face = 1;
    updatePageNumber_face();
    displayTable_face();
}

// 上一页函数
function prevPage_face() {
    if (currentPage_face > 1) {
        // showPage(currentPage_face - 1);
        currentPage_face--;
        displayTable_face();
        updatePageNumber_face();
        console.log("pre")
    }
}

// 下一页函数
function nextPage_face() {
    if (currentPage_face < totalPages_face) {
        // showPage(currentPage_face + 1);
        currentPage_face++;
        displayTable_face();
        updatePageNumber_face();
    }
}

function gotoPage_face() {
    // 找到输入框和确定按钮元素
    var inputBox_face = document.getElementById("page-input-face");
    var button_face = document.getElementById("goto-button-face");

    // 获取输入的页码
    var pageNumber_face = parseInt(inputBox_face.value);

    // 如果输入的页码合法，则跳转到指定页
    if (pageNumber_face >= 1 && pageNumber_face <= totalPages_face) {
        // showPage(pageNumber);
        currentPage_face = pageNumber_face;
        displayTable_face();
        updatePageNumber_face();
    }

    // 清空输入框
    inputBox_face.value = "";
}

// 找到上一页、下一页和跳转按钮元素，并添加点击事件处理函数,window.onload智能绑定一次,后面会将前面覆盖,故都定义在ad.js中
// window.onload = function () {
//     var prevPageLink_face = document.getElementById("prev-page-face");
//     var nextPageLink_face = document.getElementById("next-page-face");
//     var gotoButton_face = document.getElementById("goto-button-face");

//     prevPageLink_face.addEventListener("click", prevPage_face());
//     nextPageLink_face.addEventListener("click", nextPage_face());
//     gotoButton_face.addEventListener("click", gotoPage_face());
// }

// function fileUploadForm() {
//     // 获取上传文件表单
//     var fileUploadForm = document.getElementById("file-upload-form-face");

//     // 添加事件监听器，当上传表单提交时添加数据行
//     fileUploadForm.removeEventListener("submit", addtr(event));
//     fileUploadForm.addEventListener("submit", addtr(event));
// }

//查询全部人脸信息并删除
function delFacedatabyName(url, index) { //pageNum
    $.ajax({
        url: url,//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            console.log("bf:" + data_face.length)
            if (data != null && data.length > 0) {
                //删除data中相应行
                data_face.splice(index - 1, 1);
                //更新总页码
                totalRows_face = data_face.length;
                totalPages_face = Math.ceil(totalRows_face / rowsPerPage_face);

                //计算删除行当前页码
                currentPage_face = Math.ceil(index / rowsPerPage_face);
                // 更新显示
                updatePageNumber_face();
                displayTable_face();
                console.log("af:" + data_face.length)

            }
        }
    })
}


//删除该行人脸
function del_face() {
    // 获取所有删除链接，并添加点击事件
    var tableBody = document.getElementById("tbody-face");
    var confirmDialog = document.getElementById("confirm-box-face");
    var confirmBtn = document.getElementById("confirmBtn-face");
    var cancelBtn = document.getElementById("cancelBtn-face");

    tableBody.onclick = function (event) {
        var target = event.target;
        var parent = document.getElementById("content");
        if (target.classList.contains("delete-face-link")) {
            event.stopImmediatePropagation();
            confirmDialog.style.display = "block";
            addCover(parent);

            confirmBtn.onclick = function () {
                var row = target.parentNode.parentNode;
                var index = row.children[0].innerText;
                var name = data_face[index - 1].children[1].textContent;
                var url = 'DelFaceByName?name=' + name;
                tableBody.removeChild(row);

                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);

                delFacedatabyName(url, index);

            };

            cancelBtn.onclick = function () {
                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);
            };
        }
    };
}

//查询全部人脸信息并显示在编辑
function getFacedatabyName(url) { //pageNum
    $.ajax({
        url: url,//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            console.log("data:" + data)
            console.log("data.length:" + data.length)
            if (data != null) {
                var firstname = document.getElementById('first-name-bj');
                var lastname = document.getElementById('last-name-bj');
                var manInput = document.getElementById("man-bj");
                var womanInput = document.getElementById("woman-bj");
                var imgInput = document.getElementById("imgPreview-bj");
                var im_file = document.getElementById('image-file-bj');
                var oldname = document.getElementById('old-name-bj');
                firstname.value = data.firstname;
                lastname.value = data.lastname;
                oldname.value = firstname.value + lastname.value;
                console.log("firstname.value:" + firstname.value)
                console.log("lastname.value:" + lastname.value)
                console.log("sex:" + data.sex)
                if (data.sex == "男") manInput.checked = true;
                else if (data.sex == "女") womanInput.checked = true;

                var img = document.createElement('img');
                img.src = data.url;
                img.width = 160;
                img.height = 160;
                imgInput.appendChild(img);
                im_file.value = data.url;

            }
        }
    })
}

//编辑按钮打开侧边栏
function write_face() {
    var tableBody = document.getElementById("tbody-face");
    var saveButton = document.getElementById('save-button-face-bj');
    var cancelButton = document.getElementById('cancel-button-face-bj');


    tableBody.addEventListener('click', function (event) {
        var target = event.target;
        var parent = document.getElementById("content");

        // 获取侧边栏元素
        var sidebar_face = document.getElementById("pullsidebar-face-bj");

        if (target.classList.contains("write-face-link")) {
            event.stopImmediatePropagation(); //彻底取消该事件，不再触发后面所有click的监听函数

            // 显示侧边栏
            sidebar_face.style.display = "block";
            addCover(parent);
            // addface();

            var row = target.parentNode.parentNode;
            var index = row.children[0].innerText;
            var name = data_face[index - 1].children[1].textContent;
            var url = 'SearchFaceByName?name=' + name;
            getFacedatabyName(url);

            // saveButton.addEventListener("click", save_button_facebj());
            // 这里的save_button_facebj()是一个立即调用函数，会立即执行该函数并将其返回值作为参数传递给addEventListener()方法，因此会报错
            //            saveButton.onclick = function () {
            //                save_button_facebj(index);
            //            };

            cancelButton.onclick = function () {
                sidebar_face.style.display = "none";
                removeCover(parent);
                removefaceviewbj();
            };

        }
    }, true);

}

//**********************编辑对应的侧边栏
//保存和取消时关闭侧边栏
function removefaceviewbj() {
    // 获取侧边栏和上传表单元素
    var sidebar_face = document.getElementById("pullsidebar-face-bj");
    var parent = document.getElementById("content");

    // 关闭侧边栏
    sidebar_face.style.display = 'none';
    //删除遮挡
    removeCover(parent);
    // // 清空显示区域
    var imgPreview = document.querySelector('#imgPreview-bj');
    imgPreview.innerHTML = "";
    var fileInput = document.getElementById('fileUpload-face-bj');
    resetInput(fileInput);
}

function addtrfacebj(index) {
    var fileUploadForm = document.getElementById("file-upload-form-face-bj");
    // 阻止表单默认提交行为
    event.preventDefault();

    // 获取文件输入框
    // var fileInput = document.getElementById("name"); //原始输入姓名的
    var firstInput = document.getElementById("first-name-bj");
    var lastInput = document.getElementById("last-name-bj");
    var imgInput = document.getElementById("image-file-bj");
    var manInput = document.getElementById("man-bj");
    var womanInput = document.getElementById("woman-bj");

    // if (manInput.checked == true)
    //     console.log("男");
    // else if (womanInput.checked == true)
    //     console.log("女");

    // // 获取表格元素
    var have_name = false;

    for (var i = 0; i < data_face.length; i++) {
        // console.log(i);
        if (data_face[i].children[1].innerText == firstInput.value + lastInput.value) {
            have_name = true;
        }
    }

    //原始输入姓名的
    // if ((fileInput.value == "") || (fileInput.value == "必须输入姓名") || (imgInput.value == "") || (imgInput.value == "必须上传图片文件")) {
    //     return 1;
    // }
    if (have_name || (firstInput.value == "") || (firstInput.value == "必须输入姓") || (lastInput.value == "") || (lastInput.value == "必须输入名") || (imgInput.value == "") || ((manInput.checked == false) && (womanInput.checked == false)) || (imgInput.value == "必须选择图片文件") || (imgInput.value.indexOf("jpg") === -1) && (imgInput.value.indexOf("png") === -1) && (imgInput.value.indexOf("jpeg") === -1)) {
        return 1;
    }
    else {
        change_data_facebj(firstInput, lastInput, index);
        return 0;
    }

}

function change_data_facebj(fileInput0, fileInput1, index) {
    // 创建新的数据行
    // 仅修改了姓名部分
    data_face[index - 1].children[1].innerText = fileInput0.value + fileInput1.value;
    // var row = data_face[index-1];
    // console.log(row);

    displayTable_face();//更新显示
}


function save_button_facebj(index) {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    var saveButton = document.getElementById('save-button-face-bj');
    var not_save = addtrfacebj(index);
    console.log(index);

    if (!not_save) {
        saveButton.removeEventListener('click', removefaceviewbj()); //监听前要先删除原先的
        saveButton.addEventListener('click', removefaceviewbj());
    }
    else {
        // var fileInput = document.getElementById("name");
        var firstInput = document.getElementById("first-name-bj");
        var lastInput = document.getElementById("last-name-bj");
        var imgInput = document.getElementById("image-file-bj");
        var manInput = document.getElementById("man-bj");
        var womanInput = document.getElementById("woman-bj");
        var chooseSex = document.getElementById("choose_sex-bj");
        var chooseFile = document.getElementById("choose_file-bj");
        var uploadFile = document.getElementById("fileUpload-face-bj");
        // if (fileInput.value == "") {
        //     fileInput.value = "必须输入姓名"
        //     fileInput.style.color = "red";
        // }
        if (firstInput.value == "") {
            firstInput.value = "必须输入姓"
            firstInput.style.color = "red";
        }
        else if (lastInput.value == "") {
            lastInput.value = "必须输入名"
            lastInput.style.color = "red";
        }
        else if ((manInput.checked == false) && (womanInput.checked == false)) {
            chooseSex.style.display = 'inline';
        }
        else if ((imgInput.value == "") || (imgInput.value.indexOf("jpg") === -1) && (imgInput.value.indexOf("png") === -1) && (imgInput.value.indexOf("jpeg") === -1)) {
            // imgInput.value = "必须上传图片文件"
            // imgInput.style.color = "red";
            chooseFile.style.display = 'inline';
        }
        else {
            firstInput.value = "已有该姓名,请重新输入"
            lastInput.value = ""
            firstInput.style.color = "red";
        }


        // fileInput.addEventListener('click', () => {
        //     fileInput.value = "";
        //     fileInput.style.color = "black";
        // });
        firstInput.addEventListener('click', () => {
            firstInput.value = "";
            firstInput.style.color = "black";
        });
        lastInput.addEventListener('click', () => {
            lastInput.value = "";
            lastInput.style.color = "black";
        });

        manInput.addEventListener('click', () => {
            chooseSex.style.display = 'none';
        });

        womanInput.addEventListener('click', () => {
            chooseSex.style.display = 'none';
        });

        uploadFile.addEventListener('click', () => {
            chooseFile.style.display = 'none';
        });
    }

}

function cancel_button_facebj() {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    var cancelButton = document.getElementById('cancel-button-face-bj');

    cancelButton.removeEventListener('click', removefaceviewbj()); //监听前要先删除原先的
    cancelButton.addEventListener('click', removefaceviewbj());
}


// // 显示指定页码的函数
// function showPage(pageNumber) {
//     // 隐藏所有行
//     for (let i = 1; i < table_face.rows.length; i++) {
//         table_face.rows[i].style.display = "none";
//     }

//     // 显示指定页的行
//     const startIndex = (pageNumber - 1) * rowsPerPage_face + 1;
//     const endIndex = Math.min(startIndex + rowsPerPage_face - 1, totalRows_face);

//     for (let i = startIndex; i <= endIndex; i++) {
//         table_face.rows[i].style.display = "table";
//     }

//     // 更新当前页码
//     currentPage_face = pageNumber;
//     console.log("show:", currentPage_face)

//     // 更新页码
//     updatePageNumber();
// }