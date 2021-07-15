$(function () {
  $.get("/my-document/my", function (data) {
    if (data.length > 0) {
      data.map((val, idx) => {
        $(`
					<div class="col-3">
            <div class="card-cv">
              <div class="card__content">
                <div class="float-end" style="color: red">
                  <i class="bi bi-x-circle ${
                    val.eye ? "btn-delete-cv" : "btn-delete-td"
                  }" data-id=${val._id}></i>
                </div>
                <h3 class="card__header">Bài đăng ${idx + 1}</h3>
                <p class="card__info">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <button class="btn btn-secondary my-4 ${
                  val.eye ? "btn-watch-cv" : "btn-watch-td"
                }" data-id=${val._id} data-bs-toggle="modal" ${
          val.eye ? "data-bs-target='#watchcv'" : "data-bs-target='#watchtd'"
        } >Xem</button>
              </div>
            </div>
          </div>
					`).appendTo(".row.list-my");
      });
    } else {
      $(".row.list-my").html("<h5>Không có bài đăng nào</h5>");
    }
  });

  $("body").on("click", ".btn-watch-cv", function () {
    let cvId = $(this).data("id");

    console.log(cvId);

    $.get("/searchCV/" + cvId, function (data) {
      let namecv = data.cv;
      console.log(data);

      $(".modal-content.hide-cv").empty();

      $(".modal-content.hide-cv").html(`<object
      data="${namecv}"
      type="application/pdf"
      width="100%"
      height="678"
      >
        <iframe src="${namecv}" width="100%" height="678">
          <p>This browser does not support PDF!</p>
        </iframe>
      </object>
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
