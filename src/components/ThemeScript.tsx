// Inline script that runs before paint to set the right theme class on <html>.
// Prevents the flash of wrong theme on first load.
export default function ThemeScript() {
  const code = `(function(){try{var s=localStorage.getItem('yh_theme');var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s||(m?'dark':'light');var d=document.documentElement;if(t==='dark'){d.classList.add('dark');}d.setAttribute('data-theme',t);}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
