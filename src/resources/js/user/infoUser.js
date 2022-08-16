
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
                                            <button class="trash-button"><i class='bx bx-trash icon'></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>*/




const user = document.getElementById('User');
const shopping = document.getElementById('Shopping');
const displayUser = document.getElementById('display_User');
const displayShopping = document.getElementById('display_Shopping');
const pagination = document.getElementById('pagination');

if(user && shopping){
    user.onclick = function () {
        displayUser.style.display = 'block';
        pagination.style.display = 'none';
        displayShopping.style.display = 'none';
    }
    
    shopping.onclick = function () {
        displayUser.style.display = 'none';
        displayShopping.style.display = 'block';
        pagination.style.display = 'block';
    }
}



$(document).ready(function () {
    /*Phần đổi màu các options (All, Food, Drink, Essentials) */
    $('.tm-gallery-links .options-itemUsers > li').click(function (e) {
        $('.tm-gallery-links .options-itemUsers> li').removeClass('active');
        $(this).addClass('active');
        displayItem();
        addPagination()
        // changePage()

    });

    /*Phần đổi màu số trang web*/
    $('.tm-pagingUser > a').click(function (e) {
        $('.tm-pagingUser > a').removeClass('active');
        $(this).addClass('active');
    });

    /*Phần ẩn hiện User và Shopping*/
 
    



    /*Phần phân loại sản phẩm theo All Food Drink Essential */
    // Array.from(filter_button).forEach(function (element) {
    //     var count = 0;

    //     element.addEventListener('click', function (event) {
    //         let name_filter = event.target.dataset.filter;         // biến của options-items  (All, Food, Drinks, Essentials)
    //         ListItem.forEach(function (item) {
    //             if (name_filter === item.dataset.item || name_filter === 'all') {
    //                 item.style.display = 'block';
    //                 count++;
    //             } else {
    //                 item.style.display = 'none';
    //             }
    //         })

    //     });
    // })
    /*Phần tìm kiếm sản phẩm*/
    // search_btn.addEventListener('click', function (event) {
    //     let search_text = searchtext.value.toLowerCase();
    //     ListItem.forEach(function (item) {
    //         let temp = item.firstElementChild.innerText;
    //         let abc = item.parentElement.innerText;
    //       
    //         if (temp.toLowerCase().indexOf(search_text) !== -1) {
    //             item.parentElement.style.display = 'block';
    //         } else {
    //             item.parentElement.style.display = 'none';
    //         }
    //     })
    // }
    // );



    //load data from product.json into class="product_info"



    const product = document.querySelectorAll(".effect-honey.tm-gallery-item")
    product.forEach(item => {
        ListItem.push(item)
    })
    addPagination()
    displayItem()
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
    let count = 0;
    for (var i = 0; i < items_per_page; i++) {
        if (datas[i] !== undefined) {

            list.append(datas[i])
            count++

        }
    }
}
// thuật toán phân trang
/*
    item : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
    1: 0, 1, 2
    2: 3, 4, 5
    3: 6, 7, 8
    4: 9, 10, 11
    5: 12, 13
    itemPerPage : 3, currentPage = 1
    start = 0, end = itemPerPage
    start = (currentPage-1) * itemPerPage;
    end = currentPage * itemPerPage;
    1 : CurrentPage = 1, start = (1-1) * 3 = 0, end = 1 * 3 = 3     => start=0, end=3
    2 : CurrentPage = 2, start = (2-1) * 3 = 3, end = 2 * 3 = 6     => start=3, end=6
    3 : CurrentPage = 3, start = (3-1) * 3 = 6, end = 3 * 3 = 9     => start=6, end=9
 
*/

function changePage() {
    list.innerHTML = '';
    $('.pagination-link.active').removeClass('active');

    var page = $(this).data('page');
    var start = (page - 1) * items_per_page;
    var end = page * items_per_page < ListItem.length ? page * items_per_page : ListItem.length;
    for (let i = start; i < end; i++) {
        list.appendChild(ListItem[i]);
    }

    $(this).addClass('active');

}


                            // const x = document.querySelector('.sidebar')
                            // console.log(x)