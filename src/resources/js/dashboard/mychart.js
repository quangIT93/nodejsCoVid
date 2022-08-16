

// var API = 'https://static.pipezero.com/covid/data.json'



// fetch(API)
//     .then(response => response.json())
//     // .then(data => {
//     //     console.log(data);
//     // }
//     .then(function (posts) {
//         console.log(post);
//     })
// 


function getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }

    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        second = '0' + second;
    }
    var dateTime = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
    return dateTime;
}
setInterval(function () {
    currentTime = getDateTime();
    document.getElementById("content-date").innerHTML = currentTime;
}, 1000);


// {/* <script type="text/javascript"> */ }
var sreach_input = document.getElementById('sreach_input');
var sreach_text = '';
sreach_input.addEventListener('input', function (evt) {
    sreach_text = sreach_input.value;
    render_table();
});
// </script>
// <script type="text/javascript">
var btn_to_top = document.getElementById("back-to-top");
var inner_btn = document.getElementById("btti");

window.onload = function () { scrollFunction() };
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    /*500 là chiều cao 500px */
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        btn_to_top.className = "show";
        inner_btn.style.display = 'flex';
    } else {
        btn_to_top.classList.remove("show");
        inner_btn.style.display = 'none';
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
// </script>
// <script type="text/javascript">
function open(e, t) {
    var s, n, a;
    for (n = document.getElementsByClassName("content-tab"), s = 0; s < n.length; s++) n[s].classList.remove("show");
    for (a = document.getElementsByClassName("tablinks"), s = 0; s < a.length; s++) a[s].classList.remove("active");
    (document.getElementById(t).className += " show"), (document.getElementById(e).className += " active");
}
// </script>
// <script type="text/javascript">
function numberWithCommas(e) {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// </script>
// <script type="text/javascript">
var data = '';
var data_global = [];
//https://covid19.gov.vn/  
const URL = "https://static.pipezero.com/covid/data.json";
const URL_Global = "https://api.apify.com/v2/datasets/UmDvyef6tqie4oAMN/items";

function fetch_data() {
    fetch(URL)
        .then((res) => res.text())
        .then((text) => {
            data = JSON.parse(text);
            render();
        }).catch((err) => console.log(err));
}

function fetch_data_global() {
    fetch(URL_Global)
        .then((res) => res.text())
        .then((text) => {
            data_global = JSON.parse(text);
            //
            let temparr = [];
            let items = data_global ? data_global[0].regionData : [];
            let None = ['World',
                'Europe',
                'Asia',
                'North America',
                'South America',
                'Africa',
                'Oceania',
                '',
                'Total:']
            for (let i = 0; i < items.length; i++) {
                if (None.indexOf(items[i].country) === -1) {
                    temparr.push(items[i]);
                }
            }
            data_global[0].regionData = temparr;
            //
        }).catch((err) => console.log(err));
}

function ReLoad_Data() {
    fetch_data();
    fetch_data_global();
}

ReLoad_Data();

function render() {
    // data top info internal
    let internal_today_data = new Object();
    internal_today_data.death = data.today.internal.death ? data.today.internal.death : "0";
    internal_today_data.treating = data.today.internal.treating ? data.today.internal.treating : "0";
    internal_today_data.cases = data.today.internal.cases ? data.today.internal.cases : "0";
    internal_today_data.recovered = data.today.internal.recovered ? data.today.internal.recovered : "0";
    let internal_total_data = new Object();
    internal_total_data.death = data.total.internal.death ? data.total.internal.death : "0";
    internal_total_data.treating = data.total.internal.treating ? data.total.internal.treating : "0";
    internal_total_data.cases = data.total.internal.cases ? data.total.internal.cases : "0";
    internal_total_data.recovered = data.total.internal.recovered ? data.total.internal.recovered : "0";
    // render top info of internal
    document.getElementById("vi").getElementsByClassName("home__statistical-list")[0].innerHTML =
        '<div class="infection item"><p class="text">Nhiễm bệnh</p><p class="value">' +
        numberWithCommas(internal_total_data.cases) +
        '</p><p class="note">Hôm nay +<span>' +
        numberWithCommas(internal_today_data.cases) +
        '</span></p></div><div class="item hidden"><p class="text">ĐANG ĐIỀU TRỊ</p><p class="value">' +
        numberWithCommas(internal_total_data.treating) +
        '</p><p class="note hidden">Hôm nay +<span>' +
        numberWithCommas(internal_today_data.treating) +
        '</span></p></div><div class="recover item"><p class="text">Phục hồi</p><p class="value">' +
        numberWithCommas(internal_total_data.recovered) +
        '</p><p class="note ">Hôm nay +<span>' +
        numberWithCommas(internal_today_data.recovered) +
        '</span></p></div><div class="dead item"><p class="text">Tử vong</p><p class="value">' +
        numberWithCommas(internal_total_data.death) +
        '</p><p class="note ">Hôm nay +<span>' +
        numberWithCommas(internal_today_data.death) +
        "</span></p></div>";
    // data top info world
    let world_today_data = new Object();
    world_today_data.death = data.today.world.death ? data.today.world.death : "0";
    world_today_data.treating = data.today.world.treating ? data.today.world.treating : "0";
    world_today_data.cases = data.today.world.cases ? data.today.world.cases : "0";
    world_today_data.recovered = data.today.world.recovered ? data.today.world.recovered : "0";
    let world_total_data = new Object();
    world_total_data.death = data.total.world.death ? data.total.world.death : "0";
    world_total_data.treating = data.total.world.treating ? data.total.world.treating : "0";
    world_total_data.cases = data.total.world.cases ? data.total.world.cases : "0";
    world_total_data.recovered = data.total.world.recovered ? data.total.world.recovered : "0";
    // render top info of world
    document.getElementById("en").getElementsByClassName("home__statistical-list")[0].innerHTML =
        '<div class="infection item"><p class="text">Nhiễm bệnh</p><p class="value">' +
        numberWithCommas(world_total_data.cases) +
        '</p><p class="note">Hôm nay +<span>' +
        numberWithCommas(world_today_data.cases) +
        '</span></p></div><div class="item hidden"><p class="text">ĐANG ĐIỀU TRỊ</p><p class="value">' +
        numberWithCommas(world_total_data.treating) +
        '</p><p class="note hidden">Hôm nay +<span>' +
        numberWithCommas(world_today_data.treating) +
        '</span></p></div><div class="recover item"><p class="text">Phục hồi</p><p class="value">' +
        numberWithCommas(world_total_data.recovered) +
        '</p><p class="note">Hôm nay +<span>' +
        numberWithCommas(world_today_data.recovered) +
        '</span></p></div><div class="dead item"><p class="text">Tử vong</p><p class="value">' +
        numberWithCommas(world_total_data.death) +
        '</p><p class="note">Hôm nay +<span>' +
        numberWithCommas(world_today_data.death) +
        "</span></p></div>";

    render_table();
    render_chart();
}

function render_table() {
    // data of locations internal
    let locations = data.locations;
    // render
    var textdata = "";
    var textTotalValue = "";
    var total_table = new Object();
    total_table.name = 'Tổng dữ liệu trong bảng';
    total_table.cases = 0;
    total_table.casesToday = 0;
    total_table.death = 0;
    for (var i in locations) {
        var locations_data = new Object();
        locations_data.name = locations[i].name ? locations[i].name : "";
        locations_data.cases = locations[i].cases ? numberWithCommas(locations[i].cases) : "0";
        locations_data.casesToday = locations[i].casesToday ? '+' + numberWithCommas(locations[i].casesToday) : "-";
        locations_data.death = locations[i].death ? '+' + numberWithCommas(locations[i].death) : "0";
        // so sánh sâu giống like '%value%' trong sql
        var regex = new RegExp('.*' + sreach_text.toLowerCase() + '.*');
        var matchesRegex1 = regex.test(locations_data.name.toLowerCase());
        // tìm kí tự viết tắt
        let obj = quyuoc.find(o => o.name.toLowerCase() === locations_data.name.toLowerCase());
        // so sánh 
        var matchesRegex2 = regex.test(obj.sortname.toLowerCase());
        // xét điều khiện xuất hiện
        if (matchesRegex1 || sreach_text.length === 0 || matchesRegex2) {
            textdata +=
                '<div class="row"><span class="city">' +
                locations_data.name +
                '</span><span class="total_infections">' +
                locations_data.cases +
                '</span><span class="daynow red">' +
                locations_data.casesToday +
                '</span><span class="die">' +
                locations_data.death +
                "</span></div>";
            total_table.cases += locations[i].cases;
            total_table.casesToday += locations[i].casesToday;
            total_table.death += locations[i].death;
        }
    }
    textTotalValue +=
        '<div class="row"><span class="city">' +
        total_table.name +
        '</span><span class="total_value">' +
        numberWithCommas(total_table.cases) +
        '</span><span class="daynow red">' +
        numberWithCommas(total_table.casesToday) +
        '</span><span class="die">' +
        numberWithCommas(total_table.death) +
        "</span></div>";    
    document.getElementById("data_locations").innerHTML = textdata;
    document.getElementById("total_value").innerHTML = textTotalValue;

}

function render_chart() {
    let overview = data.overview;
    // Biểu đồ
    for (var i in overview) {
        var overview_data = new Object();
        overview_data.recovered = data.overview[i].recovered ? data.overview[i].recovered : 0;
        overview_data.cases = data.overview[i].cases ? data.overview[i].cases : 0;
        overview_data.death = data.overview[i].death ? data.overview[i].death : 0;
        overview_data.date = data.overview[i].date ? data.overview[i].date : "";

    }
    // var internal_total_data = new Object();
    //     internal_total_data.death = data.total.internal.death ? data.total.internal.death : 0;
    //     internal_total_data.treating = data.total.internal.treating ? data.total.internal.treating : 0;
    //     internal_total_data.cases = data.total.internal.cases ? data.total.internal.cases : 0;
    //     internal_total_data.recovered = data.total.internal.recovered ? data.total.internal.recovered : 0;


    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            // load data from overview_data.date into labels
            labels: overview.map(function (item) {
                return item.date;
            }),
            datasets: [
                {
                    label: 'Hồi phục',
                    data: [data.overview[0].recovered,
                    data.overview[1].recovered,
                    data.overview[2].recovered,
                    data.overview[3].recovered,
                    data.overview[4].recovered,
                    data.overview[5].recovered,
                    data.overview[6].recovered
                    ],
                    borderColor: [
                        // 'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        // 'rgba(255, 206, 86, 1)'

                    ],
                },
                {
                    label: 'Số ca nhiễm',
                    data: [data.overview[0].cases,
                    data.overview[1].cases,
                    data.overview[2].cases,
                    data.overview[3].cases,
                    data.overview[4].cases,
                    data.overview[5].cases,
                    data.overview[6].cases
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        // 'rgba(54, 162, 235, 1)',
                        // 'rgba(255, 206, 86, 1)'

                    ],
                },
                {
                    label: 'Tử vong',
                    data: [data.overview[0].death,
                    data.overview[1].death,
                    data.overview[2].death,
                    data.overview[3].death,
                    data.overview[4].death,
                    data.overview[5].death,
                    data.overview[6].death
                    ],
                    borderColor: [
                        // 'rgba(255, 99, 132, 1)',
                        // 'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'

                    ],
                }
            ]
        },
        options: {
            responsive: true,
        }
    });
    const ear = document.getElementById('myChart1').getContext('2d');
    const myChart1 = new Chart(ear, {
        type: 'polarArea',
        data: {
            labels: ['Người khỏi bệnh', 'Người mắc', 'Người chết'],
            datasets: [{
                label: '# of Votes',
                data: [data.total.internal.recovered, data.total.internal.cases, data.total.internal.death],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',

                ],
            }]
        },
        options: {
            responsive: true,
        }
    });
}



// ký hiệu quy ước viết tắt
const quyuoc = [{ "name": "An Giang", "sortname": "AG" }, { "name": "Bà Rịa – Vũng Tàu", "sortname": "BV" }, { "name": "Bạc Liêu", "sortname": "BL" }, { "name": "Bắc Kạn", "sortname": "BK" }, { "name": "Bắc Giang", "sortname": "BG" }, { "name": "Bắc Ninh", "sortname": "BN" }, { "name": "Bến Tre", "sortname": "BT" }, { "name": "Bình Dương", "sortname": "BD" }, { "name": "Bình Định", "sortname": "BĐ" }, { "name": "Bình Phước", "sortname": "BP" }, { "name": "Bình Thuận", "sortname": "BTh" }, { "name": "Cà Mau", "sortname": "CM" }, { "name": "Cao Bằng", "sortname": "CB" }, { "name": "Cần Thơ", "sortname": "CT" }, { "name": "Đà Nẵng", "sortname": "ĐNa" }, { "name": "Đắk Lắk", "sortname": "ĐL" }, { "name": "Đắk Nông", "sortname": "ĐNo" }, { "name": "Điện Biên", "sortname": "ĐB" }, { "name": "Đồng Nai", "sortname": "ĐN" }, { "name": "Đồng Tháp", "sortname": "ĐT" }, { "name": "Gia Lai", "sortname": "GL" }, { "name": "Hà Giang", "sortname": "HG" }, { "name": "Hà Nam", "sortname": "HNa" }, { "name": "Hà Nội", "sortname": "HN" }, { "name": "Hà Tĩnh", "sortname": "HT" }, { "name": "Hải Dương", "sortname": "HD" }, { "name": "Hải Phòng", "sortname": "HP" }, { "name": "Hậu Giang", "sortname": "HGi" }, { "name": "Hòa Bình", "sortname": "HB" }, { "name": "TP. Hồ Chí Minh", "sortname": "SG" }, { "name": "Hưng Yên", "sortname": "HY" }, { "name": "Khánh Hòa", "sortname": "KH" }, { "name": "Kiên Giang", "sortname": "KG" }, { "name": "Kon Tum", "sortname": "KT" }, { "name": "Lai Châu", "sortname": "LC" }, { "name": "Lạng Sơn", "sortname": "LS" }, { "name": "Lào Cai", "sortname": "LCa" }, { "name": "Lâm Đồng", "sortname": "LĐ" }, { "name": "Long An", "sortname": "LA" }, { "name": "Nam Định", "sortname": "NĐ" }, { "name": "Nghệ An", "sortname": "NA" }, { "name": "Ninh Bình", "sortname": "NB" }, { "name": "Ninh Thuận", "sortname": "NT" }, { "name": "Phú Thọ", "sortname": "PT" }, { "name": "Phú Yên", "sortname": "PY" }, { "name": "Quảng Bình", "sortname": "QB" }, { "name": "Quảng Nam", "sortname": "QNa" }, { "name": "Quảng Ngãi", "sortname": "QNg" }, { "name": "Quảng Ninh", "sortname": "QN" }, { "name": "Quảng Trị", "sortname": "QT" }, { "name": "Sóc Trăng", "sortname": "ST" }, { "name": "Sơn La", "sortname": "SL" }, { "name": "Tây Ninh", "sortname": "TN" }, { "name": "Thái Bình", "sortname": "TB" }, { "name": "Thái Nguyên", "sortname": "TNg" }, { "name": "Thanh Hóa", "sortname": "TH" }, { "name": "Thừa Thiên Huế", "sortname": "TTH" }, { "name": "Tiền Giang", "sortname": "TG" }, { "name": "Trà Vinh", "sortname": "TV" }, { "name": "Tuyên Quang", "sortname": "TQ" }, { "name": "Vĩnh Long", "sortname": "VL" }, { "name": "Vĩnh Phúc", "sortname": "VP" }, { "name": "Yên Bái", "sortname": "YB" }]
// </script>
// <script type="text/javascript">
var data_table = document.getElementById('data_locations');
function ShowMore() {
    data_table.classList.add('all');
    document.getElementById('xt').classList.add('hidden');
    document.getElementById('rg').classList.remove('hidden');
}

function Hidden() {
    data_table.classList.remove('all');
    document.getElementById('xt').classList.remove('hidden');
    document.getElementById('rg').classList.add('hidden');
}
// </script>
// <script type="text/javascript">
function ExportCSV(str) {
    const items = str === 'VN' ? data.locations : data_global[0].regionData;
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(items[0]);
    const csv = [
        header.join(','), // Tiêu đề 
        ...items.map(row =>
            header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')
        )
    ].join('\r\n');

    //Tải file
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", csv]);
    var url = window.URL.createObjectURL(blob);
    downloadLink.href = url;
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const Time = dd + '/' + mm + '/' + yyyy + '_' + today.getHours() + ":" + today.getMinutes() + ':' + today.getSeconds();
    downloadLink.download = str === 'VN' ? "Data_Covid_VN_" + Time + ".csv" : "Data_Covid_Global_" + Time + ".csv";  // Tên file
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
// </script>


// let world_total_data = new Object();
//     world_total_data.death = data.total.world.death ? data.total.world.death : "0";
//     world_total_data.treating = data.total.world.treating ? data.total.world.treating : "0";
//     world_total_data.cases = data.total.world.cases ? data.total.world.cases : "0";
//     world_total_data.recovered = data.total.world.recovered ? data.total.world.recovered : "0";



// Modal
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
    alert("Cảm ơn bạn đã thanh toán đơn hàng")
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
console.log('số lượng: ', remove_cart);
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
    document.getElementsByClassName("cart-total-price")[0].innerText = total + 'VNĐ'
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
var add_cart = document.getElementsByClassName("btn-cart");
for (var i = 0; i < add_cart.length; i++) {
    var add = add_cart[i];
    add.addEventListener("click", function (event) {

        var button = event.target;
        var product = button.parentElement.parentElement;
        var img = product.parentElement.getElementsByClassName("img-prd")[0].src
        var title = product.getElementsByClassName("content-product-h3")[0].innerText
        var price = product.getElementsByClassName("price")[0].innerText
        addItemToCart(title, price, img)
        // Khi thêm sản phẩm vào giỏ hàng thì sẽ hiển thị modal
        modal.style.display = "block";

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

    var cartRowContents = `
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
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
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
}


