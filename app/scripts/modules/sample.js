// import $ from 'jquery';

const sampleFn = () => {
  const menuIcon = document.querySelector('.burger-icon');
  const modalContainer = document.querySelector('.modalContainer');
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('menu-open');
    modalContainer.classList.toggle('_on');
  });
};

sampleFn();
