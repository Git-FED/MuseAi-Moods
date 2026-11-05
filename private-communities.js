(() => {
  const age = document.querySelector('#matrix-age');
  const country = document.querySelector('#matrix-country');
  const reveal = document.querySelector('#matrix-reveal');
  const result = document.querySelector('#matrix-result');
  if (!age || !country || !reveal || !result) return;
  const sync = () => { reveal.disabled = !(age.checked && country.checked); };
  age.addEventListener('change', sync);
  country.addEventListener('change', sync);
  reveal.addEventListener('click', () => {
    if (reveal.disabled) return;
    result.hidden = false;
    reveal.hidden = true;
  });
})();
