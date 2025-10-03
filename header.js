<script>
  function loadHeader() {
    const settings = JSON.parse(localStorage.getItem("siteSettings")) || {};
    const name = settings.companyName || "CLICKWORX";
    const logo = settings.logoUrl || "images/logo.png";
    const links = settings.menuLinks || ["Home","Urgent Sale","More Cars","Search","About Us","Contact Us"];

    document.write(`
      <header style="display:flex;justify-content:space-between;align-items:center;background:#111;padding:8px 30px;color:white;position:sticky;top:0;z-index:1000;border-bottom:2px solid #e50914;border-radius:0 0 12px 12px;">
        <div class="brand" style="display:flex;align-items:center;gap:10px;">
          <img src="${logo}" alt="Logo" style="height:32px;">
          <a href="index.html" class="logo" style="font-size:24px;font-weight:bold;color:#fff;text-decoration:none;">${name}</a>
        </div>
        <nav><ul style="list-style:none;display:flex;gap:16px;margin:0;padding:0;">
          ${links.map(l=>`<li><a href="${l.toLowerCase().replace(/ /g,"")}.html" style="text-decoration:none;color:#fff;font-weight:600;font-size:12px;padding:4px 6px;border-radius:4px;transition:all 0.3s;">${l}</a></li>`).join("")}
        </ul></nav>
      </header>
    `);
  }
</script>
