$(function () {
  $.get("/my-document/my", function (data) {
    console.log(data);
    if (data.length > 0) {
      data.map((val, idx) => {
        $(`
					<div class="col-3">
            <div class="card-cv">
              <div class="card__content">
                <div class="float-end" style="color: red">
                  <i class="bi bi-x-circle ${
                    val.cv ? "btn-delete-cv" : "btn-delete-td"
                  }" data-id=${val._id}></i>
                </div>
                <h3 class="card__header">Bài đăng ${idx + 1}</h3>
                <p class="card__info my-3">${val.job}</p>
                <button class="btn btn-secondary btn-sm my-4 ${
                  val.cv ? "btn-watch-cv" : "btn-watch-td"
                }" data-id=${val._id} data-bs-toggle="modal" ${
          val.cv ? "data-bs-target='#watchcv'" : "data-bs-target='#watchtd'"
        } >Xem</button>

                ${
                  !val.cv
                    ? "<button class='btn btn-secondary btn-sm' id='btn-hoso' data-id='" +
                      val._id +
                      "' >Hồ sơ</button>"
                    : ""
                }
                
              </div>
            </div>
          </div>
					`).appendTo(".row.list-my");
      });
    } else {
      $(".row.list-my").html("<h5>Không có bài đăng nào</h5>");
    }
  });

  $("body").on("click", "#btn-hoso", function () {
    $(".hoso").toggle();
    $(".row.list-mc").empty();
    let cvId = $(this).data("id");

    $.get("/searchTD/allcv/" + cvId, function (data) {
      if (data.length > 0) {
        data.map((val, idx) => {
          $(`
            <div class="col-3">
              <div class="card-cv">
                <div class="card__content">
                  <h3 class="card__header">Hồ sơ ${idx + 1}</h3>
                  <p class="card__info">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <button class="btn btn-secondary btn-sm my-4 btn-watch-cv2" data-id1=${
                    val._id
                  } data-id2=${cvId} data-bs-toggle="modal" data-bs-target='#watchcv2'
                    >Xem</button>
  
                </div>
              </div>
            </div>
            `).appendTo(".row.list-mc");
        });
      } else {
        $(".row.list-mc").html("<h5>Không có bài đăng nào</h5>");
      }
    });
  });

  $("body").on("click", ".btn-watch-cv", function () {
    let cvId = $(this).data("id");

    console.log(cvId);

    $.get("/searchCV/" + cvId, function (data) {
      let namecv = data.cv;
      console.log(data);

      $(".modal-content.hide-cv").empty();

      $(".modal-content.hide-cv").html(`
      <div class="row">
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
          <b>Email:</b> ${data.name}
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

  $("body").on("click", ".btn-watch-cv2", function () {
    let id1 = $(this).data("id1");
    let id2 = $(this).data("id2");

    $.get("/searchTD/allcv/" + id2, function (data) {
      let rs = data.filter((val) => val._id === id1);

      let namecv = rs[0].cv;

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
});
