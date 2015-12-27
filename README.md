# com-chilipeppr-widget-template
This example widget lets you do something. Please change this description

## ChiliPeppr Widget / ChiliPepr Template

All ChiliPeppr widgets/elements are defined using cpdefine() which is a method
that mimics require.js. Each defined object must have a unique ID so it does
not conflict with other ChiliPeppr widgets.

| Item                  | Value           |
| -------------         | ------------- | 
| ID                    | com-chilipeppr-widget-template |
| Name                  | Widget / ChiliPepr Template |
| Description           | This example widget lets you do something. Please change this description |
| chilipeppr.load() URL | http://raw.githubusercontent.com/chilipeppr/com-chilipeppr-widget-template/master/auto-generated-widget.html |
| Edit URL              | http://ide.c9.io/chilipeppr/com-chilipeppr-widget-template |
| Github URL            | http://github.com/chilipeppr/com-chilipeppr-widget-template |
| Test URL              | http://com-chilipeppr-widget-template-chilipeppr.c9users.io/widget.html |

## Example Code for chilipeppr.load() Statement

You can use the code below as a starting point for instantiating this widget inside a workspace or from another widget. The key is that you need to load your widget inlined into a div so the DOM can parse your HTML, CSS, and Javascript. Then you use cprequire() to find your widget's Javascript and get back the instiated instance of it.

```javascript
chilipeppr.load(
  "#myDivWidgetInsertedInto",
  "http://raw.githubusercontent.com/chilipeppr/com-chilipeppr-widget-template/master/auto-generated-widget.html",
  function() {
    // Callback after widget loaded into #myDivWidgetInsertedInto
    cprequire(
      "inline:com-chilipeppr-widget-template", // the id you gave your widget
      function(mywidget) {
        // Callback that is passed reference to your newly loaded widget
        console.log("My widget just got loaded.", mywidget);
        mywidget.init();
      }
    );
  }
);

```

