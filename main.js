/**
 * فایل اسکریپت اصلی سایت فروشگاه امیری
 * بهینه شده و حذف کدهای غیرضروری
 */

// متغیرهای عمومی
let slideIndex = 0;
let slides, dots, slideInterval;

// متغیرهای مربوط به اسلایدر ویژگی‌ها
let featureSlideIndex = 0;
let featureSlides, featureDots, featureSlideInterval;

// توابع مدیریت مودال‌ها
function toggleModal(modal, isOpen) {
  if (!modal) return;
  
  const backdrop = document.getElementById('modal-backdrop');
  
    if (isOpen) {
        modal.classList.add('active');
    backdrop.classList.add('active');
    document.body.classList.add('modal-open');
    } else {
        modal.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}

function isElementVisible(element) {
  if (!element) return false;
    return element.classList.contains('active');
}

function closeAllModals() {
  const modals = document.querySelectorAll('.profile-panel, .search-overlay, .mobile-menu');
  modals.forEach(modal => toggleModal(modal, false));
}

// تابع برای فرمت‌بندی قیمت
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// تابع برای نمایش پیام‌ها
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = document.createElement('i');
  
  switch (type) {
    case 'success':
      icon.className = 'ri-check-line';
      break;
    case 'error':
      icon.className = 'ri-error-warning-line';
      break;
    case 'info':
      icon.className = 'ri-information-line';
      break;
    case 'warning':
      icon.className = 'ri-alert-line';
      break;
  }
  
  const messageSpan = document.createElement('span');
  messageSpan.textContent = message;
  
  toast.appendChild(icon);
  toast.appendChild(messageSpan);
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// تابع برای نمایش اعلان‌ها
function showNotification(message, type = "info") {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  const icon = document.createElement('i');
  switch (type) {
    case 'success':
      icon.className = 'ri-check-line';
      break;
    case 'error':
      icon.className = 'ri-error-warning-line';
      break;
    case 'info':
      icon.className = 'ri-information-line';
      break;
    case 'warning':
      icon.className = 'ri-alert-line';
                    break;
  }
  
  const messageSpan = document.createElement('span');
  messageSpan.textContent = message;
  
  const closeBtn = document.createElement('button');
  closeBtn.className = 'notification-close';
  closeBtn.innerHTML = '<i class="ri-close-line"></i>';
  closeBtn.addEventListener('click', () => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  });
  
  notification.appendChild(icon);
  notification.appendChild(messageSpan);
  notification.appendChild(closeBtn);
  
  const container = document.querySelector('.notification-container') || (() => {
    const newContainer = document.createElement('div');
    newContainer.className = 'notification-container';
    document.body.appendChild(newContainer);
    return newContainer;
  })();
  
  container.appendChild(notification);
  
            setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
            setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// توابع مربوط به اسلایدر اصلی
function showSlide(n) {
  if (!slides || slides.length === 0) return;
  
  // بررسی محدوده اسلایدها
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;
  
  // غیرفعال کردن همه اسلایدها و نقاط
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // فعال کردن اسلاید و نقطه جاری
  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
}

function changeSlide(n) {
  clearInterval(slideInterval); // توقف اسلاید خودکار
  slideIndex += n;
  showSlide(slideIndex);
  startSlideInterval(); // شروع مجدد اسلاید خودکار
}

function currentSlide(n) {
  clearInterval(slideInterval); // توقف اسلاید خودکار
  slideIndex = n;
  showSlide(slideIndex);
  startSlideInterval(); // شروع مجدد اسلاید خودکار
}

    function startSlideInterval() {
        slideInterval = setInterval(() => {
    slideIndex++;
    showSlide(slideIndex);
        }, 5000); // هر 5 ثانیه
    }

// تابع برای شمارنده معکوس تخفیفات ویژه
function updateCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
  
  // تاریخ پایان تخفیفات (مثلاً 2 روز دیگر)
    const endDate = new Date();
  endDate.setDate(endDate.getDate() + 2);
  endDate.setHours(18);
  endDate.setMinutes(45);
  endDate.setSeconds(33);
  
  // بروزرسانی شمارنده هر ثانیه
  setInterval(() => {
    const now = new Date();
    const diff = endDate - now;
        
        if (diff <= 0) {
      // زمان به پایان رسیده
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
            return;
        }
        
    // محاسبه زمان باقیمانده
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
    // نمایش زمان باقیمانده
    daysEl.textContent = days < 10 ? '0' + days : days;
    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
  }, 1000);
}

// توابع مربوط به اسلایدر حرفه‌ای و مدرن
function initMainSlider() {
  const sliderContainer = document.querySelector('.hero-slider .slider-container');
  if (!sliderContainer) return;
  
  slides = document.querySelectorAll('.hero-slider .slider-slide');
  dots = document.querySelectorAll('.hero-slider .indicator');
  const prevBtn = sliderContainer.querySelector('.prev');
  const nextBtn = sliderContainer.querySelector('.next');
  
  if (slides.length === 0) return;
  
  // اضافه کردن رویدادهای کلیک
  if (prevBtn) {
    prevBtn.addEventListener('click', () => changeSlide(-1));
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => changeSlide(1));
  }
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => currentSlide(index));
  });
  
  // شروع اسلایدر
  showSlide(0);
  startSlideInterval();
  
  // توقف اسلاید خودکار هنگام هاور روی اسلایدر
  sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
  sliderContainer.addEventListener('mouseleave', startSlideInterval);
}

// توابع مربوط به اسلایدر بخش محصولات
function initProductsSlider() {
  const mainSlider = document.getElementById('mainSlider');
  if (!mainSlider) return;
  
  const slides = mainSlider.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  let currentSlide = 0;
  let autoSlideInterval;
  
  function showProductSlide(index) {
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
            } else {
      currentSlide = index;
    }
    
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }
  
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      showProductSlide(currentSlide + 1);
    }, 5000);
  }
  
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  
  // اضافه کردن رویدادهای کلیک
  document.querySelector('.prev-arrow')?.addEventListener('click', () => {
    showProductSlide(currentSlide - 1);
    stopAutoSlide();
    startAutoSlide();
  });
  
  document.querySelector('.next-arrow')?.addEventListener('click', () => {
    showProductSlide(currentSlide + 1);
    stopAutoSlide();
    startAutoSlide();
  });
  
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showProductSlide(i);
      stopAutoSlide();
      startAutoSlide();
    });
  });
  
  // اضافه کردن رویدادهای هاور
  mainSlider.addEventListener('mouseenter', stopAutoSlide);
  mainSlider.addEventListener('mouseleave', startAutoSlide);
  
  // شروع اسلایدر
  showProductSlide(0);
  startAutoSlide();
  
  // تنظیم سوایپ برای موبایل
  setupTouchSwipe(mainSlider, () => {
    showProductSlide(currentSlide - 1);
    stopAutoSlide();
    startAutoSlide();
  }, () => {
    showProductSlide(currentSlide + 1);
    stopAutoSlide();
    startAutoSlide();
  });
}

// تابع برای سوایپ در موبایل
function setupTouchSwipe(element, onSwipeRight, onSwipeLeft) {
  if (!element) return;
  
  let startX, startY, distX, distY;
  const threshold = 50; // حداقل فاصله برای تشخیص سوایپ
  const restraint = 100; // حداکثر انحراف عمودی
  
  element.addEventListener('touchstart', (e) => {
    const touch = e.changedTouches[0];
    startX = touch.pageX;
    startY = touch.pageY;
  }, { passive: true });
  
  element.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0];
    distX = touch.pageX - startX;
    distY = Math.abs(touch.pageY - startY);
    
    // اگر حرکت افقی بیشتر از آستانه و انحراف عمودی کمتر از محدودیت باشد
    if (Math.abs(distX) >= threshold && distY <= restraint) {
      if (distX > 0) {
        // سوایپ به راست
        if (onSwipeRight) onSwipeRight();
    } else {
        // سوایپ به چپ
        if (onSwipeLeft) onSwipeLeft();
      }
    }
  }, { passive: true });
}

// تابع برای فیلتر محصولات در بخش محصولات پرفروش
function setupProductFilters() {
  const filterBtns = document.querySelectorAll('.trending-filters .filter-btn');
  const productCards = document.querySelectorAll('.trending-grid .product-card');
  
  if (filterBtns.length === 0 || productCards.length === 0) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // حذف کلاس active از همه دکمه‌ها
      filterBtns.forEach(b => b.classList.remove('active'));
      
      // اضافه کردن کلاس active به دکمه کلیک شده
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      // نمایش یا مخفی کردن محصولات بر اساس فیلتر
      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// توابع مربوط به فرم‌های احراز هویت
function setupAuthForms() {
  const profilePanel = document.getElementById('profile-panel');
  if (!profilePanel) return;
  
  const loginForm = profilePanel.querySelector('.login-form');
  const registerForm = profilePanel.querySelector('.register-form');
  const otpForm = profilePanel.querySelector('.otp-form');
  const resetForm = profilePanel.querySelector('.reset-form');
  
  const switchToRegister = document.getElementById('switch-to-register');
  const switchToLogin = document.getElementById('switch-to-login');
  const otpLoginBtn = document.getElementById('otp-login-btn');
  const backToLogin = document.getElementById('back-to-login');
  const forgotPasswordLink = document.getElementById('forgot-password-link');
  const backToLoginReset = document.getElementById('back-to-login-reset');
  
  if (switchToRegister) {
    switchToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.classList.remove('active');
      registerForm.classList.add('active');
    });
  }
  
  if (switchToLogin) {
    switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
      registerForm.classList.remove('active');
      loginForm.classList.add('active');
    });
  }
  
  if (otpLoginBtn) {
    otpLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.classList.remove('active');
      otpForm.classList.add('active');
    });
  }
  
  if (backToLogin) {
    backToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      otpForm.classList.remove('active');
      loginForm.classList.add('active');
    });
  }
  
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.classList.remove('active');
      resetForm.classList.add('active');
    });
  }
  
  if (backToLoginReset) {
    backToLoginReset.addEventListener('click', (e) => {
      e.preventDefault();
      resetForm.classList.remove('active');
      loginForm.classList.add('active');
    });
  }
  
  // تنظیم رویدادهای فرم‌ها
  setupLoginForm();
  setupRegisterForm();
  setupOtpForm();
  setupResetForm();
  
  // تنظیم رویدادهای مربوط به نمایش/مخفی کردن رمز عبور
  setupPasswordToggle();
}

// تابع برای نمایش/مخفی کردن رمز عبور
function setupPasswordToggle() {
  const toggleButtons = document.querySelectorAll('.toggle-password');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const input = button.previousElementSibling;
      const icon = button.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'ri-eye-off-line';
      } else {
        input.type = 'password';
        icon.className = 'ri-eye-line';
      }
    });
  });
}

// توابع کمکی برای فرم‌های احراز هویت
function setupLoginForm() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;
  
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = this.querySelector('[name="username"]').value;
    const password = this.querySelector('[name="password"]').value;
    const remember = this.querySelector('[name="remember"]')?.checked;
    
    // بررسی اعتبارسنجی ساده
    if (!username || !password) {
      showNotification('لطفاً تمامی فیلدها را پر کنید.', 'error');
      return;
    }
    
    // اینجا می‌توانید کد ارسال فرم به سرور را قرار دهید
    console.log('Login attempt:', { username, password, remember });
    
    // نمایش پیام موفقیت (این بخش در حالت واقعی باید پس از پاسخ موفق از سرور اجرا شود)
    showNotification('ورود با موفقیت انجام شد.', 'success');
    
    // بستن پنل پروفایل
    setTimeout(() => {
      toggleModal(document.getElementById('profile-panel'), false);
    }, 1000);
  });
}

function setupRegisterForm() {
  const registerForm = document.getElementById('register-form');
  if (!registerForm) return;
  
  registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
    
    const fullname = this.querySelector('[name="fullname"]').value;
    const email = this.querySelector('[name="email"]').value;
    const phone = this.querySelector('[name="phone"]').value;
    const password = this.querySelector('[name="password"]').value;
    const terms = this.querySelector('[name="terms"]')?.checked;
    
    // بررسی اعتبارسنجی ساده
    if (!fullname || !email || !phone || !password) {
      showNotification('لطفاً تمامی فیلدها را پر کنید.', 'error');
      return;
    }
    
    // بررسی فرمت ایمیل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('لطفاً یک ایمیل معتبر وارد کنید.', 'error');
      return;
    }
    
    // بررسی فرمت شماره موبایل
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phone)) {
      showNotification('لطفاً یک شماره موبایل معتبر وارد کنید.', 'error');
      return;
    }
    
    // بررسی طول رمز عبور
    if (password.length < 8) {
      showNotification('رمز عبور باید حداقل 8 کاراکتر باشد.', 'error');
      return;
    }
    
    // بررسی پذیرش قوانین
    if (!terms) {
      showNotification('لطفاً قوانین و مقررات را بپذیرید.', 'error');
                return;
            }
            
    // اینجا می‌توانید کد ارسال فرم به سرور را قرار دهید
    console.log('Register attempt:', { fullname, email, phone, password, terms });
    
    // نمایش پیام موفقیت (این بخش در حالت واقعی باید پس از پاسخ موفق از سرور اجرا شود)
    showNotification('ثبت‌نام با موفقیت انجام شد.', 'success');
    
    // بستن پنل پروفایل
            setTimeout(() => {
      toggleModal(document.getElementById('profile-panel'), false);
    }, 1000);
  });
}

function setupOtpForm() {
  const otpRequestForm = document.getElementById('otp-request-form');
  const otpVerifyForm = document.getElementById('otp-verify-form');
  if (!otpRequestForm || !otpVerifyForm) return;
  
  otpRequestForm.addEventListener('submit', function(e) {
                e.preventDefault();
    
    const phone = this.querySelector('[name="phone"]').value;
    
    // بررسی فرمت شماره موبایل
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phone)) {
      showNotification('لطفاً یک شماره موبایل معتبر وارد کنید.', 'error');
      return;
    }
    
    // اینجا می‌توانید کد ارسال درخواست OTP به سرور را قرار دهید
    console.log('OTP request for:', phone);
    
    // نمایش فرم تأیید OTP (این بخش در حالت واقعی باید پس از پاسخ موفق از سرور اجرا شود)
    otpRequestForm.style.display = 'none';
    otpVerifyForm.style.display = 'block';
    
    // شروع تایمر OTP
    startOtpTimer();
    
    // نمایش پیام
    showNotification('کد تأیید به شماره موبایل شما ارسال شد.', 'success');
  });
  
  // تنظیم ورودی‌های OTP
  const otpInputs = document.querySelectorAll('.otp-input');
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', function() {
      if (this.value.length === 1) {
        if (index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      }
      
      updateCompleteOtp();
    });
    
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace' && !this.value && index > 0) {
        otpInputs[index - 1].focus();
      }
                });
            });
  
  function updateCompleteOtp() {
    const completeOtp = Array.from(otpInputs).map(input => input.value).join('');
    document.getElementById('otp-code-complete').value = completeOtp;
  }
  
  otpVerifyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const otp = document.getElementById('otp-code-complete').value;
    
    // بررسی طول OTP
    if (otp.length !== 5) {
      showNotification('لطفاً کد 5 رقمی را کامل وارد کنید.', 'error');
      return;
    }
    
    // اینجا می‌توانید کد ارسال تأیید OTP به سرور را قرار دهید
    console.log('OTP verification:', otp);
    
    // نمایش پیام موفقیت (این بخش در حالت واقعی باید پس از پاسخ موفق از سرور اجرا شود)
    showNotification('ورود با موفقیت انجام شد.', 'success');
    
    // بستن پنل پروفایل
    setTimeout(() => {
      toggleModal(document.getElementById('profile-panel'), false);
    }, 1000);
  });
  
  // تنظیم دکمه ارسال مجدد
  const resendOtp = document.getElementById('resend-otp');
  if (resendOtp) {
    resendOtp.addEventListener('click', function() {
      if (this.disabled) return;
      
      const phone = otpRequestForm.querySelector('[name="phone"]').value;
      
      // اینجا می‌توانید کد ارسال مجدد OTP به سرور را قرار دهید
      console.log('Resend OTP for:', phone);
      
      // شروع مجدد تایمر
      startOtpTimer();
      
      // نمایش پیام
      showNotification('کد تأیید مجدداً ارسال شد.', 'info');
    });
  }
}

function startOtpTimer() {
  const timerElement = document.getElementById('otp-timer-count');
  const resendButton = document.getElementById('resend-otp');
  if (!timerElement || !resendButton) return;
  
  let timeLeft = 120; // 2 دقیقه
  resendButton.disabled = true;
  
  const timerInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      resendButton.disabled = false;
    } else {
      timeLeft--;
    }
  }, 1000);
}

function setupResetForm() {
  const resetForm = document.getElementById('reset-request-form');
  if (!resetForm) return;
  
  resetForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('[name="email"]').value;
    
    // بررسی فرمت ایمیل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('لطفاً یک ایمیل معتبر وارد کنید.', 'error');
      return;
    }
    
    // اینجا می‌توانید کد ارسال درخواست بازیابی رمز عبور به سرور را قرار دهید
    console.log('Password reset request for:', email);
    
    // نمایش پیام موفقیت (این بخش در حالت واقعی باید پس از پاسخ موفق از سرور اجرا شود)
    const resetMessage = document.getElementById('reset-message');
    if (resetMessage) {
      resetMessage.innerHTML = 'لینک بازیابی رمز عبور به ایمیل شما ارسال شد.';
      resetMessage.classList.add('success');
    }
    
    showNotification('لینک بازیابی رمز عبور به ایمیل شما ارسال شد.', 'success');
  });
}

// تابع برای نمایش لودر صفحه
function showPageLoadingAnimation() {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="loader-spinner">
      <svg viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
    </div>
  `;
  
  document.body.appendChild(loader);
  
  // حذف لودر پس از بارگذاری کامل صفحه
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('loaded');
      setTimeout(() => {
        document.body.removeChild(loader);
      }, 500);
    }, 500);
  });
}

// تابع برای افکت‌های ظاهری
function setupVisualEffects() {
    // افکت ریپل برای دکمه‌ها
    enableRippleEffect();
    
    // افکت پارالاکس برای تصاویر
    setupParallaxEffect();
    
    // انیمیشن اسکرول
    setupScrollAnimations();
    
    // افکت هاور برای محصولات
    setupProductHoverEffects();
  }
  
  // افکت ریپل برای دکمه‌ها
    function enableRippleEffect() {
    const buttons = document.querySelectorAll('.view-product-btn, .view-more-btn, .auth-btn, .slider-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
  // افکت پارالاکس برای تصاویر
  function setupParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.bento-card-large .bento-image-bg');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top + scrollY;
        const elementBottom = elementTop + element.offsetHeight;
        
        if (scrollY + window.innerHeight > elementTop && scrollY < elementBottom) {
          const speed = 0.1;
          const yPos = (scrollY - elementTop) * speed;
          element.style.transform = `translateY(${yPos}px)`;
        }
      });
    });
  }
  
  // انیمیشن اسکرول
  function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-title, .product-item, .special-offer-card, .blog-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  // افکت هاور برای محصولات
  function setupProductHoverEffects() {
    const productItems = document.querySelectorAll('.product-item, .product-card');
    
    productItems.forEach(item => {
      const image = item.querySelector('img');
      if (!image) return;
      
      item.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.05)';
      });
      
      item.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
      });
    });
  }
  
  // تابع برای بارگذاری تنبل تصاویر
  function setupLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      // استفاده از ویژگی loading="lazy" مرورگر
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        img.src = img.dataset.src;
        img.loading = 'lazy';
      });
    } else {
      // پیاده‌سازی بارگذاری تنبل با Intersection Observer
      const lazyImages = document.querySelectorAll('img[data-src]');
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.dataset.src;
            imageObserver.unobserve(image);
                    }
                });
            });
      
      lazyImages.forEach(image => {
        imageObserver.observe(image);
      });
    }
  }
  
  // تابع برای مدیریت جستجو
  function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('search-suggestions');
    const searchResults = document.getElementById('search-results');
    const voiceSearchBtn = document.getElementById('voice-search');
    
    if (!searchInput) return;
    
    // جستجوی متنی
    searchInput.addEventListener('input', debounce(function() {
      const query = this.value.trim();
      
      if (query.length < 2) {
        searchSuggestions.style.display = 'block';
        searchResults.style.display = 'none';
        searchResults.innerHTML = '';
                    return;
                }
                
      // در حالت واقعی، اینجا باید درخواست به سرور ارسال شود
      // برای نمونه، نتایج ساختگی نمایش داده می‌شود
      searchSuggestions.style.display = 'none';
      searchResults.style.display = 'block';
                
                // نمایش لودر
      searchResults.innerHTML = '<div class="search-loading"><i class="ri-loader-4-line"></i></div>';
                
      // شبیه‌سازی تأخیر شبکه
                setTimeout(() => {
        // نتایج ساختگی
        const mockResults = [
          { id: 1, name: 'کفش نایک ایرمکس 2025', price: '2,380,000', image: 'images/products/shoe1.webp', category: 'ورزشی' },
          { id: 2, name: 'کفش آدیداس اولترابوست 24', price: '3,850,000', image: 'images/products/shoe2.webp', category: 'ورزشی' },
          { id: 3, name: 'کفش پوما متریکس', price: '2,790,000', image: 'images/products/shoe3.webp', category: 'روزمره' }
        ];
        
        if (mockResults.length > 0) {
          let resultsHTML = '<div class="search-results-header"><h3>نتایج جستجو</h3></div><div class="search-results-grid">';
          
          mockResults.forEach(product => {
            resultsHTML += `
              <div class="search-result-item">
                <a href="product-detail.html?id=${product.id}">
                  <div class="search-result-image">
                    <img src="${product.image}" alt="${product.name}">
                    </div>
                  <div class="search-result-info">
                    <h4>${product.name}</h4>
                    <div class="search-result-meta">
                      <span class="search-result-category">${product.category}</span>
                      <span class="search-result-price">${product.price} تومان</span>
                    </div>
                </div>
                </a>
            </div>
        `;
          });
          
          resultsHTML += '</div>';
          searchResults.innerHTML = resultsHTML;
        } else {
          searchResults.innerHTML = '<div class="search-no-results">نتیجه‌ای یافت نشد.</div>';
        }
      }, 500);
    }, 300));
    
    // جستجوی صوتی
    if (voiceSearchBtn && 'webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = 'fa-IR';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      voiceSearchBtn.addEventListener('click', () => {
        recognition.start();
        voiceSearchBtn.innerHTML = '<i class="ri-mic-fill"></i>';
        voiceSearchBtn.classList.add('listening');
      });
      
      recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        searchInput.value = transcript;
        searchInput.dispatchEvent(new Event('input'));
      };
      
      recognition.onend = function() {
        voiceSearchBtn.innerHTML = '<i class="ri-mic-line"></i>';
        voiceSearchBtn.classList.remove('listening');
      };
      
      recognition.onerror = function() {
        voiceSearchBtn.innerHTML = '<i class="ri-mic-line"></i>';
        voiceSearchBtn.classList.remove('listening');
        showNotification('خطا در تشخیص صدا. لطفاً دوباره تلاش کنید.', 'error');
      };
    } else if (voiceSearchBtn) {
      voiceSearchBtn.style.display = 'none';
    }
  }
  
  // تابع debounce برای بهینه‌سازی جستجو
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
  
  // تابع برای بررسی وضعیت اینترنت
  function setupOfflineDetection() {
    window.addEventListener('online', () => {
      showNotification('اتصال به اینترنت برقرار شد.', 'success');
    });
    
    window.addEventListener('offline', () => {
      showNotification('اتصال به اینترنت قطع شد. برخی از ویژگی‌ها ممکن است در دسترس نباشند.', 'warning');
    });
  }
  
  // راه‌اندازی در زمان بارگذاری صفحه
  document.addEventListener('DOMContentLoaded', () => {
    // نمایش لودر صفحه
    showPageLoadingAnimation();
    
    // راه‌اندازی اسلایدر اصلی
    initMainSlider();
    
    // راه‌اندازی اسلایدر محصولات
    initProductsSlider();
    
    // راه‌اندازی فیلتر محصولات
    setupProductFilters();
    
    // راه‌اندازی شمارنده معکوس
    const countdownTimer = document.querySelector('.countdown-timer');
    if (countdownTimer) {
      updateCountdown();
    }
    
    // راه‌اندازی فرم‌های احراز هویت
    setupAuthForms();
    
    // راه‌اندازی افکت‌های ظاهری
    setupVisualEffects();
    
    // راه‌اندازی بارگذاری تنبل تصاویر
    setupLazyLoading();
    
    // راه‌اندازی جستجو
    setupSearch();
    
    // بررسی وضعیت اینترنت
    setupOfflineDetection();
    
    // راه‌اندازی رویدادهای مودال‌ها
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    const searchToggle = document.getElementById('search-toggle');
    const closeSearch = document.getElementById('close-search');
    const searchOverlay = document.getElementById('search-overlay');
    
    const profileToggle = document.getElementById('profile-toggle');
    const closeProfile = document.getElementById('close-profile');
    const profilePanel = document.getElementById('profile-panel');
    
    const modalBackdrop = document.getElementById('modal-backdrop');
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => toggleModal(mobileMenu, true));
    }
    
    if (closeMenu && mobileMenu) {
      closeMenu.addEventListener('click', () => toggleModal(mobileMenu, false));
    }
    
    if (searchToggle && searchOverlay) {
      searchToggle.addEventListener('click', () => toggleModal(searchOverlay, true));
    }
    
    if (closeSearch && searchOverlay) {
      closeSearch.addEventListener('click', () => toggleModal(searchOverlay, false));
    }
    
    if (profileToggle && profilePanel) {
      profileToggle.addEventListener('click', () => toggleModal(profilePanel, true));
    }
    
    if (closeProfile && profilePanel) {
      closeProfile.addEventListener('click', () => toggleModal(profilePanel, false));
    }
    
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', closeAllModals);
    }
    
    // راه‌اندازی دکمه بازگشت به بالا
    setupBackToTop();
  });
  
  // تابع برای دکمه بازگشت به بالا
  function setupBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="ri-arrow-up-line"></i>';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
                } else {
        backToTopBtn.classList.remove('show');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
      // تایمر شمارش معکوس برای بخش تخفیفات ویژه با قابلیت حفظ زمان پس از رفرش
      document.addEventListener('DOMContentLoaded', function() {
        // المنت‌های تایمر
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
          console.error('المنت‌های تایمر پیدا نشدند');
                return;
            }
            
        // بررسی وجود زمان پایان در localStorage یا تنظیم زمان جدید
        let endDate;
        const savedEndTime = localStorage.getItem('specialOfferEndTime');
        
        if (savedEndTime) {
          // استفاده از زمان ذخیره شده
          endDate = new Date(parseInt(savedEndTime));
          
          // بررسی اعتبار تاریخ (اگر تاریخ نامعتبر است یا گذشته، تاریخ جدید تنظیم می‌کنیم)
          if (isNaN(endDate.getTime()) || endDate < new Date()) {
            endDate = createNewEndDate();
          }
                } else {
          // ایجاد و ذخیره زمان پایان جدید
          endDate = createNewEndDate();
        }
        
        // تابع ایجاد تاریخ پایان جدید (دو روز بعد)
        function createNewEndDate() {
          const now = new Date();
          const newEndDate = new Date(now);
          newEndDate.setDate(now.getDate() + 2); // اضافه کردن دو روز
          
          // ذخیره در localStorage
          localStorage.setItem('specialOfferEndTime', newEndDate.getTime().toString());
          
          return newEndDate;
        }
        
        // نمایش تاریخ پایان
        const countdownTimer = document.querySelector('.countdown-timer');
        if (countdownTimer) {
          // حذف نمایش تاریخ قبلی اگر وجود دارد
          const existingEndDateDisplay = countdownTimer.querySelector('.end-date-display');
          if (existingEndDateDisplay) {
            existingEndDateDisplay.remove();
          }
          
          const endDateDisplay = document.createElement('div');
          endDateDisplay.className = 'end-date-display';
          endDateDisplay.style.fontSize = '12px';
          endDateDisplay.style.marginTop = '5px';
          endDateDisplay.style.textAlign = 'center';
          
          // تبدیل تاریخ به فرمت فارسی
          try {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            endDateDisplay.textContent = `تا تاریخ ${endDate.toLocaleDateString('fa-IR', options)}`;
          } catch (e) {
            // روش جایگزین برای نمایش تاریخ فارسی
            const persianMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
            const year = endDate.getFullYear();
            const month = persianMonths[endDate.getMonth()];
            const day = endDate.getDate();
            const hour = endDate.getHours().toString().padStart(2, '0');
            const minute = endDate.getMinutes().toString().padStart(2, '0');
            
            endDateDisplay.textContent = `تا تاریخ ${day} ${month} ${year} ساعت ${hour}:${minute}`;
          }
          
          countdownTimer.appendChild(endDateDisplay);
        }
        
        // تابع بروزرسانی تایمر
        function updateCountdown() {
          const now = new Date().getTime();
          const timeLeft = endDate.getTime() - now;
          
          if (timeLeft <= 0) {
            // زمان به پایان رسیده است
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            
            // ذخیره وضعیت پایان یافته
            localStorage.setItem('specialOfferExpired', 'true');
            
            // نمایش پیام پایان تخفیف
            showExpiredBanner();
            
            clearInterval(countdownInterval);
            return;
        }
        
          // محاسبه زمان باقیمانده
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
          
          // بروزرسانی نمایش تایمر
          daysElement.textContent = days < 10 ? '0' + days : days;
          hoursElement.textContent = hours < 10 ? '0' + hours : hours;
          minutesElement.textContent = minutes < 10 ? '0' + minutes : minutes;
          secondsElement.textContent = seconds < 10 ? '0' + seconds : seconds;
        }
        
        // تابع نمایش بنر پایان تخفیف
        function showExpiredBanner() {
          const specialOffersSection = document.querySelector('.special-offers-section');
          if (specialOffersSection && !document.querySelector('.expired-banner')) {
            const expiredBanner = document.createElement('div');
            expiredBanner.className = 'expired-banner';
            expiredBanner.textContent = 'این تخفیف به پایان رسیده است';
            expiredBanner.style.background = '#ff5252';
            expiredBanner.style.color = 'white';
            expiredBanner.style.padding = '10px';
            expiredBanner.style.borderRadius = '5px';
            expiredBanner.style.textAlign = 'center';
            expiredBanner.style.fontWeight = 'bold';
            expiredBanner.style.marginBottom = '20px';
            
            const sectionHeader = specialOffersSection.querySelector('.section-header');
            if (sectionHeader) {
              specialOffersSection.insertBefore(expiredBanner, sectionHeader.nextSibling);
            }
          }
        }
        
        // بررسی وضعیت پایان یافته قبلی
        if (localStorage.getItem('specialOfferExpired') === 'true') {
          daysElement.textContent = '00';
          hoursElement.textContent = '00';
          minutesElement.textContent = '00';
          secondsElement.textContent = '00';
          showExpiredBanner();
          return; // خروج از اسکریپت اگر قبلاً پایان یافته است
        }
        
        // اجرای اولیه تایمر
        updateCountdown();
        
        // بروزرسانی هر ثانیه
        const countdownInterval = setInterval(updateCountdown, 1000);
        
        // دکمه ریست تایمر برای تست (در محیط توسعه)
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
          const resetButton = document.createElement('button');
          resetButton.textContent = 'ریست تایمر';
          resetButton.style.padding = '5px 10px';
          resetButton.style.margin = '10px 0';
          resetButton.style.cursor = 'pointer';
          
          resetButton.addEventListener('click', function() {
            localStorage.removeItem('specialOfferEndTime');
            localStorage.removeItem('specialOfferExpired');
            location.reload();
          });
          
          const container = document.querySelector('.special-offers-section .container');
          if (container) {
            container.appendChild(resetButton);
          }
  }
});

// توابع مربوط به اسلایدر ویژگی‌ها
function showFeatureSlide(n) {
  if (!featureSlides || featureSlides.length === 0) return;
  
  // بررسی محدوده اسلایدها
  if (n >= featureSlides.length) featureSlideIndex = 0;
  if (n < 0) featureSlideIndex = featureSlides.length - 1;
  
  // غیرفعال کردن همه اسلایدها و نقاط
  featureSlides.forEach(slide => slide.classList.remove('active'));
  featureDots.forEach(dot => dot.classList.remove('active'));
  
  // فعال کردن اسلاید و نقطه جاری
  featureSlides[featureSlideIndex].classList.add('active');
  featureDots[featureSlideIndex].classList.add('active');
}

function changeFeatureSlide(n) {
  clearInterval(featureSlideInterval); // توقف اسلاید خودکار
  featureSlideIndex += n;
  showFeatureSlide(featureSlideIndex);
  startFeatureSlideInterval(); // شروع مجدد اسلاید خودکار
}

function currentFeatureSlide(n) {
  clearInterval(featureSlideInterval); // توقف اسلاید خودکار
  featureSlideIndex = n;
  showFeatureSlide(featureSlideIndex);
  startFeatureSlideInterval(); // شروع مجدد اسلاید خودکار
}

function startFeatureSlideInterval() {
  featureSlideInterval = setInterval(() => {
    featureSlideIndex++;
    showFeatureSlide(featureSlideIndex);
  }, 5000); // هر 5 ثانیه
}

// راه‌اندازی اسلایدر ویژگی‌ها
function initFeatureSlider() {
  const sliderContainer = document.getElementById('mainSlider');
  if (!sliderContainer) return;
  
  featureSlides = document.querySelectorAll('.feature-slide');
  featureDots = document.querySelectorAll('.feature-dot');
  
  if (featureSlides.length === 0) return;
  
  // شروع اسلایدر
  showFeatureSlide(0);
  startFeatureSlideInterval();
  
  // توقف اسلاید خودکار هنگام هاور روی اسلایدر
  sliderContainer.addEventListener('mouseenter', () => clearInterval(featureSlideInterval));
  sliderContainer.addEventListener('mouseleave', startFeatureSlideInterval);
}

// اضافه کردن به رویدادهای DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  // سایر کدهای موجود...
  
  // راه‌اندازی اسلایدر ویژگی‌ها
  initFeatureSlider();
});
document.addEventListener('DOMContentLoaded', function() {
  const brandsTracks = document.querySelectorAll('.brands-track');
  
  if (brandsTracks.length > 0) {
      brandsTracks.forEach(track => {
          // توقف انیمیشن هنگام هاور
          track.addEventListener('mouseenter', function() {
              this.querySelector('.brands-slide').style.animationPlayState = 'paused';
          });
          
          // ادامه انیمیشن پس از خروج ماوس
          track.addEventListener('mouseleave', function() {
              this.querySelector('.brands-slide').style.animationPlayState = 'running';
          });
      });
  }
});
        document.getElementById('closeBtn').addEventListener('click', function() {
            document.getElementById('notificationBar').style.display = 'none';
        });