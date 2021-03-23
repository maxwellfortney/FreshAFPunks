module.exports = {
    purge: {
        // enabled: !process.env.ROLLUP_WATCH,
        mode: "all",
        content: ["./public/index.html", "./src/**/*.svelte"],
    },
    darkMode: "class",
    theme: {
        extend: {
            fontSize: {
                xs: ["1.10rem", "1"],
                sm: ["1.35rem", "1"],
                base: ["1.5rem", "1"],
                lg: ["1.85rem", "1"],
                xl: ["2.10rem", "1"],
                "2xl": ["2.35rem", "1"],
                "3xl": ["2.60rem", "1"],
                "4xl": ["3rem", "1"],
                "5xl": ["4rem", "1"],
                "6xl": ["5rem", "1"],
                "7xl": ["6rem", "1"],
            },
            fontFamily: {
                sans: ["Visitor"],
            },
            colors: {
                "FreshAF-red": "#FC0000",
                "FreshAF-orange": "#FC2D00",
                "FreshAF-gray": "#3F3F3F",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
