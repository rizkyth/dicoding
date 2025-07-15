const sumbitAction = document.getElementById("formDataDiri");

sumbitAction.addEventListener("submit", function (event) {
  const inputNama = document.getElementById("inputNama").value;
  const domisili = document.getElementById("inputDomisili").value;
  const hiddenMessage = `Halo , ${inputNama} bagaimana cuacanya di ${domisili} ?`;

  document.getElementById("messageAfterSubmit").innerText = hiddenMessage;
  document.getElementById("messageAfterSubmit").style.display = "block";
  event.preventDefault(); // Mencegah form dari submit default
});
