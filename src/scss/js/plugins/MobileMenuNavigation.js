class MobileMenuNavigation {
    constructor() {

        this.attributes = {
            menu: "[data-mobile-menu]",
            hamburger: "[data-mobile-menu-hamburger]",
            header: 'header',
            body: 'body',

        };
        this.headingSize = ['header','#bx-panel']
        this.status = 'disable';

        //selectors
        this.body = document.querySelector(this.attributes.body);
        this.header = document.querySelector(this.attributes.header);
        this.hamburger = document.querySelector(this.attributes.hamburger);
        this.menu = document.querySelector(this.attributes.menu);
        this.panel = document.querySelector(this.attributes.panel);

        this.registerEvents();

    }


    registerEvents(){
        this.hamburger.addEventListener('click',this.toggleStatusMenu.bind(this));
    }

    toggleStatusMenu(){
        if(this.status === 'disable'){
            this.status = 'active';
            this.hamburger.classList.add('active');
            this.menu.style.top = this.getSizeHeader()
            this.body.classList.add('no-scroll')
            this.menu.classList.add('active');
        }else{
            this.status = 'disable';
            this.hamburger.classList.remove('active');
            this.body.classList.remove('no-scroll')
            this.menu.classList.remove('active');
        }


    }

    getSizeHeader(){

        let sizeHeading = 0;
        this.headingSize.forEach((selector) => {
            let node = document.querySelector(selector);
            if(typeof node === 'object' && node !== null){
                sizeHeading += node.clientHeight;
            }
        })
        return sizeHeading + 'px';
    }

}

export default new MobileMenuNavigation();

