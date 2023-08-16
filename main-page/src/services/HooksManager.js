const hooksMap = {};

function wrap(hook) {
    return (value) => {
        hook && hook(value);
    };
}

export const hooks = {
    set user(hook) { hooksMap.user = wrap(hook) },
    get user() { return hooksMap.user },
};
