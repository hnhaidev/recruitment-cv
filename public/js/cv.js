document.querySelector("#page").contentEditable = true;
document.querySelector("#noEdit").contentEditable = false;

function formatDoc(sCmd, sValue) {
  document.execCommand(sCmd, false, sValue);
}

$("#file-img").on("change", function () {
  $("#img-avatar").attr("src", URL.createObjectURL(this.files[0]));
});
const cw = $(".add-img").width();
$(".add-img").css({ height: cw + "px" });

$('input[name="sectionToggle"]').change(function () {
  toggleSection($(this).val(), $(this).is(":checked"));
});

function toggleSection(sectionName, toggleState) {
  if (toggleState == true)
    $('input[value="' + sectionName + '"]').attr("checked", "true");
  else $('input[value="' + sectionName + '"]').removeAttr("checked");
  $("#" + sectionName).toggle();
}

function formatFont(sValue) {
  if (sValue == "fontRoboto")
    $("#page")
      .removeClass("fontArimo")
      .removeClass("fontNotoSans")
      .removeClass("fontNotoSerif")
      .removeClass("fontMontserrat")
      .removeClass("fontSourceSansPro")
      .removeClass("fontJosefinSans")
      .addClass("fontRoboto");
  else if (sValue == "fontArimo")
    $("#page")
      .removeClass("fontRoboto")
      .removeClass("fontNotoSans")
      .removeClass("fontNotoSerif")
      .removeClass("fontMontserrat")
      .removeClass("fontSourceSansPro")
      .removeClass("fontJosefinSans")
      .addClass("fontArimo");
  else if (sValue == "fontNotoSans")
    $("#page")
      .removeClass("fontRoboto")
      .removeClass("fontArimo")
      .removeClass("fontNotoSerif")
      .removeClass("fontMontserrat")
      .removeClass("fontSourceSansPro")
      .removeClass("fontJosefinSans")
      .addClass("fontNotoSans");
  else if (sValue == "fontNotoSerif")
    $("#page")
      .removeClass("fontRoboto")
      .removeClass("fontNotoSans")
      .removeClass("fontArimo")
      .removeClass("fontMontserrat")
      .removeClass("fontSourceSansPro")
      .removeClass("fontJosefinSans")
      .addClass("fontNotoSerif");
  else if (sValue == "fontMontserrat")
    $("#page")
      .removeClass("fontRoboto")
      .removeClass("fontNotoSans")
      .removeClass("fontArimo")
      .removeClass("fontNotoSerif")
      .removeClass("fontSourceSansPro")
      .removeClass("fontJosefinSans")
      .addClass("fontNotoSerif");
  else if (sValue == "fontSourceSansPro")
    $("#page")
      .removeClass("fontRoboto")
      .removeClass("fontNotoSans")
      .removeClass("fontArimo")
      .removeClass("fontMontserrat")
      .removeClass("fontNotoSerif")
      .removeClass("fontJosefinSans")
      .addClass("fontSourceSansPro");
  else if (sValue == "fontJosefinSans")
    $("#page")
      .removeClass("fontRoboto")
      .removeClass("fontNotoSans")
      .removeClass("fontArimo")
      .removeClass("fontMontserrat")
      .removeClass("fontNotoSerif")
      .removeClass("fontSourceSansPro")
      .addClass("fontJosefinSans");
}

// btn-test----------------------------------------------------------- //

$("#btn-update-namecv").click(function (e) {
  e.preventDefault();
  $("#namecv").text($("#name-cv").val());
  $("#jobcv").text($("#job-cv").val());
});

$("#btn-contact-cv").click(function (e) {
  e.preventDefault();
  $("#dobcv").text($("#dob-cv").val());
  $("#sexcv").text($("#sex-cv").val());
  $("#phonecv").text($("#phone-cv").val());
  $("#emailcv").text($("#email-cv").val());
  $("#addresscv").text($("#address-cv").val());
  $("#webcv").text($("#web-cv").val());
});

$("#btn-target-cv").click(function (e) {
  e.preventDefault();
  $("#targetcontentcv").text($("#target-content-cv").val());
});

//-----//
$("#btn-update-skill").click(function (e) {
  e.preventDefault();
  $("#skillcv").empty();
  let valskill = $("#skill-cv-c").val();
  console.log(valskill);
  $("#skillcv").html(`<li>${valskill} </li>`);
});
$("#btn-add-skill").click(function (e) {
  e.preventDefault();
  let valskill2 = $("#skill-cv-c").val();
  $(`<li>${valskill2} </li>`).appendTo("#skillcv");
});

//-----//
$("#btn-update-interests").click(function (e) {
  e.preventDefault();
  $("#interestscv").empty();
  let valskill = $("#interests-cv-c").val();
  console.log(valskill);
  $("#interestscv").html(`<li>${valskill} </li>`);
});
$("#btn-add-interests").click(function (e) {
  e.preventDefault();
  let valskill2 = $("#interests-cv-c").val();
  $(`<li>${valskill2} </li>`).appendTo("#interestscv");
});

//-----------------------//

$("#btn-add-content").click(function (e) {
  e.preventDefault();
  let valphus = $("#education-cv-c3").val();
  $("#education-cv-c3").val(valphus + "+");
});

$("#btn-update-education").click(function (e) {
  e.preventDefault();
  $("#educationcv").empty();
  let val1 = $("#education-cv-c1").val();
  let val2 = $("#education-cv-c2").val();
  let val3 = $("#education-cv-c3").val().split("+");
  $("#educationcv").html(`
  <span><b>${val1}</b></span>
  <span class="title-c2"
    ><i>${val2}</i></span
  >
  <ul class="val3">
  </ul>`);
  if (val3.length > 1) {
    val3.map((v) => {
      $(`<li>${v} </li>`).appendTo(".val3");
    });
  } else {
    $(`<li>${val3} </li>`).appendTo(".val3");
  }
});
$("#btn-add-education").click(function (e) {
  e.preventDefault();
  let val1 = $("#education-cv-c1").val();
  let val2 = $("#education-cv-c2").val();
  let val3 = $("#education-cv-c3").val().split("+");
  let check = "";

  if (val3.length > 1) {
    val3.map((v) => {
      check = check + `<li>${v} </li>`;
    });
  } else {
    check = check + `<li>${val3} </li>`;
  }

  if (val1.trim() !== "")
    $(`<span><b>${val1}</b></span>
    <span class="title-c2"
      ><i>${val2}</i></span
    >
    <ul class="val3">
    ${check}
    </ul>`).appendTo("#educationcv");
});

//-----------------------//
$("#btn-certificate-c3").click(function (e) {
  e.preventDefault();
  let valphus = $("#certificate-cv-c3").val();
  $("#certificate-cv-c3").val(valphus + "+");
});

$("#btn-update-certificate").click(function (e) {
  e.preventDefault();
  let val1 = $("#certificate-cv-c1").val();
  let val2 = $("#certificate-cv-c2").val();
  let val3 = $("#certificate-cv-c3").val().split("+");
  $("#certificatecv").empty();
  $(".certificatecv-2").empty();

  $("#certificatecv").html(`
  <span><b>${val1}</b></span>
  <span class="title-c2"
    ><i>${val2}</i></span
  >
  <ul class="val3">
  </ul>`);
  if (val3.length > 1) {
    val3.map((v) => {
      $(`<li>${v} </li>`).appendTo(".val3");
    });
  } else {
    $(`<li>${val3} </li>`).appendTo(".val3");
  }
});
$("#btn-add-certificate").click(function (e) {
  e.preventDefault();
  $(".certificatecv-2").empty();
  let val1 = $("#certificate-cv-c1").val();
  let val2 = $("#certificate-cv-c2").val();
  let val3 = $("#certificate-cv-c3").val().split("+");
  let check = "";

  if (val3.length > 1) {
    val3.map((v) => {
      check = check + `<li>${v} </li>`;
    });
  } else {
    check = check + `<li>${val3} </li>`;
  }

  if (val1.trim() !== "")
    $(`<span><b>${val1}</b></span>
    <span class="title-c2"
      ><i>${val2}</i></span
    >
    <ul class="val3">
    ${check}
    </ul>`).appendTo("#certificatecv");
});

//-----------------------//
$("#btn-activate-c3").click(function (e) {
  e.preventDefault();
  let valphus = $("#activate-cv-c3").val();
  $("#activate-cv-c3").val(valphus + "+");
});

$("#btn-update-activate").click(function (e) {
  e.preventDefault();
  let val1 = $("#activate-cv-c1").val();
  let val2 = $("#activate-cv-c2").val();
  let val3 = $("#activate-cv-c3").val().split("+");
  $("#activatecv").empty();

  $("#activatecv").html(`
  <span><b>${val1}</b></span>
  <span class="title-c2"
    ><i>${val2}</i></span
  >
  <ul class="val3">
  </ul>`);
  if (val3.length > 1) {
    val3.map((v) => {
      $(`<li>${v} </li>`).appendTo(".val3");
    });
  } else {
    $(`<li>${val3} </li>`).appendTo(".val3");
  }
});
$("#btn-add-activate").click(function (e) {
  e.preventDefault();
  let val1 = $("#activate-cv-c1").val();
  let val2 = $("#activate-cv-c2").val();
  let val3 = $("#activate-cv-c3").val().split("+");
  let check = "";

  if (val3.length > 1) {
    val3.map((v) => {
      check = check + `<li>${v} </li>`;
    });
  } else {
    check = check + `<li>${val3} </li>`;
  }

  if (val1.trim() !== "")
    $(`<span><b>${val1}</b></span>
    <span class="title-c2"
      ><i>${val2}</i></span
    >
    <ul class="val3">
    ${check}
    </ul>`).appendTo("#activatecv");
});

//-----//
$("#btn-update-translate").click(function (e) {
  e.preventDefault();
  $("#translatecv").empty();
  let valskill = $("#translate-cv-c").val();
  console.log(valskill);
  $("#translatecv").html(`<li>${valskill} </li>`);
});
$("#btn-add-translate").click(function (e) {
  e.preventDefault();
  let valskill2 = $("#translate-cv-c").val();
  $(`<li>${valskill2} </li>`).appendTo("#translatecv");
});

$(function () {
  $.get("/editor/formcv", (data) => {
    data.map((val, idx) => {
      $(`
      <div class="carousel-item ${idx === 0 ? "active" : ""}">
        <a href=${val.path}>
          <img src=${val.img} class="d-block w-100">
        </a>
      </div>
      `).appendTo("#list-form");
    });
  });
});
