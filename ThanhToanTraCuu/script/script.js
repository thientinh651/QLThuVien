document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  // Chọn section kết quả duy nhất, có class hidden
  const resultsSection = document.querySelector(".results-section");
  const searchResultsList = document.getElementById("search-results-list");
  // Selector cho ul bên trong nav.pagination của resultsSection
  const paginationUl = document.querySelector(
    ".results-section.hidden .pagination ul"
  );

  // Dữ liệu mẫu
  const sampleBooks = [
    {
      title: "The Richest Man in Babylon",
      cover: "https://via.placeholder.com/80x120?text=Sách+1",
      genre: "Tài chính cá nhân",
      author: "George S. Clason",
      publisher: "NXB Tổng Hợp",
      year: "2020",
      available: true,
    },
    {
      title: "Rich Dad Poor Dad",
      cover: "https://via.placeholder.com/80x120?text=Sách+2",
      genre: "Phát triển bản thân",
      author: "Robert T. Kiyosaki",
      publisher: "NXB Trẻ",
      year: "2018",
      available: true,
    },
    {
      title: "Đắc Nhân Tâm",
      cover: "https://via.placeholder.com/80x120?text=Sách+3",
      genre: "Kỹ năng sống",
      author: "Dale Carnegie",
      publisher: "NXB Văn Học",
      year: "2019",
      available: false,
    },
    {
      title: "Nhà Giả Kim",
      cover: "https://via.placeholder.com/80x120?text=Sách+4",
      genre: "Tiểu thuyết",
      author: "Paulo Coelho",
      publisher: "NXB Văn Học",
      year: "2015",
      available: true,
    },
    {
      title: "Tư Duy Nhanh và Chậm",
      cover: "https://via.placeholder.com/80x120?text=Sách+5",
      genre: "Tâm lý học",
      author: "Daniel Kahneman",
      publisher: "NXB Lao Động",
      year: "2017",
      available: true,
    },
    {
      title: "Sapiens: Lược Sử Loài Người",
      cover: "https://via.placeholder.com/80x120?text=Sách+6",
      genre: "Lịch sử",
      author: "Yuval Noah Harari",
      publisher: "NXB Tri Thức",
      year: "2011",
      available: false,
    },
  ];

  if (
    searchForm &&
    searchInput &&
    resultsSection &&
    searchResultsList &&
    paginationUl
  ) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const searchTerm = searchInput.value.trim().toLowerCase();
      console.log("Đang tìm kiếm với từ khóa:", searchTerm);

      // Lọc dữ liệu mẫu (trong thực tế sẽ là gọi API)
      const filteredBooks = sampleBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm)
      );

      // Hiển thị phần kết quả
      resultsSection.classList.remove("hidden");

      displayResults(filteredBooks);
      // Giả sử 3 item mỗi trang cho phân trang
      displayPagination(
        1,
        Math.ceil(filteredBooks.length / 3),
        3,
        filteredBooks
      );

      if (filteredBooks.length > 0) {
        resultsSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  } else {
    console.error("Không tìm thấy một hoặc nhiều phần tử DOM cần thiết.");
    if (!searchForm) console.error("searchForm is null");
    if (!searchInput) console.error("searchInput is null");
    if (!resultsSection) console.error("resultsSection is null");
    if (!searchResultsList) console.error("searchResultsList is null");
    if (!paginationUl) console.error("paginationUl is null");
  }

  function displayResults(booksToDisplay) {
    searchResultsList.innerHTML = ""; // Xóa kết quả cũ

    if (!booksToDisplay || booksToDisplay.length === 0) {
      searchResultsList.innerHTML =
        '<p class="no-results">Không tìm thấy kết quả nào phù hợp.</p>';
      return;
    }

    booksToDisplay.forEach((book) => {
      const bookItemHTML = `
                <div class="book-item">
                    <img src="${book.cover}" alt="Bìa sách ${
        book.title
      }" class="book-cover">
                    <div class="book-details">
                        <h3><a href="#">${book.title}</a></h3>
                        <p class="book-meta"><strong>Thể loại:</strong> ${
                          book.genre
                        }</p>
                        <p class="book-meta"><strong>Tác giả:</strong> ${
                          book.author
                        }</p>
                        <p class="book-meta"><strong>Nhà xuất bản:</strong> ${
                          book.publisher
                        }</p>
                        <p class="book-meta"><strong>Năm:</strong> ${
                          book.year
                        }</p>
                        <div class="book-status">
                            <span class="status-dot ${
                              book.available ? "available" : "unavailable"
                            }"></span> Trạng thái
                        </div>
                    </div>
                    <div class="book-actions">
                        <a href="#" title="Ghim lại"><i class="fa-solid fa-thumbtack"></i></a>
                    </div>
                </div>
            `;
      searchResultsList.insertAdjacentHTML("beforeend", bookItemHTML);
    });
  }

  // Hàm displayPagination cần được cập nhật để xử lý việc hiển thị đúng số lượng item mỗi trang
  function displayPagination(
    currentPage,
    totalPages,
    itemsPerPage,
    allFilteredBooks
  ) {
    paginationUl.innerHTML = ""; // Xóa phân trang cũ

    if (totalPages <= 1) {
      // Không hiển thị nếu chỉ có 1 trang hoặc không có trang nào
      return;
    }

    // Nút Previous
    if (currentPage > 1) {
      const prevLi = document.createElement("li");
      prevLi.innerHTML = `<a href="#" class="page-link" data-page="${
        currentPage - 1
      }">&laquo; Trước</a>`;
      paginationUl.appendChild(prevLi);
    }

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#" class="page-link ${
        i === currentPage ? "current" : ""
      }" data-page="${i}">${i}</a>`;
      paginationUl.appendChild(li);
    }

    // Nút Next
    if (currentPage < totalPages) {
      const nextLi = document.createElement("li");
      nextLi.innerHTML = `<a href="#" class="page-link" data-page="${
        currentPage + 1
      }">Sau &raquo;</a>`;
      paginationUl.appendChild(nextLi);
    }

    // Gắn lại event listener cho các nút phân trang mới được tạo
    addPaginationEventListeners(itemsPerPage, allFilteredBooks);
  }

  function addPaginationEventListeners(itemsPerPage, allFilteredBooks) {
    const pageLinks = paginationUl.querySelectorAll(".page-link");
    pageLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const page = parseInt(event.target.dataset.page);
        if (page) {
          // Tính toán sách cho trang đó
          const startIndex = (page - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const booksForPage = allFilteredBooks.slice(startIndex, endIndex);

          displayResults(booksForPage);
          // Gọi lại displayPagination để cập nhật trạng thái 'current' cho nút trang
          displayPagination(
            page,
            Math.ceil(allFilteredBooks.length / itemsPerPage),
            itemsPerPage,
            allFilteredBooks
          );

          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  }
});
