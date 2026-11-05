(() => {
  const dialog = document.querySelector('#discord-age-gate');
  const open = document.querySelector('#nsfw-open');
  const check = document.querySelector('#discord-age-check');
  const confirm = document.querySelector('#discord-age-confirm');
  const cancel = document.querySelector('#discord-age-cancel');
  if (!dialog || !open || !check || !confirm || !cancel) return;

  open.addEventListener('click', () => {
    check.checked = false;
    confirm.disabled = true;
    dialog.showModal();
  });
  check.addEventListener('change', () => { confirm.disabled = !check.checked; });
  confirm.addEventListener('click', () => {
    if (!check.checked) return;
    window.location.href = './nsfw-request.html';
  });
  cancel.addEventListener('click', () => { dialog.close(); open.focus(); });
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
})();
