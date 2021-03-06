# dino-ui
Front end component library

### How to
- html file
```
<body>
    <div id="app">
        <div
            di-component="number-input"
            di-data='{ "placeHolder" : "Numbers only" }'
            di-selector="num-input">
        </div>
    </div>
</body>
<!-- Predefined libraries to use -->
<script src="rxjs.js"></script>
<script src="dino-ui.js"></script>
<!-- Component file -->
<script src="NumberInput.js"></script>
<script>
    // Set the scope of dino-ui and render it to DOM.
    dinoUI.render(document.getElementById('app'));
    // selector should be the one defined on the component i.e. di-selector="num-input" as above
    dinoUI
        .onSelector('num-input')
        .subscribe(function(e) {
            switch (e.action) {
                case 'MODEL_UPDATE':
                    console.log(e.payload)
                    break;
            }
        });
</script>
</body>
```
- NumberInput.js
```
dinoUI.component('number-input', function (data, node, selector) {
    return {
        template: function () {
            // template
            return `
                <input type="text" placeholder="${data.placeHolder}" onkeyup="return $this.isNumber(event)" />
            `;
        },
        beforeInsert: function () {
            // DOM logic
            node.querySelectorAll('input')[0].addEventListener('keypress', function (e) {
                var value = e.keyCode;
                if (value > 31 && (value < 48 || value > 57)) {
                    e.preventDefault();
                }
            });
        },
        afterInsert: function () {
            // selector calls
        },
        onComplete: function () {
            // fetch API calls
        },
        // component methods
        isNumber: function (e) {
            var value = e.keyCode;
            if (value > 31 && (value < 48 || value > 57)) {
                e.preventDefault();
            } else {
                dinoUI.dispatch({
                    selector: selector.current,
                    action: 'MODEL_UPDATE',
                    payload: e.target.value
                });
            }
        }
    };
});
```
