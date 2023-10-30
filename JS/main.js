document.addEventListener("DOMContentLoaded", () => {
    let anchorSelector = 'a[href^="#"]';
    let anchorList = document.querySelectorAll(anchorSelector);
    let headerHeight = document.querySelector("header").offsetHeight;

    anchorList.forEach((link) => {
        link.onclick = function (e) {
            e.preventDefault();
            let destination = document.querySelector(this.hash);

            if (destination) {
                let destinationOffset = destination.offsetTop - headerHeight;
                window.scrollTo({
                    top: destinationOffset,
                    behavior: "smooth",
                });
            }
        };
    });

    const setupCarouselControls = (controls, items, currentItem, maxItems) => {
        controls.forEach((control) => {
            control.addEventListener("click", (e) => {
                e.preventDefault();
                const isLeft = e.target.classList.contains("arrow-left");

                if (isLeft) {
                    currentItem -= 1;
                } else {
                    currentItem += 1;
                }

                if (currentItem >= maxItems) {
                    currentItem = 0;
                }

                if (currentItem < 0) {
                    currentItem = maxItems - 1;
                };

                items[currentItem].scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                });

                // Reverte a rolagem imediatamente após o início - Gambiarra
                setTimeout(() => {
                    isScrolling = false;
                }, 10);
            });
        });
    }

    const filmesControls = document.querySelectorAll(".filmes .control");
    const seriesControls = document.querySelectorAll(".series .control");
    const filmesItems = document.querySelectorAll(".filmes .item");
    const seriesItems = document.querySelectorAll(".series .item");

    let filmesCurrentItem = 0;
    let seriesCurrentItem = 0;

    const filmesMaxItems = filmesItems.length;
    const seriesMaxItems = seriesItems.length;

    setupCarouselControls(filmesControls, filmesItems, filmesCurrentItem, filmesMaxItems);
    setupCarouselControls(seriesControls, seriesItems, seriesCurrentItem, seriesMaxItems);
});