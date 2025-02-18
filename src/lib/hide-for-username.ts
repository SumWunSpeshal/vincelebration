import type { CloudinaryResponse } from "@/clients/cloudinary";

export function hideForUsername(usernameCookie: { value: string } | undefined) {
  return (el: CloudinaryResponse["resources"][number]) => {
    const json = (el.context as { hideForUsernames?: string })
      ?.hideForUsernames;

    if (!json) {
      return true;
    }

    const hideForUsernames: string[] = JSON.parse(json);
    return !hideForUsernames.includes(usernameCookie?.value || "");
  };
}
