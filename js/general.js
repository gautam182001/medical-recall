function dropdown() {
  $(".action-wrapper .dropdown-append").click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    var mouseX;
    var mouseY;
    mouseX = e.pageX - 100;
    mouseY = e.pageY + 12;

    $(this)
      .parent(".action-wrapper")
      .closest("tr")
      .siblings()
      .find(".action-wrapper .dropdown-append")
      .removeClass("active");
    $(this).toggleClass("active");

    if ($(this).hasClass("active")) {
      $(".append-menu")
        .css({ position: "absolute", top: mouseY, left: mouseX })
        .appendTo("body");
      $(".append-menu").addClass("show");
    } else {
      $(".append-menu").removeClass("show");
    }
  });

  $(document).on("click", function (e) {
    e.stopPropagation();
    $(".filter-wrapper .filter-blog").removeClass("filter-show");
    $(" .append-menu").removeClass("show");
    $(" .menu-option ").removeClass("show");

    if (
      !$(e.target).closest(".append-menu ,.action-wrapper .dropdown-append")
        .length
    ) {
      $(".action-wrapper .dropdown-append").removeClass("active");
      $(".append-menu").removeClass("show");
    }
  });

  $(".action-wrapper .action").click(function (e) {
    e.stopPropagation();
    $(".menu-option")
      .not($(this).closest(".action-wrapper").find(".menu-option"))
      .removeClass("show");
    $(this).closest(".action-wrapper").find(".menu-option").toggleClass("show");
  });
}

function footerAdj() {
  var footer_height = $(".footer").outerHeight();
  $(".wrapper").css({
    "padding-bottom": footer_height + "px",
  });
  $(".main-wrap").css({
    "min-height": "calc(100vh - " + footer_height + "px)",
  });
}
function header_height() {
  if ($(window).width() < 767) {
    var header_height = $(".header").outerHeight();
    $(".header .nav-wrap").css({ "padding-top": header_height + "px" });
  } else {
    $(".header .nav-wrap").css({ "padding-top": "0" });
  }

  $(window).scroll(function () {
    $(".header").removeClass("small-header");
    if ($(window).scrollTop() > 0) {
      $(".header").addClass("small-header");
    } else {
      $(".header").removeClass("small-header");
    }
  });
}
function header_menu() {
  if ($(window).width() < 767) {
    $(".header .hamburger")
      .off()
      .click(function () {
        $(this).toggleClass("is-active");
        $("body,html").toggleClass("sidebar-open");
        $(".header .nav-wrap").toggleClass("is-open");
      });
  } else {
    $(".header .hamburger").removeClass("is-active");
    $("body,html").removeClass("sidebar-open");
    $(".header .nav-wrap").removeClass("is-open");
  }
}
function hide_show_password() {
  $(".view-pwd").click(function () {
    $(this).toggleClass("show-pwd");
    if (
      $(this).closest(".password-block").find(".input-control").attr("type") ===
      "password"
    ) {
      $(this)
        .closest(".password-block")
        .find(".input-control")
        .attr("type", "text");
    } else {
      $(this)
        .closest(".password-block")
        .find(".input-control")
        .attr("type", "password");
    }
  });
}
function dataTable() {
  new DataTable("#dashboard-table", {
    fixedColumns: {
      left: 1,
    },
    searching: false,
    scrollCollapse: true,
    scrollX: true,
    // paging: false,
  });

  new DataTable("#table1, #table2, .billing-table", {
    fixedColumns: {
      left: 1,
    },
    language: {
      searchPlaceholder: "Search records",
    },
  });

  $(".billing-table-outer .dataTables_filter label").append("<span></span>");
}

function selectOpen() {
  if ($(window).width() < 767) {
    $(".select").on("select2:open", function (e) {
      $("html,body").addClass("select-open");
    });
    $(".select").on("select2:close", function (e) {
      $("html,body").removeClass("select-open");
    });
  } else {
    $("html,body").removeClass("select-open");
  }
}

$(document).ready(function () {
  footerAdj();
  header_height();
  header_menu();
  hide_show_password();
  dropdown();
  $(".video-wrapper .play-btn").on("click", function (e) {
    e.preventDefault();
    $(this).closest(".video-wrapper").addClass("open");
  });
  $(".authentication-content").hide();
  $(".authentication-content#login").show();
  $(".authentication-wrapper .forgot-pwd-link").click(function () {
    $(this).closest(".authentication-content").hide();
    $(".authentication-wrapper #forgot-pwd").fadeIn(1000);
  });
  $(".authentication-wrapper .signup-link").click(function () {
    $(this).closest(".authentication-content").hide();
    $(".authentication-wrapper #sign-up").fadeIn(1000);
  });
  $(".authentication-wrapper .back-to-login").click(function () {
    $(this).closest(".authentication-content").hide();
    $(".authentication-wrapper #login").fadeIn(1000);
  });
  var achievementTop = 0;
  $(window).scroll(function () {
    if ($(".achievement-wrapper").length) {
      var oTop = $(".achievement-wrapper").offset().top - window.innerHeight;
      if (achievementTop == 0 && $(window).scrollTop() > oTop) {
        $(".achievement-no .count").each(function () {
          $(this)
            .prop("Counter", 0)
            .animate(
              {
                Counter: $(this).text(),
              },
              {
                duration: 700,
                easing: "swing",
                step: function (now) {
                  $(this).text(Math.ceil(now));
                  var formattedNumber = numberWithCommasIndian(
                    Number($(this).text())
                  );
                  $(this).text(formattedNumber);
                  // $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
                },
              }
            );
        });
        achievementTop = 1;
      }
    }
  });

  function numberWithCommasIndian(x) {
    return x.toLocaleString("en-IN");
  }

  $(".review-list").slick({
    dots: false,
    infinite: true,
    speed: 300,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    customPaging: 30,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  //Filter
  $(".filter").click(function (e) {
    e.stopPropagation();
    if (
      $(this)
        .closest(".filter-wrapper")
        .find(".filter-blog")
        .hasClass("filter-show")
    ) {
      $(this)
        .closest(".filter-wrapper")
        .find(".filter-blog")
        .removeClass("filter-show");
    } else {
      $(this)
        .closest(".filter-wrapper")
        .find(".filter-blog")
        .removeClass("filter-show");
      $(this)
        .closest(".filter-wrapper")
        .find(".filter-blog")
        .addClass("filter-show");
    }
  });
  $(".filter-wrapper .filter-blog").on("click", function (e) {
    e.stopPropagation();
  });
  $(".filter-blog .close").on("click", function (e) {
    $(this).closest(".filter-blog").removeClass("filter-show");
  });

  //Data Table start
  dataTable();

  $("#globalSearch").on("keyup", function () {
    $("#table1, #table2, .billing-table").DataTable().search(this.value).draw();
  });
  //Data Table End

  $(".custom-option").select2({
    containerCssClass: "opened",
    dropdownCssClass: "open-dropdown",
    minimumResultsForSearch: Infinity,
  });

  $(".custom-option").on("select2:select", function (e) {
    var data = $(this)
      .closest(".custom-select.select-styled")
      .find(".select2-selection__rendered")
      .html();

    if (data == "Completed") {
      $(this)
        .closest(".custom-select.select-styled")
        .css("backgroundColor", "#51BF3F");
    }
    if (data == "Working on it") {
      $(this)
        .closest(".custom-select.select-styled")
        .css("backgroundColor", "#F9813E");
    }
    if (data == "Not Started") {
      $(this)
        .closest(".custom-select.select-styled")
        .css("backgroundColor", "#95A0A4");
    }
  });
  $(".dataTables_wrapper ").on("draw.dt", function () {
    $(".custom-option").select2({
      containerCssClass: "opened",
      dropdownCssClass: "open-dropdown",
      minimumResultsForSearch: Infinity,
    });
    $(".custom-option").on("select2:select", function (e) {
      var data = $(this)
        .closest(".custom-select.select-styled")
        .find(".select2-selection__rendered")
        .html();

      if (data == "Completed") {
        $(this)
          .closest(".custom-select.select-styled")
          .css("backgroundColor", "#51BF3F");
      }
      if (data == "Working on it") {
        $(this)
          .closest(".custom-select.select-styled")
          .css("backgroundColor", "#F9813E");
      }
      if (data == "Not Started") {
        $(this)
          .closest(".custom-select.select-styled")
          .css("backgroundColor", "#95A0A4");
      }
    });
  });
  $(".paginate_button").click(function () {
    $(".custom-option").select2({
      containerCssClass: "opened",
      dropdownCssClass: "open-dropdown",
      minimumResultsForSearch: Infinity,
    });
    $(".custom-option").on("select2:select", function (e) {
      var data = $(this)
        .closest(".custom-select.select-styled")
        .find(".select2-selection__rendered")
        .html();

      if (data == "Completed") {
        $(this)
          .closest(".custom-select.select-styled")
          .css("backgroundColor", "#51BF3F");
      }
      if (data == "Working on it") {
        $(this)
          .closest(".custom-select.select-styled")
          .css("backgroundColor", "#F9813E");
      }
      if (data == "Not Started") {
        $(this)
          .closest(".custom-select.select-styled")
          .css("backgroundColor", "#95A0A4");
      }
    });
  });
  // table select start

  $(".select-styled").on("click", function () {
    $(".custom-select").find(".custom-options").hide();
    $(this).closest(".custom-select").find(".custom-options").toggle();
  });

  $(".custom-options div").on("click", function () {
    var selectedValue = $(this).attr("data-value");
    $(this)
      .closest(".custom-options")
      .find("div.selected")
      .removeClass("selected");
    $(this).addClass("selected");
    $(this)
      .closest("tr")
      .removeClass("not-started working-on completed")
      .addClass(selectedValue);
    $(this)
      .closest(".custom-select")
      .find(".select-styled")
      .text($(this).text());
    $(".custom-options").hide();
  });

  $(document).on("click", function (event) {
    if (!$(event.target).closest(".custom-select").length) {
      $(".custom-options").hide();
    }
  });
  $(".paginate_button").on("click", function () {
    $(".select-styled").on("click", function () {
      $(this).closest(".custom-select").find(".custom-options").toggle();
    });

    $(".custom-options div").on("click", function () {
      var selectedValue = $(this).attr("data-value");
      $(this)
        .closest(".custom-options")
        .find("div.selected")
        .removeClass("selected");
      $(this).addClass("selected");
      $(this)
        .closest("tr")
        .removeClass("not-started working-on completed")
        .addClass(selectedValue);
      $(this)
        .closest(".custom-select")
        .find(".select-styled")
        .text($(this).text());
      $(".custom-options").hide();
    });

    $(document).on("click", function (event) {
      if (!$(event.target).closest(".custom-select").length) {
        $(".custom-options").hide();
      }
    });
  });

  // table select End

  $(".select").select2({
    minimumResultsForSearch: Infinity,
    dropdownCssClass: "select-wrapper",
  });
  selectOpen();

  $(".clinics").on("click", function () {
    $("#welcome").modal("hide");
    $("#clinic").modal("show");
    setTimeout(function () {
      $("body").addClass("modal-open");
    }, 500);
    $("body").addClass("modal-open");
  });

  $(".add-btn").on("click", function () {
    $(".search-modal ").css("filter", "blur(0)");
    $(".search-modal").css("display", "block");
    $("body").addClass("modal-open");
    setInterval(function () {
      $(".search-modal ").css("filter", "blur(0)");
      $(".search-modal").css("display", "block");
      $("body").addClass("modal-open");
    }, 500);
  });
  $(".edit").on("click", function () {
    $(".search-modal").modal("show");
    $(".search-modal").addClass("show");
    $(".search-modal").css("display", "block");
    $(".add-patient-block ").css("display", "block");
    // $(".search-modal ").css("filter", "blur(8px)");
    $(".add-patient-block ").css("z-index", "1056");
    setTimeout(function () {
      $(".search-modal").addClass("show");
      $(".search-modal").css("display", "block");
      $(".add-patient-block ").css("display", "block");
      // $(".search-modal ").css("z-index", "99");
      $(".add-patient-block ").css("z-index", "1056");
      // $(".search-modal ").css("filter", "blur(8px)");
      $("body").addClass("modal-open");
    }, 600);
    setTimeout(function () {
      // $(".search-modal ").css("filter", "blur(8px)");
    }, 800);
    $("body").addClass("modal-open");
  });

  // $('[data-toggle=modal]').on('click', function(){
  //   var $btn = $(this);
  //   var currentDialog = $btn.closest('.modal-dialog'),
  //   targetDialog = $($btn.attr('data-target'));;
  //   if (!currentDialog.length)
  //     return;
  //   targetDialog.data('previous-dialog', currentDialog);
  //   currentDialog.addClass('aside');
  //   var stackedDialogCount = $('.modal.in .modal-dialog.aside').length;
  //   if (stackedDialogCount <= 5){
  //     currentDialog.addClass('aside-' + stackedDialogCount);
  //   }
  // });

  // $('.modal').on('hide.bs.modal', function(){
  //   var $dialog = $(this);
  //   var previousDialog = $dialog.data('previous-dialog');
  //   if (previousDialog){
  //     previousDialog.removeClass('aside');
  //     $dialog.data('previous-dialog', undefined);
  //   }
  // });
});
$(window).resize(function () {
  footerAdj();
  selectOpen();
  dropdown();
  setTimeout(function () {
    header_height();
    header_menu();
  }, 200);
});
$(window).on("load", function () {
  $("#welcome").modal("show");

  if ($("body").find(".show")) {
    $("body").addClass("modal-open1");
    console.log("if");
  }
  $("body").removeClass("modal-open1");
  setTimeout(function () {
    $("body").removeClass("modal-open1");
    if ($("body").find(".show")) {
      $("body").addClass("modal-open1");
      console.log("if");
    }
  }, 400);
});
