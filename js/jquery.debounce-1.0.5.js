jQuery.extend({debounce:function(n,e,u,o){var l;return 3==arguments.length&&"boolean"!=typeof u&&(o=u,u=!1),function(){var t=arguments;o=o||this,u&&!l&&n.apply(o,t),clearTimeout(l),l=setTimeout(function(){u||n.apply(o,t),l=null},e)}},throttle:function(t,n,e){var u,o,l;return function(){o=arguments,l=!0,e=e||this,u||function(){u=l?(t.apply(e,o),l=!1,setTimeout(arguments.callee,n)):null}()}}});