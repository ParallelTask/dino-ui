var arra = [];
var dinoUI = {
    components: {},
    util: {
        renderSubComponent: function (ele, arr) {
            var components = ele.querySelectorAll('[component]');
            if (components.length < 1) return [];
            for (var i = 0; i < components.length; i++) {
                var mount = components[i];
                var component = dinoUI.components[mount.getAttribute('component')];
                var data = JSON.parse(mount.getAttribute('state'));
                var node = document.createElement('div');
                var template = component.template(data);
                var thisHandler = 'dinoUI.components[\'' + mount.getAttribute('component') + '\']';
                var nodeHandler = '.nodes[' + component.nodes.length + ']';
                template = template.replace(/\$this/gi, thisHandler);
                template = template.replace(/\$node/gi, thisHandler + nodeHandler);
                node.innerHTML = template;
                dinoUI.util.renderSubComponent(node, arr);
                component.onInsert(node.firstElementChild, data);
                component.nodes.push(node.firstElementChild);
                arr.push({
                    mount: mount,
                    element: node.firstElementChild
                });
                // mount.replaceWith(node.firstElementChild);
            }
            return arr;
        }
    }
};
dinoUI.component = function (selector, o) {
    dinoUI.components[selector] = o;
    dinoUI.components[selector].nodes = [];
};
/**
 * @param {HTMLElement} node
 */
dinoUI.render = function (ele) {
    var e = dinoUI.util.renderSubComponent(ele, []);
    for (var i = 0; i < e.length; i++) {
        e[i].mount.replaceWith(e[i].element);
    }
}

// User code
dinoUI.component('number-input', {
    isNumber: function (e) {
        var value = e.keyCode;
        if (value > 31 && (value < 48 || value > 57)) {
            e.preventDefault();
        }
    },
    template: function (data) {
        return `<input type="text" value="${data.value}" onkeypress="return $this.isNumber(event)" />`;
    },
    onInsert: function (node) {
        // node.addEventListener('keypress', function (e) {
        //     var value = e.keyCode;
        //     if (value > 31 && (value < 48 || value > 57)) {
        //         e.preventDefault();
        //     }
        // });
    }
});
dinoUI.component('model-bind', {
    bind: function (e, node) {
        node.firstElementChild.nextSibling.innerHTML = e.target.value;
    },
    template: function (data) {
        return '<span><input type="text" onkeyup="return $this.bind(event, $node)"/><h1></h1></span>';
    },
    onInsert: function (node) {
        // node.firstElementChild.addEventListener('keyup', function (e) {
        //     node.firstElementChild.nextSibling.innerHTML = e.target.value;
        // });
    }
});
dinoUI.component('input-bind', {
    template: function (data) {
        return '<div><span>InputBind</span><span component="model-bind"></span></div>';
    },
    onInsert: function (node) {
    }
});
dinoUI.render(document.getElementById('app'));
