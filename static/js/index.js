window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();

})

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("video.demo-media, audio.demo-media").forEach(el => {
    el.setAttribute("controlsList", "nodownload noplaybackrate");
    el.addEventListener("contextmenu", e => e.preventDefault());
  });
});


function applyDemoMediaOptions() {
  $('.demo-media').each(function() {
    this.setAttribute('controlsList', 'nodownload noremoteplayback');
    this.addEventListener('contextmenu', function(e) { e.preventDefault(); });
  });

  $('video.demo-media').each(function() {
    this.muted = false;
    this.defaultMuted = false;
    this.removeAttribute('muted');
  });
}


$(document).ready(function() {
  // ... existing carousel/slider init ...

  $('#demo-tbody-vggsoundclean').load('demo_vggsoundclean.html', function() {
    applyDemoMediaOptions();
    document.querySelectorAll('.demo-table-wrap').forEach(setupSyncedTopScrollbar);
  });

  $('#demo-tbody-music').load('demo_music.html', function() {
    applyDemoMediaOptions();
    document.querySelectorAll('.demo-table-wrap').forEach(setupSyncedTopScrollbar);
  });
});

function setupSyncedTopScrollbar(wrapper) {
  const top = wrapper.querySelector('.demo-xscroll-top');
  const topInner = wrapper.querySelector('.demo-xscroll-inner');
  const main = wrapper.querySelector('.demo-xscroll-main');

  if (!top || !topInner || !main) return;

  const table = main.querySelector('table');
  const refresh = () => {
    const w = table ? table.scrollWidth : main.scrollWidth;
    topInner.style.width = w + 'px';
  };
  refresh();

  let lock = false;
  top.addEventListener('scroll', () => {
    if (lock) return;
    lock = true;
    main.scrollLeft = top.scrollLeft;
    lock = false;
  });
  main.addEventListener('scroll', () => {
    if (lock) return;
    lock = true;
    top.scrollLeft = main.scrollLeft;
    lock = false;
  });

  window.addEventListener('resize', refresh);

  setTimeout(refresh, 300);
  setTimeout(refresh, 1000);
}