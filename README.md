# Iframe Widgets

Reusable Zmags Iframe widgets with various configuration options.

## Usage

1. Point the iframe widget URL to `widget.html` (either located on your own server or somewhere else).
1. Add query parameters to specify options. Note that some characters such as spaces must be [encoded](http://lugribossk.github.io/iframe-widgets/resources/encode.html) when used in query parameters. E.g. http://lugribossk.github.io/iframe-widgets/target/widget.html?type=text&text=Hello%20world .
1. View to see the widget in action. It can also be previewd by opening the URL to `widget.html` directly.


## Options

### All widgets
Parameter name|Description|Default
---|---|---
preset|Use one of the presets specified in the source of widget.html. These specify a set of options that can be reused. Useful for reusing the same widget in several places without typing in all the parameters over and over. If other options are specified, they override that option in the preset.
type|The type of widget. Currently `text` and `image` are supported.|Value required.
from|The direction to animate the widget in from, either `top`, `bottom`, `left` or `right`. It starts out off-screen and then moves towards and stops at the opposite edge.|No animation.
duration|The animation duration.|1s.
timingFunction|The CSS timing function for the animation.|ease
delay|The delay before the animation starts. The default is non-zero to avoid the animation starting while the page is still sliding into position in the viewer.|500ms.

### Text widget
Displays the specified text. The text will be scaled to fill the widget, without distorting the aspect ratio.

Parameter name|Description|Default
---|---|---
text|The text to display. Can contain simple markup (e.g. `<br/>` for linebreaks).|Value required.
font-family<br/> color<br/> text-shadow<br/> opacity<br/> letter-spacing<br/> line-height|Set the value to use for these CSS properties.|Browser default
googleFont|Set to true to load the font family from [Google Fonts](https://www.google.com/fonts).|False
fontAwesome|Set to true to load [Font Awesome](http://fortawesome.github.io/Font-Awesome/).|False
typekitId|The ID of the TypeKit font to load from there.|None.

### Image widget
Displays an image or SVG. It will be scaled to fill the widget, without distorting the aspect ratio.

Parameter name|Description|Default
---|---|---
src|The URL to the image or SVG file. Must be [encoded](http://lugribossk.github.io/iframe-widgets/resources/encode.html). |Value required.

## Building
Build with Grunt, then upload the files in `target` somewhere.

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/ee572733c662aee473ea4e83442d5ed1 "githalytics.com")](http://githalytics.com/Lugribossk/iframe-widgets)