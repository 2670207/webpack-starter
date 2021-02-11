
import 'owl.carousel';
import $ from 'jquery';

class OwlCarouselPlugin {
    constructor() {

        this.attributes = {
            selector: "[data-owl-carousel]",
        };

        this.nodeCarousel = document.querySelectorAll(this.attributes.selector);
        this.initialize();

    }

    initialize() {
        this.nodeCarousel.forEach((node) => {
            let settings = JSON.parse(node.dataset.owlCarousel);
            console.log(settings);
            $(node).owlCarousel(settings || {});
        });
    }
}

export default new OwlCarouselPlugin();

