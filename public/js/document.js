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
                    val.eye ? "btn-delete-cv" : "btn-delete-td"
                  }" data-id=${val._id}></i>
                </div>
                <h3 class="card__header">Bài đăng ${idx + 1}</h3>
                <p class="card__info">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <button class="btn btn-secondary my-4" data-id=${
                  val._id
                }>Xem</button>
              </div>
            </div>
          </div>
					`).appendTo(".row.list-my");
      });
    } else {
      $(".row.list-my").html("<h5>Không có bài đăng nào</h5>");
    }
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
