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
                    '<input type="checkbox" id="thumb' + idx + '" class="sorting-check" name="sortingCheck">' +
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

var $researchBlockThumbnails = document.querySelectorAll('.research-block-wrapper .list-wrap .thumbnail');

$researchBlockThumbnails.forEach(function(thumbnail){
    thumbnail.addEventListener('click', function () {
        var chk = thumbnail.previousSibling.checked;
        
        if (chk) {
            thumbnail.classList.remove('active');
            thumbnail.closest('.list-con').setAttribute( 'data-unChk', '1' );
        } else {
            thumbnail.classList.add('active');
            thumbnail.closest('.list-con').setAttribute( 'data-unChk', '0' );
        }
        researchBlockGrid.isotope('updateSortData').isotope({
            sortBy: 'isChecked'
        });
    });
});