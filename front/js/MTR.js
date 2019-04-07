/* global $ */
$(document).ready(function () {
    console.log("document loaded");

    var cards_periods = [];
    var cards_places = [];
    var cards_persons = [];
    var cards_actions = [];

    $.getJSON("data/actions.json", function (data) {
        $.each(data, function (i, record) {

            var nom = record.label;

            if (typeof record.P18 !== 'undefined' && typeof record.P18[0] !== 'undefined' && typeof record.P18[0].image !== 'undefined') {
                var portrait = record.P18[0].image;

            } else portrait = null; //"img/portrait.png"

            if(portrait !== null) {
                cards_actions.push(
                    "<div class='card border-info card-large-border' style='width: 18rem'>" +
                    "   <img class='card-img-top' src='" + portrait + "' alt='Portait de " + nom + "'>" +
                    "   <div class='card-body'>" +
                    "       <h5 class='card-title'>" + nom + "</h5>" +
                    "   </div>" +
                    "</div>"
                );
            }

        });
    });

    $.getJSON("data/periods.json", function (data) {
        $.each(data, function (i, record) {

            var nom = record.label;

            if (typeof record.P18 !== 'undefined' && typeof record.P18[0] !== 'undefined' && typeof record.P18[0].image !== 'undefined') {
                var portrait = record.P18[0].image;

            } else portrait = null; //"img/portrait.png"

            if(portrait !== null) {
                cards_periods.push(
                    "<div class='card border-danger card-large-border' style='width: 18rem'>" +
                    "   <img class='card-img-top' src='" + portrait + "' alt='Portait de " + nom + "'>" +
                    "   <div class='card-body'>" +
                    "       <h5 class='card-title'>" + nom + "</h5>" +
                    "       <p class='card-text mb-0'>" + record.description + " </p>" +
                    "   </div>" +
                    "</div>"
                );
            }

        });
    });

    $.getJSON("data/places.json", function (data) {
        $.each(data, function (i, record) {

            var nom = record.label;

            if (typeof record.P18 !== 'undefined' && typeof record.P18[0] !== 'undefined' && typeof record.P18[0].image !== 'undefined') {
                var portrait = record.P18[0].image;

            } else portrait = null; //"img/portrait.png"

            if(portrait !== null) {
                cards_places.push(
                    "<div class='card border-success card-large-border' style='width: 18rem'>" +
                    "   <img class='card-img-top' src='" + portrait + "' alt='Portait de " + nom + "'>" +
                    "   <div class='card-body'>" +
                    "       <h5 class='card-title'>" + nom + "</h5>" +
                    "   </div>" +
                    "</div>"
                );
            }

        });


    });

    $.getJSON("data/persons.json", function (data) {
        $.each(data, function (i, record) {

            var nom = record.label;

            if (typeof record.P106 !== 'undefined') {
                var metier = ' (' + record.P106[0].label + ')';
            } else metier = "";

            if (typeof record.P19 !== 'undefined') {
                var LieuNaissance =  "<i class='fas fa-child'></i> "+record.P19[0].label;
            } else LieuNaissance = "";

            if (typeof record.P20 !== 'undefined') {
                var LieuDeces = record.P20[0].label;
            } else LieuDeces = "";

            if (typeof record.P570 !== 'undefined') {
                var DateDeces = record.P570[0];
                var AnneeDeces= " en " +DateDeces.substring(1);
            } else DateDeces = "";

            var deces = "";
            if (LieuDeces !== "" && DateDeces !== "") {
                deces = "<i class='fas fa-skull-crossbones'></i> "+LieuDeces+ " en "+DateDeces;
            } else if (LieuDeces !== "" && DateDeces === "") {
                deces = "<i class='fas fa-skull-crossbones'></i> "+LieuDeces;
            } else if (LieuDeces === "" && DateDeces !== "") {
                deces = "<i class='fas fa-skull-crossbones'></i> "+DateDeces;
            }

            if (typeof record.P1441 !== 'undefined') {
                var oeuvre = record.P1441[0].label;
            } else oeuvre = "";

            if (typeof record.P18 !== 'undefined' && typeof record.P18[0] !== 'undefined' && typeof record.P18[0].image !== 'undefined') {
                var portrait = record.P18[0].image;
            } else {portrait = null;} //"img/portrait.png"

            console.log(portrait);
            if(portrait !== null) {
                console.log("push");
                cards_persons.push(
                    "<div class='card border-dark card-large-border' style='width: 18rem'>" +
                        "<img class='card-img-top' src='" + portrait + "' alt='Portait de " + nom + "'>" +
                        "<div class='card-body'>" +
                            "<h5 class='card-title'>" + nom + "<small>" + metier + "</small></h5>" +
                            "<p class='card-text mb-0'>" + record.description + " </p>" +
                            "<p class='card-text mb-0'>" + LieuNaissance + " </p>" +
                            "<p>" + deces + "</p>" +
                            "<span class='btn btn-primary'>" + oeuvre + "</span>" +
                            "<hr />" +
                            "<div class='text-center'>Héros | Opposant | Adjuvant</div>" +
                        "</div>" +
                    "</div>"
                );
            }

        });
    });

    $("#lauch-form").click(function () {
        $('#section-form').removeClass("d-none");
        $('#section-intro   ').addClass("d-none");
    });

    $("#lauch-form-2").click(function () {
        $('#section-form').addClass("d-none");
        $('#section-form-2').removeClass("d-none");
    });

    $("#lauch-docs").click(function () {
        $('#docs').removeClass("d-none");
        $('#section-form-2').addClass("d-none");
    });

    $("#lauch-cards").click(function () {
        $('#docs').addClass("d-none");
        $('#cards-container-div').removeClass("d-none");
        console.log("Launch button clicked");

        cards_actions = shuffle(cards_actions);
        cards_periods = shuffle(cards_periods);
        cards_persons = shuffle(cards_persons);
        cards_places = shuffle(cards_places);

        var cards = [cards_actions[0], cards_actions[2], cards_periods[1], cards_periods[0], cards_persons[0], cards_persons[1], cards_places[0], cards_places[1]]
        cards = shuffle(cards);

        $.each(cards, function (i, record) {
            $('#cards-container').append(record);
        });

    });

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

});
