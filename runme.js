// ChiliPeppr Runme.js

// You should right-click and choose "Run" inside Cloud9 to run this
// Node.js server script. Then choose "Preview" to load the main HTML page
// of the script in a new tab.

// When you run the main HTML page of this script it does all sorts 
// of convenient stuff for you like generate documenation, generate
// your final auto-generated-widget.html file, and push your latest
// changes to your backing github repo.

var http = require('http'),
  url = require('url'),
  path = require('path'),
  fs = require('fs');

var mimeTypes = {
  "html": "text/html",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "png": "image/png", 
  "js": "text/javascript",
  "css": "text/css"
};

http.createServer(function(req, res) {

  var uri = url.parse(req.url).pathname;
  var filename = path.join(process.cwd(), unescape(uri));
  var stats;

  try {
    stats = fs.lstatSync(filename); // throws if path doesn't exist
  }
  catch (e) {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.write('404 Not Found\n');
    res.end();
    return;
  }

  if (stats.isFile()) {
    // path exists, is a file
    var mimeType = mimeTypes[path.extname(filename).split(".").reverse()[0]];
    res.writeHead(200, {
      'Content-Type': mimeType
    });

    var fileStream = fs.createReadStream(filename);
    fileStream.pipe(res);
  }
  else if (uri == "/") {

    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    //var html = getMainPage();
    var html = generateWidgetDocs();
    generateInlinedFile();
    generateWidgetReadme();

    res.end(html);

  }
  else if (stats.isDirectory()) {
    // path exists, is a directory
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write('Index of ' + uri + '\n');
    res.write('TODO, show index?\n');
    res.end();
  }
  else {
    // Symbolic link, other?
    // TODO: follow symlinks?  security?
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });
    res.write('500 Internal server error\n');
    res.end();
  }


}).listen(process.env.PORT);

var widget, id, deps, cpdefine, requirejs, cprequire_test;

var isEvaled = false;
var evalWidgetJs = function() {
  
  if (isEvaled) return;
  
  // This method reads in your widget.js and evals it to
  // figure out all the info from it to generate docs and sample
  // code to make your life easy
  eval(fs.readFileSync('widget.js')+'');
  console.log("evaled the widget.js");
  //isEvaled = true;
  
}

// create our own version of cpdefine so we can use the evalWidgetJs above
cpdefine = function(myid, mydeps, callback) {
  widget = callback();
  id = myid;
  deps = mydeps;
  console.log("cool, our own cpdefine got called. id:", id, "deps:", deps, "widget:", widget);
}
// define other top-level methods just to avoid errors
requirejs = function() {}
requirejs.config = function() {};
cprequire_test = function() {};

var generateWidgetReadme = function() {

  // First we have to eval so stuff is in memory
  evalWidgetJs();
  
  // Spit out Markdown docs
  var md = `# $widget-id
$widget-desc

## ChiliPeppr $widget-name

All ChiliPeppr widgets/elements are defined using cpdefine() which is a method
that mimics require.js. Each defined object must have a unique ID so it does
not conflict with other ChiliPeppr widgets.

| ID                    | $widget-id |
| Name                  | $widget-name |
| Description           | $widget-desc |
| chilipeppr.load() URL | $widget-cpurl |
| Edit URL              | $widget-editurl |
| Github URL            | $widget-giturl |
| Test URL              | $widget-testurl |

## Example Code for chilipeppr.load() Statement

You can use the code below as a starting point for instantiating this widget inside a workspace or from another widget. The key is that you need to load your widget inlined into a div so the DOM can parse your HTML, CSS, and Javascript. Then you use cprequire() to find your widget's Javascript and get back the instiated instance of it.

\`\`\`javascript
$widget-cploadjs
\`\`\`

`

  var widgetUrl = 'http://' +
    process.env.C9_PROJECT + '-' + process.env.C9_USER +
    '.c9users.io/widget.html';
  var editUrl = 'http://ide.c9.io/' +
    process.env.C9_USER + '/' +
    process.env.C9_PROJECT;
  var github = getGithubUrl();

  md = md.replace(/\$widget-id/g, widget.id);
  md = md.replace(/\$widget-name/g, widget.name);
  md = md.replace(/\$widget-desc/g, widget.desc);
  md = md.replace(/\$widget-cpurl/g, github.rawurl);
  md = md.replace(/\$widget-editurl/g, editUrl);
  md = md.replace(/\$widget-giturlb/g, github.url);
  md = md.replace(/\$widget-testurl/g, widgetUrl);
  
  var cpload = generateCpLoadStmt();
  md = md.replace(/\$widget-cploadjs/g, cpload);


  // now write out the auto-gen file
  fs.writeFileSync("README.md", md);
  console.log("Rewrote README.md");
  
}

var generateWidgetDocs = function() {
  
  // First we have to eval so stuff is in memory
  evalWidgetJs();
  
  // Spit out docs
  var html = "";
  
  html += `
    <html>
    <head>
    <title>$pubsub-name</title>

    <!-- ChiliPeppr is based on bootstrap CSS. -->
    <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
    <script type="text/javascript" charset="utf-8" src="//code.jquery.com/jquery-2.1.0.min.js"></script>
    <script type="text/javascript" charset="utf-8" src="//i2dcui.appspot.com/js/bootstrap/bootstrap_3_1_1.min.js"></script>
    
    <style type='text/css'>
    </style>
    </head>
    <body style="padding:20px;">
    
      <h1 class="page-header" style="margin-top:0;">$pubsub-id</h1>
      
      <p>$pubsub-desc</p>
      
      <h2>ChiliPeppr Widget Docs</h2>

      <p>The content below is auto generated as long as you follow the standard
      template for a ChiliPeppr widget from 
      <a href="">http://github.com/chilipeppr/widget-template</a>.</p>
      
      <table class="table table-bordered table-striped">
      <tbody>
          <tr>
              <td>ID</td>
              <td class="pubsub-id">
                  $pubsub-id
              </td>
          </tr>
          <tr>
              <td>Name</td>
              <td class="pubsub-name">
                  $pubsub-name
              </td>
          </tr>
          <tr>
              <td>Description</td>
              <td class="pubsub-desc">
                  $pubsub-desc
              </td>
          </tr>
          <tr>
              <td>chilipeppr.load() URL</td>
              <td class="pubsub-url">
                  <a target="_blank" href="$pubsub-url">$pubsub-url</a>
              </td>
          </tr>
          <tr>
              <td>Edit URL</td>
              <td class="pubsub-fiddleurl">
                  <a target="_blank" href="$pubsub-fiddleurl">$pubsub-fiddleurl</a>
              </td>
          </tr>
          <tr>
              <td>Github URL</td>
              <td class="pubsub-github">
                  <a target="_blank" href="$pubsub-github">$pubsub-github</a>
              </td>
          </tr>
          <tr>
              <td>Test URL</td>
              <td class="pubsub-testurl">
                  <a target="_blank" href="$pubsub-testurl">$pubsub-testurl</a>
              </td>
          </tr>
      </tbody>
  </table>
  
  <h2>Example Code for chilipeppr.load() Statement</h2>
  <p>You can use the code below as a starting point for instantiating
  this widget inside a workspace or from another widget. The key is that
  you need to load your widget inlined into a div so the DOM can parse
  your HTML, CSS, and Javascript. Then you use cprequire() to find
  your widget's Javascript and get back the instiated instance of it.</p>
  
  <pre><code class="language-js" 
  data-lang="js">$cp-load-stmt</code></pre>
  
  <div class="xmodal-body">

  <div class="pubsub-interface hidden">
      <h2>Interface Implementation</h2>
      <p>This widget/element implements an interface specification. Since Javascript does not have the notion of interfaces like the way languages such as Java have native support for interfaces, ChiliPeppr has defined its own loose version of an interface. If this widget/element has implemented an interface, it means it has followed a general standard set of pubsub signals that other widgets/elements should follow as well to make them swappable.</p>
  <table id="com-chilipeppr-elem-pubsubviewer-interface" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Interface Implementation</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
          
      </tbody>
  </table>
  </div><!-- interface -->
  
  <h2>Publish</h2>
  <p>This widget/element publishes the following signals. These signals are owned by this widget/element and are published to all objects inside the ChiliPeppr environment that listen to them via the chilipeppr.subscribe(signal, callback) method.</p>
  <table id="com-chilipeppr-elem-pubsubviewer-pub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
          
      $row-publish-start    
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>
      $row-publish-end    
      
      </tbody>
  </table>

  <h2>Subscribe</h2>
  <p>This widget/element subscribes to the following signals. These signals are owned by this widget/element. Other objects inside the ChiliPeppr environment can publish to these signals via the chilipeppr.publish(signal, data) method.</p>
  <table id="com-chilipeppr-elem-pubsubviewer-sub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
          
      $row-subscribe-start    
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>
      $row-subscribe-end    
      
      </tbody>
  </table>

  <h2>Foreign Publish</h2>
  <p>This widget/element publishes to the following signals that are owned by other objects.</p>
  <table id="com-chilipeppr-elem-pubsubviewer-foreignpub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
          
      $row-foreign-publish-start    
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>
      $row-foreign-publish-end    
      
      </tbody>
  </table>

  <h2>Foreign Subscribe</h2>
  <p>This widget/element subscribes to the following signals owned by other objects.</p>
  <table id="com-chilipeppr-elem-pubsubviewer-foreignsub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      
      $row-foreign-subscribe-start    
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>
      $row-foreign-subscribe-end    
      
      </tbody>
  </table>
  
  <h2>Methods / Properties</h2>
  <p>The list below shows, in order, the methods and properties that exist
  inside this widget/element.</p>
  <table id="com-chilipeppr-elem-pubsubviewer-foreignsub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Method / Property</th>
              <th>Type</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
          
      $row-methods-start
      <tr><td colspan="2">(No methods or properties defined in this widget/element)</td></tr>
      $row-methods-end
      
      </tbody>
  </table>
  
</div>

  <h2>Structure of a Widget</h2>
  <p>The standard structure of a ChiliPeppr widget includes making 
  your widget out of widjet.js, widjet.css, and widget.html. The final
  widget has everything inlined into one HTML file. It is important
  to have everything inlined so the chilipeppr.load() method succeeds
  because it only loads a single URL.
  </p>
      
  <p>When this NodeJs page is executed it will combine 
  your widget.js, widget.css, and widget.html files into a monolithic 
  HTML file called auto-generated-widget.html. You should use this file
  as your final widget inlined file.</p>
  
  <p>This NodeJs script
  will also push your updated content to your forked repo on Github 
  whenever it is run so that Github is as up-to-date
  as possible. This script simply runs the git-push.sh script as if
  you ran it on your own from the command line.</p>
  
      
  </body>
  </html>
`;

  var widgetUrl = 'http://' +
    process.env.C9_PROJECT + '-' + process.env.C9_USER +
    '.c9users.io/widget.html';
  var editUrl = 'http://ide.c9.io/' +
    process.env.C9_USER + '/' +
    process.env.C9_PROJECT;
  var github = getGithubUrl();
  
  html = html.replace(/\$pubsub-id/g, widget.id);
  html = html.replace(/\$pubsub-name/g, widget.name);
  html = html.replace(/\$pubsub-desc/g, widget.desc);
  html = html.replace(/\$pubsub-url/g, github.rawurl);
  html = html.replace(/\$pubsub-fiddleurl/g, editUrl);
  html = html.replace(/\$pubsub-github/g, github.url);
  html = html.replace(/\$pubsub-testurl/g, widgetUrl);
  
  var cpload = generateCpLoadStmt();
  html = html.replace(/\$cp-load-stmt/g, cpload);
  
  var s = "";
  for (var key in widget) {
    var obj = widget[key];
    s += '<tr><td>' + key +
      '</td><td>' + typeof obj +
      '</td><td>';

    if (typeof obj === 'function') {
      s += obj.toString().split(/\n/)[0].replace(/\{.*$/, "");
    } else if (typeof obj === 'string') {
      s += JSON.stringify(obj);
    } else {
      s += JSON.stringify(obj, null, "  ");
    }
    s += '</td></tr>'
  }
  html = html.replace(/\$row-methods-start[\s\S]+?\$row-methods-end/g, s);

  // now do pubsub signals
  var s;
  s = appendKeyVal(widget.publish);
  html = html.replace(/\$row-publish-start[\s\S]+?\$row-publish-end/, s);
  s = appendKeyVal(widget.subscribe);
  html = html.replace(/\$row-subscribe-start[\s\S]+?\$row-subscribe-end/g, s);
  s = appendKeyVal(widget.foreignPublish);
  html = html.replace(/\$row-foreign-publish-start[\s\S]+?\$row-foreign-publish-end/, s);
  s = appendKeyVal(widget.foreignSubscribe);
  html = html.replace(/\$row-foreign-subscribe-start[\s\S]+?\$row-foreign-subscribe-end/g, s);
  

  return html;
}

var appendKeyVal = function(data, id) {
  var str = "";
  if (data != null && typeof data === 'object' && Object.keys(data).length > 0) {
        
    //var keys = Object.keys(data);
    for (var key in data) {
      str += '<tr><td>' + key + '</td><td>' + data[key] + '</td></tr>';
    }
  } else {
    str = '<tr><td colspan="2">(No signals defined in this widget/element)</td></tr>';
  }
  return str;
}

var generateCpLoadStmt = function() {
  
  // eval the widget.js so we have lots of data on it
  evalWidgetJs();
  
  // see if we have a backing github url
  // if we do, use it for the chilipeppr.load()
  // if not, we'll have to use the preview url from cloud9
  var github = getGithubUrl();
  
  var js = "";
  
  if (github != null) {
    
    var url = github.url;
    
    // since we have a github url, use the raw version
    // wa want something like https://raw.githubusercontent.com/chilipeppr/eagle-brd-import/master/auto-generated-widget.html";
    var rawurl = github.rawurl; //= url.replace(/\/github.com\//i, "/raw.githubusercontent.com/");
    //rawurl += '/master/auto-generated-widget.html';
    
    js = 'chilipeppr.load(\n' +
      '  "#myDivWidgetInsertedInto",\n' +
      '  "' + rawurl + '",\n' +
      '  function() {\n' +
      '    // Callback after widget loaded into #myDivWidgetInsertedInto\n' +
      '    cprequire(\n' +
      //'      "inline:com-chilipeppr-widget-yourname", // the id you gave your widget\n' +
      '      "' + id + '", // the id you gave your widget\n' +
      '      function(mywidget) {\n' +
      '        // Callback that is passed reference to your newly loaded widget\n' +
      '        console.log("My widget just got loaded.", mywidget);\n' +
      '        mywidget.init();\n' +
      '      }\n' +
      '    );\n' +
      '  }\n' +
      ');\n' +
      '';
      
  } else {
    // use preview url from cloud 9.
    // TODO
    js = "No Github backing URL. Not implemented yet.";
  }
  
  return js;
}

var pushToGithub = function() {
  var exec = require('child_process').execFile;
  var cmd = './git-push.sh';

  exec(cmd, null, null, function(error, stdout, stderr) {
    // command output is in stdout
    console.log("stdout:", stdout);
  });
  console.log("Pushed to github");
}

var generateInlinedFile = function() {
  // We are developing a widget with 3 main files of css, html, and js
  // but ChiliPeppr really wants one monolithic file so we have to generate
  // it to make things clean when chilipeppr.load() is called with a single
  // URL to this widget. This file should get checked into Github and should
  // be the file that is loaded by ChiliPeppr.
  var fileCss = fs.readFileSync("widget.css").toString();
  var fileHtml = fs.readFileSync("widget.html").toString();
  var fileJs = fs.readFileSync("widget.js").toString();

  // now inline css
  var re = /<!-- widget.css[\s\S]*?end widget.css -->/i;
  fileHtml = fileHtml.replace(re,
    '<style type=\'text/css\'>\n' +
    fileCss +
    '\n    </style>'
  );

  // now inline javascript
  var re = /<!-- widget.js[\s\S]*?end widget.js -->/i;
  fileHtml = fileHtml.replace(re,
    '<script type=\'text/javascript\'>\n' +
    '    //<![CDATA[\n' +
    fileJs +
    '\n    //]]>\n    </script>'
  );

  // now write out the auto-gen file
  fs.writeFileSync("auto-generated-widget.html", fileHtml);
  console.log("Updated auto-generated-widget.html");

}

var getMainPage = function() {
  var html = "";

  var widgetUrl = 'http://' +
    process.env.C9_PROJECT + '-' + process.env.C9_USER +
    '.c9users.io/widget.html';
  var editUrl = 'http://ide.c9.io/' +
    process.env.C9_USER + '/' +
    process.env.C9_PROJECT;

  var giturl = getGithubUrl();

  html = '<html><body>' +
    'Your ChiliPeppr Widget can be tested at ' +
    '<a target="_blank" href="' + widgetUrl + '">' +
    widgetUrl + '</a><br><br>\n\n' +
    'Your ChiliPeppr Widget can be edited at ' +
    '<a target="_blank" href="' + editUrl + '">' +
    editUrl + '</a><br><br>\n\n' +
    'Your ChiliPeppr Widget Github Url for forking ' +
    '<a target="_blank" href="' + giturl.url + '">' +
    giturl + '</a><br><br>\n\n' +
    'C9_PROJECT: ' + process.env.C9_PROJECT + '<br>\n' +
    'C9_USER: ' + process.env.C9_USER + '\n' +
    '';

  generateInlinedFile();
  html += '<br><br>Just updated your auto-generated-widget.html file.';
    
  //pushToGithub();
  //html += '<br><br>Just pushed updates to your Github repo.';
  
  var jsLoad = generateCpLoadStmt();
  html += '<br><br>Sample chilipeppr.load() Javascript for Your Widget\n<pre>' +
    jsLoad +
    '</pre>\n';
    
  var docs = generateWidgetDocs();
  html += '<br><br>Docs\n<pre>' +
    docs +
    '</pre>\n';
    
  return html;
}

var getGithubUrl = function(callback) {

  // read the git repo meta data to figure this out
  var url = "";
  var path = ".git/FETCH_HEAD";

  if (fs.existsSync(path)) {

    var data = fs.readFileSync(path).toString();
    //console.log("git url:", data);
    data = data.replace(/[\r\n]/g, "");

    var re = /.*github.com:/;
    var url = data.replace(re, "");
    url = "http://github.com/" + url;
    //console.log("final url:", url);
    
    var rawurl = url.replace(/\/github.com\//i, "/raw.githubusercontent.com/");
    rawurl += '/master/auto-generated-widget.html';

    return {
      url: url,
      rawurl : rawurl
    };
  }
  else {
    return null;
  }

}