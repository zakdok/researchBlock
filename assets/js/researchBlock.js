var $researchBlockContainer = document.getElementById('researchBlock');
var researchBlockElements = '';

for (var j = 1; j < 10; j++) {
    var forLength = 24;
    var idx;
    for (var i = 1; i < forLength; i++) {
        idx = (forLength * j) + i - forLength;
        researchBlockElements +=
            '<li class="list-con" data-unChk="1">' +
                '<div class="list-inner">' +
                    '<input type="checkbox" id="thumb' + idx + '" class="sorting-check">' +
                    '<label class="thumbnail" for="thumb' + idx + '">' +
                        '<img src="assets/images/example' + i + '.jpg" alt="thumbnail">' +
                    '</label>' +
                '</div>' +
            '</li>';
    }
}

$researchBlockContainer.innerHTML = researchBlockElements;

var maxRowHeightValue = 0;
var maxRowHeight = function () {
    var $thumbnails = document.querySelectorAll('.research-block-wrapper .list-wrap .thumbnail');
    $thumbnails.forEach(function (thumbnail) {
        var thisHeight = thumbnail.clientHeight;
        if (thisHeight > maxRowHeightValue) {
            maxRowHeightValue = thisHeight;
        }
    })
}

var researchBlockGrid = $('.research-block-wrapper .list-wrap').imagesLoaded(function () {
    maxRowHeight();
    console.log(maxRowHeightValue);
    researchBlockGrid.isotope({
        layoutMode: 'cellsByRow',
        itemSelector: '.list-con',
        cellsByRow: {
            rowHeight: maxRowHeightValue
        },
        getSortData: {
            isChecked: '[data-unChk]'
        },
        transitionDuration: 800,
        sortBy: 'isChecked'
    });
});

var $researchBlockThumbnail = $('.research-block-wrapper .list-wrap .thumbnail');

$researchBlockThumbnail.on('click', function () {
    var $this = $(this);
    var isChk = $this.prev().is(":checked");
    if (isChk) {
        $this.removeClass('active');
        $this.parents('.list-con').attr({ 'data-unChk': '1' });
    } else {
        $this.addClass('active');
        $this.parents('.list-con').attr({ 'data-unChk': '0' });
    }
    researchBlockGrid.isotope('updateSortData').isotope({
        sortBy: 'isChecked'
    });
});