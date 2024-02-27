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
      searchPlaceholder: 'Search records'
  }
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

  //table menu action start
  $(".action-wrapper .action").click(function (e) {
    e.stopPropagation();
    $(".action-wrapper").find(".menu-option").removeClass("show")

    if (
      $(this).closest(".action-wrapper").find(".menu-option").hasClass("show")
    ) {
      $(this)
        .closest(".action-wrapper")
        .find(".menu-option")
        .removeClass("show");
    } else {
      $(this)
        .closest(".action-wrapper")
        .find(".menu-option")
        .removeClass("show");
      $(this).closest(".action-wrapper").find(".menu-option").addClass("show");
    }
  });
  $(".action-wrapper .menu-option").on("click", function (e) {
    e.stopPropagation();
  });
  $(document).on("click", function (e) {
    e.stopPropagation();
    $(".action-wrapper .menu-option").removeClass("show");
    $(".filter-wrapper .filter-blog").removeClass("filter-show");
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
  $(".paginate_button").on("click",function(){
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
  })

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
    }, 50);
    $("body").addClass("modal-open");
  });
});
$(window).resize(function () {
  footerAdj();
  selectOpen();
  setTimeout(function () {
    header_height();
    header_menu();
  }, 200);
});
$(window).on("load", function () {
  $("#welcome").modal("show");
});
