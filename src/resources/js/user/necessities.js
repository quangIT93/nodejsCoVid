/*js của handle*/
/* <!-- Product 1 -->
                            <div class="effect-honey tm-gallery-item food">
                                <div class="product_info">
                                    <div class="product_info-img">
                                        <a href="#">
                                            <img src="./assets/img/Neccessities/food/sp1.png" alt="Nhu yếu phẩm 1">
                                        </a>
                                    </div>

                                    <p class="name_package">Gà quay</p>

                                    <div class="info">
                                        <div class="info_content">
                                            <p class="limit">Up to 1 packs/day</p>
                                            <div class="amount_content">
                                                <p class="amount-text">Number of packages: </p>
                                                <p class="amount"></p>
                                            </div>
                                            <p class="price"></p>
                                        </div>
                                        <div class="info_button">
                                            <button class="buy-button"><i class='bx bx-trash icon'></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>*/



const list = document.getElementById('list');
const search_btn = document.getElementById('search_btn');       //search item
const searchtext = document.getElementById('searchtext');
const filter_button = document.querySelectorAll('.options-items .filter');
const element_product = document.querySelectorAll('.tm-gallery-item');

var option = document.getElementById('option').value;     //sort
var method = document.getElementById('method').value;
let jsonData = [];
let ListItem = [];
let ArraySort = [];
var items_per_page = 9;     // số lượng item trên 1 trang
var items_per_page = 20;     // số lượng item trên 1 trang


$(document).ready(function () {
    /*Phần đổi màu các options (All, Food, Drink, Essentials) */
    $('.tm-gallery-links .options-items > li').click(function (e) {
        $('.tm-gallery-links .options-items> li').removeClass('active');
        $(this).addClass('active');
        addPagination();
        displayItem();
        Slick();
    });

    /*Phần đổi màu số trang web*/
    $('.tm-paging > a').click(function (e) {
        // console.log(e.target)
        $('.tm-paging > a').removeClass('active');
        $(this).addClass('active');
    });

    //     /*Phần phân loại sản phẩm theo All, Food, Drink, Essential */
    Array.from(filter_button).forEach(function (element) {
        var count = 0;
        element.addEventListener('click', function (event) {
            let name_filter = event.target.dataset.filter;         // biến của options-items  (All, Food, Drinks, Essentials)
            jsonData.forEach(function (item) {
                if (name_filter === item.html.dataset.item || name_filter === 'all') {
                    item.html.style.display = 'block';
                    count++;
                } else {
                    item.html.style.display = 'none';
                }
            })

        });
    })

    /*Phần tìm kiếm sản phẩm*/
    search_btn.addEventListener('click', function (event) {
        let search_text = searchtext.value.toLowerCase();
        jsonData.forEach(function (item) {
            if (item.name.toLowerCase().indexOf(search_text) !== -1) {
                item.html.style.display = 'block';
            } else {
                item.html.style.display = 'none';
            }
        })
        addPagination();
        displayItem();
        Slick();

    });

    //     // load data from product.json into class="product_info"
    fetch('/necessities/product.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data;
            jsonData.forEach(item => {
                item.html = document.createElement('div');
                item.html.classList.add('product_info');
                item.html.setAttribute('data-item', `${item.type}`);
                item.html.setAttribute('style', "display: block;");
                item.html.innerHTML = ` 
                                            <div class="product_info-img">
                                                <div class="image_collection">
                                                    <img class="image1" 
                                                    src="/img/Neccessities/${item.type}/${item.image}"
                                                        alt="${item.name}">
                                                    <img src="/img/Neccessities/${item.type}/${item.image1}"
                                                        alt="${item.name}">
                                                    <img src="/img/Neccessities/${item.type}/${item.image2}"
                                                        alt="${item.name}">
                                                </div>
                                            </div>
                                            <div class="info">
                                                <p class="name_package">${item.name}</p>
                                                <div class="info_content">
                                                    <div class="amount_content">
                                                        <p class="amount-text">Number of packages: </p>
                                                        <p class="amount">${item.amount}</p>
                                                    </div>
                                                    <p class="price_text">Price:</p>
                                                    <p class="price">${item.price}</p>
                                                </div>
                                                <div class="info_button" id="{{this._id}}">
                                                    <button class="buy-button"><i class='bx bx-shopping-bag'></i>Mua Ngay</button>
                                                </div>
                                            </div>
                                            `;
                ListItem.push(item.html);
            });
        })
        .then(function () {
            addPagination();
            displayItem();
            Slick();
        })
        .catch(err => console.log(err));

    $(document).on('click', '.pagination-link', changePage);

});
function addPagination() {
    $('#pagination').empty()
    let datas = ListItem.filter(item => item.style.display === 'block')
    var total_pages = Math.ceil(datas.length / items_per_page);
    for (let i = 1; i <= total_pages; i++) {
        $('#pagination').append(`<a href="javascript:void(0)" class="pagination-link" data-page=${i}>${i}</a>`);
    }
    $('#pagination a:first-child').addClass('active');
}

function displayItem() {
    list.innerHTML = ''
    let datas = ListItem.filter(item => item.style.display === 'block')
    for (var i = 0; i < items_per_page; i++) {
        if (datas[i] !== undefined) {
            list.append(datas[i])
        }
    }
}
// // thuật toán phân trang
// /*
//     item : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
//     1: 0, 1, 2
//     2: 3, 4, 5
//     3: 6, 7, 8
//     4: 9, 10, 11
//     5: 12, 13
//     itemPerPage : 3, currentPage = 1
//     start = 0, end = itemPerPage
//     start = (currentPage-1) * itemPerPage;
//     end = currentPage * itemPerPage;
//     1 : CurrentPage = 1, start = (1-1) * 3 = 0, end = 1 * 3 = 3     => start=0, end=3
//     2 : CurrentPage = 2, start = (2-1) * 3 = 3, end = 2 * 3 = 6     => start=3, end=6
//     3 : CurrentPage = 3, start = (3-1) * 3 = 6, end = 3 * 3 = 9     => start=6, end=9

// */

function changePage() {
    list.innerHTML = '';
    $('.pagination-link.active').removeClass('active');
    let datas = ListItem.filter(item => item.style.display === 'block')
    console.log('thay doi trang')
    var page = $(this).data('page');
    var start = (page - 1) * items_per_page;
    var end = page * items_per_page < datas.length ? page * items_per_page : datas.length;
    for (let i = start; i < end; i++) {
        list.appendChild(datas[i]);
    }

    $(this).addClass('active');
    Slick();
}

// function renderUser() {
//     list.innerHTML = ''
//     for (var i = 0; i < items_per_page; i++) {
//         if (jsonData.html[i] !== undefined) {
//             list.append(jsonData.html[i])
//         }
//     }
// }

function Sort() {
    let valueSelect = document.getElementById("method").value
    jsonData.sort((a, b) => {
        if (valueSelect == "az") {
            return a.name.localeCompare(b.name)
        } else if (valueSelect == "za") {
            return b.name.localeCompare(a.name)
        } else {
            return a.id - b.id
        }
    })
    displayItem();
    addPagination();
    Slick();
    console.log('sap xep: ', jsonData);
}

/*Tìm kiếm sản phẩm*/
$(document).ready(function () {
    search_btn.addEventListener('click', function (event) {
        let search_text = searchtext.value.toLowerCase();
        jsonData.forEach(function (item) {
            if (item.name.toLowerCase().indexOf(search_text) !== -1) {
                item.html.style.display = 'block';
            } else {
                item.html.style.display = 'none';
            }
        })
        displayItem();
        addPagination();
        Slick();

    });
})

/*Phần hiện nhiều sản phẩm trên 1 item */
function Slick() {
    $('.image_collection').not('.slick-initialized').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: `<button type='button' class='slick-prev slick-arrow'><i class='bx bx-chevron-left icon'></i></button>`,
        nextArrow: `<button type='button' class='slick-next slick-arrow'><i class='bx bx-chevron-right icon'></i></button>`,
        dots: true,
    });
}

function ABCD() {
    // Modal
    const purchased = document.getElementById('purchased');
    console.log('Số lượng: ', document.querySelectorAll('#list .product_info'));
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("cart");
    var close_modal = document.getElementsByClassName("close_modal")[0];
    // tại sao lại có [0] như  thế này bởi vì mỗi close là một html colection nên khi mình muốn lấy giá trị html thì phải thêm [0]. 
    //Nếu mình có 2 cái component cùng class thì khi[0] nó sẽ hiển thị component 1 còn[1] thì nó sẽ hiển thị component 2.
    var close_footer = document.getElementsByClassName("close-footer")[0];
    var order = document.getElementsByClassName("order")[0];
    btn.onclick = function () {
        modal.style.display = "block";
    }
    close_modal.onclick = function () {
        modal.style.display = "none";
    }
    close_footer.onclick = function () {
        modal.style.display = "none";
    }
    order.onclick = function () {
        var account_permission = document.querySelector('.account-permission').innerText;
        var cart_item = document.getElementsByClassName("cart-items")[0];
        var cart_rows = cart_item.getElementsByClassName("cart-row");
        var name_package = document.querySelectorAll(".name-package");
        var amount_package = document.getElementsByClassName("amount")[0];

        for (var i = 0; i < cart_rows.length; i++) {
            var cart_row = cart_rows[i]
            var price_item = cart_row.getElementsByClassName("cart-price")[0].innerText
            var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
            var damua = quantity_item.value // lấy giá trị trong thẻ input
            var image_item = cart_row.getElementsByClassName("cart-item-image")[0].src
            var name_item = cart_row.getElementsByClassName("cart-item-title")[0].innerText
            console.log('tên sản phẩm: ', name_item);
            var temp = cart_row.getElementsByClassName("cart-item-title")[0]
            var total;
            if (parseFloat(account_permission) < parseFloat(price_item)) {
                alert("Bạn không đủ tiền để mua gói này");
                return;
            }
            else if (parseFloat(account_permission) >= parseFloat(price_item)) {
                if (name_item == $('.name_package').text()) {
                    total = parseFloat(amount_package.innerText) + damua;
                    console.log('tong so luong: ', total);
                    return total;
                }
                else {
                    var content = `
                        <div class="product_info">
                        <div class="product_info-img">
                            <div class="image_collection">
                                <img name="purchasedImages" class="image1"
                                    src="${image_item}" alt="${name_item}">
                            </div>
                        </div>
                        <div class="info">
                            <p name="purchasedNames" class="name_package">${name_item}</p>
                            <div class="info_content">
                                <div class="amount_content">
                                    <p class="amount-text">Number of packages: </p>
                                    <p name="purchasedAmounts" class="amount">${damua}</p>
                                </div>
                                <p class="price_text">Price:</p>
                                <p name="purchasedPrices" class="price">${price_item}</p>
                            </div>
                        </div>
                        </div>
                        `
                    $("#list").append(content)
                }
                alert("Cảm ơn bạn đã thanh toán đơn hàng")
            }

        }
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // menu mobile
    // var btn_menu = document.getElementById("btnmenu");
    // btn_menu.addEventListener("click", function () {
    //     var item_menu = document.getElementById("menutop");
    //     if (item_menu.style.display === "block") {
    //         item_menu.style.display = "none";
    //     } else {
    //         item_menu.style.display = "block";
    //     }
    // })


    // xóa cart
    var remove_cart = document.getElementsByClassName("btn-danger");
    for (var i = 0; i < remove_cart.length; i++) {
        var button = remove_cart[i]
        button.addEventListener("click", function (event) {
            var button_remove = event.target
            button_remove.parentElement.parentElement.remove()
        })
    }

    // update cart 
    function updatecart() {
        var cart_item = document.getElementsByClassName("cart-items")[0];
        var cart_rows = cart_item.getElementsByClassName("cart-row");
        var total = 0;
        for (var i = 0; i < cart_rows.length; i++) {
            var cart_row = cart_rows[i]
            var price_item = cart_row.getElementsByClassName("cart-price ")[0]
            var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
            var price = parseFloat(price_item.innerText)// chuyển một chuổi string sang number để tính tổng tiền.
            var quantity = quantity_item.value // lấy giá trị trong thẻ input
            total = total + (price * quantity)
        }
        document.getElementsByClassName("cart-total-price")[0].innerText = total.toLocaleString() + ' VNĐ'
        // Thay đổi text = total trong .cart-total-price. Chỉ có một .cart-total-price nên mình sử dụng [0].
    }

    // thay đổi số lượng sản phẩm
    var quantity_input = document.getElementsByClassName("cart-quantity-input");
    for (var i = 0; i < quantity_input.length; i++) {
        var input = quantity_input[i];
        input.addEventListener("change", function (event) {
            var input = event.target
            if (isNaN(input.value) || input.value <= 0) {
                input.value = 1;
            }
            updatecart()
        })
    }
    // Thêm vào giỏ
    var add_cart = document.getElementsByClassName("buy-button");
    for (var i = 0; i < add_cart.length; i++) {
        var add = add_cart[i];
        console.log('add: ', add_cart.length);
        add.addEventListener("click", function (event) {
            console.log('add');
            var button = event.target;
            var product = button.parentElement.parentElement;
            var img = product.parentElement.getElementsByClassName("image1")[0].src
            var title = product.getElementsByClassName("name_package")[0].innerText
            var price = product.getElementsByClassName("price")[0].innerText
            addItemToCart(title, price, img)
            //Khi thêm sản phẩm vào giỏ hàng thì sẽ hiển thị modal
            // modal.style.display = "block";

            updatecart()
        })
    }

    function addItemToCart(title, price, img) {
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        var cart_title = cartItems.getElementsByClassName('cart-item-title')
        //Nếu title của sản phẩm bằng với title mà bạn thêm vao giỏ hàng thì sẽ thông cho user.
        for (var i = 0; i < cart_title.length; i++) {
            if (cart_title[i].innerText == title) {
                alert('Sản Phẩm Đã Có Trong Giỏ Hàng')
                return
            }
        }
        /*Số lượng mặt hàng đã mua*/
        var count_items = document.getElementsByClassName("cart-item");

        var cartRowContents = `
                            <p class="cart-stt cart-column">${count_items.length}</p>  
                        <div class="cart-item cart-column">
                            <img class="cart-item-image" src="${img}" width="100" height="100">
                            <span class="cart-item-title">${title}</span>
                        </div>
                        <span class="cart-price cart-column">${price}</span>
                        <div class="cart-quantity cart-column">
                            <input class="cart-quantity-input" type="number" value="1">
                            <button class="btn btn-danger" type="button">Xóa</button>
                        </div>`
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function (event) {
            var button_remove = event.target
            button_remove.parentElement.parentElement.remove()
            updatecart()
        })
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
            var input = event.target
            if (isNaN(input.value) || input.value <= 0) {
                input.value = 1;
            }
            updatecart()
        })
        var items_amount = document.getElementsByClassName("items_amount");
        items_amount[0].innerText = count_items.length - 1;
    }
}

setTimeout(ABCD, 2000);
