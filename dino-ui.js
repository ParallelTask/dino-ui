window.filter = rxjs.operators.filter;
window.dinoUI = {
    components: {},
    util: {
        forOf: function (data, template) {
            if (data.length > 0) {
                var t = '<div>';
                for (var i = 0; i < data.length; i++) {
                    t += template.replace(/\$index/gi, data[i]);
                    console.log(template.replace(/\$index/gi, "data[" + i + "]"));
                }
                t += '</div>';
                return t;
            } else {
                return '';
            }
        },
        renderTemplate: function (template) {
            var node = document.createElement('div');
            node.innerHTML = template;
            var e = dinoUI.util.renderSubComponent(node.firstElementChild, [], false);
            for (var i = 0; i < e.length; i++) {
                e[i].mount.replaceWith(e[i].element);
            }
            return node;
        },
        renderSubComponent: function (ele, arr, runOnComplete) {
            var components = ele.querySelectorAll('[di-component]');
            if (components.length < 1) return [];
            for (var i = 0; i < components.length; i++) {
                var mount = components[i];
                var compName = mount.getAttribute('di-component');
                var data = mount.getAttribute('di-data');
                var selector = {
                    current: mount.getAttribute('di-selector')
                };
                try {
                    data = JSON.parse(data);
                } catch (err) { };
                var node = document.createElement('div');
                var component = dinoUI.components[compName](data, node, selector);
                var template = component.template();
                if (template !== undefined && template !== '') {
                    var componentCount = dinoUI.components[compName].nodes.length;
                    var thisHandler = 'dinoUI.components[\'' + compName + '\']';
                    var nodeHandler = '.nodes[' + componentCount + ']';
                    dinoUI.components[compName].nodes[componentCount] = component;
                    template = template.replace(/\$this/gi, thisHandler + nodeHandler);
                    // template = template.replace(/\$node/gi, thisHandler + nodeHandler);
                    node.innerHTML = template;
                    dinoUI.util.renderSubComponent(node, arr, runOnComplete);
                    component.beforeInsert();
                }
                component.afterInsert();
                if (runOnComplete) {
                    component.onComplete();
                }
                dinoUI.components[compName].nodes.push(node);
                arr.push({
                    mount: mount,
                    element: node
                });
                // mount.replaceWith(node.firstElementChild);
            }
            return arr;
        }
    }
};
dinoUI.component = function (selector, func) {
    dinoUI.components[selector] = func;
    dinoUI.components[selector].nodes = [];
};
/**
 * @param {HTMLElement} node
 */
dinoUI.render = function (ele) {
    dinoUI.state = new rxjs.Subject();
    dinoUI.dispatch = function (o) {
        dinoUI.state.next(o);
    };
    dinoUI.onSelector = function (s) {
        return dinoUI.state.pipe(filter(e => e.selector === s));
    };
    // dinoUI.onStateChange = rxjs.Observable.create(function (observer) {
    //     dinoUI.state = observer;
    // });
    // dinoUI.onStateChange.subscribe();
    var e = dinoUI.util.renderSubComponent(ele, [], true);
    for (var i = 0; i < e.length; i++) {
        e[i].mount.replaceWith(e[i].element);
    }
}
