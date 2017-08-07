/* global requirejs cprequire cpdefine chilipeppr THREE */
// Defining the globals above helps Cloud9 not show warnings for those variables

// ChiliPeppr Widget/Element Javascript

requirejs.config({
    paths: {
        //Three: '//i2dcui.appspot.com/geturl?url=http://threejs.org/build/three.min.js',
        // Keep in mind that the /slingshot url does the same as /geturl but it is not cached
        // Three: '//i2dcui.appspot.com/slingshot?url=http://threejs.org/build/three.min.js',
        // Three: '//i2dcui.appspot.com/geturl?url=http://threejs.org/build/three.js',
        Three: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r76/three',
        ThreeTextGeometry: '//i2dcui.appspot.com/js/three/TextGeometry',
        ThreeFontUtils: '//i2dcui.appspot.com/js/three/FontUtils',
        ThreeDetector: '//i2dcui.appspot.com/geturl?url=http://threejs.org/examples/js/Detector.js',
        //ThreeTrackballControls: '//i2dcui.appspot.com/geturl?url=http://threejs.org/examples/js/controls/TrackballControls.js',
        // Latest release
        // ThreeTrackballControls: '//i2dcui.appspot.com/slingshot?url=http://threejs.org/examples/js/controls/TrackballControls.js',
        // r79 (to solve that mousewheel zoom started not working in r80, so had to force to older version. eventually they'll fix the bug cuz i filed it)
        // ThreeTrackballControls: '//i2dcui.appspot.com/slingshot?url=http://rawgit.com/mrdoob/three.js/r79/examples/js/controls/TrackballControls.js',
        ThreeTrackballControls: '//i2dcui.appspot.com/geturl?url=http://rawgit.com/mrdoob/three.js/r79/examples/js/controls/TrackballControls.js',
        ThreeOrbitControls: '//threejs.org/examples/js/controls/OrbitControls',
        ThreeHelvetiker: '//i2dcui.appspot.com/js/three/threehelvetiker',
        ThreeTypeface: 'https://superi.googlecode.com/svn-history/r1953/trunk/MBrand/MBrand/Scripts/typeface-0.15',
        ThreeTween: '//i2dcui.appspot.com/js/three/tween.min',
        ThreeBufferGeometryUtils: '//i2dcui.appspot.com/js/three/BufferGeometryUtils',
        ThreeCanvasRenderer: '//i2dcui.appspot.com/geturl?url=http://threejs.org/examples/js/renderers/CanvasRenderer.js',
        ThreeProjector: '//i2dcui.appspot.com/geturl?url=http://threejs.org/examples/js/renderers/Projector.js',
    },
    shim: {
        ThreeTextGeometry: ['Three'],
        ThreeFontUtils: ['Three', 'ThreeTextGeometry'],
        ThreeHelvetiker: ['Three', 'ThreeTextGeometry', 'ThreeFontUtils'],
        //ThreeHelvetiker: ['Three', 'ThreeTextGeometry'],
        ThreeTrackballControls: ['Three'],
        ThreeTween: ['Three'],
        ThreeSparks: ['Three'],
        ThreeParticle: ['Three'],
        ThreeBufferGeometryUtils: ['Three'],
        ThreeCanvasRenderer: ['Three', 'ThreeProjector'],
        ThreeProjector: ['Three']
    }
});

cprequire_test(['inline:com-chilipeppr-widget-3dviewer'], function (threed) {

    // Test this element. This code is auto-removed by the chilipeppr.load()
    // when using this widget in production. So use the cpquire_test to do things
    // you only want to have happen during testing, like loading other widgets or
    // doing unit tests. Don't remove end_test at the end or auto-remove will fail.

    console.log("Running 3dviewer");
    
    // set my title while in test mode so it's pretty
    $('title').html(threed.name);
    
    // actually finally init me
    threed.init({doMyOwnDragDrop: true});
    
    // test resize signal
    setTimeout(function() {
            chilipeppr.publish('/' + threed.id + '/resize', "" );
    }, 3000);
    //dragdrop
    $('body').prepend('<div id="test-drag-drop"></div>');
    chilipeppr.load("#test-drag-drop", "http://fiddle.jshell.net/chilipeppr/Z9F6G/show/light/",

    function () {
        cprequire(
        ["inline:com-chilipeppr-elem-dragdrop"],

        function (dd) {
            dd.init();
            dd.bind("body", null);
        });
    });
    
    // flashmsg
    $('body').prepend('<div id="com-chilipeppr-flash"></div>');
    chilipeppr.load("#com-chilipeppr-flash",
        "http://fiddle.jshell.net/chilipeppr/90698kax/show/light/",

    function () {
        console.log("mycallback got called after loading flash msg module");
        cprequire(["inline:com-chilipeppr-elem-flashmsg"], function (fm) {
            //console.log("inside require of " + fm.id);
            fm.init();
        });
    });
    
    var testGotoline = function() {
        // send sample gcodeline commands as if the gcode sender widget were sending them
        setTimeout(function() {
            chilipeppr.publish('/com-chilipeppr-widget-3dviewer/gotoline', {line: 3, gcode: "G21 G90 G64 G40"} );
        }, 3000);
        setTimeout(function() {
            chilipeppr.publish('/com-chilipeppr-widget-3dviewer/gotoline', {line: 4, gcode: "G0 Z3.0"}  );
        }, 6000);
        setTimeout(function() {
            chilipeppr.publish('/com-chilipeppr-widget-3dviewer/gotoline', {line: 10, gcode: "G0 X130.8865 Y-11.5919"} );
        }, 9000);
        setTimeout(function() {
            chilipeppr.publish('/com-chilipeppr-widget-3dviewer/gotoline', {line: 11, gcode: "G0 Z1.5"} );
        }, 12000);
        setTimeout(function() {
            chilipeppr.publish('/com-chilipeppr-widget-3dviewer/gotoline', {line: 22, gcode: "G1 F300.0 Z0.0"}  );
        }, 12800);
    }
    
    var testGotoXyz = function() {
        // send sample gcodeline commands as if the gcode sender widget were sending them
        setTimeout(function() {
            chilipeppr.publish('/com-chilipeppr-interface-cnccontroller/axes', {x:0.0, y:0.0, z:10.0} );
        }, 3000);
        setTimeout(function() {
            chilipeppr.publish('/com-chilipeppr-interface-cnccontroller/axes', {z:-2.0} );
        }, 4000);
        setTimeout(function() {
            chilipeppr.publish('/com-chilipeppr-interface-cnccontroller/axes', {x:0.0, z:6.0} );
        }, 55000);

    }
    
    var testClear = function() {
        setTimeout(function() {
            chilipeppr.publish('/com-chilipeppr-widget-3dviewer/sceneclear' );
        }, 5000);
    }
    //testClear();
    
    var testViewExtents = function() {
        setTimeout(function() {
            chilipeppr.publish('/com-chilipeppr-widget-3dviewer/viewextents' );
        }, 5000);
    }
    //testViewExtents();
    
    //testGotoXyz();
    
    //threed.init();
    console.log("3d viewer initted");
} /*end_test*/ );

cpdefine('inline:com-chilipeppr-widget-3dviewer', ['chilipeppr_ready', 'Three', 'ThreeDetector', 'ThreeTrackballControls', 'ThreeTween', 'ThreeHelvetiker', 'ThreeBufferGeometryUtils'], function () {

    return {

        id: 'com-chilipeppr-widget-3dviewer',
        name: "Widget / 3D GCode Viewer",
        desc: "Visualize your GCode in 3D by simulating your GCode run or seeing where your run is at in 3D while your CNC operation is in action.",
        url: "(auto fill by runme.js)",       // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)",   // The standalone working widget so can view it working by itself
        publish: {
            '/recv3dObject' : "When you send a /request3dObject you will receive a signal back of /recv3dObject. This signal has a payload of the THREE.js user object being shown in the 3D viewer.",
            '/recvUnits' : 'When you send a /requestUnits you will receive back this signal with a payload of "mm" or "inch" as a string. Please also see /unitsChanged in case you want to know whenever units are changed from a file open event. You can request what units the Gcode are in from the 3D Viewer. Since the 3D Viewer parses Gcode, it can determine the units. The 3D Viewer is mostly unit agnostic, however to draw the toolhead, grid, and extents labels it does need to know the units to draw the decorations in a somewhat appropriate size.',
            '/unitsChanged' : 'This signal is published when the user loads a new file into the 3D viewer and the units change. If other widgets need to know what units are being used, you should subscribe to this signal to be notified on demand.',
            '/sceneReloaded' : "This signal is sent when the scene has been (re)load because the user dragged / dropped. The payload indicates the global bounding box of the scene. This signal is similar to listening to /com-chilipeppr-elem-dragdrop/ondropped however, /sceneReloaded is guaranteed to fire every time the 3D viewer loads a new file into the viewer. Credit for this signal goes to Dat Chu who created it for his GrblLaser workspace."
            
        },
        subscribe: {
            '/gotoline': "This widget subscribes to this channel so other widgets can move the toolhead and highlight the Gcode line being worked on. This would mostly be when sending Gcode from a Gcode viewer/sender widget, that widget can have the 3D view follow along. Just the line number should be sent as the 3D viewer has it's own cache of the Gcode data loaded.",
            '/resize' : "You can ask this widget to resize itself. It will resize the rendering area to the region it is bound to (typically the window width/height).",
            '/sceneadd' : "You can send Threejs objects to this widget and they will be added to the scene. You must send true THREE.Line() or other ThreeJS objects in that are added as scene.add() objects.",
            '/sceneremove' : "You can also remove objects from the 3D scene. This is the opposite of /sceneadd",
            '/sceneclear' : "This resets the 3D viewer and clears the scene. It keeps the axes, toolhead, and grid. The user object and extents is removed.",
            '/drawextents' : "This asks the 3D viewer to draw the extents of what it is showing.",
            '/viewextents' : "This asks the 3D viewer to place the entire 3D object set in the view window from a front facing position. It is the equivalent of the button with the \"eye\" icon in the toolbar.",
            '/setunits' : "Pass in a string of \"mm\" or \"inch\" to set the units for the 3D Viewer.",
            '/wakeanimate' : "The 3d viewer sleeps the rendering after 5 seconds. So if you are going to do any updates to the 3D scene you should wake the animation before your update. It will timeout on its own so you don't have to worry about it. /sceneadd and /sceneremove do their own waking so you don't need to ask for it on those.",
            '/request3dObject' : "You can request the parent-most object that is showing in the 3D viewer. This is a THREE.js object that is generated by the 3D viewer. It contains all user elements shown in the scene. It does not contain the XYZ axis, toolhead, or other system elements. When you send this signal you will receive a publish back on /recv3dObject",
            '/requestUnits' : 'Send in this signal and you will be sent back a /recvUnits with a payload of "mm" or "inch" as a string. Please also see /unitsChanged in case you want to know whenever units are changed from a file open event. You can request what units the Gcode are in from the 3D Viewer. Since the 3D Viewer parses Gcode, it can determine the units. The 3D Viewer is mostly unit agnostic, however to draw the toolhead, grid, and extents labels it does need to know the units to draw the decorations in a somewhat appropriate size.'
        },
        foreignSubscribe: {
            "/com-chilipeppr-interface-cnccontroller/axes" : "If we see this signal come in, we move the toolhead to the xyz position in the payload of the signal.",
            "/com-chilipeppr-elem-dragdrop/ondropped" : "When a user drags and drops a file to the main window, we want to get notified so we can load it into the 3D viewer. During development mode in JSFiddle, this widget loads it's own com-chilipeppr-elem-dragdrop so you can test development, but when this widget is loaded in a full ChiliPeppr app it uses the global com-chilipeppr-elem-dragdrop."
        },
        foreignPublish: {
        },
        scene: null,
        object: null,
        camera: null,
        controls: null,
        toolhead: null,
        tween: null,
        tweenHighlight: null,
        tweenIndex: null,
        tweenSpeed: 1,
        tweenPaused: false,
        tweenIsPlaying: false,
        wantAnimate: true, // we automatically timeout rendering to save on cpu
        initOptions: {},
        init: function (initOptions) {
            this.initOptions = initOptions;
            var that = this;
            /*
            if (!Modernizr.webgl) {
                alert('Sorry, you need a WebGL capable browser to use this.\n\nGet the latest Chrome or FireFox.');
                return;
            }

            if (!Modernizr.localstorage) {
                alert("Man, your browser is ancient. I can't work with this. Please upgrade.");
                return;
            }
            */

            // Show 'About' dialog for first time visits.
            /*
            if (!localStorage.getItem("not-first-visit")) {
                localStorage.setItem("not-first-visit", true);
                setTimeout(about, 500);
            }
            */

            // Drop files from desktop onto main page to import them.
            // We also can subscribe to the main chilipeppr drag/drop
            // pubsub to get drop events from a parent, rather than doing
            // this on our own
            
            // subscribe to file load events
            chilipeppr.subscribe("/com-chilipeppr-elem-dragdrop/ondropped", this, this.onPubSubFileLoaded);
            
            if (this.initOptions && this.initOptions.doMyOwnDragDrop) {
                console.log("Doing my own drag drop for 3D viewer cuz asked to. Attaching to body tag in DOM.");
                $('body').on('dragover', function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    event.originalEvent.dataTransfer.dropEffect = 'copy'
                }).on('drop', function (event) {
                    console.log("got drop:", event);
                    event.stopPropagation();
                    event.preventDefault();
                    var files = event.originalEvent.dataTransfer.files;
                    if (files.length > 0) {
                        var reader = new FileReader();
                        reader.onload = function () {
                            console.log("opening file. reader:", reader);
                            console.log ("stringify", JSON.stringify(reader.result, null, 2) );
                            that.openGCodeFromText(reader.result);
                        };
                        reader.readAsText(files[0]);
                        // reader.readAsArrayBuffer(files[0]);
                    }
                });
            }
            
            that.scene = that.createScene($('#com-chilipeppr-widget-3dviewer-renderArea'));
            var lastImported = localStorage.getItem('last-imported');
            var lastLoaded = localStorage.getItem('last-loaded');
            if (lastImported) {
                that.openGCodeFromText(lastImported);
            } else {
                //console.log("would have opened octocat");
                //that.openGCodeFromPath(lastLoaded || 'examples/octocat.gcode');
                console.log("loading chilipeppr logo");
                that.openGCodeFromPath(lastLoaded || 'http://www.chilipeppr.com/3d/chilipepprlogo.nc');
            }
            
            var lastFpsRate = localStorage.getItem ('fpsRate');
            if (lastFpsRate) {
                console.log("got prior FPS Rate, setting it now:  ", lastFpsRate, "//rk");
                //this.setFrameRate(parseInt(lastFpsRate) );
                var fr = parseInt(lastFpsRate);
                this.setFrameRate(fr);
                // set css to show selected
                $('.com-chilipeppr-widget-3dviewer-settings-fr').removeClass('alert-info');
                $('.com-chilipeppr-widget-3dviewer-settings-fr-' + fr).addClass('alert-info');
            }

            // setup toolbar buttons
            this.btnSetup();
            
            this.forkSetup();
            //this.setDetails("blah");
            
            // subscribe to gotoline signal so we can move toolhead to correct location
            // to sync with the gcode sender
            chilipeppr.subscribe('/' + this.id + '/gotoline', this, this.gotoLine);

            // subscribe to gotoline signal so we can move toolhead to correct location
            // to sync with the actual milling machine
            chilipeppr.subscribe('/com-chilipeppr-interface-cnccontroller/axes', this, this.gotoXyz);
            
            // we can be asked to resize ourself by a publish call to this signal
            chilipeppr.subscribe('/' + this.id + '/resize', this, this.resize);
            
            // requestUnits, recvUnits
            chilipeppr.subscribe("/" + this.id + "/requestUnits", this, this.requestUnits);
            
            // setup more pubsub to allow other widgets to inject objects to our scene
            this.setupScenePubSub();
            
            this.setupGridSizeMenu();
            
            this.setupCogMenu();
            this.setupFpsMenu();
            this.initJog(); //this.setupJog();
            this.initInspect();
            
            // hide the pan/zoom/orbit msg after 1 minute
            setTimeout(function() {
                console.log("hiding pan/zoom/orbit msg");
                $('.com-chilipeppr-widget-3dviewer-panzoom-indicator').fadeOut("slow"); //addClass("hidden");
            }, 60 * 1000);
            
        },
        setupScenePubSub: function() {
            // these pubsubs let others add objects to our 3d scene
            chilipeppr.subscribe("/" + this.id + "/wakeanimate", this, this.wakeAnimate);
            chilipeppr.subscribe("/" + this.id + "/sceneadd", this, this.sceneAdd);
            chilipeppr.subscribe("/" + this.id + "/sceneremove", this, this.sceneRemove);
            chilipeppr.subscribe("/" + this.id + "/sceneclear", this, this.sceneClear);
            chilipeppr.subscribe("/" + this.id + "/drawextents", this, this.drawAxesToolAndExtents);
            chilipeppr.subscribe("/" + this.id + "/viewextents", this, this.viewExtents);
            chilipeppr.subscribe("/" + this.id + "/setunits", this, this.setUnits);
            
            chilipeppr.subscribe("/" + this.id + "/request3dObject", this, this.request3dObject);
        },
        onSignalSceneReloadedFailAttempts: 0, // track failed nulls
        onSignalSceneReloaded: function () {
            // this can get called before there is userData, so check for that
            // and if so, wait to publish until there is
            if (this.object && this.object.userData && this.object.userData.bbbox2) {
                console.log("publishing /sceneReloaded. It took us X attempts:", this.onSignalSceneReloadedFailAttempts);
                chilipeppr.publish("/" + this.id + "/sceneReloaded", this.object.userData.bbbox2);
                this.onSignalSceneReloadedFailAttempts = 0;
            } else {
                // call ourselves again in 2 seconds
                if (this.onSignalSceneReloadedFailAttempts >= 5) {
                    // give up
                    console.log("tried 5 times onSignalSceneReloadedFailAttempts. giving up.");
                    this.onSignalSceneReloadedFailAttempts = 0;
                } else {
                    this.onSignalSceneReloadedFailAttempts++;
                    setTimeout(this.onSignalSceneReloaded.bind(this), 2000);
                }
            }
        },
        // INSPECT CODE REGION
        isInspectSelect: false,
        initInspect: function() {
            // attach click event
            console.log("doing one time run of initial inspect setup. this should not run more than once!!!");
            $('.com-chilipeppr-widget-3d-menu-inspect').click(this.toggleInspect.bind(this));
                
            // attach shortcut key
            var el = $('#com-chilipeppr-widget-3dviewer-renderArea');
            el.focus();
            $(document).keydown(this.inspectKeyDown.bind(this));
            $(document).keyup(this.inspectKeyUp.bind(this));
            
            this.inspectLastDecorateGroup = new THREE.Group();
            this.sceneAdd(this.inspectLastDecorateGroup);
            
            // get dialog element
            this.inspectDlgEl = $('.com-chilipeppr-widget-3dviewer-inspect');
            // setup click event
            this.inspectDlgEl.find('.inspect-btn-goto').click(this.onInspectGoto.bind(this));
            this.inspectDlgEl.find('.close').click(function() {
                $('.com-chilipeppr-widget-3dviewer-inspect').addClass("hidden");
            });
            
            // create three.js group to hold all preview lines
            this.inspectPreviewGroup = new THREE.Group();
            
            
        },
        setupInspect: function(evt) {
            
            console.log("setupInspect.");
            if (this.isInspectSelect) {
                console.log("we are already in inspect mode. being asked to setup, but returning cuz u can't setup more than once.");
                return;
            }
            
            // start watching mouse
            var el = $(this.renderer.domElement);
            el.mousemove(this.inspectMouseMove.bind(this));
            el.click(this.inspectMouseClick.bind(this));
            $('.com-chilipeppr-widget-3d-menu-inspect').addClass("active");
            $('.com-chilipeppr-widget-3d-menu-inspect').addClass("btn-primary");
            // make sure animation stays on
            //this.gotoXyz({x:0,y:0,z:3});
            if (this.inspectArrowGrp != null) {
                this.sceneAdd(this.inspectArrowGrp);
                //this.inspectArrowGrp.visible = true;
            }
            
            this.sceneAdd(this.inspectPreviewGroup);
            
            this.isInspectSelect = true;
        },
        unsetupInspect: function() {
            console.log("unsetupInspect");
            if (!this.isInspectSelect) {
                console.log("we are being asked to unsetup inspect, but it is not running so why are we getting called?");
                return;
            }
            
            var el = $(this.renderer.domElement);
            el.unbind("mousemove");
            el.unbind("click");
            $('.com-chilipeppr-widget-3d-menu-inspect').removeClass("active");
            $('.com-chilipeppr-widget-3d-menu-inspect').removeClass("btn-primary");
            //this.unsetupJogRaycaster();
            if (this.inspectArrowGrp != null) {
                this.sceneRemove(this.inspectArrowGrp);
                //this.inspectArrowGrp.visible = false;
            }
            this.sceneRemove(this.inspectPreviewGroup);
            this.isInspectSelect = false;
        },
        toggleInspect: function(evt) {
            if ($('.com-chilipeppr-widget-3d-menu-inspect').hasClass("active")) {
                // turn off
                this.unsetupInspect(evt);
            } else {
                this.setupInspect(evt);
            }
        },
        inspectKeyDown: function(evt) {
            if ((evt.shiftKey)  && !this.isInspectSelect) {
                this.wakeAnimate();
                this.setupInspect(evt);
            }
        },
        inspectKeyUp: function(evt) {
            if ((evt.keyCode == 16) && this.isInspectSelect) {
                this.unsetupInspect(evt);
            }
        },
        inspectMouseClick: function(evt) {
            console.log("inspectMouseClick. evt:", evt);
            return;
            if (evt.ctrlKey || evt.altKey) {
                if (this.jogCurPos != null) {
                    var pt = this.jogCurPos;
                    var gcode = "G90 G0 X" + pt.x.toFixed(3) + " Y" + pt.y.toFixed(3);
                    gcode += "\n";
                    chilipeppr.publish("/com-chilipeppr-widget-serialport/send", gcode);
                } else {
                    console.warn("this.jogCurPos should not be null");
                }
            }
        },
        onInspectGoto: function(evt) {
            if (this.inspectLastObj.uuid != "") {
                var lineNum = this.inspectLastObj.userData.args.indx + 1;
                chilipeppr.publish("/com-chilipeppr-widget-gcode/jumpToLine", lineNum);
            }
        },
        inspectArrowGrp: null,
        createInspectArrow: function() {
            
            if (this.inspectArrowGrp != null) return;
            
            // build pointer line
            this.inspectArrowGrp = new THREE.Group();
            
            // draw dotted lines from jog tip and shadow
            var lineMat = new THREE.LineDashedMaterial( { color: 0xff0000, dashSize: this.getUnitVal(1),  gapSize: this.getUnitVal(1), transparent: true, opacity: 0.5 } );
            var lineGeo = new THREE.Geometry();
            lineGeo.vertices.push(new THREE.Vector3( 0, 0, this.getUnitVal(-100) ));
            lineGeo.vertices.push(new THREE.Vector3( 0, 0, this.getUnitVal(100) ));
            var line = new THREE.Line(lineGeo, lineMat); //, THREE.LineStrip);
            this.inspectArrowLine = line;
            this.inspectArrowGrp.add(line);

            this.sceneAdd(this.inspectArrowGrp);
            console.log("just added inspectArrowGrp:", this.inspectArrowGrp);

        },
        inspectCurPos: null,
        inspectLastObj: {uuid:""},
        inspectLastDecorateGroup: null,
        inspectDlgEl: null,
        inspectMouseMove: function(evt) {
            
            //event.preventDefault();
            if (!this.isInspectSelect) {
                return;
            }
            
            this.createInspectArrow();
            
            this.wakeAnimate();
            
            console.log("inspectMouseMove. evt:", evt);
            
            var mouse = {};
            mouse.x = ( evt.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( evt.clientY / window.innerHeight ) * 2 + 1;
            
            var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 ).unproject( this.camera );
            
            var origin = this.camera.position.clone();
            var dir = vector.sub( this.camera.position ).normalize();
            
            // set where arrow is pointing
            //this.inspectArrowGrp.position.set(origin.x, origin.y, 0);
            
            var raycaster = new THREE.Raycaster( origin, dir );
            raycaster.linePrecision = 0.2;
            //console.log("mouse:", mouse, "raycaster:", raycaster);
            //console.log("inspecting object.children", this.object.children);
            //var io = raycaster.intersectObjects(this.object.children, true);
            var io = raycaster.intersectObjects(this.object.userData.threeObjs.children, true);
            //console.log("io:", io);
            
            if (io.length > 0) {
                // we hit some objects
                var obj = io[0];
                //console.log("obj:", obj);
                
                // see if this is a new object we haven't hit yet
                if (this.inspectLastObj.uuid != obj.object.uuid) {
                    
                    var o = obj.object;
                    var ud = o.userData;
                    
                    console.log("hit new object:", o);

                    //this.inspectLastOpacity = o.material.opacity;
                    
                    // reset last object
                    //console.log("testing for reset last object. this.inspectLastObj:", this.inspectLastObj);
                    
                    // remove all previous preview items
                    this.inspectPreviewGroup.children.forEach(function(threeObj) {
                        this.inspectPreviewGroup.remove(threeObj);
                    }, this);
                    
                    if (this.inspectLastObj.uuid != "") {
                        //this.inspectPreviewGroup(
                        //this.sceneRemove(this.inspectLastObj);
                        //this.inspectLastObj.material.opacity = this.inspectLastOpacity;
                        //this.inspectLastObj.material.color = 0x0000ff;
                    }
                    
                    // set the current object to new opacity
                    //o.material.opacity = 1.0;
                    //o.material.color = 0xff0000;
                    //this.sceneAdd(o);
                    // create glow
                    var glow = this.createGlow(o);
                    this.inspectPreviewGroup.add(glow);
                    
                    // show dialog
                    var x = event.clientX;
                    var y = event.clientY;
                    x += 30; // slide right to clear mouse
                    y += -140;
                    this.inspectDlgEl.css('left', x + "px").css('top', y + "px");
                    this.inspectDlgEl.find('.inspect-line').text(ud.args.indx + 1);
                    this.inspectDlgEl.find('.inspect-gcode').text(ud.args.origtext);
                    this.inspectDlgEl.find('.inspect-end').text("X:" + ud.p2.x + ", Y:" + ud.p2.y + ", Z:" + ud.p2.z);
                    this.inspectDlgEl.find('.inspect-feedrate').text(ud.p2.feedrate);
                    this.inspectDlgEl.find('.inspect-distance').text(ud.p2.dist.toFixed(3));
                    this.inspectDlgEl.find('.inspect-time').text((ud.p2.timeMins * 60).toFixed(2) + "s");
                    var pretty = this.convertMinsToPrettyDuration(ud.p2.timeMinsSum);
                    this.inspectDlgEl.find('.inspect-timeSum').text(pretty);
                    this.inspectDlgEl.removeClass("hidden");
                    
                    // set the last object to this one
                    this.inspectLastObj = o;
                    
                    // remove any previous
                    /*
                    var that = this;
                    this.inspectLastDecorateGroup.traverse(function(o) {
                        that.inspectLastDecorateGroup.remove(o);
                    });
                    
                
                    
                    // draw a bounding box
                    var bbox = new THREE.BoundingBoxHelper( o, 0xff0000 );
                    bbox.update();
                    bbox.object.material.opacity = 0.1;
                    bbox.object.material.transparent = true;
                    bbox.material.opacity = 0.1;
                    bbox.material.transparent = true;
                    console.log("bbox:", bbox);
                    //this.sceneAdd( bbox );
                    this.inspectLastDecorateGroup.add(bbox);
                    */
                    
                    // clone it, make it pretty
                    /*
                    var newObj = obj.object.clone();
                    newObj.material.opacity = 1.0;
                    
                    this.inspectLastDecorateGroup.add(newObj);
                    */
                    
                }
                
                
                //io[0].object.material.opacity = 1.0;
                
                var pt = io[0].point;
                // move arrow
                this.inspectArrowGrp.position.set(pt.x, pt.y, 0);
                this.inspectCurPos = pt.clone();
                
                
            } else if (false) {
                
                // nothing was hit, reset last obj
                // reset last object
                console.log("nothing hit. resetting inspectLastObj:", this.inspectLastObj);
                if (this.inspectLastObj.uuid != "") {
                    
                    // remove everything from this.inspectPreviewGroup
                    this.inspectPreviewGroup.children.forEach(function(threeObj) {
                        this.inspectPreviewGroup.remove(threeObj);
                    }, this);
                    //this.sceneRemove(this.inspectLastObj);
                    this.inspectLastObj.material.color = 0x0000ff;
                    this.inspectLastObj.material.opacity = this.inspectLastOpacity;
                    this.inspectLastObj = {uuid:""};
                    // hide dialog
                    this.inspectDlgEl.addClass("hidden");
                }
            }
        },
        createGlow: function(threeObj) {
            console.log("createGlow. threeObj:", threeObj);
            var obj = new THREE.Group();
            if (threeObj instanceof THREE.Line) {
                console.log("threeObj is Line");
                // draw a cube at each end point
                var v1 = threeObj.geometry.vertices[0];
                var v2 = threeObj.geometry.vertices[threeObj.geometry.vertices.length - 1];
                var uv1 = v1.clone();
                var uv2 = v2.clone();
                var length = v1.distanceTo(v2);
                var dir = v2.clone().sub(v1).normalize();
                var ray = new THREE.Ray(v1, dir);
                var geometry = new THREE.CylinderGeometry( 1, 1, length );
                var material = new THREE.MeshNormalMaterial( {
                    //color: 0x00ff00,
                    transparent: true,
                    opacity: 0.1
                } );
                var cylinder = new THREE.Mesh( geometry, material );
                // figure out rotation
                var arrow = new THREE.ArrowHelper( dir, v1, length, 0xff0000 );
                obj.add(arrow);
                //uv2.sub(uv1);
                /*uv1.normalize();
                uv2.normalize();
                var quaternion = new THREE.Quaternion().setFromUnitVectors( uv1, uv2 );
                var matrix = new THREE.Matrix4().makeRotationFromQuaternion( quaternion );
                cylinder.applyMatrix( matrix );*/
                var rot = arrow.rotation.clone()
                cylinder.rotation.set(rot.x, rot.y, rot.z);
                var cpos = ray.at(length/2);
                cylinder.position.set(cpos.x, cpos.y, cpos.z);

                console.log("adding cylinder:", cylinder);
                obj.add(cylinder);
            } else {
                console.log("threeObj not Line");
                //return 
            }
            return obj;
        },
        createGlowCubeCaps: function(threeObj) {
            console.log("createGlow. threeObj:", threeObj);
            var obj = new THREE.Group();
            if (threeObj instanceof THREE.Line) {
                console.log("threeObj is Line");
                // draw a cube at each end point
                var v1 = threeObj.geometry.vertices[0];
                var v2 = threeObj.geometry.vertices[threeObj.geometry.vertices.length - 1];
                var geometry = new THREE.BoxGeometry( 1, 1, 1 );
                var material = new THREE.MeshNormalMaterial( {
                    //color: 0x00ff00,
                    transparent: true,
                    opacity: 0.1
                } );
                var cube = new THREE.Mesh( geometry, material );
                cube.position.set(v1.x, v1.y, v1.z);
                var cube2 = cube.clone();
                cube2.position.set(v2.x, v2.y, v2.z);
                //this.sceneAdd( cube );
                console.log("adding cube:", cube, "cube2:", cube2);
                obj.add(cube);
                obj.add(cube2);
                //return cube;
            } else {
                console.log("threeObj not Line");
                //return 
            }
            return obj;
        },
        

        // JOG CODE REGION
        isJogBtnAttached: false, // is the jog btn setup?
        isJogSelect: false, // indicates we're in 3d jog mode
        initJog: function() {
            if (!this.isJogBtnAttached) {
                // attach click event
                console.log("doing one time run of initial jog setup. this should not run more than once!!!");
                $('.com-chilipeppr-widget-3d-menu-jog').click(this.toggleJog.bind(this));
                
                // attach shortcut key
                //$(document).keydown(this.jogKeyDown.bind(this));
                //$(document).keydown(this.jogKeyUp.bind(this));
                var el = $('#com-chilipeppr-widget-3dviewer-renderArea');
                el.focus();
                $(document).keydown(this.jogKeyDown.bind(this));
                $(document).keyup(this.jogKeyUp.bind(this));
                this.isJogBtnAttached = true;
            }
        },
        setupJog: function(evt) {
            
            console.log("setupJog.");
            if (this.isJogSelect) {
                console.log("we are already in jogging mode. being asked to setup, but returning cuz u can't setup more than once.");
                return;
            }
            //  var el = $(this.renderer.domElement);
            //var el = $('#com-chilipeppr-widget-3dviewer-renderArea');
            //el.focus();
            //console.log("setupJog. el:", el);
            //el.keydown(this.jogKeyDown.bind(this));
            //el.keyup(this.jogKeyUp.bind(this));
            //this.renderer.domElement.addEventListener( 'keydown', this.jogKeyDown.bind(this), false );
            
            // start watching mouse
            var el = $(this.renderer.domElement);
            el.mousemove(this.jogMouseMove.bind(this));
            el.click(this.jogMouseClick.bind(this));
            $('.com-chilipeppr-widget-3d-menu-jog').addClass("active");
            $('.com-chilipeppr-widget-3d-menu-jog').addClass("btn-primary");
            // make sure animation stays on
            //this.gotoXyz({x:0,y:0,z:3});
            this.isJogSelect = true;
        },
        unsetupJog: function() {
            
            if (!this.isJogSelect) {
                console.log("we are being asked to unsetup jog, but it is not running so why are we getting called?");
                return;
            }
            
            var el = $(this.renderer.domElement);
            el.unbind("mousemove"); //this.jogMouseMove.bind(this));
            el.unbind("click");
            $('.com-chilipeppr-widget-3d-menu-jog').removeClass("active");
            $('.com-chilipeppr-widget-3d-menu-jog').removeClass("btn-primary");
            this.unsetupJogRaycaster();
            this.isJogSelect = false;
        },
        toggleJog: function(evt) {
            if ($('.com-chilipeppr-widget-3d-menu-jog').hasClass("active")) {
                // turn off
                this.unsetupJog(evt);
            } else {
                this.setupJog(evt);
            }
        },
        jogKeyDown: function(evt) {
            //console.log("jogKeyDown. evt:", evt);
            //if ((evt.cltrKey || evt.altKey) && !this.isJogSelect) {
            //if ((evt.ctrlKey || evt.altKey)  && !this.isJogSelect) {
            if ((evt.ctrlKey)  && !this.isJogSelect) {
                //evt.preventDefault();
                //this.isJogSelect = true;
                this.wakeAnimate();
                this.setupJog(evt);
            } else {
                //console.log("we are already jogging. ignoring keydown.");
            }
        },
        jogKeyUp: function(evt) {
            //console.log("jogKeyUp. evt:", evt);
            //if ((evt.keyCode == 17 || evt.keyCode == 18) && this.isJogSelect) {
            if ((evt.keyCode == 17) && this.isJogSelect) {
                //this.isJogSelect = false;
                this.unsetupJog(evt);
            }
        },
        arrowHelper: null,
        jogPlane: null,
        isJogRaycaster: false,
        jogArrow: null,
        jogArrowCyl: null,
        jogArrowLine: null,
        jogArrowShadow: null,
        unsetupJogRaycaster: function() {
            this.sceneRemove(this.jogPlane);
            this.sceneRemove(this.jogArrow);
            this.isJogRaycaster = false;
        },
        setupJogRaycaster: function() {
            
            console.log("doing setupJogRaycaster"); 
            console.log("mimic grid size:", this.grid);
            var helper = new THREE.BoundingBoxHelper(this.grid, 0xff0000);
            helper.update();
            // If you want a visible bounding box
            //scene.add(helper);
            // If you just want the numbers
            console.log(helper.box.min);
            console.log(helper.box.max);
            
            console.log("boundingbox:", helper.box);
            var w = helper.box.max.x - helper.box.min.x;
            var h = helper.box.max.y - helper.box.min.y;
            
            // create plane at z 0 to project onto
            var geometry = new THREE.PlaneBufferGeometry( w, h );
            var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
            this.jogPlane = new THREE.Mesh( geometry, material );
            //this.scene.add( this.jogPlane );
            
            // setup arrow helper
            /*
            var length = 50;
            var hex = 0xffff00;
            
            var origin = new THREE.Vector3(0,0,50);
            var dir = new THREE.Vector3(0,0,-1);
            //if (this.arrowHelper != null) this.scene.remove(this.arrowHelper);
            this.arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
            //this.arrowHelper.material.visibility = false;
            this.scene.add( this.arrowHelper );
            */
            
            console.group("draw jogArrow");
            
            // remove grid if drawn previously
            if (this.jogArrow != null) {
                console.log("there was a previous jogArrow. remove it. jogArrow:", this.jogArrow);
                
                this.sceneRemove(this.jogArrow);
            } else {
                console.log("no previous jogArrow.");
            }
            
            // TOOLHEAD WITH SHADOW
            var jogArrowGrp = new THREE.Object3D();
            
            // jogArrow Cylinder
            // API: THREE.CylinderGeometry(bottomRadius, topRadius, height, segmentsRadius, segmentsHeight)
            var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0, 5, 40, 15, 1, false), new THREE.MeshNormalMaterial());
            cylinder.overdraw = true;
            cylinder.rotation.x = -90 * Math.PI / 180;
            cylinder.position.z = 20;
            //cylinder.position.z = 40;
            cylinder.material.opacity = 0.3;
            cylinder.material.transparent = true;
            cylinder.castShadow = false;
            console.log("jogArrow cone:", cylinder);
            
            // move the cylinder up in the group to account for z pos of toolhead
            // acct for scale
            var posZ = (this.toolhead.position.z * 3);
            cylinder.position.setZ(posZ + 20);
            this.jogArrowCyl = cylinder;
            jogArrowGrp.add(cylinder);
            
            // scale the whole thing to correctly match mm vs inches
            var scale = this.getUnitVal(1);
            jogArrowGrp.scale.set(scale / 3, scale / 3, scale / 3);

            // add fake shadow
            var triangleShape = new THREE.Shape();
            triangleShape.moveTo(  0, 0 );
            triangleShape.lineTo(  -8, 3 );
            triangleShape.lineTo( -8.5, 2 );
            triangleShape.lineTo(  -8.7, 1 ); 
            triangleShape.lineTo(  -8.72, 0 ); 
            triangleShape.lineTo(  -8.7, -1 ); 
            triangleShape.lineTo( -8.5, -2 );
            triangleShape.lineTo(  -8, -3 );
            triangleShape.lineTo(  0, 0 ); // close path
            var geometry = new THREE.ShapeGeometry( triangleShape );
            
            //var mesh = THREE.SceneUtils.createMultiMaterialObject( geometry, [ new THREE.MeshLambertMaterial( { color: 0x000000, transparent: true, opacity:0.05 } ), new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } ) ] );
            var mesh = THREE.SceneUtils.createMultiMaterialObject( geometry, [ new THREE.MeshLambertMaterial( { color: 0x000000, transparent: true, opacity:0.05 } ) ] );
            //mesh.position.set( x, y, z - 125 );
            //mesh.rotation.set( rx, ry, rz );
            //mesh.scale.set( s, s, s );
            
            // figure out z position
            //mesh.position.setZ(this.toolhead.position.z);
            // move shadow left by the amount by amount of z height
            mesh.position.setX(posZ * -1);
            this.jogArrowShadow = mesh;
            jogArrowGrp.add( mesh );
            
            // draw dotted lines from jog tip and shadow
            var lineMat = new THREE.LineDashedMaterial( { color: 0x000000, xdashSize: 45, xgapSize: 45 } );
            var lineGeo = new THREE.Geometry();
            lineGeo.vertices.push(new THREE.Vector3( 0, 0, 0 ));
            lineGeo.vertices.push(new THREE.Vector3( 0, 0, posZ ));
            var line = new THREE.Line(lineGeo, lineMat, THREE.LineStrip);
            this.jogArrowLine = line;
            jogArrowGrp.add(line);
            
            // add text
            var txt = "Ctrl Click to XY Jog Here";
            var txtObj = this.makeText({
                x: 4,
                y: (this.getUnitVal(7) / 2) *-1,
                z: 0,
                text: txt,
                color: 0x000000,
                opacity: 0.2,
                size: 7 //this.getUnitVal(7)
            });
            jogArrowGrp.add( txtObj );
            
            this.jogArrow = jogArrowGrp;
            
            this.sceneAdd(this.jogArrow);
            
            console.groupEnd();
            
            this.isJogRaycaster = true;
        },
        jogMouseClick: function(evt) {
            console.log("jogMouseClick. evt:", evt);
            if (evt.ctrlKey || evt.altKey) {
                if (this.jogCurPos != null) {
                    var pt = this.jogCurPos;
                    var gcode = "G90 G0 X" + pt.x.toFixed(3) + " Y" + pt.y.toFixed(3);
                    gcode += "\n";
                    chilipeppr.publish("/com-chilipeppr-widget-serialport/send", gcode);
                } else {
                    console.warn("this.jogCurPos should not be null");
                }
            }
        },
        jogCurPos: null,
        jogMouseMove: function(evt) {
            
            //event.preventDefault();
            if (!this.isJogSelect) {
                return;
            }
            
            this.wakeAnimate();
            
            //console.log("jogMouseMove. evt:", evt);

            var mouse = {};
            mouse.x = ( evt.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( evt.clientY / window.innerHeight ) * 2 + 1;
            
            var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 ).unproject( this.camera );
            
            var origin = this.camera.position.clone();
            var dir = vector.sub( this.camera.position ).normalize();
            
            if (!this.isJogRaycaster) {
                this.setupJogRaycaster();
            }
            
            var raycaster = new THREE.Raycaster( origin, dir );
            //console.log("mouse:", mouse, "raycaster:", raycaster);
            var io = raycaster.intersectObject(this.jogPlane, false);
            //console.log("io:", io);
            
            if (io.length > 0) {
                // we hit the jog plane
                var pt = io[0].point;
                // move arrow
                this.jogArrow.position.set(pt.x, pt.y, 0);
                this.jogCurPos = pt.clone();
            }
        },
        showShadow: false,
        setupCogMenu: function() {
            $('.com-chilipeppr-widget-3dviewer-settings-shadows').click( this.onToggleShadowClick.bind(this));
        },
        onToggleShadowClick: function(evt, param) {
            console.log("got onToggleShadowClick. evt:", evt, "param:", param);
            this.showShadow = !this.showShadow; // toggle
            this.drawToolhead();
        },
        setupFpsMenu: function() {
            $('.com-chilipeppr-widget-3dviewer-settings-fr-5').click(5, this.onFpsClick.bind(this));
            $('.com-chilipeppr-widget-3dviewer-settings-fr-10').click(10, this.onFpsClick.bind(this));
            $('.com-chilipeppr-widget-3dviewer-settings-fr-15').click(15, this.onFpsClick.bind(this));
            $('.com-chilipeppr-widget-3dviewer-settings-fr-30').click(30, this.onFpsClick.bind(this));
            $('.com-chilipeppr-widget-3dviewer-settings-fr-60').click(60, this.onFpsClick.bind(this));
            $('.com-chilipeppr-widget-3dviewer-settings-fr-0').click(0, this.onFpsClick.bind(this));
            $('.com-chilipeppr-widget-3dviewer-settings-fr--5').click(-5, this.onFpsClick.bind(this));
        },
        onFpsClick: function(evt, param) {
            console.log("got onFpsClick. evt:", evt, "param:", param);
            var fr = evt.data;
            this.setFrameRate(fr);
            // set css to show selected
            $('.com-chilipeppr-widget-3dviewer-settings-fr').removeClass('alert-info');
            $('.com-chilipeppr-widget-3dviewer-settings-fr-' + fr).addClass('alert-info');
            this.wakeAnimate();
        },
        gridSize: 1, // global property for size of grid. default to 1 (shapeoko rough size)
        setupGridSizeMenu: function() {
            $('.com-chilipeppr-widget-3dviewer-gridsizing-1x').click(1, this.onGridSizeClick.bind(this));
            $('.com-chilipeppr-widget-3dviewer-gridsizing-2x').click(2, this.onGridSizeClick.bind(this));
            $('.com-chilipeppr-widget-3dviewer-gridsizing-5x').click(5, this.onGridSizeClick.bind(this));
            $('.com-chilipeppr-widget-3dviewer-gridsizing-10x').click(10, this.onGridSizeClick.bind(this));
        },
        onGridSizeClick: function(evt, param) {
            console.log("got onGridSizeClick. evt:", evt, "param:", param);
            
            // remove old css
            $('.com-chilipeppr-widget-3dviewer-gridsizing-' + this.gridSize + 'x').removeClass("alert-info");
            
            var size = evt.data;
            this.gridSize = size;
            // redraw grid
            this.drawGrid();
            
            $('.com-chilipeppr-widget-3dviewer-gridsizing-' + this.gridSize + 'x').addClass("alert-info");
            
        },
        setUnits: function(units) {
            if (units == "mm")
                this.isUnitsMm = true;
            else
                this.isUnitsMm = false;
            console.log("SETTING setUnits");
            this.onUnitsChanged();
        },
        requestUnits: function() {
            console.log("requestUnits");
            // we need to publish back the units
            var units = "mm";
            if (!this.isUnitsMm) units = "inch";
            chilipeppr.publish("/" + this.id + "/recvUnits", units);
        },
        onUnitsChanged: function() {
            //console.log("onUnitsChanged");
            // we need to publish back the units
            var units = "mm";
            if (!this.isUnitsMm) units = "inch";
            console.log("SETTING CHANGED " + units + this.isUnitsMm);
            chilipeppr.publish("/" + this.id + "/unitsChanged", units);
            $('.com-chilipeppr-widget-3dviewer-units-indicator').text(units);
            console.log("SETTING OUT " + units + this.isUnitsMm);
        },
        request3dObject: function() {
            console.log("request3dObject");
            // we need to publish back the object
            chilipeppr.publish("/" + this.id + "/recv3dObject", this.object, {'scene': this.scene, 'camera': this.camera, 'toolhead': this.toolhead, 'widget': this });
        },
        sceneAdd: function(obj) {
            console.log("sceneAdd. obj:", obj);
            this.wakeAnimate();
            this.scene.add(obj);
        },
        sceneRemove: function(obj) {
            console.log("sceneRemove. obj:", obj);
            this.wakeAnimate();
            if (obj && 'traverse' in obj) {
                this.scene.remove(obj);
                obj.traverse( function ( child ) {
                    if (child.geometry !== undefined) {
                        child.geometry.dispose();
                        child.material.dispose();
                    }
                } );
            }
        },
        sceneClear: function() {
            this.stopSampleRun();
            this.wakeAnimate();
            //this.scene.remove(this.object);
            this.object.children = [];
            this.sceneRemove(this.decorate);
        },
        btnSetup: function() {
            
            // attach button bar features
            var that = this;
            this.isLookAtToolHeadMode = true;
            $('.com-chilipeppr-widget-3d-menu-lookattoolhead').click(function () {
                if (that.isLookAtToolHeadMode) {
                    // turn off looking at toolhead
                    that.isLookAtToolHeadMode = false;
                    $('.com-chilipeppr-widget-3d-menu-lookattoolhead').removeClass("active btn-primary");
                } else {
                    // turn on looking at toolhead
                    that.isLookAtToolHeadMode = true;
                    that.lookAtToolHead();
                    $('.com-chilipeppr-widget-3d-menu-lookattoolhead').addClass("active btn-primary");
                }                    
            });
            $('.com-chilipeppr-widget-3d-menu-viewextents').click(function () {
                that.viewExtents()
            });
            $('.com-chilipeppr-widget-3d-menu-samplerun').click(function () {
                that.playSampleRun()
            });
            $('.com-chilipeppr-widget-3d-menu-samplerunstop').click(function () {
                that.stopSampleRun()
            });
            $('.com-chilipeppr-widget-3d-menu-samplerunspeed').click(function () {
                that.speedUp()
            });
            $('.com-chilipeppr-widget-3d-menu-samplerunpause').click(function () {
                that.pauseSampleRun()
            }).prop('disabled', true);
            $('.com-chilipeppr-widget-3d-menu-samplerunstop').prop('disabled', true);
            $('.btn').popover({
                animation: true,
                placement: "auto",
                trigger: "hover"
            });
        },
        forkSetup: function () {
            //$('#com-chilipeppr-widget-3dviewer .fork').prop('href', this.fiddleurl);
            //$('#com-chilipeppr-widget-3dviewer .standalone').prop('href', this.url);
            //var t = $('#com-chilipeppr-widget-3dviewer .fork-name');
            //t.html(this.id);
            $('#com-chilipeppr-widget-3dviewer .panel-title').popover({
                title: this.name,
                content: this.desc,
                html: true,
                delay: 200,
                animation: true
            });
            
            // load the pubsub viewer / fork element which decorates our upper right pulldown
            // menu with the ability to see the pubsubs from this widget and the forking links
            var that = this;
            chilipeppr.load("http://fiddle.jshell.net/chilipeppr/zMbL9/show/light/", function () {
                require(['inline:com-chilipeppr-elem-pubsubviewer'], function (pubsubviewer) {
                    pubsubviewer.attachTo($('#com-chilipeppr-widget-3dviewer-dropdown'), that);
                });
            });

            //console.log("title in menu", t);
        },
        onPubSubFileLoaded: function(txt) {
            this.openGCodeFromText(txt);
        },
        error: function (msg) {
            alert(msg);
        },
        loadFile: function (path, callback /* function(contents) */ ) {
            var that = this;
            
          // rewrite www.chilipeppr.com url's to i2dcui.appspot.com so we support SSL
          path = path.replace(/http\:\/\/www.chilipeppr.com/i, "//i2dcui.appspot.com");
          path = path.replace(/http\:\/\/chilipeppr.com/i, "//i2dcui.appspot.com");
          path = path.replace(/\/\/www.chilipeppr.com/i, "//i2dcui.appspot.com");
          path = path.replace(/\/\/chilipeppr.com/i, "//i2dcui.appspot.com");

            $.get(path, null, callback, 'text')
                .error(function () {
                that.error()
            });
        },
        setDetails: function(txt) {
            $('#com-chilipeppr-widget-3dviewer-renderArea .data-details').text(txt);
        },
        speedUp: function () {
            //var txt = $('.com-chilipeppr-widget-3d-menu-samplerunspeed').text();
            console.log("speedUp. tweenSpeed:", this.tweenSpeed);
            //var s = this.tweenSpeed;
            this.tweenSpeed = this.tweenSpeed * 10;
            if (this.tweenSpeed > 1024) this.tweenSpeed = 1;
            var txt = "x" + this.tweenSpeed;
            $('.com-chilipeppr-widget-3d-menu-samplerunspeed').text(txt);
        },
        openGCodeFromPath: function (path) {
            var that = this;
            //$('#openModal').modal('hide');
            if (that.object) {
                //TWEEN.removeAll();
                this.stopSampleRun();
                that.scene.remove(that.object);
                //that.scene.remove(that.decorate);
            }
            that.loadFile(path, function (gcode) {
                that.object = that.createObjectFromGCode(gcode);
                that.scene.add(that.object);
                that.viewExtents();
                //that.decorateExtents();
                that.drawAxesToolAndExtents();
                console.log("SETTING loadFile");
                that.onUnitsChanged();
                localStorage.setItem('last-loaded', path);
                localStorage.removeItem('last-imported');
            });
            // fire off Dat Chu's scene reload signal
            that.onSignalSceneReloaded();
        },
        openGCodeFromText: function (gcode) {
            console.log("openGcodeFromText");
            this.wakeAnimate();
            //$('#openModal').modal('hide');
            if (this.object) {
                //TWEEN.removeAll();
                this.stopSampleRun();
                this.scene.remove(this.object);
                //this.scene.remove(this.decorate);
            }
            this.object = this.createObjectFromGCode(gcode);
            console.log("done creating object:", this.object);
            this.scene.add(this.object);
            //this.lookAtCenter();
            this.viewExtents();
            //this.decorateExtents();
            this.drawAxesToolAndExtents();
            this.onUnitsChanged();
            this.setDetails(this.object.userData.lines.length + " GCode Lines");
            this.wakeAnimate();
            
            // we can get a QuotaExceededError here, so catch it
            try {
                // remove old 1st to perhaps make more room for quota check
                localStorage.removeItem('last-imported');
                // now set
                localStorage.setItem('last-imported', gcode);
            } catch(e) {
                if (e.name === 'QUOTA_EXCEEDED_ERR' || e.name == "QuotaExceededError" || e.code == 22 || e.name == "NS_ERROR_DOM_QUOTA_REACHED" || e.code == 1014) {
                    //this.sceneRemove(this.object);
                    // show err dialog
                    console.error("3D Viewer Widget. out of local storage space, but letting user proceed. err:", e);
                    $('#com-chilipeppr-widget-3dviewer-outofspace').modal();
                } else {
                    console.error("3D Viewer Widget. got err with localStorage:", e);
                }
            }
            localStorage.removeItem('last-loaded');
            
            // fire off Dat Chu's scene reload signal
            this.onSignalSceneReloaded();

        },
        lookAtCenter: function () {
            // this method makes the trackball controls look at center of gcode object
            this.controls.target.x = this.object.userData.center2.x;
            this.controls.target.y = this.object.userData.center2.y;
            this.controls.target.z = this.object.userData.center2.z;
        },
        isLookAtToolHeadMode: false,
        lookAtToolHead: function () {
            // this method makes the trackball controls look at the tool head
            //console.log("lookAtToolHead. controls:", this.controls, "toolhead:", this.toolhead);
            if (this.isLookAtToolHeadMode) {
                this.controls.target.x = this.toolhead.position.x;
                this.controls.target.y = this.toolhead.position.y;
                //this.controls.target.z = this.toolhead.position.z - 20;
                this.controls.target.z = this.toolhead.position.z;
            }
        },
        toCameraCoords: function (position) {
            return this.camera.matrixWorldInverse.multiplyVector3(position.clone());
        },
        scaleInView: function () {
            // NOT WORKING YET
            var tmp_fov = 0.0;

            for (var i = 0; i < 8; i++) {
                proj2d = this.toCameraCoords(boundbox.geometry.vertices[i]);

                angle = 114.59 * Math.max( // 2 * (Pi / 180)
                Math.abs(Math.atan(proj2d.x / proj2d.z) / this.camera.aspect),
                Math.abs(Math.atan(proj2d.y / proj2d.z)));
                tmp_fov = Math.max(tmp_fov, angle);
            }

            this.camera.fov = tmp_fov + 5; // An extra 5 degrees keeps all lines visible
            this.camera.updateProjectionMatrix();
        },
        viewExtents: function () {
            console.log("viewExtents. object.userData:", this.object.userData);
            console.log("controls:", this.controls);
            this.wakeAnimate();
            
            // lets override the bounding box with a newly
            // generated one
            // get its bounding box
            var helper = new THREE.BoundingBoxHelper(this.object, 0xff0000);
            helper.update();
            //if (this.bboxHelper)
            //    this.scene.remove(this.bboxHelper);
            this.bboxHelper = helper;
            // If you want a visible bounding box
            //this.scene.add(this.bboxHelper);
            console.log("helper bbox:", helper);
            
            var minx = helper.box.min.x;
            var miny = helper.box.min.y;
            var maxx = helper.box.max.x;
            var maxy = helper.box.max.y;
            var minz = helper.box.min.z;
            var maxz = helper.box.max.z;
            
            var ud = this.object.userData;
            ud.bbox2 = helper.box;
            ud.center2.x = minx + ((maxx - minx) / 2);
            ud.center2.y = miny + ((maxy - miny) / 2);
            ud.center2.z = minz + ((maxz - minz) / 2);
            
            //this.controls.enabled = false;
            this.controls.reset();
            //this.controls.object.rotation._x = 0.5;
            //this.controls.object.rotation._y = 0.5;
            //this.controls.object.rotation._z = 0.5;
            //this.controls.object.rotation = THREE.Euler(0.5, 0.5, 0.5);
            //this.controls.object.setRotationFromEuler(THREE.Euler(0.5,0.5,0.5));

            // get max of any of the 3 axes to use as max extent
            //var lenx = Math.abs(ud.bbbox2.min.x) + ud.bbbox2.max.x;
            //var leny = Math.abs(ud.bbbox2.min.y) + ud.bbbox2.max.y;
            //var lenz = Math.abs(ud.bbbox2.min.z) + ud.bbbox2.max.z;
            var lenx = maxx - minx;
            var leny = maxy - miny;
            var lenz = maxz - minz;
            console.log("lenx:", lenx, "leny:", leny, "lenz:", lenz);
            
            var maxBeforeWarnX = 50;
            var maxBeforeWarnY = 50;
            var maxBeforeWarnZ = 50;
            
            if (lenx > maxBeforeWarnX || leny > maxBeforeWarnY || lenz > maxBeforeWarnZ) {
                //alert ("too big!");
                //chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "GCode Size Warning", "This GCode looks very large. Are you sure the units are correct?", 6 * 1000);
            }
            
            
            var maxlen = Math.max(lenx, leny, lenz);
            var dist = 2 * maxlen;
            // center camera on gcode objects center pos, but twice the maxlen
            this.controls.object.position.x = ud.center2.x;
            this.controls.object.position.y = ud.center2.y;
            this.controls.object.position.z = ud.center2.z + dist;
            this.controls.target.x = ud.center2.x;
            this.controls.target.y = ud.center2.y;
            this.controls.target.z = ud.center2.z;
            console.log("maxlen:", maxlen, "dist:", dist);
            var fov = 2.2 * Math.atan(maxlen / (2 * dist)) * (180 / Math.PI);
            console.log("new fov:", fov, " old fov:", this.controls.object.fov);
            if (isNaN(fov)) {
                console.log("giving up on viewing extents because fov could not be calculated");
                return;
            }
            this.controls.object.fov = fov;
            //this.controls.object.setRotationFromEuler(THREE.Euler(0.5,0.5,0.5));
            //this.controls.object.rotation.set(0.5,0.5,0.5,"XYZ");
            //this.controls.object.rotateX(2);
            //this.controls.object.rotateY(0.5);
            
            var L = dist;
            var camera = this.controls.object;
            var vector = controls.target.clone();
            var l = (new THREE.Vector3()).subVectors(camera.position, vector).length();
            var up = camera.up.clone();
            var quaternion = new THREE.Quaternion();
            
            // Zoom correction
            camera.translateZ(L - l);
            console.log("up:", up);
            up.y = 1; up.x = 0; up.z = 0;
            quaternion.setFromAxisAngle(up, 0.5);
            //camera.position.applyQuaternion(quaternion);
            up.y = 0; up.x = 1; up.z = 0;
            quaternion.setFromAxisAngle(up, 0.5);
            camera.position.applyQuaternion(quaternion);
            up.y = 0; up.x = 0; up.z = 1;
            quaternion.setFromAxisAngle(up, 0.5);
            //camera.position.applyQuaternion(quaternion);
            
            camera.lookAt(vector);
                        
            //this.camera.rotateX(90);
            
            this.controls.object.updateProjectionMatrix();
            //this.controls.enabled = true;
            //this.scaleInView();
            //this.controls.rotateCamera(0.5);
            //this.controls.noRoll = true;
            //this.controls.noRotate = true;
        },
        stopSampleRun: function (evt) {
            console.log("stopSampleRun. tween:", this.tween);
            this.tweenIsPlaying = false;
            //this.tween.stopChainedTweens();
            //console.log("_onCompleteCallback:", this.tween._onCompleteCallback);
            //this.tween._onCompleteCallback.apply(this.tween, null);
            if (this.tweenHighlight) this.scene.remove(this.tweenHighlight);
            if (this.tween) this.tween.stop();
            //TWEEN.stopChainedTweens();
            //TWEEN.removeAll();
            //TWEEN.stop();
            $('.com-chilipeppr-widget-3d-menu-samplerun').prop('disabled', false);
            $('.com-chilipeppr-widget-3d-menu-samplerunstop').prop('disabled', true);
            $('.com-chilipeppr-widget-3d-menu-samplerunstop').popover('hide');
            this.animAllowSleep();
        },
        pauseSampleRun: function () {
            console.log("pauseSampleRun");
            if (this.tweenPaused) {
                // the tween was paused, it's being non-paused
                console.log("unpausing tween");
                this.animNoSleep();
                this.tweenIsPlaying = true;
                this.tweenPaused = false;
                this.playNextTween();
            } else {
                console.log("pausing tween on next playNextTween()");
                this.tweenIsPlaying = false;
                this.tweenPaused = true;
                this.animAllowSleep();
            }
        },
        gotoXyz: function(data) {
            // we are sent this command by the CNC controller generic interface
            console.log("gotoXyz. data:", data);
            this.animNoSleep();
            this.tweenIsPlaying = false;
            this.tweenPaused = true;
            
            if ('x' in data && data.x != null) this.toolhead.position.x = data.x;
            if ('y' in data && data.y != null) this.toolhead.position.y = data.y;
            //if ('z' in data && data.z != null) this.toolhead.position.z = data.z + 20;
            if ('z' in data && data.z != null) this.toolhead.position.z = data.z;
            if (this.showShadow) {
                this.toolhead.children[0].target.position.set(this.toolhead.position.x, this.toolhead.position.y, this.toolhead.position.z);
                this.toolhead.children[1].target.position.set(this.toolhead.position.x, this.toolhead.position.y, this.toolhead.position.z);
            }
            this.lookAtToolHead();
            
            // see if jogging, if so rework the jog tool
            // double check that our jog 3d object is defined
            // cuz on early load we can get here prior to the
            // jog cylinder and other objects being defined
            if (this.isJogSelect && this.jogArrowCyl) {
                if ('z' in data && data.z != null) {
                    console.log("adjusting jog tool:", this.jogArrow);
                    var cyl = this.jogArrowCyl; //.children[0];
                    var line = this.jogArrowLine; //.children[2];
                    var shadow = this.jogArrowShadow; //.children[3];
                    var posZ = data.z * 3; // acct for scale
                    cyl.position.setZ(posZ + 20);
                    console.log("line:", line.geometry.vertices);
                    line.geometry.vertices[1].z = posZ; // 2nd top vertex
                    line.geometry.verticesNeedUpdate = true;
                    shadow.position.setX(posZ * -1); // make x be z offset
                }
            }
            
            this.animAllowSleep();
        },
        gotoLine: function(data) {
            // this method is sort of like playNextTween, but we are jumping to a specific
            // line based on the gcode sender
            console.log("got gotoLine. data:", data);
            //this.stopSampleRun();
            //this.tweenPaused = false;
            //this.pauseSampleRun();
            this.animNoSleep();
            this.tweenIsPlaying = false;
            this.tweenPaused = true;
            
            var lines = this.object.userData.lines;
            console.log("userData.lines:", lines[data.line]);
            var curLine = lines[data.line];
            var curPt = curLine.p2;
            //if (false && lines[data.line].p2) curPt = lines[data.line].p2;
            //else curPt = {x:0,y:0,z:0};
            console.log("p2 for toolhead move. curPt:", curPt);
            this.toolhead.position.x = curPt.x;
            this.toolhead.position.y = curPt.y;
            //this.toolhead.position.z = curPt.z + 20;
            this.toolhead.position.z = curPt.z;
            if (this.showShadow) {
                this.toolhead.children[0].target.position.set(this.toolhead.position.x, this.toolhead.position.y, this.toolhead.position.z);
                this.toolhead.children[1].target.position.set(this.toolhead.position.x, this.toolhead.position.y, this.toolhead.position.z);
            }
            this.lookAtToolHead();
            this.animAllowSleep();
            
            /* GOOD STUFF BUT IF DON'T WANT ANIM*/
            if (this.tweenHighlight) this.scene.remove(this.tweenHighlight);
            if (this.tween) this.tween.stop();
            if (data.anim && data.anim == "anim") {
                console.log("being asking to animate gotoline");
                this.animNoSleep();
                this.tweenPaused = false;
                this.tweenIsPlaying = true;
                this.tweenIndex = data.line;
                this.playNextTween(true);
            }
        },
        playNextTween: function (isGotoLine) {

            if (this.tweenPaused) return;
            
            //this.wakeAnimate();

            var that = this;
            var lines = this.object.userData.lines;
            if (this.tweenIndex + 1 > lines.length - 1) {
                // done tweening
                console.log("Done with tween");
                this.stopSampleRun();
                return;
            }

            var lineMat = new THREE.LineBasicMaterial({
                color: 0xff0000,
                lineWidth: 1,
                transparent: true,
                opacity: 1,
            });

            // find next correct tween, i.e. ignore fake commands
            var isLooking = true;
            var indxStart = this.tweenIndex + 1;
            //console.log("starting while loop");
            while(isLooking) {
                if (indxStart > lines.length - 1) {
                    console.log("we are out of lines to look at");
                    that.stopSampleRun();
                    return;
                }
                if (lines[indxStart].args.isFake) {
                    // this is fake, skip it
                    //console.log("found fake line at indx:", indxStart);
                } else {
                    // we found a good one. use it
                    //console.log("found one at indx:", indxStart);
                    isLooking = false;
                    break;
                }
                indxStart++;
            }
            var ll;
            if (lines[this.tweenIndex].p2) ll = lines[this.tweenIndex].p2;
            else ll = {x:0,y:0,z:0};
            console.log("start line:", lines[this.tweenIndex], "ll:", ll);
            
            this.tweenIndex = indxStart;
            var cl = lines[this.tweenIndex].p2;
            console.log("end line:", lines[this.tweenIndex], " el:", cl);
            
            var curTween = new TWEEN.Tween({
                x: ll.x,
                y: ll.y,
                z: ll.z
            })
                .to({
                x: cl.x,
                y: cl.y,
                z: cl.z
            }, 1000 / that.tweenSpeed)
            .onStart(function () {
                that.tween = curTween;
                //console.log("onStart");
                // create a new line to show path
                var lineGeo = new THREE.Geometry();
                lineGeo.vertices.push(new THREE.Vector3(ll.x, ll.y, ll.z), new THREE.Vector3(cl.x, cl.y, cl.z));
                var line = new THREE.Line(lineGeo, lineMat);
                line.type = THREE.Lines;
                that.tweenHighlight = line;
                that.scene.add(line);

            })
            .onComplete(function () {
                //console.log("onComplete");
                that.scene.remove(that.tweenHighlight);
                //setTimeout(function() {that.playNextTween();}, 0);
                if (isGotoLine) {
                    console.log("got onComplete for tween and since isGotoLine mode we are stopping");
                    that.stopSampleRun();
                } else {
                    that.playNextTween();
                }
            })
            .onUpdate(function () {
                that.toolhead.position.x = this.x;
                that.toolhead.position.y = this.y;
                that.toolhead.position.z = this.z;
                //that.zheighttest -= 0.1;
                //that.toolhead.position.z = this.z + that.zheighttest;
                //that.toolhead.position.z = this.z + 20;
                // update where shadow casting light is looking
                if (this.showShadow) {
                    that.toolhead.children[0].target.position.set(this.x, this.y, that.toolhead.position.z);
                    that.toolhead.children[1].target.position.set(this.x, this.y, that.toolhead.position.z);
                }
                //that.toolhead.children[0].target.matrixWorldNeedsUpdate = true;
                //console.log("onUpdate2. toolhead:", that.toolhead);
                that.lookAtToolHead();
            });
            //lastTween.chain(curTween);
            //lastTween = curTween;
            this.tween = curTween;
            //this.tweenIndex++;
            this.tween.start();
        },
        zheighttest: 0, // test toolhead going up in z
        playSampleRun: function (evt) {
            console.log("controls:", this.controls);
            //this.wakeAnimate();
            this.animNoSleep();
            $('.com-chilipeppr-widget-3d-menu-samplerun').prop('disabled', true);
            $('.com-chilipeppr-widget-3d-menu-samplerun').popover('hide');
            $('.com-chilipeppr-widget-3d-menu-samplerunstop').prop('disabled', false);
            $('.com-chilipeppr-widget-3d-menu-samplerunpause').prop('disabled', false);

            this.tweenPaused = false;
            this.tweenIsPlaying = true;
            this.tweenIndex = 0;

            var that = this;
            console.log("playSampleRun");
            //console.log("playSampleRun click:", evt, that);

            // cleanup previous run
            TWEEN.removeAll();

            // we will tween all gcode locs in order
            //var lines = this.object.userData.lines;
            //var pstart = this.object.userData.lines[0];
            var tween = new TWEEN.Tween({
                x: 0,
                y: 0,
                z: 0
            })
                .to({
                x: 0,
                y: 0,
                z: 0
            }, 20)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onComplete(function () {
                //console.log("onComplete");
                that.playNextTween();
            })
            .onUpdate(function () {
                that.toolhead.position.x = this.x;
                that.toolhead.position.y = this.y;
                //that.toolhead.position.z = this.z + 20;
                that.toolhead.position.z = this.z;
                // update where shadow casting light is looking
                if (this.showShadow) {
                    that.toolhead.children[0].target.position.set(this.x, this.y, that.toolhead.position.z);
                    that.toolhead.children[1].target.position.set(this.x, this.y, that.toolhead.position.z);
                }
                
                //that.toolhead.children[0].target.position.set(this.x, this.y, this.z);
                //that.toolhead.children[0].target.matrixWorldNeedsUpdate = true;
                //console.log("onUpdate. toolhead:", that.toolhead);
            });

            this.tween = tween;
            this.tweenIndex = 0;
            this.tween.start();

            /*
            //var mylines = this.object.userData.lines.slice
            lastTween = tween;
            var lineMat = new THREE.LineBasicMaterial({
                        color: 0xFF0000,
                        lineWidth: 1,
                        blending: THREE.AdditiveBlending,
                        transparent: true,
                        opacity: 1,
                    });
            $.each(this.object.userData.lines.slice(1), function(val, item) {
                //console.log(val,item); 
                var ll = lines[val].p2;
                var cl = item.p2;
                //console.log(ll, cl);
                //var lineHighlight;
                var curTween = new TWEEN.Tween( { x: ll.x, y: ll.y, z: ll.z} )
                .to( {x: cl.x, y: cl.y, z: cl.z}, 1000 / that.tweenSpeed)
                //.easing( TWEEN.Easing.Quadratic.InOut )
                .onStart( function() {
                    that.tween = curTween;
                    //console.log("onStart");
                    // create a new line to show path
                    var lineGeo = new THREE.Geometry();
                    lineGeo.vertices.push(new THREE.Vector3(ll.x, ll.y, ll.z), new THREE.Vector3(cl.x, cl.y, cl.z));
                    var line = new THREE.Line(lineGeo, lineMat);
                    line.type = THREE.Lines;
                    that.tweenHighlight = line;
                    that.scene.add(line);
                })
                .onComplete( function() {
                    //console.log("onComplete");
                    that.scene.remove(that.tweenHighlight);
                })
                .onUpdate( function () {
                    that.toolhead.position.x = this.x;
                    that.toolhead.position.y = this.y;
                    that.toolhead.position.z = this.z + 20;
                    that.lookAtToolHead();
                } );
                lastTween.chain(curTween);
                lastTween = curTween;
            });
            
            tween.start();
            */
        },
        makeText: function(vals) {
            var shapes, geom, mat, mesh;
            
            console.log("Do we have the global ThreeHelvetiker font:", ThreeHelvetiker);
            console.log("THREE.FontUtils:", THREE.FontUtils);
            
            if (!THREE.FontUtils) {
                console.error("THREE.FontUtils not defined per bug in r73 of three.js. So not making text.");
                return;
            }
            
            THREE.FontUtils.loadFace(ThreeHelvetiker);
            shapes = THREE.FontUtils.generateShapes( vals.text, {
                font: "helvetiker",
                //weight: "normal",
                size: vals.size ? vals.size : 10
            } );
            geom = new THREE.ShapeGeometry( shapes );
            mat = new THREE.MeshBasicMaterial({
                color: vals.color,
                transparent: true,
                opacity: vals.opacity ? vals.opacity : 0.5,
            });
            mesh = new THREE.Mesh( geom, mat );
            
            mesh.position.x = vals.x;
            mesh.position.y = vals.y;
            mesh.position.z = vals.z;
            
            return mesh;
            
        },
        decorate: null, // stores the decoration 3d objects
        decorateExtents: function() {
            // remove grid if drawn previously
            if (this.decorate != null) {
                console.log("there was a previous extent decoration. remove it. grid:", this.decorate);
                this.sceneRemove(this.decorate);
            } else {
                console.log("no previous decorate extents.");
            }
            
            // get its bounding box
            console.log("about to do THREE.BoundingBoxHelper on this.object:", this.object);
            var helper = new THREE.BoundingBoxHelper(this.object, 0xff0000);
            helper.update();
            this.bboxHelper = helper;
            // If you want a visible bounding box
            //this.scene.add(helper);
            console.log("helper bbox:", helper);
            
            var color = '#0d0d0d';
            //var color = '#ff0000';
            
            var material = new THREE.LineDashedMaterial({ 
                vertexColors: false, color: color,
                dashSize: this.getUnitVal(1), gapSize: this.getUnitVal(1), linewidth: 1,
                transparent: true,
                opacity: 0.3,
            });

            // Create X axis extents sprite
            var z = 0;
            var offsetFromY = this.getUnitVal(-4); // this means we'll be below the object by this padding
            var lenOfLine = this.getUnitVal(5);
            var minx = helper.box.min.x;
            var miny = helper.box.min.y;
            var maxx = helper.box.max.x;
            var maxy = helper.box.max.y;
            var minz = helper.box.min.z;
            var maxz = helper.box.max.z;
            
            var lineGeo = new THREE.Geometry();
            lineGeo.vertices.push(
                new THREE.Vector3(minx, miny+offsetFromY, z), 
                new THREE.Vector3(minx, miny+offsetFromY-lenOfLine, z),
                new THREE.Vector3(minx, miny+offsetFromY-lenOfLine, z),
                new THREE.Vector3(maxx, miny+offsetFromY-lenOfLine, z),
                new THREE.Vector3(maxx, miny+offsetFromY-lenOfLine, z),
                new THREE.Vector3(maxx, miny+offsetFromY, z)
                
            );
            lineGeo.computeLineDistances();
            var line = new THREE.Line(lineGeo, material, THREE.LinePieces);
            line.type = THREE.Lines;
            
            // Draw text label of length
            var txt = "X " + (maxx - minx).toFixed(2);
            txt += (this.isUnitsMm) ? " mm" : " in";
            var txtX = this.makeText({
                x: minx + this.getUnitVal(1),
                y: miny + offsetFromY - lenOfLine - this.getUnitVal(3),
                z: z,
                text: txt,
                color: color,
                opacity: 0.3,
                size: this.getUnitVal(2)
            });
            
            // Create Y axis extents sprite
            var offsetFromX = this.getUnitVal(-4); // this means we'll be below the object by this padding
            
            var lineGeo2 = new THREE.Geometry();
            lineGeo2.vertices.push(
                new THREE.Vector3(minx + offsetFromX, miny, z), 
                new THREE.Vector3(minx + offsetFromX - lenOfLine, miny, z),
                new THREE.Vector3(minx + offsetFromX - lenOfLine, miny, z),
                new THREE.Vector3(minx + offsetFromX - lenOfLine, maxy, z),
                new THREE.Vector3(minx + offsetFromX - lenOfLine, maxy, z),
                new THREE.Vector3(minx + offsetFromX, maxy, z)
            );
            lineGeo2.computeLineDistances();
            var line2 = new THREE.Line(lineGeo2, material, THREE.LinePieces);
            line2.type = THREE.Lines;
            
            // Draw text label of length
            var txt = "Y " + (maxy - miny).toFixed(2);
            txt += (this.isUnitsMm) ? " mm" : " in";
            var txtY = this.makeText({
                x: minx + offsetFromX - lenOfLine,
                y: miny - this.getUnitVal(3),
                z: z,
                text: txt,
                color: color,
                opacity: 0.3,
                size: this.getUnitVal(2)
            });

            var zlineGeo = new THREE.Geometry();
            var lenEndCap = this.getUnitVal(2);
            zlineGeo.vertices.push(
                new THREE.Vector3(maxx, miny, minz), 
                new THREE.Vector3(maxx + lenOfLine, miny, minz), 
                new THREE.Vector3(maxx + lenOfLine, miny, minz), 
                new THREE.Vector3(maxx + lenOfLine, miny, maxz),
                new THREE.Vector3(maxx + lenOfLine, miny, maxz),
                new THREE.Vector3(maxx, miny, maxz) 

                /*
                new THREE.Vector3(maxx + offsetFromX, miny+offsetFromY-lenOfLine, z),
                new THREE.Vector3(minx, miny+offsetFromY-lenOfLine, z),
                new THREE.Vector3(maxx, miny+offsetFromY-lenOfLine, z),
                new THREE.Vector3(maxx, miny+offsetFromY-lenOfLine, z),
                new THREE.Vector3(maxx, miny+offsetFromY, z)
                */
                
            );
            zlineGeo.computeLineDistances();
            var zline = new THREE.Line(zlineGeo, material, THREE.LinePieces);
            zline.type = THREE.Lines;
            
            // Draw text label of z height
            var txt = "Z " + (maxz - minz).toFixed(2);
            txt += (this.isUnitsMm) ? " mm" : " in";
            var txtZ = this.makeText({
                x: maxx + offsetFromX + lenOfLine,
                y: miny - this.getUnitVal(3),
                z: z,
                text: txt,
                color: color,
                opacity: 0.3,
                size: this.getUnitVal(2)
            });
            txtZ.rotateX(Math.PI / 2);
            var v = txtZ.position;
            txtZ.position.set(v.x + this.getUnitVal(5), v.y + this.getUnitVal(3), v.z);
            
            // draw lines on X axis to represent width
            // create group to put everything into
            this.decorate = new THREE.Object3D();
            this.decorate.add(line);
            this.decorate.add(txtX);
            this.decorate.add(line2);
            this.decorate.add(txtY);
            this.decorate.add(zline);
            this.decorate.add(txtZ);
            
            // Add estimated time and distance
            var ud = this.object.userData.lines;
            var udLastLine = ud[ud.length-1].p2;
            //console.log("lastLine:", udLastLine, "userData:", ud, "this.object:", this.object);
            // use last array value of userData cuz it keeps a running total of time
            // and distance
            
            // get pretty print of time
            var ret = this.convertMinsToPrettyDuration(udLastLine.timeMinsSum);
            
            
            var txt = "Estimated Time: " + ret + ","
            + " Total Distance: " + (udLastLine.distSum).toFixed(2);
            txt = (this.isUnitsMm) ? txt + " mm" : txt + " in";
            //console.log("txt:", txt);
            //console.log("blah", blah);
            var txtTimeDist = this.makeText({
                x: minx + this.getUnitVal(1),
                y: miny + offsetFromY - lenOfLine - this.getUnitVal(6),
                z: z,
                text: txt,
                color: color,
                opacity: 0.3,
                size: this.getUnitVal(2)
            });
            this.decorate.add(txtTimeDist);
            
            this.sceneAdd(this.decorate);
            console.log("just added decoration:", this.decorate);

        },
        convertMinsToPrettyDuration: function(mins) {
            // Minutes and seconds
            var time = mins * 60;
            //var mins = ~~(time / 60);
            //var secs = time % 60;
            
            // Hours, minutes and seconds
            var hrs = ~~(time / 3600);
            var mins = ~~((time % 3600) / 60);
            var secs = time % 60;
            
            // Output like "1:01" or "4:03:59" or "123:03:59"
            ret = "";
            
            if (hrs > 0)
                ret += "" + hrs + "h " + (mins < 10 ? "0" : "");
            
            ret += "" + mins + "m " + (secs < 10 ? "0" : "");
            ret += "" + secs.toFixed(0) + "s";
            return ret;
        },
        makeSprite: function (scene, rendererType, vals) {
            var canvas = document.createElement('canvas'),
                context = canvas.getContext('2d'),
                metrics = null,
                textHeight = 100,
                textWidth = 0,
                actualFontSize = this.getUnitVal(10);
            var txt = vals.text;
            if (vals.size) actualFontSize = vals.size;

            context.font = "normal " + textHeight + "px Arial";
            metrics = context.measureText(txt);
            var textWidth = metrics.width;

            canvas.width = textWidth;
            canvas.height = textHeight;
            context.font = "normal " + textHeight + "px Arial";
            context.textAlign = "center";
            context.textBaseline = "middle";
            //context.fillStyle = "#ff0000";
            context.fillStyle = vals.color;

            context.fillText(txt, textWidth / 2, textHeight / 2);

            var texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;

            var material = new THREE.SpriteMaterial({
                map: texture,
                useScreenCoordinates: false,
                transparent: true,
                opacity: 0.6
            });
            material.transparent = true;
            //var textObject = new THREE.Sprite(material);
            var textObject = new THREE.Object3D();
            textObject.position.x = vals.x;
            textObject.position.y = vals.y;
            textObject.position.z = vals.z;
            var sprite = new THREE.Sprite(material);
            textObject.textHeight = actualFontSize;
            textObject.textWidth = (textWidth / textHeight) * textObject.textHeight;
            if (rendererType == "2d") {
                sprite.scale.set(textObject.textWidth / textWidth, textObject.textHeight / textHeight, 1);
            } else {
                sprite.scale.set(textWidth / textHeight * actualFontSize, actualFontSize, 1);
            }

            textObject.add(sprite);

            //scene.add(textObject);
            return textObject;
        },
        element: null,
        isUnitsMm: true, // true for mm, false for inches
        getInchesFromMm: function(mm) {
            return mm * 0.0393701;
        },
        getUnitVal: function(val) {
            // if drawing untis is mm just return cuz default
            if (this.isUnitsMm) return val;
            // if drawing is in inches convert
            return this.getInchesFromMm(val);
        },
        drawAxesToolAndExtents: function() {
            
            //return;
            // these are drawn after the gcode is rendered now
            // so we can see if in inch or mm mode
            // these items scale based on that mode
            console.log("SETTING 1 " + this.isUnitsMm);
            this.drawToolhead();
            this.drawGrid();
            this.drawExtentsLabels();
            this.drawAxes();
        },
        shadowplane: null,
        drawToolhead: function() {
            
            console.group("drawToolhead");
            
            // remove grid if drawn previously
            if (this.toolhead != null) {
                console.log("there was a previous toolhead. remove it. toolhead:", this.toolhead, "shadowplane:", this.shadowplane);
                if (this.shadowplane != null) {
                    console.log("removing shadowplane and setting null");
                    this.sceneRemove(this.shadowplane);
                    this.shadowplane = null;
                }
                this.sceneRemove(this.toolhead);
            } else {
                console.log("no previous toolhead or shadowplane.");
            }
            
            // TOOLHEAD WITH SHADOW
            var toolheadgrp = new THREE.Object3D();
            
            // SHADOWS
            if (this.showShadow) {
                var light = new THREE.DirectionalLight(0xffffff);
                //var light = new THREE.SpotLight(0xffffff);
                light.position.set(0, 60, 60);
                //light.rotation.x = 90 * Math.PI / 180;
                //light.lookat(
                //light.target.position.set(0, 0, 0);
                light.castShadow = true;
                light.onlyShadow = true;
                light.shadowDarkness = 0.05;
                //light.shadowCameraVisible = true; // only for debugging
                // these six values define the boundaries of the yellow box seen above
                light.shadowCameraNear = 0;
                light.shadowCameraFar = this.getUnitVal(1000);
                light.shadowCameraLeft = this.getUnitVal(-5);
                light.shadowCameraRight = this.getUnitVal(5);
                light.shadowCameraTop = 0;
                light.shadowCameraBottom = this.getUnitVal(-35);
                //scene.add(light);
                toolheadgrp.add(light);
                
                var light2 = light.clone();
                light2.position.set(60, 0, 60);
                light2.shadowCameraLeft = 0; //-5;
                light2.shadowCameraRight = this.getUnitVal(-35); //5;
                light2.shadowCameraTop = this.getUnitVal(-5); //0;
                light2.shadowCameraBottom = this.getUnitVal(5); //-35;
                light2.shadowDarkness = 0.03;
                //light2.rotation.z = 90 * Math.PI / 180;
                toolheadgrp.add(light2);
            }
            
            // ToolHead Cylinder
            // API: THREE.CylinderGeometry(bottomRadius, topRadius, height, segmentsRadius, segmentsHeight)
            var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0, 5, 40, 15, 1, false), new THREE.MeshNormalMaterial());
            cylinder.overdraw = true;
            cylinder.rotation.x = -90 * Math.PI / 180;
            cylinder.position.z = 20;
            //cylinder.position.z = 40;
            cylinder.material.opacity = 0.3;
            cylinder.material.transparent = true;
            cylinder.castShadow = true;
            //cylinder.receiveShadow = true;
            console.log("toolhead cone:", cylinder);
            //scene.add(cylinder);
            
            //light.shadowCamera.lookAt(cylinder);
            toolheadgrp.add(cylinder);
            
            if (this.showShadow) {
                // mesh plane to receive shadows
                var planeFragmentShader = [
                    
                    "uniform vec3 diffuse;",
                    "uniform float opacity;",
                    
                    //THREE.ShaderChunk[ "color_pars_fragment" ],
                    //THREE.ShaderChunk[ "map_pars_fragment" ],
                    //THREE.ShaderChunk[ "lightmap_pars_fragment" ],
                    //THREE.ShaderChunk[ "envmap_pars_fragment" ],
                    //THREE.ShaderChunk[ "fog_pars_fragment" ],
                    THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
                    //THREE.ShaderChunk[ "specularmap_pars_fragment" ],
                    
                    "void main() {",
                    
                    "gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 );",
                    
                    //THREE.ShaderChunk[ "map_fragment" ],
                    //THREE.ShaderChunk[ "alphatest_fragment" ],
                    //THREE.ShaderChunk[ "specularmap_fragment" ],
                    //THREE.ShaderChunk[ "lightmap_fragment" ],
                    //THREE.ShaderChunk[ "color_fragment" ],
                    //THREE.ShaderChunk[ "envmap_fragment" ],
                    THREE.ShaderChunk[ "shadowmap_fragment" ],
                    //THREE.ShaderChunk[ "linear_to_gamma_fragment" ],
                    //THREE.ShaderChunk[ "fog_fragment" ],
                    
                    "gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 - shadowColor.x );",
                    
                    "}"
                    
                ].join("\n");
                
                var planeMaterial = new THREE.ShaderMaterial({
                    uniforms: THREE.ShaderLib['basic'].uniforms,
                    vertexShader: THREE.ShaderLib['basic'].vertexShader,
                    fragmentShader: planeFragmentShader,
                    color: 0x0000FF, transparent: true
                });
                
                var planeW = 50; // pixels
                var planeH = 50; // pixels 
                var numW = 50; // how many wide (50*50 = 2500 pixels wide)
                var numH = 50; // how many tall (50*50 = 2500 pixels tall)
                var plane = new THREE.Mesh( new THREE.PlaneGeometry( planeW*50, planeH*50, planeW, planeH ), new   THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: false, transparent: true, opacity: 0.5 } ) );
                var plane = new THREE.Mesh( new THREE.PlaneGeometry( planeW*50, planeH*50, planeW, planeH ), planeMaterial );
                //plane.castShadow = false;
                plane.position.z = 0;
                plane.receiveShadow = true;
                
                console.log("toolhead plane:", plane);
                //scene.add(plane);
                //toolheadgrp.add(plane);
            }
            
            // scale the whole thing to correctly match mm vs inches
            var scale = this.getUnitVal(1);
            if (this.showShadow) plane.scale.set(scale, scale, scale);
            toolheadgrp.scale.set(scale, scale, scale);
            
            this.toolhead = toolheadgrp;
            if (this.showShadow) {
                this.shadowplane = plane;
                this.sceneAdd(this.shadowplane);
            }
            this.sceneAdd(this.toolhead);
            
            console.groupEnd();
            
        },
        grid: null, // stores grid
        gridTurnOff: function() {
            if (this.grid != null) {
                console.log("there was a previous grid. remove it. grid:", this.grid);
                this.sceneRemove(this.grid);
            } else {
                console.log("no previous grid.");
            }
        },
        gridTurnOn: function() {
            if (this.grid != null) {
                console.log("there was a previous grid. so ignoring request to turn on. grid:", this.grid);
            } else {
                console.log("no previous grid. so drawing.");
                this.drawGrid();
            }
        },
        drawGrid: function() {
            
            // remove grid if drawn previously
            if (this.grid != null) {
                console.log("there was a previous grid. remove it. grid:", this.grid);
                this.sceneRemove(this.grid);
            } else {
                console.log("no previous grid.");
            }

            // will get mm or inches for grid
            var widthHeightOfGrid; //= this.getUnitVal(200);
            var subSectionsOfGrid; //= this.getUnitVal(10);
            if (this.isUnitsMm) {
                widthHeightOfGrid = 200; // 200 mm grid should be reasonable
                subSectionsOfGrid = 10; // 10mm (1 cm) is good for mm work
            } else {
                widthHeightOfGrid = 20; // 20 inches is good
                subSectionsOfGrid = 1; // 1 inch grid is nice
            }
            
            // see if user wants to size up grid. default is size 1
            // so this won't modify size based on default
            widthHeightOfGrid = widthHeightOfGrid * this.gridSize;
            
            // draw grid
            var helper = new THREE.GridHelper(widthHeightOfGrid, subSectionsOfGrid, 0x0000ff, 0x808080);
            // helper.setColors(0x0000ff, 0x808080);
            helper.position.y = 0;
            helper.position.x = 0;
            helper.position.z = 0;
            helper.rotation.x = 90 * Math.PI / 180;
            helper.material.opacity = 0.15;
            helper.material.transparent = true;
            helper.receiveShadow = false;
            console.log("helper grid:", helper);
            this.grid = helper;
            this.sceneAdd(this.grid);
            //this.scene.add(helper);

        },
        drawExtentsLabels: function() {
            this.decorateExtents();
        },
        axes: null, // global property to store axes that we drew
        drawAxes: function() {
            
            // remove axes if they were drawn previously
            if (this.axes != null) {
                console.log("there was a previous axes. remove it. axes:", this.axes);
                this.sceneRemove(this.axes);
            } else {
                console.log("no previous axes to remove. cool.");
            }
            
            // axes
            var axesgrp = new THREE.Object3D();
            
            axes = new THREE.AxisHelper(this.getUnitVal(100));
            axes.material.transparent = true;
            axes.material.opacity = 0.8;
            axes.material.depthWrite = false;
            axes.position.set(0,0,-0.0001);
            //this.scene.add(axes);
            axesgrp.add(axes);

            // add axes labels
            var xlbl = this.makeSprite(this.scene, "webgl", {
                x: this.getUnitVal(110),
                y: 0,
                z: 0,
                text: "X",
                color: "#ff0000"
            });
            var ylbl = this.makeSprite(this.scene, "webgl", {
                x: 0,
                y: this.getUnitVal(110),
                z: 0,
                text: "Y",
                color: "#00ff00"
            });
            var zlbl = this.makeSprite(this.scene, "webgl", {
                x: 0,
                y: 0,
                z: this.getUnitVal(110),
                text: "Z",
                color: "#0000ff"
            });
            
            axesgrp.add(xlbl);
            axesgrp.add(ylbl);
            axesgrp.add(zlbl);
            this.axes = axesgrp;
            this.sceneAdd(this.axes);

        },
        colorBackground: 0xeeeeee, // this is the background color of the 3d viewer
        createScene: function (element) {

            console.log("inside createScene: element:", element);
            if (!Detector.webgl) Detector.addGetWebGLMessage();

            // store element on this object
            this.element = element;
            
            // Scene
            var scene = new THREE.Scene();
            this.scene = scene;

            // Lights...
            var ctr = 0;
            [
                [0, 0, 1, 0xFFFFCC],
                [0, 1, 0, 0xFFCCFF],
                [1, 0, 0, 0xCCFFFF],
                [0, 0, -1, 0xCCCCFF],
                [0, -1, 0, 0xCCFFCC],
                [-1, 0, 0, 0xFFCCCC]
            ].forEach(function (position) {
                var light = new THREE.DirectionalLight(position[3]);
                light.position.set(position[0], position[1], position[2]).normalize();
                /*if (ctr == 0) {
                    light.castShadow = true;
                    light.shadowDarkness = 0.95;
                    light.shadowCameraRight     =  5;
                    light.shadowCameraLeft     = -5;
                    light.shadowCameraTop      =  5;
                    light.shadowCameraBottom   = -5;
                    light.shadowCameraVisible = true;
                }*/
                scene.add(light);
                ctr++;
            });

            // Camera...
            // If you make the near and far too much you get
            // a fail on the intersectObjects()
            var fov = 70,
                aspect = element.width() / element.height(),
                near = 0.01, //01, // 1e-6, //
                far = 10000,
                camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
            this.camera = camera;
            camera.rotationAutoUpdate = true;
            camera.position.x = 10;
            camera.position.y = -100;
            camera.position.z = 200;
            scene.add(camera);

            // Controls
            //var mouseEvtContainer = $('#com-chilipeppr-widget-3dviewer-renderArea');
            //console.log(mouseEvtContainer);
            //controls = new THREE.TrackballControls(camera, mouseEvtContainer[0]);
            controls = new THREE.TrackballControls(camera, element[0]);
            this.controls = controls; // set property for later use
            //controls = new THREE.OrbitControls(camera);
            controls.noPan = false;
            controls.dynamicDampingFactor = 0.99; //0.15;
            controls.rotateSpeed = 2.0;
            //controls.staticMoving = true;
            //controls.target.x = 50;
            //controls.target.y = 100;
            //controls.autoRotate = true;
            console.log("controls:", controls);
            //controls.target.z = 100;
            //controls.addEventListener( 'change', render );
            document.addEventListener( 'mousemove', controls.update.bind( controls ), false );
            document.addEventListener( 'touchmove', controls.update.bind( controls ), false );

            // Renderer
            var renderer;
            /*
            var renderer = new THREE.WebGLRenderer({
                clearColor: 0x000000,
                clearAlpha: 1
            });
            */
            // var renderer = new THREE.WebGLRenderer({
            //     antialias: true,
            //     preserveDrawingBuffer: false,
            //     alpha: false,
            //     logarithmicDepthBuffer: false
            // });
            
            var webgl = ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )();

            if (webgl) {
                console.log('WebGL Support found!  Success: CP will work optimally on this device!');
    
                renderer = new THREE.WebGLRenderer({
                    antialias: true,
                    preserveDrawingBuffer: false,
                    alpha: false,
                    logarithmicDepthBuffer: false
                });
            } else {
                console.error('No WebGL Support found! CRITICAL ERROR!');
                chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "No WebGL Found!", "This device/browser does not support WebGL or WebGL has crashed. Chilipeppr needs WebGL to render the 3D View.", 10 * 1000);
                $('#' + this.id + ' .youhavenowebgl').removeClass("hidden");
                return;
            };

            
            this.renderer = renderer;
            //renderer.setClearColor( scene.fog.color, 1 );
            //renderer.setClearColor(0xeeeeee, 1);
            renderer.setClearColor(this.colorBackground, 1);
            renderer.setSize(element.width(), element.height());
            renderer.setPixelRatio( window.devicePixelRatio );
            element.append(renderer.domElement);
            //renderer.autoClear = true;
            //renderer.clear();
            
            // cast shadows
            renderer.shadowMapEnabled = true;
            // to antialias the shadow
            renderer.shadowMapSoft = true;
            /*
            renderer.shadowCameraNear = 3;
            renderer.shadowCameraFar = camera.far;
            renderer.shadowCameraFov = 50;
            */
            /*
            renderer.shadowMapBias = 0.0039;
            renderer.shadowMapDarkness = 1.0;
            renderer.shadowMapWidth = 1024;
            renderer.shadowMapHeight = 1024;
            */

            // Arrow Helper
            /*
            var dir = new THREE.Vector3( 1, 0, 0 );
            var origin = new THREE.Vector3( 0, 0, 0 );
            var length = 100;
            var hex = 0xffff00;
            
            var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
            scene.add( arrowHelper );
            */

            //scene.add( new THREE.PointLightHelper( light, 5 ) );
            // Show grid

            /* MOVED TO METHOD
            var helper = new THREE.GridHelper(200, 10);
            helper.setColors(0x0000ff, 0x808080);
            helper.position.y = 0;
            helper.position.x = 0;
            helper.position.z = 0;
            helper.rotation.x = 90 * Math.PI / 180;
            helper.material.opacity = 0.2;
            helper.material.transparent = true;
            helper.receiveShadow = true;
            console.log("helper:", helper);
            scene.add(helper);
            */
            //this.drawGrid();
            
            /* MOVED TO METHOD
            // TOOLHEAD WITH SHADOW
            var toolheadgrp = new THREE.Object3D();
            
            // SHADOWS
            var light = new THREE.DirectionalLight(0xffffff);
            //var light = new THREE.SpotLight(0xffffff);
            light.position.set(0, 60, 60);
            //light.rotation.x = 90 * Math.PI / 180;
            //light.lookat(
            //light.target.position.set(0, 0, 0);
            light.castShadow = true;
            light.onlyShadow = true;
            light.shadowDarkness = 0.05;
            //light.shadowCameraVisible = true; // only for debugging
            // these six values define the boundaries of the yellow box seen above
            light.shadowCameraNear = 0;
            light.shadowCameraFar = 1000;
            light.shadowCameraLeft = -5;
            light.shadowCameraRight = 5;
            light.shadowCameraTop = 0;
            light.shadowCameraBottom = -35;
            //scene.add(light);
            toolheadgrp.add(light);
            
            var light2 = light.clone();
            light2.position.set(60, 0, 60);
            light2.shadowCameraLeft = 0; //-5;
            light2.shadowCameraRight = -35; //5;
            light2.shadowCameraTop = -5; //0;
            light2.shadowCameraBottom = 5; //-35;
            light2.shadowDarkness = 0.03;
            //light2.rotation.z = 90 * Math.PI / 180;
            toolheadgrp.add(light2);

            // ToolHead Cylinder
            // API: THREE.CylinderGeometry(bottomRadius, topRadius, height, segmentsRadius, segmentsHeight)
            var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0, 5, 40, 15, 1, false), new THREE.MeshNormalMaterial());
            cylinder.overdraw = true;
            cylinder.rotation.x = -90 * Math.PI / 180;
            cylinder.position.z = 20;
            //cylinder.position.z = 40;
            cylinder.material.opacity = 0.5;
            cylinder.material.transparent = true;
            cylinder.castShadow = true;
            //cylinder.receiveShadow = true;
            console.log("toolhead cone:", cylinder);
            //scene.add(cylinder);
            
            //light.shadowCamera.lookAt(cylinder);

            toolheadgrp.add(cylinder);
            
            this.toolhead = toolheadgrp;
            scene.add(toolheadgrp);
            */
            //this.drawToolhead();
            

            /*
            // sparks
            var particleGroup = new SPE.Group({
                texture: '', 
                maxAge: 1,
                colorize: 1,
                transparent: 1,
                alphaTest: 0.5,
                depthWrite: false,
                depthTest: true,
                blending: THREE.NormalBlending
            });

            var emitter = new SPE.Emitter({
                position: new THREE.Vector3(0, 0, 0),
                positionSpread: new THREE.Vector3( 0, 0, 1 ),

                acceleration: new THREE.Vector3(0, -1, 0),
                accelerationSpread: new THREE.Vector3( 1, 0, 1 ),

                velocity: new THREE.Vector3(0, 0, 1),
                velocitySpread: new THREE.Vector3(1, 1, 1),

                colorStart: new THREE.Color('red'),
                colorEnd: new THREE.Color('blue'),
                opacityStart: 0,
                opacityStartSpread: 0,
                opacityMiddle: 0.5,
                opacityMiddleSpread: 0,
                opacityEnd: 1,
                opacityEndSpread: 1,
                
                sizeStart: 0.01,
                sizeEnd: 0.5,

                particleCount: 5
            });

            particleGroup.addEmitter( emitter );
            var clock = new THREE.Clock();
            scene.add( particleGroup.mesh );
            */

            /* MOVED TO METHOD
            // axes
            axes = new THREE.AxisHelper(100);
            scene.add(axes);

            // add axes labels
            this.makeSprite(scene, "webgl", {
                x: 110,
                y: 0,
                z: 0,
                text: "X",
                color: "#ff0000"
            });
            this.makeSprite(scene, "webgl", {
                x: 0,
                y: 110,
                z: 0,
                text: "Y",
                color: "#00ff00"
            });
            this.makeSprite(scene, "webgl", {
                x: 0,
                y: 0,
                z: 110,
                text: "Z",
                color: "#0000ff"
            });
            */
            //this.drawAxes();

            // Action!
            //controls.addEventListener( 'change', test );
            //element.on('change', test);
            var mouseEvtContainer = $('#com-chilipeppr-widget-3dviewer-renderArea');
            console.log(mouseEvtContainer);
            //mouseEvtContainer.on('mousemove mousedown mousewheel hover click dblclick scroll touchstart touchmove touchenter focus resize', this.wakeAnimate.bind(this));
            //controls.addEventListener( 'change', this.wakeAnimate.bind(this));
            controls.addEventListener( 'start', this.animNoSleep.bind(this));
            controls.addEventListener( 'end', this.animAllowSleep.bind(this));
            //mouseEvtContainer.on('', wakeAnimate);
            /*
            function test(evt) {
                console.log("got event listener", evt);
            }
            function slowDown() {
                requestAnimationFrame(animate); // And repeat...
            }
            */
            console.log("this wantAnimate:", this);
            this.wantAnimate = true;
            //this.camera = camera; 
            //var that = this;
            /*
            function animate() {
                TWEEN.update();
                //setTimeout(slowDown, 100);
                if (that.wantAnimate) requestAnimationFrame(animate); // And repeat...
                controls.update();
                // Use a fixed time-step here to avoid gaps
                //render( clock.getDelta() );
                //render();
                renderer.render(scene, camera);
            }
            */
            
            //setTimeout(this.sleepAnimate, 5000);

            /*
            function render2(dt) {
                //controls.update();
                //particleGroup.tick( dt );
                renderer.render(scene, camera);
                //console.log(camera);
                //TWEEN.update();
                requestAnimationFrame(render); // And repeat...
                //stats.update();
            }
            */
            //render( clock.getDelta() );
            //setTimeout(animate, 0);
            //render();
            //animate();
            //this.animate();
            this.wakeAnimate();

            // Fix coordinates up if window is resized.
            var that = this;
            $(window).on('resize', function () {
                //console.log("got resize event. resetting aspect ratio.");
                renderer.setSize(element.width(), element.height());
                camera.aspect = element.width() / element.height();
                camera.updateProjectionMatrix();
                controls.screen.width = window.innerWidth;
                controls.screen.height = window.innerHeight;
                that.wakeAnimate();
                //render();
            });

            return scene;
        },
        resize: function() {
            //console.log("got resize event. resetting aspect ratio.");
            this.renderer.setSize(this.element.width(), this.element.height());
            this.camera.aspect = this.element.width() / this.element.height();
            this.camera.updateProjectionMatrix();
            this.controls.screen.width = window.innerWidth;
            this.controls.screen.height = window.innerHeight;
            this.wakeAnimate();
        },
        mytimeout: null,
        renderFrameCtr: 0, // keep track of fps
        fpsCounterInterval: null,
        fpsEl: null,
        fpsCounterStart: function() {
            
            if (this.fpsEl == null) {
                // pull dom el and cache so the dom updates are efficient
                this.fpsEl = $('#com-chilipeppr-widget-3dviewer .frames-per-sec');
            }

            // if 3d viewer disabled, exit
            if (this.animEnable == false) {
                this.fpsEl.html('<span class="alert-danger" style="font-size:12px;">Manually Disabled. Go to cog wheel icon to choose a frame rate to re-enable.</span>');
                return;
            }
            
            // update fps each second
            if (this.fpsCounterInterval == null) {
                // start fps counting
                this.renderFrameCtr = 0;
                console.log("starting fps counting");
                this.fpsCounterInterval = setInterval(this.fpsCounterOnInterval.bind(this), 1000);
            }
        },
        fpsCounterOnInterval: function() {
            this.fpsEl.html(this.renderFrameCtr + "&nbsp;fps");
            this.renderFrameCtr = 0;
        },
        fpsCounterEnd: function() {
            console.log("stopping fps counting");
            clearInterval(this.fpsCounterInterval);
            this.fpsCounterInterval = null;
            console.log("checking if anim is disabled. this.animEnable:", this.animEnable);
            if (this.animEnable == false) {
                this.fpsEl.html('<div class="alert-danger" style="font-size:12px;line-height: 12px;padding: 6px;">Manually Disabled. Go to cog wheel icon to choose a frame rate to re-enable.</div>');
            } else {
                // set fps to just a dash
                this.fpsEl.html("-&nbsp;fps");
            }
        },
        setFrameRate: function(rate) {
            
            localStorage.setItem ('fpsRate', rate);
            console.log ("Set fpsRate in storage:  ", rate);
            
            // see if disabled
            if (rate == 0) {
                this.animateDisabled();
            } else {
                this.animateEnabled();
            }
            
            // rate is frames per second
            if (rate == 5) this.frameRateDelayMs = 200;
            if (rate == 10) this.frameRateDelayMs = 100;
            if (rate == 15) this.frameRateDelayMs = 70;
            if (rate == 30) this.frameRateDelayMs = 32;
            if (rate == 60) this.frameRateDelayMs = 0;
        },
        animEnable: true, // boolean tracking whether we allow animation
        animateDisabled: function() {
            console.log("disabling animation");
            this.animEnable = false;
            this.fpsEl.html('<span class="alert-danger">Disabled</span>');
        },
        animateEnabled: function() {
            console.log("enabling animation");
            this.animEnable = true;
        },
        // reduce rate by 2, 3, 4, etc. 60fps becomes 30fps
        //frameRateSkipEvery: [false, true, true, true, true], 
        //frameRateSkipEvery: [false], 
        //frameRateCtr: 0, // counts to skip animate
        
        // 200 = 5fps, 100 = 10fps, 70=15fps, 50=20fps, 40=25fps, 30=30fps
        frameRateDelayMs: 32, 
        animate: function() {
            
            // if 3d viewer disabled, exit
            if (this.animEnable == false) {
                console.log("animate(). this.animEnable false, so exiting.");
                return;
            }
            
            // see if we should exit to reduce frame count
            /*
            if (this.frameRateSkipEvery[this.frameRateCtr]) {
                if (this.frameRateCtr == this.frameRateSkipEvery.length - 1)
                    this.frameRateCtr = 0;
                else
                    this.frameRateCtr++;
                requestAnimationFrame(this.animate.bind(this));
                return;
            }
            this.frameRateCtr++;
            if (this.frameRateCtr > 200) this.frameRateCtr = 0; // prevent overruns
            */
            
            TWEEN.update();
            if (this.wantAnimate) {
                
                // see if we're adding delay to slow frame rate
                if (this.frameRateDelayMs > 0) {
                    var that = this;
                    setTimeout(function() {
                        requestAnimationFrame(that.animate.bind(that));
                    }, this.frameRateDelayMs);
                } else {
                    requestAnimationFrame(this.animate.bind(this));
                }
            }
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
            this.renderFrameCtr++;
        },
        wakeAnimate: function(evt) {
            
            // if 3d viewer disabled, exit
            if (this.animEnable == false) {
                return;
            }
            
            //console.log("wakeAnimate:", evt);
            this.wantAnimate = true;
            this.fpsCounterStart();
            //controls.update();
            //clearTimeout(this.mytimeout);
            if (!this.mytimeout) {
                this.mytimeout = setTimeout(this.sleepAnimate.bind(this), 10000);
                //console.log("wakeAnimate");
                requestAnimationFrame(this.animate.bind(this));
            }
        },
        sleepAnimate: function() {
            this.mytimeout = null;
            if (this.isNoSleepMode) {
                // skip sleeping the anim
                console.log("Being asked to sleep anim, but in NoSleepMode");
            } else {
                this.wantAnimate = false;
                this.fpsCounterEnd();
                console.log("slept animate");
            }
        },
        cancelSleep: function() {
            clearTimeout(this.mytimeout);
        },
        isNoSleepMode: false,
        animNoSleep: function() {
            //console.log("anim no sleep");
            this.isNoSleepMode = true;
            //this.cancelSleep();
            this.wakeAnimate();
        },
        animAllowSleep: function() {
            //console.log("anim allow sleep");
            
            // even if we're being asked to allow sleep
            // but the tween is playing, don't allow it
            if (this.tweenIsPlaying) return;
            
            // if we get here, then allow sleep
            this.isNoSleepMode = false;
            if (!this.mytimeout) this.mytimeout = setTimeout(this.sleepAnimate.bind(this), 5000);
        },
        /**
         * Parses a string of gcode instructions, and invokes handlers for
         * each type of command.
         *
         * Special handler:
         *   'default': Called if no other handler matches.
         */
        GCodeParser: function (handlers, modecmdhandlers) {
            this.handlers = handlers || {};
            this.modecmdhandlers = modecmdhandlers || {};
            
            this.lastArgs = {cmd: null};
            this.lastFeedrate = null;
            console.log("SETTING initting");
            this.isUnitsMm = true;
            
            this.parseLine = function (text, info) {
                //text = text.replace(/;.*$/, '').trim(); // Remove comments
                //text = text.replace(/\(.*$/, '').trim(); // Remove comments
                //text = text.replace(/<!--.*?-->/, '').trim(); // Remove comments
                
                var origtext = text;
                // remove line numbers if exist
                if (text.match(/^N/i)) {
                    // yes, there's a line num
                    text = text.replace(/^N\d+\s*/ig, "");
                }
                
                // collapse leading zero g cmds to no leading zero
                text = text.replace(/G00/i, 'G0');
                text = text.replace(/G0(\d)/i, 'G$1');
                // add spaces before g cmds and xyzabcijkf params
                text = text.replace(/([gmtxyzabcijkfst])/ig, " $1");
                // remove spaces after xyzabcijkf params because a number should be directly after them
                text = text.replace(/([xyzabcijkfst])\s+/ig, "$1");
                // remove front and trailing space
                text = text.trim();
                
                // see if comment
                var isComment = false;
                if (text.match(/^(;|\(|<)/)) {
                    text = origtext;
                    isComment = true;
                } else {
                    // make sure to remove inline comments
                    text = text.replace(/\(.*?\)/g, "");
                }
                //console.log("gcode txt:", text);
                
                if (text && !isComment) {
                    //console.log("there is txt and it's not a comment");
                    //console.log("");
                    // preprocess XYZIJ params to make sure there's a space
                    //text = text.replace(/(X|Y|Z|I|J|K)/ig, "$1 ");
                    //console.log("gcode txt:", text);
                    
                    // strip off end of line comment
                    text = text.replace(/(;|\().*$/, ""); // ; or () trailing
                    //text = text.replace(/\(.*$/, ""); // () trailing
                    
                    var tokens = [];

                    // Execute any non-motion commands on the line immediately
                    // Add other commands to the tokens list for later handling
                    // Segments are not created for non-motion commands;
                    // the segment for this line is created later
                    text.split(/\s+/).forEach(function (token) {
                        var modehandler = modecmdhandlers[token.toUpperCase()];
                        if (modehandler) {
                            // console.log("Pre-running non-motion command:", token)
                            modehandler();
                        } else {
                            tokens.push(token);
                        }
                    });

                    //console.log("tokens:", tokens);
                    if (tokens.length) {
                        var cmd = tokens[0];
                        cmd = cmd.toUpperCase();
                        // check if a g or m cmd was included in gcode line
                        // you are allowed to just specify coords on a line
                        // and it should be assumed that the last specified gcode
                        // cmd is what's assumed
                        isComment = false;
                        if (!cmd.match(/^(G|M|T)/i)) {
                            // if comment, drop it
                            /*
                            if (cmd.match(/(;|\(|<)/)) {
                                // is comment. do nothing.
                                isComment = true;
                                text = origtext;
                                //console.log("got comment:", cmd);
                            } else {
                            */

                                //console.log("no cmd so using last one. lastArgs:", this.lastArgs);
                                // we need to use the last gcode cmd
                                cmd = this.lastArgs.cmd;
                                //console.log("using last cmd:", cmd);
                                tokens.unshift(cmd); // put at spot 0 in array
                                //console.log("tokens:", tokens);
                            //}
                        } else {
                            
                            // we have a normal cmd as opposed to just an xyz pos where
                            // it assumes you should use the last cmd
                            // however, need to remove inline comments (TODO. it seems parser works fine for now)
                            
                        }
                        var args = {
                            'cmd': cmd,
                            'text': text,
                            'origtext': origtext,
                            'indx': info,
                            'isComment': isComment,
                            'feedrate': null,
                            'plane': undefined
                        };
                        
                        //console.log("args:", args);
                        if (tokens.length > 1  && !isComment) {
                            tokens.splice(1).forEach(function (token) {
                                //console.log("token:", token);
                                if (token && token.length > 0) {
                                    var key = token[0].toLowerCase();
                                    var value = parseFloat(token.substring(1));
                                    //console.log("value:", value, "key:", key);
                                    //if (isNaN(value))
                                    //    console.error("got NaN. val:", value, "key:", key, "tokens:", tokens);
                                    args[key] = value;
                                } else {
                                    //console.log("couldn't parse token in foreach. weird:", token);
                                }
                            });
                        }
                        var handler = this.handlers[cmd] || this.handlers['default'];

                        // don't save if saw a comment
                        if (!args.isComment) {
                            this.lastArgs = args;
                            //console.log("just saved lastArgs for next use:", this.lastArgs);
                        } else {
                            //console.log("this was a comment, so didn't save lastArgs");
                        }
                        //console.log("calling handler: cmd:", cmd, "args:", args, "info:", info);
                        if (handler) {
                            // scan for feedrate
                            if (args.text.match(/F([\d.]+)/i)) {
                                // we have a new feedrate
                                var feedrate = parseFloat(RegExp.$1);
                                console.log("got feedrate on this line. feedrate:", feedrate, "args:", args);
                                args.feedrate = feedrate;
                                this.lastFeedrate = feedrate;
                            } else {
                                // use feedrate from prior lines
                                args.feedrate = this.lastFeedrate;
                                //if (args.feedrate 
                            }
                            
                            //console.log("about to call handler. args:", args, "info:", info, "this:", this);
                            
                            return handler(args, info, this);
                        } else {
                            console.error("No handler for gcode command!!!");
                        }
                    }
                }
                // If handler() was called above, it created a segment and then
                // this function returned, so this point will be reached only if a
                // segment has not yet been created. This happens if the line was
                // a comment or if the line was empty after the non-motion commands
                
                // we still need to create a segment with xyz in p2
                // so that when we're being asked to /gotoline we have a position
                // for each gcode line, even comments. we just use the last real position
                // to give each gcode line (even a blank line) a spot to go to
                var args = {
                    'cmd': 'empty or comment',
                    'text': text,
                    'origtext': origtext,
                    'indx': info,
                    'isComment': isComment
                };
                var handler = this.handlers['default'];
                return handler(args, info, this);
            }

            this.parse = function (gcode) {
                var lines = gcode.split(/\r{0,1}\n/);
                for (var i = 0; i < lines.length; i++) {
                    if (this.parseLine(lines[i], i) === false) {
                        break;
                    }
                }
            }
        },
        colorG0: 0x00ff00,
        colorG1: 0x0000ff,
        colorG2: 0x999900,
        createObjectFromGCode: function (gcode, indxMax) {
            //debugger;
            // Credit goes to https://github.com/joewalnes/gcode-viewer
            // for the initial inspiration and example code.
            // 
            // GCode descriptions come from:
            //    http://reprap.org/wiki/G-code
            //    http://en.wikipedia.org/wiki/G-code
            //    SprintRun source code

            // these are extra Object3D elements added during
            // the gcode rendering to attach to scene
            this.extraObjects = [];
            this.extraObjects["G17"] = [];
            this.extraObjects["G18"] = [];
            this.extraObjects["G19"] = [];
            this.offsetG92 = {x:0, y:0, z:0, e:0};

            var lastLine = {
                x: 0,
                y: 0,
                z: 0,
                e: 0,
                f: 0,
                feedrate: null,
                extruding: false
            };

            // we have been using an approach where we just append
            // each gcode move to one monolithic geometry. we
            // are moving away from that idea and instead making each
            // gcode move be it's own full-fledged line object with
            // its own userData info
            // G2/G3 moves are their own child of lots of lines so
            // that even the simulator can follow along better
            var new3dObj = new THREE.Group();
            var plane = "G17"; //set default plane to G17 - Assume G17 if no plane specified in gcode.
            var layers = [];
            var layer = undefined;
            var lines = [];
            var totalDist = 0;
            var bbbox = {
                min: {
                    x: 100000,
                    y: 100000,
                    z: 100000
                },
                max: {
                    x: -100000,
                    y: -100000,
                    z: -100000
                }
            };
            var bbbox2 = {
                min: {
                    x: 100000,
                    y: 100000,
                    z: 100000
                },
                max: {
                    x: -100000,
                    y: -100000,
                    z: -100000
                }
            };

            this.newLayer = function (line) {
                //console.log("layers:", layers, "layers.length", layers.length);
                layer = {
                    type: {},
                    layer: layers.length,
                    z: line.z,
                };
                layers.push(layer);
            };

            this.getLineGroup = function (line, args) {
                //console.log("getLineGroup:", line);
                if (layer == undefined) this.newLayer(line);
                var speed = Math.round(line.e / 1000);
                var grouptype = (line.extruding ? 10000 : 0) + speed;
                //var color = new THREE.Color(line.extruding ? 0xff00ff : 0x0000ff);
                var color = new THREE.Color(line.extruding ? 0xff00ff : this.colorG1);
                if (line.g0) {
                    grouptype =  "g0";
                    //color = new THREE.Color(0x00ff00);
                    color = new THREE.Color(this.colorG0);
                } else if (line.g2) {
                    grouptype = "g2";
                    //color = new THREE.Color(0x999900);
                    color = new THREE.Color(this.colorG2);
                } else if (line.arc) {
                    grouptype = "arc";
                    color = new THREE.Color(0x0099ff);
                }
                // see if we have reached indxMax, if so draw, but 
                // make it ghosted
                if (args.indx > indxMax) {
                    grouptype = "ghost";
                    //console.log("args.indx > indxMax", args, indxMax);
                    color = new THREE.Color(0x000000);
                }
                //if (line.color) color = new THREE.Color(line.color);
                if (layer.type[grouptype] == undefined) {
                    layer.type[grouptype] = {
                        type: grouptype,
                        feed: line.e,
                        extruding: line.extruding,
                        color: color,
                        segmentCount: 0,
                        material: new THREE.LineBasicMaterial({
                            opacity: line.extruding ? 0.3 : line.g2 ? 0.2 : 0.5,
                            transparent: true,
                            linewidth: 1,
                            vertexColors: THREE.FaceColors
                        }),
                        geometry: new THREE.Geometry(),
                    }
                    if (args.indx > indxMax) {
                        layer.type[grouptype].material.opacity = 0.05;
                    }
                }
                return layer.type[grouptype];
            };

            this.drawArc = function(aX, aY, aZ, endaZ, aRadius, aStartAngle, aEndAngle, aClockwise, plane) {
                //console.log("drawArc:", aX, aY, aZ, aRadius, aStartAngle, aEndAngle, aClockwise);
                var ac = new THREE.ArcCurve(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise);
                //console.log("ac:", ac);
                var acmat = new THREE.LineBasicMaterial({
                    color: 0x00aaff,
                    opacity: 0.5,
                    transparent: true
                });
                var acgeo = new THREE.Geometry();
                var ctr = 0;
                var z = aZ;
                ac.getPoints(20).forEach(function (v) {
                    //console.log(v);
                    z = (((endaZ - aZ) / 20) * ctr) + aZ;
                    acgeo.vertices.push(new THREE.Vector3(v.x, v.y, z));
                    ctr++;
                });
                var aco = new THREE.Line(acgeo, acmat);
                //aco.position.set(pArc.x, pArc.y, pArc.z);
                //console.log("aco:", aco);
                this.extraObjects[plane].push(aco);
                return aco;
            };
            
            this.drawArcFrom2PtsAndCenter = function(vp1, vp2, vpArc, args) {
                //console.log("drawArcFrom2PtsAndCenter. vp1:", vp1, "vp2:", vp2, "vpArc:", vpArc, "args:", args);
                
                //var radius = vp1.distanceTo(vpArc);
                //console.log("radius:", radius);
                
                // Find angle
                var p1deltaX = vpArc.x - vp1.x;
                var p1deltaY = vpArc.y - vp1.y; 
                var p1deltaZ = vpArc.z - vp1.z;

                var p2deltaX = vpArc.x - vp2.x;
                var p2deltaY = vpArc.y - vp2.y; 
                var p2deltaZ = vpArc.z - vp2.z;

                switch(args.plane){
                    case "G18":
                        var anglepArcp1 = Math.atan(p1deltaZ / p1deltaX);
                        var anglepArcp2 = Math.atan(p2deltaZ / p2deltaX);
                        break;
                    case "G19":
                        var anglepArcp1 = Math.atan(p1deltaZ / p1deltaY);
                        var anglepArcp2 = Math.atan(p2deltaZ / p2deltaY);
                        break;
                    default:
                        var anglepArcp1 = Math.atan(p1deltaY / p1deltaX);
                        var anglepArcp2 = Math.atan(p2deltaY / p2deltaX);
                }
                
                // Draw arc from arc center
                var radius = vpArc.distanceTo(vp1);
                var radius2 = vpArc.distanceTo(vp2);
                //console.log("radius:", radius);
                
                if (Number((radius).toFixed(2)) != Number((radius2).toFixed(2))) console.log("Radiuses not equal. r1:", radius, ", r2:", radius2, " with args:", args, " rounded vals r1:", Number((radius).toFixed(2)), ", r2:", Number((radius2).toFixed(2)));
                
                // arccurve
                var clwise = true;
                if (args.clockwise === false) clwise = false;
                //if (anglepArcp1 < 0) clockwise = false;

                switch(args.plane){
                    case "G19":
                        if (p1deltaY >= 0) anglepArcp1 += Math.PI;
                        if (p2deltaY >= 0) anglepArcp2 += Math.PI;
                        break;
                    default:
                        if (p1deltaX >= 0) anglepArcp1 += Math.PI;
                        if (p2deltaX >= 0) anglepArcp2 += Math.PI;
                }

                if (anglepArcp1 === anglepArcp2 && clwise === false)
                    // Draw full circle if angles are both zero, 
                    // start & end points are same point... I think
                    switch(args.plane){
                        case "G18":
                            var threeObj = this.drawArc(vpArc.x, vpArc.z, (-1*vp1.y), (-1*vp2.y), radius, anglepArcp1, (anglepArcp2 + (2*Math.PI)), clwise, "G18");
                            break;
                        case "G19":
                            var threeObj = this.drawArc(vpArc.y, vpArc.z, vp1.x, vp2.x, radius, anglepArcp1, (anglepArcp2 + (2*Math.PI)), clwise, "G19");
                            break;
                        default:
                            var threeObj = this.drawArc(vpArc.x, vpArc.y, vp1.z, vp2.z, radius, anglepArcp1, (anglepArcp2 + (2*Math.PI)), clwise, "G17");
                    }
                else
                    switch(args.plane){
                        case "G18":
                            var threeObj = this.drawArc(vpArc.x, vpArc.z, (-1*vp1.y), (-1*vp2.y), radius, anglepArcp1, anglepArcp2, clwise, "G18");
                            break;
                        case "G19":
                            var threeObj = this.drawArc(vpArc.y, vpArc.z, vp1.x, vp2.x, radius, anglepArcp1, anglepArcp2, clwise, "G19");
                            break;
                        default:
                            var threeObj = this.drawArc(vpArc.x, vpArc.y, vp1.z, vp2.z, radius, anglepArcp1, anglepArcp2, clwise, "G17");
                    }
                return threeObj;
            };
            
            this.addSegment = function (p1, p2, args) {
                //console.log("");
                //console.log("addSegment p2:", p2);
                // add segment to array for later use
                lines.push({
                    p2: p2,
                    'args': args
                });

                var group = this.getLineGroup(p2, args);
                var geometry = group.geometry;

                group.segmentCount++;
                // see if we need to draw an arc
                if (p2.arc) {
                    //console.log("");
                    //console.log("drawing arc. p1:", p1, ", p2:", p2);
                    
                    //var segmentCount = 12;
                    // figure out the 3 pts we are dealing with
                    // the start, the end, and the center of the arc circle
                    // radius is dist from p1 x/y/z to pArc x/y/z
                    //if(args.clockwise === false || args.cmd === "G3"){
                    //    var vp2 = new THREE.Vector3(p1.x, p1.y, p1.z);
                    //    var vp1 = new THREE.Vector3(p2.x, p2.y, p2.z);
                    //}
                    //else {
                        var vp1 = new THREE.Vector3(p1.x, p1.y, p1.z);
                        var vp2 = new THREE.Vector3(p2.x, p2.y, p2.z);
                    //}   
                    var vpArc;
                    
                    // if this is an R arc gcode command, we're given the radius, so we
                    // don't have to calculate it. however we need to determine center
                    // of arc
                    if (args.r != null) {
                        //console.log("looks like we have an arc with R specified. args:", args);
                        //console.log("anglepArcp1:", anglepArcp1, "anglepArcp2:", anglepArcp2);

                        radius = parseFloat(args.r);
                        
                        // First, find the distance between points 1 and 2.  We'll call that q, 
                        // and it's given by sqrt((x2-x1)^2 + (y2-y1)^2).
                        var q = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));

                        // Second, find the point halfway between your two points.  We'll call it 
                        // (x3, y3).  x3 = (x1+x2)/2  and  y3 = (y1+y2)/2.  
                        var x3 = (p1.x + p2.x) / 2;
                        var y3 = (p1.y + p2.y) / 2;
                        var z3 = (p1.z + p2.z) / 2;
                        
                        // There will be two circle centers as a result of this, so
                        // we will have to pick the correct one. In gcode we can get
                        // a + or - val on the R to indicate which circle to pick
                        // One answer will be:
                        // x = x3 + sqrt(r^2-(q/2)^2)*(y1-y2)/q
                        // y = y3 + sqrt(r^2-(q/2)^2)*(x2-x1)/q  
                        // The other will be:
                        // x = x3 - sqrt(r^2-(q/2)^2)*(y1-y2)/q
                        // y = y3 - sqrt(r^2-(q/2)^2)*(x2-x1)/q  
                        var pArc_1 = undefined;
                        var pArc_2 = undefined;
                        var calc = Math.sqrt((radius * radius) - Math.pow(q / 2, 2));
                        // calc can be NaN if q/2 is epsilon larger than radius due to finite precision
                        // When that happens, the calculated center is incorrect
                        if (isNaN(calc)) {
                            calc = 0.0;
                        }
                        var angle_point = undefined;
                        
                        switch(args.plane){
                            case "G18":
                                pArc_1 = {
                                    x: x3 + calc * (p1.z - p2.z) / q,
                                    y: y3 + calc * (p2.y - p1.y) / q, 
                                    z: z3 + calc * (p2.x - p1.x) / q };
                                pArc_2 = {
                                    x: x3 - calc * (p1.z - p2.z) / q,
                                    y: y3 - calc * (p2.y - p1.y) / q, 
                                    z: z3 - calc * (p2.x - p1.x) / q };
                                angle_point = Math.atan2(p1.z, p1.x) - Math.atan2(p2.z, p2.x);
                                if(((p1.x-pArc_1.x)*(p1.z+pArc_1.z))+((pArc_1.x-p2.x)*(pArc_1.z+p2.z)) >= 
                                   ((p1.x-pArc_2.x)*(p1.z+pArc_2.z))+((pArc_2.x-p2.x)*(pArc_2.z+p2.z))){
                                    var cw = pArc_1;
                                    var ccw = pArc_2;
                                }
                                else{
                                    var cw = pArc_2;
                                    var ccw = pArc_1;
                                }
                                break;
                            case "G19":
                                pArc_1 = {
                                    x: x3 + calc * (p1.x - p2.x) / q,
                                    y: y3 + calc * (p1.z - p2.z) / q, 
                                    z: z3 + calc * (p2.y - p1.y) / q };
                                pArc_2 = {
                                    x: x3 - calc * (p1.x - p2.x) / q,
                                    y: y3 - calc * (p1.z - p2.z) / q, 
                                    z: z3 - calc * (p2.y - p1.y) / q };
                                
                                if(((p1.y-pArc_1.y)*(p1.z+pArc_1.z))+((pArc_1.y-p2.y)*(pArc_1.z+p2.z)) >= 
                                   ((p1.y-pArc_2.y)*(p1.z+pArc_2.z))+((pArc_2.y-p2.y)*(pArc_2.z+p2.z))){
                                    var cw = pArc_1;
                                    var ccw = pArc_2;
                                }
                                else{
                                    var cw = pArc_2;
                                    var ccw = pArc_1;
                                }
                                break;
                            default:
                                pArc_1 = {
                                    x: x3 + calc * (p1.y - p2.y) / q,
                                    y: y3 + calc * (p2.x - p1.x) / q, 
                                    z: z3 + calc * (p2.z - p1.z) / q };
                                pArc_2 = {
                                    x: x3 - calc * (p1.y - p2.y) / q,
                                    y: y3 - calc * (p2.x - p1.x) / q, 
                                    z: z3 - calc * (p2.z - p1.z) / q };
                                if(((p1.x-pArc_1.x)*(p1.y+pArc_1.y))+((pArc_1.x-p2.x)*(pArc_1.y+p2.y)) >= 
                                   ((p1.x-pArc_2.x)*(p1.y+pArc_2.y))+((pArc_2.x-p2.x)*(pArc_2.y+p2.y))){
                                    var cw = pArc_1;
                                    var ccw = pArc_2;
                                }
                                else{
                                    var cw = pArc_2;
                                    var ccw = pArc_1;
                                }
                        }
                        
                        if((p2.clockwise === true && radius >= 0) || (p2.clockwise === false && radius < 0)) vpArc = new THREE.Vector3(cw.x, cw.y, cw.z);
                        else vpArc = new THREE.Vector3(ccw.x, ccw.y, ccw.z);

                    } else {
                        // this code deals with IJK gcode commands
                        /*if(args.clockwise === false || args.cmd === "G3")
                            var pArc = {
                                x: p2.arci ? p1.x + p2.arci : p1.x,
                                y: p2.arcj ? p1.y + p2.arcj : p1.y,
                                z: p2.arck ? p1.z + p2.arck : p1.z,
                            };
                        else*/
                        var pArc = {
                            x: p2.arci,
                            y: p2.arcj,
                            z: p2.arck,
                        };
                        //console.log("new pArc:", pArc);
                        vpArc = new THREE.Vector3(pArc.x, pArc.y, pArc.z);
                        //console.log("vpArc:", vpArc);
                    }
                    
                    var threeObjArc = this.drawArcFrom2PtsAndCenter(vp1, vp2, vpArc, args);
                    
                    // still push the normal p1/p2 point for debug
                    p2.g2 = true;
                    p2.threeObjArc = threeObjArc;
                    group = this.getLineGroup(p2, args);
                    // these golden lines showing start/end of a g2 or g3 arc were confusing people
                    // so hiding them for now. jlauer 8/15/15
                    /*
                    geometry = group.geometry;
                    geometry.vertices.push(
                        new THREE.Vector3(p1.x, p1.y, p1.z));
                    geometry.vertices.push(
                        new THREE.Vector3(p2.x, p2.y, p2.z));
                    geometry.colors.push(group.color);
                    geometry.colors.push(group.color);
                    */
                } else {
                    geometry.vertices.push(
                        new THREE.Vector3(p1.x, p1.y, p1.z));
                    geometry.vertices.push(
                        new THREE.Vector3(p2.x, p2.y, p2.z));
                    geometry.colors.push(group.color);
                    geometry.colors.push(group.color);
                }
                
                if (p2.extruding) {
                    bbbox.min.x = Math.min(bbbox.min.x, p2.x);
                    bbbox.min.y = Math.min(bbbox.min.y, p2.y);
                    bbbox.min.z = Math.min(bbbox.min.z, p2.z);
                    bbbox.max.x = Math.max(bbbox.max.x, p2.x);
                    bbbox.max.y = Math.max(bbbox.max.y, p2.y);
                    bbbox.max.z = Math.max(bbbox.max.z, p2.z);
                }
                if (p2.g0) {
                    // we're in a toolhead move, label moves
                    /*
                    if (group.segmentCount < 2) {
                    this.makeSprite(this.scene, "webgl", {
                        x: p2.x,
                        y: p2.y,
                        z: p2.z + 0,
                        text: group.segmentCount,
                        color: "#ff00ff",
                        size: 3,
                    });
                    }
                    */
                }
                // global bounding box calc
                bbbox2.min.x = Math.min(bbbox2.min.x, p2.x);
                bbbox2.min.y = Math.min(bbbox2.min.y, p2.y);
                bbbox2.min.z = Math.min(bbbox2.min.z, p2.z);
                bbbox2.max.x = Math.max(bbbox2.max.x, p2.x);
                bbbox2.max.y = Math.max(bbbox2.max.y, p2.y);
                bbbox2.max.z = Math.max(bbbox2.max.z, p2.z);
                
                // NEW METHOD OF CREATING THREE.JS OBJECTS
                // create new approach for three.js objects which is
                // a unique object for each line of gcode, including g2/g3's
                // make sure userData is good too
                var gcodeObj;
                
                if (p2.arc) {
                    // use the arc that already got built
                    gcodeObj = p2.threeObjArc;
                } else {
                    // make a line
                    var color = 0X0000ff;
                    
                    if (p2.extruding) {
                        color = 0xff00ff;
                    } else if (p2.g0) {
                        color = 0x00ff00;
                    } else if (p2.g2) {
                        //color = 0x999900;
                    } else if (p2.arc) {
                        color = 0x0033ff;
                    }
                    
                    var material = new THREE.LineBasicMaterial({
                        color: color,
                        opacity: 0.5,
                        transparent: true
                    });
                    
                    var geometry = new THREE.Geometry();
                    geometry.vertices.push(
                        new THREE.Vector3( p1.x, p1.y, p1.z ),
                        new THREE.Vector3( p2.x, p2.y, p2.z )
                    );
                    
                    var line = new THREE.Line( geometry, material );
                    gcodeObj = line;
                }
                gcodeObj.userData.p2 = p2;
                gcodeObj.userData.args = args;
                new3dObj.add(gcodeObj);
                
                // DISTANCE CALC
                // add distance so we can calc estimated time to run
                // see if arc
                var dist = 0;
                if (p2.arc) {
                    // calc dist of all lines
                    //console.log("this is an arc to calc dist for. p2.threeObjArc:", p2.threeObjArc, "p2:", p2);
                    var arcGeo = p2.threeObjArc.geometry;
                    //console.log("arcGeo:", arcGeo);
                                        
                    var tad2 = 0;
                    for (var arcLineCtr = 0; arcLineCtr < arcGeo.vertices.length - 1; arcLineCtr++) {
                        tad2 += arcGeo.vertices[arcLineCtr].distanceTo(arcGeo.vertices[arcLineCtr+1]);
                    }
                    //console.log("tad2:", tad2);
                    
                    
                    // just do straight line calc
                    var a = new THREE.Vector3( p1.x, p1.y, p1.z );
                    var b = new THREE.Vector3( p2.x, p2.y, p2.z );
                    var straightDist = a.distanceTo(b);
                    
                    //console.log("diff of straight line calc vs arc sum. straightDist:", straightDist);
                    
                    dist = tad2;
                    
                } else {
                    // just do straight line calc
                    var a = new THREE.Vector3( p1.x, p1.y, p1.z );
                    var b = new THREE.Vector3( p2.x, p2.y, p2.z );
                    dist = a.distanceTo(b);
                }
                
                if (dist > 0) {
                    this.totalDist += dist;
                }
                
                // time to execute this move
                // if this move is 10mm and we are moving at 100mm/min then
                // this move will take 10/100 = 0.1 minutes or 6 seconds
                var timeMinutes = 0;
                if (dist > 0) {
                    var fr;
                    if (args.feedrate > 0) {
                        fr = args.feedrate
                    } else {
                        fr = 100;
                    }
                    timeMinutes = dist / fr;
                    
                    // adjust for acceleration, meaning estimate
                    // this will run longer than estimated from the math
                    // above because we don't start moving at full feedrate
                    // obviously, we have to slowly accelerate in and out
                    timeMinutes = timeMinutes * 1.32;
                }
                this.totalTime += timeMinutes;

                p2.feedrate = args.feedrate;
                p2.dist = dist;
                p2.distSum = this.totalDist;
                p2.timeMins = timeMinutes;
                p2.timeMinsSum = this.totalTime;
                
                //console.log("calculating distance. dist:", dist, "totalDist:", this.totalDist, "feedrate:", args.feedrate, "timeMinsToExecute:", timeMinutes, "totalTime:", this.totalTime, "p1:", p1, "p2:", p2, "args:", args);
                
            }
            this.totalDist = 0;
            this.totalTime = 0;
            
            var relative = false;

            this.delta = function (v1, v2) {
                return relative ? v2 : v2 - v1;
            }

            this.absolute = function (v1, v2) {
                return relative ? v1 + v2 : v2;
            }
            
            var ijkrelative = true;  // For Mach3 Arc IJK Absolute mode
            
            this.ijkabsolute = function (v1, v2) {
                return ijkrelative ? v1 + v2 : v2;
            }

            this.addFakeSegment = function(args) {
                //line.args = args;
                var arg2 = {
                    isFake : true,
                    text : args.text,
                    indx : args.indx
                };
                if (arg2.text.match(/^(;|\(|<)/)) arg2.isComment = true;
                lines.push({
                    p2: lastLine,    // since this is fake, just use lastLine as xyz
                    'args': arg2
                });
            }

            var cofg = this;
            var parser = new this.GCodeParser({
                //set the g92 offsets for the parser - defaults to no offset
                /* When doing CNC, generally G0 just moves to a new location
                as fast as possible which means no milling or extruding is happening in G0.
                So, let's color it uniquely to indicate it's just a toolhead move. */
                G0: function (args, indx) {
                    //G1.apply(this, args, line, 0x00ff00);
                    //console.log("G0", args);
                    var newLine = {
                        x: args.x !== undefined ? cofg.absolute(lastLine.x, args.x) + cofg.offsetG92.x : lastLine.x,
                        y: args.y !== undefined ? cofg.absolute(lastLine.y, args.y) + cofg.offsetG92.y : lastLine.y,
                        z: args.z !== undefined ? cofg.absolute(lastLine.z, args.z) + cofg.offsetG92.z : lastLine.z,
                        e: args.e !== undefined ? cofg.absolute(lastLine.e, args.e) + cofg.offsetG92.e : lastLine.e,
                        f: args.f !== undefined ? cofg.absolute(lastLine.f, args.f) : lastLine.f,
                    };
                    newLine.g0 = true;
                    //cofg.newLayer(newLine);
                    
                    cofg.addSegment(lastLine, newLine, args);
                    //console.log("G0", lastLine, newLine, args, cofg.offsetG92);
                    lastLine = newLine;
                },  
                G1: function (args, indx) {
                    // Example: G1 Z1.0 F3000
                    //          G1 X99.9948 Y80.0611 Z15.0 F1500.0 E981.64869
                    //          G1 E104.25841 F1800.0
                    // Go in a straight line from the current (X, Y) point
                    // to the point (90.6, 13.8), extruding material as the move
                    // happens from the current extruded length to a length of
                    // 22.4 mm.

                    var newLine = {
                        x: args.x !== undefined ? cofg.absolute(lastLine.x, args.x) + cofg.offsetG92.x : lastLine.x,
                        y: args.y !== undefined ? cofg.absolute(lastLine.y, args.y) + cofg.offsetG92.y : lastLine.y,
                        z: args.z !== undefined ? cofg.absolute(lastLine.z, args.z) + cofg.offsetG92.z : lastLine.z,
                        e: args.e !== undefined ? cofg.absolute(lastLine.e, args.e) + cofg.offsetG92.e : lastLine.e,
                        f: args.f !== undefined ? cofg.absolute(lastLine.f, args.f) : lastLine.f,

                    };
                    /* layer change detection is or made by watching Z, it's made by
         watching when we extrude at a new Z position */
                    if (cofg.delta(lastLine.e, newLine.e) > 0) {
                        newLine.extruding = cofg.delta(lastLine.e, newLine.e) > 0;
                        if (layer == undefined || newLine.z != layer.z) cofg.newLayer(newLine);
                    }
                    cofg.addSegment(lastLine, newLine, args);
                    //console.log("G1", lastLine, newLine, args, cofg.offsetG92);
                    lastLine = newLine;
                },
                G2: function (args, indx, gcp) {
                    /* this is an arc move from lastLine's xy to the new xy. we'll
                    show it as a light gray line, but we'll also sub-render the
                    arc itself by figuring out the sub-segments . */
                    
                    args.plane = plane; //set the plane for this command to whatever the current plane is
                    
                    var newLine = {
                        x: args.x !== undefined ? cofg.absolute(lastLine.x, args.x) + cofg.offsetG92.x : lastLine.x,
                        y: args.y !== undefined ? cofg.absolute(lastLine.y, args.y) + cofg.offsetG92.y : lastLine.y,
                        z: args.z !== undefined ? cofg.absolute(lastLine.z, args.z) + cofg.offsetG92.z : lastLine.z,
                        e: args.e !== undefined ? cofg.absolute(lastLine.e, args.e) + cofg.offsetG92.e : lastLine.e,
                        f: args.f !== undefined ? cofg.absolute(lastLine.f, args.f) : lastLine.f,
                        arci: args.i !== undefined ? cofg.ijkabsolute(lastLine.x, args.i) : lastLine.x,
                        arcj: args.j !== undefined ? cofg.ijkabsolute(lastLine.y, args.j) : lastLine.y,
                        arck: args.k !== undefined ? cofg.ijkabsolute(lastLine.z, args.k) : lastLine.z,
                        arcr: args.r ? args.r : null,
                    };
                   
                    //console.log("G2 newLine:", newLine);
                    //newLine.g2 = true;
                    newLine.arc = true;
                    newLine.clockwise = true;
                    if (args.clockwise === false) newLine.clockwise = args.clockwise;
                    cofg.addSegment(lastLine, newLine, args);
                    //console.log("G2", lastLine, newLine, args, cofg.offsetG92);
                    lastLine = newLine;
                    //console.log("G2. args:", args);
                },
                G3: function (args, indx, gcp) {
                    /* this is an arc move from lastLine's xy to the new xy. same
                    as G2 but reverse*/
                    args.arc = true;
                    args.clockwise = false;
                    gcp.handlers.G2(args, indx, gcp);
                },

                G73: function(args, indx, gcp) {
                    // peck drilling. just treat as g1
                    console.log("G73 gcp:", gcp);
                    gcp.handlers.G1(args);
                },

                G92: function (args) { // E0
                    // G92: Set Position
                    // Example: G92 E0
                    // Allows programming of absolute zero point, by reseting the
                    // current position to the values specified. This would set the
                    // machine's X coordinate to 10, and the extrude coordinate to 90.
                    // No physical motion will occur.

                    // TODO: Only support E0
                    var newLine = lastLine;
                    
                    cofg.offsetG92.x = (args.x !== undefined ? (args.x === 0 ? newLine.x : newLine.x - args.x) : 0);
                    cofg.offsetG92.y = (args.y !== undefined ? (args.y === 0 ? newLine.y : newLine.y - args.y) : 0);
                    cofg.offsetG92.z = (args.z !== undefined ? (args.z === 0 ? newLine.z : newLine.z - args.z) : 0);
                    cofg.offsetG92.e = (args.e !== undefined ? (args.e === 0 ? newLine.e : newLine.e - args.e) : 0);

                    //newLine.x = args.x !== undefined ? args.x + newLine.x : newLine.x;
                    //newLine.y = args.y !== undefined ? args.y + newLine.y : newLine.y;
                    //newLine.z = args.z !== undefined ? args.z + newLine.z : newLine.z;
                    //newLine.e = args.e !== undefined ? args.e + newLine.e : newLine.e;
                    
                    //console.log("G92", lastLine, newLine, args, cofg.offsetG92);
                    
                    //lastLine = newLine;
                    cofg.addFakeSegment(args);
                },
                M30: function (args) {
                    cofg.addFakeSegment(args);
                },

                'default': function (args, info) {
                    //if (!args.isComment)
                    //    console.log('Unknown command:', args.cmd, args, info);
                    cofg.addFakeSegment(args);
                },
            },
            // Mode-setting non-motion commands, of which many may appear on one line
            // These take no arguments
            {
                G17: function () {
                    console.log("SETTING XY PLANE");
                    plane = "G17";
                },

                G18: function () {
                    console.log("SETTING XZ PLANE");
                    plane = "G18";
                },

                G19: function () {
                    console.log("SETTING YZ PLANE");
                    plane = "G19";
                },

                G20: function () {
                    // G21: Set Units to Inches
                    // We don't really have to do anything since 3d viewer is unit agnostic
                    // However, we need to set a global property so the trinket decorations
                    // like toolhead, axes, grid, and extent labels are scaled correctly
                    // later on when they are drawn after the gcode is rendered
                    console.log("SETTING UNITS TO INCHES!!!");
                    //isUnitsMm = false; // false means inches cuz default is mm
                    cofg.setUnits("inch");
                },

                G21: function () {
                    // G21: Set Units to Millimeters
                    // Example: G21
                    // Units from now on are in millimeters. (This is the RepRap default.)
                    console.log("SETTING UNITS TO MM!!!");
                    //isUnitsMm = true; // true means mm
                    cofg.setUnits("mm");
                },

                // A bunch of no-op modes that do not affect the viewer
                G40: function () {}, // Tool radius compensation off
                G41: function () {}, // Tool radius compensation left
                G42: function () {}, // Tool radius compensation right
                G45: function () {}, // Axis offset single increase
                G46: function () {}, // Axis offset single decrease
                G47: function () {}, // Axis offset double increase
                G48: function () {}, // Axis offset double decrease
                G49: function () {}, // Tool length offset compensation cancle
                G54: function () {}, // Select work coordinate system 1
                G55: function () {}, // Select work coordinate system 2
                G56: function () {}, // Select work coordinate system 3
                G57: function () {}, // Select work coordinate system 4
                G58: function () {}, // Select work coordinate system 5
                G59: function () {}, // Select work coordinate system 6
                G61: function () {}, // Exact stop check mode
                G64: function () {}, // Cancel G61
                G69: function () {}, // Cancel G68

                G90: function () {
                    // G90: Set to Absolute Positioning
                    // Example: G90
                    // All coordinates from now on are absolute relative to the
                    // origin of the machine. (This is the RepRap default.)
                    relative = false;
                },

                'G90.1': function () {
                    // G90.1: Set to Arc Absolute IJK Positioning
                    // Example: G90.1
                    // From now on, arc centers are specified directly by
                    // the IJK parameters, e.g. center_x = I_value
                    // This is Mach3-specific
                    ijkrelative = false;
                },

                G91: function () {
                    // G91: Set to Relative Positioning
                    // Example: G91
                    // All coordinates from now on are relative to the last position.
                    relative = true;
                },

                'G91.1': function () {
                    // G91.1: Set to Arc Relative IJK Positioning
                    // Example: G91.1
                    // From now on, arc centers are relative to the starting
                    // coordinate, e.g. center_x = this_x + I_value
                    // This is the default, and the only possibility for most
                    // controllers other than Mach3
                    ijkrelative = true;
                },

                // No-op modal macros that do not affect the viewer
                M07: function () {}, // Coolant on (mist)
                M08: function () {}, // Coolant on (flood)
                M09: function () {}, // Coolant off
                M10: function () {}, // Pallet clamp on
                M11: function () {}, // Pallet clamp off
                M21: function () {}, // Mirror X axis
                M22: function () {}, // Mirror Y axis
                M23: function () {}, // Mirror off
                M24: function () {}, // Thread pullout gradual off
                M41: function () {}, // Select gear 1
                M42: function () {}, // Select gear 2
                M43: function () {}, // Select gear 3
                M44: function () {}, // Select gear 4
                M48: function () {}, // Allow feedrate override
                M49: function () {}, // Disallow feedrate override
                M52: function () {}, // Empty spindle
                M60: function () {}, // Automatic pallet change

                M82: function () {
                    // M82: Set E codes absolute (default)
                    // Descriped in Sprintrun source code.

                    // No-op, so long as M83 is not supported.
                },

                M84: function () {
                    // M84: Stop idle hold
                    // Example: M84
                    // Stop the idle hold on all axis and extruder. In some cases the
                    // idle hold causes annoying noises, which can be stopped by
                    // disabling the hold. Be aware that by disabling idle hold during
                    // printing, you will get quality issues. This is recommended only
                    // in between or after printjobs.

                    // No-op
                },
            });

            parser.parse(gcode);

            // set what units we're using in the gcode
            //console.log('setting units from parser to 3dviewer. parser:', parser, "this:", this);
            console.log('SETTING units from parser to 3dviewer. parser:', parser, "this:", this, "cofg: ", cofg);
            this.isUnitsMm = parser.isUnitsMm;
            
            console.log("inside creatGcodeFromObject. this:", this);

            console.log("Layer Count ", layers.length);

            
            var object = new THREE.Object3D();
            
            
            // old approach of monolithic line segment
            for (var lid in layers) {
                var layer = layers[lid];
                //      console.log("Layer ", layer.layer);
                for (var tid in layer.type) {
                    var type = layer.type[tid];
                    //console.log("Layer:", layer.layer, "type:", type, "segCnt:", type.segmentCount);
                    // normal geometry (not buffered)
                    //object.add(new THREE.Line(type.geometry, type.material, THREE.LinePieces));
                    // using buffer geometry
                    var bufferGeo = this.convertLineGeometryToBufferGeometry( type.geometry, type.color );
                    object.add(new THREE.Line(bufferGeo, type.material, THREE.LinePieces));
                }
            }
            //XY PLANE
            this.extraObjects["G17"].forEach(function(obj) {
                // non-buffered approach
                //object.add(obj);
                
                // buffered approach
                // convert g2/g3's to buffer geo as well
                //console.log("extra object:", obj);
                var bufferGeo = this.convertLineGeometryToBufferGeometry( obj.geometry, obj.material.color );
                object.add(new THREE.Line(bufferGeo, obj.material));
            }, this);
            //XZ PLANE
            this.extraObjects["G18"].forEach(function(obj) {
                // buffered approach
                var bufferGeo = this.convertLineGeometryToBufferGeometry( obj.geometry, obj.material.color );
                var tmp = new THREE.Line(bufferGeo, obj.material)
                tmp.rotateOnAxis(new THREE.Vector3(1,0,0),Math.PI/2);
                object.add(tmp);
            }, this);
            //YZ PLANE
            this.extraObjects["G19"].forEach(function(obj) {
                // buffered approach
                var bufferGeo = this.convertLineGeometryToBufferGeometry( obj.geometry, obj.material.color );
                var tmp = new THREE.Line(bufferGeo, obj.material)
                tmp.rotateOnAxis(new THREE.Vector3(1,0,0),Math.PI/2);
                tmp.rotateOnAxis(new THREE.Vector3(0,1,0),Math.PI/2);
                object.add(tmp);
            }, this);
            
            // use new approach of building 3d object where each
            // gcode line is its own segment with its own userData
            //object = new3dObj;


            console.log("bbox ", bbbox);

            // Center
            var scale = 1; // TODO: Auto size

            var center = new THREE.Vector3(
            bbbox.min.x + ((bbbox.max.x - bbbox.min.x) / 2),
            bbbox.min.y + ((bbbox.max.y - bbbox.min.y) / 2),
            bbbox.min.z + ((bbbox.max.z - bbbox.min.z) / 2));
            console.log("center ", center);

            var center2 = new THREE.Vector3(
            bbbox2.min.x + ((bbbox2.max.x - bbbox2.min.x) / 2),
            bbbox2.min.y + ((bbbox2.max.y - bbbox2.min.y) / 2),
            bbbox2.min.z + ((bbbox2.max.z - bbbox2.min.z) / 2));
            console.log("center2 of all gcode ", center2);

            // store meta data in userData of object3d for later use like in animation
            // of toolhead
            object.userData.bbbox2 = bbbox2;
            object.userData.lines = lines;
            object.userData.layers = layers;
            object.userData.center2 = center2;
            object.userData.extraObjects = this.extraObjects;
            object.userData.threeObjs = new3dObj;
            
            console.log("userData for this object3d:", object.userData);
            /*
            this.camera.target.x = center2.x;
            this.camera.target.y = center2.y;
            this.camera.target.z = center2.z;
            */

            //object.position = center.multiplyScalar(-scale);

            //object.scale.multiplyScalar(scale);
            console.log("final object:", object);

            return object;
        },
        convertLineGeometryToBufferGeometry: function(lineGeometry, color) {
            
            var positions = new Float32Array( lineGeometry.vertices.length * 3 );
            var colors = new Float32Array( lineGeometry.vertices.length * 3 );
            
            var r = 800;
            
            var geometry = new THREE.BufferGeometry();
            
            for (var i = 0; i < lineGeometry.vertices.length; i++) {
                
                var x = lineGeometry.vertices[i].x;
                var y = lineGeometry.vertices[i].y;
                var z = lineGeometry.vertices[i].z;
                
                // positions
                positions[ i * 3 ] = x;
                positions[ i * 3 + 1 ] = y;
                positions[ i * 3 + 2 ] = z;
                
                // colors
                colors[ i * 3 ] = color.r;
                colors[ i * 3 + 1 ] = color.g;
                colors[ i * 3 + 2 ] = color.b;
            }
            
            geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
            geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
            
            geometry.computeBoundingSphere();
            
            return geometry;
        },
        
        /*
        // marquee selection code
        // Huge credit to Josh Staples for this code
        // https://gist.github.com/cubicleDowns/7666452
        marquee: {
            
            listeners: function() {
                demo.jqContainer.mousedown(mouseDown);
                demo.jqContainer.mouseup(mouseUp);
                demo.jqContainer.mousemove(marqueeSelect);
                $(document).mousemove(resetMarquee);
            },
        
            resetMarquee: function() {
                mouseup = true;
                mousedown = false;
                marquee.fadeOut();
                marquee.css({width: 0, height: 0});
                mousedowncoords = {};
            },
         
            mouseDown: function (event) {
    
                event.preventDefault();
                
                var pos = {};
                
                mousedown = true;
                mousedowncoords = {};
                
                mousedowncoords.x = event.clientX;
                mousedowncoords.y = event.clientY;
                
                // adjust the mouse select
                pos.x = ((event.clientX - offset.x) / demo.jqContainer.width()) * 2 -1;
                pos.y = -((event.clientY - offset.y) / demo.jqContainer.height()) * 2 + 1;
    
                var vector = new THREE.Vector3(pos.x, pos.y, 1);
                
                demo.projector.unprojectVector(vector, demo.cameras.liveCam);
    
                // removing previous click marker.
                $(".clickMarkers").remove();
    
                // appending a click marker.
                demo.jqContainer.append('<div class="clickMarkers" style="pointer-events:none; position: absolute; z-index: 100; left: ' + event.offsetX + 'px; top: ' + event.offsetY +'px">D</div>' );
    
            },

            mouseUp: function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                // reset the marquee selection
                resetMarquee();
    
                // appending a click marker.
                demo.jqContainer.append('<div class="clickMarkers" style="left: ' + event.offsetX + 'px; top: ' + event.offsetY +'px">U</div>' );
            },

            marqueeSelect: function(event) {
                event.preventDefault();
                event.stopPropagation();
    
                // make sure we are in a select mode.
                if(mousedown){
        
                    marquee.fadeIn();
        
                    var pos = {};
                    pos.x = event.clientX - mousedowncoords.x;
                    pos.y = event.clientY - mousedowncoords.y;
                    
                    // square variations
                    // (0,0) origin is the TOP LEFT pixel of the canvas.
                    //
                    //  1 | 2
                    // ---.---
                    //  4 | 3
                    // there are 4 ways a square can be gestured onto the screen.  the following detects these four variations
                    // and creates/updates the CSS to draw the square on the screen
                    if (pos.x < 0 && pos.y < 0) {
                        marquee.css({left: event.clientX + 'px', width: -pos.x + 'px', top: event.clientY + 'px', height: -pos.y + 'px'});
                    } else if ( pos.x >= 0 && pos.y <= 0) {
                        marquee.css({left: mousedowncoords.x + 'px',width: pos.x + 'px', top: event.clientY, height: -pos.y + 'px'});
                    } else if (pos.x >= 0 && pos.y >= 0) {
                        marquee.css({left: mousedowncoords.x + 'px', width: pos.x + 'px', height: pos.y + 'px', top: mousedowncoords.y + 'px'});
                    } else if (pos.x < 0 && pos.y >= 0) {
                        marquee.css({left: event.clientX + 'px', width: -pos.x + 'px', height: pos.y + 'px', top: mousedowncoords.y + 'px'});
                    }
                    
                    var selectedCubes = findCubesByVertices({x: event.clientX, y: event.clientY});
                    
                    demo.setup.highlight(selectedCubes);
        
                }
            },

            findCubesByVertices: function(location){
                var currentMouse = {},
                    mouseInitialDown = {},
                    units,
                    bounds,
                    inside = false,
                    selectedUnits = [],
                    dupeCheck = {};
                
                currentMouse.x = location.x;
                currentMouse.y = location.y;
                
                mouseInitialDown.x = (mousedowncoords.x - offset.x);
                mouseInitialDown.y = (mousedowncoords.y - offset.y);
                
                units = getUnitVertCoordinates();
                bounds = findBounds(currentMouse, mousedowncoords);
                
                for(var i = 0; i < units.length; i++) {
                    inside = withinBounds(units[i].pos, bounds);
                    if(inside && (dupeCheck[units[i].id] === undefined)){
                        selectedUnits.push(units[i]);
                        dupeCheck[units[i].name] = true;
                    }
                }
                
                return selectedUnits;
            },

            // takes the mouse up and mouse down positions and calculates an origin
            // and delta for the square.
            // this is compared to the unprojected XY centroids of the cubes.
            findBounds: function(pos1, pos2) {
                
                // calculating the origin and vector.
                var origin = {},
                    delta = {};
                
                if (pos1.y < pos2.y) {
                    origin.y = pos1.y;
                    delta.y = pos2.y - pos1.y;
                } else {
                    origin.y = pos2.y;
                    delta.y = pos1.y - pos2.y;
                }
                
                if(pos1.x < pos2.x) {
                    origin.x = pos1.x;
                    delta.x = pos2.x - pos1.x;
                } else {
                    origin.x = pos2.x;
                    delta.x = pos1.x - pos2.x;
                }
                return ({origin: origin, delta: delta});
            },


            // Takes a position and detect if it is within delta of the origin defined by findBounds ({origin, delta})
            withinBounds: function(pos, bounds) {
                
                var ox = bounds.origin.x,
                    dx = bounds.origin.x + bounds.delta.x,
                    oy = bounds.origin.y,
                    dy = bounds.origin.y + bounds.delta.y;
                
                if((pos.x >= ox) && (pos.x <= dx)) {
                    if((pos.y >= oy) && (pos.y <= dy)) {
                        return true;
                    }
                }
                
                return false;
            },

            getUnitVertCoordinates: function(threeJsContext) {
                
                var units = [],
                    verts = [],
                    child,
                    prevChild,
                    unit,
                    vector,
                    pos,
                    temp,
                    i, q;
                
                for(i = 0; i < demo.collisions.length; i++) {
                    child = demo.collisions[i];
                    child.updateMatrixWorld();
                    
                    verts = [
                        child.geometry.vertices[0],
                        child.geometry.vertices[1],
                        child.geometry.vertices[2],
                        child.geometry.vertices[3],
                        child.geometry.vertices[4],
                        child.geometry.vertices[5],
                        child.geometry.vertices[6],
                        child.geometry.vertices[7]
                    ];
                    
                    for(q = 0; q < verts.length; q++) {
                        vector = verts[q].clone();
                        vector.applyMatrix4(child.matrixWorld);
                        unit = {};
                        unit.id = child.id;
                        unit.mesh = child;
                        unit.pos = toScreenXY(vector);;
                        units.push(unit);
                    }
                }
                return units;
            },

            toScreenXY: function(position) {
                
                var pos = position.clone();
                var projScreenMat = new THREE.Matrix4();
                projScreenMat.multiplyMatrices( demo.cameras.liveCam.projectionMatrix, demo.cameras.liveCam.matrixWorldInverse );
                pos.applyProjection(projScreenMat);
                
                return { x: ( pos.x + 1 ) * demo.jqContainer.width() / 2 + demo.jqContainer.offset().left,
                        y: ( - pos.y + 1) * demo.jqContainer.height() / 2 + demo.jqContainer.offset().top };
            }
        }
        // end marquee object
        */
    }
        
});
