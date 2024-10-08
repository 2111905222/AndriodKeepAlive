//**********************导览*****************************
//查询全部导览路线信息
function getQAdata() { //pageNum
    $.ajax({
        url: "/SearchAllQA",//后台请求的数据
        dataType: 'json', //数据格式
        type: "GET",//请求方式
        success: function (data) {
            //推荐这种方式
            var dataStr = JSON.stringify(data);
            data = JSON.parse(dataStr);
            // console.log(data);
            if (data != null) {
                if (data.length == 0) {
                    img_qa.style.display = "inline";
                    table_qa.style.display = "none";
                }
                else {
                    img_qa.style.display = "none";
                    table_qa.style.display = "table";
                    data_qa.length = 0;
                    for (var i = 0; i < data.length; i++) {
                        gen_data_qa(table_qa, data[i].main.slice(0,-1));
                    }
                }
            }
        }
    })
}

function getQAdata1() {
    var table = document.getElementById("data-table-qa");
    data_qa.length = 0;
    gen_data_qa(table, '1');
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

// function addqa() {
//     var parent = document.getElementById("content");
//     // 获取侧边栏元素
//     var sidebar_qa = document.getElementById("pullsidebar-qa");
//     // 显示侧边栏
//     sidebar_qa.style.display = 'block';
//     // 添加遮挡层
//     addCover(parent);
// }

// //***获取添加数据按钮
// function addDataBtn_qa() {
//     var addDataBtn_qa = document.getElementById("add-data-btn-qa");

//     // 添加事件监听器，当按钮被单击时显示侧边栏
//     addDataBtn_qa.removeEventListener("click", addqa());
//     addDataBtn_qa.addEventListener("click", addqa());
// }

function addqa() {
    var parent = document.getElementById("content");
    // 获取侧边栏元素
    var addbox = document.getElementById("add-box-qa");
    // 显示侧边栏
    addbox.style.display = 'block';
    // 添加遮挡层
    addCover(parent);
}

//***获取添加数据按钮
function addDataBtn_qa() {
    var addDataBtn_qa = document.getElementById("add-data-btn-qa");

    // 添加事件监听器，当按钮被单击时显示侧边栏
    addDataBtn_qa.removeEventListener("click", addqa());
    addDataBtn_qa.addEventListener("click", addqa());
}

function cancel_button_qaadd(input) {
    var addbox = document.getElementById('add-box-qa');
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

//保存和取消时关闭内页
function removeqaview() {
    // window.location.href = "/home/gs/GS/project/h5/robot_backend/backend.html";
    // goToTargetPage();
    // location.href = "./backend.html?id1=face-li&id3=qa-li";
    location.href = "./qa.html";

}


//内页底部的确认和取消按钮
function save_button_qa(button) {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    const saveButton = document.getElementById('confirmBtn-qa');
    var not_save = addtrqa(event);

    if (!not_save) {
        saveButton.removeEventListener('click', removeqaview()); //监听前要先删除原先的
        saveButton.addEventListener('click', removeqaview());
    }
    else {
        var fileInput = document.getElementById("qain-name");

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

function cancel_button_qa(button) {
    // 添加事件监听器，当用户点击侧边栏外部时隐藏侧边栏
    // 获取保存和取消按钮元素
    const cancelButton = document.getElementById('cancelBtn-qa');

    cancelButton.removeEventListener('click', removeqaview()); //监听前要先删除原先的
    cancelButton.addEventListener('click', removeqaview());
}

//////////////////添加表格数据

// const mainhtml = document.getElementById("mainhtml");
// const iframeDoc = mainhtml.contentWindow.document;

//自动添加表格行
function addtrqa(event) {
    var fileUploadForm = document.getElementById("file-upload-form-qa");
    // 阻止表单默认提交行为
    event.preventDefault();

    // 获取文件输入框
    var fileInput = document.getElementById("qain-name");
    localStorage.setItem("fileInput", JSON.stringify(fileInput.value));

    // 获取backend.html中的表格元素

    // var table = iframeDoc.getElementById("data-table-qa");
    // removeqaview();
    // 


    if ((fileInput.value == "") || (fileInput.value == "必须输入导览路线名称")) {
        return 1;
    }
    else {
        // gen_data_qa();
        removeqaview();
        return 0;
    }

}

//// 外部表格输入名称的
function gen_data_qa(table, fileInput) {
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
    link1.className = "write-qa-link";
    link1.onclick = write_qa();
    cell2.appendChild(link1);
    var link2 = document.createElement("a");
    link2.href = "#";
    link2.textContent = "删除";
    link2.className = "delete-qa-link";
    link2.onclick = del_qa();
    cell2.appendChild(link2);

    table.querySelector("tbody").appendChild(row);
    // 将 tr 数据加入到 data 数组中
    data_qa.push(row);
    // console.log(data_qa);


    // 更新总行数和总页数
    // totalRows_qa = table.rows.length; //算上的th行
    totalRows_qa = data_qa.length;
    totalPages_qa = Math.ceil(totalRows_qa / rowsPerPage_qa);

    // 计算新行所处的页码
    var newRowIndex_qa = totalRows_qa - 1;
    var newPage_qa = Math.ceil((newRowIndex_qa + 1) / rowsPerPage_qa);
    currentPage_qa = newPage_qa;

    // console.log(table.rows.length, totalRows_qa % rowsPerPage_qa, totalRows_qa, currentPage_qa, totalPages_qa)

    // 如果当前页满了，就换页
    if (totalRows_qa % rowsPerPage_qa == 1 && currentPage_qa != 1) {
        updatePageNumber_qa();
    }
    displayTable_qa(data_qa);
    // localStorage.setItem("data_qa", JSON.stringify(data_qa));
}


// 显示表格
function displayTable_qa(data_qa) {
    // console.log("row:",data_qa);
    // console.log(data_qa.length);
    // console.log(table_qa);
    if (data_qa.length > 0) {
        // 如果数据长度为空，则显示图片
        // 否则不显示img，以便表格数据显示
        img_qa.style.display = "none";
        table_qa.style.display = "table";
    }
    else {
        img_qa.style.display = "inline";
        table_qa.style.display = "none";
    }
    // 清空表格
    table_qa.querySelector("tbody").innerHTML = "";


    // 计算当前页的数据
    var startIndex_qa = (currentPage_qa - 1) * rowsPerPage_qa;
    var endIndex_qa = Math.min(startIndex_qa + rowsPerPage_qa, data_qa.length);
    var pageData_qa = data_qa.slice(startIndex_qa, endIndex_qa);

    // console.log(pageData);

    // 生成表格数据
    pageData_qa.forEach(row => {
        // const row = document.createElement("tr");
        // rowData.forEach(cellData => {
        //     const cell = document.createElement("td");
        //     cell.textContent = cellData;
        //     row.appendChild(cell);
        // });

        table_qa.querySelector("tbody").appendChild(row);
    });

    var tableBody = document.getElementById("tbody-qa");


    var rows = tableBody.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        // console.log(i);
        rows[i].children[0].innerText = (currentPage_qa - 1) * rowsPerPage_qa + i + 1;
    }

    if (totalPages_qa > 1) {
        var pagination = document.getElementById("pagination-qa");
        pagination.style.display = "flex";
    }
}

// 更新页码函数
function updatePageNumber_qa() {
    // 找到页码元素
    var pageNumberElement_qa = document.getElementById("page-number-qa");

    if (currentPage_qa > totalPages_qa) currentPage_qa = totalPages_qa;

    // 更新页码文本
    pageNumberElement_qa.innerHTML = `${currentPage_qa}/${totalPages_qa}`;

    // 找到上一页和下一页元素
    var prevPageLink_qa = document.getElementById("prev-page-qa");
    var nextPageLink_qa = document.getElementById("next-page-qa");

    // 根据当前页码是否是第一页或最后一页来禁用或启用上一页和下一页链接
    if (currentPage_qa == 1) {
        prevPageLink_qa.classList.add("disabled");
    } else {
        prevPageLink_qa.classList.remove("disabled");
    }

    if (currentPage_qa == totalPages_qa) {
        nextPageLink_qa.classList.add("disabled");
    } else {
        nextPageLink_qa.classList.remove("disabled");
    }

    //当页数只剩1页时,则不显示上下页和跳转,并回到第一页显示
    if ((totalPages_qa == 1) || (totalPages_qa == 0)) {
        currentPage_qa = 1;
        displayTable_qa(data_qa);
        var pagination = document.getElementById("pagination-qa");
        pagination.style.display = "none";
    }
}

// 上一页函数
function prevPage_qa() {
    if (currentPage_qa > 1) {
        // showPage(currentPage_qa - 1);
        currentPage_qa--;
        displayTable_qa(data_qa);
        updatePageNumber_qa();
    }
}

// 下一页函数
function nextPage_qa() {
    if (currentPage_qa < totalPages_qa) {
        // showPage(currentPage_qa + 1);
        currentPage_qa++;
        displayTable_qa(data_qa);
        updatePageNumber_qa();
    }
}

function gotoPage_qa() {
    // 找到输入框和确定按钮元素
    var inputBox_qa = document.getElementById("page-input-qa");
    var button_qa = document.getElementById("goto-button-qa");

    // 获取输入的页码
    var pageNumber_qa = parseInt(inputBox_qa.value);

    // 如果输入的页码合法，则跳转到指定页
    if (pageNumber_qa >= 1 && pageNumber_qa <= totalPages_qa) {
        // showPage(pageNumber);
        currentPage_qa = pageNumber_qa;
        displayTable_qa(data_qa);
        updatePageNumber_qa();
    }

    // 清空输入框
    inputBox_qa.value = "";
}

//查询全部导览路线信息并删除
function delQAdatabyID(url, index) { //pageNum
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
                data_qa.splice(index - 1, 1);
                //更新总页码
                totalRows_qa = data_qa.length;
                totalPages_qa = Math.ceil(totalRows_qa / rowsPerPage_qa);

                //计算删除行当前页码
                currentPage_qa = Math.ceil(index / rowsPerPage_qa);
                // 更新显示
                updatePageNumber_qa();
                displayTable_qa(data_qa);

            }
        },
        error: function(){
               location.href = "./qa.html";
        }
    })
}


//删除该行
function del_qa() {
    // 获取所有删除链接，并添加点击事件
    var tableBody = document.getElementById("tbody-qa");
    var confirmDialog = document.getElementById("confirm-box-qa");
    var confirmBtn = document.getElementById("confirmBtn-qa");
    var cancelBtn = document.getElementById("cancelBtn-qa");

    tableBody.onclick = function (event) {
        var target = event.target;
        var parent = document.getElementById("content");
        if (target.classList.contains("delete-qa-link")) {
            event.stopImmediatePropagation();
            confirmDialog.style.display = "block";
            addCover(parent);

            confirmBtn.onclick = function () {
                var row = target.parentNode.parentNode;
                var index = row.children[0].innerText;
                var id = data_qa[index - 1].children[0].textContent;
                id--;
                var url = 'DelQAByMain?id=' + id;
                //console.log("url" + url);

                tableBody.removeChild(row);

                confirmDialog.style.display = "none";
                //删除遮挡
                removeCover(parent);

                delQAdatabyID(url, index);

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
function write_qa() {
    var tableBody = document.getElementById("tbody-qa");

    tableBody.addEventListener('click', function (event) {
        var target = event.target;

        if (target.classList.contains("write-qa-link")) {
            event.stopImmediatePropagation();

            var row = target.parentNode.parentNode;
            var index = row.children[0].innerText;
            var id = data_qa[index - 1].children[0].textContent;
            id--;
            qa_id = id;
            qa_name = data_qa[index - 1].children[1].textContent;
            //开启内页
            //location.href = "./qa-inbj.html?id=" + id + "&main=" + qa_name;
            location.href = "./qa-inbj.html?id=" + id;
        }
    });
}
