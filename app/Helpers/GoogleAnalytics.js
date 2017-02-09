import {isProduction} from "../../Frecl/Helpers/environment";
import {APP} from "../Constants/APP"

if (typeof window !== 'undefined' && window.document) {
  (function (window, document, script, url, r, tag, firstScriptTag) {
    window['GoogleAnalyticsObject'] = r;
    window[r] = window[r] || function () {
        (window[r].q = window[r].q || []).push(arguments)
      };
    window[r].l = 1 * new Date();
    tag = document.createElement(script),
      firstScriptTag = document.getElementsByTagName(script)[0];
    tag.async = 1;
    tag.src = url;
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  })(
    window,
    document,
    'script',
    '//www.google-analytics.com/analytics.js',
    'ga'
  );
}

var ga = function (...args) {
  if (typeof window !== 'undefined' && window.document) {
    if (isProduction()) {
      if (typeof APP.GA_CODE !== 'undefined' && APP.GA_CODE !== "UA-XXXXXXXX-X") {
        return window.ga.apply(window.ga, args);
      } else {
        console.warn('GA_TRACKING_CODE doesn\'t exist', args);
      }
    } else {
      console.log('GA event simulated', args);
    }
  }
};

ga('create', APP.GA_CODE, 'auto');
ga('send', 'pageview');

export default ga;
