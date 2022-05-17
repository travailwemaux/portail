var data = {
    "application": [
        ["ActiPrint", "Commande de linge", "fa-shirt", "http://actiprint.ch-roubaix.fr/Commandes/Login.aspx"],
        ["Ambulances", "Transports sanitaires", "fa-truck-medical", "https://transports.ch-roubaix.fr/PtahUf3/"],
        ["APM", "Site d'actualités", "fa-rss", "https://www.apmnews.com/"],
        ["Ariane", "Archives des dossiers patient", "fa-folder", "http://rbx-srv-arc-p01.ch-roubaix.fr/ariane"],
        ["Bibliothèque", "Bibliothèque médicale", "fa-book-medical", "http://tracebloc.ch-roubaix.fr/csp/quest187/biblio.csp"],
        ["BI4", "Magh2 / Agirh / Pastel", "fa-chart-pie", "http://bi4-inf.ch-roubaix.fr:34080/BOE/BI"],
        ["Bilan SMUR", "&nbsp;", "fa-kit-medical", "https://bilan.bisom.fr/public/bilan"],
        ["Brancardages", "Transports internes", "fa-wheelchair", "https://transports.ch-roubaix.fr/PtahUf3/"],
        ["Catalogue labo", "Analyses laboratoire", "fa-flask", "http://catanalyse.ch-roubaix.fr/"],
        ["Certificat décès", "&nbsp;", "fa-book-skull", "https://sic.certdc.inserm.fr/accueil_public.php?cd=1"],
        ["Chimio web", "&nbsp;", "fa-radiation", "http://chimio.ch-roubaix.fr/chimio/"],
        ["Habilitations", "Demande d'habilitations", "fa-user-plus", "https://glpi.ch-roubaix.fr/marketplace/formcreator/front/formdisplay.php?id=2"],

        ["Ennov", "Evénement indésirable", "fa-circle-exclamation", "http://ennov.ch-roubaix.fr/ennov/psprod/document/new?idTypeUnit=160635"],
        ["E-planning", "Planning du personnel", "fa-calendar", "http://agirh.ch-roubaix.fr:40100/"],
        ["Ext. Tourcoing", "Extranet CH-Tourcoing", "fa-network-wired", "https://extranet.ch-tourcoing.fr/"],
        ["GED", "Gestion documentaire", "fa-book", "http://ged.ch-roubaix.fr/"],
        ["Grippe", "Déclaration cas de grippe", "fa-bacterium", "http://mephisto.ch-roubaix.fr/grippe/vitefait_prog/grippe_prog"],
        ["HMSTE", "Gestion de la stérilisation", "fa-hands-bubbles", "http://c2788-amprod.ch-roubaix.fr/STE/"],
        ["Hospitalis", "Achat et approvisionnement", "fa-money-check-dollar", "https://new.hospitalis.org/"],
        ["IMC", "Calcul d'un IMC", "fa-calculator", "http://mods.ch-roubaix.fr/imc"],
        ["PMSIpilot", "Pilotage médico-éco", "fa-chart-line", "http://pmsipilot.ch-roubaix.fr/"],
        ["Roublac", "Recherche d'un code CCAM", "fa-magnifying-glass", "http://tracebloc.ch-roubaix.fr/csp/bloc/menuccambloc.csp?sessionID=14948230:36b7"],
    ],
    "icons": "fa-solid"
}

/*--------------------*/
/* CREATION DES CARDS */
/*--------------------*/
$(document).ready(function () {

    var cardIconStyle = data.icons

    for (i in data.application) {

        var cardTitle = data.application[i][0]
        var cardDescription = data.application[i][1]
        var cardIcon = data.application[i][2]
        var cardUrl = data.application[i][3]

        //$("#list").append('<div class="list-item box column is-one-quarter"><div class="list-item-image"><span class="icon"><i class="fas '+cardIcon+'"></i></span></div><div class="list-item-content"><div class="list-item-title"><div class="list-item-title is-flex is-justify-content-space-between"><span>'+cardTitle+'</span></div></div><div class="list-item-description">'+cardDescription+'</div></div><div class="list-item-controls is-hidden-mobile"><div class="buttons"><button class="button is-dark is-inverted"><span class="icon"><i class="fas fa-star"></i></span></button></div></div></div>');

        $("#columns").append('<div class="column is-one-fifth" data-name="' + cardTitle + '"><div class="card-content box"><div class="media"><div class="media-left"><span class="icon" title="Ajouter aux favoris"><i class="' + cardIconStyle + ' ' + cardIcon + '"></i></span></div><div class="media-content"><p class="title is-5" onClick="window.open(\'' + cardUrl + '\')">' + cardTitle + '</p><p class="subtitle is-7">' + cardDescription + '</p></div></div></div>');

    }

    $('.icon').click(function () {

        $(this).toggleClass("icon-selected");
        $(this).parents(".box").toggleClass("card-selected");

        if ($(this).hasClass("icon-selected")) {
            $(this).attr("title", "Supprimer des favoris");
            $(this).parents(".column").appendTo("#columns-selected");

            var divList = $("#columns-selected .is-one-fifth");
            divList.sort(function (a, b) {
                return String.prototype.localeCompare.call($(a).data('name').toLowerCase(), $(b).data('name').toLowerCase());
            });
            $("#columns-selected").append(divList);

            /* ADD LOCAL STORAGE */
            let ls_cardsSelected = JSON.parse(localStorage.getItem("cards-selected")) || [];
            let newItem = {
                name: $(this).parents(".column").data('name')
            };
            ls_cardsSelected.push(newItem);

            localStorage.setItem("cards-selected", JSON.stringify(ls_cardsSelected));

        }
        else {
            $(this).attr("title", "Ajouter aux favoris");
            $(this).parents(".column").appendTo("#columns");

            var divList = $("#columns .is-one-fifth");
            divList.sort(function (a, b) {
                return String.prototype.localeCompare.call($(a).data('name').toLowerCase(), $(b).data('name').toLowerCase());
            });
            $("#columns").append(divList);

            /* DELETE LOCAL STORAGE */
            let ls_cardsSelected = localStorage.getItem("cards-selected");
            
            console.log(ls_cardsSelected);
        }

    });
});

