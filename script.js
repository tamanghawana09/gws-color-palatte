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

        background: "#F8D6D8",

        surface: "#F8A3A7",

        primary: "#EA3D46",

        dark: "#3A2B2F",

        luxury: "#F8A3A7",

        soft: "#F8D6D8"
    },



    /* -----------------------------------------------
       COLOR 2
       Vanilla / Warm Gold
    ------------------------------------------------ */

    2: {

        background: "#FAEBD7",

        surface: "#FFDAB9",

        primary: "#FF6F61",

        dark: "#8B4513",

        luxury: "#FFB347",

        soft: "#FAEBD7"
    },



    /* -----------------------------------------------
       COLOR 3
       Wine / Terracotta
    ------------------------------------------------ */

    3: {

        background: "#F9E6E6",

        surface: "#F2B2B2",

        primary: "#E8A8A8",

        dark: "#B0A3A3",

        luxury: "#E0D6D6",

        soft: "#F9E6E6"
    },



    /* -----------------------------------------------
       COLOR 4
       Rose / Champagne
    ------------------------------------------------ */

    4: {

        background: "#F6E0D5",

        surface: "#FFD1DC",

        primary: "#FFDFD4",

        dark: "#8B5B85",

        luxury: "#CBAF8D",

        soft: "#F6E0D5"
    },



    /* -----------------------------------------------
       COLOR 5
       Burgundy / Nude
    ------------------------------------------------ */

    5: {

        background: "#FFF8E1",

        surface: "#FFDAB9",

        primary: "#FF6F61",

        dark: "#5D4037",

        luxury: "#FFB74D",

        soft: "#FFF8E1"
    },



    /* -----------------------------------------------
       COLOR 6
       Blush / Mauve
    ------------------------------------------------ */

    6: {

        background: "#FFF9F1",

        surface: "#E3B0A6",

        primary: "#F1C6A6",

        dark: "#8A735B",

        luxury: "#D6C3A6",

        soft: "#FFF9F1"
    },



    /* -----------------------------------------------
       COLOR 7
       Crimson / Modern Pink
    ------------------------------------------------ */

    7: {

        background: "#FFFFFF",

        surface: "#E4B8A0",

        primary: "#D69A73",

        dark: "#3D2B2F",

        luxury: "#F8D3B5",

        soft: "#FFFFFF"
    },



    /* -----------------------------------------------
       COLOR 8
       Dusty Rose / Wine
    ------------------------------------------------ */

    8: {

        background: "#111827",

        surface: "#A855F7",

        primary: "#EC4899",

        dark: "#050816",

        luxury: "#F97316",

        soft: "#111827"
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