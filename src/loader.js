const InstanceCache = {};
export default function (location:string, cb:Function) {
    if (InstanceCache[location]) {
        cb(null, InstanceCache[location]);
        return;
    }
    require.ensure([], (require:Object) => {
        let component = require(location);
        if (component.default) {
            component = component.default;
        }
        InstanceCache[location] = component;
        cb(null, component);
    });
}
