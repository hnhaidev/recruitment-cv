$(document).ready(function () {
  $.get("/admin/alluser", (data) => {
    $("#alluser").text(`${data.length} Tài Khoản`);
  });

  $.get("/searchTD/listtd", (data) => {
    $("#listtd").text(`${data.length} Bài đăng`);
  });

  $.get("/searchCV/listcv", (data) => {
    $("#listcv").text(`${data.length} Bài đăng`);
  });

  $.get("/admin/allformcv", (data) => {
    $("#allformcv").text(`${data.length} Mẫu`);
  });

  $(".list-header").on({
    mouseenter: () => {
      $(this).css("background-color", "lightgray");
    },
    mouseleave: () => {
      $(this).css("background-color", "lightblue");
    },
  });
  // cv
  $.get("/searchCV/listcv", function (data) {
    var dataCV = data.map((val) => {
      return {
        name: val.name,
        codeCity: val.codeCity,
        job: val.job,
        phone: val.phone,
        bt: `<button class="btn btn-danger btn-sm btn-delete-cv" data-id="${val._id}"> xóa </button>`,
      };
    });
    $(".table-cv").DataTable({
      processing: true,
      data: dataCV,
      columns: [
        { data: "name" },
        { data: "codeCity" },
        { data: "job" },
        { data: "phone" },
        { data: "bt" },
      ],
    });
  });

  //td
  $.get("/searchTD/listtd", function (data) {
    var dataTD = data.map((val) => {
      return {
        nameCompany: val.nameCompany,
        codeCity: val.codeCity,
        job: val.job,
        salary: val.salary,
        bt: `<button class="btn btn-danger btn-sm btn-delete-td" data-id="${val._id}"> xóa </button>`,
      };
    });
    $(".table-td").DataTable({
      processing: true,
      data: dataTD,
      columns: [
        { data: "nameCompany" },
        { data: "codeCity" },
        { data: "job" },
        { data: "salary" },
        { data: "bt" },
      ],
    });
  });

  $.get("/admin/allformcv", function (data) {
    var dataTD = data.map((val) => {
      return {
        img: `<img src=${val.img} height="100" width="100" />`,
        path: val.path,
        bt: `<button class="btn btn-danger btn-sm btn-delete-td" data-id="${val._id}"> xóa </button>`,
      };
    });
    $("#table-formcv").DataTable({
      processing: true,
      data: dataTD,
      columns: [{ data: "img" }, { data: "path" }, { data: "bt" }],
    });
  });

  $("body").on("click", ".btn-delete-cv", function () {
    let idx = $(this).data("id");
    $.ajax({
      type: "DELETE",
      url: "/postCV/" + idx,
    })
      .then((data) => {
        if (data) alert("Xóa thành công !");
        location.reload();
      })
      .catch((error) => {
        alert(error.responseText);
        console.log(error.responseText);
      });
  });

  $("body").on("click", ".btn-delete-td", function () {
    let idx = $(this).data("id");
    $.ajax({
      type: "DELETE",
      url: "/postTD/" + idx,
    })
      .then((data) => {
        if (data) alert("Xóa thành công !");
        location.reload();
      })
      .catch((error) => {
        alert(error.responseText);
        console.log(error.responseText);
      });
  });
});
