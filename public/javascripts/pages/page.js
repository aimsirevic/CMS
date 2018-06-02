var removeDiacritics = require('diacritics').remove;
var mainPageExists = false;
var mainPage = false;

$(function () {

    getFilesByFolderAjax("/pages/add/FileManager");

    $("#pageName").keyup(function () {
        console.log("pageURL");
        if (!$('#pageURL').val()) {
            $("#urlOutput").val(optimizeURL($('#pageName').val()));
        }
    });

    $("#pageURL").keyup(function () {
        $("#urlOutput").val(optimizeURL($('#pageURL').val()));
    });

    var optimizeURL = function (url) {
        var optimizedURL = url.toLowerCase();
        optimizedURL = removeDiacritics(optimizedURL);
        optimizedURL = optimizedURL.replace(/[^a-zA-Z0-9- ]/g, '');
        optimizedURL = optimizedURL.split(' ').join('-');
        return optimizedURL;
    }

    function getFilesByFolderAjax(path) {
        $.ajax({
            type: 'GET',
            url: path,
            success: function (data) {
                console.log(data);
                setFileChooser(data);
            }
        });
    }
    function thisPageIsMain(pageid) {
        $.ajax({
            async: false,
            type: 'POST',
            url: '/pages/mainPage/' + pageid,
            contentType: "application/json",
            success: function (data) {
                console.log("thisPageIsMain (true/false): " + JSON.stringify(data));
                setMainPage(JSON.stringify(data));
            }
        });
    }
    function checkIfMainPageExistsAjax() {
        $.ajax({
            async: false,
            type: 'GET',
            url: '/pages/mainPage',
            contentType: "application/json",
            success: function (data) {
                console.log("checkIfMainPageExistsAjax (true/false): " + JSON.stringify(data));
                setMainPageExists(JSON.stringify(data));
            }
        });
    }
    function setMainPageExists(_mainPageExists){
        console.log("setting main page exists " + _mainPageExists + " " + typeof _mainPageExists);
        if(_mainPageExists === "true"){
            mainPageExists = true;
            console.log("set main page exists " + mainPageExists + " " + typeof mainPageExists);
        }else{
            mainPageExists = false;
            console.log("set main page exists " + mainPageExists + " " + typeof mainPageExists);
        }
        console.log("I have set main Page exist to " +mainPageExists );
    }
    function setMainPage(_mainPage){
        console.log("setting main page " + _mainPage + " " + typeof _mainPage);
        if(_mainPage === "true"){
            mainPage = true;
            console.log("set main page " + mainPage + " " + typeof mainPage);
        }else{
            mainPage = false;
            console.log("set main page " + mainPage + " " + typeof mainPage);
        }
        console.log("I have set main Page to " + mainPage);
    }
    function unsetMainPageAjax() {
        $.ajax({
            type: 'GET',
            url: '/pages/mainPage/unset'
        });
    }

    function setFileChooser(data) {
        setBackButton(data.folderSettings.backButton);
        setBreadCrumb(data.folderSettings.breadcrumb);
        listFiles(data.files);
    }
    function setBackButton(link) {
        if (link.link && link.text) {
            var htmlLink = "<a href='" + link.link + "'>" + link.text + "</a>";
            $("#back").html(htmlLink);
            addListenersToLinksInsideElement('#back');
        }
    }
    function setBreadCrumb(links) {
        var htmlLinks = "";
        $.each(links, function (i, link) {
            htmlLinks += "<a href='" + link.link + "'>" + link.text + "</a> / ";
        });
        $("#breadcrumb").html(htmlLinks);
        addListenersToLinksInsideElement("#breadcrumb");
    }
    function listFiles(files) {
        var htmlFiles = "";
        if (files.length === 0) {
            htmlFiles = "<p style='width: 100%;text-align:center'>This folder is empty.</p>";
        } else {
            $.each(files, function (i, file) {
                if (file.type == "file" && file.fileType == "image") {
                    htmlFiles += "<div class='col-xs-4 col-sm-3 col-md-2 nopad text-center'>";
                    htmlFiles += "<label class='image-checkbox'>";
                    htmlFiles += "<img class='img-responsive' src='" + file.parentWithoutHome + "/thumb_" + file.name + "' />";
                    htmlFiles += "<input type='checkbox' value='" + file.parentWithoutHome + "/" + file.name + "' name='check_img' class='check_img'/>"
                    htmlFiles += "<i class='fa fa-check hidden'></i>";
                    htmlFiles += "</label>";
                    htmlFiles += "</div>";
                } else if (file.type == "folder") {
                    htmlFiles += "<div class='col-xs-4 col-sm-3 col-md-2 nopad text-center folder'>";
                    htmlFiles += "<a href='" + file.link + "'><label class='image-checkbox'>";
                    htmlFiles += "<img class='img-responsive' src='https://dummyimage.com/600x400/000/fff' />";
                    htmlFiles += "</label></a>";
                    htmlFiles += "</div>";
                }
            });
        }
        $("#files").html(htmlFiles);
        setListenersForFileListing();
    }

    function setListenersForFileListing() {
        $('.check_img').on('change', function () {
            $('.check_img').not(this).prop('checked', false);
            $(this).prop('checked', true);
            $('.check_img').parent().removeClass('image-checkbox-checked')
            $(this).parent().addClass('image-checkbox-checked');

            /*$('input[name="check_img"]:checked').each(function() {
                console.log(this.value);
            });*/
        });

        addListenersToLinksInsideElement(".folder");
    }

    function addListenersToLinksInsideElement(element) {
        $(element + ' a').each(function () {
            $(this).on('click', function (e) {
                e.preventDefault();
                var href = $(this).attr('href');
                getFilesByFolderAjax(href);
            });
        });
    }

    $("#choose_image").on('click', function () {
        var checked_field = $('input[name="check_img"]:checked');
        if (checked_field.val()) {
            $('#image_file').val(checked_field.val());
            $('#fileChooser').modal('hide');
            checked_field.prop('checked', false).parent().removeClass('image-checkbox-checked');
        } else {
            $('#error_choosing_image').html("You have to select image.");
        }
    });
/*
    $('#pagesForm').submit(function () {
        if ($('#pageMain').val() == 'true') {
            console.log("TRUEE");
            //ADD
            var mainPage = getMainPageAjax();
            if (mainPage) {
                $('#mainPageYES').on('click', function(){
                    unsetMainPage();
                    $('#mainPageModal').modal('hide');
                });
                $('#mainPageYES').on('click', function(){
                    $('#pageMain').val('false')
                    $('#mainPageModal').modal('hide');
                });
                $('#mainPageModal').modal('show');
            }
        }else{
            console.log("fALSE");
        }
        return true;
    });*/
    $('#submitPageForm').on('click', function(){
         console.log("1");
        if ($('#pageMain').val() == 'true') {
            console.log("2:a");
            if($('#pageID').val()){
                console.log("2:a:1");
                thisPageIsMain($('#pageID').val());
                console.log("this is main page" + typeof mainPage)
                if(mainPage){
                    console.log("2:a:1:a");
                    $('#pagesForm').submit();
                }
            }
            checkIfMainPageExistsAjax();
            console.log("this is main page exists" + mainPageExists)
            if (mainPageExists) {
                console.log("3:a");
                $('#mainPageNO').on('click', function(){
                    $('#pageMain').val('false')
                    $('#mainPageModal').modal('hide');
                    $('#pagesForm').submit();
                    console.log("NO");
                });
                $('#mainPageYES').on('click', function(){
                    unsetMainPageAjax();
                    $('#mainPageModal').modal('hide');
                    $('#pagesForm').submit();
                    console.log("YES");
                });
                $('#mainPageModal').modal('show');
            }else{
                console.log("3:b");
                $('#pagesForm').submit();
            }
        }else{
            console.log("2:b");
            $('#pagesForm').submit();
        } 
    });
});

