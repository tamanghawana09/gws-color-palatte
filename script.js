/* ===================================================
   GLOW WITH SYABHI
   PALETTE TESTER
=================================================== */


/*
    Each palette uses the colours you supplied.

    A few palettes needed a supporting cream / dark
    neutral because not every supplied set contained
    all six functional website colours.
*/


const palettes = {


    /* -----------------------------------------------
       COLOR 1
       Navy / Gold
    ------------------------------------------------ */

    1: {

        background: "#F7F4EE",

        surface: "#16213E",

        primary: "#0F3460",

        dark: "#1A1A2E",

        luxury: "#EFC07B",

        soft: "#ECE4D8"
    },



    /* -----------------------------------------------
       COLOR 2
       Vanilla / Warm Gold
    ------------------------------------------------ */

    2: {

        background: "#FEF4D5",

        surface: "#F1E49A",

        primary: "#E6D17B",

        dark: "#2C1810",

        luxury: "#CBAF8D",

        soft: "#FFF9E8"
    },



    /* -----------------------------------------------
       COLOR 3
       Wine / Terracotta
    ------------------------------------------------ */

    3: {

        background: "#F5F5DC",

        surface: "#E7D6C7",

        primary: "#8B1538",

        dark: "#722F37",

        luxury: "#A0522D",

        soft: "#E9CDC4"
    },



    /* -----------------------------------------------
       COLOR 4
       Rose / Champagne
    ------------------------------------------------ */

    4: {

        background: "#FFFFFF",

        surface: "#F7E7CE",

        primary: "#B76E79",

        dark: "#4A3538",

        luxury: "#E8B4B8",

        soft: "#F9EFEB"
    },



    /* -----------------------------------------------
       COLOR 5
       Burgundy / Nude
    ------------------------------------------------ */

    5: {

        background: "#E1D4C1",

        surface: "#E1D3CC",

        primary: "#7E102C",

        dark: "#58423F",

        luxury: "#D7A9A8",

        soft: "#F3EAE3"
    },



    /* -----------------------------------------------
       COLOR 6
       Blush / Mauve
    ------------------------------------------------ */

    6: {

        background: "#F6E0D5",

        surface: "#FFD1DC",

        primary: "#8B5B85",

        dark: "#493747",

        luxury: "#CBAF8D",

        soft: "#FFDFD4"
    },



    /* -----------------------------------------------
       COLOR 7
       Crimson / Modern Pink
    ------------------------------------------------ */

    7: {

        background: "#FEE2E2",

        surface: "#FDA4B2",

        primary: "#C92A3E",

        dark: "#1F2937",

        luxury: "#E9B98A",

        soft: "#FFF4F3"
    },



    /* -----------------------------------------------
       COLOR 8
       Dusty Rose / Wine
    ------------------------------------------------ */

    8: {

        background: "#F8F7F5",

        surface: "#E7C2B1",

        primary: "#8B2E4B",

        dark: "#4C2F38",

        luxury: "#D98C98",

        soft: "#F1DDD4"
    }

};



/* ===================================================
   CONFIG
=================================================== */


const colourConfig = {

    background: {

        picker: "backgroundPicker",

        hex: "backgroundHex",

        swatch: "swatchBackground",

        variable: "--background"
    },


    surface: {

        picker: "surfacePicker",

        hex: "surfaceHex",

        swatch: "swatchSurface",

        variable: "--surface"
    },


    primary: {

        picker: "primaryPicker",

        hex: "primaryHex",

        swatch: "swatchPrimary",

        variable: "--primary"
    },


    dark: {

        picker: "darkPicker",

        hex: "darkHex",

        swatch: "swatchDark",

        variable: "--dark"
    },


    luxury: {

        picker: "luxuryPicker",

        hex: "luxuryHex",

        swatch: "swatchLuxury",

        variable: "--luxury"
    },


    soft: {

        picker: "softPicker",

        hex: "softHex",

        swatch: "swatchSoft",

        variable: "--soft"
    }

};



let activePalette = 5;



/* ===================================================
   HEX VALIDATION
=================================================== */


function validHex(value) {

    return /^#[0-9A-F]{6}$/i.test(value);

}



/* ===================================================
   UPDATE SINGLE COLOUR
=================================================== */


function updateColour(name, value) {

    if (!validHex(value)) {

        return;
    }


    value = value.toUpperCase();


    const item = colourConfig[name];


    /* CSS */

    document.documentElement.style.setProperty(

        item.variable,

        value

    );


    /* Picker */

    document.getElementById(

        item.picker

    ).value = value;


    /* Hex field */

    document.getElementById(

        item.hex

    ).value = value;


    /* Current colour display */

    document.getElementById(

        item.swatch

    ).style.background = value;

}



/* ===================================================
   APPLY ENTIRE PALETTE
=================================================== */


function applyPalette(number) {

    const palette = palettes[number];


    if (!palette) {

        return;
    }


    activePalette = number;


    Object.entries(palette).forEach(

        ([name, value]) => {

            updateColour(name, value);

        }

    );


    /*
        Active button
    */

    document
        .querySelectorAll(".palette-card")
        .forEach(card => {

            card.classList.remove("active");

        });


    const activeButton = document.querySelector(

        `[data-palette="${number}"]`

    );


    if (activeButton) {

        activeButton.classList.add("active");

    }

}



/* ===================================================
   PALETTE BUTTON EVENTS
=================================================== */


document
    .querySelectorAll(".palette-card")
    .forEach(card => {


        card.addEventListener("click", () => {


            const paletteNumber =

                card.dataset.palette;


            applyPalette(paletteNumber);

        });


    });



/* ===================================================
   LIVE PICKER EVENTS
=================================================== */


Object.entries(colourConfig)
    .forEach(([name, config]) => {


        const picker =

            document.getElementById(
                config.picker
            );


        const hexInput =

            document.getElementById(
                config.hex
            );



        /*
            Colour picker
        */

        picker.addEventListener(

            "input",

            event => {

                updateColour(

                    name,

                    event.target.value

                );


                removeActivePreset();

            }

        );



        /*
            Hex input
        */

        hexInput.addEventListener(

            "input",

            event => {


                let value =

                    event.target.value.trim();


                if (!value.startsWith("#")) {

                    value = "#" + value;

                }


                if (validHex(value)) {

                    updateColour(

                        name,

                        value

                    );


                    removeActivePreset();

                }

            }

        );



        /*
            Enter key
        */

        hexInput.addEventListener(

            "keydown",

            event => {


                if (event.key !== "Enter") {

                    return;

                }


                let value =

                    event.target.value.trim();


                if (!value.startsWith("#")) {

                    value = "#" + value;

                }


                if (validHex(value)) {

                    updateColour(

                        name,

                        value

                    );

                }

            }

        );


    });



/* ===================================================
   REMOVE PRESET ACTIVE STATE

   Happens when user creates a custom palette.
=================================================== */


function removeActivePreset() {

    document
        .querySelectorAll(".palette-card")
        .forEach(card => {

            card.classList.remove("active");

        });

}



/* ===================================================
   GET CURRENT PALETTE
=================================================== */


function getCurrentPalette() {


    const styles =

        getComputedStyle(
            document.documentElement
        );


    return {

        Background:
            styles
                .getPropertyValue("--background")
                .trim(),

        Surface:
            styles
                .getPropertyValue("--surface")
                .trim(),

        Primary:
            styles
                .getPropertyValue("--primary")
                .trim(),

        Dark:
            styles
                .getPropertyValue("--dark")
                .trim(),

        Luxury:
            styles
                .getPropertyValue("--luxury")
                .trim(),

        Soft:
            styles
                .getPropertyValue("--soft")
                .trim()

    };

}



/* ===================================================
   COPY PALETTE
=================================================== */


document
    .getElementById("copyPalette")
    .addEventListener("click", async () => {


        const colours =

            getCurrentPalette();


        const output = `

Glow With Syabhi Palette

Background: ${colours.Background}
Surface: ${colours.Surface}
Primary: ${colours.Primary}
Dark: ${colours.Dark}
Luxury Accent: ${colours.Luxury}
Soft Accent: ${colours.Soft}

        `.trim();


        try {


            await navigator.clipboard.writeText(
                output
            );


            showCopyMessage();


        } catch (error) {


            console.log(
                "Clipboard unavailable",
                error
            );

        }


    });



/* ===================================================
   COPY CONFIRMATION
=================================================== */


function showCopyMessage() {


    const message =

        document.getElementById(
            "copyMessage"
        );


    message.classList.add("show");


    setTimeout(() => {

        message.classList.remove("show");

    }, 1500);

}



/* ===================================================
   INITIAL LOAD

   Start with Colour 5
=================================================== */


applyPalette(5);