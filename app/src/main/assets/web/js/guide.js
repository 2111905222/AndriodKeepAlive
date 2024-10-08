//**********************导览*****************************
//查询全部导览路线信息
function getGuidedata() { //pageNum
    $.ajax({
        url: "/SearchAllGuide",//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            // console.log(data);
            if (data != null) {
                if (data.length == 0) {
                    img_guide.style.display = "inline";
                    table_guide.style.display = "none";
                }
                else {
                    img_guide.style.display = "none";
                    table_guide.style.display = "table";
                    data_guide.length = 0;
                    for (var i = 0; i < data.length; i++) {
                        gen_data_guide(table_guide, data[i].guide.guideName);
                    }
                }
            }
        }
    })
}

function getGuidedata1() {
    var table = document.getElementById("data-table-guide");
    data_guide.length = 0;
    gen_data_guide(table, '1');
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
    const cover = parent.querySelector('.cover'); //必须为const
    if (cover) {
        cover.remove();
    }
}

// function addguide() {
//     var parent = document.getElementById("content");
//     // 获取侧边栏元素
//     var sidebar_guide = document.getElementById("pullsidebar-guide");
//     // 显示侧边栏
//     sidebar_guide.style.display = 'block';
//     // 添加遮挡层
//     addCover(parent);
// }

// //***获取添加数据按钮
// function addDataBtn_guide() {
//     var addDataBtn_guide = document.getElementById("add-data-btn-guide");

//     // 添加事件监听器，当按钮被单击时显示侧边栏
//     addDataBtn_guide.removeEventListener("click", addguide());
//     addDataBtn_guide.addEventListener("click", addguide());
// }

function addguide() {
    var parent = document.getElementById("content");
    // 获取侧边栏元素
    var addbox = document.getElementById("add-box-guide");
    // 显示侧边栏
    addbox.style.display = 'block';
    // 添加遮挡层
    addCover(parent);
}

//***获取添加数据按钮
function addDataBtn_guide() {
    var addDataBtn_guide = document.getElementById("add-data-btn-guide");

    // 添加事件监听器，当按钮被单击时显示侧边栏
    addDataBtn_guide.removeEventListener("click", addguide());
    addDataBtn_guide.addEventListener("click", addguide());
}

function cancel_button_guideadd(input) {
    var addbox = document.getElementById('add-box-guide');
    var parent = document.getElementById("content");
    addbox.style.display = "none";
    //删除遮挡
    removeCover(parent);
}

//重置选择文件按钮
function resetInput(fileInput) {
    fileInput.value = '';
    fileInput.form.reset();
}

function li3active() {
    // 获取 URL 查询字符串中的 id 参数
    // var id = new URLSearchParams(window.location.search).get("id");
    var params = new URLSearchParams(window.location.search);
    var id1 = params.get("id1");
    var id3 = params.get("id3");
    // 根据 id 设置相应的 li 项为 active 状态
    var li1 = document.getElementById(id1);
    if (li1) {
        li1.classList.remove("active");
        document.getElementById('item-face').classList.remove("show");
    }
    var li3 = document.getElementById(id3);
    if (li3) {
        li3.classList.add("active");
        document.getElementById('item-guide').classList.add("show");
    }

    // currentPage_guide = 1;
    // updatePageNumber_guide();
    // displayTable_guide(data_guide);

    // var data_guide = JSON.parse(localStorage.getItem("data_guide"));
    // var fileInput = JSON.parse(localStorage.getItem("fileInput"));
    // console.log(fileInput);
    // console.log(data_guide.length);
    // if (fileInput) {
    //     gen_data_guide(fileInput, data_guide);
    //     localStorage.removeItem("fileInput");//清除命名数据
    //     // localStorage.clear();//清空全部本地存储
    // }
};

//保存和取消时关闭内页
function removeguideview() {
    // window.location.href = "/home/gs/GS/project/h5/robot_backend/backend.html";
    // goToTargetPage();
    // location.href = "./backend.html?id1=face-li&id3=guide-li";
    location.href = "./guide.html";

}


//内页底部的确认和取消按钮
function save_button_guide(button) {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    const saveButton = document.getElementById('confirmBtn-guide');
    var not_save = addtrguide(event);

    if (!not_save) {
        saveButton.removeEventListener('click', removeguideview()); //监听前要先删除原先的
        saveButton.addEventListener('click', removeguideview());
    }
    else {
        var fileInput = document.getElementById("guidein-name");

        if (fileInput.value == "") {
            fileInput.value = "必须输入导览路线名称"
            fileInput.style.color = "red";
        }

        fileInput.addEventListener('click', () => {
            fileInput.value = "";
            fileInput.style.color = "black";
        });

    }

}

function cancel_button_guide(button) {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    const cancelButton = document.getElementById('cancelBtn-guide');

    cancelButton.removeEventListener('click', removeguideview()); //监听前要先删除原先的
    cancelButton.addEventListener('click', removeguideview());
}

//////////////////添加表格数据

// const mainhtml = document.getElementById("mainhtml");
// const iframeDoc = mainhtml.contentWindow.document;

//自动添加表格行
function addtrguide(event) {
    var fileUploadForm = document.getElementById("file-upload-form-guide");
    // 阻止表单默认提交行为
    event.preventDefault();

    // 获取文件输入框
    var fileInput = document.getElementById("guidein-name");
    localStorage.setItem("fileInput", JSON.stringify(fileInput.value));

    // 获取backend.html中的表格元素

    // var table = iframeDoc.getElementById("data-table-guide");
    // removeguideview();
    // 


    if ((fileInput.value == "") || (fileInput.value == "必须输入导览路线名称")) {
        return 1;
    }
    else {
        // gen_data_guide();
        removeguideview();
        return 0;
    }

}

//// 外部表格输入名称的
function gen_data_guide(table, fileInput) {
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
    cell0.innerText = RowNumber;

    // 设置新行的其他单元格
    var cell1 = row.insertCell(1);
    cell1.innerText = fileInput;
    var cell2 = row.insertCell(2);
    var link1 = document.createElement("a");
    link1.href = "#";
    link1.textContent = "编辑";
    link1.className = "write-guide-link";
    link1.onclick = write_guide();
    cell2.appendChild(link1);
    var link2 = document.createElement("a");
    link2.href = "#";
    link2.textContent = "删除";
    link2.className = "delete-guide-link";
    link2.onclick = del_guide();
    cell2.appendChild(link2);

    table.querySelector("tbody").appendChild(row);
    // 将 tr 数据加入到 data 数组中
    data_guide.push(row);
    // console.log(data_guide);


    // 更新总行数和总页数
    // totalRows_guide = table.rows.length; //算上的th行
    totalRows_guide = data_guide.length;
    totalPages_guide = Math.ceil(totalRows_guide / rowsPerPage_guide);

    // 计算新行所处的页码
    var newRowIndex_guide = totalRows_guide - 1;
    var newPage_guide = Math.ceil((newRowIndex_guide + 1) / rowsPerPage_guide);
    currentPage_guide = newPage_guide;

    // console.log(table.rows.length, totalRows_guide % rowsPerPage_guide, totalRows_guide, currentPage_guide, totalPages_guide)

    // 如果当前页满了，就换页
    if (totalRows_guide % rowsPerPage_guide == 1 && currentPage_guide != 1) {
        updatePageNumber_guide();
    }
    displayTable_guide(data_guide);
    // localStorage.setItem("data_guide", JSON.stringify(data_guide));
}


// 显示表格
function displayTable_guide(data_guide) {
    // console.log("row:",data_guide);
    // console.log(data_guide.length);
    // console.log(table_guide);
    if (data_guide.length > 0) {
        // 如果数据长度为空，则显示图片
        // 否则不显示img，以便表格数据显示
        img_guide.style.display = "none";
        table_guide.style.display = "table";
    }
    else {
        img_guide.style.display = "inline";
        table_guide.style.display = "none";
    }
    // 清空表格
    table_guide.querySelector("tbody").innerHTML = "";


    // 计算当前页的数据
    var startIndex_guide = (currentPage_guide - 1) * rowsPerPage_guide;
    var endIndex_guide = Math.min(startIndex_guide + rowsPerPage_guide, data_guide.length);
    var pageData_guide = data_guide.slice(startIndex_guide, endIndex_guide);

    // console.log(pageData);

    // 生成表格数据
    pageData_guide.forEach(row => {
        // const row = document.createElement("tr");
        // rowData.forEach(cellData => {
        //     const cell = document.createElement("td");
        //     cell.textContent = cellData;
        //     row.appendChild(cell);
        // });

        table_guide.querySelector("tbody").appendChild(row);
    });

    var tableBody = document.getElementById("tbody-guide");


    var rows = tableBody.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        // console.log(i);
        rows[i].children[0].innerText = (currentPage_guide - 1) * rowsPerPage_guide + i + 1;
    }

    if (totalPages_guide > 1) {
        var pagination = document.getElementById("pagination-guide");
        pagination.style.display = "flex";
    }
}

// 更新页码函数
function updatePageNumber_guide() {
    // 找到页码元素
    var pageNumberElement_guide = document.getElementById("page-number-guide");

    if (currentPage_guide > totalPages_guide) currentPage_guide = totalPages_guide;

    // 更新页码文本
    pageNumberElement_guide.innerHTML = `${currentPage_guide}/${totalPages_guide}`;

    // 找到上一页和下一页元素
    var prevPageLink_guide = document.getElementById("prev-page-guide");
    var nextPageLink_guide = document.getElementById("next-page-guide");

    // 根据当前页码是否是第一页或最后一页来禁用或启用上一页和下一页链接
    if (currentPage_guide == 1) {
        prevPageLink_guide.classList.add("disabled");
    } else {
        prevPageLink_guide.classList.remove("disabled");
    }

    if (currentPage_guide == totalPages_guide) {
        nextPageLink_guide.classList.add("disabled");
    } else {
        nextPageLink_guide.classList.remove("disabled");
    }

    //当页数只剩1页时,则不显示上下页和跳转,并回到第一页显示
    if ((totalPages_guide == 1) || (totalPages_guide == 0)) {
        currentPage_guide = 1;
        displayTable_guide(data_guide);
        var pagination = document.getElementById("pagination-guide");
        pagination.style.display = "none";
    }
}

// 上一页函数
function prevPage_guide() {
    if (currentPage_guide > 1) {
        // showPage(currentPage_guide - 1);
        currentPage_guide--;
        displayTable_guide(data_guide);
        updatePageNumber_guide();
    }
}

// 下一页函数
function nextPage_guide() {
    if (currentPage_guide < totalPages_guide) {
        // showPage(currentPage_guide + 1);
        currentPage_guide++;
        displayTable_guide(data_guide);
        updatePageNumber_guide();
    }
}

function gotoPage_guide() {
    // 找到输入框和确定按钮元素
    var inputBox_guide = document.getElementById("page-input-guide");
    var button_guide = document.getElementById("goto-button-guide");

    // 获取输入的页码
    var pageNumber_guide = parseInt(inputBox_guide.value);

    // 如果输入的页码合法，则跳转到指定页
    if (pageNumber_guide >= 1 && pageNumber_guide <= totalPages_guide) {
        // showPage(pageNumber);
        currentPage_guide = pageNumber_guide;
        displayTable_guide(data_guide);
        updatePageNumber_guide();
    }

    // 清空输入框
    inputBox_guide.value = "";
}

//查询全部导览路线信息并删除
function delGuidedatabyID(url, index) { //pageNum
    $.ajax({
        url: url,//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            if (data != null && data.length > 0) {
                //删除data中相应行
                data_guide.splice(index - 1, 1);
                //更新总页码
                totalRows_guide = data_guide.length;
                totalPages_guide = Math.ceil(totalRows_guide / rowsPerPage_guide);

                //计算删除行当前页码
                currentPage_guide = Math.ceil(index / rowsPerPage_guide);
                // 更新显示
                updatePageNumber_guide();
                displayTable_guide(data_guide);

            }
        }
    })
}


//删除该行
function del_guide() {
    // 获取所有删除链接，并添加点击事件
    var tableBody = document.getElementById("tbody-guide");
    var confirmDialog = document.getElementById("confirm-box-guide");
    var confirmBtn = document.getElementById("confirmBtn-guide");
    var cancelBtn = document.getElementById("cancelBtn-guide");

    tableBody.onclick = function (event) {
        var target = event.target;
        var parent = document.getElementById("content");
        if (target.classList.contains("delete-guide-link")) {
            event.stopImmediatePropagation();
            confirmDialog.style.display = "block";
            addCover(parent);

            confirmBtn.onclick = function () {
                var row = target.parentNode.parentNode;
                var index = row.children[0].innerText;
                var id = data_guide[index - 1].children[0].textContent;
                id--;
                var url = 'DelGuideByID?id=' + id;

                tableBody.removeChild(row);

                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);

                delGuidedatabyID(url, index);

            };

            cancelBtn.onclick = function () {
                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);
            };
        }
    };
}



//编辑按钮打开侧边栏
function write_guide() {
    var tableBody = document.getElementById("tbody-guide");

    tableBody.addEventListener('click', function (event) {
        var target = event.target;

        if (target.classList.contains("write-guide-link")) {
            event.stopImmediatePropagation();

            var row = target.parentNode.parentNode;
            var index = row.children[0].innerText;
            var id = data_guide[index - 1].children[0].textContent;
            id--;
            guide_id = id;
            guide_name = data_guide[index - 1].children[1].textContent;
            //开启内页
            location.href = "./guide-inbj.html?id=" + id + "&guideName=" + guide_name;
        }
    });
}
