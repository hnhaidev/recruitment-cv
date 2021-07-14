$(function () {
  $.get("/searchCV/listcv", function (data) {
    if (data.length > 1) {
      data.map((val) => {
        $(`
            <div class="card-job btn-cv" data-id=${val._id} data-bs-toggle="modal" data-bs-target="#icv">
              <h5>${val.name}</h5>
              <div><b>Vị trí ứng tuyển:</b> ${val.job}</div>
              <div><b>Kinh nghiệm làm việc</b> : ${val.experience}</div>
              <div><b>Email liên hệ:</b> ${val.email}</div>
              <div class="eye-cv">${val.eye} lượt xem</div>
              </div>
            `).appendTo("#listcv");
      });
    }
    //
    else if (data.length === 0) {
      $("#listcv").empty();
    }
    //
    else {
      $("#listcv").html(`
      <div class="card-job btn-cv" data-id=${data[0]._id} data-bs-toggle="modal" data-bs-target="#icv">
        <h5>${data[0].name}</h5>
        <div><b>Vị trí ứng tuyển:</b> ${data[0].job}</div>
        <div><b>Kinh nghiệm làm việc</b> : ${data[0].experience}</div>
        <div><b>Email liên hệ:</b> ${data[0].email}</div>
        <div class="eye-cv">${data[0].eye} lượt xem</div>
        </div>
      `);
    }
  });

  $("body").on("click", ".btn-cv", function () {
    let cvId = $(this).data("id");

    $.ajax({
      type: "PUT",
      url: "/searchCV/eye/" + cvId,
      data: "data",
      dataType: "dataType",
      success: function (response) {},
    });
    $.get("/searchCV/" + cvId, function (data) {
      let namecv = data.cv;

      $(".modal-content.hide-cv").empty();

      $(`<object
        data="${namecv}"
        type="application/pdf"
        width="100%"
        height="678"
        >
          <iframe src="${namecv}" width="100%" height="678">
            <p>This browser does not support PDF!</p>
          </iframe>
        </object>
      `).appendTo(".modal-content.hide-cv");
    });
  });

  $("#btn-search").click(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/searchCV/search",
      data: {
        job: $("#job").val(),
        experience: $("#experience").val(),
        codeCity: $("#codeCity").val(),
      },
    })
      .then((data) => {
        console.log(data);
        if (data.length > 1) {
          $("#listcv").empty();
          data.map((val) => {
            $(`
          <div class="card-job btn-cv" data-id=${val._id} data-bs-toggle="modal" data-bs-target="#icv">
            <h5>${val.name}</h5>
            <div><b>Vị trí ứng tuyển:</b> ${val.job}</div>
            <div><b>Kinh nghiệm làm việc</b> : ${val.experience}</div>
            <div><b>Email liên hệ:</b> ${val.email}</div>
            <div class="eye-cv">${val.eye} lượt xem</div>
            </div>
          `).appendTo("#listcv");
          });
        }
        //
        else if (data.length === 0) {
          $("#listcv").empty();
        } else {
          $("#listcv").empty();
          $("#listcv").html(`
          <div class="card-job btn-cv" data-id=${data[0]._id} data-bs-toggle="modal" data-bs-target="#icv">
            <h5>${data[0].name}</h5>
            <div><b>Vị trí ứng tuyển:</b> ${data[0].job}</div>
            <div><b>Kinh nghiệm làm việc</b> : ${data[0].experience}</div>
            <div><b>Email liên hệ:</b> ${data[0].email}</div>
            <div class="eye-cv">${data[0].eye} lượt xem</div>
            </div>
          `);
        }
      })
      .catch((error) => {
        alert(error.responseText);
        console.log(error.responseText);
      });
  });
});
