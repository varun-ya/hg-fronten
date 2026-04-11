"use client";
import { useEffect } from "react";

function MaterialWebLoader() {
  useEffect(() => {
    // importmap
    if (!document.querySelector('script[data-mwc="importmap"]')) {
      const im = document.createElement("script");
      im.type = "importmap";
      im.dataset.mwc = "importmap";
      im.textContent = JSON.stringify({
        imports: { "@material/web/": "https://esm.run/@material/web/" },
      });
      document.head.appendChild(im);
    }
    // module init
    if (!document.querySelector('script[data-mwc="init"]')) {
      const s = document.createElement("script");
      s.type = "module";
      s.dataset.mwc = "init";
      s.textContent = `
        import '@material/web/all.js';
        import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
        document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
      `;
      document.head.appendChild(s);
    }
  }, []);
  return null;
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <MaterialWebLoader />
      {children}
    </>
  );
}
