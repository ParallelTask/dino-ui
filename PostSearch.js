dinoUI.component('post-search', function (data, node, selector) {
    return {
        template: function () {
            // template
            return `
                <div>
                    <input di-id="search" type="text" placeholder="${data.placeHolder}" />
                    <button onclick="$this.getPosts()">${data.search}</button>
                    <div di-component="post" di-data="[]" di-selector="fetch-posts"></div>
                </div>
            `;
        },
        beforeInsert: function () {
            // DOM logic
        },
        afterInsert: function () {
            // selector calls
        },
        onComplete: function () {
            // fetch API calls
        },
        // component methods
        getPosts: function () {
            var input = node.querySelectorAll('[di-id="search"]')[0].value;
            setTimeout(function () {
                dinoUI.dispatch({
                    selector: 'fetch-posts',
                    action: 'FETCH_POSTS',
                    payload: [{
                        header: 'Header1',
                        body: 'Body1',
                        footer: 'Footer1'
                    }, {
                        header: 'Header2',
                        body: 'Body2',
                        footer: 'Footer2'
                    }]
                });
            }, 1000);
        }
    };
});
