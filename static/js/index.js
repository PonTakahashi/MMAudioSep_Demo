window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
  const options = {
    slidesToScroll: 1,
    slidesToShow: 1,
    loop: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  bulmaCarousel.attach('.carousel', options);
  bulmaSlider.attach();
});

function applyDemoMediaOptions(root) {
  const $root = root ? $(root) : $(document);

  $root.find('.demo-media').each(function() {
    this.setAttribute('controlsList', 'nodownload noremoteplayback noplaybackrate');
    this.addEventListener('contextmenu', function(e) { e.preventDefault(); });
  });

  $root.find('video.demo-media').each(function() {
    this.muted = false;
    this.defaultMuted = false;
    this.removeAttribute('muted');
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyDemoMediaOptions(document);
});

function setActiveLink(dataset, sampleId) {
  $(`.demo-sample-link[data-dataset="${dataset}"]`).removeClass("is-active");
  $(`.demo-sample-link[data-dataset="${dataset}"][data-sample="${sampleId}"]`).addClass("is-active");
}

function loadSample(dataset, sampleId) {
  const target = `#demo-view-${dataset}`;
  const file = `demo_${dataset}_sample${sampleId}.html`;

  $(target).load(file, function() {
    applyDemoMediaOptions(this);
  });

  setActiveLink(dataset, sampleId);
}

$(document).ready(function() {
  // initial view
  loadSample("vggsoundclean", 1);
  loadSample("music", 1);

  // switch by clicking sample links
  $(document).on("click", ".demo-sample-link", function(e) {
    e.preventDefault();
    const dataset = $(this).data("dataset");
    const sampleId = parseInt($(this).data("sample"), 10);
    loadSample(dataset, sampleId);
  });
});