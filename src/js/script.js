function TRDadvertisement(options) {
    // User defined props to be set in the Google Ad Manager creative template
    adProps = {
      backgroundImg: '',
      //"[%backgroundImg%]",
      backgroundImgScrld: '',
      //"[%backgroundImgScrld%]",
      buttonColor: '',
      //"[%buttonColor%]",
      buttonText: '',
      //"[%buttonText%]",
      ctaLink: '',
      //"[%ctaLink%]",
      headingColor:  '',
      //"[%headingColor%]",
      headingText:  '',
      //"[%headingText%]",
      impressionTrackers: [
        "[%ImpressionTracker1%]",
        "[%ImpressionTracker2%]",
        "[%ImpressionTracker3%]",
      ],
      logo: '',
      //"[%logo%]",   
      // Boolean to control scroll functionality
      adScrldBoolean: false,
      get hasAdScrld() {
        return this.adScrldBoolean;
      },
      set hasAdScrld(hasAdScrld) {
        this.adScrldBoolean = hasAdScrld
        return this.adScrldBoolean
      }
    };

    fn = {
      init() {
        // Runs once at start to construct and append the stylesheet, the dynamic ad template, and set an event listener for scroll change to operate the ad slot collapse 
        let container = document.querySelector("#pushdown");
        let style = fn.constructStyleSheet();
        container.appendChild(style);
        fn.createHtmlElement();
        document.addEventListener("scroll", fn.scrollChange);
        // Commented out for development
        //fn.attachTrackers();
      },

      // Selects the ad slot pushdown container , constructs an HTML ad template with the given user variables, and appends as a child to the pushdown container
      createHtmlElement() {
        let container = document.querySelector("#pushdown");
        let adWrapper = document.createElement("div");
        adWrapper.classList.add("static-intermission");
        let advertisement = `    
        <div class="full-section"> 
          <img  class="one-fifth-section" src=${adProps.logo || "https://via.placeholder.com/350x350?text=350x350+TestLogo"} alt="background"/>
          <div class="three-fifth-section">
            <h2 class="pushdown-hdg" style="color: ${adProps.headingColor || "#373d3f"}">${adProps.headingText || "Default Heading Text for The Real Deal the number one real estate news business in the world."}</h2>
            <a href="${adProps.ctaLink}" class="pushdown-link">
              <button class="pushdown-btn" style="background-color: ${adProps.buttonColor || "#f7f7f7"}">${adProps.buttonText || "Default Button Text"}</button>
            </a>
          </div>
          <img  class="one-fifth-section" src=${adProps.logo || "https://via.placeholder.com/350x350?text=350x350+TestLogo"} alt="background"/>
        </div>`;
        adWrapper.innerHTML = advertisement;
        container.appendChild(adWrapper)
      },

      attachTrackers() {
        let staticIntermission = document.querySelector(
          ".static-intermission"
        );
        for (let i = 0; i < adProps.impressionTrackers.length; i++) {
          let tracker = adProps.impressionTrackers[i];
          if (tracker) {
            let impression = document.createElement("img");
            tracker = tracker.split("\n").join("").split(" ").join("");
            impression.src = "%%VIEW_URL_UNESC%%" + tracker;
            impression.classList.add("impression");
            staticIntermission.appendChild(impression);
          }
        }
      },


      scrollChange() {
        let distance = window.scrollY;
        //console.log(`distance is : ${distance}`);
        // add scrld classes to heading text and button
        // Control scroll functionality based on distance and if the ad has previously scrolled and collapsed or not
        if (distance > 200 && !adProps.hasAdScrld) {
          adProps.hasAdScrld = true;
          let container = document.querySelector("#pushdown");
          let imgContainer = document.querySelector(".full-section")
          imgContainer.classList.add("full-section-scr")
          imgContainer.classList.remove("full-section")
          container.classList.add("scrollFixed");
        }
        if (distance == 0 && adProps.hasAdScrld)  {
          adProps.hasAdScrld = false;
          let container = document.querySelector("#pushdown");
          let imgContainer = document.querySelector(".full-section-scr")
          imgContainer.classList.add("full-section")
          imgContainer.classList.remove("full-section-scr")
          container.classList.remove("scrollFixed");
        }
      },
      
      constructStyleSheet() {
        var styleSheet = document.createElement("style");
        styleSheet.innerHTML = ` 
        .one-fifth-section {
          display: flex!important;
          width: 20%!important;
        }
        .full-section {
          width:100%!important;
          display: flex!important;
          background-image: url(${adProps.backgroundImg || "https://via.placeholder.com/1900x400?text=1900x400+BaseImg"});
          max-height: 400px;
        }
        .full-section-scr {
          width:100%!important;
          display: flex!important;
          background-image: url(${adProps.backgroundImgScrld || "https://via.placeholder.com/1900x100?text=1900x100+ScrolledImg"});
          max-height: 100px;
        }
        .pushdown-btn {
          font-family: Arial,sans-serif;
          font-size: 1rem;
          border-color: #f7f7f7;
          border-radius: 8px;
          padding: 8px 12px 8px 12px;
        }
        .pushdown-hdg {
          font-family: 'Open Sans',sans-serif;
          font-size: 1.5rem;
          height: 70%;
        }
        .pushdown-link {

        }
        .scrollFixed {
          position: fixed;
          top: 0;
          width: 100%;
          margin: 0;
          z-index: 100;
        }
        .three-fifth-section {
          display: flex!important;
          width: 60%;
          flex-direction: column;
          align-items: center;
        }
        @media screen and (max-width:767px) {
        }`;
        return styleSheet;
      }
    };

    fn.init();
    
  }

  window.trd_out_stream = new TRDadvertisement();