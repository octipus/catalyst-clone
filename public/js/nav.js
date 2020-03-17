/////////////////////   Dynamic Logo for each page   /////////////////////
document.addEventListener('DOMContentLoaded', function(){
  if (window.location.pathname == '/' || window.location.pathname == '/services' || window.location.pathname == '/expertise') {
    window.onload=function(){
     var elem = document.createElement("img");
     elem.setAttribute("src", "../media/SVG/logo-general.svg");
     elem.setAttribute("width", "250");
     elem.setAttribute("alt", "Catalyst Logo");
     document.getElementsByClassName("header__title")[0].appendChild(elem);
     }
   }else if (window.location.pathname == '/pod') {
     window.onload=function(){
      var elem = document.createElement("img");
      elem.setAttribute("src", "../media/SVG/logo-pod.svg");
      elem.setAttribute("width", "250");
      elem.setAttribute("alt", "Catalyst Logo");
      document.getElementsByClassName("header__title")[0].appendChild(elem);
      }
    }else if (window.location.pathname == '/manufacturing') {
      window.onload=function(){
       var elem = document.createElement("img");
       elem.setAttribute("src", "../media/SVG/logo-manufacturing.svg");
       elem.setAttribute("width", "250");
       elem.setAttribute("alt", "Catalyst Logo");
       document.getElementsByClassName("header__title")[0].appendChild(elem);
       }
     }
     else if (window.location.pathname == '/cosmetics') {
       window.onload=function(){
        var elem = document.createElement("img");
        elem.setAttribute("src", "../media/SVG/logo-cosmetics.svg");
        elem.setAttribute("width", "250");
        elem.setAttribute("alt", "Catalyst Logo");
        document.getElementsByClassName("header__title")[0].appendChild(elem);
        }
      }
      else if (window.location.pathname == '/fitness') {
        window.onload=function(){
         var elem = document.createElement("img");
         elem.setAttribute("src", "../media/SVG/logo-fitness.svg");
         elem.setAttribute("width", "250");
         elem.setAttribute("alt", "Catalyst Logo");
         document.getElementsByClassName("header__title")[0].appendChild(elem);
         }
       }
  });

/////////////////////   Navigation  /////////////////////
document.addEventListener('DOMContentLoaded', function(){

(function() {

  var Menu = (function() {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('.menu');
    var menuList = document.querySelector('.menu__list');
    var brand = document.querySelector('.menu__brand');
    var menuItems = document.querySelectorAll('.menu__item');
    var menuLinks = document.getElementsByClassName('menu__link');
    var dropdown = document.getElementById('dropdown');
    var test = document.getElementById('test');
    var dropdownItems = document.querySelectorAll('.submenu__link');

    var active = false;
    var sub_active = false;

    var toggleMenu = function() {
      if (!active) {
        menu.classList.add('menu--active');
        menuList.classList.add('menu__list--active');
        brand.classList.add('menu__brand--active');
        burger.classList.add('burger--close');
        for (var i = 0, ii = menuItems.length; i < ii; i++) {
          menuItems[i].classList.add('menu__item--active');
        }

        active = true;
      } else {
        menu.classList.remove('menu--active');
        menuList.classList.remove('menu__list--active');
        brand.classList.remove('menu__brand--active');
        burger.classList.remove('burger--close');
        for (var i = 0, ii = menuItems.length; i < ii; i++) {
          menuItems[i].classList.remove('menu__item--active');
        }

        active = false;
      }
    };

    if (test) {
      console.log("test");
    }

    var pageDelay = function(e) {
        e.preventDefault();
        setTimeout(function(url) { window.location = url }, 400, this.href);
    };


    var bindActions = function() {
      burger.addEventListener('click', toggleMenu, false);
      menuList.addEventListener('click', toggleMenu, false);

      for(let i = 0; i < menuLinks.length; i++) {
          menuLinks[i].addEventListener("click", pageDelay)
      }

      for(let i = 0; i < dropdownItems.length; i++) {
          dropdownItems[i].addEventListener("click", pageDelay)
      }

      dropdown.addEventListener("click", function(event){ //dropdown menu onClick exception
        event.stopPropagation();
      });

    };


    var init = function() {
      bindActions();
    };

    return {
      init: init
    };

  }());

  Menu.init();

}());
});



/////////////////////   Fadein pageload   /////////////////////
document.addEventListener("DOMContentLoaded", function(e) {
  document.body.classList.remove('fade');
});
      // Fade in page Unload
window.onbeforeunload = function() {
  document.body.classList.add('fade');
};
