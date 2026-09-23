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

        background: "#F3DCDF",

        surface: "#EEBDB9",

        primary: "#EDAAB4",

        dark: "#161616",

        luxury: "#EEA9BD",

        soft: "#F5F5F5"
    },



    /* -----------------------------------------------
       COLOR 2
       Vanilla / Warm Gold
    ------------------------------------------------ */

    2: {

        background: "#F5F5F4",

        surface: "#FEFAEB",

        primary: "#DE4F1B",

        dark: "#000000",

        luxury: "#FDE4DB",

        soft: "#F5F5F4"
    },



    /* -----------------------------------------------
       COLOR 3
       Wine / Terracotta
    ------------------------------------------------ */

    3: {

        background: "#FEF2EB",

        surface: "#F0E0D9",

        primary: "#C9A18E",

        dark: "#31221D",

        luxury: "#714E48",

        soft: "#FEF2EB"
    },



    /* -----------------------------------------------
       COLOR 4
       Rose / Champagne
    ------------------------------------------------ */

    4: {

        background: "#FFF0F5",

        surface: "#FFD1DC",

        primary: "#D885A3",

        dark: "#3A1A32",

        luxury: "#7A3B5B",

        soft: "#FFF0F5"
    },



    /* -----------------------------------------------
       COLOR 5
       Burgundy / Nude
    ------------------------------------------------ */

    5: {

        background: "#FEEADF",

        surface: "#FCBFAF",

        primary: "#CE5C85",

        dark: "#2A0229",

        luxury: "#701C3D",

        soft: "#FEEADF"
    },



    /* -----------------------------------------------
       COLOR 6
       Blush / Mauve
    ------------------------------------------------ */

    6: {

        background: "#FEEEEB",

        surface: "#F4E2DF",

        primary: "#CE9A93",

        dark: "#392120",

        luxury: "#794A4D",

        soft: "#FEEEEB"
    },



    /* -----------------------------------------------
       COLOR 7
       Crimson / Modern Pink
    ------------------------------------------------ */

    7: {

        background: "#FEDDE4",

        surface: "#FCBFC7",

        primary: "#CF798E",

        dark: "#2B1523",

        luxury: "#6A374B",

        soft: "#FEDDE4"
    },



    /* -----------------------------------------------
       COLOR 8
       Dusty Rose / Wine
    ------------------------------------------------ */

    8: {

        background: "#FEDDE4",

        surface: "#FCBFC7",

        primary: "#CF798E",

        dark: "#2B1523",

        luxury: "#6A374B",

        soft: "#FEDDE4"
    },


    9: {

        background: "#FEF3EB",

        surface: "#FBC2A0",

        primary: "#EB6B2D",

        dark: "#201D22",

        luxury: "#43403B",

        soft: "#FEF3EB"
    },


    10: {

        background: "#FEEADF",

        surface: "#FCBFAF",

        primary: "#CE5C85",

        dark: "#2A0229",

        luxury: "#701C3D",

        soft: "#FEEADF"
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