document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll('input[name="book_id[]"]');
  const subtotalAmountEl = document.getElementById("subtotal-amount");
  const totalAmountEl = document.getElementById("total-amount");

  function calculateTotal() {
    let currentSubtotal = 0;
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const row = checkbox.closest("tr");
        const feeCell = row.cells[row.cells.length - 1];
        const feeText = feeCell.textContent
          .replace("đ", "")
          .replace(".", "")
          .trim();
        currentSubtotal += parseFloat(feeText) || 0;
      }
    });

    const currentTotal = currentSubtotal;

    subtotalAmountEl.textContent =
      currentSubtotal.toLocaleString("vi-VN") + "đ";
    totalAmountEl.textContent = currentTotal.toLocaleString("vi-VN") + "đ";
  }

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", calculateTotal);
  });

  const selectAllCheckbox = document.getElementById("select-all-books");
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", function () {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAllCheckbox.checked;
      });
      calculateTotal();
    });
  }

  calculateTotal();
});
