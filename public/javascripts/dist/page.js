!function(a){var e={};function s(c){if(e[c])return e[c].exports;var r=e[c]={i:c,l:!1,exports:{}};return a[c].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=a,s.c=e,s.d=function(a,e,c){s.o(a,e)||Object.defineProperty(a,e,{configurable:!1,enumerable:!0,get:c})},s.r=function(a){Object.defineProperty(a,"__esModule",{value:!0})},s.n=function(a){var e=a&&a.__esModule?function(){return a.default}:function(){return a};return s.d(e,"a",e),e},s.o=function(a,e){return Object.prototype.hasOwnProperty.call(a,e)},s.p="",s(s.s=2)}([,function(a,e){e.remove=function(a){return a.replace(/[^\u0000-\u007e]/g,function(a){return c[a]||a})};for(var s=[{base:" ",chars:" "},{base:"0",chars:"߀"},{base:"A",chars:"ⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ"},{base:"AA",chars:"Ꜳ"},{base:"AE",chars:"ÆǼǢ"},{base:"AO",chars:"Ꜵ"},{base:"AU",chars:"Ꜷ"},{base:"AV",chars:"ꜸꜺ"},{base:"AY",chars:"Ꜽ"},{base:"B",chars:"ⒷＢḂḄḆɃƁ"},{base:"C",chars:"ⒸＣꜾḈĆCĈĊČÇƇȻ"},{base:"D",chars:"ⒹＤḊĎḌḐḒḎĐƊƉᴅꝹ"},{base:"Dh",chars:"Ð"},{base:"DZ",chars:"ǱǄ"},{base:"Dz",chars:"ǲǅ"},{base:"E",chars:"ɛⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎᴇ"},{base:"F",chars:"ꝼⒻＦḞƑꝻ"},{base:"G",chars:"ⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾɢ"},{base:"H",chars:"ⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ"},{base:"I",chars:"ⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ"},{base:"J",chars:"ⒿＪĴɈȷ"},{base:"K",chars:"ⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ"},{base:"L",chars:"ⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ"},{base:"LJ",chars:"Ǉ"},{base:"Lj",chars:"ǈ"},{base:"M",chars:"ⓂＭḾṀṂⱮƜϻ"},{base:"N",chars:"ꞤȠⓃＮǸŃÑṄŇṆŅṊṈƝꞐᴎ"},{base:"NJ",chars:"Ǌ"},{base:"Nj",chars:"ǋ"},{base:"O",chars:"ⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ"},{base:"OE",chars:"Œ"},{base:"OI",chars:"Ƣ"},{base:"OO",chars:"Ꝏ"},{base:"OU",chars:"Ȣ"},{base:"P",chars:"ⓅＰṔṖƤⱣꝐꝒꝔ"},{base:"Q",chars:"ⓆＱꝖꝘɊ"},{base:"R",chars:"ⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ"},{base:"S",chars:"ⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ"},{base:"T",chars:"ⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ"},{base:"Th",chars:"Þ"},{base:"TZ",chars:"Ꜩ"},{base:"U",chars:"ⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ"},{base:"V",chars:"ⓋＶṼṾƲꝞɅ"},{base:"VY",chars:"Ꝡ"},{base:"W",chars:"ⓌＷẀẂŴẆẄẈⱲ"},{base:"X",chars:"ⓍＸẊẌ"},{base:"Y",chars:"ⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ"},{base:"Z",chars:"ⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ"},{base:"a",chars:"ⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐɑ"},{base:"aa",chars:"ꜳ"},{base:"ae",chars:"æǽǣ"},{base:"ao",chars:"ꜵ"},{base:"au",chars:"ꜷ"},{base:"av",chars:"ꜹꜻ"},{base:"ay",chars:"ꜽ"},{base:"b",chars:"ⓑｂḃḅḇƀƃɓƂ"},{base:"c",chars:"ｃⓒćĉċčçḉƈȼꜿↄ"},{base:"d",chars:"ⓓｄḋďḍḑḓḏđƌɖɗƋᏧԁꞪ"},{base:"dh",chars:"ð"},{base:"dz",chars:"ǳǆ"},{base:"e",chars:"ⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇǝ"},{base:"f",chars:"ⓕｆḟƒ"},{base:"ff",chars:"ﬀ"},{base:"fi",chars:"ﬁ"},{base:"fl",chars:"ﬂ"},{base:"ffi",chars:"ﬃ"},{base:"ffl",chars:"ﬄ"},{base:"g",chars:"ⓖｇǵĝḡğġǧģǥɠꞡꝿᵹ"},{base:"h",chars:"ⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ"},{base:"hv",chars:"ƕ"},{base:"i",chars:"ⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı"},{base:"j",chars:"ⓙｊĵǰɉ"},{base:"k",chars:"ⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ"},{base:"l",chars:"ⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇɭ"},{base:"lj",chars:"ǉ"},{base:"m",chars:"ⓜｍḿṁṃɱɯ"},{base:"n",chars:"ⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥлԉ"},{base:"nj",chars:"ǌ"},{base:"o",chars:"ⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿꝋꝍɵɔᴑ"},{base:"oe",chars:"œ"},{base:"oi",chars:"ƣ"},{base:"oo",chars:"ꝏ"},{base:"ou",chars:"ȣ"},{base:"p",chars:"ⓟｐṕṗƥᵽꝑꝓꝕρ"},{base:"q",chars:"ⓠｑɋꝗꝙ"},{base:"r",chars:"ⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ"},{base:"s",chars:"ⓢｓśṥŝṡšṧṣṩșşȿꞩꞅẛʂ"},{base:"ss",chars:"ß"},{base:"t",chars:"ⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ"},{base:"th",chars:"þ"},{base:"tz",chars:"ꜩ"},{base:"u",chars:"ⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ"},{base:"v",chars:"ⓥｖṽṿʋꝟʌ"},{base:"vy",chars:"ꝡ"},{base:"w",chars:"ⓦｗẁẃŵẇẅẘẉⱳ"},{base:"x",chars:"ⓧｘẋẍ"},{base:"y",chars:"ⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ"},{base:"z",chars:"ⓩｚźẑżžẓẕƶȥɀⱬꝣ"}],c={},r=0;r<s.length;r+=1)for(var o=s[r].chars,n=0;n<o.length;n+=1)c[o[n]]=s[r].base;e.replacementList=s,e.diacriticsMap=c},function(a,e,s){var c=s(1).remove,r=!1,o=!1;$(function(){e("/pages/add/FileManager"),$("#pageName").keyup(function(){console.log("pageURL"),$("#pageURL").val()||$("#urlOutput").val(a($("#pageName").val()))}),$("#pageURL").keyup(function(){$("#urlOutput").val(a($("#pageURL").val()))});var a=function(a){var e=a.toLowerCase();return e=(e=(e=c(e)).replace(/[^a-zA-Z0-9- ]/g,"")).split(" ").join("-")};function e(a){$.ajax({type:"GET",url:a,success:function(a){console.log(a),function(a){(function(a){if(a.link&&a.text){var e="<a href='"+a.link+"'>"+a.text+"</a>";$("#back").html(e),t("#back")}})(a.folderSettings.backButton),e=a.folderSettings.breadcrumb,s="",$.each(e,function(a,e){s+="<a href='"+e.link+"'>"+e.text+"</a> / "}),$("#breadcrumb").html(s),t("#breadcrumb"),function(a){var e="";0===a.length?e="<p style='width: 100%;text-align:center'>This folder is empty.</p>":$.each(a,function(a,s){"file"==s.type&&"image"==s.fileType?(e+="<div class='col-xs-4 col-sm-3 col-md-2 nopad text-center'>",e+="<label class='image-checkbox'>",e+="<img class='img-responsive' src='"+s.parentWithoutHome+"/thumb_"+s.name+"' />",e+="<input type='checkbox' value='"+s.parentWithoutHome+"/"+s.name+"' name='check_img' class='check_img'/>",e+="<i class='fa fa-check hidden'></i>",e+="</label>",e+="</div>"):"folder"==s.type&&(e+="<div class='col-xs-4 col-sm-3 col-md-2 nopad text-center folder'>",e+="<a href='"+s.link+"'><label class='image-checkbox'>",e+="<img class='img-responsive' src='https://dummyimage.com/600x400/000/fff' />",e+="</label></a>",e+="</div>")});$("#files").html(e),$(".check_img").on("change",function(){$(".check_img").not(this).prop("checked",!1),$(this).prop("checked",!0),$(".check_img").parent().removeClass("image-checkbox-checked"),$(this).parent().addClass("image-checkbox-checked")}),t(".folder")}(a.files);var e,s}(a)}})}function s(a){$.ajax({async:!1,type:"POST",url:"/pages/mainPage/"+a,contentType:"application/json",success:function(a){console.log("thisPageIsMain (true/false): "+JSON.stringify(a)),function(a){console.log("setting main page "+a+" "+typeof a),"true"===a?(o=!0,console.log("set main page "+o+" "+typeof o)):(o=!1,console.log("set main page "+o+" "+typeof o));console.log("I have set main Page to "+o)}(JSON.stringify(a))}})}function n(){$.ajax({async:!1,type:"GET",url:"/pages/mainPage",contentType:"application/json",success:function(a){console.log("checkIfMainPageExistsAjax (true/false): "+JSON.stringify(a)),function(a){console.log("setting main page exists "+a+" "+typeof a),"true"===a?(r=!0,console.log("set main page exists "+r+" "+typeof r)):(r=!1,console.log("set main page exists "+r+" "+typeof r));console.log("I have set main Page exist to "+r)}(JSON.stringify(a))}})}function t(a){$(a+" a").each(function(){$(this).on("click",function(a){a.preventDefault(),e($(this).attr("href"))})})}$("#choose_image").on("click",function(){var a=$('input[name="check_img"]:checked');a.val()?($("#image_file").val(a.val()),$("#fileChooser").modal("hide"),a.prop("checked",!1).parent().removeClass("image-checkbox-checked")):$("#error_choosing_image").html("You have to select image.")}),$("#submitPageForm").on("click",function(){console.log("1"),"true"==$("#pageMain").val()?(console.log("2:a"),$("#pageID").val()&&(console.log("2:a:1"),s($("#pageID").val()),console.log("this is main page"+typeof o),o&&(console.log("2:a:1:a"),$("#pagesForm").submit())),n(),console.log("this is main page exists"+r),r?(console.log("3:a"),$("#mainPageNO").on("click",function(){$("#pageMain").val("false"),$("#mainPageModal").modal("hide"),$("#pagesForm").submit(),console.log("NO")}),$("#mainPageYES").on("click",function(){$.ajax({type:"GET",url:"/pages/mainPage/unset"}),$("#mainPageModal").modal("hide"),$("#pagesForm").submit(),console.log("YES")}),$("#mainPageModal").modal("show")):(console.log("3:b"),$("#pagesForm").submit())):(console.log("2:b"),$("#pagesForm").submit())})})}]);