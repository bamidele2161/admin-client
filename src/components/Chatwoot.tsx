/// <reference lib="dom" />

import { useEffect } from "react";

declare global {
  interface Window {
    chatwootSettings: {
      hideMessageBubble: boolean;
      position: string;
      locale: string;
      type: string;
    };
    chatwootSDK: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
    };
  }
}

function Livechat() {
  useEffect(() => {
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: "right",
      locale: "en",
      type: "standard",
    };

    (function (d, t) {
      const BASE_URL = "https://app.chatwoot.com";

      const g = d.createElement(t) as HTMLScriptElement,
        s = d.getElementsByTagName(t)[0];

      g.src = BASE_URL + "/packs/js/sdk.js";
      g.defer = true;
      g.async = true;

      if (s.parentNode) {
        s.parentNode?.insertBefore(g, s);
      }

      g.onload = function () {
        window.chatwootSDK.run({
          websiteToken: import.meta.env.VITE_REACT_APP_WEBSITE_TOKEN,
          baseUrl: BASE_URL,
        });
      };
    })(document, "script");
  }, []);

  return null;
}

export default Livechat;
