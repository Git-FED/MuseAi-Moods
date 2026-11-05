(() => {
  const open = document.querySelector('#openInvite');
  const modal = document.querySelector('#inviteModal');
  const close = document.querySelector('#closeInvite');
  if (!open || !modal || !close) return;

  open.addEventListener('click', () => modal.showModal());
  close.addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => {
    const rect = modal.getBoundingClientRect();
    const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) modal.close();
  });
})();
