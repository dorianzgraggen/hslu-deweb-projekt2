setInterval(async () => {
  const res = await fetch("/api/file-changes?s=" + encodeURIComponent(window.location.pathname));
  const txt = await res.text();

  if (txt === "1") {
    window.location.reload();
  }
}, 100);
