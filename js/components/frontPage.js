class FrontPage {
    renderer;
    frontpageSection
    frontPageMain;
    aside;
    data

    constructor(renderer, data, app, cleaner) {
        this.renderer = renderer;
        this.data = data
        this.app = app
        this.cleaner = cleaner
        this.frontpageSection = document.createElement("section");
        this.frontpageSection.classList.add("frontPage");
        this.render();

        this.aside = new Aside(this.frontpageSection, this.renderer, this.data[0].headers[0], this.data[0].reference[0], this.app, this.cleaner);

        this.frontPageMain = new FrontPageMain(this.renderer, this.data[0].title[0]);
    }
    render() {
        this.renderer.render("main", this.frontpageSection)
    }
}


class Aside {
    aside;
    ul;
    logo;
    asideItem;
    frontpageSection;
    renderer;
    logoButton;
    logoLink;
    logoImg;
    navData
    exit
    constructor(frontpageSection, renderer, navData, reference, app, cleaner) {
        this.frontpageSection = frontpageSection;
        this.renderer = renderer;
        this.navData = navData
        this.reference = reference
        this.app = app
        this.cleaner = cleaner

        this.elementsCreate();
        this.logoCreate();
        this.render();
        for (let i = 0; i < Object.keys(this.navData).length; i++) {
            this.asideItem = new AsideItem(this.renderer, this.navData[i], i, this.reference);
        }

    }

    elementsCreate() {
        this.aside = document.createElement("section");
        this.aside.classList.add("frontPage__aside");

        this.ul = document.createElement("ul");
        this.ul.classList.add("frontPage__nav");

        this.language = document.createElement("div");
        this.language.classList.add("frontPage__languages")

        this.en = document.createElement("button");
        this.en.classList.add("frontPage__language");
        this.en.classList.add("frontPage__language--en");
        this.en.innerText = "EN"
        this.en.addEventListener("click", () => this.english())

        this.nl = document.createElement("button");
        this.nl.classList.add("frontPage__language");
        this.nl.classList.add("frontPage__language--nl");
        this.nl.innerText = "NL"
        this.nl.addEventListener("click", () => this.nederlands())
    }

    logoCreate() {
        this.logoButton = document.createElement("button")
        this.logoButton.classList.add("frontPage__logo")
        this.logoLink = document.createElement("figure")
        this.logoLink.classList.add("frontPage__logoLink")
        this.logoImg = document.createElement("img")
        this.logoImg.classList.add("frontPage__logoImg")
        this.logoImg.setAttribute("src", "./img/luc's logo.png");
        this.logoImg.setAttribute("alt", "logo for Luc's portfolio resembling the first letters of the name Luc Zuidema(LZ)");
    }
    english(){
        this.cleaner.clean("body")
        this.app = new App("english")
    }
    nederlands(){
        this.cleaner.clean("body")
        this.app = new App("nederlands")
    }



    render() {
        this.renderer.render(".frontPage", this.aside)
        this.renderer.render(".frontPage__aside", this.logoButton)
        this.renderer.render(".frontPage__logo", this.logoLink)
        this.renderer.render(".frontPage__logoLink", this.logoImg)
        this.renderer.render(".frontPage__aside", this.language)
        this.renderer.render(".frontPage__languages", this.en)
        this.renderer.render(".frontPage__languages", this.nl)
        this.renderer.render(".frontPage__aside", this.ul);
    }
}


class AsideItem {
    item;
    button;
    sphere;
    text;
    renderer;
    i;
    constructor(renderer, data, i, reference) {
        this.renderer = renderer;
        this.data = data
        this.i = i
        this.reference = reference
        this.elementsCreate()
        this.render()
    }
    elementsCreate() {
        this.item = document.createElement("li");
        this.item.classList.add("frontPage__navItem");

        this.button = document.createElement("button");
        this.button.classList.add("frontPage__navButton");

        this.sphere = document.createElement("span");
        this.sphere.classList.add("frontPage__navSphere");

        this.text = document.createElement("h3");
        this.text.classList.add("frontPage__navText");
        this.text.innerText = this.data

        this.item.addEventListener("click", () =>  {
            this.element = document.querySelector(`.${this.reference[this.i]}`)
            this.element.scrollIntoView({ behavior: "smooth" });
        });
    }

    render() {
        this.renderer.render(".frontPage__nav", this.item)
        this.renderer.renderChild(".frontPage__nav", this.button, this.i);
        this.renderer.renderChildChild(".frontPage__nav", this.sphere, this.i);
        this.renderer.renderChildChild(".frontPage__nav", this.text, this.i);
    }
}

class FrontPageMain {
    main;
    figure;
    renderer;
    frontPageImage;
    frontPageTitle;
    constructor(renderer, data) {
        this.renderer = renderer;
        this.data = data;

        this.main = document.createElement("section");
        this.main.classList.add("frontPage__main");

        this.render()
        this.frontPageImage = new FrontPageImage("left", this.renderer, ".frontPage__main",0);
        this.frontPageImage = new FrontPageImage("right", this.renderer, ".frontPage__main",1);
        for (let i = 0; i < 2; i++) {
            this.frontPageTitle = new FrontPageTitle(i, this.renderer, this.data[i])
        }

    }
    render() {
        this.renderer.render(".frontPage", this.main)
    }
}

class FrontPageImage {
    figure;
    img;
    renderer;
    i
    constructor(direction, renderer, whereToRender, i, projects) {
        this.renderer = renderer;
        this.direction = direction
        this.whereToRender = whereToRender
        this.i = i
        this.projects = projects

        this.figure = document.createElement("figure");
        this.figure.classList.add("halfSquare")
        this.figure.classList.add(`halfSquare--${this.direction}`, `halfSquare--${this.projects}`)

        this.img = document.createElement("img");
        this.img.setAttribute("src", `./img/sqaureShape(${direction}).png`);
        this.img.setAttribute("alt", "bright halfsquare for a nice visual")

        this.render()
    }
    render() {
        this.renderer.render(`${this.whereToRender}`, this.figure);
        this.renderer.renderChild(`${this.whereToRender}`, this.img, this.i)
    }
}

class FrontPageTitle {
    div;
    h1_1;
    h1_2;
    i;
    renderer;
    constructor(i, renderer, data) {
        this.i = i;
        this.renderer = renderer
        this.data = data

        this.div = document.createElement("div")
        this.div.classList.add("frontPage__centerTitle")
        this.div.classList.add(`frontPage__centerTitle--${this.i}`)

        this.h1_1 = document.createElement("h1")
        this.h1_1.classList.add("frontPage__title")
        this.h1_1.innerText = this.data[0][0]

        this.h1_2 = document.createElement("h1")
        this.h1_2.classList.add("frontPage__title")
        this.h1_2.innerText = this.data[0][1]

        this.render();
    }
    render() {
        this.renderer.render(".frontPage__main", this.div)

        this.renderer.render(`.frontPage__centerTitle--${this.i}`, this.h1_1)
        this.renderer.render(`.frontPage__centerTitle--${this.i}`, this.h1_2)
    }
}