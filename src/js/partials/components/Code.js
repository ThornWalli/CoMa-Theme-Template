"use strict";

var Controller = require('agency-pkg-base/Controller');
var DomModel = require('agency-pkg-base/DomModel');

var PrismJS = require('prismjs');
require("style!prismjs/themes/prism.css");
require("style!prismjs/plugins/line-numbers/prism-line-numbers.css");

module.exports = Controller.extend({

    modelConstructor: DomModel.extend({
        session: {
            mode: {
                type: 'string',
                default: 'php'
            },
            maxHeight: {
                type: 'number',
                default: 300
            }
        }
    }),

    initialize: function() {
        Controller.prototype.initialize.apply(this, arguments);

        var $el = $(this.el);
        if ($el.find('>.code>pre').height() > this.model.maxHeight) {
            this.el.classList.add('js-code-min');
        }
        console.log($el.find('code').get(0));

        PrismJS.hooks.add('complete', function(env) {
            if (!env.code) {
                return;
            }

            // works only for <code> wrapped inside <pre> (not inline)
            var pre = env.element.parentNode;
            var clsReg = /\s*\bline-numbers\b\s*/;
            if (!pre || !/pre/i.test(pre.nodeName) ||
                // Abort only if nor the <pre> nor the <code> have the class
                (!clsReg.test(pre.className) && !clsReg.test(env.element.className))
            ) {
                return;
            }

            if (env.element.querySelector(".line-numbers-rows")) {
                // Abort if line numbers already exists
                return;
            }

            if (clsReg.test(env.element.className)) {
                // Remove the class "line-numbers" from the <code>
                env.element.className = env.element.className.replace(clsReg, '');
            }
            if (!clsReg.test(pre.className)) {
                // Add the class "line-numbers" to the <pre>
                pre.className += ' line-numbers';
            }

            var match = env.code.match(/\n(?!$)/g);
            var linesNum = match ? match.length + 1 : 1;
            var lineNumbersWrapper;

            var lines = new Array(linesNum + 1);
            lines = lines.join('<span></span>');

            lineNumbersWrapper = document.createElement('span');
            lineNumbersWrapper.className = 'line-numbers-rows';
            lineNumbersWrapper.innerHTML = lines;

            if (pre.hasAttribute('data-start')) {
                pre.style.counterReset = 'linenumber ' + (parseInt(pre.getAttribute('data-start'), 10) - 1);
            }

            env.element.appendChild(lineNumbersWrapper);

        });
        PrismJS.highlightElement($el.find('code').get(0), false);
        this.el.classList.add('js-code-init');

        $el.children('[type="checkbox"]').on('change', function() {
            global.animationFrame.add(function() {
                $(window).resize();
            });
        });

        global.animationFrame.add(function() {
            $(window).resize();
        });

    }

});
