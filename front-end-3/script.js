const divs = Array.from(document.getElementsByTagName("div"));
divs.forEach((div) => {
  div.addEventListener(
    "click",
    () => {
      alert(`ELEMET ${div.getAttribute("id").toUpperCase()}`);
    },
    // set true agar proses di lakukkan secara capturing
    true
  );
});
// const divs = document.getElementsByTagName("div");
// for (let el of divs) {
//   el.addEventListener(
//     "click",
//     function () {
//       alert(`ELEMENT ${el.getAttribute("id").toUpperCase()}`);
//     },
//     // set true agar proses di lakukkan secara capturing
//     true
//   );
// }
