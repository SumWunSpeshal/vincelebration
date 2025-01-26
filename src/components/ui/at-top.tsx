import { useEffect } from "react";

function determine() {
  if (window.scrollY === 0) {
    document.body.classList.add("at-top");
  } else {
    document.body.classList.remove("at-top");
  }
}

export function AtTop() {
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    determine();

    document.addEventListener("scroll", determine, { signal });

    return () => controller.abort();
  }, []);
  return null;
}
