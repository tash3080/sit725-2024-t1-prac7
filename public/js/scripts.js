let socket = io();

const getcards = () => {
    $.get('/api/flower', (response) => {
        if (response.statusCode == 200) {
            addCards(response.data);
        }
    })
}

const clickMe = () => {
    alert("Thanks a lot. Have a nice day!")
}

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.image_link = $('#image_link').val();
    formData.subtitle = $('#subtitle').val();
    formData.description = $('#description').val();

    console.log("Form Data Submitted: ", formData);
    postFlower(formData);
    // alert('new flower added successfully');
}

function postFlower(flower) {
    $.ajax({
        url: '/api/flower',
        type: 'POST',
        data: flower,
        success: (result) => {
            if (result.statusCode === 200) {
                alert('new flower added successfully');
            }
        }
    });
}

const addCards =
    (items) => {
        items.forEach(item => {
            let itemToAppend = '<div class="col s4 center-align">' +
                '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image_link + '">' +
                '</div><div class="card-content">' +
                '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.subtitle + '</a></p></div>' + '<div class="card-reveal">' +
                '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' + '<p class="card- text grey-text text-darken-4">' + item.desciption + '</p>' +
                '</div></div></div>';
            $("#card-section").append(itemToAppend)
        });
    }

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    })

    getcards();

    $('.modal').modal();

    $('.trigger-modal').modal();

});

socket.on('number', (msg) => { 
    console.log('Random Number: ' + msg); 
});