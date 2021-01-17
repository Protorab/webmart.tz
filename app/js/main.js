/** @format */

import $ from "jquery";
// import wow from "wowjs";
import inputmask from "inputmask";
import loadingAttributePolyfill from "loading-attribute-polyfill";
// const WOW = require("wowjs");
// window.wow = new wow.WOW();
// window.wow.init();
window.jQuery = $;
window.$ = $;
// require("./vendor/mail.js");

// import module example (npm i -D jquery)

document.addEventListener("DOMContentLoaded", () => {
  const phone = document.querySelector(".telephone");
  const popupForm = document.querySelector("#popup__form");
  const formPopup = document.querySelector(".form__popup");
  const menuOverlay = document.querySelector(".menu__overlay");

  const popupBg = document.querySelectorAll(".popup__overlay");
  const showForm = document.querySelectorAll(".show__form");
  const closePopup = document.querySelectorAll(".close");
  const sendForms = document.querySelectorAll(".send__form");

  const burgerMenu = document.querySelector(".burger__menu");
  const menu = document.querySelector(".menu");
  const body = document.querySelector("body");
  let phoneMask = new inputmask({
    mask: "+375-99-999-99-99",
    clearIncomplete: true,
    greedy: false,
  });

  if (phone) {
    phoneMask.mask(phone);
  }
  const menuToggle = (burgerMenu, menu, menuOverlay) => {
    burgerMenu.classList.toggle("__clicked");
    menu.classList.toggle("__show");
    menuOverlay.classList.toggle("__show");
  };
  if (burgerMenu) {
    burgerMenu.addEventListener("click", function (e) {
      menuToggle(burgerMenu, menu, menuOverlay);
      e.preventDefault;
    });
  }
  if (menuOverlay) {
    menuOverlay.addEventListener("click", function (e) {
      menuToggle(burgerMenu, menu, menuOverlay);
      e.preventDefault();
    });
  }
  const classRemove = (element, removeClass) => {
    const elementClass = document.querySelector("" + element + "");
    if (elementClass) {
      elementClass.classList.remove(removeClass);
    }
  };

  if (sendForms) {
    sendForms.forEach((sendForm) => {
      sendForm.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
          e.preventDefault();
        }
      });
    });
  }
  $(".send__form").on("submit", function (e) {
    //Change
    e.preventDefault();
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize(),
    }).done(function () {
      alert("Thank you!");
      setTimeout(function () {
        // Done Functions
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });

  window.addEventListener("scroll", function () {
    classRemove(".burger__menu.__clicked", "__clicked");
    classRemove(".menu.__show", "__show");
    classRemove(".menu__overlay.__show", "__show");
  });

  if (showForm) {
    showForm.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        const subject = this.dataset.subject;
        console.log(subject);
        e.preventDefault();
        popupToggle(
          popupForm,
          formPopup,
          "animate__fadeIn",
          "animate__bounceInDown",
          "animate__fadeOut",
          "animate__bounceOutUp",
          "flex",
          100
        );
      });
      return false;
    });
  }

  const popupToggle = (
    popUp,
    popUpElement,
    el1ShowClassAdd,
    el2ShowClassAdd,
    el1HideClassRemove,
    el2HideClassRemove,
    state,
    timing
  ) => {
    popUp.classList.add(el1ShowClassAdd);
    popUp.classList.remove(el1HideClassRemove);
    popUpElement.classList.remove(el2HideClassRemove);
    popUpElement.classList.add(el2ShowClassAdd);
    body.classList.toggle("__fixed");
    setTimeout(function FormFadeIn() {
      popUp.style.display = state;
    }, timing);
  };

  const popupClose = () => {
    if (window.getComputedStyle(popupForm).display === "flex") {
      popupToggle(
        popupForm,
        formPopup,
        "animate__fadeOut",
        "animate__bounceOutUp",
        "animate__fadeIn",
        "animate__bounceInDown",
        "none",
        1000
      );
      return false;
    }
  };

  if (popupBg) {
    popupBg.forEach(function (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        popupClose();
      });
    });
  }

  if (closePopup) {
    closePopup.forEach(function (close) {
      close.addEventListener("click", function (e) {
        popupClose();
        e.preventDefault();
      });
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
      popupClose();
    }
  });
});
