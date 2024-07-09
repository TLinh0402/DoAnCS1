/**
* Template Name: Gp
* Updated: May 18 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button xu li nut di chuyen len 
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * xu li thanh menu
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()   //preventDefault xu li mac dinh 
      this.nextElementSibling.classList.toggle('dropdown-active')  // áp dụng cho hiển thị và ẩn đi 
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */

  //doan ma chuyen doi thanh menu thanh dieu huong di dong
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle') 
        navbarToggle.classList.toggle('bi-list') //ap dung cho viec an hien nut home 
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url  
   * dung de kie tra xem co phan tu nao trung k neu co thi se cuon toi do 
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   * an bot phan tu da tai hoan tat khi. hien thi cac phan tuu tai
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Clients Slider
   */
  // new Swiper('.clients-slider', {
  //   speed: 400,
  //   loop: true,
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false
  //   },
  //   slidesPerView: 'auto',
  //   pagination: {
  //     el: '.swiper-pagination',
  //     type: 'bullets',
  //     clickable: true
  //   },
  //   breakpoints: {
  //     320: {
  //       slidesPerView: 2,
  //       spaceBetween: 40
  //     },
  //     480: {
  //       slidesPerView: 3,
  //       spaceBetween: 60
  //     },
  //     640: {
  //       slidesPerView: 4,
  //       spaceBetween: 80
  //     },
  //     992: {
  //       slidesPerView: 6,
  //       spaceBetween: 120
  //     }
  //   }
  // });

  /**
   * trang cac dia diem noi tieng 
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item' //chon loc va sap xep 
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active'); 

        //dug de loc tu doi so filer cua li 
        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter') //dung de loc cac phan tu 
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh() //tao hieu ung 
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  // const portfolioLightbox = GLightbox({
  //   selector: '.portfolio-lightbox'
  // });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400, //toc do chuyen doi giua cac anh
    loop: true,  //cho phep lap lai toi cuoi ds
    autoplay: {  //tu dong chuyen doi cac anh trong time cho cua cau hinh
      delay: 5000,
      disableOnInteraction: false
    },
    //hien thi phan trang neu nguoi hien thi muon
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll  
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000, //time de hoan thanh hieu ung
      easing: "ease-in-out",  //kieu hinh dang cua hieu ung
      once: true,  //chi kich hoat hieu ung mot lan
      mirror: false  //ap dung hieu ung khi nguoi dung cuon trang xuonn va len
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

// let formBtn= document.querySelector('#login-btn');



let formBtn = document.querySelector('#login-btn');
let dkBtn = document.querySelector('#register-btn');
let loginForm = document.querySelector('.login-form-container');
let dkForm = document.querySelector('.register-form-container');
let loginFormClose = document.querySelector('#login-form-close');
let dkFormClose = document.querySelector('#register-form-close');

formBtn.addEventListener('click', () => {
  loginForm.classList.add('active');
  dkForm.classList.remove('active');
});

dkBtn.addEventListener('click', () => {
  loginForm.classList.remove('active');
  dkForm.classList.add('active');
});



loginFormClose.addEventListener('click', () => {
  loginForm.classList.remove('active');
});

dkFormClose.addEventListener('click', () => {
  dkForm.classList.remove('active');
  //  loginForm.classList.add('active');
});

// slider

