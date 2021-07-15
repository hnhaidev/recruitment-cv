$(function () {
  $.get("/searchTD/listtd", function (data) {
    data.map((val) => {
      var city;
      $.get("/json/local.json", function (data2) {
        city = data2.filter((val1) => val1.code === val.codeCity)[0].name;
        $(`
        <div class="card-job btn-td row" data-id=${val._id} data-bs-toggle="modal" data-bs-target="#icv">
					<div class="col-6">
						<div><b>${val.job}</b> </div>
						<div>${val.nameCompany}</div>
					</div>

					<div class="col-3">
						<i class="bi bi-currency-dollar"></i>
						<div>${val.salary}</div>
					</div>

					<div class="col-3">
						<i class="bi bi-geo-alt"></i>
						<div>${city}</div>
					</div>
				</div>
        `).appendTo("#listtd");
      });
    });
  });

  $("body").on("click", ".btn-td", function () {
    let cvId = $(this).data("id");

    $.get("/searchTD/" + cvId, function (data) {
      if (typeof data === "object") {
        $(".modal-content.hide-cv").empty();

        $(`<section class="p-2 modal-td" style="font-size: 12px">
					<section class="p-3">
						<h3>${data.job}</h3>
						<p>${data.nameCompany}</p>
						<div
							class="d-flex justify-content-between align-items-center top-td"
						>
							<div>
								<button type="button" class="btn btn-outline-secondary btn-sm">
									Lưu việc làm
								</button>
								<b>Hạn nộp hồ sơ:</b> ${data.dateEnd.substr(0, 10)}
							</div>
							<button type="button" class="btn btn-secondary btn-submit-cv" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
								Nộp hồ sơ
							</button>
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
								<button type="button" class="btn btn-secondary float-end">
								Nộp hồ sơ
							</button>
							</div>
						</div>
					</section>

				</section>

				<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content" style="border: 10px #000 solid; font-size:12px">
						<form
								class="g-3"
								action="/searchTD/submit/${data._id}"
								method="POST"
								enctype="multipart/form-data"
								>
							<div class="modal-header">
								<h5 class="modal-title" id="staticBackdropLabel">Ứng tuyển</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div class="modal-body">
								
									<div>
										<div>Upload CV từ máy tính:</div>
										<div>
											<input
												class="form-control form-control-sm"
												type="file"
												role="button"
												name="cv"
												id="cv"
												accept="application/pdf,application/vnd.ms-excel"
												required
											/>
										</div>
									</div>

                  <div>
                    <div>Họ và tên:</div>
                    <div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="form-control form-control-sm"
                        placeholder="Họ và tên"
                        required
                      />
                    </div>
                  </div>

                  <div class="mt-3">
                    <div>Email:</div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        class="form-control form-control-sm"
                        placeholder="Email"
                        required
                      />
                    </div>
                  </div>

                  <div class="mt-3">
                    <div>Số điện thoại:</div>
                    <div>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        class="form-control form-control-sm"
                        placeholder="Số điện thoại"
                        required
                      />
                    </div>
                  </div>

                  <div class="mt-3">
                    <div>Thư giới thiệu:</div>
                    <div>
											<textarea
											name="introducing"
											id="introducing"
											style="width: 100%"
											placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do làm việc tại công ty này. Đây là cách gây ấn tượng với nhà tuyển dụng nếu bạn có chưa có kinh nghiệm làm việc (hoặc CV không tốt)."
											required
											>
											</textarea>
                    </div>
                  </div>

							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
								<button type="submit" class="btn btn-primary" id="btn-submit-candidates" data-id="${
                  data._id
                }">Nộp CV</button>
							</div>
							</form>
						</div>
					</div>
				</div>
      `).appendTo(".modal-content.hide-cv");
      } else {
        window.location.href = "/login";
      }
    });
  });

  $("body").on("click", "#btn-submit-candidates", function () {
    let tdId = $(this).data("id");

    $.ajax({
      type: "POST",
      url: "/searchTD/submit/" + tdId,
      data: {
        email: $("#email").val(),
        name: $("#name").val(),
        phone: $("#phone").val(),
        introducing: $("#introducing").val(),
      },
    })
      .then((data) => {
        if (data) {
          alert("Gửi thành công !");
          location.href = "/searchTD";
        }
      })
      .catch((err) => {
        alert("Gửi thất bại !");
        location.href = "/searchTD";
      });
  });

  $("#btn-search").click(function (e) {
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "/searchTD/search",
      data: {
        job: $("#job").val(),
        experience: $("#experience").val(),
        codeCity: $("#codeCity").val(),
      },
    })
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          $("#listtd").empty();
          data.map((val) => {
            var city;
            $.get("/json/local.json", function (data2) {
              city = data2.filter((val1) => val1.code === val.codeCity)[0].name;
              $(`
							<div class="card-job btn-td row" data-id=${val._id} data-bs-toggle="modal" data-bs-target="#icv">
								<div class="col-6">
									<div><b>${val.job}</b> </div>
									<div>${val.nameCompany}</div>
								</div>

								<div class="col-3">
									<i class="bi bi-currency-dollar"></i>
									<div>${val.salary}</div>
								</div>

								<div class="col-3">
									<i class="bi bi-geo-alt"></i>
									<div>${city}</div>
								</div>
							</div>
							`).appendTo("#listtd");
            });
          });
        }
        //
        else if (data.length === 0) {
          $("#listtd").empty();
          $("#listtd").html("<h5>Không có tin tuyển dụng nào phù hợp</h5>");
        }
      })
      .catch((error) => {
        alert(error.responseText);
        console.log(error.responseText);
      });
  });
});
