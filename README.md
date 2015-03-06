WysiwyBlogger
=============

This was created in response to a [bug reported](https://groups.google.com/forum/#!topic/markdown-here/R74jF9bce3w) 
for [Markdown Here](http://markdown-here.com): in Blogger, after saving a draft,
it was no longer possible to unrender from HTML to Markdown.

I discovered that Blogger is mangling the `title` attribute name that Markdown Here
uses to hold the original Markdown, thereby preventing MDH from find it. Furthermore,
Blogger was mangling the inline `style` attribute name (for *some* elements -- 
only deeper elements?). However, when publishing the blog post, the styles would
be restored. In addition to hurting MDH's functionality and interfering with its
sweet styling being shown properly, this also affects the styling of rich content
which has been pasted from other web pages.

So, not only does this weird mangling behaviour totally break Markdown Here, it
breaks the what-you-see-is-what-you-get (wysiwyg) user experience that everyone
expects.

## Installation

Get it from the [Chrome Store](https://chrome.google.com/webstore/detail/wysiwyblogger/apdeenjcfcccaoaeccbbnaiofikcpeic).

## How to use

Just place focus into the Blogger edit box and click the toolbar button. All 
inline styles will be immediately restored. And Markdown Here will work again.
