let allTr = document.querySelectorAll('tbody tr');

let logoUser = document.querySelector('.admin__info-logo img')
let nameUserGenneral = document.querySelector('.admin__general-info ul li span')

let userInfoLi = document.querySelectorAll('.admin__general-info ul li span')



allTr.forEach(function (element, id) {
    if (id === 0) {
        userInfoLi[0].innerText = element.children[1].innerText
        userInfoLi[1].innerText = element.children[2].innerText
        userInfoLi[2].innerText = element.children[3].innerText
        userInfoLi[3].innerText = element.children[4].innerText
        userInfoLi[4].innerText = element.children[5].innerText

        nameUserGenneral.innerText = element.children[1].innerText;
        logoUser.setAttribute('src', element.children[6].innerText);
    }
    element.addEventListener("click", function () {
        userInfoLi[0].innerText = element.children[1].innerText
        userInfoLi[1].innerText = element.children[2].innerText
        userInfoLi[2].innerText = element.children[3].innerText
        userInfoLi[3].innerText = element.children[4].innerText
        userInfoLi[4].innerText = element.children[5].innerText
        nameUserGenneral.innerText = element.children[1].innerText;
        logoUser.setAttribute('src', element.children[6].innerText);

    });
});


let editUser = document.querySelector('.edit__user')
var handleEditUser = () => {
    if (editUser.style.display !== "none") {
        editUser.style.display = "none";
    } else {
        editUser.style.display = "block";
    }
}

/*Add Patient*/
const buttonAdd = document.querySelector('.btn-add');
const buttonClose = document.querySelector('.close-edit-profile');
const edit_profile = document.querySelector('.container-edit-profile');
const display_screen = document.querySelector('.screen');
const body_display= document.querySelector('body');

buttonAdd.addEventListener("click", () => {
    edit_profile.classList.add("active");
    display_screen.classList.add("active");
    body_display.classList.add("active");

});

buttonClose.addEventListener("click", () => {
    edit_profile.classList.remove("active");
    display_screen.classList.remove("active");
    body_display.classList.remove("active");

});



/*Choose File Image*/
const
    imgDiv = document.querySelector('.row-top'),
    img = document.querySelector('#photo'),
    file = document.querySelector('#file'),
    uploadBtn = document.querySelector('#uploadBtn');
//if user hover on img div 

imgDiv.addEventListener('mouseenter', function () {
    uploadBtn.style.display = "block";
});

//if we hover out from img div

imgDiv.addEventListener('mouseleave', function () {
    uploadBtn.style.display = "none";
});

//lets work for image showing functionality when we choose an image to upload

//when we choose a foto to upload

file.addEventListener('change', function () {
    //this refers to file
    const choosedFile = this.files[0];

    if (choosedFile) {

        const reader = new FileReader(); //FileReader is a predefined function of JS

        reader.addEventListener('load', function () {
            img.setAttribute('src', reader.result);
        });

        reader.readAsDataURL(choosedFile);
    }
});

