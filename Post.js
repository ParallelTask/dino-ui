dinoUI.component('post', function (data, node, selector) {
    var renderPosts = function (data) {
        if (data.length > 0) {
            var template = '<div>';
            for (var i = 0; i < data.length; i++) {
                template += `
                    <div>${data[i].header}</div>
                    <div>${data[i].body}</div>
                    <div>${data[i].footer}</div>
                `
            }
            template += '</div>';
            return template;
        } else {
            return '';
        }
        // return dinoUI.util.forOf(data, `
        //     <div>$index.header</div>
        //     <div>$index.body</div>
        //     <div>$index.footer</div>
        // `);
    };
    return {
        template: function () {
            // template
            return renderPosts(data);
        },
        beforeInsert: function () {
            // DOM logic
        },
        afterInsert: function () {
            // selector calls
            dinoUI
                .onSelector(selector.current)
                .subscribe((e) => {
                    switch (e.action) {
                        case 'FETCH_POSTS':
                            node.innerHTML = dinoUI
                                .util
                                .renderTemplate(renderPosts(e.payload))
                                .innerHTML;
                            break;
                    }
                });
        },
        onComplete: function () {
            // fetch API calls
        }
    };
});
