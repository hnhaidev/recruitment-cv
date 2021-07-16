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
        bt: `<button class="btn btn-danger btn-sm btn-delete-cv" data-id="${val._id}"> xóa </button>
        <button class="btn btn-primary btn-sm btn-watch-cv ms-2" data-id="${val._id}" data-bs-toggle="modal" data-bs-target='#watchcv'> xem </button>
        `,
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
        bt: `<button class="btn btn-danger btn-sm btn-delete-td" data-id="${val._id}"> xóa </button>
        <button class="btn btn-primary btn-sm btn-watch-td ms-2" data-id="${val._id}" data-bs-toggle="modal" data-bs-target='#watchtd'> xem </button>
        `,
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
        bt: `<button class="btn btn-danger btn-sm btn-delete-formcv" data-id="${val._id}"> xóa </button>`,
      };
    });
    var table = $("#table-formcv").DataTable({
      processing: true,
      data: dataTD,
      columns: [{ data: "img" }, { data: "path" }, { data: "bt" }],
    });
  });

  $("#post-cv").click(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/editor",
      data: {
        img: $("#img-cv").val(),
        path: $("#path-cv").val(),
      },
    }).then((data) => {
      if (data) {
        alert("Thêm thành công");
        $("#table-formcv").DataTable().ajax.reload();
      } else {
        alert("Thêm thất bại");
      }
    });
  });

  $("body").on("click", ".btn-delete-cv", function () {
    var choice = confirm("Bạn có chắc chắn muốn xóa không  ?");
    if (choice) {
      let idx = $(this).data("id");
      $.ajax({
        type: "DELETE",
        url: "/postCV/" + idx,
      })
        .then((data) => {
          if (data) alert(data);
          location.reload();
        })
        .catch((error) => {
          alert(error.responseText);
          console.log(error.responseText);
        });
    }
  });

  $("body").on("click", ".btn-delete-formcv", function () {
    var choice = confirm("Bạn có chắc chắn muốn xóa không  ?");
    if (choice) {
      let idx = $(this).data("id");
      $.ajax({
        type: "DELETE",
        url: "/editor/" + idx,
      })
        .then((data) => {
          if (data) alert(data);
          location.reload();
        })
        .catch((error) => {
          alert(error.responseText);
          console.log(error.responseText);
        });
    }
  });

  $("body").on("click", ".btn-delete-td", function () {
    var choice = confirm("Bạn có chắc chắn muốn xóa không  ?");
    if (choice) {
      let idx = $(this).data("id");
      $.ajax({
        type: "DELETE",
        url: "/postTD/" + idx,
      })
        .then((data) => {
          if (data) alert(data);
          location.reload();
        })
        .catch((error) => {
          alert(error.responseText);
          console.log(error.responseText);
        });
    }
  });

  $("body").on("click", ".btn-watch-cv", function () {
    let cvId = $(this).data("id");

    console.log(cvId);

    $.get("/searchCV/" + cvId, function (data) {
      let namecv = data.cv;
      console.log(data);

      $(".modal-content.hide-cv").empty();

      $(".modal-content.hide-cv").html(`<div class="row">
      <div class="col-9">
        <object
        data="${namecv}"
        type="application/pdf"
        width="100%"
        height="678"
        >
          <iframe src="${namecv}" width="100%" height="678">
            <p>This browser does not support PDF!</p>
          </iframe>
        </object>
      </div>
    <div class="col-3 bg-dark text-light p-4">
      <h5 class"pt-2">THÔNG TIN LIÊN HỆ</h5>
      <div style="font-size: 13px">
        <div class="pt-2">
          <b>Họ tên:</b> ${data.name}
        </div>
        <div class="pt-2">
          <b>Email:</b> ${data.email}
        </div>
        <div class="pt-1">
          <b>Số điện thoại:</b> ${data.phone}
        </div>
      </div>
      
    </div>
    </div>
    `);
    });
  });

  $("body").on("click", ".btn-watch-td", function () {
    let cvId = $(this).data("id");

    $.get("/searchTD/" + cvId, function (data) {
      $(".modal-content.hide-cv").empty();

      $(`<section class="p-2 modal-td" style="font-size: 12px">
					<section class="p-3">
						<h3>${data.job}</h3>
						<p>${data.nameCompany}</p>
						<div
							class="d-flex justify-content-between align-items-center top-td"
						>
							<div>
								<b>Hạn nộp hồ sơ:</b> ${data.dateEnd.substr(0, 10)}
							</div>
						</div>
					</section>
					<section class="p-3 pt-0">
						<div class=" top-td">
						<div class="row">
							<div class="col-6"><b>Mức lương:</b> ${data.salary}</div>
							<div class="col-6"><b>Địa điểm:</b> ${data.codeCity}</div>
							<div class="col-6"><b>Kinh nghiệm:</b> ${data.experience}</div>
							<div class="col-6"><b>Hình thức làm việc:</b> ${data.Workingform}</div>
							<div class="col-6"><b>Vị trí cần tuyển:</b> 10${data.job}</div>
							<div class="col-6"><b>Ngày bắt đầu tuyển dụng:</b> ${data.dateStart.substr(
                0,
                10
              )}</div>
						</div>
						</div>
					</section>

					<section class="p-3 pt-0">
						<h5>Thông tin tuyển dụng</h5>
						<div class="d-flex mt-3 top-td">
							<div class="col-3"><b>Mô tả công việc:</b></div>
							<div class="col-9">
							${data.request}
							</div>
						</div>

						<div class="d-flex mt-3 top-td">
							<div class="col-3"><b>Quyền lợi được hưởng:</b></div>
							<div class="col-9">
							${data.interest}
							</div>
						</div>

						<div class="d-flex mt-3 top-td">
							<div class="col-3"><b>Yêu cầu khác:</b></div>
							<div class="col-9">
								${data.jobdescription}
							</div>
						</div>

						<div class="d-flex mt-3 top-td">
							<div class="col-3"><b>Hình thức nộp hồ sơ:</b></div>
							<div class="col-9">
								${data.formsubmit}
							</div>
						</div>
					</section>

					<section class="p-3 pt-0">
						<div class="d-flex top-td">
							<div class="col-3"></div>
							<div class="col-9">
								<b>Hạn nộp hồ sơ:</b> ${data.dateEnd.substr(0, 10)}
								Nộp hồ sơ
							</button>
							</div>
						</div>
					</section>

				</section>

				
      `).appendTo(".modal-content.hide-cv");
    });
  });
});
