export function calculateItemsPerRow() {
    var screenWidth = window.innerWidth;
    if (screenWidth >= 1300) {
        screenWidth = 1300;
    }
    const width = 250;
    const row = 2;
    if (screenWidth > width * row) {
        return Math.ceil(screenWidth / width);
    } else {
        return row;
    }
}


