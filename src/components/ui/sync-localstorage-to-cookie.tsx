import { useEffect } from "react";

export function SyncLocalStorageToCookie() {
  useEffect(() => {
    const cookies = document.cookie
      .split(";")
      .map((el) => el.trim())
      .map((el) => ({
        key: el.split("=")[0],
        value: el.split("=")[1],
      }));

    if (cookies.some((el) => el.key === "username" && !!el.value)) {
      return;
    }

    if (!localStorage.getItem("username")) {
      return;
    }

    document.cookie =
      "username=" + encodeURIComponent(localStorage.getItem("username")!);

    window.location.reload();
  }, []);

  return null;
}
