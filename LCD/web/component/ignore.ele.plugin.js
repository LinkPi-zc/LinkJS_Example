
const ignoreCustomElementPlugin = {
    install: (app) => {
        app.config.compilerOptions.isCustomElement = (tag) => tag === 'cn' || tag === 'en';
    }
};

export default ignoreCustomElementPlugin;