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
