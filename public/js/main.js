$(function () {
  // check token
  function checkUser() {
    if (document.cookie.match(/^(.*;)?\s*token\s*=\s*[^;]+(.*)?$/)) {
      $.ajax({
        type: "GET",
        url: "/user",
      })
        .then((data) => {
          $(".btn-login").hide();
          $(".btn-user").show();

          let name = data.name;
          $("#btn-username").text(name);

          if (data.role === "employer") {
            $("#nav-searchTD").hide();
            $("#nav-postCV").hide();
            $("#nav-editor").hide();
            $("#nav-searchCV").show();
            $("#nav-postTD").show();
          }
        })
        .catch((err) => {
          $(".btn-login").show();
          $("#nav-searchTD").show();
          $("#nav-postCV").show();
          $("#nav-editor").show();

          $(".btn-user").hide();
          $("#nav-searchCV").hide();
          $("#nav-postTD").hide();
        });
    }
  }
  checkUser();

  //logout
  $("#btn-logout").click(function (e) {
    e.preventDefault();
    delete_cookie("token");
    location.reload();
  });

  // back to top
  const btnBackToTop = $("#btn-back-to-top");

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btnBackToTop.addClass("show");
    } else {
      btnBackToTop.removeClass("show");
    }
  });

  btnBackToTop.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
  });

  $("#thongke").click(function (e) {
    e.preventDefault();
    $(this).addClass("active");
    $("#maucv").removeClass("active");
    $("#postungvien").removeClass("active");
    $("#posttuyendung").removeClass("active");

    $(".maucv").hide();
    $(".thongke").show();
    $(".postungvien").hide();
    $(".posttuyendung").hide();
  });

  $("#maucv").click(function (e) {
    e.preventDefault();
    $(this).addClass("active");
    $("#thongke").removeClass("active");
    $("#postungvien").removeClass("active");
    $("#posttuyendung").removeClass("active");

    $(".maucv").show();
    $(".thongke").hide();
    $(".postungvien").hide();
    $(".posttuyendung").hide();
  });

  $("#postungvien").click(function (e) {
    e.preventDefault();
    $(this).addClass("active");
    $("#thongke").removeClass("active");
    $("#maucv").removeClass("active");
    $("#posttuyendung").removeClass("active");

    $(".maucv").hide();
    $(".thongke").hide();
    $(".postungvien").show();
    $(".posttuyendung").hide();
  });

  $("#posttuyendung").click(function (e) {
    e.preventDefault();
    $(this).addClass("active");
    $("#thongke").removeClass("active");
    $("#postungvien").removeClass("active");
    $("#maucv").removeClass("active");

    $(".maucv").hide();
    $(".thongke").hide();
    $(".postungvien").hide();
    $(".posttuyendung").show();
  });
});

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }
  return decodeURI(dc.substring(begin + prefix.length, end));
}
function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

//
