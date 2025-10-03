<script>
  function loadSlideshow(title, subtitle) {
    const banners = JSON.parse(localStorage.getItem("banners")) || {};
    document.write(`
      <div class="slideshow" style="position:relative;overflow:hidden;height:60vh;">
        ${(Object.values(banners).filter(Boolean).map(url=>
          `<img src="${url}" style="width:100%;height:100%;object-fit:cover;filter:brightness(40%);position:absolute;top:0;left:0;">`
        ).join(""))}
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;text-align:center;z-index:2;">
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>
      </div>
    `);
  }
</script>
