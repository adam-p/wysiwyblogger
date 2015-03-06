/*
 * Copyright Adam Pritchard 2015
 * MIT License : http://adampritchard.mit-license.org/
 */

"use strict";
/*global chrome:false */
/*jshint devel:true*/


chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (!request || (request.action !== 'activate')) {
    return;
  }

  // Check if the focused element is a valid render target
  var focusedElem = findFocusedElem(window.document);
  if (!focusedElem) {
    // Shouldn't happen. But if it does, just silently abort.
    return;
  }

  if (!elementCanBeRendered(focusedElem)) {
    alert('Put focus into edit box and try again!');
    return;
  }

  // Here begins the meat of this extension: unmangling the attributes.

  var mangledElems = focusedElem.querySelectorAll('[data-blogger-escaped-style]');
  for (var i = 0; i < mangledElems.length; i++) {
      mangledElems[i].style.cssText = mangledElems[i].dataset.bloggerEscapedStyle;
  }

  mangledElems = focusedElem.querySelectorAll('[data-blogger-escaped-title]');
  for (var i = 0; i < mangledElems.length; i++) {
      mangledElems[i].title = mangledElems[i].dataset.bloggerEscapedTitle;
  }
});

// Copied from Markdown Here.
// Finds and returns the page element that currently has focus. Drills down into
// iframes if necessary.
function findFocusedElem(document) {
  var focusedElem = document.activeElement;

  // Fix #173: https://github.com/adam-p/markdown-here/issues/173
  // If the focus is in an iframe with a different origin, then attempting to
  // access focusedElem.contentDocument will fail with a `SecurityError`:
  // "Failed to read the 'contentDocument' property from 'HTMLIFrameElement': Blocked a frame with origin "http://jsbin.io" from accessing a cross-origin frame."
  // Rather than spam the console with exceptions, we'll treat this as an
  // unrenderable situation (which it is).
  try {
    var accessTest = focusedElem.contentDocument;
  }
  catch (e) {
    // TODO: Check that this is actually a SecurityError and re-throw if it's not?
    return null;
  }

  // If the focus is within an iframe, we'll have to drill down to get to the
  // actual element.
  while (focusedElem && focusedElem.contentDocument) {
    focusedElem = focusedElem.contentDocument.activeElement;
  }

  // There's a bug in Firefox/Thunderbird that we need to work around. For
  // details see https://github.com/adam-p/markdown-here/issues/31
  // The short version: Sometimes we'll get the <html> element instead of <body>.
  if (focusedElem instanceof document.defaultView.HTMLHtmlElement) {
    focusedElem = focusedElem.ownerDocument.body;
  }

  return focusedElem;
}

// Copied from Markdown Here.
// Returns true if the given element can be properly rendered (i.e., if it's
// a rich-edit compose element).
function elementCanBeRendered(elem) {
  // See here for more info about what we're checking:
  // http://stackoverflow.com/a/3333679/729729
  return (elem.contentEditable === true || elem.contentEditable === 'true' ||
          elem.contenteditable === true || elem.contenteditable === 'true' ||
          (elem.ownerDocument && elem.ownerDocument.designMode === 'on'));
}
