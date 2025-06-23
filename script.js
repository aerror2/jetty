document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // 导航链接点击平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 导航链接激活状态
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });
    
    // 表单验证
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // 简单验证
            if (nameInput.value.trim() === '') {
                showError(nameInput, '请输入您的姓名');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                showError(emailInput, '请输入您的电子邮箱');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, '请输入有效的电子邮箱地址');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (subjectInput.value.trim() === '') {
                showError(subjectInput, '请输入主题');
                isValid = false;
            } else {
                removeError(subjectInput);
            }
            
            if (messageInput.value.trim() === '') {
                showError(messageInput, '请输入留言内容');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // 在实际应用中，这里会发送表单数据到服务器
                // 这里仅做演示，显示成功消息
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = '您的留言已成功发送，我们将尽快与您联系！';
                successMessage.style.color = '#00cc99';
                successMessage.style.padding = '10px';
                successMessage.style.marginTop = '10px';
                successMessage.style.backgroundColor = 'rgba(0, 204, 153, 0.1)';
                successMessage.style.borderRadius = '5px';
                
                contactForm.appendChild(successMessage);
                contactForm.reset();
                
                // 5秒后移除成功消息
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = '#ff6600';
            errorElement.style.fontSize = '0.85rem';
            errorElement.style.marginTop = '5px';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.style.borderColor = '#ff6600';
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.style.borderColor = '';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // 产品轮播效果（简单实现，实际项目可能需要更复杂的轮播库）
    const productSlider = document.querySelector('.product-slider');
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    // 这里仅做简单演示，实际项目可能需要更复杂的轮播功能
    function setupSimpleSlider(sliderElement) {
        if (!sliderElement) return;
        
        const items = sliderElement.children;
        if (items.length <= 1) return;
        
        // 为移动设备添加触摸滑动效果
        let startX, moveX;
        let isDown = false;
        
        sliderElement.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX;
        });
        
        sliderElement.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        sliderElement.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        sliderElement.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            moveX = e.pageX;
            const walk = moveX - startX;
            
            if (Math.abs(walk) > 100) {
                if (walk > 0) {
                    // 向右滑动，显示上一个
                    sliderElement.appendChild(sliderElement.firstElementChild);
                } else {
                    // 向左滑动，显示下一个
                    sliderElement.prepend(sliderElement.lastElementChild);
                }
                isDown = false;
            }
        });
        
        // 触摸事件支持
        sliderElement.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX;
        }, { passive: true });
        
        sliderElement.addEventListener('touchend', () => {
            if (Math.abs(moveX - startX) > 100) {
                if (moveX > startX) {
                    // 向右滑动，显示上一个
                    sliderElement.appendChild(sliderElement.firstElementChild);
                } else {
                    // 向左滑动，显示下一个
                    sliderElement.prepend(sliderElement.lastElementChild);
                }
            }
        }, { passive: true });
        
        sliderElement.addEventListener('touchmove', (e) => {
            moveX = e.touches[0].pageX;
        }, { passive: true });
    }
    
    setupSimpleSlider(productSlider);
    setupSimpleSlider(testimonialSlider);
});