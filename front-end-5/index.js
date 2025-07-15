document.addEventListener("DOMContentLoaded", function () {
  const inputMaxLengthOnLoad = document.getElementById("inputNama").maxLength;
  document.getElementById("sisaKarakter").innerText = inputMaxLengthOnLoad;
});

document.getElementById("inputNama").addEventListener("input", function () {
  const jumlahKarakterDiketik = document.getElementById("inputNama").value.length;
  const jumlahKarakterMaksimal = document.getElementById("inputNama").maxLength;

  console.log("Jumlah karakter yang diketik: " + jumlahKarakterDiketik);
  console.log("Jumlah karakter maksimal: " + jumlahKarakterMaksimal);
  const sisaKarakterUpdate = jumlahKarakterMaksimal - jumlahKarakterDiketik;
  document.getElementById("sisaKarakter").innerText = sisaKarakterUpdate.toString();

  if (sisaKarakterUpdate === 0) {
    document.getElementById("sisaKarakter").innerText = "Karakter sudah penuh";
  } else if (sisaKarakterUpdate <= 5) {
    document.getElementById("notifikasiSisaKarakter").style.color = "red";
  } else {
    document.getElementById("notifikasiSisaKarakter").style.color = "black";
  }
});

document.getElementById("inputNama").addEventListener("focus", function () {
  console.log("Input field focused");
  document.getElementById("notifikasiSisaKarakter").style.visibility = "visible";
});

document.getElementById("inputNama").addEventListener("blur", function () {
  console.log("Input field blurred");
  document.getElementById("notifikasiSisaKarakter").style.visibility = "hidden";
});

document.getElementById("inputCaptcha").addEventListener("change", function () {
  console.log("Captcha input changed");

  const inputCaptcha = document.getElementById("inputCaptcha").value;
  const submitButtonStatus = document.getElementById("submitButton");

  if (inputCaptcha === "PRNU") {
    submitButtonStatus.removeAttribute("disabled");
  } else {
    submitButtonStatus.setAttribute("disabled", "");
  }
});

document.getElementById("formDataDiri").addEventListener("submit", function (event) {
  const inputCaptcha = document.getElementById("inputCaptcha").value;

  if (inputCaptcha !== "PRNU") {
    alert("Captcha tidak valid. Silakan coba lagi.");
    document.getElementById("submitButton").setAttribute("disabled", "");
  } else {
    console.log("Form submitted successfully");
  }
  event.preventDefault();
});

document.getElementById("inputCopy").addEventListener("copy", function () {
  alert("Anda telah menyalin teks dari input ini.");
});

document.getElementById("inputPaste").addEventListener("paste", function () {
  alert("Anda telah menempelkan teks ke input ini.");
});
