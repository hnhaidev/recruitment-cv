window.onload = function () {
  document.getElementById("download").addEventListener("click", () => {
    const invoice = this.document.getElementById("page");
    var opt = {
      margin: -0.1,
      filename: "myfile.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(invoice).set(opt).save();
  });
};
