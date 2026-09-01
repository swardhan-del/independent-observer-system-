document.querySelectorAll("[data-copy-prompt]").forEach((button) => {
  button.addEventListener("click", async () => {
    const targetId = button.dataset.copyTarget;
    const target = targetId ? document.getElementById(targetId) : null;
    const value = target?.textContent?.trim();
    if (!value) return;

    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(value);
    } catch {
      button.textContent = "Copy unavailable";
      window.setTimeout(() => {
        button.textContent = "Copy prompt";
      }, 1800);
      return;
    }

    const originalLabel = button.textContent;
    button.textContent = "Copied";
    window.setTimeout(() => {
      button.textContent = originalLabel;
    }, 1800);
  });
});
