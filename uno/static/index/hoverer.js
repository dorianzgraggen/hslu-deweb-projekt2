const hoverer = document.querySelector('.hoverer');

hoverer.onmouseenter = (e) => {
  document.body.classList.add('logo-hover');
  document.body.style.cursor = 'pointer';
};

hoverer.onmouseleave = (e) => {
  document.body.classList.remove('logo-hover');
  document.body.style.cursor = '';
};

let time_down = 0;

hoverer.onmousedown = (e) => {
  time_down = Date.now();
  document.body.classList.add('logo-down');
};

document.body.onmouseup = (e) => {
  setTimeout(() => {
    document.body.classList.remove('logo-down');
  }, Math.max(0, time_down - Date.now() + 100));
};
