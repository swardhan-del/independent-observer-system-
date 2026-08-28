const header = document.querySelector<HTMLElement>(".site-header");

if (header) {
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
