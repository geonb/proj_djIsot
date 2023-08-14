"use strict";

// Declare app level module which depends on views, and components
var myApp;
myApp = angular.module('myApp', [
    'lvl.services',
    'ngRoute',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'ngMouseDrag'])
/*
 .config(.$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
 $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'RawCtrl'});
 $routeProvider.otherwise({redirectTo: '/'});
 $locationProvider.html5Mode(true);
 }])
 */
    .filter('mod2', function () {
        return function (input) {
            return input % 2;
        };
    })
    .filter('noround', function () {
        return function (input) {
            return parseInt(input);
        };
    })
    .filter('index', function func_index() {
// This filter must be called AFTER 'filter'ing
//  and BEFORE 'orderBy' to be useful.
        return ( function (array, index_name) {
            index_name = index_name || 'index';
            for (var it = 0; it < array.length; it++) {
                array[index_name] = it;
            }
            return ( array );
        });
    })
    .controller('ctrl', ['$rootScope', '$timeout', '$scope', '$sce', function ($rootScope, $timeout, $scope, $sce) {

        //$rootScope.action = 0;
        //$rootScope.$applyAsync();
        var arrLeg = [];
        $rootScope.storeProj = {};
        $rootScope.storeProj.cardcontroll = [];
        $rootScope.storeProj.itemsD = [];
        $rootScope.storeProj.SVG_Element = [];
        $rootScope.storeProj.chkSCVal = 0;
        $rootScope.storeProj.headline = [];
        $rootScope.storeProj.yPosLine = [];
        $rootScope.storeProj.stroke_scale = 1;
        $rootScope.storeProj.scale = [];
        $rootScope.storeProj.colorCL = 0;

        $rootScope.reader = new FileReader();
        $rootScope.table_limit = {};
        $rootScope.workbook = {};
        $rootScope.sheet_name = {};
        $rootScope.worksheet = {};
        $rootScope.limit = {};
        $rootScope.cntArr = [];
        $rootScope.load = false;

        $rootScope.storeProj.name = {};
        $rootScope.storeProj.ck = 0;
        $rootScope.storeProj.it = [];
        $rootScope.storeProj.grVal = [];

        $rootScope.storeProj.ctrR = 0;
        $rootScope.storeProj.ctrC = 0;

        $rootScope.storeProj.max = [];
        $rootScope.storeProj.max3 = [];
        $rootScope.storeProj.ctrDrT1R1 = [];
        $rootScope.storeProj.ctrDcT1C1 = [];

        $rootScope.storeProj.dFldRT1R1 = [];
        $rootScope.storeProj.dFldCT1C1 = [];

        $rootScope.storeProj.slider = [];
        var slides = $rootScope.storeProj.slides = [];
        var currIndex = 0;

        $rootScope.storeProj.inpVal = [];

        $rootScope.storeProj.tmpItem = [];

        $rootScope.storeProj.isoElem = [];

        $rootScope.storeProj.SVG_Elem = [];
        $rootScope.storeProj.SVG_sim = [];

        $rootScope.storeProj.SVG_Leg = [];
        $rootScope.storeProj.tmpLeg = [];

        $rootScope.storeProj.valSc = [];

        $rootScope.T_h1 = $('.cnt_res').height() - $('.view1').height();

        $rootScope.storeProj.colVar = [];
        $rootScope.storeProj.addChk = 0;
        $rootScope.jsonBlob = {};
        $rootScope.storeProj.colors = [];

        $rootScope.storeProj.maxPow = [];
        $rootScope.storeProj.slideID = 0;
        $rootScope.func_posT1R = function (id) {
            return 230 * (id + 1);
        };
        $rootScope.func_posT1C = function (id) {
            return 100 * (id + 1);
        };
        // Button für Ausblenden und plain Preview
        var mod = 0;
        /*
         $rootScope.func_navIso = function (templ, sid) {
         if (templ == 0) {
         // nav menü for descr tags
         }
         if (templ == 1) {

         }

         };
         */
        $rootScope.storeProj.saveID = 0;
        $rootScope.func_noSave = function () {
            $('#submID').css('visibility', 'hidden');
        };
        function getRequest() {
            // Request erzeugen
            if (window.XMLHttpRequest) {
                request = new XMLHttpRequest(); // Mozilla, Safari, Opera
            } else if (window.ActiveXObject) {
                try {
                    request = new ActiveXObject('Msxml2.XMLHTTP'); // IE 5
                } catch (e) {
                    try {
                        request = new ActiveXObject('Microsoft.XMLHTTP'); // IE 6
                    } catch (e) {
                    }
                }
            }
            // überprüfen, ob Request erzeugt wurde
            if (!request) {
                alert("Kann keine XMLHTTP-Instanz erzeugen");
                return false;
            } else {
                var url = "http://127.0.0.1:80/databaseGet.php";

                request.open('get', url, true);
                var callback = (json) =>
                {
                    console.log(json['name']);
                    console.log(json['date']);
                    console.log(json['jsonBlob']);
                    //Hier muss alles gemacht werden
                };
                request.onreadystatechange = () =>
                {
                    interpretGetRequest(callback);
                };
                request.send();
            }
        }

        function interpretGetRequest(callback) {
            switch (request.readyState) {
                case 4:
                    if (request.status != 200) {
                        alert("Der Request wurde abgeschlossen, ist aber nicht OK\nFehler:" + request.status);
                    } else {
                        var content = request.responseText;
                        let json = JSON.parse(content);
                        callback(json);
                    }
                    break;
                default:
                    break;
            }
        }


        $rootScope.func_load = function () {
            getRequest();

            $rootScope.storeProj = {};
            $rootScope.storeProj = $rootScope.jsonBlob;
            var it_nf = 0;
            for (it_nf = 0; it_nf < $rootScope.storeProj.SVG_Element.length; it_nf++) {
                d3.select('#viewNavigation_bottom').append('div').attr('id', 'tmp_SVG' + it_nf).style('visibility', 'hidden');
                SVG_Element[it_nf] = $rootScope.storeProj.SVG_Element[it_nf];
                var it_f = 1 / 10000;
                $('#tmp_SVG' + it_nf).find('svg').attr('width', $('#tmp_SVG' + 0).find('svg').attr('viewBox').split(' ')[2]);
                $('#tmp_SVG' + it_nf).find('svg').attr('height', $('#tmp_SVG' + 0).find('svg').attr('viewBox').split(' ')[3]);
                for (var it_s = 1; ($('#tmp_SVG' + it_nf).find('svg').width() * it_f) <= 56; it_s++) {
                    it_f = it_s / 10000;
                }
                $('#tmp_SVG' + it_nf).find('svg').attr('width', $('#tmp_SVG' + it_nf).find('svg').width() * it_f);
                $('#tmp_SVG' + it_nf).find('svg').attr('height', $('#tmp_SVG' + it_nf).find('svg').height() * it_f);
                for (it_s = 1; ($('#tmp_SVG' + 0).find('svg').attr('viewBox').split(' ')[2] * it_f) <= 56; it_s++) {
                    it_f = it_s / 10000;
                }
                $('#tmp_SVG' + it_nf).find('path').attr('stroke-width', it_f);
                $('#tmp_SVG' + it_nf).find('rect').attr('stroke-width', it_f);
                $('#tmp_SVG' + it_nf).find('line').attr('stroke-width', it_f);
                $('#tmp_SVG' + it_nf).find('circle').attr('stroke-width', it_f);
                $('#tmp_SVG' + it_nf).find('ellipse').attr('stroke-width', it_f);
                $('#tmp_SVG' + it_nf).find('polygon').attr('stroke-width', it_f);
                $('#tmp_SVG' + it_nf).find('pattern').attr('stroke-width', it_f);
                d3.select('#ListSVG_Element').append('div').attr('id', 'svg_dragID_' + it_nf).style('float', 'left').attr('class', 'dragCL').attr('width', 56).attr('height', 56).on('mousedown', function () {
                    func_op1(this.id.split('_')[2]);
                }).on('mouseup', function () {
                    func_op2(this.id.split('_')[2]);
                }).append(function () {
                    var parser = new DOMParser();
                    $(SVG_Element[it_nf][0][0])[0].innerHTML.replace('<!--?xml version="1.0" encoding="utf-8"?-->', '');
                    var doc;
                    doc = parser.parseFromString($(SVG_Element[it_nf][0][0])[0].innerHTML, "image/svg+xml");
                    return doc.documentElement;
                });
                getAbsoluteXY = function (element) {
                    var viewportElement = document.documentElement;
                    var box = element.getBoundingClientRect();
                    var scrollLeft = viewportElement.scrollLeft;
                    var scrollTop = viewportElement.scrollTop;
                    var x = box.left + scrollLeft;
                    var y = box.top + scrollTop;
                    return {"x": x, "y": y}
                };
                var idD = 'none';
                $.fn.loop = function (callback, thisArg) {
                    var me = this;
                    return this.each(function (index, element) {
                        return callback.call(thisArg || element, element, index, me);
                    });
                };
                $('#svg_dragID_' + it_nf).draggable({
                    zIndex: 20,
                    helper: 'clone',
                    refreshPositions: true,
                    appendTo: 'html',
                    start: function (event, ui) {
                        ui.helper.id = 'svg_dragID_h' + it_nf;
                        ui.helper.class = 'dragCL_h';
                    },
                    drag: function (event, ui) {
                        $('.dropCL').loop(function (element, index, set) {
                            if ((ui.offset.left >= getAbsoluteXY(element).x - 35 && ui.offset.left <= getAbsoluteXY(element).x + 0) && (ui.offset.top + 0 >= getAbsoluteXY(element).y - 35 && ui.offset.top <= getAbsoluteXY(element).y)) {
                                $(element).css('fill', 'rgb(111, 111, 255)');
                            } else {
                                $(element).css('fill', 'rgb(166, 166, 166)');
                            }
                        });
                    },
                    stop: function (event, ui) {
                        var arrDrop = d3.selectAll('.dropCL')[0];
                        for (var it = 0; it < arrDrop.length; it++) {
                            if ((ui.offset.left >= getAbsoluteXY($(arrDrop[it])[0]).x - 35 && ui.offset.left <= getAbsoluteXY($(arrDrop[it])[0]).x + 0) && (ui.offset.top >= getAbsoluteXY($(arrDrop[it])[0]).y - 35 && ui.offset.top <= getAbsoluteXY($(arrDrop[it])[0]).y) + 0) {
                                SVG_el = $('#tmp_SVG' + this.id.split('_')[2]);
                                SVG_sim = parseInt(this.id.split('_')[2]) + 1;
                                idVal = $(arrDrop[it])[0].id;
                                //$('#' + idVal).css('fill', 'rgb(166, 166, 166)');
                                $('#' + idVal).trigger('drop');
                            }
                        }
                    },
                    refreshPositions: true,
                    obstacle: '.dragCL_h',
                    preventCollision: true,
                });
                var it_f = 1 / 10000;
                $('#tmp_SVG' + it_nf).find('svg').attr('width', $('#tmp_SVG' + 0).find('svg').attr('viewBox').split(' ')[2]);
                $('#tmp_SVG' + it_nf).find('svg').attr('height', $('#tmp_SVG' + 0).find('svg').attr('viewBox').split(' ')[3]);
                for (it_s = 1; ($('#tmp_SVG' + it_nf).find('svg').width() * it_f) <= 28; it_s++) {
                    it_f = it_s / 10000;
                }
                console.log($('#tmp_SVG' + it_nf).find('svg').attr('stroke-width'));
                $('#tmp_SVG' + it_nf).find('svg').attr('width', $('#tmp_SVG' + it_nf).find('svg').width() * it_f);
                $('#tmp_SVG' + it_nf).find('svg').attr('height', $('#tmp_SVG' + it_nf).find('svg').height() * it_f);
                for (it_s = 1; ($('#tmp_SVG' + 0).find('svg').attr('viewBox').split(' ')[2] * it_f) <= 28; it_s++) {
                    it_f = it_s / 10000;
                }
            }
            it_nFile = it_nf;

            /*
             $rootScope.storeProj.slides = $rootScope.storeProj.slides;
             slides = $rootScope.storeProj.slides;
             $rootScope.storeProj.tmpLeg = [];
             $rootScope.storeProj.SVG_Leg = [];
             $rootScope.storeProj.dFldCT1C1 = [];
             $rootScope.storeProj.dFldRT1R1 = [];
             $rootScope.storeProj.grVal = [];
             $rootScope.storeProj.items = [];

             for (var it_r = 0; it_r < $rootScope.storeProj.items.length; it_r++) {
             $rootScope.storeProj.items[it_r] = [];
             for (var it_c = 0; it_c < $rootScope.storeProj.items[it_r].length; it_c++) {
             $rootScope.storeProj.items[it_r][it_c] = {};
             $rootScope.storeProj.items[it_r][it_c].dragabble = $rootScope.storeProj.items[it_r][it_c].dragabble;
             $rootScope.storeProj.items[it_r][it_c].value = $rootScope.storeProj.items[it_r][it_c].value;
             $rootScope.storeProj.items[it_r][it_c].row = $rootScope.storeProj.items[it_r][it_c].row;
             $rootScope.storeProj.items[it_r][it_c].col = $rootScope.storeProj.items[it_r][it_c].col;
             }
             }
             for (var i = 0; i < $rootScope.storeProj.slides.length; i++) {
             $rootScope.storeProj.tmpLeg[i] = {};
             $rootScope.storeProj.SVG_Leg[i] = {};
             $rootScope.storeProj.dFldCT1C1[i] = [];
             $rootScope.storeProj.dFldRT1R1[i] = [];
             $rootScope.storeProj.grVal[i] = {};
             for (var it_s = 0; it_s < $rootScope.storeProj.tmpLeg[i].length; it_s++) {
             $rootScope.storeProj.tmpLeg[i].elem[it_s] = $rootScope.storeProj.tmpLeg[i].elem[it_s];
             $rootScope.storeProj.tmpLeg[i].sims[it_s] = $rootScope.storeProj.tmpLeg[i].sims[it_s];
             $rootScope.storeProj.tmpLeg[i].valt[it_s] = $rootScope.storeProj.tmpLeg[i].valt[it_s];
             $rootScope.storeProj.tmpLeg[i].lock[it_s] = $rootScope.storeProj.tmpLeg[i].lock[it_s];
             $rootScope.storeProj.tmpLeg[i].row[it_s] = $rootScope.storeProj.tmpLeg[i].row[it_s];
             $rootScope.storeProj.tmpLeg[i].col[it_s] = $rootScope.storeProj.tmpLeg[i].col[it_s];
             }
             $rootScope.storeProj.SVG_Leg[i].elem = [];
             $rootScope.storeProj.SVG_Leg[i].sims = [];
             $rootScope.storeProj.SVG_Leg[i].valt = [];
             $rootScope.storeProj.SVG_Leg[i].lock = [];
             $rootScope.storeProj.SVG_Leg[i].row = [];
             $rootScope.storeProj.SVG_Leg[i].col = [];
             for (var it_1 = 0; it_1 < $rootScope.storeProj.SVG_Leg[i].length; it_1++) {
             $rootScope.storeProj.SVG_Leg[i].elem[it_1] = [];
             $rootScope.storeProj.SVG_Leg[i].sims[it_1] = [];
             $rootScope.storeProj.SVG_Leg[i].valt[it_1] = [];
             $rootScope.storeProj.SVG_Leg[i].lock[it_1] = [];
             $rootScope.storeProj.SVG_Leg[i].row[it_1] = [];
             $rootScope.storeProj.SVG_Leg[i].col[it_1] = [];
             for (var it_2 = 0; it_2 < $rootScope.storeProj.SVG_Leg[i][it_1].length; it_2++) {
             $rootScope.storeProj.SVG_Leg[i].elem[it_1][it_2] = $rootScope.storeProj.SVG_Leg[i].elem[it_1][it_2];
             $rootScope.storeProj.SVG_Leg[i].sims[it_1][it_2] = $rootScope.storeProj.SVG_Leg[i].sims[it_1][it_2];
             $rootScope.storeProj.SVG_Leg[i].valt[it_1][it_2] = $rootScope.storeProj.SVG_Leg[i].valt[it_1][it_2];
             $rootScope.storeProj.SVG_Leg[i].lock[it_1][it_2] = $rootScope.storeProj.SVG_Leg[i].lock[it_1][it_2];
             $rootScope.storeProj.SVG_Leg[i].row[it_1][it_2] = $rootScope.storeProj.SVG_Leg[i].row[it_1][it_2];
             $rootScope.storeProj.SVG_Leg[i].col[it_1][it_2] = $rootScope.storeProj.SVG_Leg[i].col[it_1][it_2];
             }
             }
             for (var it = 0; it < $rootScope.storeProj.dflC[i].length; it++) {
             $rootScope.storeProj.dFldCT1C1[i][it] = {};
             $rootScope.storeProj.dFldCT1C1[i][it].vc = $rootScope.storeProj.dflC[i][it].grv[it];
             $rootScope.storeProj.dFldCT1C1[i][it].grp = $rootScope.storeProj.dflC[i][it].grp[it];
             $rootScope.storeProj.dFldCT1C1[i][it].max = $rootScope.storeProj.dflC[i][it].max[it];
             $rootScope.storeProj.dFldCT1C1[i][it].rlen = $rootScope.storeProj.dflC[i][it].rlen[it];
             }
             for (it = 0; it < $rootScope.storeProj.dflR[i].length; it++) {
             $rootScope.storeProj.dFldRT1R1[i][it] = {};
             $rootScope.storeProj.dFldRT1R1[i][it].vc = $rootScope.storeProj.dflR[i][it].grv[it];
             $rootScope.storeProj.dFldRT1R1[i][it].grp = $rootScope.storeProj.dflR[i][it].grp[it];
             $rootScope.storeProj.dFldRT1R1[i][it].max = $rootScope.storeProj.dflR[i][it].max[it];
             $rootScope.storeProj.dFldRT1R1[i][it].clen = $rootScope.storeProj.dflR[i][it].clen[it];
             }
             $rootScope.storeProj.grVal[i].v = $rootScope.storeProj.grVal[i].v;
             $rootScope.storeProj.grVal[i].p = $rootScope.storeProj.grVal[i].g;
             */
            for (var it = 0; it < $rootScope.storeProj.slides.length; it++) {
                $rootScope.func_iFace(0, it);
            }
        };
        $rootScope.func_submSave = function () {
            var fd = new FormData();
            /*
             $rootScope.storeProj.template = [];
             $rootScope.storeProj.tmpLeg = [];
             $rootScope.storeProj.SVG_Leg = [];
             $rootScope.storeProj.dflR = [];
             $rootScope.storeProj.dflC = [];
             $rootScope.storeProj.grVal = [];
             $rootScope.storeProj.items = [];
             if (!$('#projName').val().match(/^\s+$|^$/gi) && $('#projName').val() != "") {
             $rootScope.storeProj.id = $rootScope.storeProj.saveID;
             $rootScope.storeProj.name = $('#projName').val();
             $rootScope.storeProj.date = $.datepicker.formatDate("yy-mm-d", new Date());
             }
             for (var i = 0; i < $rootScope.storeProj.slides.length; i++) {
             $rootScope.storeProj.template[i] = $rootScope.storeProj.slides[i].tmp;
             $rootScope.storeProj.tmpLeg[i] = {};
             $rootScope.storeProj.SVG_Leg[i] = [];
             $rootScope.storeProj.dflR[i] = [];
             $rootScope.storeProj.dflC[i] = [];
             for (var it_s = 0; it_s < $rootScope.storeProj.tmpLeg[i].length; it_s++) {
             $rootScope.storeProj.tmpLeg[i].elem = [];
             $rootScope.storeProj.tmpLeg[i].elem[it_s] = $rootScope.storeProj.tmpLeg[i][it_s].elem["0"].innerHTML;
             $rootScope.storeProj.tmpLeg[i].sims = [];
             $rootScope.storeProj.tmpLeg[i].sims[it_s] = $rootScope.storeProj.tmpLeg[i][it_s].sims;
             $rootScope.storeProj.tmpLeg[i].valt = [];
             $rootScope.storeProj.tmpLeg[i].valt[it_s] = $rootScope.storeProj.tmpLeg[i][it_s].valt;
             $rootScope.storeProj.tmpLeg[i].lock = [];
             $rootScope.storeProj.tmpLeg[i].lock[it_s] = $rootScope.storeProj.tmpLeg[i][it_s].lock;
             $rootScope.storeProj.tmpLeg[i].row = [];
             $rootScope.storeProj.tmpLeg[i].row[it_s] = $rootScope.storeProj.tmpLeg[i][it_s].row;
             $rootScope.storeProj.tmpLeg[i].col = [];
             $rootScope.storeProj.tmpLeg[i].col[it_s] = $rootScope.storeProj.tmpLeg[i][it_s].col;
             }
             for (var it_1 = 0; it_1 < $rootScope.storeProj.SVG_Leg[i].length; it_1++) {
             $rootScope.storeProj.SVG_Leg[i] = {};
             $rootScope.storeProj.SVG_Leg[i].elem = [];
             $rootScope.storeProj.SVG_Leg[i].sims = [];
             $rootScope.storeProj.SVG_Leg[i].valt = [];
             $rootScope.storeProj.SVG_Leg[i].lock = [];
             $rootScope.storeProj.SVG_Leg[i].row = [];
             $rootScope.storeProj.SVG_Leg[i].col = [];
             for (var it_2 = 0; it_2 < $rootScope.storeProj.SVG_Leg[i][it_1].length; it_2++) {
             $rootScope.storeProj.SVG_Leg[i].elem[it_1] = [];
             $rootScope.storeProj.SVG_Leg[i].elem[it_1][it_2] = $rootScope.storeProj.SVG_Leg[i][it_1][it_2].elem["0"].innerHTML;
             $rootScope.storeProj.SVG_Leg[i].sims[it_1] = [];
             $rootScope.storeProj.SVG_Leg[i].sims[it_1][it_2] = $rootScope.storeProj.SVG_Leg[i][it_1][it_2].sims;
             $rootScope.storeProj.SVG_Leg[i].valt[it_1] = [];
             $rootScope.storeProj.SVG_Leg[i].valt[it_1][it_2] = $rootScope.storeProj.SVG_Leg[i][it_1][it_2].valt;
             $rootScope.storeProj.SVG_Leg[i].lock[it_1] = [];
             $rootScope.storeProj.SVG_Leg[i].lock[it_1][it_2] = $rootScope.storeProj.SVG_Leg[i][it_1][it_2].lock;
             $rootScope.storeProj.SVG_Leg[i].row[it_1] = [];
             $rootScope.storeProj.SVG_Leg[i].row[it_1][it_2] = $rootScope.storeProj.SVG_Leg[i][it_1][it_2].row;
             $rootScope.storeProj.SVG_Leg[i].col[it_1] = [];
             $rootScope.storeProj.SVG_Leg[i].col[it_1][it_2] = $rootScope.storeProj.SVG_Leg[i][it_1][it_2].col;

             }
             }
             for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[i].length; it++) {
             $rootScope.storeProj.dflC[i][it] = {};
             $rootScope.storeProj.dflC[i][it].grv = [];
             $rootScope.storeProj.dflC[i][it].grv[it] = $rootScope.storeProj.dFldCT1C1[i][it].vc;
             $rootScope.storeProj.dflC[i][it].grp = [];
             $rootScope.storeProj.dflC[i][it].grp[it] = $rootScope.storeProj.dFldCT1C1[i][it].grp;
             $rootScope.storeProj.dflC[i][it].max = [];
             $rootScope.storeProj.dflC[i][it].max[it] = $rootScope.storeProj.dFldCT1C1[i][it].max;
             $rootScope.storeProj.dflC[i][it].rlen = [];
             $rootScope.storeProj.dflC[i][it].rlen[it] = $rootScope.storeProj.dFldCT1C1[i][it].rlen;
             }
             for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[i].length; it++) {
             $rootScope.storeProj.dflR[i][it] = {};
             $rootScope.storeProj.dflR[i][it].grv = [];
             $rootScope.storeProj.dflR[i][it].grv[it] = $rootScope.storeProj.dFldRT1R1[i][it].vc;
             $rootScope.storeProj.dflR[i][it].grp = [];
             $rootScope.storeProj.dflR[i][it].grp[it] =$rootScope.storeProj.dFldRT1R1[i][it].grp;
             $rootScope.storeProj.dflR[i][it].max = [];
             $rootScope.storeProj.dflR[i][it].max[it] = $rootScope.storeProj.dFldRT1R1[i][it].max;
             $rootScope.storeProj.dflR[i][it].clen = [];
             $rootScope.storeProj.dflR[i][it].clen[it] = $rootScope.storeProj.dFldRT1R1[i][it].rlen;
             }
             $rootScope.storeProj.grVal[i] = {};
             $rootScope.storeProj.grVal[i].v = $rootScope.storeProj.grVal[i].v;
             $rootScope.storeProj.grVal[i].g = $rootScope.storeProj.grVal[i].p;
             }
             for (var it_1 = 0; it_1 < $rootScope.storeProj.items.length; it_1++) {
             $rootScope.storeProj.items[it_1] = [];
             for (var it_2 = 0; it_2 < $rootScope.storeProj.items[it_1].length; it_2++) {
             $rootScope.storeProj.items[it_1][it_2] = {};
             $rootScope.storeProj.items[it_1][it_2].dragabble = $rootScope.storeProj.items[it_1][it_2].draggable;
             $rootScope.storeProj.items[it_1][it_2].value = $rootScope.storeProj.items[it_1][it_2].value;
             $rootScope.storeProj.items[it_1][it_2].row = $rootScope.storeProj.items[it_1][it_2].row;
             $rootScope.storeProj.items[it_1][it_2].col = $rootScope.storeProj.items[it_1][it_2].colf;
             }
             }
             console.log($rootScope.storeProj);
             */
            $('.mnXr').remove();
            $('.mnXc').remove();
            $rootScope.storeProj.SVG_Element = SVG_Element;

            $rootScope.jsonBlob = $rootScope.storeProj;

            $rootScope.storeProj = {};
            $rootScope.storeProj.chkSCVal = 0;
            $rootScope.storeProj.headline = [];
            $rootScope.storeProj.yPosLine = [];
            $rootScope.storeProj.stroke_scale = 1;
            $rootScope.storeProj.scale = [];
            $rootScope.storeProj.colorCL = 0;


            $rootScope.storeProj.name = {};
            $rootScope.storeProj.ck = 0;
            $rootScope.storeProj.it = [];
            $rootScope.storeProj.grVal = [];

            $rootScope.storeProj.ctrR = 0;
            $rootScope.storeProj.ctrC = 0;

            $rootScope.storeProj.max = [];
            $rootScope.storeProj.max3 = [];
            $rootScope.storeProj.ctrDrT1R1 = [];
            $rootScope.storeProj.ctrDcT1C1 = [];

            $rootScope.storeProj.dFldRT1R1 = [];
            $rootScope.storeProj.dFldCT1C1 = [];

            $rootScope.storeProj.slider = [];
            slides = $rootScope.storeProj.slides = [];
            currIndex = 0;

            $rootScope.storeProj.inpVal = [];

            $rootScope.storeProj.tmpItem = [];

            $rootScope.storeProj.isoElem = [];

            $rootScope.storeProj.SVG_Elem = [];
            $rootScope.storeProj.SVG_sim = [];

            $rootScope.storeProj.SVG_Leg = [];
            $rootScope.storeProj.tmpLeg = [];

            $rootScope.storeProj.valSc = [];

            $rootScope.storeProj.colVar = [];
            $rootScope.storeProj.addChk = 0;
            $rootScope.storeProj.colors = [];

            $rootScope.storeProj.maxPow = [];
            $rootScope.storeProj.slideID = 0;

            $rootScope.storeProj.SVG_Element = [];
            $('#ListSVG_Element').children().remove();
            $rootScope.newSlider();
            $rootScope.$applyAsync();
            /*
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.chkSCVal));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.headline));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.yPosLine));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.stroke_scale));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.scale ));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.colorCL));


             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.name));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.ck ));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.it));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.grVal));

             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.ctrR));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.ctrC));

             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.max));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.max3));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.ctrDrT1R1));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.ctrDcT1C1));

             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.dFldRT1R1));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.dFldCT1C1));

             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.slider));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.slides));


             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.inpVal));

             //$rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.tmpItem));

             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.isoElem));

             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.SVG_Elem));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.SVG_sim));

             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.SVG_Leg));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.tmpLeg));

             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.valSc));


             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.colVar));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.addChk));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.colors));

             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.maxPow));
             $rootScope.jsonBlob.push(JSON.stringify($rootScope.storeProj.slideID));
             */
            // store into db (additional objects for Templates needed then
            $rootScope.storeProj.saveID++;
            fd.append('name', $('#projName').val());
            fd.append('date', $.datepicker.formatDate("yy-mm-d", new Date()));
            fd.append('jsonBlob', JSON.stringify($rootScope.jsonBlob));

            fd.forEach((fd) => console.log(fd)
            )
            ;
            $('#submID').css('visibility', 'hidden');
            setRequest(fd);
        };

        var request = false;

        function setRequest(sendParam) {
            // Request erzeugen
            if (window.XMLHttpRequest) {
                request = new XMLHttpRequest(); // Mozilla, Safari, Opera
            } else if (window.ActiveXObject) {
                try {
                    request = new ActiveXObject('Msxml2.XMLHTTP'); // IE 5
                } catch (e) {
                    try {
                        request = new ActiveXObject('Microsoft.XMLHTTP'); // IE 6
                    } catch (e) {
                    }
                }
            }
            // überprüfen, ob Request erzeugt wurde
            if (!request) {
                alert("Kann keine XMLHTTP-Instanz erzeugen");
                return false;
            } else {
                var url = "http://127.0.0.1:80/database.php";
                // Request öffnen
                request.open('post', url, true);
                // Request senden
                request.send(sendParam);
                // Request auswerten
                request.onreadystatechange = interpretRequest;
            }
        }

        // Request auswerten
        function interpretRequest() {
            switch (request.readyState) {
                // wenn der readyState 4 und der request.status 200 ist, dann ist alles korrekt gelaufen
                case 4:
                    if (request.status != 200) {
                        alert("Der Request wurde abgeschlossen, ist aber nicht OK\nFehler:" + request.status);
                    } else {
                        var content = request.responseText;
                        // den Inhalt de s Requests in das <div> schreiben
                        document.getElementById('content').innerHTML = content;
                    }
                    break;
                default:
                    break;
            }
        }
        $rootScope.func_save = function () {
            $('#submID').css('visibility', 'visible');
        };
        $rootScope.storeProj.tmpCR = [];
        var cnt = 0;
        $rootScope.func_op1 = function () {
            $('.mnXr').fadeTo(1, 1);
            $('.mnXc').fadeTo(1, 1);
            //$rootScope.action = 1;
        };
        $rootScope.func_op2 = function () {
            $('.mnXr').fadeTo(1, 0);
            $('.mnXc').fadeTo(1, 0);
            //$rootScope.action = 0;
            //$rootScope.$applyAsync();
            //$rootScope.func_iFace(slides[$rootScope.storeProj.slideID].tmp, $rootScope.storeProj.slideID);
        };
        $rootScope.func_chkLeg = function (sid) {
            for (var it1 = 0; it1 < $rootScope.storeProj.SVG_Leg[sid].length; it1++) {
                for (var it2 = 0; it2 < $rootScope.storeProj.SVG_Leg[sid][it1].length; it2++) {
                    arrLeg.push($rootScope.storeProj.SVG_Leg[sid][it1][it2]);
                }
            }
            return $rootScope.unique(arrLeg, arrLeg);
        };
        $rootScope.unique = function (a, b) {
            b.sort(function (a, b) {
                return (a.sims > b.sims ? 1 : b.sims > a.sims ? -1 : 0);
            });
            for (var i = 0; i < b.length; i++) {
                if (b[i] == undefined) {
                    b.splice(i, 1);
                    i--;
                }
            }
            for (var i = 1; i < b.length;) {
                if (b[i - 1].sims == b[i].sims) {
                    b.splice(i - 1, 1);
                } else {
                    i++;
                }
            }
            return b;
        };
        $rootScope.func_initDropped = function (tmpVal, sid, idEl) {
            var tmpObj = {};
            tmpObj.elem = $('#tmpSVG_def');
            tmpObj.sims = 0;
            tmpObj.lock = 0;
            tmpObj.valt = 1;
            if (idEl.split('_')[1] == 'dropIDR') {
                for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                    $rootScope.storeProj.SVG_Elem[sid][idEl.split('_')[2]][it] = tmpObj.elem;
                    $rootScope.storeProj.SVG_sim[sid][idEl.split('_')[2]][it] = tmpObj.sims;
                    $rootScope.storeProj.SVG_Leg[sid][idEl.split('_')[2]][it] = tmpObj;
                    $rootScope.storeProj.SVG_Leg[sid][idEl.split('_')[2]][it].row = parseInt(idEl.split('_')[2]);
                    $rootScope.storeProj.SVG_Leg[sid][idEl.split('_')[2]][it].col = it;
                    $rootScope.storeProj.SVG_Leg[sid][idEl.split('_')[2]][it].descrR = 0;
                    $rootScope.storeProj.SVG_Leg[sid][idEl.split('_')[2]][it].descrC = 0;
                    $rootScope.storeProj.SVG_Leg[sid][idEl.split('_')[2]][it].lockInp = 0;
                    if ($rootScope.storeProj.SVG_Elem[sid][0][it].sims != 0) {
                        $rootScope.storeProj.SVG_Elem[sid][idEl.split('_')[2]][it] = $rootScope.storeProj.SVG_Elem[sid][0][it];
                        $rootScope.storeProj.SVG_sim[sid][idEl.split('_')[2]][it] = $rootScope.storeProj.SVG_sim[sid][0][it];
                        $rootScope.storeProj.SVG_Leg[sid][idEl.split('_')[2]][it] = $rootScope.storeProj.SVG_Leg[sid][0][it];
                        $rootScope.storeProj.SVG_Leg[sid][idEl.split('_')[2]][it].row = parseInt(idEl.split('_')[2]);
                        $rootScope.storeProj.SVG_Leg[sid][idEl.split('_')[2]][it].col = it;
                        $rootScope.storeProj.SVG_Leg[sid][idEl.split('_')[2]][it].descrR = 0;
                        $rootScope.storeProj.SVG_Leg[sid][idEl.split('_')[2]][it].descrC = 0;
                        $rootScope.storeProj.SVG_Leg[sid][idEl.split('_')[2]][it].lockInp = 0;
                    }

                }
            }
            if (idEl.split('_')[1] == 'dropIDC') {
                for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                    $rootScope.storeProj.SVG_Elem[sid][it_r][idEl.split('_')[2]] = tmpObj.elem;
                    $rootScope.storeProj.SVG_sim[sid][it_r][idEl.split('_')[2]] = tmpObj.sims;
                    $rootScope.storeProj.SVG_Leg[sid][it_r][idEl.split('_')[2]] = tmpObj;
                    $rootScope.storeProj.SVG_Leg[sid][it_r][idEl.split('_')[2]].row = it_r;
                    $rootScope.storeProj.SVG_Leg[sid][it_r][idEl.split('_')[2]].col = parseInt(idEl.split('_')[2]);
                    $rootScope.storeProj.SVG_Leg[sid][it_r][idEl.split('_')[2]].descrR = 0;
                    $rootScope.storeProj.SVG_Leg[sid][it_r][idEl.split('_')[2]].descrC = 0;
                    $rootScope.storeProj.SVG_Leg[sid][it_r][idEl.split('_')[2]].lockInp = 0;
                    if ($rootScope.storeProj.SVG_Elem[sid][it_r][0].sims != 0) {
                        $rootScope.storeProj.SVG_Elem[sid][it_r][idEl.split('_')[2]] = $rootScope.storeProj.SVG_Elem[sid][it_r][0];
                        $rootScope.storeProj.SVG_sim[sid][it_r][idEl.split('_')[2]] = $rootScope.storeProj.SVG_sim[sid][it_r][0];
                        $rootScope.storeProj.SVG_Leg[sid][it_r][idEl.split('_')[2]] = $rootScope.storeProj.SVG_Leg[sid][it_r][0];
                        $rootScope.storeProj.SVG_Leg[sid][it_r][idEl.split('_')[2]].row = it_r;
                        $rootScope.storeProj.SVG_Leg[sid][it_r][idEl.split('_')[2]].col = parseInt(idEl.split('_')[2]);
                        $rootScope.storeProj.SVG_Leg[sid][it_r][idEl.split('_')[2]].descrR = 0;
                        $rootScope.storeProj.SVG_Leg[sid][it_r][idEl.split('_')[2]].descrC = 0;
                        $rootScope.storeProj.SVG_Leg[sid][it_r][idEl.split('_')[2]].lockInp = 0;
                    }
                }
            }
            $rootScope.func_calcLeg(tmpVal, sid);
        };
        $rootScope.func_calcLeg = function (tmpVal, sid) {
            arrLeg = [];
            $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);
        };
        $rootScope.func_svgDropped = function (tmpVal, sid, idEl) {
            var tmpObj = {};
            tmpObj.elem = SVG_el;
            tmpObj.sims = parseInt(SVG_sim + 1);
            tmpObj.lock = 0;
            tmpObj.valt = 1;
            $rootScope.storeProj.stroke_scale = it_scale;
            if (idEl.currentTarget.id.split('_')[1] == 'dropIDC') {
                for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                    $rootScope.storeProj.SVG_Elem[sid][it_r][idEl.currentTarget.id.split('_')[2]] = tmpObj.elem;
                    $rootScope.storeProj.SVG_sim[sid][it_r][idEl.currentTarget.id.split('_')[2]] = tmpObj.sims;
                    $rootScope.storeProj.SVG_Leg[sid][it_r][idEl.currentTarget.id.split('_')[2]] = tmpObj;
                    $rootScope.storeProj.SVG_Leg[sid][it_r][idEl.currentTarget.id.split('_')[2]].row = it_r;
                    $rootScope.storeProj.SVG_Leg[sid][it_r][idEl.currentTarget.id.split('_')[2]].col = parseInt(idEl.currentTarget.id.split('_')[3]);
                    $rootScope.storeProj.SVG_Leg[sid][it_r][idEl.currentTarget.id.split('_')[2]].descrR = 0;
                    $rootScope.storeProj.SVG_Leg[sid][it_r][idEl.currentTarget.id.split('_')[2]].descrC = 0;
                    $rootScope.storeProj.SVG_Leg[sid][it_r][idEl.currentTarget.id.split('_')[2]].lockInp = 0;
                }
            }
            if (idEl.currentTarget.id.split('_')[1] == 'dropIDR') {
                for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                    $rootScope.storeProj.SVG_Elem[sid][idEl.currentTarget.id.split('_')[2]][it] = tmpObj.elem;
                    $rootScope.storeProj.SVG_sim[sid][idEl.currentTarget.id.split('_')[2]][it] = tmpObj.sims;
                    $rootScope.storeProj.SVG_Leg[sid][idEl.currentTarget.id.split('_')[2]][it] = tmpObj;
                    $rootScope.storeProj.SVG_Leg[sid][idEl.currentTarget.id.split('_')[2]][it].row = parseInt(idEl.currentTarget.id.split('_')[3]);
                    $rootScope.storeProj.SVG_Leg[sid][idEl.currentTarget.id.split('_')[2]][it].col = it;
                    $rootScope.storeProj.SVG_Leg[sid][idEl.currentTarget.id.split('_')[2]][it].descrR = 0;
                    $rootScope.storeProj.SVG_Leg[sid][idEl.currentTarget.id.split('_')[2]][it].descrC = 0;
                    $rootScope.storeProj.SVG_Leg[sid][idEl.currentTarget.id.split('_')[2]][it].lockInp = 0;
                }
            }
            $rootScope.func_calcLeg(tmpVal, sid);
        };
        $rootScope.ctr1 = 0;
        $rootScope.ctr2 = 0;
        $rootScope.dropped = function (templ, dragEl, dropEl, sid, cellCR) {
            if ((dragEl.split('_')[1] == 0 && dragEl.split('_')[2] == 0 ) && ($rootScope.storeProj.dFldRT1R1[sid].length <= 1 && $rootScope.storeProj.dFldCT1C1[sid].length <= 1)) {
                if(templ == 4){
                    var retval = [];
                    $(".region").each(function(){
                        retval.push($(this).attr('id'))
                    });
                    var fortmp0 = 0;
                    var fortmp1 = 0;

                    //Analyse der Tabelle
                    for (var it = 0; it < retval.length; it++) {
                        var names = retval[it].split("-");
                        for (var los = 0; los < $rootScope.storeProj.items[0].length; los++) {
                            for(var i = 0; i < names.length; i ++){
                                if(names[i].toUpperCase() == $rootScope.storeProj.items[0][los].value.toUpperCase().replace(' ','_')){
                                    fortmp0++;
                                    break;
                                }
                            }
                        }
                        for (var los = 0; los < $rootScope.storeProj.items.length; los++) {
                            for(var i = 0; i < names.length; i ++){
                                if(names[i].toUpperCase() == $rootScope.storeProj.items[los][0].value.toUpperCase().replace(' ','_')){
                                    fortmp1++;
                                    break;
                                }
                            }
                        }
                    }

                    if ($rootScope.storeProj.dFldRT1R1[sid].length == 1) {
                        for (var it = 0; it < $rootScope.storeProj.ctrDcT1C1[sid]; it++) {
                            $rootScope.storeProj.dFldCT1C1[sid][it] = {'idC': it};
                            $rootScope.storeProj.dFldCT1C1[sid][it].max = 4;
                        }
                    }
                    if ($rootScope.storeProj.tmpItem[sid].row == undefined) {
                        $rootScope.storeProj.tmpItem[sid].row = [];
                    }
                    if ($rootScope.storeProj.tmpItem[sid].col == undefined) {
                        $rootScope.storeProj.tmpItem[sid].col = [];
                    }
                    if ($rootScope.storeProj.colVar[sid] == undefined) {
                        $rootScope.storeProj.colVar[sid] = [];
                    }
                    var lock = 0;

                    if(fortmp0 > fortmp1 || fortmp0 == 0 && fortmp1 == 0){
                        $rootScope.storeProj.tmpCR[sid] = 0;
                        for (var it_1 = 0; it_1 < $rootScope.storeProj.items.length; it_1++) {
                            if ($('#id_' + it_1 + '_0').val() !== "") {
                                if (it_1 > 0) {
                                    $rootScope.storeProj.tmpItem[sid].row.push($('#id_' + it_1 + '_0'));
                                    $('#T' + (templ + 1) + '_dropIDR_' + (it_1 - 1) + '_' + 0).hide();
                                    $rootScope.func_newD(0, sid);
                                    $rootScope.func_initDropped(templ, sid, '#T' + (templ + 1) + '_dropIDR_' + (it_1 - 1) + '_0');
                                }
                            }
                        }
                    }


                    if(fortmp1 > fortmp0 || fortmp0 == fortmp1 && fortmp0 != 0){
                        $rootScope.storeProj.tmpCR[sid] = 1;
                        for (var it_2 = 0; it_2 < $rootScope.storeProj.items[0].length; it_2++) {
                            if ($('#id_0_' + it_2).val() !== "") {
                                if (it_2 > 0) {
                                    $rootScope.storeProj.tmpItem[sid].row.push($('#id_0_' + it_2));
                                    $('#T' + (templ + 1) + '_dropIDR_0_' + (it_2-1)).hide();
                                    $rootScope.func_newD(0, sid);
                                    $rootScope.func_initDropped(templ, sid, '#T' + (templ + 1) + '_dropIDR_0_' + (it_2-1));
                                }
                            }
                        }
                    }

                }else {
                    $rootScope.storeProj.tmpCR[sid] = 0;
                    if ($rootScope.storeProj.dFldRT1R1[sid].length == 1) {
                        for (var it = 0; it < $rootScope.storeProj.ctrDcT1C1[sid]; it++) {
                            $rootScope.storeProj.dFldCT1C1[sid][it] = {'idC': it};
                            $rootScope.storeProj.dFldCT1C1[sid][it].max = 4;
                        }
                    }
                    if ($rootScope.storeProj.tmpItem[sid].row == undefined) {
                        $rootScope.storeProj.tmpItem[sid].row = [];
                    }
                    if ($rootScope.storeProj.tmpItem[sid].col == undefined) {
                        $rootScope.storeProj.tmpItem[sid].col = [];
                    }
                    if ($rootScope.storeProj.colVar[sid] == undefined) {
                        $rootScope.storeProj.colVar[sid] = [];
                    }
                    //clear the previously applied color, if it exists
                    // paste per drop to SVG vis?!
                    //$('#svgID_' + sid).append("<rect id='dEl-" + drag.attr('id') + "' width='300' height='100' style='fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)'>" + drag.val() + " <rect width='100' height='100' style='fill:rgb(255,0,0);stroke-width:3;stroke:rgb(0,0,0)'  id='del_" + drag.attr('id') + "' onclick='this.parentNode.parentNode.remove();'></rect></rect>");
                    //console.log("The element " + drag.attr('id') + " has been dropped on " + drop.attr('id') + "!");
                    // Template 1
                    var lock = 0;
                    for (var it_1 = 0; it_1 < $rootScope.storeProj.items.length; it_1++) {
                        for (var it_2 = 0; it_2 < $rootScope.storeProj.items[it_1].length; it_2++) {
                            if ($('#id_' + it_1 + '_' + it_2).val() !== "") {
                                if (it_2 == 0 && it_1 > 0) {
                                    $rootScope.storeProj.tmpItem[sid].row.push($('#id_' + it_1 + '_' + it_2));
                                    $('#T' + (templ + 1) + '_dropIDR_' + (it_1 - 1) + '_' + 0).hide();
                                    /*
                                     $rootScope.ctr1++;
                                     $rootScope.ctr2++;
                                     if (templ == 0 && $rootScope.ctr1 > 0) {
                                     $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'none');
                                     }
                                     if (templ == 1 && $rootScope.ctr2 > 0) {
                                     $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'none');
                                     }
                                     if (templ == 0 && $rootScope.ctr1 == 1) {
                                     $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'url(./imgs/test_svg2.png)');
                                     }
                                     if (templ == 1 && $rootScope.ctr2 == 1) {
                                     $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'url(./imgs/test_svg_2b.png)');
                                     }
                                     */
                                    $rootScope.func_newD(0, sid);
                                    if ($rootScope.storeProj.SVG_Elem[sid][it_1] == undefined) {
                                        $rootScope.storeProj.SVG_Elem[sid][it_1] = [];
                                        $rootScope.storeProj.SVG_sim[sid][it_1] = [];
                                        $rootScope.storeProj.SVG_Leg[sid][it_1] = [];
                                        $rootScope.storeProj.colVar[sid][it_1] = [];
                                    }
                                    $rootScope.func_initDropped(templ, sid, '#T' + (templ + 1) + '_dropIDR_' + (it_1 - 1) + '_' + 0);
                                }
                                if (it_1 == 0 && it_2 > 0) {
                                    $rootScope.storeProj.tmpItem[sid].col.push($('#id_' + it_1 + '_' + it_2));
                                    $('#T' + (templ + 1) + '_dropIDC_' + 0 + '_' + (it_2 - 1)).hide();
                                    $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'none');
                                    $rootScope.func_newD(1, sid);
                                    if ($rootScope.storeProj.SVG_Elem[sid][it_1] == undefined) {
                                        $rootScope.storeProj.SVG_Elem[sid][it_1] = [];
                                        $rootScope.storeProj.SVG_sim[sid][it_1] = [];
                                        $rootScope.storeProj.SVG_Leg[sid][it_1] = [];
                                        $rootScope.storeProj.colVar[sid][it_1] = [];
                                    }
                                    $rootScope.func_initDropped(templ, sid, '#T' + (templ + 1) + '_dropIDC_' + 0 + '_' + (it_2 - 1));
                                }
                            }
                        }
                    }
                }
            } else {
                if (dragEl != 'id_0_0') {
                    if ($rootScope.storeProj.dFldRT1R1[sid].length == 1) {
                        for (var it = 0; it < $rootScope.storeProj.ctrDcT1C1[sid]; it++) {
                            $rootScope.storeProj.dFldCT1C1[sid][it] = {'idC': it};
                            $rootScope.storeProj.dFldCT1C1[sid][it].max = 4;
                        }
                    }
                    if (cnt == 1 && ($rootScope.storeProj.dFldCT1C1[sid].length == 1 || $rootScope.storeProj.dFldCT1C1[sid].length == 0) && $rootScope.storeProj.dFldRT1R1[sid].length == 1) {
                        cnt = 0;
                    }
                    if ((dragEl.split('_')[2] == 0 && dropEl.split('_')[1] == 'dropIDR') || (dragEl.split('_')[1] == 0 && dropEl.split('_')[1] == 'dropIDC')) {
                        if (cnt == 0) {
                            $rootScope.storeProj.tmpCR[sid] = 0;
                            cnt = 1;
                        }
                    }
                    if ((dragEl.split('_')[1] == 0 && dropEl.split('_')[1] == 'dropIDR') || (dragEl.split('_')[2] == 0 && dropEl.split('_')[1] == 'dropIDC')) {
                        if (cnt == 0) {
                            $rootScope.storeProj.tmpCR[sid] = 1;
                            cnt = 1;
                        }
                    }
                    if ($rootScope.storeProj.tmpCR[sid] == 0 && ((dragEl.split('_')[2] == 0 && dropEl.split('_')[1] == 'dropIDR') || (dragEl.split('_')[1] == 0 && dropEl.split('_')[1] == 'dropIDC'))) {

                        if ($rootScope.storeProj.tmpItem[sid].row == undefined) {
                            $rootScope.storeProj.tmpItem[sid].row = [];
                        }
                        if ($rootScope.storeProj.tmpItem[sid].col == undefined) {
                            $rootScope.storeProj.tmpItem[sid].col = [];
                        }
                        var drag = $('#' + dragEl);
                        var drop = $('#' + dropEl);

                        //clear the previously applied color, if it exists
                        var bgClass = drop.attr('data-color');
                        if (bgClass) {
                            drop.removeClass(bgClass);
                        }
                        // paste per drop to SVG vis?!
                        //$('#svgID_' + sid).append("<rect id='dEl-" + drag.attr('id') + "' width='300' height='100' style='fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)'>" + drag.val() + " <rect width='100' height='100' style='fill:rgb(255,0,0);stroke-width:3;stroke:rgb(0,0,0)'  id='del_" + drag.attr('id') + "' onclick='this.parentNode.parentNode.remove();'></rect></rect>");
                        //console.log("The element " + drag.attr('id') + " has been dropped on " + drop.attr('id') + "!");
                        // Template 1
                        var lock = 0;
                        if (drop.attr('class') == 'T_slotR_' + sid + ' lvl-target lvl-over') {
                            if ($rootScope.storeProj.tmpItem[sid].row.length == 0) {
                                $rootScope.storeProj.tmpItem[sid].row.push(drag);
                                $('#' + dropEl).hide();
                                /*
                                 $rootScope.ctr1++;
                                 $rootScope.ctr2++;
                                 if (templ == 0 && $rootScope.ctr1 > 0) {
                                 $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'none');
                                 }
                                 if (templ == 1 && $rootScope.ctr2 > 0) {
                                 $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'none');
                                 }
                                 if (templ == 0 && $rootScope.ctr1 == 1) {
                                 $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'url(./imgs/test_svg2.png)');
                                 }
                                 if (templ == 1 && $rootScope.ctr2 == 1) {
                                 $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'url(./imgs/test_svg_2b.png)');
                                 }
                                 */
                                $rootScope.func_newD(0, sid);
                            } else {
                                for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].row.length; it++) {
                                    if ($rootScope.storeProj.tmpItem[sid].row[it][0].id.split('_')[1] == drag[0].id.split('_')[1]) {
                                        lock = 1;
                                    }
                                }
                                if (lock == 0) {
                                    $rootScope.storeProj.tmpItem[sid].row.push(drag);
                                    $('#' + dropEl).hide();
                                    /*
                                     if (templ == 0 && ($rootScope.ctr1 > 0 || $rootScope.ctr2 > 0)) {
                                     $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'none');
                                     }
                                     if (templ == 1 && ($rootScope.ctr1 > 0 || $rootScope.ctr2 > 0)) {
                                     $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'none');
                                     }
                                     */
                                    $rootScope.func_newD(0, sid);
                                }
                            }
                            // delete droppable by array ?!
                        }
                        if (drop.attr('class') == 'T_slotC_' + sid + ' lvl-target lvl-over') {
                            if ($rootScope.storeProj.tmpItem[sid].col.length == 0) {
                                $rootScope.storeProj.tmpItem[sid].col.push(drag);
                                $('#' + dropEl).hide();
                                $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'none');
                                $rootScope.func_newD(1, sid);
                            } else {
                                for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                                    if ($rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2] == drag[0].id.split('_')[2]) {
                                        lock = 1;
                                    }
                                }
                                if (lock == 0) {
                                    $rootScope.storeProj.tmpItem[sid].col.push(drag);
                                    $('#' + dropEl).hide();
                                    $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'none');
                                    $rootScope.func_newD(1, sid);
                                }
                            }

                        }
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            if ($rootScope.storeProj.SVG_Elem[sid][it_r] == undefined) {
                                $rootScope.storeProj.SVG_Elem[sid][it_r] = [];
                                $rootScope.storeProj.SVG_sim[sid][it_r] = [];
                                $rootScope.storeProj.SVG_Leg[sid][it_r] = [];
                            }
                        }
                    }
                    if ($rootScope.storeProj.tmpCR[sid] == 1 && ((dragEl.split('_')[1] == 0 && dropEl.split('_')[1] == 'dropIDR') || (dragEl.split('_')[2] == 0 && dropEl.split('_')[1] == 'dropIDC'))) {

                        if ($rootScope.storeProj.tmpItem[sid].row == undefined) {
                            $rootScope.storeProj.tmpItem[sid].row = [];
                        }
                        if ($rootScope.storeProj.tmpItem[sid].col == undefined) {
                            $rootScope.storeProj.tmpItem[sid].col = [];
                        }
                        var drag = $('#' + dragEl);
                        var drop = $('#' + dropEl);

                        //clear the previously applied color, if it exists
                        var bgClass = drop.attr('data-color');
                        if (bgClass) {
                            drop.removeClass(bgClass);
                        }
                        // paste per drop to SVG vis?!
                        //$('#svgID_' + sid).append("<rect id='dEl-" + drag.attr('id') + "' width='300' height='100' style='fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)'>" + drag.val() + " <rect width='100' height='100' style='fill:rgb(255,0,0);stroke-width:3;stroke:rgb(0,0,0)'  id='del_" + drag.attr('id') + "' onclick='this.parentNode.parentNode.remove();'></rect></rect>");
                        //console.log("The element " + drag.attr('id') + " has been dropped on " + drop.attr('id') + "!");
                        // Template 1
                        var lock = 0;
                        if (drop.attr('class') == 'T_slotR_' + sid + ' lvl-target lvl-over') {
                            if ($rootScope.storeProj.tmpItem[sid].row.length == 0) {
                                $rootScope.storeProj.tmpItem[sid].row.push(drag);
                                $('#' + dropEl).hide();
                                /*
                                 if (templ == 0 && ($rootScope.ctr1 > 0 || $rootScope.ctr2 > 0)) {
                                 $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'none');
                                 }
                                 if (templ == 1 && ($rootScope.ctr1 > 0 || $rootScope.ctr2 > 0)) {
                                 $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'none');
                                 }
                                 $rootScope.ctr2++;
                                 if (templ == 0 && $rootScope.ctr1 == 1) {
                                 $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'url(./imgs/test_svg2.png)');
                                 }
                                 if (templ == 1 && $rootScope.ctr2 == 1) {
                                 $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'url(./imgs/test_svg_2b.png)');
                                 }
                                 */
                                $rootScope.func_newD(0, sid);
                            } else {
                                for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].row.length; it++) {
                                    if ($rootScope.storeProj.tmpItem[sid].row[it][0].id.split('_')[2] == drag[0].id.split('_')[2]) {
                                        lock = 1;
                                    }
                                }
                                if (lock == 0) {
                                    $rootScope.storeProj.tmpItem[sid].row.push(drag);
                                    $('#' + dropEl).hide();
                                    /*
                                     if (templ == 0 && ($rootScope.ctr1 > 0 || $rootScope.ctr2 > 0)) {
                                     $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'none');
                                     }
                                     if (templ == 1 && ($rootScope.ctr1 > 0 || $rootScope.ctr2 > 0)) {
                                     $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'none');
                                     }
                                     */
                                    $rootScope.func_newD(0, sid);
                                }
                            }
                            // delete droppable by array ?!
                        }
                        if (drop.attr('class') == 'T_slotC_' + sid + ' lvl-target lvl-over') {
                            if ($rootScope.storeProj.tmpItem[sid].col.length == 0) {
                                $rootScope.storeProj.tmpItem[sid].col.push(drag);
                                $('#' + dropEl).hide();
                                $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'none');
                                $rootScope.ctr1++;
                                $rootScope.ctr2++;
                                $rootScope.func_newD(1, sid);
                            } else {
                                for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                                    if ($rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1] == drag[0].id.split('_')[1]) {
                                        lock = 1;
                                    }
                                }
                                if (lock == 0) {
                                    $rootScope.storeProj.tmpItem[sid].col.push(drag);
                                    $('#' + dropEl).hide();
                                    $rootScope.ctr1++;
                                    $rootScope.ctr2++;
                                    $('#svgID' + (templ + 1) + '_' + sid).css('background-image', 'none');
                                    $rootScope.func_newD(1, sid);
                                }
                            }

                        }
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            if ($rootScope.storeProj.SVG_Elem[sid][it_r] == undefined) {
                                $rootScope.storeProj.SVG_Elem[sid][it_r] = [];
                                $rootScope.storeProj.SVG_sim[sid][it_r] = [];
                                $rootScope.storeProj.SVG_Leg[sid][it_r] = [];
                            }
                        }
                    }
                    $rootScope.func_initDropped(templ, sid, dropEl);
                }
            }
            $rootScope.func_iFace(templ, sid);
        };
        $rootScope.func_group = function (val, tmpVal, sid) {
            $rootScope.storeProj.grVal[sid].v = val;
            $rootScope.storeProj.grVal[sid].p = 0;
            $rootScope.func_iFace(tmpVal, sid);
            $('#optionID' + (tmpVal) + '_' + sid).css('visibility', 'hidden');
        };
        $rootScope.func_menu = function (tmpVal, sid) {
            console.log(tmpVal);
            console.log(sid);
            if ($rootScope.storeProj.it[sid] % 2 == 0) {
                $('#optionID' + (tmpVal) + '_' + sid).css('visibility', 'visible');
                $rootScope.storeProj.it[sid]++;
            } else {
                $('#optionID' + (tmpVal) + '_' + sid).css('visibility', 'hidden');
                $rootScope.storeProj.it[sid]++;
            }

        };
        $rootScope.newSlider = function () {
            func_dCol();
            var newWidth = 600 + $rootScope.storeProj.slides.length + 1;
            $rootScope.storeProj.ctrDrT1R1[currIndex] = 1;
            $rootScope.storeProj.ctrDcT1C1[currIndex] = 1;

            $rootScope.storeProj.grVal[currIndex] = {};
            $rootScope.storeProj.grVal[currIndex].v = 0;
            $rootScope.storeProj.grVal[currIndex].p = 0;
            $rootScope.storeProj.grVal[currIndex].r = [];
            $rootScope.storeProj.dFldCT1C1[currIndex] = [];
            $rootScope.storeProj.dFldRT1R1[currIndex] = [];

            //KLAUS
            $rootScope.storeProj.cardcontroll[currIndex] = {};
            $rootScope.storeProj.cardcontroll[currIndex].map = 0;
            $rootScope.storeProj.cardcontroll[currIndex].vis = 0;
            $rootScope.storeProj.cardcontroll[currIndex].set = [];

            $rootScope.storeProj.SVG_Elem[currIndex] = [];
            $rootScope.storeProj.SVG_sim[currIndex] = [];
            $rootScope.storeProj.inpVal[currIndex] = [];

            $rootScope.storeProj.SVG_Leg[currIndex] = [];
            $rootScope.storeProj.tmpLeg[currIndex] = [];

            $rootScope.storeProj.valSc[currIndex] = 0;
            $rootScope.storeProj.scale[currIndex] = {};
            $rootScope.storeProj.scale[currIndex].x = 0;
            $rootScope.storeProj.scale[currIndex].y = 0;

            $rootScope.storeProj.headline[currIndex] = '';
            $rootScope.storeProj.yPosLine[currIndex] = 0;
            $rootScope.storeProj.it[currIndex] = 0;

            for (var it_r = 0; it_r < $rootScope.storeProj.ctrDrT1R1[currIndex]; it_r++) {
                $rootScope.storeProj.dFldRT1R1[currIndex][it_r] = {'idR': it_r};
            }
            $rootScope.storeProj.tmpItem[currIndex] = {};
            $rootScope.storeProj.slides.push({
                text: ['template'][slides.length % (currIndex + 1)],
                tmp: $rootScope.tmpID,
                id: currIndex++
            });
            $('#tmplID_' + $rootScope.tmpID + '_' + currIndex).css('outline', '0px');
            $('#tmplID_' + $rootScope.tmpID + '_' + currIndex).css('outline-offset', '-2px');

            $('#Templ' + ($rootScope.tmpID + 1) + '_' + currIndex).css('outline', '0');
            $('#Templ' + ($rootScope.tmpID + 1) + '_' + currIndex).css('outline-offset', '-2px');
            $('.carousel-control').width("5%");

        };
        $rootScope.tmpID = 0;
        $rootScope.newSlider();
// templates where needed
        $rootScope.func_round = function (value) {
            return Math.round(value);
        };
        $rootScope.func_scVal = function (tmpVal, sid, val) {
            $rootScope.storeProj.valSc[sid] = parseInt($('#valueId' + sid).val());
            $rootScope.storeProj.chkSCVal = val;
            $rootScope.func_iFace(tmpVal, sid);
        };
        $rootScope.func_edVal = function (tmpVal, sid, cx, cy, sims, valt) {
            $('.fObj').remove();
            d3.select('#svgID' + tmpVal + '_' + sid)
                .append('svg')
                .attr('class', 'fObj')
                .attr("x", cx)
                .attr("y", cy + 20)
                .attr("width", 134)
                .attr("height", 34)
                /*
                 .on('mouseleave', function () {
                 $('.fObj').remove();
                 $rootScope.func_iFace(tmpVal - 1, sid);
                 })
                 */
                .append('foreignObject')
                .attr("width", 154)
                .attr("height", 30)
                .append('xhtml:div')
                .attr('id', 'fObj_' + tmpVal + '_' + sid)
                .attr("width", 154)
                .attr("height", 30);
            d3.select('#fObj_' + tmpVal + '_' + sid)
                .append("input")
                .attr('id', 'inpN_' + tmpVal + '_' + sid)
                .attr('type', 'number')
                .attr('value', valt)
                .style('float', 'left')
                .style("width", '80px')
                .style("height", '30px');
            d3.select('#fObj_' + tmpVal + '_' + sid)
                .append("input")
                .attr('id', 'inpB_' + tmpVal + '_' + sid)
                .attr('type', 'button')
                .style('float', 'left')
                .style("width", '30px')
                .style("height", '30px')
                .style('background-color', 'rgb(255,255, 0)')
                .on("click", function () {
                        for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Leg[sid].length; it_r++) {
                            for (var it = 0; it < $rootScope.storeProj.SVG_Leg[sid][it_r].length; it++) {
                                if ($rootScope.storeProj.SVG_Leg[sid][it_r][it] != undefined) {
                                    if (sims == $rootScope.storeProj.SVG_Leg[sid][it_r][it].sims) {
                                        $rootScope.storeProj.SVG_Leg[sid][it_r][it].lockInp = 1;
                                        $rootScope.storeProj.SVG_Leg[sid][it_r][it].valt = $('#inpN_' + tmpVal + '_' + sid).val();
                                        $rootScope.storeProj.inpVal[sid][it_r][it] = $('#inpN_' + tmpVal + '_' + sid).val();
                                    }
                                }

                            }
                        }
                        $('.fObj').remove();

                        $rootScope.func_iFace(tmpVal - 1, sid);
                    }
                );
            //d3.select('#inpF_' + tmpVal + '_' + sid).node().focus();
        };
        $rootScope.func_bdout = function (tmpVal, sid, itR) {
            d3.select('#numVal_' + itR + '_0_' + sid).style('border', '1px solid');
        };
        $rootScope.func_bdin = function (tmpVal, sid, itR) {
            d3.select('#numVal_' + itR + '_0_' + sid).style('border', 'none');
        };
        $rootScope.func_ref = function () {
            $('#svgID' + $rootScope.storeProj.slides[$rootScope.storeProj.slideID].tmp + '_' + $rootScope.storeProj.slideID).children().remove();
            if ($rootScope.storeProj.colorCL == 0) {
                $('#optionID' + ($rootScope.storeProj.slides[$rootScope.storeProj.slideID].tmp) + '_' + $rootScope.storeProj.slideID).css('visibility', 'hidden');
                switch (slides[$rootScope.storeProj.slideID].tmp) {
                    case 0:
                        // 2) preparing Templ1
                        $rootScope.func_Templ1($rootScope.storeProj.slideID); // Wait for all templates to be loaded
                        // 3) render Vis with d3
                        //$rootScope.func_renderT1(sid);
                        break;
                    case 1:
                        // 2) preparing Templ2
                        $rootScope.func_Templ2($rootScope.storeProj.slideID);
                        // 3) render Vis with d3
                        //$rootScope.func_renderT2(sid);
                        break;
                    case 2:
                        // 2) preparing Templ3
                        $rootScope.func_Templ3($rootScope.storeProj.slideID);
                        // 3) render Vis with d3
                        //$rootScope.func_renderT3(sid);
                        break;
                    case 3:
                        // 2) preparing Templ3
                        $rootScope.func_Templ4($rootScope.storeProj.slideID);
                        // 3) render Vis with d3
                        //$rootScope.func_renderT4(sid);
                        break;
                    case 4:
                        // 2) preparing Templ3
                        $rootScope.func_Templ5($rootScope.storeProj.slideID);
                        // 3) render Vis with d3
                        //$rootScope.func_renderT4(sid);
                        break;
                }
            }
        };
        $rootScope.func_prevDw = function (ev, th) {
            $("#" + th).select();
        };
        /*
         $rootScope.swg = 0;
         $rootScope.func_guide = function(tmpVal, sid) {
         if($rootScope.swg % 2 == 0) {
         if (tmpVal == 0 && $rootScope.ctr1 == 0) {
         $('#svgID' + (tmpVal + 1) + '_' + sid).css('background-image', 'url(./imgs/test_svg.png)');
         //$rootScope.ctr1++;
         //$rootScope.ctr2++;
         }
         if (tmpVal == 1 && $rootScope.ctr2 == 0) {
         $('#svgID' + (tmpVal + 1) + '_' + sid).css('background-image', 'url(./imgs/test_svg_2.png)');
         //$rootScope.ctr1++;
         //$rootScope.ctr2++;
         }
         $rootScope.swg++;
         } else {
         if (tmpVal == 0 && $rootScope.ctr1 == 0) {
         $('#svgID' + (tmpVal + 1) + '_' + sid).css('background-image', 'none');
         //$rootScope.ctr1 = 0;
         //$rootScope.ctr2 = 0;
         }
         if (tmpVal == 1 && $rootScope.ctr2 == 0) {
         $('#svgID' + (tmpVal + 1) + '_' + sid).css('background-image', 'none');
         //$rootScope.ctr1 = 0;
         //$rootScope.ctr2 = 0;
         }
         $rootScope.swg++;
         }
         }
         */
        $rootScope.func_maxValue = function (sid) {
            //$rootScope.$applyAsync();
            if ($rootScope.storeProj.tmpCR[sid] == 0) {
                $rootScope.storeProj.maxPow[sid] = [];
                if ($rootScope.storeProj.tmpItem[sid] != undefined) {
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined && $rootScope.storeProj.tmpItem[sid].col != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                                if ($rootScope.storeProj.inpVal[sid] != undefined && $rootScope.storeProj.inpVal[sid][it_r] != undefined && $rootScope.storeProj.inpVal[sid][it_r][it] > 1) {
                                    if ($rootScope.storeProj.tmpItem[sid] != undefined) {
                                        if ($rootScope.storeProj.tmpItem[sid].row != undefined && $rootScope.storeProj.tmpItem[sid].col != undefined) {
                                            if ($rootScope.storeProj.inpVal[sid] == undefined) {
                                                $rootScope.storeProj.inpVal[sid] = [];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        var it_x = 1;
                        for (var it_1 = 0; it_1 < $rootScope.storeProj.tmpItem[sid].row.length; it_1++) {
                            $rootScope.storeProj.maxPow[sid][it_1] = [];
                            for (var it_2 = 0; it_2 < $rootScope.storeProj.tmpItem[sid].col.length; it_2++) {
                                it_x = 1;
                                while ((($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_1][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it_2][0].id.split('_')[2]].value - 1) / Math.pow(10, it_x)) >= 10) {
                                    it_x++;
                                }
                                $rootScope.storeProj.maxPow[sid][it_1][it_2] = Math.pow(10, (it_x - 1));
                            }
                        }
                        for (var it_1 = 0; it_1 < $rootScope.storeProj.tmpItem[sid].row.length; it_1++) {
                            for (var it_2 = 0; it_2 < $rootScope.storeProj.tmpItem[sid].col.length; it_2++) {
                                for (var it = $rootScope.storeProj.tmpItem[sid].row.length - 1; it >= 0; it--) {
                                    if ($rootScope.storeProj.maxPow[sid][it_1][it_2] < $rootScope.storeProj.maxPow[sid][it][it_2]) {
                                        $rootScope.storeProj.maxPow[sid][it_1][it_2] = $rootScope.storeProj.maxPow[sid][it][it_2];
                                    }
                                }
                            }
                        }
                        for (var it_1 = 0; it_1 < $rootScope.storeProj.tmpItem[sid].row.length; it_1++) {
                            for (var it_2 = 0; it_2 < $rootScope.storeProj.tmpItem[sid].col.length; it_2++) {
                                if ($rootScope.storeProj.SVG_Leg[sid][it_1][it_2].lockInp == 0) {
                                    $rootScope.storeProj.SVG_Leg[sid][it_1][it_2].valt = $rootScope.storeProj.maxPow[sid][it_1][it_2];
                                    $rootScope.storeProj.inpVal[sid][it_1][it_2] = $rootScope.storeProj.maxPow[sid][it_1][it_2];
                                    for (var it = $rootScope.storeProj.tmpItem[sid].col.length - 1; it >= 0; it--) {
                                        if (($rootScope.storeProj.SVG_Leg[sid][it_1][it_2].sims == $rootScope.storeProj.SVG_Leg[sid][it_1][it].sims)) {
                                            if ($rootScope.storeProj.SVG_Leg[sid][it_1][it_2].valt < $rootScope.storeProj.maxPow[sid][it_1][it]) {
                                                $rootScope.storeProj.SVG_Leg[sid][it_1][it_2].valt = $rootScope.storeProj.maxPow[sid][it_1][it];
                                                $rootScope.storeProj.inpVal[sid][it_1][it_2] = $rootScope.storeProj.maxPow[sid][it_1][it];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if ($rootScope.storeProj.tmpCR[sid] == 1) {
                $rootScope.storeProj.maxPow[sid] = [];
                if ($rootScope.storeProj.tmpItem[sid] != undefined) {
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined && $rootScope.storeProj.tmpItem[sid].col != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                                if ($rootScope.storeProj.inpVal[sid] != undefined && $rootScope.storeProj.inpVal[sid][it_r] != undefined && $rootScope.storeProj.inpVal[sid][it_r][it] > 1) {
                                    if ($rootScope.storeProj.tmpItem[sid] != undefined) {
                                        if ($rootScope.storeProj.tmpItem[sid].row != undefined && $rootScope.storeProj.tmpItem[sid].col != undefined) {
                                            if ($rootScope.storeProj.inpVal[sid] == undefined) {
                                                $rootScope.storeProj.inpVal[sid] = [];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        var it_x = 1;
                        for (var it_1 = 0; it_1 < $rootScope.storeProj.tmpItem[sid].row.length; it_1++) {
                            $rootScope.storeProj.maxPow[sid][it_1] = [];
                            for (var it_2 = 0; it_2 < $rootScope.storeProj.tmpItem[sid].col.length; it_2++) {
                                it_x = 1;
                                while ((($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it_2][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_1][0].id.split('_')[2]].value - 1) / Math.pow(10, it_x)) >= 10) {
                                    it_x++;
                                }
                                $rootScope.storeProj.maxPow[sid][it_1][it_2] = Math.pow(10, (it_x - 1));
                            }
                        }
                        for (var it_1 = 0; it_1 < $rootScope.storeProj.tmpItem[sid].row.length; it_1++) {
                            for (var it_2 = 0; it_2 < $rootScope.storeProj.tmpItem[sid].col.length; it_2++) {
                                for (var it = $rootScope.storeProj.tmpItem[sid].row.length - 1; it >= 0; it--) {
                                    if ($rootScope.storeProj.maxPow[sid][it_1][it_2] < $rootScope.storeProj.maxPow[sid][it][it_2]) {
                                        $rootScope.storeProj.maxPow[sid][it_1][it_2] = $rootScope.storeProj.maxPow[sid][it][it_2];
                                    }
                                }
                            }
                        }
                        for (var it_1 = 0; it_1 < $rootScope.storeProj.tmpItem[sid].row.length; it_1++) {
                            for (var it_2 = 0; it_2 < $rootScope.storeProj.tmpItem[sid].col.length; it_2++) {
                                $rootScope.storeProj.SVG_Leg[sid][it_1][it_2].valt = $rootScope.storeProj.maxPow[sid][it_1][it_2];
                                $rootScope.storeProj.inpVal[sid][it_1][it_2] = $rootScope.storeProj.maxPow[sid][it_1][it_2];
                                for (var it = $rootScope.storeProj.tmpItem[sid].col.length - 1; it >= 0; it--) {
                                    if (($rootScope.storeProj.SVG_Leg[sid][it_1][it_2].sims == $rootScope.storeProj.SVG_Leg[sid][it_1][it].sims)) {
                                        if ($rootScope.storeProj.SVG_Leg[sid][it_1][it_2].valt < $rootScope.storeProj.maxPow[sid][it_1][it]) {
                                            $rootScope.storeProj.SVG_Leg[sid][it_1][it_2].valt = $rootScope.storeProj.maxPow[sid][it_1][it];
                                            $rootScope.storeProj.inpVal[sid][it_1][it_2] = $rootScope.storeProj.maxPow[sid][it_1][it];
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
            }
        };
        var midMax = 0;
        $rootScope.func_retrValt = function (sid) {
            if ($rootScope.tmpLeg != undefined) {
                for (var it_s = 0; it_s < $rootScope.tmpLeg[sid].length; it_s++) {
                    for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Leg[sid].length; it_r++) {
                        for (var it = 0; it < $rootScope.storeProj.SVG_Leg[sid][it_r].length; it++) {
                            if ($rootScope.storeProj.SVG_Leg[sid][it_r][it] != undefined) {
                                if ($rootScope.tmpLeg[sid][it_s].sims == $rootScope.storeProj.SVG_Leg[sid][it_r][it].sims) {
                                    $rootScope.storeProj.SVG_Leg[sid][it_r][it].valt = $rootScope.tmpLeg[sid][it_s].valt;
                                    $rootScope.storeProj.inpVal[sid][it_r][it] = $rootScope.tmpLeg[sid][it_s].valt;
                                }
                            }
                        }
                    }
                }
            }
        };
        $rootScope.func_iFace = function (tmpVal, sid) {
            if ($rootScope.storeProj.colorCL == 0) {
                $rootScope.func_retrValt(sid);
                switch (tmpVal) {
                    case 0:
                        // 2) preparing Templ1
                        $rootScope.func_Templ1(sid); // Wait for all templates to be loaded
                        // 3) render Vis with d3
                        //$rootScope.func_renderT1(sid);
                        break;
                    case 1:
                        // 2) preparing Templ2
                        $rootScope.func_Templ2(sid);
                        // 3) render Vis with d3
                        //$rootScope.func_renderT2(sid);
                        break;
                    case 2:
                        // 2) preparing Templ3
                        $rootScope.func_Templ3(sid);
                        // 3) render Vis with d3
                        //$rootScope.func_renderT3(sid);
                        break;
                    case 3:
                        // 2) preparing Templ3
                        $rootScope.func_Templ4(sid);
                        // 3) render Vis with d3
                        //$rootScope.func_renderT4(sid);
                        break;
                }
            }
            /*
             //$rootScope.action = 0;
             //$rootScope.$applyAsync();
             */
        };
        var ckT3_r = [];
        var ckT3_c = [];

        $rootScope.func_swap_dflR = function (x, y, sid) {
            var b = $rootScope.storeProj.dFldRT1R1[sid][x];
            $rootScope.storeProj.dFldRT1R1[sid][x] = $rootScope.storeProj.dFldRT1R1[sid][y];
            $rootScope.storeProj.dFldRT1R1[sid][y] = b;
        };
        $rootScope.func_swap_dflC = function (x, y, sid) {
            var b = $rootScope.storeProj.dFldCT1C1[sid][x];
            $rootScope.storeProj.dFldCT1C1[sid][x] = $rootScope.storeProj.dFldCT1C1[sid][y];
            $rootScope.storeProj.dFldCT1C1[sid][y] = b;
        };
        $rootScope.func_swap_tmpItem = function (x, y, sid) {
            var b = $rootScope.storeProj.tmpItem[sid].row[x];
            $rootScope.storeProj.tmpItem[sid].row[x] = $rootScope.storeProj.tmpItem[sid].row[y];
            $rootScope.storeProj.tmpItem[sid].row[y] = b;
        };
        $rootScope.func_swap_tmpItemC = function (x, y, sid) {
            var b = $rootScope.storeProj.tmpItem[sid].col[x];
            $rootScope.storeProj.tmpItem[sid].col[x] = $rootScope.storeProj.tmpItem[sid].col[y];
            $rootScope.storeProj.tmpItem[sid].col[y] = b;
        };
        $rootScope.func_swap_SVG_Leg = function (x, y, sid) {
            var b = $rootScope.storeProj.SVG_Leg[sid][x];
            $rootScope.storeProj.SVG_Leg[sid][x] = $rootScope.storeProj.SVG_Leg[sid][y];
            $rootScope.storeProj.SVG_Leg[sid][y] = b;
        };
        $rootScope.func_swap_SVG_LegC = function (x, y, sid, it_r) {
            var b = $rootScope.storeProj.SVG_Leg[sid][it_r][x];
            $rootScope.storeProj.SVG_Leg[sid][it_r][x] = $rootScope.storeProj.SVG_Leg[sid][it_r][y];
            $rootScope.storeProj.SVG_Leg[sid][it_r][y] = b;
        };
        $rootScope.func_swap_SVG_Elem = function (x, y, sid) {
            var b = $rootScope.storeProj.SVG_Elem[sid][x];
            $rootScope.storeProj.SVG_Elem[sid][x] = $rootScope.storeProj.SVG_Elem[sid][y];
            $rootScope.storeProj.SVG_Elem[sid][y] = b;
        };
        $rootScope.func_swap_SVG_ElemC = function (x, y, sid, it_r) {
            var b = $rootScope.storeProj.SVG_Elem[sid][it_r][x];
            $rootScope.storeProj.SVG_Elem[sid][it_r][x] = $rootScope.storeProj.SVG_Elem[sid][it_r][y];
            $rootScope.storeProj.SVG_Elem[sid][it_r][y] = b;
        };
        $rootScope.func_swap_colVar = function (x, y, sid) {
            var b = $rootScope.storeProj.colVar[sid][x];
            $rootScope.storeProj.colVar[sid][x] = $rootScope.storeProj.colVar[sid][y];
            $rootScope.storeProj.colVar[sid][y] = b;
        };
        $rootScope.func_swap_colVarC = function (x, y, sid, it_r) {
            var b = $rootScope.storeProj.colVar[sid][it_r][x];
            $rootScope.storeProj.colVar[sid][it_r][x] = $rootScope.storeProj.colVar[sid][it_r][y];
            $rootScope.storeProj.colVar[sid][it_r][y] = b;
        };
        $rootScope.func_swap_sims = function (x, y, sid) {
            var b = $rootScope.storeProj.SVG_sim[sid][x];
            $rootScope.storeProj.SVG_sim[sid][x] = $rootScope.storeProj.SVG_sim[sid][y];
            $rootScope.storeProj.SVG_sim[sid][y] = b;
        };
        $rootScope.func_swap_simsC = function (x, y, sid, it_r) {
            var b = $rootScope.storeProj.SVG_sim[sid][it_r][x];
            $rootScope.storeProj.SVG_sim[sid][it_r][x] = $rootScope.storeProj.SVG_sim[sid][it_r][y];
            $rootScope.storeProj.SVG_sim[sid][it_r][y] = b;
        };
        $rootScope.func_swap_inpVal = function (x, y, sid) {
            var b = $rootScope.storeProj.inpVal[sid][x];
            $rootScope.storeProj.inpVal[sid][x] = $rootScope.storeProj.inpVal[sid][y];
            $rootScope.storeProj.inpVal[sid][y] = b;
        };
        $rootScope.func_swap_inpValC = function (x, y, sid, it_r) {
            var b = $rootScope.storeProj.inpVal[sid][it_r][x];
            $rootScope.storeProj.inpVal[sid][it_r][x] = $rootScope.storeProj.inpVal[sid][it_r][y];
            $rootScope.storeProj.inpVal[sid][it_r][y] = b;
        };
        $rootScope.func_Templ1 = function (sid) {
            $timeout(function () {
                func_dCol();
                if ($rootScope.storeProj.chkSCVal == 0) {
                    $('.optionCL').css('visibility', 'hidden');
                }
                if ($rootScope.storeProj.headline[$rootScope.storeProj.slideID].length == 0) {
                    $rootScope.storeProj.yPosLine[$rootScope.storeProj.slideID] = 0;
                }
                if ($rootScope.storeProj.headline[$rootScope.storeProj.slideID].length > 0) {
                    $rootScope.storeProj.yPosLine[$rootScope.storeProj.slideID] = 32;
                }
                $rootScope.storeProj.it[sid] = 0;
                $rootScope.storeProj.colors[sid] = ["#5b9254", "#e64639", "#1a4e53", "#d99a00", "#cccccc", "#000000"];
                $('.descrCL').css('outline', '0');
                $('.descrCL').css('outline-offset', '-2px');

                $('#tmplID_0_' + sid).css('outline', '5px auto -webkit-focus-ring-color');
                $('#tmplID_0_' + sid).css('outline-offset', '-2px');

                $('.templCL').css('outline', '0');
                $('.templCL').css('outline-offset', '-2px');

                $('#Templ1_' + sid).css('outline', '5px auto -webkit-focus-ring-color');
                $('#Templ1_' + sid).css('outline-offset', '-2px');
                $rootScope.storeProj.max[sid] = [];
                $rootScope.storeProj.max3[sid] = [];
                $rootScope.storeProj.max3[sid] = [];
                if ($rootScope.storeProj.inpVal[sid] == undefined) {
                    $rootScope.storeProj.inpVal[sid] = [];
                }
                if ($rootScope.storeProj.tmpItem[sid] != undefined && $rootScope.storeProj.tmpItem[sid].row != undefined) {
                    for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].row.length; it++) {
                        if ($rootScope.storeProj.inpVal[sid][it] == undefined) {
                            $rootScope.storeProj.inpVal[sid][it] = [];
                        }
                        if ($rootScope.storeProj.SVG_Leg[sid][it] != undefined) {
                            for (var it_1 = 0; it_1 < $rootScope.storeProj.tmpItem[sid].col.length; it_1++) {
                                if ($rootScope.storeProj.inpVal[sid][it][it_1] == undefined) {
                                    if ($rootScope.storeProj.SVG_Leg[sid][it][it_1] != undefined) {
                                        $rootScope.storeProj.inpVal[sid][it][it_1] = $rootScope.storeProj.SVG_Leg[sid][it][it_1].valt;
                                    } else {
                                        $rootScope.storeProj.inpVal[sid][it][it_1] = 1;
                                    }
                                }
                            }
                        }
                    }
                }
                $rootScope.func_maxValue(sid);
                d3.selection.prototype.moveToFront = function () {
                    return this.each(function () {
                        this.parentNode.appendChild(this);
                    });
                };
                d3.selection.prototype.moveToBack = function () {
                    return this.each(function () {
                        var firstChild = this.parentNode.firstChild;
                        if (firstChild) {
                            this.parentNode.insertBefore(this, firstChild);
                        }
                    });
                };
                $rootScope.tmpID = 0;
                $rootScope.storeProj.slides[sid].tmp = 0;

                $rootScope.$apply(); // switch templates preparation
                // generating amount of similar ones
                $rootScope.T_h1 = parseInt($('.templ').css('height').split('px')[0]);
                if ($rootScope.storeProj.tmpCR[sid] == 0) {
                    if ($rootScope.storeProj.max[sid] == undefined) {
                        $rootScope.storeProj.max[sid] = [];
                    }
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            if ($rootScope.storeProj.tmpItem[sid].col != undefined) {
                                for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                                    if ($rootScope.storeProj.max[sid][it] == undefined) {
                                        $rootScope.storeProj.max[sid][it] = 6;
                                    }
                                }
                            }
                        }
                        $rootScope.storeProj.tmpMax = [];
                        $rootScope.storeProj.tmpMax[0] = 0;
                        $rootScope.storeProj.tmpMax[1] = 6;
                        for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                            for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                                if ($rootScope.storeProj.grVal[sid].v != 0) {
                                    if ($rootScope.storeProj.max[sid][it] < $rootScope.func_round(($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value) / $rootScope.storeProj.inpVal[sid][it_r][it] + ($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value / $rootScope.storeProj.grVal[sid].v) / $rootScope.storeProj.inpVal[sid][it_r][it])) {
                                        $rootScope.storeProj.max[sid][it] = $rootScope.func_round(($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value) / $rootScope.storeProj.inpVal[sid][it_r][it] + ($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value / $rootScope.storeProj.grVal[sid].v) / $rootScope.storeProj.inpVal[sid][it_r][it]);
                                    }
                                } else {
                                    if ($rootScope.storeProj.max[sid][it] < $rootScope.func_round(($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value) / $rootScope.storeProj.inpVal[sid][it_r][it])) {
                                        $rootScope.storeProj.max[sid][it] = $rootScope.func_round(($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value) / $rootScope.storeProj.inpVal[sid][it_r][it]);
                                    }
                                }
                            }
                        }
                        for (var it = 0; it < $rootScope.storeProj.max[sid].length; it++) {
                            $rootScope.storeProj.tmpMax[it + 1] = 0;
                            for (var it1 = 0; it1 <= it; it1++) {
                                $rootScope.storeProj.tmpMax[it + 1] += $rootScope.storeProj.max[sid][it1];
                            }
                        }
                    }
                    $rootScope.storeProj.grVal[sid].p = 0;
                    if ($rootScope.storeProj.tmpItem[sid].col != undefined) {
                        for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                            $('#c1ISOID_' + it + '_' + sid).children().remove();
                        }
                    }
                    for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                        $rootScope.storeProj.dFldCT1C1[sid][it].vc = parseInt($rootScope.storeProj.valSc[sid]);
                        $rootScope.storeProj.dFldCT1C1[sid][it].grv = $rootScope.storeProj.grVal[sid].v;
                        $rootScope.storeProj.dFldCT1C1[sid][it].grp = $rootScope.storeProj.grVal[sid].p;
                        $rootScope.storeProj.dFldCT1C1[sid][it].max = $rootScope.storeProj.tmpMax[it];
                        $rootScope.storeProj.dFldCT1C1[sid][it].rlen = $rootScope.storeProj.dFldRT1R1[sid].length;
                    }
                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                        $rootScope.storeProj.dFldRT1R1[sid][it].vc = parseInt($rootScope.storeProj.valSc[sid]);
                        $rootScope.storeProj.dFldRT1R1[sid][it].grv = $rootScope.storeProj.grVal[sid].v;
                        $rootScope.storeProj.dFldRT1R1[sid][it].grp = $rootScope.storeProj.grVal[sid].p;
                        //$rootScope.storeProj.dFldRT1R1[sid][it].max = $rootScope.storeProj.max[sid][0];
                        $rootScope.storeProj.dFldRT1R1[sid][it].clen = $rootScope.storeProj.dFldCT1C1[sid].length;

                    }
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            if ($('#mn_X1r_' + (it_r) + '_' + sid)[0] != undefined) {
                                $('#mn_X1r_' + (it_r) + '_' + sid).remove();
                            }
                            if ($('#mn_X1r_' + (it_r) + '_' + sid)[0] == undefined) {
                                d3.select('#svgID1_' + sid).append('svg').attr('id', 'mn_X1r_' + ((it_r)) + '_' + sid).attr('class', 'mnXr').attr('x', 11).attr('y', 30 + 34 * (it_r + 1) + 'px').style('opacity', 0);
                                d3.select('#mn_X1r_' + (it_r) + '_' + sid).moveToFront();
                            }
                            d3.select('#mn_X1r_' + (it_r) + '_' + sid).append('rect').attr('id', 'X1_dropIDR_' + it_r + '_' + sid).attr('class', 'dropCL').attr('x', 0).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('stroke-width', $rootScope.storeProj.stroke_scale).style('stroke-opacity', '0.5').style('fill-opacity', '0.5').style('fill', 'rgb(166, 166, 166)').style('zIndex', 20);
                            var chk = 0;
                            $('#X1_dropIDR_' + it_r + '_' + sid).one({
                                mouseenter: function () {
                                    $(this).css('fill', 'rgb(111, 111, 166)');
                                },
                                mouseleave: function () {
                                    $(this).css('fill', 'rgb(166, 166, 166)');
                                },
                                drop: function (d) {
                                    if (chk == 0) {
                                        $rootScope.func_svgDropped(0, sid, d);
                                        $rootScope.func_iFace(0, sid);
                                        chk = 1;
                                    }
                                }
                            });
                            d3.select('#mn_X1r_' + (it_r) + '_' + sid).append('rect').attr('id', 'col_X1_dropIDR_' + it_r + '_' + sid).attr('x', 30).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,255,0)');
                            d3.select('#col_X1_dropIDR_' + it_r + '_' + sid).on('click', function () {
                                var it = this.id.split('_')[3];
                                $rootScope.storeProj.colorCL = 1;
                                $rootScope.func_color('row', it, 0, sid, 0, '#000000');
                            });
                            d3.select('#mn_X1r_' + (it_r) + '_' + sid).append('rect').attr('id', 'del_X1_dropIDR_' + it_r + '_' + sid).attr('x', 60).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(255,0,0)');
                            d3.select('#mn_X1r_' + (it_r) + '_' + sid).on('mouseover', function () {
                                //$rootScope.action = 1;
                                $(this).fadeTo(1, 1);
                            });
                            d3.select('#mn_X1r_' + (it_r) + '_' + sid).on('mouseout', function () {
                                ////$rootScope.action = 0;
                                //$rootScope.$applyAsync();
                                $(this).fadeTo(1, 0);
                            });
                            d3.select('#del_X1_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    //d3.select('#del_X1_dropIDR_' + this.id.split('_')[3]).remove();
                                    //d3.select('#X1_dropIDR_' + this.id.split('_')[3]).remove();
                                    //d3.select('#T1_dropIDR_' + this.id.split('_')[3]).remove();

                                    $rootScope.storeProj.dFldRT1R1[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.tmpItem[sid].row.splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_Leg[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_Elem[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.colVar[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_sim[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.max[sid] = [];
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X1r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;
                                    arrLeg = [];
                                    $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);

                                    //$rootScope.action = 0
                                    //$rootScope.$applyAsync();
                                    $rootScope.func_Templ1(sid);
                                }
                            );
                            d3.select('#mn_X1r_' + (it_r) + '_' + sid).append('rect').attr('id', 'up_X1_dropIDR_' + it_r + '_' + sid).attr('x', 90).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#up_X1_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it_r = 0; it_r < $rootScope.storeProj.dFldRT1R1[sid].length; it_r++) {
                                        if (it_r === parseInt(this.id.split('_')[3]) && it_r > 0 && $rootScope.storeProj.dFldRT1R1[sid].length > 1) {
                                            $rootScope.func_swap_dflR(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_tmpItem(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_SVG_Leg(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_SVG_Elem(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_colVar(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_sims(it_r, it_r - 1, sid);
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X1r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;

                                    $rootScope.func_Templ1(sid);
                                }
                            );
                            d3.select('#mn_X1r_' + (it_r) + '_' + sid).append('rect').attr('id', 'dw_X1_dropIDR_' + it_r + '_' + sid).attr('x', 120).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#dw_X1_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it_r = 0; it_r < $rootScope.storeProj.dFldRT1R1[sid].length; it_r++) {
                                        if (it_r == parseInt(this.id.split('_')[3]) && it_r < ($rootScope.storeProj.dFldRT1R1[sid].length - 2) && $rootScope.storeProj.dFldRT1R1[sid].length > 1) {
                                            $rootScope.func_swap_dflR(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_tmpItem(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_SVG_Leg(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_SVG_Elem(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_colVar(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_sims(it_r, it_r + 1, sid);
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X1r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;

                                    $rootScope.func_Templ1(sid);
                                }
                            );
                            d3.select('#X1_dropIDR_' + (it_r) + '_' + sid).attr('stroke', 'black').text(function (d) {
                                return $rootScope.storeProj.tmpItem[sid].row[it_r].val();
                            });
                            if ($rootScope.storeProj.isoElem[sid] == undefined) {
                                $rootScope.storeProj.isoElem[sid] = [];
                            }
                            if ($rootScope.storeProj.colVar[sid] == undefined) {
                                $rootScope.storeProj.colVar[sid] = [];
                            }
                            for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                                $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                    if ($rootScope.storeProj.dFldCT1C1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                        $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                        $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                    if ($rootScope.storeProj.dFldCT1C1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                        $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                    if ($rootScope.storeProj.dFldRT1R1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                        $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                        $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                    if ($rootScope.storeProj.dFldRT1R1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                        $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                    }
                                }

                                if ($('#mn_X1c_' + (it) + '_' + sid)[0] != undefined) {
                                    $('#mn_X1c_' + (it) + '_' + sid).remove();
                                }
                                if ($('#mn_X1c_' + (it) + '_' + sid)[0] == undefined) {
                                    d3.select('#svgID1_' + sid).append('svg').attr('id', 'mn_X1c_' + ((it)) + '_' + sid).attr('class', 'mnXc').attr('x', 28 + (7 * $rootScope.storeProj.dFldRT1R1[sid][0].descrR) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.grVal[sid].p) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.tmpMax[it] + (112 * it) + 'px').attr('y', 16).style('opacity', 0);
                                    d3.select('#mn_X1c_' + (it) + '_' + sid).moveToFront();
                                }
                                d3.select('#mn_X1c_' + (it) + '_' + sid).append('rect').attr('id', 'X1_dropIDC_' + it + '_' + sid).attr('class', 'dropCL').attr('x', 30).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('stroke-width', $rootScope.storeProj.stroke_scale).style('stroke-opacity', '0.5').style('fill-opacity', '0.5').style('fill', 'rgb(166, 166, 166)').style('zIndex', 20);
                                var chk = 0;
                                $('#X1_dropIDC_' + it + '_' + sid).one({
                                    mouseenter: function () {
                                        $(this).css('fill', 'rgb(111, 111, 166)');
                                    },
                                    mouseleave: function () {
                                        $(this).css('fill', 'rgb(166, 166, 166)');
                                    },
                                    drop: function (d) {
                                        if (chk == 0) {
                                            $rootScope.func_svgDropped(0, sid, d);
                                            $rootScope.func_iFace(0, sid);
                                            chk = 1;
                                        }
                                    }
                                });


                                d3.select('#mn_X1c_' + (it) + '_' + sid).append('rect').attr('id', 'col_X1_dropIDC_' + it + '_' + sid).attr('x', 60).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,255,0)');
                                d3.select('#col_X1_dropIDC_' + it + '_' + sid).on('click', function () {
                                    var it = this.id.split('_')[3];
                                    $rootScope.storeProj.colorCL = 1;
                                    $rootScope.func_color('col', 0, it, sid, 0, '#000000');

                                });
                                d3.select('#mn_X1c_' + (it) + '_' + sid).append('rect').attr('id', 'del_X1_dropIDC_' + it + '_' + sid).attr('x', 90).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(255,0,0)');
                                d3.select('#mn_X1c_' + (it) + '_' + sid).on('mouseover', function () {
                                    //$rootScope.action = 1;
                                    $(this).fadeTo(1, 1);

                                });
                                d3.select('#mn_X1c_' + (it) + '_' + sid).on('mouseout', function () {
                                    //$rootScope.action = 1;
                                    $(this).fadeTo(1, 0);

                                });
                                d3.select('#X1_dropIDC_' + (it) + '_' + sid).attr('stroke', 'black').text(function (d) {
                                    return $rootScope.storeProj.tmpItem[sid].col[it].val();
                                });
                                d3.select('#del_X1_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                        $rootScope.storeProj.dFldCT1C1[sid].splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.tmpItem[sid].col.splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.max[sid] = [];
                                        for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                            $rootScope.storeProj.SVG_Leg[sid][it_r].splice(this.id.split('_')[3], 1);
                                            $rootScope.storeProj.SVG_Elem[sid][it_r].splice(this.id.split('_')[3], 1);
                                            $rootScope.storeProj.colVar[sid][it_r].splice(this.id.split('_')[3], 1);
                                            $rootScope.storeProj.SVG_sim[sid][it_r].splice(this.id.split('_')[3], 1);
                                        }
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                            $('#mn_X1c_' + (it) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;
                                        arrLeg = [];
                                        $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);
                                        //$rootScope.action = 0;
                                        //$rootScope.$applyAsync();
                                        $rootScope.func_Templ1(sid);
                                    }
                                );
                                d3.select('#mn_X1c_' + (it) + '_' + sid).append('rect').attr('id', 'dw_X1_dropIDC_' + it + '_' + sid).attr('x', 150).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                                d3.select('#dw_X1_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            if (it == parseInt(this.id.split('_')[3]) && $rootScope.storeProj.dFldCT1C1[sid].length > 1) {
                                                $rootScope.func_swap_dflC(it, it + 1, sid);
                                                $rootScope.func_swap_tmpItemC(it, it + 1, sid);
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Leg[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_LegC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_ElemC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.colVar[sid].length; it_r++) {
                                                    $rootScope.func_swap_colVarC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_sim[sid].length; it_r++) {
                                                    $rootScope.func_swap_simsC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.inpVal[sid].length; it_r++) {
                                                    $rootScope.func_swap_inpValC(it, it + 1, sid, it_r);
                                                }
                                            }
                                        }
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                            $('#mn_X1c_' + (it) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;
                                        $rootScope.func_Templ1(sid);
                                    }
                                );
                                d3.select('#mn_X1c_' + (it) + '_' + sid).append('rect').attr('id', 'up_X1_dropIDC_' + it + '_' + sid).attr('x', 120).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                                d3.select('#up_X1_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            if (it == parseInt(this.id.split('_')[3]) && it > 0 && $rootScope.storeProj.dFldCT1C1[sid].length > 1) {
                                                $rootScope.func_swap_dflC(it, it - 1, sid);
                                                $rootScope.func_swap_tmpItemC(it, it - 1, sid);
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Leg[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_LegC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_ElemC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.colVar[sid].length; it_r++) {
                                                    $rootScope.func_swap_colVarC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_sim[sid].length; it_r++) {
                                                    $rootScope.func_swap_simsC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.inpVal[sid].length; it_r++) {
                                                    $rootScope.func_swap_inpValC(it, it - 1, sid, it_r);
                                                }
                                            }
                                        }
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                            $('#mn_X1c_' + (it) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;
                                        $rootScope.func_Templ1(sid);
                                    }
                                );
                                if ($rootScope.storeProj.isoElem[sid][it_r] == undefined) {
                                    $rootScope.storeProj.isoElem[sid][it_r] = [];
                                }
                                if ($rootScope.storeProj.isoElem[sid][it_r][it] == undefined) {
                                    $rootScope.storeProj.isoElem[sid][it_r][it] = {};
                                }
                                if ($rootScope.storeProj.colVar[sid][it_r] == undefined) {
                                    $rootScope.storeProj.colVar[sid][it_r] = [];
                                }
                                if ($rootScope.storeProj.colVar[sid][it_r][it] == undefined) {
                                    $rootScope.storeProj.colVar[sid][it_r][it] = {};
                                }
                                for (var it_iso = 0; it_iso < $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it]); it_iso++) {
                                    if ($rootScope.storeProj.SVG_Elem[sid] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r][it] != undefined) {
                                        $rootScope.storeProj.isoElem[sid][it_r][it] = {};
                                        if (!$($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML.match('id=')) {
                                            var tempSVG = $($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML.replace('<svg ', '<svg  id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '"');
                                            $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML(tempSVG)[1];
                                        } else {
                                            if ($.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[4] == undefined) {
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[2];
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;

                                            } else {
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[4];
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;

                                            }
                                        }
                                        if (it_iso > 0 && it_iso % ($rootScope.storeProj.grVal[sid].v) == 0) {
                                            $rootScope.storeProj.grVal[sid].p += 1;
                                        }

                                        /*
                                         else {
                                         if (tmpVal == 0) {
                                         $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML('<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '" class="simCL" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28" enable-background="new 0 0 500 500" xml:space="preserve"><rect fill="#000000" stroke="#000000" x="-1" width="28" height="28"/></svg>')[2];
                                         d3.select('#c1ISOID_' + it + '_' + sid)
                                         .append('g')
                                         .attr('class', 'g1CL_' + it_r + '_' + it + '_' + sid).attr('id', function () {
                                         return 'gc1ID_' + it_r + '_' + it + '_' + it_iso + '_' + sid;
                                         })
                                         .attr('transform', function () {
                                         var x = 216 + (28 + parseInt(parseInt($rootScope.storeProj.valSc[sid]))) *it_iso + ((38 + parseInt(parseInt($rootScope.storeProj.valSc[sid])))+ 38*tmpMax[it])
                                         var y = 64 + 34 * it_r;
                                         $rootScope.storeProj.scale[sid].x = x;
                                         $rootScope.storeProj.scale[sid].y = y;
                                         return 'translate(' + x + ',' + y + ')';
                                         })
                                         .append(function () {
                                         return $rootScope.storeProj.isoElem[sid][it_r][it].iso;
                                         });

                                         }
                                         }
                                         */
                                        if ($rootScope.storeProj.colVar[sid][it_r][it] != undefined) {
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                        }
                                        $rootScope.$apply();
                                        d3.select('#c1ISOID_' + it + '_' + sid)
                                            .append('g')
                                            .attr('class', 'g1CL_' + it_r + '_' + it + '_' + sid)
                                            .attr('transform', function () {
                                                var x = 46 + (7 * $rootScope.storeProj.dFldRT1R1[sid][0].descrR) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.grVal[sid].p) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * it_iso) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.tmpMax[it] + (112 * it);
                                                var y = 64 + 34 * it_r;
                                                $rootScope.storeProj.scale[sid].x = x;
                                                $rootScope.storeProj.scale[sid].y = y;
                                                return 'translate(' + x + ',' + y + ')';
                                            })
                                            .append(function () {

                                                return $rootScope.storeProj.isoElem[sid][it_r][it].iso;
                                            });
                                    }
                                }
                                $rootScope.storeProj.grVal[sid].p = 0;
                            }
                        }

                        if ($rootScope.storeProj.tmpItem[sid].col.length > 0 && $rootScope.storeProj.tmpItem[sid].row.length > 0) {
                            for (var it = 0; it < $rootScope.storeProj.tmpLeg[sid].length; it++) {
                                d3.select('#svgVal_' + it + '_0_' + sid).attr('opacity', '1');
                                d3.select('#numVal_' + it + '_0_' + sid).attr('opacity', '1');
                            }
                        } else {
                            for (var it = 0; it < $rootScope.storeProj.tmpLeg[sid].length; it++) {
                                d3.select('#svgVal_' + it + '_0_' + sid).attr('opacity', '0');
                                d3.select('#numVal_' + it + '_0_' + sid).attr('opacity', '0');
                            }
                        }
                        for (var it_s = 0; it_s < $rootScope.storeProj.tmpLeg[sid].length; it_s++) {
                            $('#svgVal_' + it_s + '_0_' + sid).children().remove();

                            d3.select('#svgVal_' + it_s + '_0_' + sid).append('g').append(function () {
                                if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["4"] != undefined) {
                                    if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_0_' + sid + '"'))["1"];
                                        return tmpLeg;
                                    } else {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["4"];
                                        tmpLeg.id = 'svgLeg_' + it_s + '_0_' + sid;
                                        return tmpLeg;
                                    }
                                }
                                if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["2"] != undefined) {
                                    if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_0_' + sid + '"'))["1"];
                                        return tmpLeg;
                                    } else {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["2"];
                                        tmpLeg.id = 'svgLeg_' + it_s + '_0_' + sid;
                                        return tmpLeg;
                                    }
                                }
                                if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["1"] != undefined) {
                                    if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_0_' + sid + '"'))["1"];
                                        return tmpLeg;
                                    } else {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["1"];
                                        tmpLeg.id = 'svgLeg_' + it_s + '_0_' + sid;
                                        return tmpLeg;
                                    }
                                }

                            });
                            /*
                             if ($('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('path').length > 0) {
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('path').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('path').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('circle').length > 0) {
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('circle').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('circle').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('rect').length > 0) {
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('rect').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('rect').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('text').length > 0) {
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('text').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('text').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('line').length > 0) {
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('line').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('line').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('polygon').length > 0) {
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('polygon').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('polygon').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('pattern').length > 0) {
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('pattern').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('pattern').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             */
                        }
                    }
                }
                if ($rootScope.storeProj.tmpCR[sid] == 1) {
                    if ($rootScope.storeProj.max[sid] == undefined) {
                        $rootScope.storeProj.max[sid] = [];
                    }
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            if ($rootScope.storeProj.tmpItem[sid].col != undefined) {
                                for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                                    if ($rootScope.storeProj.max[sid][it] == undefined) {
                                        $rootScope.storeProj.max[sid][it] = 6;
                                    }
                                }
                            }
                        }
                        $rootScope.storeProj.tmpMax = [];
                        $rootScope.storeProj.tmpMax[0] = 0;
                        $rootScope.storeProj.tmpMax[1] = 6;
                        for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                            for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                                if ($rootScope.storeProj.grVal[sid].v != 0) {
                                    if ($rootScope.storeProj.max[sid][it] < $rootScope.func_round(($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it] + ($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.grVal[sid].v) / $rootScope.storeProj.inpVal[sid][it_r][it]))) {
                                        $rootScope.storeProj.max[sid][it] = $rootScope.func_round(($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value) / $rootScope.storeProj.inpVal[sid][it_r][it] + ($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.grVal[sid].v) / $rootScope.storeProj.inpVal[sid][it_r][it]);
                                    }
                                } else {
                                    if ($rootScope.storeProj.max[sid][it] < $rootScope.func_round(($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value) / $rootScope.storeProj.inpVal[sid][it_r][it])) {
                                        $rootScope.storeProj.max[sid][it] = $rootScope.func_round(($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value) / $rootScope.storeProj.inpVal[sid][it_r][it]);
                                    }
                                }
                            }
                        }
                        for (var it = 0; it < $rootScope.storeProj.max[sid].length; it++) {
                            $rootScope.storeProj.tmpMax[it + 1] = 0;
                            for (var it1 = 0; it1 <= it; it1++) {
                                $rootScope.storeProj.tmpMax[it + 1] += $rootScope.storeProj.max[sid][it1] + $rootScope.storeProj.grVal[sid].r[it1];
                            }
                        }
                    }
                    $rootScope.storeProj.grVal[sid].p = 0;
                    if ($rootScope.storeProj.tmpItem[sid].col != undefined) {
                        for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                            $('#c1ISOID_' + it + '_' + sid).children().remove();
                        }
                    }
                    for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                        $rootScope.storeProj.dFldCT1C1[sid][it].vc = parseInt($rootScope.storeProj.valSc[sid]);
                        $rootScope.storeProj.dFldCT1C1[sid][it].grv = $rootScope.storeProj.grVal[sid].v;
                        $rootScope.storeProj.dFldCT1C1[sid][it].grp = $rootScope.storeProj.grVal[sid].p;
                        $rootScope.storeProj.dFldCT1C1[sid][it].max = $rootScope.storeProj.tmpMax[it];
                        $rootScope.storeProj.dFldCT1C1[sid][it].rlen = $rootScope.storeProj.dFldRT1R1[sid].length;
                    }
                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                        $rootScope.storeProj.dFldRT1R1[sid][it].vc = parseInt($rootScope.storeProj.valSc[sid]);
                        $rootScope.storeProj.dFldRT1R1[sid][it].grv = $rootScope.storeProj.grVal[sid].v;
                        $rootScope.storeProj.dFldRT1R1[sid][it].grp = $rootScope.storeProj.grVal[sid].p;
                        //$rootScope.storeProj.dFldRT1R1[sid][it].max = $rootScope.storeProj.max[sid][0];
                        $rootScope.storeProj.dFldRT1R1[sid][it].clen = $rootScope.storeProj.dFldCT1C1[sid].length;

                    }
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            if ($('#mn_X1r_' + (it_r) + '_' + sid)[0] != undefined) {
                                $('#mn_X1r_' + (it_r) + '_' + sid).remove();
                            }
                            if ($('#mn_X1r_' + (it_r) + '_' + sid)[0] == undefined) {
                                d3.select('#svgID1_' + sid).append('svg').attr('id', 'mn_X1r_' + ((it_r)) + '_' + sid).attr('class', 'mnXr').attr('x', 11).attr('y', 30 + 34 * (it_r + 1) + 'px').style('opacity', 0);
                                d3.select('#mn_X1r_' + (it_r) + '_' + sid).moveToFront();
                            }
                            d3.select('#mn_X1r_' + (it_r) + '_' + sid).append('rect').attr('id', 'X1_dropIDR_' + it_r + '_' + sid).attr('class', 'dropCL').attr('x', 0).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('stroke-width', $rootScope.storeProj.stroke_scale).style('stroke-opacity', '0.5').style('fill-opacity', '0.5').style('fill', 'rgb(166, 166, 166)').style('zIndex', 20);
                            var chk = 0;
                            $('#X1_dropIDR_' + it_r + '_' + sid).one({
                                mouseenter: function () {
                                    $(this).css('fill', 'rgb(111, 111, 166)');
                                },
                                mouseleave: function () {
                                    $(this).css('fill', 'rgb(166, 166, 166)');
                                },
                                drop: function (d) {
                                    if (chk == 0) {
                                        $rootScope.func_svgDropped(0, sid, d);
                                        $rootScope.func_iFace(0, sid);
                                        chk = 1;
                                    }
                                }
                            });
                            d3.select('#mn_X1r_' + (it_r) + '_' + sid).append('rect').attr('id', 'col_X1_dropIDR_' + it_r + '_' + sid).attr('x', 30).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,255,0)');
                            d3.select('#col_X1_dropIDR_' + it_r + '_' + sid).on('click', function () {
                                var it = this.id.split('_')[3];
                                $rootScope.storeProj.colorCL = 1;
                                $rootScope.func_color('row', it, 0, sid, 0, '#000000');
                            });
                            d3.select('#mn_X1r_' + (it_r) + '_' + sid).append('rect').attr('id', 'del_X1_dropIDR_' + it_r + '_' + sid).attr('x', 60).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(255,0,0)');
                            d3.select('#mn_X1r_' + (it_r) + '_' + sid).on('mouseover', function () {
                                //$rootScope.action = 1;
                                $(this).fadeTo(1, 1);

                            });
                            d3.select('#mn_X1r_' + (it_r) + '_' + sid).on('mouseout', function () {
                                //$rootScope.action = 1;
                                $(this).fadeTo(1, 0);
                            });
                            d3.select('#del_X1_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    //d3.select('#del_X1_dropIDR_' + this.id.split('_')[3]).remove();
                                    //d3.select('#X1_dropIDR_' + this.id.split('_')[3]).remove();
                                    //d3.select('#T1_dropIDR_' + this.id.split('_')[3]).remove();

                                    $rootScope.storeProj.dFldRT1R1[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.tmpItem[sid].row.splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_Leg[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_Elem[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.colVar[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_sim[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.max[sid] = [];
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X1r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;

                                    arrLeg = [];
                                    $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);
                                    //$rootScope.action = 0;
                                    //$rootScope.$applyAsync();
                                    $rootScope.func_Templ1(sid);
                                }
                            );
                            d3.select('#mn_X1r_' + (it_r) + '_' + sid).append('rect').attr('id', 'up_X1_dropIDR_' + it_r + '_' + sid).attr('x', 90).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#up_X1_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it_r = 0; it_r < $rootScope.storeProj.dFldRT1R1[sid].length; it_r++) {
                                        if (it_r === parseInt(this.id.split('_')[3]) && it_r > 0 && $rootScope.storeProj.dFldRT1R1[sid].length > 1) {
                                            $rootScope.func_swap_dflR(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_tmpItem(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_SVG_Leg(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_SVG_Elem(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_colVar(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_sims(it_r, it_r - 1, sid);
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X1r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;
                                    $rootScope.func_Templ1(sid);
                                }
                            );
                            d3.select('#mn_X1r_' + (it_r) + '_' + sid).append('rect').attr('id', 'dw_X1_dropIDR_' + it_r + '_' + sid).attr('x', 120).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#dw_X1_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it_r = 0; it_r < $rootScope.storeProj.dFldRT1R1[sid].length; it_r++) {
                                        if (it_r == parseInt(this.id.split('_')[3]) && it_r < ($rootScope.storeProj.dFldRT1R1[sid].length - 2) && $rootScope.storeProj.dFldRT1R1[sid].length > 1) {
                                            $rootScope.func_swap_dflR(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_tmpItem(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_SVG_Leg(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_SVG_Elem(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_colVar(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_sims(it_r, it_r + 1, sid);
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X1r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;
                                    $rootScope.func_Templ1(sid);
                                }
                            );
                            d3.select('#X1_dropIDR_' + (it_r) + '_' + sid).attr('stroke', 'black').text(function (d) {
                                return $rootScope.storeProj.tmpItem[sid].row[it_r].val();
                            });
                            if ($rootScope.storeProj.isoElem[sid] == undefined) {
                                $rootScope.storeProj.isoElem[sid] = [];
                            }
                            if ($rootScope.storeProj.colVar[sid] == undefined) {
                                $rootScope.storeProj.colVar[sid] = [];
                            }
                            for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                                $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                    if ($rootScope.storeProj.dFldCT1C1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                        $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                        $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                    if ($rootScope.storeProj.dFldCT1C1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                        $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                    if ($rootScope.storeProj.dFldRT1R1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                        $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                        $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                    if ($rootScope.storeProj.dFldRT1R1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                        $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                    }
                                }

                                if ($('#mn_X1c_' + (it) + '_' + sid)[0] != undefined) {
                                    $('#mn_X1c_' + (it) + '_' + sid).remove();
                                }
                                if ($('#mn_X1c_' + (it) + '_' + sid)[0] == undefined) {
                                    d3.select('#svgID1_' + sid).append('svg').attr('id', 'mn_X1c_' + ((it)) + '_' + sid).attr('class', 'mnXc').attr('x', 28 + (7 * $rootScope.storeProj.dFldRT1R1[sid][0].descrR) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.grVal[sid].p) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.tmpMax[it] + (112 * it) + 'px').attr('y', 16).style('opacity', 0);
                                    d3.select('#mn_X1c_' + (it) + '_' + sid).moveToFront();
                                }
                                d3.select('#mn_X1c_' + (it) + '_' + sid).append('rect').attr('id', 'X1_dropIDC_' + it + '_' + sid).attr('class', 'dropCL').attr('x', 30).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('stroke-width', $rootScope.storeProj.stroke_scale).style('stroke-opacity', '0.5').style('fill-opacity', '0.5').style('fill', 'rgb(166, 166, 166)').style('zIndex', 20);
                                var chk = 0;
                                $('#X1_dropIDC_' + it + '_' + sid).one({
                                    mouseenter: function () {
                                        $(this).css('fill', 'rgb(111, 111, 166)');
                                    },
                                    mouseleave: function () {
                                        $(this).css('fill', 'rgb(166, 166, 166)');
                                    },
                                    drop: function (d) {
                                        if (chk == 0) {
                                            $rootScope.func_svgDropped(0, sid, d);
                                            $rootScope.func_iFace(0, sid);
                                            chk = 1;
                                        }
                                    }
                                });


                                d3.select('#mn_X1c_' + (it) + '_' + sid).append('rect').attr('id', 'col_X1_dropIDC_' + it + '_' + sid).attr('x', 60).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,255,0)');
                                d3.select('#col_X1_dropIDC_' + it + '_' + sid).on('click', function () {
                                    var it = this.id.split('_')[3];
                                    $rootScope.storeProj.colorCL = 1;
                                    $rootScope.func_color('col', 0, it, sid, 0, '#000000');

                                });
                                d3.select('#mn_X1c_' + (it) + '_' + sid).append('rect').attr('id', 'del_X1_dropIDC_' + it + '_' + sid).attr('x', 90).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(255,0,0)');
                                d3.select('#mn_X1c_' + (it) + '_' + sid).on('mouseover', function () {
                                    //$rootScope.action = 1;
                                    $(this).fadeTo(1, 1);

                                });
                                d3.select('#mn_X1c_' + (it) + '_' + sid).on('mouseout', function () {
                                    //$rootScope.action = 1;
                                    $(this).fadeTo(1, 0);

                                });
                                d3.select('#X1_dropIDC_' + (it) + '_' + sid).attr('stroke', 'black').text(function (d) {
                                    return $rootScope.storeProj.tmpItem[sid].col[it].val();
                                });
                                d3.select('#del_X1_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                        $rootScope.storeProj.dFldCT1C1[sid].splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.tmpItem[sid].col.splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.max[sid] = [];
                                        for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                            $rootScope.storeProj.SVG_Leg[sid][it_r].splice(this.id.split('_')[3], 1);
                                            $rootScope.storeProj.SVG_Elem[sid][it_r].splice(this.id.split('_')[3], 1);
                                            $rootScope.storeProj.colVar[sid][it_r].splice(this.id.split('_')[3], 1);
                                            $rootScope.storeProj.SVG_sim[sid][it_r].splice(this.id.split('_')[3], 1);
                                        }
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                            $('#mn_X1c_' + (it) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;
                                        arrLeg = [];
                                        $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);

                                        //$rootScope.action = 0;
                                        //$rootScope.$applyAsync();
                                        $rootScope.func_Templ1(sid);
                                    }
                                );
                                d3.select('#mn_X1c_' + (it) + '_' + sid).append('rect').attr('id', 'dw_X1_dropIDC_' + it + '_' + sid).attr('x', 150).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                                d3.select('#dw_X1_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            if (it == parseInt(this.id.split('_')[3]) && $rootScope.storeProj.dFldCT1C1[sid].length > 1) {
                                                $rootScope.func_swap_dflC(it, it + 1, sid);
                                                $rootScope.func_swap_tmpItemC(it, it + 1, sid);
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Leg[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_LegC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_ElemC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.colVar[sid].length; it_r++) {
                                                    $rootScope.func_swap_colVarC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_sim[sid].length; it_r++) {
                                                    $rootScope.func_swap_simsC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.inpVal[sid].length; it_r++) {
                                                    $rootScope.func_swap_inpValC(it, it + 1, sid, it_r);
                                                }
                                            }
                                        }
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                            $('#mn_X1c_' + (it) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;
                                        $rootScope.func_Templ1(sid);
                                    }
                                );
                                d3.select('#mn_X1c_' + (it) + '_' + sid).append('rect').attr('id', 'up_X1_dropIDC_' + it + '_' + sid).attr('x', 120).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                                d3.select('#up_X1_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            if (it == parseInt(this.id.split('_')[3]) && it > 0 && $rootScope.storeProj.dFldCT1C1[sid].length > 1) {
                                                $rootScope.func_swap_dflC(it, it - 1, sid);
                                                $rootScope.func_swap_tmpItemC(it, it - 1, sid);
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Leg[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_LegC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_ElemC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.colVar[sid].length; it_r++) {
                                                    $rootScope.func_swap_colVarC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_sim[sid].length; it_r++) {
                                                    $rootScope.func_swap_simsC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.inpVal[sid].length; it_r++) {
                                                    $rootScope.func_swap_inpValC(it, it - 1, sid, it_r);
                                                }
                                            }
                                        }
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                            $('#mn_X1c_' + (it) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;
                                        $rootScope.func_Templ1(sid);
                                    }
                                );
                                if ($rootScope.storeProj.isoElem[sid][it_r] == undefined) {
                                    $rootScope.storeProj.isoElem[sid][it_r] = [];
                                }
                                if ($rootScope.storeProj.isoElem[sid][it_r][it] == undefined) {
                                    $rootScope.storeProj.isoElem[sid][it_r][it] = {};
                                }
                                if ($rootScope.storeProj.colVar[sid][it_r] == undefined) {
                                    $rootScope.storeProj.colVar[sid][it_r] = [];
                                }
                                if ($rootScope.storeProj.colVar[sid][it_r][it] == undefined) {
                                    $rootScope.storeProj.colVar[sid][it_r][it] = {};
                                }

                                for (var it_iso = 0; it_iso < $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it]); it_iso++) {
                                    if ($rootScope.storeProj.SVG_Elem[sid] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r][it] != undefined) {
                                        $rootScope.storeProj.isoElem[sid][it_r][it] = {};
                                        if (!$($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML.match('id=')) {
                                            var tempSVG = $($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML.replace('<svg ', '<svg  id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '"');
                                            $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML(tempSVG)[1];
                                        } else {
                                            if ($.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[4] == undefined) {
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[2];
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;

                                            } else {
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[4];
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;

                                            }
                                        }
                                        if (it_iso > 0 && it_iso % ($rootScope.storeProj.grVal[sid].v) == 0) {
                                            $rootScope.storeProj.grVal[sid].p += 1;
                                        }


                                        /*
                                         else {
                                         if (tmpVal == 0) {
                                         $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML('<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '" class="simCL" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28" enable-background="new 0 0 500 500" xml:space="preserve"><rect fill="#000000" stroke="#000000" x="-1" width="28" height="28"/></svg>')[2];
                                         d3.select('#c1ISOID_' + it + '_' + sid)
                                         .append('g')
                                         .attr('class', 'g1CL_' + it_r + '_' + it + '_' + sid).attr('id', function () {
                                         return 'gc1ID_' + it_r + '_' + it + '_' + it_iso + '_' + sid;
                                         })
                                         .attr('transform', function () {
                                         var x = 216 + (28 + parseInt(parseInt($rootScope.storeProj.valSc[sid]))) *it_iso + ((38 + parseInt(parseInt($rootScope.storeProj.valSc[sid])))+ 38*tmpMax[it])
                                         var y = 64 + 34 * it_r;
                                         $rootScope.storeProj.scale[sid].x = x;
                                         $rootScope.storeProj.scale[sid].y = y;
                                         return 'translate(' + x + ',' + y + ')';
                                         })
                                         .append(function () {
                                         return $rootScope.storeProj.isoElem[sid][it_r][it].iso;
                                         });

                                         }
                                         }
                                         */
                                        if ($rootScope.storeProj.colVar[sid][it_r][it] != undefined) {
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                        }
                                    }
                                    $rootScope.$apply();
                                    d3.select('#c1ISOID_' + it + '_' + sid)
                                        .append('g')
                                        .attr('class', 'g1CL_' + it_r + '_' + it + '_' + sid)
                                        .attr('transform', function () {
                                            var x = 46 + (7 * $rootScope.storeProj.dFldRT1R1[sid][0].descrR) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.grVal[sid].p) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * it_iso) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.tmpMax[it] + (112 * it);
                                            var y = 64 + 34 * it_r;
                                            $rootScope.storeProj.scale[sid].x = x;
                                            $rootScope.storeProj.scale[sid].y = y;
                                            return 'translate(' + x + ',' + y + ')';
                                        })
                                        .append(function () {
                                            return $rootScope.storeProj.isoElem[sid][it_r][it].iso;
                                        });
                                }
                                $rootScope.storeProj.grVal[sid].p = 0;
                            }
                        }

                        if ($rootScope.storeProj.tmpItem[sid].col.length > 0 && $rootScope.storeProj.tmpItem[sid].row.length > 0) {
                            for (var it = 0; it < $rootScope.storeProj.tmpLeg[sid].length; it++) {
                                d3.select('#svgVal_' + it + '_0_' + sid).attr('opacity', '1');
                                d3.select('#numVal_' + it + '_0_' + sid).attr('opacity', '1');
                            }
                        } else {
                            for (var it = 0; it < $rootScope.storeProj.tmpLeg[sid].length; it++) {
                                d3.select('#svgVal_' + it + '_0_' + sid).attr('opacity', '0');
                                d3.select('#numVal_' + it + '_0_' + sid).attr('opacity', '0');
                            }
                        }
                        for (var it_s = 0; it_s < $rootScope.storeProj.tmpLeg[sid].length; it_s++) {
                            $('#svgVal_' + it_s + '_0_' + sid).children().remove();

                            d3.select('#svgVal_' + it_s + '_0_' + sid).append('g').append(function () {
                                if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["4"] != undefined) {
                                    if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_0_' + sid + '"'))["1"];
                                        return tmpLeg;
                                    } else {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["4"];
                                        tmpLeg.id = 'svgLeg_' + it_s + '_0_' + sid;
                                        return tmpLeg;
                                    }
                                }
                                if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["2"] != undefined) {
                                    if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_0_' + sid + '"'))["1"];
                                        return tmpLeg;
                                    } else {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["2"];
                                        tmpLeg.id = 'svgLeg_' + it_s + '_0_' + sid;
                                        return tmpLeg;
                                    }
                                }
                                if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["1"] != undefined) {
                                    if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_0_' + sid + '"'))["1"];
                                        return tmpLeg;
                                    } else {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["1"];
                                        tmpLeg.id = 'svgLeg_' + it_s + '_0_' + sid;
                                        return tmpLeg;
                                    }
                                }

                            });
                            /*
                             if ($('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('path').length > 0) {
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('path').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('path').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('circle').length > 0) {
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('circle').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('circle').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('rect').length > 0) {
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('rect').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('rect').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('text').length > 0) {
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('text').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('text').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('line').length > 0) {
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('line').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('line').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('polygon').length > 0) {
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('polygon').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('polygon').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('pattern').length > 0) {
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('pattern').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_' + tmpVal + '_' + sid).find('pattern').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             */
                        }
                    }
                }
            }, 0, false);
        };
        $rootScope.func_Templ2 = function (sid) {
            $timeout(function () {
                func_dCol();
                console.log($rootScope.storeProj.chkSCVal);
                if ($rootScope.storeProj.chkSCVal == 0) {
                    $('.optionCL').css('visibility', 'hidden');
                }
                if ($rootScope.storeProj.headline[$rootScope.storeProj.slideID].length == 0) {
                    $rootScope.storeProj.yPosLine[$rootScope.storeProj.slideID] = 0;
                }
                if ($rootScope.storeProj.headline[$rootScope.storeProj.slideID].length > 0) {
                    $rootScope.storeProj.yPosLine[$rootScope.storeProj.slideID] = 32;
                }
                $rootScope.storeProj.it[sid] = 0;
                $rootScope.storeProj.colors[sid] = ["#5b9254", "#e64639", "#1a4e53", "#d99a00", "#cccccc", "#000000"];
                $('.descrCL').css('outline', '0');
                $('.descrCL').css('outline-offset', '-2px');

                $('#tmplID_1_' + sid).css('outline', '5px auto -webkit-focus-ring-color');
                $('#tmplID_1_' + sid).css('outline-offset', '-2px');

                $('.templCL').css('outline', '0');
                $('.templCL').css('outline-offset', '-2px');

                $('#Templ2_' + sid).css('outline', '5px auto -webkit-focus-ring-color');
                $('#Templ2_' + sid).css('outline-offset', '-2px');
                $rootScope.storeProj.max[sid] = [];
                $rootScope.storeProj.max3[sid] = [];
                if ($rootScope.storeProj.inpVal[sid] == undefined) {
                    $rootScope.storeProj.inpVal[sid] = [];
                }
                if ($rootScope.storeProj.tmpItem[sid] != undefined && $rootScope.storeProj.tmpItem[sid].row != undefined) {
                    for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].row.length; it++) {
                        if ($rootScope.storeProj.inpVal[sid][it] == undefined) {
                            $rootScope.storeProj.inpVal[sid][it] = [];
                        }
                        if ($rootScope.storeProj.SVG_Leg[sid][it] != undefined) {
                            for (var it_1 = 0; it_1 < $rootScope.storeProj.tmpItem[sid].col.length; it_1++) {
                                if ($rootScope.storeProj.inpVal[sid][it][it_1] == undefined) {
                                    if ($rootScope.storeProj.SVG_Leg[sid][it][it_1] != undefined) {
                                        $rootScope.storeProj.inpVal[sid][it][it_1] = $rootScope.storeProj.SVG_Leg[sid][it][it_1].valt;
                                    } else {
                                        $rootScope.storeProj.inpVal[sid][it][it_1] = 1;
                                    }
                                }
                            }
                        }
                    }
                }
                $rootScope.func_maxValue(sid);
                d3.selection.prototype.moveToFront = function () {
                    return this.each(function () {
                        this.parentNode.appendChild(this);
                    });
                };
                d3.selection.prototype.moveToBack = function () {
                    return this.each(function () {
                        var firstChild = this.parentNode.firstChild;
                        if (firstChild) {
                            this.parentNode.insertBefore(this, firstChild);
                        }
                    });
                };
                $rootScope.tmpID = 1;
                $rootScope.storeProj.slides[sid].tmp = 1;
                $rootScope.$apply(); // switch templates preparation
                $rootScope.T_h1 = parseInt($('.templ').css('height').split('px')[0]);
                if ($rootScope.storeProj.tmpCR[sid] == 0) {
                    if ($rootScope.storeProj.max[sid] == undefined) {
                        $rootScope.storeProj.max[sid] = [];
                    }
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            if ($rootScope.storeProj.max[sid][it_r] == undefined) {
                                $rootScope.storeProj.max[sid][it_r] = 6;
                            }
                        }
                    }
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            $('#r2ISOID_' + it_r + '_' + sid).children().remove();
                        }
                    }
                    if ($rootScope.storeProj.tmpItem[sid].col != undefined) {
                        for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                            for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                                $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                    if ($rootScope.storeProj.dFldCT1C1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                        $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                        $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                    if ($rootScope.storeProj.dFldCT1C1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                        $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                    if ($rootScope.storeProj.dFldRT1R1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                        $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                        $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                    if ($rootScope.storeProj.dFldRT1R1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                        $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                    }
                                }
                            }
                            if ($('#mn_X2c_' + (it) + '_' + sid)[0] != undefined) {
                                $('#mn_X2c_' + (it) + '_' + sid).remove();
                            }
                            if ($('#mn_X2c_' + (it) + '_' + sid)[0] == undefined) {
                                d3.select('#svgID2_' + sid).append('svg').attr('id', 'mn_X2c_' + ((it)) + '_' + sid).attr('class', 'mnXc').attr('x', 64 + (7 * $rootScope.storeProj.dFldRT1R1[sid][0].descrR)).attr('y', -34.5 + 31 + 34 * (it + 1) + 'px').style('opacity', 0);
                                d3.select('#mn_X2c_' + (it) + '_' + sid).moveToFront();
                            }
                            d3.select('#mn_X2c_' + (it) + '_' + sid).append('rect').attr('id', 'X2_dropIDC_' + it + '_' + sid).attr('class', 'dropCL').attr('x', 0).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('stroke-width', $rootScope.storeProj.stroke_scale).style('stroke-opacity', '0.5').style('fill-opacity', '0.5').style('fill', 'rgb(166, 166, 166)').style('zIndex', 20);
                            var chk = 0;
                            $('#X2_dropIDC_' + it + '_' + sid).one({
                                mouseenter: function () {
                                    $(this).css('fill', 'rgb(111, 111, 166)');
                                },
                                mouseleave: function () {
                                    $(this).css('fill', 'rgb(166, 166, 166)');
                                },
                                drop: function (d) {
                                    if (chk == 0) {
                                        $rootScope.func_svgDropped(1, sid, d);
                                        $rootScope.func_iFace(1, sid);
                                        chk = 1;
                                    }
                                }
                            });
                            d3.select('#mn_X2c_' + (it) + '_' + sid).append('rect').attr('id', 'col_X2_dropIDC_' + it + '_' + sid).attr('x', 30).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,255,0)');
                            d3.select('#col_X2_dropIDC_' + it + '_' + sid).on('click', function () {
                                var it = this.id.split('_')[3];
                                $rootScope.storeProj.colorCL = 1;
                                $rootScope.func_color('col', 0, it, sid, 1, '#000000');
                            });
                            d3.select('#mn_X2c_' + (it) + '_' + sid).append('rect').attr('id', 'del_X2_dropIDC_' + it + '_' + sid).attr('x', 60).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(255,0,0)');
                            $('#mn_X2c_' + (it) + '_' + sid).on('mouseover', function () {
                                //$rootScope.action = 1;
                                $(this).fadeTo(1, 1);

                            });
                            d3.select('#mn_X2c_' + (it) + '_' + sid).on('mouseout', function () {
                                //$rootScope.action = 1;
                                $(this).fadeTo(1, 0);

                            });
                            d3.select('#del_X2_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                    for (var it1 = $rootScope.storeProj.tmpItem[sid].col.length; it1 <= $rootScope.storeProj.tmpItem[sid].col.length * ($rootScope.storeProj.tmpItem[sid].row.length + 1); it1++) {
                                        if (it1 == $rootScope.storeProj.tmpItem[sid].col.length) {
                                            d3.select('#X2_dropIDC_' + (it1) + '_' + sid).property('value', '');
                                        } else {
                                            d3.select('#X2_dropIDC_' + (it1) + '_' + sid).remove();
                                        }
                                    }
                                    $rootScope.storeProj.max[sid][0] = 6;
                                    $rootScope.storeProj.dFldCT1C1[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.tmpItem[sid].col.splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.max[sid] = [];

                                    for (var it_r1 = 0; it_r1 < $rootScope.storeProj.tmpItem[sid].row.length; it_r1++) {
                                        $rootScope.storeProj.SVG_Elem[sid][it_r1].splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.SVG_Leg[sid][it_r1].splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.colVar[sid][it_r1].splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.SVG_sim[sid][it_r1].splice(this.id.split('_')[3], 1);
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                        $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                        $('#mn_X2c_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;
                                    arrLeg = [];
                                    $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);

                                    //$rootScope.action = 0;
                                    //$rootScope.$applyAsync();
                                    $rootScope.func_Templ2(sid);
                                }
                            );
                            d3.select('#mn_X2c_' + (it) + '_' + sid).append('rect').attr('id', 'dw_X2_dropIDC_' + it + '_' + sid).attr('x', 120).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#dw_X2_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                    for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                        if (it == parseInt(this.id.split('_')[3]) && $rootScope.storeProj.dFldCT1C1[sid].length > 1) {
                                            $rootScope.func_swap_dflC(it, it + 1, sid);
                                            $rootScope.func_swap_tmpItemC(it, it + 1, sid);
                                            for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Leg[sid].length; it_r++) {
                                                $rootScope.func_swap_SVG_LegC(it, it + 1, sid, it_r);
                                            }
                                            for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                                $rootScope.func_swap_SVG_ElemC(it, it + 1, sid, it_r);
                                            }
                                            for (var it_r = 0; it_r < $rootScope.storeProj.colVar[sid].length; it_r++) {
                                                $rootScope.func_swap_colVarC(it, it + 1, sid, it_r);
                                            }
                                            for (var it_r = 0; it_r < $rootScope.storeProj.SVG_sim[sid].length; it_r++) {
                                                $rootScope.func_swap_simsC(it, it + 1, sid, it_r);
                                            }
                                            for (var it_r = 0; it_r < $rootScope.storeProj.inpVal[sid].length; it_r++) {
                                                $rootScope.func_swap_inpValC(it, it + 1, sid, it_r);
                                            }
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                        $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                        $('#mn_X2c_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;
                                    $rootScope.func_Templ2(sid);
                                }
                            );
                            d3.select('#mn_X2c_' + (it) + '_' + sid).append('rect').attr('id', 'up_X2_dropIDC_' + it + '_' + sid).attr('x', 90).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#up_X2_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                    for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                        if (it == parseInt(this.id.split('_')[3]) && it > 0 && $rootScope.storeProj.dFldCT1C1[sid].length > 1) {
                                            $rootScope.func_swap_dflC(it, it - 1, sid);
                                            $rootScope.func_swap_tmpItemC(it, it - 1, sid);
                                            for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Leg[sid].length; it_r++) {
                                                $rootScope.func_swap_SVG_LegC(it, it - 1, sid, it_r);
                                            }
                                            for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                                $rootScope.func_swap_SVG_ElemC(it, it - 1, sid, it_r);
                                            }
                                            for (var it_r = 0; it_r < $rootScope.storeProj.colVar[sid].length; it_r++) {
                                                $rootScope.func_swap_colVarC(it, it - 1, sid, it_r);
                                            }
                                            for (var it_r = 0; it_r < $rootScope.storeProj.SVG_sim[sid].length; it_r++) {
                                                $rootScope.func_swap_simsC(it, it - 1, sid, it_r);
                                            }
                                            for (var it_r = 0; it_r < $rootScope.storeProj.inpVal[sid].length; it_r++) {
                                                $rootScope.func_swap_inpValC(it, it - 1, sid, it_r);
                                            }
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                        $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                        $('#mn_X2c_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;
                                    $rootScope.func_Templ2(sid);
                                }
                            );
                            d3.select('#X2_dropIDC_' + (it) + '_' + sid).attr('stroke', 'black').text(function (d) {
                                return $rootScope.storeProj.tmpItem[sid].col[it].val();
                            });
                            if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                                for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                                    if ($rootScope.storeProj.max[sid][it_r] < $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it])) {
                                        $rootScope.storeProj.max[sid][it_r] = $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it]);
                                    }
                                }
                            }
                            for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                                for (var it_g = 0; it_g < $rootScope.storeProj.max[sid].length; it_g++) {
                                    if ($rootScope.storeProj.max[sid][it_r] < $rootScope.storeProj.max[sid][it_g]) {
                                        $rootScope.storeProj.max[sid][it_r] = $rootScope.storeProj.max[sid][it_g];
                                    }
                                }
                            }
                        }
                    }
                    if ($rootScope.storeProj.max[sid][0] != undefined) {
                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                            $rootScope.storeProj.dFldCT1C1[sid][it].vc = parseInt($rootScope.storeProj.valSc[sid]);
                            $rootScope.storeProj.dFldCT1C1[sid][it].grv = $rootScope.storeProj.grVal[sid].v;
                            $rootScope.storeProj.dFldCT1C1[sid][it].grp = $rootScope.storeProj.grVal[sid].p;
                            $rootScope.storeProj.dFldCT1C1[sid][it].max = $rootScope.storeProj.max[sid][0];
                            $rootScope.storeProj.dFldCT1C1[sid][it].rlen = $rootScope.storeProj.dFldRT1R1[sid].length;
                        }
                        for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                            $rootScope.storeProj.dFldRT1R1[sid][it].vc = parseInt($rootScope.storeProj.valSc[sid]);
                            $rootScope.storeProj.dFldRT1R1[sid][it].grv = $rootScope.storeProj.grVal[sid].v;
                            $rootScope.storeProj.dFldRT1R1[sid][it].grp = $rootScope.storeProj.grVal[sid].p;
                            $rootScope.storeProj.dFldRT1R1[sid][it].max = $rootScope.storeProj.max[sid][0];
                            $rootScope.storeProj.dFldRT1R1[sid][it].clen = $rootScope.storeProj.dFldCT1C1[sid].length;
                        }
                    }
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            if ($('#mn_X2r_' + (it_r) + '_' + sid)[0] != undefined) {
                                $('#mn_X2r_' + (it_r) + '_' + sid).remove();
                            }
                            if ($('#mn_X1r_' + (it_r) + '_' + sid)[0] == undefined) {
                                d3.select('#svgID2_' + sid).append('svg').attr('id', 'mn_X2r_' + ((it_r)) + '_' + sid).attr('class', 'mnXr').attr('x', 11).attr('y', 30 + 34 * (it_r + 1) * ($rootScope.storeProj.dFldCT1C1[sid].length) - (34 * $rootScope.storeProj.dFldCT1C1[sid].length - 1 / 2) + 'px').style('opacity', 0);
                                d3.select('#mn_X2r_' + (it_r) + '_' + sid).moveToFront();
                            }
                            d3.select('#mn_X2r_' + (it_r) + '_' + sid).append('rect').attr('id', 'X2_dropIDR_' + it_r + '_' + sid).attr('class', 'dropCL').attr('x', 0).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('stroke-width', $rootScope.storeProj.stroke_scale).style('stroke-opacity', '0.5').style('fill-opacity', '0.5').style('fill', 'rgb(166, 166, 166)').style('zIndex', 20);
                            var chk = 0;
                            $('#X2_dropIDR_' + it_r + '_' + sid).one({
                                mouseenter: function () {
                                    $(this).css('fill', 'rgb(111, 111, 166)');
                                },
                                mouseleave: function () {
                                    $(this).css('fill', 'rgb(166, 166, 166)');
                                },
                                drop: function (d) {
                                    if (chk == 0) {
                                        $rootScope.func_svgDropped(1, sid, d);
                                        $rootScope.func_iFace(1, sid);
                                        chk = 1;
                                    }
                                }
                            });
                            d3.select('#mn_X2r_' + (it_r) + '_' + sid).append('rect').attr('id', 'col_X2_dropIDR_' + it_r + '_' + sid).attr('x', 30).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,255,0)');
                            d3.select('#col_X2_dropIDR_' + it_r + '_' + sid).on('click', function () {
                                var it = this.id.split('_')[3];
                                $rootScope.storeProj.colorCL = 1;
                                $rootScope.func_color('row', it, 0, sid, 1, '#000000');

                            });
                            d3.select('#mn_X2r_' + (it_r) + '_' + sid).append('rect').attr('id', 'del_X2_dropIDR_' + it_r + '_' + sid).attr('x', 60).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(255,0,0)');
                            d3.select('#mn_X2r_' + (it_r) + '_' + sid).on('mouseover', function () {
                                //$rootScope.action = 1;
                                $(this).fadeTo(1, 1);

                            });
                            d3.select('#mn_X2r_' + (it_r) + '_' + sid).on('mouseout', function () {
                                //$rootScope.action = 1;
                                $(this).fadeTo(1, 0);

                            });
                            d3.select('#del_X2_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it1 = $rootScope.storeProj.tmpItem[sid].col.length; it1 <= $rootScope.storeProj.tmpItem[sid].col.length * ($rootScope.storeProj.tmpItem[sid].row.length + 1); it1++) {
                                        d3.select('#X2_dropIDC_' + (it1) + '_' + sid).remove();
                                    }

                                    $rootScope.storeProj.dFldRT1R1[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.tmpItem[sid].row.splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_Leg[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_Elem[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.colVar[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_sim[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.max[sid] = [];
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X2r_' + (it) + '_' + sid).remove();
                                    }

                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;
                                    arrLeg = [];
                                    $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);

                                    //$rootScope.action = 0;
                                    //$rootScope.$applyAsync();
                                    $rootScope.func_Templ2(sid);

                                }
                            );
                            d3.select('#mn_X2r_' + (it_r) + '_' + sid).append('rect').attr('id', 'up_X2_dropIDR_' + it_r + '_' + sid).attr('x', 90).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#up_X2_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it_r = 0; it_r < $rootScope.storeProj.dFldRT1R1[sid].length; it_r++) {
                                        if (it_r === parseInt(this.id.split('_')[3]) && it_r > 0 && $rootScope.storeProj.dFldRT1R1[sid].length > 1) {
                                            $rootScope.func_swap_dflR(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_tmpItem(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_SVG_Leg(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_SVG_Elem(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_colVar(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_sims(it_r, it_r - 1, sid);
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X2r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;
                                    $rootScope.func_Templ2(sid);
                                }
                            );
                            d3.select('#mn_X2r_' + (it_r) + '_' + sid).append('rect').attr('id', 'dw_X2_dropIDR_' + it_r + '_' + sid).attr('x', 120).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#dw_X2_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it_r = 0; it_r < $rootScope.storeProj.dFldRT1R1[sid].length; it_r++) {
                                        if (it_r == parseInt(this.id.split('_')[3]) && it_r < ($rootScope.storeProj.dFldRT1R1[sid].length - 2) && $rootScope.storeProj.dFldRT1R1[sid].length > 1) {
                                            $rootScope.func_swap_dflR(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_tmpItem(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_SVG_Leg(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_SVG_Elem(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_colVar(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_sims(it_r, it_r + 1, sid);
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X2r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;
                                    $rootScope.func_Templ2(sid);
                                }
                            );
                            d3.select('#X2_dropIDR_' + (it_r) + '_' + sid).attr('stroke', 'black').text(function (d) {
                                return $rootScope.storeProj.tmpItem[sid].row[it_r].val();
                            });
                            if ($rootScope.storeProj.isoElem[sid] == undefined) {
                                $rootScope.storeProj.isoElem[sid] = [];
                            }
                            if ($rootScope.storeProj.isoElem[sid][it_r] == undefined) {
                                $rootScope.storeProj.isoElem[sid][it_r] = [];
                            }
                            if ($rootScope.storeProj.colVar[sid] == undefined) {
                                $rootScope.storeProj.colVar[sid] = [];
                            }
                            if ($rootScope.storeProj.colVar[sid][it_r] == undefined) {
                                $rootScope.storeProj.colVar[sid][it_r] = [];
                            }
                            for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                                for (var it_iso = 0; it_iso < $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it]); it_iso++) {
                                    if ($rootScope.storeProj.SVG_Elem[sid] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r][it] != undefined) {
                                        $rootScope.storeProj.isoElem[sid][it_r][it] = {};
                                        if (!$($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML.match('id=')) {
                                            var tempSVG = $($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML.replace('<svg ', '<svg  id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '"');
                                            $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML(tempSVG)[1];
                                        } else {
                                            if ($.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[4] == undefined) {
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[2];
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;

                                            } else {
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[4];
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;

                                            }
                                        }

                                        if (it_r > 0) {
                                            if (it_r == 1) {
                                                d3.select('#X2_dropIDC_' + ((it + 1) + ($rootScope.storeProj.tmpItem[sid].col.length * (it_r))) + '_' + sid).remove();
                                            }
                                            d3.select('#X2_dropIDC_' + ((it + 1) + ($rootScope.storeProj.tmpItem[sid].col.length * (it_r + 1))) + '_' + sid).remove();
                                            d3.select('.T2colDivCL_' + sid).append('text').attr('id', 'X2_dropIDC_' + ((it + 1) + ($rootScope.storeProj.tmpItem[sid].col.length * (it_r + 1))) + '_' + sid);
                                            d3.select('#X2_dropIDC_' + ((it + 1) + ($rootScope.storeProj.tmpItem[sid].col.length * (it_r + 1))) + '_' + sid).attr('x', 64 + (7 * $rootScope.storeProj.dFldRT1R1[sid][0].descrR)).attr('y', ((34 * ($rootScope.storeProj.tmpItem[sid].col.length * (it_r))) + (49 + 34 * it) + (34 * (it_r)))).attr('font-family', 'Arial, "Helvetica Neue", Helvetica').attr('font-size', '0.9em').attr('stroke', 'black').attr('stroke-width', 0.1).text(function (d) {
                                                return $rootScope.storeProj.tmpItem[sid].col[it].val();
                                            });
                                        }
                                        if (it_iso > 0 && it_iso % ($rootScope.storeProj.grVal[sid].v) == 0) {
                                            $rootScope.storeProj.grVal[sid].p += 1;
                                        }

                                        /*
                                         else {

                                         if (tmpVal == 1) {
                                         $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML('<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '" class="simCL" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28" enable-background="new 0 0 500 500" xml:space="preserve"><rect fill="#000000" stroke="#000000" x="-1" width="28" height="28"/></svg>')[2];
                                         if (it_r > 0) {
                                         if (it_r == 1) {
                                         d3.select('#X2_dropIDC_' + ((it + 1) + ($rootScope.storeProj.tmpItem[sid].col.length * (it_r))) + '_' + sid).remove();
                                         }
                                         d3.select('#X2_dropIDC_' + ((it + 1) + ($rootScope.storeProj.tmpItem[sid].col.length * (it_r + 1))) + '_' + sid).remove();
                                         d3.select('.T2colDivCL_' + sid).append('text').attr('id', 'X2_dropIDC_' + ((it + 1) + ($rootScope.storeProj.tmpItem[sid].col.length * (it_r + 1))) + '_' + sid);
                                         d3.select('#X2_dropIDC_' + ((it + 1) + ($rootScope.storeProj.tmpItem[sid].col.length * (it_r + 1))) + '_' + sid).attr('x', 181).attr('y', (34 * ($rootScope.storeProj.tmpItem[sid].col.length * (it_r))) + (78 + 34 * it) + (34 * (it_r))).attr('font-family', 'Arial, "Helvetica Neue", Helvetica').attr('font-size', '0.9em').attr('stroke', 'black').attr('stroke-width', 0.1).text(function (d) {
                                         return $rootScope.storeProj.tmpItem[sid].col[it].val();
                                         });
                                         }
                                         d3.select('#r2ISOID_' + it_r + '_' + sid)
                                         .append('g')
                                         .attr('class', 'g2CL_' + it_r + '_' + it + '_' + sid).attr('id', function () {
                                         return 'gc2ID_' + it_r + '_' + it + '_' + it_iso + '_' + sid;
                                         })
                                         .attr('transform', function () {
                                         var x = 260 + (28 + parseInt(parseInt($rootScope.storeProj.valSc[sid]))) *it_iso;
                                         var y = (34 * ($rootScope.storeProj.tmpItem[sid].col.length * (it_r))) + (64 + 34 * (it)) + (34 * (it_r));
                                         $rootScope.storeProj.scale[sid].x = x;
                                         $rootScope.storeProj.scale[sid].y = y;
                                         return 'translate(' + x + ',' + y + ')';
                                         })
                                         .append(function () {
                                         return $rootScope.storeProj.isoElem[sid][it_r][it].iso;
                                         });
                                         }
                                         }
                                         */
                                        if ($rootScope.storeProj.colVar[sid][it_r][it] != undefined) {
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                        }
                                    }
                                    $rootScope.$apply();
                                    d3.select('#r2ISOID_' + it_r + '_' + sid)
                                        .append('g')
                                        .attr('class', 'g2CL_' + it_r + '_' + it + '_' + sid)
                                        .attr('transform', function () {
                                            var x = 138 + (7 * $rootScope.storeProj.dFldCT1C1[sid][0].descrC) + (7 * $rootScope.storeProj.dFldRT1R1[sid][0].descrR) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.grVal[sid].p) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * it_iso;
                                            var y = (-34.5 + (34 * ($rootScope.storeProj.tmpItem[sid].col.length * (it_r))) + (64 + 34 * (it)) + (34 * (it_r)));
                                            $rootScope.storeProj.scale[sid].x = x;
                                            $rootScope.storeProj.scale[sid].y = y;
                                            return 'translate(' + x + ',' + y + ')';
                                        })
                                        .append(function () {
                                            return $rootScope.storeProj.isoElem[sid][it_r][it].iso;
                                        });
                                }
                                $rootScope.storeProj.grVal[sid].p = 0;
                            }
                        }

                        if ($rootScope.storeProj.tmpItem[sid].col.length > 0 && $rootScope.storeProj.tmpItem[sid].row.length > 0) {
                            for (var it = 0; it < $rootScope.storeProj.tmpLeg[sid].length; it++) {
                                d3.select('#svgVal_' + it + '_1_' + sid).attr('opacity', '1');
                                d3.select('#numVal_' + it + '_1_' + sid).attr('opacity', '1');
                            }
                        } else {
                            for (var it = 0; it < $rootScope.storeProj.tmpLeg[sid].length; it++) {
                                d3.select('#svgVal_' + it + '_1_' + sid).attr('opacity', '0');
                                d3.select('#numVal_' + it + '_1_' + sid).attr('opacity', '0');
                            }
                        }
                    }

                    for (var it_s = 0; it_s < $rootScope.storeProj.tmpLeg[sid].length; it_s++) {
                        $('#svgVal_' + it_s + '_1_' + sid).children().remove();

                        d3.select('#svgVal_' + it_s + '_1_' + sid).append('g').append(function () {
                            if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["4"] != undefined) {
                                if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                    var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_1_' + sid + '"'))["1"];
                                    return tmpLeg;
                                } else {
                                    var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["4"];
                                    tmpLeg.id = 'svgLeg_' + it_s + '_1_' + sid;
                                    return tmpLeg;
                                }
                            }
                            if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["2"] != undefined) {
                                if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                    var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_1_' + sid + '"'))["1"];
                                    return tmpLeg;
                                } else {
                                    var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["2"];
                                    tmpLeg.id = 'svgLeg_' + it_s + '_1_' + sid;
                                    return tmpLeg;
                                }
                            }
                            if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["1"] != undefined) {
                                if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                    var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_1_' + sid + '"'))["1"];
                                    return tmpLeg;
                                } else {
                                    var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["1"];
                                    tmpLeg.id = 'svgLeg_' + it_s + '_1_' + sid;
                                    return tmpLeg;
                                }
                            }

                        });

                    }
                }
                if ($rootScope.storeProj.tmpCR[sid] == 1) {
                    if ($rootScope.storeProj.max[sid] == undefined) {
                        $rootScope.storeProj.max[sid] = [];
                    }
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            if ($rootScope.storeProj.max[sid][it_r] == undefined) {
                                $rootScope.storeProj.max[sid][it_r] = 6;
                            }
                        }
                    }
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            $('#r2ISOID_' + it_r + '_' + sid).children().remove();
                        }
                    }
                    if ($rootScope.storeProj.tmpItem[sid].col != undefined) {
                        for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                            for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                                $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                    if ($rootScope.storeProj.dFldCT1C1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                        $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                        $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                    if ($rootScope.storeProj.dFldCT1C1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                        $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                    if ($rootScope.storeProj.dFldRT1R1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                        $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                        $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                    if ($rootScope.storeProj.dFldRT1R1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                        $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                    }
                                }
                            }
                            if ($('#mn_X2c_' + (it) + '_' + sid)[0] != undefined) {
                                $('#mn_X2c_' + (it) + '_' + sid).remove();
                            }
                            if ($('#mn_X2c_' + (it) + '_' + sid)[0] == undefined) {
                                d3.select('#svgID2_' + sid).append('svg').attr('id', 'mn_X2c_' + ((it)) + '_' + sid).attr('class', 'mnXc').attr('x', 64 + (7 * $rootScope.storeProj.dFldRT1R1[sid][0].descrR)).attr('y', -34.5 + 31 + 34 * (it + 1) + 'px').style('opacity', 0);
                                d3.select('#mn_X2c_' + (it) + '_' + sid).moveToFront();
                            }
                            d3.select('#mn_X2c_' + (it) + '_' + sid).append('rect').attr('id', 'X2_dropIDC_' + it + '_' + sid).attr('class', 'dropCL').attr('x', 0).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('stroke-width', $rootScope.storeProj.stroke_scale).style('stroke-opacity', '0.5').style('fill-opacity', '0.5').style('fill', 'rgb(166, 166, 166)').style('zIndex', 20);
                            var chk = 0;
                            $('#X2_dropIDC_' + it + '_' + sid).one({
                                mouseenter: function () {
                                    $(this).css('fill', 'rgb(111, 111, 166)');
                                },
                                mouseleave: function () {
                                    $(this).css('fill', 'rgb(166, 166, 166)');
                                },
                                drop: function (d) {
                                    if (chk == 0) {
                                        $rootScope.func_svgDropped(1, sid, d);
                                        $rootScope.func_iFace(1, sid);
                                        chk = 1;
                                    }
                                }
                            });
                            d3.select('#mn_X2c_' + (it) + '_' + sid).append('rect').attr('id', 'col_X2_dropIDC_' + it + '_' + sid).attr('x', 30).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,255,0)');
                            d3.select('#col_X2_dropIDC_' + it + '_' + sid).on('click', function () {
                                var it = this.id.split('_')[3];
                                $rootScope.storeProj.colorCL = 1;
                                $rootScope.func_color('col', 0, it, sid, 1, '#000000');
                            });
                            d3.select('#mn_X2c_' + (it) + '_' + sid).append('rect').attr('id', 'del_X2_dropIDC_' + it + '_' + sid).attr('x', 60).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(255,0,0)');
                            d3.select('#mn_X2c_' + (it) + '_' + sid).on('mouseover', function () {
                                //$rootScope.action = 1;
                                $(this).fadeTo(1, 1);

                            });
                            d3.select('#mn_X2c_' + (it) + '_' + sid).on('mouseout', function () {
                                //$rootScope.action = 0;
                                //$rootScope.$applyAsync();
                                $(this).fadeTo(1, 0);
                            });
                            d3.select('#del_X2_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                    for (var it1 = $rootScope.storeProj.tmpItem[sid].col.length; it1 <= $rootScope.storeProj.tmpItem[sid].col.length * ($rootScope.storeProj.tmpItem[sid].row.length + 1); it1++) {
                                        if (it1 == $rootScope.storeProj.tmpItem[sid].col.length) {
                                            d3.select('#X2_dropIDC_' + (it1) + '_' + sid).property('value', '');
                                        } else {
                                            d3.select('#X2_dropIDC_' + (it1) + '_' + sid).remove();
                                        }
                                    }
                                    $rootScope.storeProj.max[sid][0] = 6;
                                    $rootScope.storeProj.dFldCT1C1[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.tmpItem[sid].col.splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.max[sid] = [];

                                    for (var it_r1 = 0; it_r1 < $rootScope.storeProj.tmpItem[sid].row.length; it_r1++) {
                                        $rootScope.storeProj.SVG_Elem[sid][it_r1].splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.SVG_Leg[sid][it_r1].splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.colVar[sid][it_r1].splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.SVG_sim[sid][it_r1].splice(this.id.split('_')[3], 1);
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                        $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                        $('#mn_X2c_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;
                                    arrLeg = [];
                                    $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);
                                    //$rootScope.action = 0;
                                    //$rootScope.$applyAsync();
                                    $rootScope.func_Templ2(sid);

                                }
                            );
                            d3.select('#mn_X2c_' + (it) + '_' + sid).append('rect').attr('id', 'dw_X2_dropIDC_' + it + '_' + sid).attr('x', 90).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#dw_X2_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                    for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                        if (it == parseInt(this.id.split('_')[3]) && $rootScope.storeProj.dFldCT1C1[sid].length > 1) {
                                            $rootScope.func_swap_dflC(it, it + 1, sid);
                                            $rootScope.func_swap_tmpItemC(it, it + 1, sid);
                                            for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Leg[sid].length; it_r++) {
                                                $rootScope.func_swap_SVG_LegC(it, it + 1, sid, it_r);
                                            }
                                            for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                                $rootScope.func_swap_SVG_ElemC(it, it + 1, sid, it_r);
                                            }
                                            for (var it_r = 0; it_r < $rootScope.storeProj.colVar[sid].length; it_r++) {
                                                $rootScope.func_swap_colVarC(it, it + 1, sid, it_r);
                                            }
                                            for (var it_r = 0; it_r < $rootScope.storeProj.SVG_sim[sid].length; it_r++) {
                                                $rootScope.func_swap_simsC(it, it + 1, sid, it_r);
                                            }
                                            for (var it_r = 0; it_r < $rootScope.storeProj.inpVal[sid].length; it_r++) {
                                                $rootScope.func_swap_inpValC(it, it + 1, sid, it_r);
                                            }
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                        $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                        $('#mn_X2c_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;
                                    $rootScope.func_Templ2(sid);
                                }
                            );
                            d3.select('#mn_X2c_' + (it) + '_' + sid).append('rect').attr('id', 'up_X2_dropIDC_' + it + '_' + sid).attr('x', 120).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#up_X2_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                    for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                        if (it == parseInt(this.id.split('_')[3]) && it > 0 && $rootScope.storeProj.dFldCT1C1[sid].length > 1) {
                                            $rootScope.func_swap_dflC(it, it - 1, sid);
                                            $rootScope.func_swap_tmpItemC(it, it - 1, sid);
                                            for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Leg[sid].length; it_r++) {
                                                $rootScope.func_swap_SVG_LegC(it, it - 1, sid, it_r);
                                            }
                                            for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                                $rootScope.func_swap_SVG_ElemC(it, it - 1, sid, it_r);
                                            }
                                            for (var it_r = 0; it_r < $rootScope.storeProj.colVar[sid].length; it_r++) {
                                                $rootScope.func_swap_colVarC(it, it - 1, sid, it_r);
                                            }
                                            for (var it_r = 0; it_r < $rootScope.storeProj.SVG_sim[sid].length; it_r++) {
                                                $rootScope.func_swap_simsC(it, it - 1, sid, it_r);
                                            }
                                            for (var it_r = 0; it_r < $rootScope.storeProj.inpVal[sid].length; it_r++) {
                                                $rootScope.func_swap_inpValC(it, it - 1, sid, it_r);
                                            }
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                        $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                        $('#mn_X2c_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;

                                    $rootScope.func_Templ2(sid);
                                }
                            );


                            d3.select('#X2_dropIDC_' + (it) + '_' + sid).attr('stroke', 'black').text(function (d) {
                                return $rootScope.storeProj.tmpItem[sid].col[it].val();
                            });
                            if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                                for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                                    if ($rootScope.storeProj.max[sid][it_r] < $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it])) {
                                        $rootScope.storeProj.max[sid][it_r] = $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it]);
                                    }
                                }
                            }
                            for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                                for (var it_g = 0; it_g < $rootScope.storeProj.max[sid].length; it_g++) {
                                    if ($rootScope.storeProj.max[sid][it_r] < $rootScope.storeProj.max[sid][it_g]) {
                                        $rootScope.storeProj.max[sid][it_r] = $rootScope.storeProj.max[sid][it_g];
                                    }
                                }
                            }
                        }
                    }
                    if ($rootScope.storeProj.max[sid][0] != undefined) {
                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                            $rootScope.storeProj.dFldCT1C1[sid][it].vc = parseInt($rootScope.storeProj.valSc[sid]);
                            $rootScope.storeProj.dFldCT1C1[sid][it].grv = $rootScope.storeProj.grVal[sid].v;
                            $rootScope.storeProj.dFldCT1C1[sid][it].grp = $rootScope.storeProj.grVal[sid].p;
                            $rootScope.storeProj.dFldCT1C1[sid][it].max = $rootScope.storeProj.max[sid][0];
                            $rootScope.storeProj.dFldCT1C1[sid][it].rlen = $rootScope.storeProj.dFldRT1R1[sid].length;
                        }
                        for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                            $rootScope.storeProj.dFldRT1R1[sid][it].vc = parseInt($rootScope.storeProj.valSc[sid]);
                            $rootScope.storeProj.dFldRT1R1[sid][it].grv = $rootScope.storeProj.grVal[sid].v;
                            $rootScope.storeProj.dFldRT1R1[sid][it].grp = $rootScope.storeProj.grVal[sid].p;
                            $rootScope.storeProj.dFldRT1R1[sid][it].max = $rootScope.storeProj.max[sid][0];
                            $rootScope.storeProj.dFldRT1R1[sid][it].clen = $rootScope.storeProj.dFldCT1C1[sid].length;
                        }
                    }
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            if ($('#mn_X2r_' + (it_r) + '_' + sid)[0] != undefined) {
                                $('#mn_X2r_' + (it_r) + '_' + sid).remove();
                            }
                            if ($('#mn_X1r_' + (it_r) + '_' + sid)[0] == undefined) {
                                d3.select('#svgID2_' + sid).append('svg').attr('id', 'mn_X2r_' + ((it_r)) + '_' + sid).attr('class', 'mnXr').attr('x', 11).attr('y', 30 + 34 * (it_r + 1) * ($rootScope.storeProj.dFldCT1C1[sid].length) - (34 * $rootScope.storeProj.dFldCT1C1[sid].length - 1 / 2) + 'px').style('opacity', 0);
                                d3.select('#mn_X2r_' + (it_r) + '_' + sid).moveToFront();
                            }
                            d3.select('#mn_X2r_' + (it_r) + '_' + sid).append('rect').attr('id', 'X2_dropIDR_' + it_r + '_' + sid).attr('class', 'dropCL').attr('x', 0).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('stroke-width', $rootScope.storeProj.stroke_scale).style('stroke-opacity', '0.5').style('fill-opacity', '0.5').style('fill', 'rgb(166, 166, 166)').style('zIndex', 20);
                            var chk = 0;
                            $('#X2_dropIDR_' + it_r + '_' + sid).one({
                                mouseenter: function () {
                                    $(this).css('fill', 'rgb(111, 111, 166)');
                                },
                                mouseleave: function () {
                                    $(this).css('fill', 'rgb(166, 166, 166)');
                                },
                                drop: function (d) {
                                    if (chk == 0) {
                                        $rootScope.func_svgDropped(1, sid, d);
                                        $rootScope.func_iFace(1, sid);
                                        chk = 1;
                                    }
                                }
                            });
                            d3.select('#mn_X2r_' + (it_r) + '_' + sid).append('rect').attr('id', 'col_X2_dropIDR_' + it_r + '_' + sid).attr('x', 30).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,255,0)');
                            d3.select('#col_X2_dropIDR_' + it_r + '_' + sid).on('click', function () {
                                var it = this.id.split('_')[3];
                                $rootScope.storeProj.colorCL = 1;
                                $rootScope.func_color('row', it, 0, sid, 1, '#000000');

                            });
                            d3.select('#mn_X2r_' + (it_r) + '_' + sid).append('rect').attr('id', 'del_X2_dropIDR_' + it_r + '_' + sid).attr('x', 60).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(255,0,0)');
                            d3.select('#mn_X2r_' + (it_r) + '_' + sid).on('mouseover', function () {
                                //$rootScope.action = 1;
                                $(this).fadeTo(1, 1);

                            });
                            d3.select('#mn_X2r_' + (it_r) + '_' + sid).on('mouseout', function () {
                                //$rootScope.action = 0;
                                //$rootScope.$applyAsync();

                                $(this).fadeTo(1, 0);

                            });
                            d3.select('#del_X2_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it1 = $rootScope.storeProj.tmpItem[sid].col.length; it1 <= $rootScope.storeProj.tmpItem[sid].col.length * ($rootScope.storeProj.tmpItem[sid].row.length + 1); it1++) {
                                        d3.select('#X2_dropIDC_' + (it1) + '_' + sid).remove();
                                    }

                                    $rootScope.storeProj.dFldRT1R1[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.tmpItem[sid].row.splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_Leg[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_Elem[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.colVar[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_sim[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.max[sid] = [];
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X2r_' + (it) + '_' + sid).remove();
                                    }

                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;
                                    arrLeg = [];
                                    $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);

                                    //$rootScope.action = 0;
                                    //$rootScope.$applyAsync();
                                    $rootScope.func_Templ2(sid);

                                }
                            );
                            d3.select('#mn_X2r_' + (it_r) + '_' + sid).append('rect').attr('id', 'up_X2_dropIDR_' + it_r + '_' + sid).attr('x', 90).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#up_X2_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it_r = 0; it_r < $rootScope.storeProj.dFldRT1R1[sid].length; it_r++) {
                                        if (it_r === parseInt(this.id.split('_')[3]) && it_r > 0 && $rootScope.storeProj.dFldRT1R1[sid].length > 1) {
                                            $rootScope.func_swap_dflR(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_tmpItem(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_SVG_Leg(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_SVG_Elem(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_colVar(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_sims(it_r, it_r - 1, sid);
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X2r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;

                                    $rootScope.func_Templ2(sid);
                                }
                            );
                            d3.select('#mn_X2r_' + (it_r) + '_' + sid).append('rect').attr('id', 'dw_X2_dropIDR_' + it_r + '_' + sid).attr('x', 120).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#dw_X2_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it_r = 0; it_r < $rootScope.storeProj.dFldRT1R1[sid].length; it_r++) {
                                        if (it_r == parseInt(this.id.split('_')[3]) && it_r < ($rootScope.storeProj.dFldRT1R1[sid].length - 2) && $rootScope.storeProj.dFldRT1R1[sid].length > 1) {
                                            $rootScope.func_swap_dflR(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_tmpItem(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_SVG_Leg(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_SVG_Elem(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_colVar(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_sims(it_r, it_r + 1, sid);
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X2r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;

                                    $rootScope.func_Templ2(sid);
                                }
                            );
                            d3.select('#X2_dropIDR_' + (it_r) + '_' + sid).attr('stroke', 'black').text(function (d) {
                                return $rootScope.storeProj.tmpItem[sid].row[it_r].val();
                            });
                            if ($rootScope.storeProj.isoElem[sid] == undefined) {
                                $rootScope.storeProj.isoElem[sid] = [];
                            }
                            if ($rootScope.storeProj.isoElem[sid][it_r] == undefined) {
                                $rootScope.storeProj.isoElem[sid][it_r] = [];
                            }
                            if ($rootScope.storeProj.colVar[sid] == undefined) {
                                $rootScope.storeProj.colVar[sid] = [];
                            }
                            if ($rootScope.storeProj.colVar[sid][it_r] == undefined) {
                                $rootScope.storeProj.colVar[sid][it_r] = [];
                            }
                            for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                                for (var it_iso = 0; it_iso < $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it]); it_iso++) {
                                    if ($rootScope.storeProj.SVG_Elem[sid] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r][it] != undefined) {
                                        $rootScope.storeProj.isoElem[sid][it_r][it] = {};
                                        if (!$($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML.match('id=')) {
                                            var tempSVG = $($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML.replace('<svg ', '<svg  id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '"');
                                            $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML(tempSVG)[1];
                                        } else {
                                            if ($.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[4] == undefined) {
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[2];
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;

                                            } else {
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[4];
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;

                                            }
                                        }

                                        if (it_r > 0) {
                                            if (it_r == 1) {
                                                d3.select('#X2_dropIDC_' + ((it + 1) + ($rootScope.storeProj.tmpItem[sid].col.length * (it_r))) + '_' + sid).remove();
                                            }
                                            d3.select('#X2_dropIDC_' + ((it + 1) + ($rootScope.storeProj.tmpItem[sid].col.length * (it_r + 1))) + '_' + sid).remove();
                                            d3.select('.T2colDivCL_' + sid).append('text').attr('id', 'X2_dropIDC_' + ((it + 1) + ($rootScope.storeProj.tmpItem[sid].col.length * (it_r + 1))) + '_' + sid);
                                            d3.select('#X2_dropIDC_' + ((it + 1) + ($rootScope.storeProj.tmpItem[sid].col.length * (it_r + 1))) + '_' + sid).attr('x', 64 + (7 * $rootScope.storeProj.dFldRT1R1[sid][0].descrR)).attr('y', ((34 * ($rootScope.storeProj.tmpItem[sid].col.length * (it_r))) + (49 + 34 * it) + (34 * (it_r)))).attr('font-family', 'Arial, "Helvetica Neue", Helvetica').attr('font-size', '0.9em').attr('stroke', 'black').attr('stroke-width', 0.1).text(function (d) {
                                                return $rootScope.storeProj.tmpItem[sid].col[it].val();
                                            });
                                        }
                                        if (it_iso > 0 && it_iso % ($rootScope.storeProj.grVal[sid].v) == 0) {
                                            $rootScope.storeProj.grVal[sid].p += 1;
                                        }
                                        /*
                                         else {

                                         if (tmpVal == 1) {
                                         $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML('<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '" class="simCL" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28" enable-background="new 0 0 500 500" xml:space="preserve"><rect fill="#000000" stroke="#000000" x="-1" width="28" height="28"/></svg>')[2];
                                         if (it_r > 0) {
                                         if (it_r == 1) {
                                         d3.select('#X2_dropIDC_' + ((it + 1) + ($rootScope.storeProj.tmpItem[sid].col.length * (it_r))) + '_' + sid).remove();
                                         }
                                         d3.select('#X2_dropIDC_' + ((it + 1) + ($rootScope.storeProj.tmpItem[sid].col.length * (it_r + 1))) + '_' + sid).remove();
                                         d3.select('.T2colDivCL_' + sid).append('text').attr('id', 'X2_dropIDC_' + ((it + 1) + ($rootScope.storeProj.tmpItem[sid].col.length * (it_r + 1))) + '_' + sid);
                                         d3.select('#X2_dropIDC_' + ((it + 1) + ($rootScope.storeProj.tmpItem[sid].col.length * (it_r + 1))) + '_' + sid).attr('x', 181).attr('y', (34 * ($rootScope.storeProj.tmpItem[sid].col.length * (it_r))) + (78 + 34 * it) + (34 * (it_r))).attr('font-family', 'Arial, "Helvetica Neue", Helvetica').attr('font-size', '0.9em').attr('stroke', 'black').attr('stroke-width', 0.1).text(function (d) {
                                         return $rootScope.storeProj.tmpItem[sid].col[it].val();
                                         });
                                         }
                                         d3.select('#r2ISOID_' + it_r + '_' + sid)
                                         .append('g')
                                         .attr('class', 'g2CL_' + it_r + '_' + it + '_' + sid).attr('id', function () {
                                         return 'gc2ID_' + it_r + '_' + it + '_' + it_iso + '_' + sid;
                                         })
                                         .attr('transform', function () {
                                         var x = 260 + (28 + parseInt(parseInt($rootScope.storeProj.valSc[sid]))) *it_iso;
                                         var y = (34 * ($rootScope.storeProj.tmpItem[sid].col.length * (it_r))) + (64 + 34 * (it)) + (34 * (it_r));
                                         $rootScope.storeProj.scale[sid].x = x;
                                         $rootScope.storeProj.scale[sid].y = y;
                                         return 'translate(' + x + ',' + y + ')';
                                         })
                                         .append(function () {
                                         return $rootScope.storeProj.isoElem[sid][it_r][it].iso;
                                         });
                                         }
                                         }
                                         */
                                        if ($rootScope.storeProj.colVar[sid][it_r][it] != undefined) {
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                        }
                                    }
                                    $rootScope.$apply();
                                    d3.select('#r2ISOID_' + it_r + '_' + sid)
                                        .append('g')
                                        .attr('class', 'g2CL_' + it_r + '_' + it + '_' + sid)
                                        .attr('transform', function () {
                                            var x = 138 + (7 * $rootScope.storeProj.dFldCT1C1[sid][0].descrC) + (7 * $rootScope.storeProj.dFldRT1R1[sid][0].descrR) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.grVal[sid].p) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * it_iso;
                                            var y = (-34.5 + (34 * ($rootScope.storeProj.tmpItem[sid].col.length * (it_r))) + (64 + 34 * (it)) + (34 * (it_r)));
                                            $rootScope.storeProj.scale[sid].x = x;
                                            $rootScope.storeProj.scale[sid].y = y;
                                            return 'translate(' + x + ',' + y + ')';
                                        })
                                        .append(function () {
                                            return $rootScope.storeProj.isoElem[sid][it_r][it].iso;
                                        });
                                }
                                $rootScope.storeProj.grVal[sid].p = 0;
                            }
                        }

                        if ($rootScope.storeProj.tmpItem[sid].col.length > 0 && $rootScope.storeProj.tmpItem[sid].row.length > 0) {
                            for (var it = 0; it < $rootScope.storeProj.tmpLeg[sid].length; it++) {
                                d3.select('#svgVal_' + it + '_1_' + sid).attr('opacity', '1');
                                d3.select('#numVal_' + it + '_1_' + sid).attr('opacity', '1');
                            }
                        } else {
                            for (var it = 0; it < $rootScope.storeProj.tmpLeg[sid].length; it++) {
                                d3.select('#svgVal_' + it + '_1_' + sid).attr('opacity', '0');
                                d3.select('#numVal_' + it + '_1_' + sid).attr('opacity', '0');
                            }
                        }
                    }

                    for (var it_s = 0; it_s < $rootScope.storeProj.tmpLeg[sid].length; it_s++) {
                        $('#svgVal_' + it_s + '_1_' + sid).children().remove();

                        d3.select('#svgVal_' + it_s + '_1_' + sid).append('g').append(function () {
                            if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["4"] != undefined) {
                                if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                    var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_1_' + sid + '"'))["1"];
                                    return tmpLeg;
                                } else {
                                    var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["4"];
                                    tmpLeg.id = 'svgLeg_' + it_s + '_1_' + sid;
                                    return tmpLeg;
                                }
                            }
                            if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["2"] != undefined) {
                                if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                    var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_1_' + sid + '"'))["1"];
                                    return tmpLeg;
                                } else {
                                    var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["2"];
                                    tmpLeg.id = 'svgLeg_' + it_s + '_1_' + sid;
                                    return tmpLeg;
                                }
                            }
                            if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["1"] != undefined) {
                                if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                    var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_1_' + sid + '"'))["1"];
                                    return tmpLeg;
                                } else {
                                    var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["1"];
                                    tmpLeg.id = 'svgLeg_' + it_s + '_1_' + sid;
                                    return tmpLeg;
                                }
                            }

                        });

                    }

                }
                //DOM has finished rendering
            }, 0, false);
        };
        $rootScope.func_Templ3 = function (sid) {
            $timeout(function () {

                func_dCol();
                console.log($rootScope.storeProj.chkSCVal);
                if ($rootScope.storeProj.chkSCVal == 0) {
                    $('.optionCL').css('visibility', 'hidden');
                }
                if ($rootScope.storeProj.headline[$rootScope.storeProj.slideID].length == 0) {
                    $rootScope.storeProj.yPosLine[$rootScope.storeProj.slideID] = 0;
                }
                if ($rootScope.storeProj.headline[$rootScope.storeProj.slideID].length > 0) {
                    $rootScope.storeProj.yPosLine[$rootScope.storeProj.slideID] = 32;
                }
                $rootScope.storeProj.it[sid] = 0;
                $rootScope.storeProj.colors[sid] = ["#5b9254", "#e64639", "#1a4e53", "#d99a00", "#cccccc", "#000000"];
                $('.descrCL').css('outline', '0');
                $('.descrCL').css('outline-offset', '-2px');

                $('#tmplID_2_' + sid).css('outline', '5px auto -webkit-focus-ring-color');
                $('#tmplID_2_' + sid).css('outline-offset', '-2px');

                $('.templCL').css('outline', '0');
                $('.templCL').css('outline-offset', '-2px');

                $('#Templ3_' + sid).css('outline', '5px auto -webkit-focus-ring-color');
                $('#Templ3_' + sid).css('outline-offset', '-2px');
                $rootScope.storeProj.max[sid] = [];
                $rootScope.storeProj.max3[sid] = [];
                if ($rootScope.storeProj.inpVal[sid] == undefined) {
                    $rootScope.storeProj.inpVal[sid] = [];
                }
                if ($rootScope.storeProj.tmpItem[sid] != undefined && $rootScope.storeProj.tmpItem[sid].row != undefined) {
                    for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].row.length; it++) {
                        if ($rootScope.storeProj.inpVal[sid][it] == undefined) {
                            $rootScope.storeProj.inpVal[sid][it] = [];
                        }
                        if ($rootScope.storeProj.SVG_Leg[sid][it] != undefined) {
                            for (var it_1 = 0; it_1 < $rootScope.storeProj.tmpItem[sid].col.length; it_1++) {
                                if ($rootScope.storeProj.inpVal[sid][it][it_1] == undefined) {
                                    if ($rootScope.storeProj.SVG_Leg[sid][it][it_1] != undefined) {
                                        $rootScope.storeProj.inpVal[sid][it][it_1] = $rootScope.storeProj.SVG_Leg[sid][it][it_1].valt;
                                    } else {
                                        $rootScope.storeProj.inpVal[sid][it][it_1] = 1;
                                    }
                                }
                            }
                        }
                    }
                }
                $rootScope.func_maxValue(sid);
                d3.selection.prototype.moveToFront = function () {
                    return this.each(function () {
                        this.parentNode.appendChild(this);
                    });
                };
                d3.selection.prototype.moveToBack = function () {
                    return this.each(function () {
                        var firstChild = this.parentNode.firstChild;
                        if (firstChild) {
                            this.parentNode.insertBefore(this, firstChild);
                        }
                    });
                };
                $rootScope.tmpID = 2;
                $rootScope.storeProj.slides[sid].tmp = 2;
                $rootScope.$apply(); // switch templates preparation
                // generating amount of similar ones
                $rootScope.T_h1 = parseInt($('.templ').css('height').split('px')[0]);
                if ($rootScope.storeProj.tmpCR[sid] == 0) {
                    $rootScope.calcRow = 0;
                    if ($rootScope.storeProj.max[sid] == undefined) {
                        $rootScope.storeProj.max[sid] = [];
                    }
                    if ($rootScope.storeProj.max3[sid] == undefined) {
                        $rootScope.storeProj.max3[sid] = [];
                    }
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            if ($rootScope.storeProj.tmpItem[sid].col != undefined) {
                                for (var it_c = 0; it_c < $rootScope.storeProj.tmpItem[sid].col.length; it_c++) {
                                    if ($rootScope.storeProj.max[sid][it_c] == undefined) {
                                        $rootScope.storeProj.max[sid][it_c] = 6;
                                    }
                                }
                            }
                        }
                        var tmp_max = [];
                        tmp_max[0] = 0;
                        tmp_max[1] = 6;
                        for (var it_c = 0; it_c < $rootScope.storeProj.tmpItem[sid].col.length; it_c++) {
                            for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                                if ($rootScope.storeProj.max[sid][it_c] < $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it_c][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it_c])) {
                                    $rootScope.storeProj.max[sid][it_c] = $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it_c][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it_c]);
                                }
                                if ($rootScope.storeProj.grVal[sid].v == 5) {
                                    $rootScope.storeProj.grVal[sid].r[it_c] = 0;
                                }
                                if ($rootScope.storeProj.grVal[sid].v == 10) {
                                    $rootScope.storeProj.grVal[sid].r[it_c] = 0;
                                }
                                if ($rootScope.storeProj.grVal[sid].v == 0) {
                                    $rootScope.storeProj.grVal[sid].r[it_c] = 0;
                                }
                            }
                        }
                        $rootScope.storeProj.tmpMax = [];
                        for (var it_c = 0; it_c < $rootScope.storeProj.tmpItem[sid].col.length; it_c++) {
                            $rootScope.storeProj.tmpMax[it_c] = [];
                            $rootScope.storeProj.max3[sid][it_c] = [];
                            for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                                $rootScope.storeProj.max3[sid][it_c][it_r] = $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it_c][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it_c]);
                            }
                        }
                        for (var it_c = 0; it_c < $rootScope.storeProj.max3[sid].length; it_c++) {
                            for (var it_r = 0; it_r < $rootScope.storeProj.max3[sid][it_c].length; it_r++) {
                                $rootScope.storeProj.tmpMax[it_c][it_r] = 0;
                                if (it_c > 0) {
                                    for (var it = it_c - 1; it >= 0; it--) {
                                        $rootScope.storeProj.tmpMax[it_c][it_r] += $rootScope.storeProj.max3[sid][it][it_r];
                                        tmp_max[it_c] = $rootScope.storeProj.tmpMax[it_c][0];
                                    }
                                }
                            }
                        }
                    }
                    $rootScope.storeProj.grVal[sid].p = 0;
                    if ($rootScope.storeProj.tmpItem[sid].col != undefined) {
                        for (var it_c = 0; it_c < $rootScope.storeProj.tmpItem[sid].col.length; it_c++) {
                            $('#c3ISOID_' + it_c + '_' + sid).children().remove();
                        }
                    }
                    for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                        $rootScope.storeProj.dFldCT1C1[sid][it].vc = parseInt($rootScope.storeProj.valSc[sid]);
                        $rootScope.storeProj.dFldCT1C1[sid][it].grv = $rootScope.storeProj.grVal[sid].v;
                        $rootScope.storeProj.dFldCT1C1[sid][it].grp = $rootScope.storeProj.grVal[sid].p;
                        $rootScope.storeProj.dFldCT1C1[sid][it].max = tmp_max[it];
                        if (tmp_max[it] == undefined) {
                            $rootScope.storeProj.dFldCT1C1[sid][it].max = tmp_max[it - 1] + 7;
                        }
                        $rootScope.storeProj.dFldCT1C1[sid][it].rlen = $rootScope.storeProj.dFldRT1R1[sid].length;
                    }
                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                        $rootScope.storeProj.dFldRT1R1[sid][it].vc = parseInt($rootScope.storeProj.valSc[sid]);
                        $rootScope.storeProj.dFldRT1R1[sid][it].grv = $rootScope.storeProj.grVal[sid].v;
                        $rootScope.storeProj.dFldRT1R1[sid][it].grp = $rootScope.storeProj.grVal[sid].p;
                        //$rootScope.storeProj.dFldRT1R1[sid][it].max = $rootScope.storeProj.max[sid][0];
                        $rootScope.storeProj.dFldRT1R1[sid][it].clen = $rootScope.storeProj.dFldCT1C1[sid].length;
                    }
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            if ($('#mn_X3r_' + (it_r) + '_' + sid)[0] != undefined) {
                                $('#mn_X3r_' + (it_r) + '_' + sid).remove();
                            }
                            if ($('#mn_X3r_' + (it_r) + '_' + sid)[0] == undefined) {
                                d3.select('#svgID3_' + sid).append('svg').attr('id', 'mn_X3r_' + ((it_r)) + '_' + sid).attr('class', 'mnXr').attr('x', 11).attr('y', 30 + 34 * (it_r + 1) + 'px').style('opacity', 0);
                                d3.select('#mn_X3r_' + (it_r) + '_' + sid).moveToFront();
                            }
                            var chk = 0;
                            d3.select('#mn_X3r_' + (it_r) + '_' + sid).append('rect').attr('id', 'X3_dropIDR_' + it_r + '_' + sid).attr('class', 'dropCL').attr('x', 0).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('stroke-width', $rootScope.storeProj.stroke_scale).style('stroke-opacity', '0.5').style('fill-opacity', '0.5').style('fill', 'rgb(166, 166, 166)').style('zIndex', 20);
                            $('#X3_dropIDR_' + it_r + '_' + sid).one({
                                mouseenter: function () {
                                    $(this).css('fill', 'rgb(111, 111, 166)');
                                },
                                mouseleave: function () {
                                    $(this).css('fill', 'rgb(166, 166, 166)');
                                },
                                drop: function (d) {
                                    if (chk == 0) {
                                        $rootScope.func_svgDropped(2, sid, d);
                                        $rootScope.func_iFace(2, sid);
                                        chk = 1;
                                    }
                                }
                            });
                            d3.select('#mn_X3r_' + (it_r) + '_' + sid).append('rect').attr('id', 'col_X3_dropIDR_' + it_r + '_' + sid).attr('x', 30).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,255,0)');
                            d3.select('#col_X3_dropIDR_' + it_r + '_' + sid).on('click', function () {
                                var it = this.id.split('_')[3];
                                $rootScope.storeProj.colorCL = 1;
                                $rootScope.func_color('row', it, 0, sid, 1, '#000000');
                            });
                            d3.select('#mn_X3r_' + (it_r) + '_' + sid).append('rect').attr('id', 'del_X3_dropIDR_' + it_r + '_' + sid).attr('x', 60).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(255,0,0)');
                            d3.select('#mn_X3r_' + (it_r) + '_' + sid).on('mouseover', function () {
                                //$rootScope.action = 1;
                                $(this).fadeTo(1, 1);

                            });
                            d3.select('#mn_X3r_' + (it_r) + '_' + sid).on('mouseout', function () {
                                //$rootScope.action = 0;
                                //$rootScope.$applyAsync();

                                $(this).fadeTo(1, 0);

                            });
                            d3.select('#del_X3_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    //d3.select('#del_X1_dropIDR_' + this.id.split('_')[3]).remove();
                                    //d3.select('#X1_dropIDR_' + this.id.split('_')[3]).remove();
                                    //d3.select('#T1_dropIDR_' + this.id.split('_')[3]).remove();

                                    $rootScope.storeProj.dFldRT1R1[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.tmpItem[sid].row.splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_Leg[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_Elem[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.colVar[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_sim[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.max[sid] = [];
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X3r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;
                                    arrLeg = [];
                                    $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);

                                    //$rootScope.action = 0;
                                    //$rootScope.$applyAsync();
                                    $rootScope.func_Templ3(sid);


                                }
                            );
                            d3.select('#mn_X3r_' + (it_r) + '_' + sid).append('rect').attr('id', 'dw_X3_dropIDR_' + it_r + '_' + sid).attr('x', 90).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#dw_X3_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it_r = 0; it_r < $rootScope.storeProj.dFldRT1R1[sid].length; it_r++) {
                                        if (it_r === parseInt(this.id.split('_')[3]) && it_r > 0 && $rootScope.storeProj.dFldRT1R1[sid].length > 1) {
                                            $rootScope.func_swap_dflR(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_tmpItem(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_SVG_Leg(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_SVG_Elem(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_colVar(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_sims(it_r, it_r - 1, sid);
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X3r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;

                                    $rootScope.func_Templ3(sid);
                                }
                            );
                            d3.select('#mn_X3r_' + (it_r) + '_' + sid).append('rect').attr('id', 'up_X3_dropIDR_' + it_r + '_' + sid).attr('x', 120).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#up_X3_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it_r = 0; it_r < $rootScope.storeProj.dFldRT1R1[sid].length; it_r++) {
                                        if (it_r == parseInt(this.id.split('_')[3]) && it_r < ($rootScope.storeProj.dFldRT1R1[sid].length - 2) && $rootScope.storeProj.dFldRT1R1[sid].length > 1) {
                                            $rootScope.func_swap_dflR(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_tmpItem(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_SVG_Leg(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_SVG_Elem(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_colVar(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_sims(it_r, it_r + 1, sid);
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X3r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;

                                    $rootScope.func_Templ3(sid);
                                }
                            );
                            d3.select('#X3_dropIDR_' + (it_r) + '_' + sid).attr('stroke', 'black').text(function (d) {
                                return $rootScope.storeProj.tmpItem[sid].row[it_r].val();
                            });
                            if ($rootScope.storeProj.isoElem[sid] == undefined) {
                                $rootScope.storeProj.isoElem[sid] = [];
                            }
                            if ($rootScope.storeProj.colVar[sid] == undefined) {
                                $rootScope.storeProj.colVar[sid] = [];
                            }
                            for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                                $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                    if ($rootScope.storeProj.dFldCT1C1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                        $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                        $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                    if ($rootScope.storeProj.dFldCT1C1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                        $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                    if ($rootScope.storeProj.dFldRT1R1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                        $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                        $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                    if ($rootScope.storeProj.dFldRT1R1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                        $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                    }
                                }
                                if ($('#mn_X3c_' + (it) + '_' + sid)[0] != undefined) {
                                    $('#mn_X3c_' + (it) + '_' + sid).remove();
                                }
                                if ($('#mn_X3c_' + (it) + '_' + sid)[0] == undefined) {
                                    d3.select('#svgID3_' + sid).append('svg').attr('id', 'mn_X3c_' + ((it)) + '_' + sid).attr('class', 'mnXc').attr('x', 38 + (7 * $rootScope.storeProj.dFldRT1R1[sid][0].descrR) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.grVal[sid].p) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * tmp_max[it] + 'px').attr('y', 16).style('opacity', 0);
                                    d3.select('#mn_X3c_' + (it) + '_' + sid).moveToFront();
                                }
                                d3.select('#mn_X3c_' + (it) + '_' + sid).append('rect').attr('id', 'X3_dropIDC_' + it + '_' + sid).attr('class', 'dropCL').attr('x', 20).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('stroke-width', $rootScope.storeProj.stroke_scale).style('stroke-opacity', '0.5').style('fill-opacity', '0.5').style('fill', 'rgb(166, 166, 166)').style('zIndex', 20);

                                d3.select('#mn_X3c_' + (it) + '_' + sid).append('rect').attr('id', 'col_X3_dropIDC_' + it + '_' + sid).attr('x', 50).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,255,0)');
                                d3.select('#col_X3_dropIDC_' + it + '_' + sid).on('click', function () {
                                    var it = this.id.split('_')[3];
                                    $rootScope.storeProj.colorCL = 1;
                                    $rootScope.func_color('col', 0, it, sid, 2, '#000000');

                                });
                                d3.select('#mn_X3c_' + (it) + '_' + sid).append('rect').attr('id', 'del_X3_dropIDC_' + it + '_' + sid).attr('x', 80).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(255,0,0)');
                                d3.select('#mn_X3c_' + (it) + '_' + sid).on('mouseover', function () {
                                    //$rootScope.action = 1;
                                    $(this).fadeTo(1, 1);

                                });
                                d3.select('#mn_X3c_' + (it) + '_' + sid).on('mouseout', function () {
                                    //$rootScope.action = 0;
                                    //$rootScope.$applyAsync();
                                    $(this).fadeTo(1, 0);

                                });
                                d3.select('#X3_dropIDC_' + (it) + '_' + sid).attr('stroke', 'black').text(function (d) {
                                    return $rootScope.storeProj.tmpItem[sid].col[it].val();
                                });
                                d3.select('#del_X3_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                        $rootScope.storeProj.dFldCT1C1[sid].splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.tmpItem[sid].col.splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.max[sid] = [];
                                        for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                            $rootScope.storeProj.SVG_Leg[sid][it_r].splice(this.id.split('_')[3], 1);
                                            $rootScope.storeProj.SVG_Elem[sid][it_r].splice(this.id.split('_')[3], 1);
                                            $rootScope.storeProj.colVar[sid][it_r].splice(this.id.split('_')[3], 1);
                                            $rootScope.storeProj.SVG_sim[sid][it_r].splice(this.id.split('_')[3], 1);
                                        }
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                            $('#mn_X3c_' + (it) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;
                                        arrLeg = [];
                                        $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);

                                        //$rootScope.action = 0;
                                        //$rootScope.$applyAsync();
                                        $rootScope.func_Templ3(sid);

                                    }
                                );


                                d3.select('#mn_X3c_' + (it) + '_' + sid).append('rect').attr('id', 'dw_X3_dropIDC_' + it + '_' + sid).attr('x', 150).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                                d3.select('#dw_X3_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            if (it == parseInt(this.id.split('_')[3]) && $rootScope.storeProj.dFldCT1C1[sid].length > 1) {
                                                $rootScope.func_swap_dflC(it, it + 1, sid);
                                                $rootScope.func_swap_tmpItemC(it, it + 1, sid);
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Leg[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_LegC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_ElemC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.colVar[sid].length; it_r++) {
                                                    $rootScope.func_swap_colVarC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_sim[sid].length; it_r++) {
                                                    $rootScope.func_swap_simsC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.inpVal[sid].length; it_r++) {
                                                    $rootScope.func_swap_inpValC(it, it + 1, sid, it_r);
                                                }
                                            }
                                        }
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                            $('#mn_X3c_' + (it) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;

                                        $rootScope.func_Templ3(sid);
                                    }
                                );
                                d3.select('#mn_X3c_' + (it) + '_' + sid).append('rect').attr('id', 'up_X3_dropIDC_' + it + '_' + sid).attr('x', 120).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                                d3.select('#up_X3_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            if (it == parseInt(this.id.split('_')[3]) && it > 0 && $rootScope.storeProj.dFldCT1C1[sid].length > 1) {
                                                $rootScope.func_swap_dflC(it, it - 1, sid);
                                                $rootScope.func_swap_tmpItemC(it, it - 1, sid);
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Leg[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_LegC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_ElemC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.colVar[sid].length; it_r++) {
                                                    $rootScope.func_swap_colVarC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_sim[sid].length; it_r++) {
                                                    $rootScope.func_swap_simsC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.inpVal[sid].length; it_r++) {
                                                    $rootScope.func_swap_inpValC(it, it - 1, sid, it_r);
                                                }
                                            }
                                        }
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                            $('#mn_X3c_' + (it) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;

                                        $rootScope.func_Templ3(sid);
                                    }
                                );


                                if ($rootScope.storeProj.isoElem[sid][it_r] == undefined) {
                                    $rootScope.storeProj.isoElem[sid][it_r] = [];
                                }
                                if ($rootScope.storeProj.isoElem[sid][it_r][it] == undefined) {
                                    $rootScope.storeProj.isoElem[sid][it_r][it] = {};
                                }
                                if ($rootScope.storeProj.colVar[sid][it_r] == undefined) {
                                    $rootScope.storeProj.colVar[sid][it_r] = [];
                                }
                                for (var it_iso = 0; it_iso < $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it]); it_iso++) {
                                    if ($rootScope.storeProj.SVG_Elem[sid] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r][it] != undefined) {
                                        $rootScope.storeProj.isoElem[sid][it_r][it] = {};
                                        if (!$($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML.match('id=')) {
                                            var tempSVG = $($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML.replace('<svg ', '<svg id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '"');
                                            $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML(tempSVG)[1];
                                        } else {
                                            if ($.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[4] == undefined) {
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[2];
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;
                                            } else {
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[4];
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;
                                            }
                                        }

                                        if (it_iso > 0 && it_iso % ($rootScope.storeProj.grVal[sid].v) == 0) {
                                            $rootScope.storeProj.grVal[sid].p += 1;
                                        }

                                        /*
                                         else {
                                         if (tmpVal == 0) {
                                         $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML('<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '" class="simCL" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28" enable-background="new 0 0 500 500" xml:space="preserve"><rect fill="#000000" stroke="#000000" x="-1" width="28" height="28"/></svg>')[2];
                                         d3.select('#c1ISOID_' + it + '_' + sid)
                                         .append('g')
                                         .attr('class', 'g1CL_' + it_r + '_' + it + '_' + sid).attr('id', function () {
                                         return 'gc1ID_' + it_r + '_' + it + '_' + it_iso + '_' + sid;
                                         })
                                         .attr('transform', function () {
                                         var x = 216 + (28 + parseInt(parseInt($rootScope.storeProj.valSc[sid]))) *it_iso + ((38 + parseInt(parseInt($rootScope.storeProj.valSc[sid])))+ 38*tmpMax[it])
                                         var y = 64 + 34 * it_r;
                                         $rootScope.storeProj.scale[sid].x = x;
                                         $rootScope.storeProj.scale[sid].y = y;
                                         return 'translate(' + x + ',' + y + ')';
                                         })
                                         .append(function () {
                                         return $rootScope.storeProj.isoElem[sid][it_r][it].iso;
                                         });

                                         }
                                         }
                                         */
                                        if (ckT3_r[sid] == undefined) {
                                            ckT3_r[sid] = 0;
                                        }
                                        if (ckT3_r[sid] == 0 || $rootScope.storeProj.colVar[sid][it_r][it] == undefined) {
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').css('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).css('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').attr('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).attr('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').css('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).css('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').attr('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).attr('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').css('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).css('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').attr('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).attr('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').css('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).css('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').attr('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).attr('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').css('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).css('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').attr('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).attr('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').css('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).css('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').attr('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).attr('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').css('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).css('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').attr('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).attr('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                            }
                                        }
                                        if ($rootScope.storeProj.colVar[sid][it_r][it] != undefined) {
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                        }
                                    }
                                    $rootScope.$apply();
                                    d3.select('#c3ISOID_' + it + '_' + sid)
                                        .append('g')
                                        .attr('class', 'g3CL_' + it_r + '_' + it + '_' + sid)
                                        .attr('transform', function () {
                                            var x = 46 + (7 * $rootScope.storeProj.dFldCT1C1[sid][0].descrR) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * it_iso) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.tmpMax[it][it_r];
                                            var y = 64 + 34 * it_r;
                                            $rootScope.storeProj.scale[sid].x = x;
                                            $rootScope.storeProj.scale[sid].y = y;
                                            return 'translate(' + x + ',' + y + ')';
                                        })
                                        .append(function () {
                                            return $rootScope.storeProj.isoElem[sid][it_r][it].iso;
                                        });
                                }
                                $rootScope.storeProj.grVal[sid].p = 0;

                            }
                        }

                        if ($rootScope.storeProj.tmpItem[sid].col.length > 0 && $rootScope.storeProj.tmpItem[sid].row.length > 0) {
                            for (var it = 0; it < $rootScope.storeProj.tmpLeg[sid].length; it++) {
                                d3.select('#svgVal_' + it + '_2_' + sid).attr('opacity', '1');
                                d3.select('#numVal_' + it + '_2_' + sid).attr('opacity', '1');
                            }
                        } else {
                            for (var it = 0; it < $rootScope.storeProj.tmpLeg[sid].length; it++) {
                                d3.select('#svgVal_' + it + '_2_' + sid).attr('opacity', '0');
                                d3.select('#numVal_' + it + '_2_' + sid).attr('opacity', '0');
                            }
                        }
                        for (var it_s = 0; it_s < $rootScope.storeProj.tmpLeg[sid].length; it_s++) {
                            $('#svgVal_' + it_s + '_2_' + sid).children().remove();

                            d3.select('#svgVal_' + it_s + '_2_' + sid).append('g').append(function () {
                                if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["4"] != undefined) {
                                    if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_2_' + sid + '"'))["1"];
                                        return tmpLeg;
                                    } else {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["4"];
                                        tmpLeg.id = 'svgLeg_' + it_s + '_2_' + sid;
                                        return tmpLeg;
                                    }
                                }
                                if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["2"] != undefined) {
                                    if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_2_' + sid + '"'))["1"];
                                        return tmpLeg;
                                    } else {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["2"];
                                        tmpLeg.id = 'svgLeg_' + it_s + '_2_' + sid;
                                        return tmpLeg;
                                    }
                                }
                                if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["1"] != undefined) {
                                    if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_2_' + sid + '"'))["1"];
                                        return tmpLeg;
                                    } else {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["1"];
                                        tmpLeg.id = 'svgLeg_' + it_s + '_2_' + sid;
                                        return tmpLeg;
                                    }
                                }

                            });
                            /*
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('path').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('path').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('path').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('circle').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('circle').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('circle').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('rect').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('rect').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('rect').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('text').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('text').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('text').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('line').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('line').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('line').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('polygon').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('polygon').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('polygon').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('pattern').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('pattern').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('pattern').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             */
                        }
                    }
                }

                if ($rootScope.storeProj.tmpCR[sid] == 1) {
                    $rootScope.calcRow = 0;
                    if ($rootScope.storeProj.max[sid] == undefined) {
                        $rootScope.storeProj.max[sid] = [];
                    }
                    if ($rootScope.storeProj.max3[sid] == undefined) {
                        $rootScope.storeProj.max3[sid] = [];
                    }
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            if ($rootScope.storeProj.tmpItem[sid].col != undefined) {
                                for (var it_c = 0; it_c < $rootScope.storeProj.tmpItem[sid].col.length; it_c++) {
                                    if ($rootScope.storeProj.max[sid][it_c] == undefined) {
                                        $rootScope.storeProj.max[sid][it_c] = 6;
                                    }
                                }
                            }
                        }
                        var tmp_max = [];
                        tmp_max[0] = 0;
                        tmp_max[1] = 6;
                        for (var it_c = 0; it_c < $rootScope.storeProj.tmpItem[sid].col.length; it_c++) {
                            for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                                if ($rootScope.storeProj.max[sid][it_c] < $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it_c][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it_c])) {
                                    $rootScope.storeProj.max[sid][it_c] = $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it_c][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it_c]);
                                }
                                if ($rootScope.storeProj.grVal[sid].v == 5) {
                                    $rootScope.storeProj.grVal[sid].r[it_c] = 0;
                                }
                                if ($rootScope.storeProj.grVal[sid].v == 10) {
                                    $rootScope.storeProj.grVal[sid].r[it_c] = 0;
                                }
                                if ($rootScope.storeProj.grVal[sid].v == 0) {
                                    $rootScope.storeProj.grVal[sid].r[it_c] = 0;
                                }
                            }
                        }
                        $rootScope.storeProj.tmpMax = [];
                        for (var it_c = 0; it_c < $rootScope.storeProj.tmpItem[sid].col.length; it_c++) {
                            $rootScope.storeProj.tmpMax[it_c] = [];
                            $rootScope.storeProj.max3[sid][it_c] = [];
                            for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                                $rootScope.storeProj.max3[sid][it_c][it_r] = $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it_c][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it_c]);
                            }
                        }
                        for (var it_c = 0; it_c < $rootScope.storeProj.max3[sid].length; it_c++) {
                            for (var it_r = 0; it_r < $rootScope.storeProj.max3[sid][it_c].length; it_r++) {
                                $rootScope.storeProj.tmpMax[it_c][it_r] = 0;
                                if (it_c > 0) {
                                    for (var it = it_c - 1; it >= 0; it--) {
                                        $rootScope.storeProj.tmpMax[it_c][it_r] += $rootScope.storeProj.max3[sid][it][it_r];
                                        tmp_max[it_c] = $rootScope.storeProj.tmpMax[it_c][0];
                                    }
                                }
                            }
                        }
                    }
                    $rootScope.storeProj.grVal[sid].p = 0;
                    if ($rootScope.storeProj.tmpItem[sid].col != undefined) {
                        for (var it_c = 0; it_c < $rootScope.storeProj.tmpItem[sid].col.length; it_c++) {
                            $('#c3ISOID_' + it_c + '_' + sid).children().remove();
                        }
                    }
                    for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                        $rootScope.storeProj.dFldCT1C1[sid][it].vc = parseInt($rootScope.storeProj.valSc[sid]);
                        $rootScope.storeProj.dFldCT1C1[sid][it].grv = $rootScope.storeProj.grVal[sid].v;
                        $rootScope.storeProj.dFldCT1C1[sid][it].grp = $rootScope.storeProj.grVal[sid].p;
                        $rootScope.storeProj.dFldCT1C1[sid][it].max = tmp_max[it];
                        if (tmp_max[it] == undefined) {
                            $rootScope.storeProj.dFldCT1C1[sid][it].max = tmp_max[it - 1] + 7;
                        }
                        $rootScope.storeProj.dFldCT1C1[sid][it].rlen = $rootScope.storeProj.dFldRT1R1[sid].length;
                    }
                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                        $rootScope.storeProj.dFldRT1R1[sid][it].vc = parseInt($rootScope.storeProj.valSc[sid]);
                        $rootScope.storeProj.dFldRT1R1[sid][it].grv = $rootScope.storeProj.grVal[sid].v;
                        $rootScope.storeProj.dFldRT1R1[sid][it].grp = $rootScope.storeProj.grVal[sid].p;
                        //$rootScope.storeProj.dFldRT1R1[sid][it].max = $rootScope.storeProj.max[sid][0];
                        $rootScope.storeProj.dFldRT1R1[sid][it].clen = $rootScope.storeProj.dFldCT1C1[sid].length;
                    }
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            if ($('#mn_X3r_' + (it_r) + '_' + sid)[0] != undefined) {
                                $('#mn_X3r_' + (it_r) + '_' + sid).remove();
                            }
                            if ($('#mn_X3r_' + (it_r) + '_' + sid)[0] == undefined) {
                                d3.select('#svgID3_' + sid).append('svg').attr('id', 'mn_X3r_' + ((it_r)) + '_' + sid).attr('class', 'mnXr').attr('x', 11).attr('y', 30 + 34 * (it_r + 1) + 'px').style('opacity', 0);
                                d3.select('#mn_X3r_' + (it_r) + '_' + sid).moveToFront();
                            }
                            d3.select('#mn_X3r_' + (it_r) + '_' + sid).append('rect').attr('id', 'X3_dropIDR_' + it_r + '_' + sid).attr('class', 'dropCL').attr('x', 0).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('stroke-width', $rootScope.storeProj.stroke_scale).style('stroke-opacity', '0.5').style('fill-opacity', '0.5').style('fill', 'rgb(166, 166, 166)').style('zIndex', 20);
                            var chk = 0;
                            $('#X3_dropIDR_' + it_r + '_' + sid).one({
                                mouseenter: function () {
                                    $(this).css('fill', 'rgb(111, 111, 166)');
                                },
                                mouseleave: function () {
                                    $(this).css('fill', 'rgb(166, 166, 166)');
                                },
                                drop: function (d) {
                                    if (chk == 0) {
                                        $rootScope.func_svgDropped(2, sid, d);
                                        $rootScope.func_iFace(2, sid);
                                        s;
                                        chk = 1;
                                    }
                                }
                            });
                            d3.select('#mn_X3r_' + (it_r) + '_' + sid).append('rect').attr('id', 'col_X3_dropIDR_' + it_r + '_' + sid).attr('x', 30).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,255,0)');
                            d3.select('#col_X3_dropIDR_' + it_r + '_' + sid).on('click', function () {
                                var it = this.id.split('_')[3];
                                $rootScope.storeProj.colorCL = 1;
                                $rootScope.func_color('row', it, 0, sid, 1, '#000000');
                            });
                            d3.select('#mn_X3r_' + (it_r) + '_' + sid).append('rect').attr('id', 'del_X3_dropIDR_' + it_r + '_' + sid).attr('x', 60).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(255,0,0)');
                            d3.select('#mn_X3r_' + (it_r) + '_' + sid).on('mouseover', function () {
                                //$rootScope.action = 1;
                                $(this).fadeTo(1, 1);

                            });
                            d3.select('#mn_X3r_' + (it_r) + '_' + sid).on('mouseout', function () {
                                //$rootScope.action = 0;
                                //$rootScope.$applyAsync();
                                $(this).fadeTo(1, 0);

                            });
                            d3.select('#del_X3_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    //d3.select('#del_X1_dropIDR_' + this.id.split('_')[3]).remove();
                                    //d3.select('#X1_dropIDR_' + this.id.split('_')[3]).remove();
                                    //d3.select('#T1_dropIDR_' + this.id.split('_')[3]).remove();

                                    $rootScope.storeProj.dFldRT1R1[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.tmpItem[sid].row.splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_Leg[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_Elem[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.colVar[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_sim[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.max[sid] = [];
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X3r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;
                                    arrLeg = [];
                                    $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);

                                    //$rootScope.action = 0;
                                    //$rootScope.$applyAsync();
                                    $rootScope.func_Templ3(sid);

                                }
                            );
                            d3.select('#mn_X3r_' + (it_r) + '_' + sid).append('rect').attr('id', 'up_X3_dropIDR_' + it_r + '_' + sid).attr('x', 90).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#up_X3_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it_r = 0; it_r < $rootScope.storeProj.dFldRT1R1[sid].length; it_r++) {
                                        if (it_r === parseInt(this.id.split('_')[3]) && it_r > 0 && $rootScope.storeProj.dFldRT1R1[sid].length > 1) {
                                            $rootScope.func_swap_dflR(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_tmpItem(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_SVG_Leg(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_SVG_Elem(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_colVar(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_sims(it_r, it_r - 1, sid);
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X3r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;

                                    $rootScope.func_Templ3(sid);
                                }
                            );
                            d3.select('#mn_X3r_' + (it_r) + '_' + sid).append('rect').attr('id', 'dw_X3_dropIDR_' + it_r + '_' + sid).attr('x', 120).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#dw_X3_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it_r = 0; it_r < $rootScope.storeProj.dFldRT1R1[sid].length; it_r++) {
                                        if (it_r == parseInt(this.id.split('_')[3]) && it_r < ($rootScope.storeProj.dFldRT1R1[sid].length - 2) && $rootScope.storeProj.dFldRT1R1[sid].length > 1) {
                                            $rootScope.func_swap_dflR(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_tmpItem(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_SVG_Leg(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_SVG_Elem(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_colVar(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_sims(it_r, it_r + 1, sid);
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X3r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;

                                    $rootScope.func_Templ3(sid);
                                }
                            );
                            d3.select('#X3_dropIDR_' + (it_r) + '_' + sid).attr('stroke', 'black').text(function (d) {
                                return $rootScope.storeProj.tmpItem[sid].row[it_r].val();
                            });
                            if ($rootScope.storeProj.isoElem[sid] == undefined) {
                                $rootScope.storeProj.isoElem[sid] = [];
                            }
                            if ($rootScope.storeProj.colVar[sid] == undefined) {
                                $rootScope.storeProj.colVar[sid] = [];
                            }
                            for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                                $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                    if ($rootScope.storeProj.dFldCT1C1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                        $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                        $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                    if ($rootScope.storeProj.dFldCT1C1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                        $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                    if ($rootScope.storeProj.dFldRT1R1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                        $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                        $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                    if ($rootScope.storeProj.dFldRT1R1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                        $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                    }
                                }
                                if ($('#mn_X3c_' + (it) + '_' + sid)[0] != undefined) {
                                    $('#mn_X3c_' + (it) + '_' + sid).remove();
                                }
                                if ($('#mn_X3c_' + (it) + '_' + sid)[0] == undefined) {
                                    d3.select('#svgID3_' + sid).append('svg').attr('id', 'mn_X3c_' + ((it)) + '_' + sid).attr('class', 'mnXc').attr('x', 38 + (7 * $rootScope.storeProj.dFldRT1R1[sid][0].descrR) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.grVal[sid].p) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * tmp_max[it] + 'px').attr('y', 16).style('opacity', 0);
                                    d3.select('#mn_X3c_' + (it) + '_' + sid).moveToFront();
                                }
                                d3.select('#mn_X3c_' + (it) + '_' + sid).append('rect').attr('id', 'X3_dropIDC_' + it + '_' + sid).attr('class', 'dropCL').attr('x', 20).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('stroke-width', $rootScope.storeProj.stroke_scale).style('stroke-opacity', '0.5').style('fill-opacity', '0.5').style('fill', 'rgb(166, 166, 166)').style('zIndex', 20);


                                d3.select('#mn_X3c_' + (it) + '_' + sid).append('rect').attr('id', 'col_X3_dropIDC_' + it + '_' + sid).attr('x', 50).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,255,0)');
                                d3.select('#col_X3_dropIDC_' + it + '_' + sid).on('click', function () {
                                    var it = this.id.split('_')[3];
                                    $rootScope.storeProj.colorCL = 1;
                                    $rootScope.func_color('col', 0, it, sid, 2, '#000000');

                                });
                                d3.select('#mn_X3c_' + (it) + '_' + sid).append('rect').attr('id', 'del_X3_dropIDC_' + it + '_' + sid).attr('x', 80).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(255,0,0)');
                                d3.select('#mn_X3c_' + (it) + '_' + sid).on('mouseover', function () {
                                    //$rootScope.action = 1;
                                    $(this).fadeTo(1, 1);

                                });
                                d3.select('#mn_X3c_' + (it) + '_' + sid).on('mouseout', function () {
                                    //$rootScope.action = 0;
                                    //$rootScope.$applyAsync();
                                    $(this).fadeTo(1, 0);

                                });
                                d3.select('#X3_dropIDC_' + (it) + '_' + sid).attr('stroke', 'black').text(function (d) {
                                    return $rootScope.storeProj.tmpItem[sid].col[it].val();
                                });
                                d3.select('#del_X3_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                        $rootScope.storeProj.dFldCT1C1[sid].splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.tmpItem[sid].col.splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.max[sid] = [];
                                        for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                            $rootScope.storeProj.SVG_Leg[sid][it_r].splice(this.id.split('_')[3], 1);
                                            $rootScope.storeProj.SVG_Elem[sid][it_r].splice(this.id.split('_')[3], 1);
                                            $rootScope.storeProj.colVar[sid][it_r].splice(this.id.split('_')[3], 1);
                                            $rootScope.storeProj.SVG_sim[sid][it_r].splice(this.id.split('_')[3], 1);
                                        }
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                            $('#mn_X3c_' + (it) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;
                                        arrLeg = [];
                                        $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);

                                        //$rootScope.action = 0;
                                        //$rootScope.$applyAsync();
                                        $rootScope.func_Templ3(sid);

                                    }
                                );


                                d3.select('#mn_X3c_' + (it) + '_' + sid).append('rect').attr('id', 'dw_X3_dropIDC_' + it + '_' + sid).attr('x', 150).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                                d3.select('#dw_X3_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            if (it == parseInt(this.id.split('_')[3]) && $rootScope.storeProj.dFldCT1C1[sid].length > 1) {
                                                $rootScope.func_swap_dflC(it, it + 1, sid);
                                                $rootScope.func_swap_tmpItemC(it, it + 1, sid);
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Leg[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_LegC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_ElemC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.colVar[sid].length; it_r++) {
                                                    $rootScope.func_swap_colVarC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_sim[sid].length; it_r++) {
                                                    $rootScope.func_swap_simsC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.inpVal[sid].length; it_r++) {
                                                    $rootScope.func_swap_inpValC(it, it + 1, sid, it_r);
                                                }
                                            }
                                        }
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                            $('#mn_X3c_' + (it) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;

                                        $rootScope.func_Templ3(sid);
                                    }
                                );
                                d3.select('#mn_X3c_' + (it) + '_' + sid).append('rect').attr('id', 'up_X3_dropIDC_' + it + '_' + sid).attr('x', 120).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                                d3.select('#up_X3_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            if (it == parseInt(this.id.split('_')[3]) && it > 0 && $rootScope.storeProj.dFldCT1C1[sid].length > 1) {
                                                $rootScope.func_swap_dflC(it, it - 1, sid);
                                                $rootScope.func_swap_tmpItemC(it, it - 1, sid);
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Leg[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_LegC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_ElemC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.colVar[sid].length; it_r++) {
                                                    $rootScope.func_swap_colVarC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_sim[sid].length; it_r++) {
                                                    $rootScope.func_swap_simsC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.inpVal[sid].length; it_r++) {
                                                    $rootScope.func_swap_inpValC(it, it - 1, sid, it_r);
                                                }
                                            }
                                        }
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                            $('#mn_X3c_' + (it) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;

                                        $rootScope.func_Templ3(sid);
                                    }
                                );


                                if ($rootScope.storeProj.isoElem[sid][it_r] == undefined) {
                                    $rootScope.storeProj.isoElem[sid][it_r] = [];
                                }
                                if ($rootScope.storeProj.isoElem[sid][it_r][it] == undefined) {
                                    $rootScope.storeProj.isoElem[sid][it_r][it] = {};
                                }
                                if ($rootScope.storeProj.colVar[sid][it_r] == undefined) {
                                    $rootScope.storeProj.colVar[sid][it_r] = [];
                                }
                                for (var it_iso = 0; it_iso < $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it]); it_iso++) {
                                    if ($rootScope.storeProj.SVG_Elem[sid] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r][it] != undefined) {
                                        $rootScope.storeProj.isoElem[sid][it_r][it] = {};
                                        if (!$($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML.match('id=')) {
                                            var tempSVG = $($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML.replace('<svg ', '<svg id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '"');
                                            $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML(tempSVG)[1];
                                        } else {
                                            if ($.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[4] == undefined) {
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[2];
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;
                                            } else {
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[4];
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;
                                            }
                                        }

                                        if (it_iso > 0 && it_iso % ($rootScope.storeProj.grVal[sid].v) == 0) {
                                            $rootScope.storeProj.grVal[sid].p += 1;
                                        }

                                        /*
                                         else {
                                         if (tmpVal == 0) {
                                         $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML('<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '" class="simCL" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28" enable-background="new 0 0 500 500" xml:space="preserve"><rect fill="#000000" stroke="#000000" x="-1" width="28" height="28"/></svg>')[2];
                                         d3.select('#c1ISOID_' + it + '_' + sid)
                                         .append('g')
                                         .attr('class', 'g1CL_' + it_r + '_' + it + '_' + sid).attr('id', function () {
                                         return 'gc1ID_' + it_r + '_' + it + '_' + it_iso + '_' + sid;
                                         })
                                         .attr('transform', function () {
                                         var x = 216 + (28 + parseInt(parseInt($rootScope.storeProj.valSc[sid]))) *it_iso + ((38 + parseInt(parseInt($rootScope.storeProj.valSc[sid])))+ 38*tmpMax[it])
                                         var y = 64 + 34 * it_r;
                                         $rootScope.storeProj.scale[sid].x = x;
                                         $rootScope.storeProj.scale[sid].y = y;
                                         return 'translate(' + x + ',' + y + ')';
                                         })
                                         .append(function () {
                                         return $rootScope.storeProj.isoElem[sid][it_r][it].iso;
                                         });

                                         }
                                         }
                                         */
                                        if (ckT3_c[sid] == undefined) {
                                            ckT3_c[sid] = 0;
                                        }
                                        if (ckT3_c[sid] == 0 || $rootScope.storeProj.colVar[sid][it_r][it] == undefined) {
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').css('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).css('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').attr('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).attr('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').css('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).css('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').attr('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).attr('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').css('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).css('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').attr('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).attr('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').css('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).css('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').attr('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).attr('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').css('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).css('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').attr('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).attr('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').css('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).css('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').attr('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).attr('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').css('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).css('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').attr('stroke', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]).attr('fill', $rootScope.storeProj.colors[sid][it % $rootScope.storeProj.colors[sid].length]);
                                            }
                                        }
                                        if ($rootScope.storeProj.colVar[sid][it_r][it] != undefined) {
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                        }
                                    }
                                    $rootScope.$apply();
                                    d3.select('#c3ISOID_' + it + '_' + sid)
                                        .append('g')
                                        .attr('class', 'g3CL_' + it_r + '_' + it + '_' + sid)
                                        .attr('transform', function () {
                                            var x = 46 + (7 * $rootScope.storeProj.dFldCT1C1[sid][0].descrR) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * it_iso) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.tmpMax[it][it_r];
                                            var y = 64 + 34 * it_r;
                                            $rootScope.storeProj.scale[sid].x = x;
                                            $rootScope.storeProj.scale[sid].y = y;
                                            return 'translate(' + x + ',' + y + ')';
                                        })
                                        .append(function () {
                                            return $rootScope.storeProj.isoElem[sid][it_r][it].iso;
                                        });
                                }
                                $rootScope.storeProj.grVal[sid].p = 0;

                            }
                        }

                        if ($rootScope.storeProj.tmpItem[sid].col.length > 0 && $rootScope.storeProj.tmpItem[sid].row.length > 0) {
                            for (var it = 0; it < $rootScope.storeProj.tmpLeg[sid].length; it++) {
                                d3.select('#svgVal_' + it + '_2_' + sid).attr('opacity', '1');
                                d3.select('#numVal_' + it + '_2_' + sid).attr('opacity', '1');
                            }
                        } else {
                            for (var it = 0; it < $rootScope.storeProj.tmpLeg[sid].length; it++) {
                                d3.select('#svgVal_' + it + '_2_' + sid).attr('opacity', '0');
                                d3.select('#numVal_' + it + '_2_' + sid).attr('opacity', '0');
                            }
                        }
                        for (var it_s = 0; it_s < $rootScope.storeProj.tmpLeg[sid].length; it_s++) {
                            $('#svgVal_' + it_s + '_2_' + sid).children().remove();

                            d3.select('#svgVal_' + it_s + '_2_' + sid).append('g').append(function () {
                                if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["4"] != undefined) {
                                    if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_2_' + sid + '"'))["1"];
                                        return tmpLeg;
                                    } else {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["4"];
                                        tmpLeg.id = 'svgLeg_' + it_s + '_2_' + sid;
                                        return tmpLeg;
                                    }
                                }
                                if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["2"] != undefined) {
                                    if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_2_' + sid + '"'))["1"];
                                        return tmpLeg;
                                    } else {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["2"];
                                        tmpLeg.id = 'svgLeg_' + it_s + '_2_' + sid;
                                        return tmpLeg;
                                    }
                                }
                                if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["1"] != undefined) {
                                    if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_2_' + sid + '"'))["1"];
                                        return tmpLeg;
                                    } else {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["1"];
                                        tmpLeg.id = 'svgLeg_' + it_s + '_2_' + sid;
                                        return tmpLeg;
                                    }
                                }

                            });
                            /*
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('path').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('path').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('path').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('circle').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('circle').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('circle').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('rect').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('rect').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('rect').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('text').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('text').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('text').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('line').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('line').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('line').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('polygon').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('polygon').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('polygon').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('pattern').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('pattern').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('pattern').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             */
                        }
                    }
                }
                //DOM has finished rendering
            }, 0, false);
        };
        $rootScope.func_Templ4 = function (sid) {
            $timeout(function () {

                func_dCol();
                console.log($rootScope.storeProj.chkSCVal);
                if ($rootScope.storeProj.chkSCVal == 0) {
                    $('.optionCL').css('visibility', 'hidden');
                }
                if ($rootScope.storeProj.headline[$rootScope.storeProj.slideID].length == 0) {
                    $rootScope.storeProj.yPosLine[$rootScope.storeProj.slideID] = 0;
                }
                if ($rootScope.storeProj.headline[$rootScope.storeProj.slideID].length > 0) {
                    $rootScope.storeProj.yPosLine[$rootScope.storeProj.slideID] = 32;
                }
                $rootScope.storeProj.it[sid] = 0;
                $rootScope.storeProj.colors[sid] = ["#5b9254", "#e64639", "#1a4e53", "#d99a00", "#cccccc", "#000000"];
                $('.descrCL').css('outline', '0');
                $('.descrCL').css('outline-offset', '-2px');

                $('#tmplID_3_' + sid).css('outline', '5px auto -webkit-focus-ring-color');
                $('#tmplID_3_' + sid).css('outline-offset', '-2px');

                $('.templCL').css('outline', '0');
                $('.templCL').css('outline-offset', '-2px');

                $('#Templ4_' + sid).css('outline', '5px auto -webkit-focus-ring-color');
                $('#Templ4_' + sid).css('outline-offset', '-2px');
                $rootScope.storeProj.max[sid] = [];
                $rootScope.storeProj.max3[sid] = [];
                if ($rootScope.storeProj.inpVal[sid] == undefined) {
                    $rootScope.storeProj.inpVal[sid] = [];
                }
                if ($rootScope.storeProj.tmpItem[sid] != undefined && $rootScope.storeProj.tmpItem[sid].row != undefined) {
                    for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].row.length; it++) {
                        if ($rootScope.storeProj.inpVal[sid][it] == undefined) {
                            $rootScope.storeProj.inpVal[sid][it] = [];
                        }
                        if ($rootScope.storeProj.SVG_Leg[sid][it] != undefined) {
                            for (var it_1 = 0; it_1 < $rootScope.storeProj.tmpItem[sid].col.length; it_1++) {
                                if ($rootScope.storeProj.inpVal[sid][it][it_1] == undefined) {
                                    if ($rootScope.storeProj.SVG_Leg[sid][it][it_1] != undefined) {
                                        $rootScope.storeProj.inpVal[sid][it][it_1] = $rootScope.storeProj.SVG_Leg[sid][it][it_1].valt;
                                    } else {
                                        $rootScope.storeProj.inpVal[sid][it][it_1] = 1;
                                    }
                                }
                            }
                        }
                    }
                }
                $rootScope.func_maxValue(sid);
                d3.selection.prototype.moveToFront = function () {
                    return this.each(function () {
                        this.parentNode.appendChild(this);
                    });
                };
                d3.selection.prototype.moveToBack = function () {
                    return this.each(function () {
                        var firstChild = this.parentNode.firstChild;
                        if (firstChild) {
                            this.parentNode.insertBefore(this, firstChild);
                        }
                    });
                };
                $rootScope.tmpID = 3;
                $rootScope.storeProj.slides[sid].tmp = 3;
                $rootScope.$apply(); // switch templates preparation
                // generating amount of similar ones
                $rootScope.T_h1 = parseInt($('.templ').css('height').split('px')[0]);
                if ($rootScope.storeProj.tmpCR[sid] == 0) {
                    if ($rootScope.storeProj.max[sid] == undefined) {
                        $rootScope.storeProj.max[sid] = [];
                    }
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            if ($rootScope.storeProj.tmpItem[sid].col != undefined) {
                                for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                                    if ($rootScope.storeProj.max[sid][it] == undefined) {
                                        $rootScope.storeProj.max[sid][it] = 6;
                                    }
                                }
                            }
                        }
                        $rootScope.storeProj.tmpMax = [];
                        $rootScope.storeProj.tmpMax[0] = 0;
                        $rootScope.storeProj.tmpMax[1] = 6;
                        for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                            for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                                if ($rootScope.storeProj.grVal[sid].v != 0) {
                                    if ($rootScope.storeProj.max[sid][it] < $rootScope.func_round(($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value) / $rootScope.storeProj.inpVal[sid][it_r][it] + ($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value / $rootScope.storeProj.grVal[sid].v) / $rootScope.storeProj.inpVal[sid][it_r][it])) {
                                        $rootScope.storeProj.max[sid][it] = $rootScope.func_round(($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value) / $rootScope.storeProj.inpVal[sid][it_r][it] + ($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value / $rootScope.storeProj.grVal[sid].v) / $rootScope.storeProj.inpVal[sid][it_r][it]);
                                    }
                                } else {
                                    if ($rootScope.storeProj.max[sid][it] < $rootScope.func_round(($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value) / $rootScope.storeProj.inpVal[sid][it_r][it])) {
                                        $rootScope.storeProj.max[sid][it] = $rootScope.func_round(($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value) / $rootScope.storeProj.inpVal[sid][it_r][it]);
                                    }
                                }
                            }
                        }
                        for (var it = 0; it < $rootScope.storeProj.max[sid].length; it++) {
                            $rootScope.storeProj.tmpMax[it + 1] = 0;
                            for (var it1 = 0; it1 <= it; it1++) {
                                $rootScope.storeProj.tmpMax[it + 1] += $rootScope.storeProj.max[sid][it1];
                                if (it1 % 2 == 1) {
                                    $rootScope.storeProj.tmpMax[it + 1] = 0;
                                }
                            }
                        }
                        for (var it = 0; it < $rootScope.storeProj.max[sid].length; it++) {
                            if (it % 2 == 0) {
                                if (midMax < $rootScope.storeProj.max[sid][it]) {
                                    midMax = $rootScope.storeProj.max[sid][it];
                                }
                            }
                        }
                    }
                    $rootScope.storeProj.grVal[sid].p = 0;
                    if ($rootScope.storeProj.tmpItem[sid].col != undefined) {
                        for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                            $('#c4ISOID_' + it + '_' + sid).children().remove();
                        }
                    }
                    for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                        $rootScope.storeProj.dFldCT1C1[sid][it].vc = parseInt($rootScope.storeProj.valSc[sid]);
                        $rootScope.storeProj.dFldCT1C1[sid][it].grv = $rootScope.storeProj.grVal[sid].v;
                        $rootScope.storeProj.dFldCT1C1[sid][it].grp = $rootScope.storeProj.grVal[sid].p;
                        $rootScope.storeProj.dFldCT1C1[sid][it].max = midMax;
                        $rootScope.storeProj.dFldCT1C1[sid][it].rlen = $rootScope.storeProj.dFldRT1R1[sid].length;
                    }
                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                        $rootScope.storeProj.dFldRT1R1[sid][it].vc = parseInt($rootScope.storeProj.valSc[sid]);
                        $rootScope.storeProj.dFldRT1R1[sid][it].grv = $rootScope.storeProj.grVal[sid].v;
                        $rootScope.storeProj.dFldRT1R1[sid][it].grp = $rootScope.storeProj.grVal[sid].p;
                        //$rootScope.storeProj.dFldRT1R1[sid][it].max = $rootScope.storeProj.max[sid][0];
                        $rootScope.storeProj.dFldRT1R1[sid][it].clen = $rootScope.storeProj.dFldCT1C1[sid].length;
                    }
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            if ($('#mn_X4r_' + (it_r) + '_' + sid)[0] != undefined) {
                                $('#mn_X4r_' + (it_r) + '_' + sid).remove();
                            }
                            if ($('#mn_X4r_' + (it_r) + '_' + sid)[0] == undefined) {
                                d3.select('#svgID4_' + sid).append('svg').attr('id', 'mn_X4r_' + ((it_r)) + '_' + sid).attr('class', 'mnXr').attr('x', 11).attr('y', 30 + 34 * (it_r + 1) + 'px').style('opacity', 0);
                                d3.select('#mn_X4r_' + (it_r) + '_' + sid).moveToFront();
                            }
                            d3.select('#mn_X4r_' + (it_r) + '_' + sid).append('rect').attr('id', 'X4_dropIDR_' + it_r + '_' + sid).attr('class', 'dropCL').attr('x', 0).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('stroke-width', $rootScope.storeProj.stroke_scale).style('stroke-opacity', '0.5').style('fill-opacity', '0.5').style('fill', 'rgb(166, 166, 166)').style('zIndex', 20);
                            var chk = 0;
                            $('#X4_dropIDR_' + it_r + '_' + sid).one({
                                mouseenter: function () {
                                    $(this).css('fill', 'rgb(111, 111, 166)');
                                },
                                mouseleave: function () {
                                    $(this).css('fill', 'rgb(166, 166, 166)');
                                },
                                drop: function (d) {
                                    if (chk == 0) {
                                        $rootScope.func_svgDropped(3, sid, d);
                                        $rootScope.func_iFace(3, sid);
                                        chk = 1;
                                    }
                                }
                            });
                            d3.select('#mn_X4r_' + (it_r) + '_' + sid).append('rect').attr('id', 'col_X4_dropIDR_' + it_r + '_' + sid).attr('x', 30).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,255,0)');
                            d3.select('#col_X4_dropIDR_' + it_r + '_' + sid).on('click', function () {
                                var it = this.id.split('_')[3];
                                $rootScope.storeProj.colorCL = 1;
                                $rootScope.func_color('row', it, 0, sid, 3, '#000000');
                            });
                            d3.select('#mn_X4r_' + (it_r) + '_' + sid).append('rect').attr('id', 'del_X4_dropIDR_' + it_r + '_' + sid).attr('x', 60).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(255,0,0)');
                            d3.select('#mn_X4r_' + (it_r) + '_' + sid).on('mouseover', function () {
                                //$rootScope.action = 1;
                                $(this).fadeTo(1, 1);

                            });
                            d3.select('#mn_X4r_' + (it_r) + '_' + sid).on('mouseout', function () {
                                ////$rootScope.action = 0;
                                //$rootScope.$applyAsync();

                                $(this).fadeTo(1, 0);

                            });
                            d3.select('#del_X4_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it_r1 = $rootScope.storeProj.tmpItem[sid].row.length; it_r1 <= $rootScope.storeProj.tmpItem[sid].row.length * ($rootScope.storeProj.tmpItem[sid].col.length + 1); it_r1++) {
                                        if (it_r1 == $rootScope.storeProj.tmpItem[sid].row.length) {
                                            d3.select('#X4_dropIDR_' + (it_r1) + '_' + sid).property('value', '');
                                        } else {
                                            d3.select('#X4_dropIDR_' + (it_r1) + '_' + sid).remove();
                                        }
                                    }

                                    $rootScope.storeProj.dFldRT1R1[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.tmpItem[sid].row.splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_Leg[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_Elem[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.colVar[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_sim[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.max[sid] = [];
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X4r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;
                                    arrLeg = [];
                                    $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);

                                    //$rootScope.action = 0;
                                    //$rootScope.$applyAsync();
                                    $rootScope.func_Templ4(sid);


                                }
                            );
                            d3.select('#mn_X4r_' + (it_r) + '_' + sid).append('rect').attr('id', 'up_X4_dropIDR_' + it_r + '_' + sid).attr('x', 90).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#up_X4_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it_r = 0; it_r < $rootScope.storeProj.dFldRT1R1[sid].length; it_r++) {
                                        if (it_r === parseInt(this.id.split('_')[3]) && it_r > 0 && $rootScope.storeProj.dFldRT1R1[sid].length > 1) {
                                            $rootScope.func_swap_dflR(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_tmpItem(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_SVG_Leg(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_SVG_Elem(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_colVar(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_sims(it_r, it_r - 1, sid);
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X4r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;

                                    $rootScope.func_Templ4(sid);
                                }
                            );
                            d3.select('#mn_X4r_' + (it_r) + '_' + sid).append('rect').attr('id', 'dw_X4_dropIDR_' + it_r + '_' + sid).attr('x', 120).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#dw_X4_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it_r = 0; it_r < $rootScope.storeProj.dFldRT1R1[sid].length; it_r++) {
                                        if (it_r == parseInt(this.id.split('_')[3]) && it_r < ($rootScope.storeProj.dFldRT1R1[sid].length - 2) && $rootScope.storeProj.dFldRT1R1[sid].length > 1) {
                                            $rootScope.func_swap_dflR(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_tmpItem(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_SVG_Leg(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_SVG_Elem(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_colVar(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_sims(it_r, it_r + 1, sid);
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X4r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;

                                    $rootScope.func_Templ4(sid);
                                }
                            );

                            d3.select('#X4_dropIDR_' + (it_r) + '_' + sid).attr('stroke', 'black').text(function (d) {
                                return $rootScope.storeProj.tmpItem[sid].row[it_r].val();
                            });
                            if ($rootScope.storeProj.isoElem[sid] == undefined) {
                                $rootScope.storeProj.isoElem[sid] = [];
                            }
                            if ($rootScope.storeProj.colVar[sid] == undefined) {
                                $rootScope.storeProj.colVar[sid] = [];
                            }
                            for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                                $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                    if ($rootScope.storeProj.dFldCT1C1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                        $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                        $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                    if ($rootScope.storeProj.dFldCT1C1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                        $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                    if ($rootScope.storeProj.dFldRT1R1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                        $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                        $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                    if ($rootScope.storeProj.dFldRT1R1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                        $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                    }
                                }
                                if ($('#mn_X4c_' + (it) + '_' + sid)[0] != undefined) {
                                    $('#mn_X4c_' + (it) + '_' + sid).remove();
                                }
                                if ($('#mn_X4c_' + (it) + '_' + sid)[0] == undefined) {
                                    if ((it % 2 == 0)) {
                                        d3.select('#svgID4_' + sid).append('svg').attr('id', 'mn_X4c_' + ((it)) + '_' + sid).attr('class', 'mnXc').attr('x', 14 + (7 * $rootScope.storeProj.dFldCT1C1[sid][0].descrR) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * midMax - ((28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.grVal[sid].p) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.tmpMax[it] + (112 * (it % 2)) + 'px').attr('y', 16 + parseInt(it / 2) * 34 + (34 * $rootScope.storeProj.dFldRT1R1[sid].length - 1) * parseInt(it / 2)).style('opacity', 0);
                                    }
                                    if ((it % 2 == 1)) {
                                        d3.select('#svgID4_' + sid).append('svg').attr('id', 'mn_X4c_' + ((it)) + '_' + sid).attr('class', 'mnXc').attr('x', 28 + (7 * $rootScope.storeProj.dFldCT1C1[sid][0].descrR) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.grVal[sid].p) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * midMax + (112 * (it % 2)) + 'px').attr('y', 16 + parseInt(it / 2) * 34 + (34 * $rootScope.storeProj.dFldRT1R1[sid].length - 1) * parseInt(it / 2)).style('opacity', 0);
                                    }
                                    d3.select('#mn_X4c_' + (it) + '_' + sid).moveToFront();
                                }
                                d3.select('#mn_X4c_' + (it) + '_' + sid).append('rect').attr('id', 'X4_dropIDC_' + it + '_' + sid).attr('class', 'dropCL').attr('x', 0).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('stroke-width', $rootScope.storeProj.stroke_scale).style('stroke-opacity', '0.5').style('fill-opacity', '0.5').style('fill', 'rgb(166, 166, 166)').style('zIndex', 20);
                                var chk = 0;
                                $('#X4_dropIDC_' + it + '_' + sid).one({
                                    mouseenter: function () {
                                        $(this).css('fill', 'rgb(111, 111, 166)');
                                    },
                                    mouseleave: function () {
                                        $(this).css('fill', 'rgb(166, 166, 166)');
                                    },
                                    drop: function (d) {
                                        if (chk == 0) {
                                            $rootScope.func_svgDropped(3, sid, d);
                                            $rootScope.func_iFace(3, sid);
                                            chk = 1;
                                        }
                                    }
                                });


                                d3.select('#mn_X4c_' + (it) + '_' + sid).append('rect').attr('id', 'col_X4_dropIDC_' + it + '_' + sid).attr('x', 30).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,255,0)');
                                d3.select('#col_X4_dropIDC_' + it + '_' + sid).on('click', function () {
                                    var it = this.id.split('_')[3];
                                    $rootScope.storeProj.colorCL = 1;
                                    $rootScope.func_color('col', 0, it, sid, 3, '#000000');

                                });
                                d3.select('#mn_X4c_' + (it) + '_' + sid).append('rect').attr('id', 'del_X4_dropIDC_' + it + '_' + sid).attr('x', 60).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(255,0,0)');
                                d3.select('#mn_X4c_' + (it) + '_' + sid).on('mouseover', function () {
                                    //$rootScope.action = 1;
                                    $(this).fadeTo(1, 1);

                                });
                                d3.select('#mn_X4c_' + (it) + '_' + sid).on('mouseout', function () {
                                    //$rootScope.action = 0;
                                    //$rootScope.$applyAsync();
                                    $(this).fadeTo(1, 0);

                                });
                                d3.select('#X4_dropIDC_' + (it) + '_' + sid).attr('stroke', 'black').text(function (d) {
                                    return $rootScope.storeProj.tmpItem[sid].col[it].val();
                                });
                                d3.select('#del_X4_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                        for (var it_r1 = $rootScope.storeProj.tmpItem[sid].row.length; it_r1 <= $rootScope.storeProj.tmpItem[sid].row.length * ($rootScope.storeProj.tmpItem[sid].col.length + 1); it_r1++) {
                                            d3.select('#X4_dropIDR_' + (it_r1) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.dFldCT1C1[sid].splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.tmpItem[sid].col.splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.max[sid] = [];
                                        for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                            $rootScope.storeProj.SVG_Leg[sid][it_r].splice(this.id.split('_')[3], 1);
                                            $rootScope.storeProj.SVG_Elem[sid][it_r].splice(this.id.split('_')[3], 1);
                                            $rootScope.storeProj.colVar[sid][it_r].splice(this.id.split('_')[3], 1);
                                            $rootScope.storeProj.SVG_sim[sid][it_r].splice(this.id.split('_')[3], 1);
                                        }
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                            $('#mn_X4c_' + (it) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;
                                        arrLeg = [];
                                        $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);

                                        //$rootScope.action = 0;
                                        //$rootScope.$applyAsync();
                                        $rootScope.func_Templ4(sid);

                                    }
                                );
                                d3.select('#mn_X4c_' + (it) + '_' + sid).append('rect').attr('id', 'dw_X4_dropIDC_' + it + '_' + sid).attr('x', 90).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                                d3.select('#dw_X4_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            if (it == parseInt(this.id.split('_')[3]) && $rootScope.storeProj.dFldCT1C1[sid].length > 1) {
                                                $rootScope.func_swap_dflC(it, it + 1, sid);
                                                $rootScope.func_swap_tmpItemC(it, it + 1, sid);
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Leg[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_LegC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_ElemC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.colVar[sid].length; it_r++) {
                                                    $rootScope.func_swap_colVarC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_sim[sid].length; it_r++) {
                                                    $rootScope.func_swap_simsC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.inpVal[sid].length; it_r++) {
                                                    $rootScope.func_swap_inpValC(it, it + 1, sid, it_r);
                                                }
                                            }
                                        }
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                            $('#mn_X4c_' + (it) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;

                                        $rootScope.func_Templ4(sid);
                                    }
                                );
                                d3.select('#mn_X4c_' + (it) + '_' + sid).append('rect').attr('id', 'up_X4_dropIDC_' + it + '_' + sid).attr('x', 120).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                                d3.select('#up_X4_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            if (it == parseInt(this.id.split('_')[3]) && it > 0 && $rootScope.storeProj.dFldCT1C1[sid].length > 1) {
                                                $rootScope.func_swap_dflC(it, it - 1, sid);
                                                $rootScope.func_swap_tmpItemC(it, it - 1, sid);
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Leg[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_LegC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_ElemC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.colVar[sid].length; it_r++) {
                                                    $rootScope.func_swap_colVarC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_sim[sid].length; it_r++) {
                                                    $rootScope.func_swap_simsC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.inpVal[sid].length; it_r++) {
                                                    $rootScope.func_swap_inpValC(it, it - 1, sid, it_r);
                                                }
                                            }
                                        }
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                            $('#mn_X4c_' + (it) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;
                                        arrLeg = [];
                                        $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);
                                        $rootScope.func_Templ4(sid);
                                    }
                                );
                                if ($rootScope.storeProj.isoElem[sid][it_r] == undefined) {
                                    $rootScope.storeProj.isoElem[sid][it_r] = [];
                                }
                                if ($rootScope.storeProj.isoElem[sid][it_r][it] == undefined) {
                                    $rootScope.storeProj.isoElem[sid][it_r][it] = {};
                                }
                                if ($rootScope.storeProj.colVar[sid][it_r] == undefined) {
                                    $rootScope.storeProj.colVar[sid][it_r] = [];
                                }
                                if ($rootScope.storeProj.colVar[sid][it_r][it] == undefined) {
                                    $rootScope.storeProj.colVar[sid][it_r][it] = {};
                                }
                                d3.select('#X4_dropIDR_' + ((it_r + 1) + ($rootScope.storeProj.tmpItem[sid].row.length * (it + 1))) + '_' + sid).remove();
                                if (it > 1 && it % 2 == 0) {
                                    d3.select('.T4rowDIVCL_' + sid).append('text').attr('id', 'X4_dropIDR_' + ((it_r + 1) + ($rootScope.storeProj.tmpItem[sid].row.length * (it + 1))) + '_' + sid);

                                    d3.select('#X4_dropIDR_' + ((it_r + 1) + ($rootScope.storeProj.tmpItem[sid].row.length * (it + 1))) + '_' + sid).attr('x', 22).attr('y', ((34 * ($rootScope.storeProj.tmpItem[sid].row.length * (parseInt(it / 2)))) + (48 + 34 * (parseInt(it / 2))) + (34 * (it_r + parseInt(it / 2) + 1)))).attr('font-family', 'Arial, "Helvetica Neue", Helvetica').attr('font-size', '0.9em').attr('stroke', 'black').attr('stroke-width', 0.1).text(function (d) {
                                        return $rootScope.storeProj.tmpItem[sid].row[it_r].val();
                                    });
                                }
                                for (var it_iso = 0; it_iso < $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it]); it_iso++) {
                                    if ($rootScope.storeProj.SVG_Elem[sid] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r][it] != undefined) {
                                        $rootScope.storeProj.isoElem[sid][it_r][it] = {};
                                        if (!$($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML.match('id=')) {
                                            var tempSVG = $($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML.replace('<svg ', '<svg  id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '"');
                                            $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML(tempSVG)[1];
                                        } else {
                                            if ($.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[4] == undefined) {
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[2];
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;

                                            } else {
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[4];
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;

                                            }
                                        }

                                        if (it_iso > 0 && it_iso % ($rootScope.storeProj.grVal[sid].v) == 0) {
                                            $rootScope.storeProj.grVal[sid].p += 1;
                                        }

                                        /*
                                         else {
                                         if (tmpVal == 0) {
                                         $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML('<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '" class="simCL" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28" enable-background="new 0 0 500 500" xml:space="preserve"><rect fill="#000000" stroke="#000000" x="-1" width="28" height="28"/></svg>')[2];
                                         d3.select('#c1ISOID_' + it + '_' + sid)
                                         .append('g')
                                         .attr('class', 'g1CL_' + it_r + '_' + it + '_' + sid).attr('id', function () {
                                         return 'gc1ID_' + it_r + '_' + it + '_' + it_iso + '_' + sid;
                                         })
                                         .attr('transform', function () {
                                         var x = 216 + (28 + parseInt(parseInt($rootScope.storeProj.valSc[sid]))) *it_iso + ((38 + parseInt(parseInt($rootScope.storeProj.valSc[sid])))+ 38*tmpMax[it])
                                         var y = 64 + 34 * it_r;
                                         $rootScope.storeProj.scale[sid].x = x;
                                         $rootScope.storeProj.scale[sid].y = y;
                                         return 'translate(' + x + ',' + y + ')';
                                         })
                                         .append(function () {
                                         return $rootScope.storeProj.isoElem[sid][it_r][it].iso;
                                         });

                                         }
                                         }
                                         */
                                        if ($rootScope.storeProj.colVar[sid][it_r][it] != undefined) {
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                        }
                                    }
                                    $rootScope.$apply();
                                    d3.select('#c4ISOID_' + it + '_' + sid)
                                        .append('g')
                                        .attr('class', 'g4CL_' + it_r + '_' + it + '_' + sid)
                                        .attr('transform', function () {
                                            if (it % 2 == 0) {
                                                var x = 26 + (7 * $rootScope.storeProj.dFldCT1C1[sid][0].descrR) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * midMax - ((28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.grVal[sid].p) - ((28 + parseInt($rootScope.storeProj.valSc[sid])) * it_iso) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.tmpMax[it] + (112 * (it % 2));
                                            }
                                            if (it % 2 == 1) {
                                                var x = 26 + (7 * $rootScope.storeProj.dFldCT1C1[sid][0].descrR) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.grVal[sid].p) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * it_iso) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * midMax + (112 * (it % 2));
                                            }
                                            var y = 64 + 34 * (parseInt(it / 2)) + it_r * 34;
                                            if (it > 1 && (it % 2 == 0 || it % 2 == 1)) {
                                                y = 64 + parseInt(it / 2) * 34 + it_r * 34 + (34 * $rootScope.storeProj.dFldRT1R1[sid].length - 1) * parseInt(it / 2);
                                            }
                                            $rootScope.storeProj.scale[sid].x = x;
                                            $rootScope.storeProj.scale[sid].y = y;
                                            return 'translate(' + x + ',' + y + ')';
                                        })
                                        .append(function () {
                                            return $rootScope.storeProj.isoElem[sid][it_r][it].iso;
                                        });
                                }
                                $rootScope.storeProj.grVal[sid].p = 0;
                            }
                        }

                        midMax = 0;
                        if ($rootScope.storeProj.tmpItem[sid].col.length > 0 && $rootScope.storeProj.tmpItem[sid].row.length > 0) {
                            for (var it = 0; it < $rootScope.storeProj.tmpLeg[sid].length; it++) {
                                d3.select('#svgVal_' + it + '_3_' + sid).attr('opacity', '1');
                                d3.select('#numVal_' + it + '_3_' + sid).attr('opacity', '1');
                            }
                        } else {
                            for (var it = 0; it < $rootScope.storeProj.tmpLeg[sid].length; it++) {
                                d3.select('#svgVal_' + it + '_3_' + sid).attr('opacity', '0');
                                d3.select('#numVal_' + it + '_3_' + sid).attr('opacity', '0');
                            }
                        }
                        for (var it_s = 0; it_s < $rootScope.storeProj.tmpLeg[sid].length; it_s++) {
                            $('#svgVal_' + it_s + '_3_' + sid).children().remove();

                            d3.select('#svgVal_' + it_s + '_3_' + sid).append('g').append(function () {
                                if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["4"] != undefined) {
                                    if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_3_' + sid + '"'))["1"];
                                        return tmpLeg;
                                    } else {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["4"];
                                        tmpLeg.id = 'svgLeg_' + it_s + '_3_' + sid;
                                        return tmpLeg;
                                    }
                                }
                                if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["2"] != undefined) {
                                    if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_3_' + sid + '"'))["1"];
                                        return tmpLeg;
                                    } else {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["2"];
                                        tmpLeg.id = 'svgLeg_' + it_s + '_3_' + sid;
                                        return tmpLeg;
                                    }
                                }
                                if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["1"] != undefined) {
                                    if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_3_' + sid + '"'))["1"];
                                        return tmpLeg;
                                    } else {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["1"];
                                        tmpLeg.id = 'svgLeg_' + it_s + '_3_' + sid;
                                        return tmpLeg;
                                    }
                                }

                            });
                            /*
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('path').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('path').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('path').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('circle').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('circle').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('circle').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('rect').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('rect').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('rect').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('text').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('text').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('text').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('line').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('line').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('line').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('polygon').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('polygon').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('polygon').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('pattern').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('pattern').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('pattern').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             */
                        }
                    }
                }
                if ($rootScope.storeProj.tmpCR[sid] == 1) {
                    if ($rootScope.storeProj.max[sid] == undefined) {
                        $rootScope.storeProj.max[sid] = [];
                    }
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            if ($rootScope.storeProj.tmpItem[sid].col != undefined) {
                                for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                                    if ($rootScope.storeProj.max[sid][it] == undefined) {
                                        $rootScope.storeProj.max[sid][it] = 6;
                                    }
                                }
                            }
                        }
                        $rootScope.storeProj.tmpMax = [];
                        $rootScope.storeProj.tmpMax[0] = 0;
                        $rootScope.storeProj.tmpMax[1] = 6;
                        for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                            for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                                if ($rootScope.storeProj.grVal[sid].v != 0) {
                                    if ($rootScope.storeProj.max[sid][it] < $rootScope.func_round(($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it] + ($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.grVal[sid].v) / $rootScope.storeProj.inpVal[sid][it_r][it]))) {
                                        $rootScope.storeProj.max[sid][it] = $rootScope.func_round(($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value) / $rootScope.storeProj.inpVal[sid][it_r][it] + ($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.grVal[sid].v) / $rootScope.storeProj.inpVal[sid][it_r][it]);
                                    }
                                } else {
                                    if ($rootScope.storeProj.max[sid][it] < $rootScope.func_round(($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value) / $rootScope.storeProj.inpVal[sid][it_r][it])) {
                                        $rootScope.storeProj.max[sid][it] = $rootScope.func_round(($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value) / $rootScope.storeProj.inpVal[sid][it_r][it]);
                                    }
                                }
                            }
                        }
                        for (var it = 0; it < $rootScope.storeProj.max[sid].length; it++) {
                            $rootScope.storeProj.tmpMax[it + 1] = 0;
                            for (var it1 = 0; it1 <= it; it1++) {
                                $rootScope.storeProj.tmpMax[it + 1] += $rootScope.storeProj.max[sid][it1] + $rootScope.storeProj.grVal[sid].r[it1];
                                if (it1 % 2 == 1) {
                                    $rootScope.storeProj.tmpMax[it + 1] = 0;
                                }
                            }
                        }
                        for (var it = 0; it < $rootScope.storeProj.max[sid].length; it++) {
                            if (it % 2 == 0) {
                                if (midMax < $rootScope.storeProj.max[sid][it]) {
                                    midMax = $rootScope.storeProj.max[sid][it] + $rootScope.storeProj.grVal[sid].r[it];
                                }
                            }
                        }
                    }
                    $rootScope.storeProj.grVal[sid].p = 0;
                    if ($rootScope.storeProj.tmpItem[sid].col != undefined) {
                        for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                            $('#c4ISOID_' + it + '_' + sid).children().remove();
                        }
                    }
                    for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                        $rootScope.storeProj.dFldCT1C1[sid][it].vc = parseInt($rootScope.storeProj.valSc[sid]);
                        $rootScope.storeProj.dFldCT1C1[sid][it].grv = $rootScope.storeProj.grVal[sid].v;
                        $rootScope.storeProj.dFldCT1C1[sid][it].grp = $rootScope.storeProj.grVal[sid].p;
                        $rootScope.storeProj.dFldCT1C1[sid][it].max = midMax;
                        $rootScope.storeProj.dFldCT1C1[sid][it].rlen = $rootScope.storeProj.dFldRT1R1[sid].length;
                    }
                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                        $rootScope.storeProj.dFldRT1R1[sid][it].vc = parseInt($rootScope.storeProj.valSc[sid]);
                        $rootScope.storeProj.dFldRT1R1[sid][it].grv = $rootScope.storeProj.grVal[sid].v;
                        $rootScope.storeProj.dFldRT1R1[sid][it].grp = $rootScope.storeProj.grVal[sid].p;
                        //$rootScope.storeProj.dFldRT1R1[sid][it].max = $rootScope.storeProj.max[sid][0];
                        $rootScope.storeProj.dFldRT1R1[sid][it].clen = $rootScope.storeProj.dFldCT1C1[sid].length;
                    }
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            if ($('#mn_X4r_' + (it_r) + '_' + sid)[0] != undefined) {
                                $('#mn_X4r_' + (it_r) + '_' + sid).remove();
                            }
                            if ($('#mn_X4r_' + (it_r) + '_' + sid)[0] == undefined) {
                                d3.select('#svgID4_' + sid).append('svg').attr('id', 'mn_X4r_' + ((it_r)) + '_' + sid).attr('class', 'mnXr').attr('x', 11).attr('y', 30 + 34 * (it_r + 1) + 'px').style('opacity', 0);
                                d3.select('#mn_X4r_' + (it_r) + '_' + sid).moveToFront();
                            }
                            d3.select('#mn_X4r_' + (it_r) + '_' + sid).append('rect').attr('id', 'X4_dropIDR_' + it_r + '_' + sid).attr('class', 'dropCL').attr('x', 0).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('stroke-width', $rootScope.storeProj.stroke_scale).style('stroke-opacity', '0.5').style('fill-opacity', '0.5').style('fill', 'rgb(166, 166, 166)').style('zIndex', 20);
                            var chk = 0;
                            $('#X4_dropIDR_' + it_r + '_' + sid).one({
                                mouseenter: function () {
                                    $(this).css('fill', 'rgb(111, 111, 166)');
                                },
                                mouseleave: function () {
                                    $(this).css('fill', 'rgb(166, 166, 166)');
                                },
                                drop: function (d) {
                                    if (chk == 0) {
                                        $rootScope.func_svgDropped(3, sid, d);
                                        $rootScope.func_iFace(3, sid);
                                        chk = 1;
                                    }
                                }
                            });
                            d3.select('#mn_X4r_' + (it_r) + '_' + sid).append('rect').attr('id', 'col_X4_dropIDR_' + it_r + '_' + sid).attr('x', 30).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,255,0)');
                            d3.select('#col_X4_dropIDR_' + it_r + '_' + sid).on('click', function () {
                                var it = this.id.split('_')[3];
                                $rootScope.storeProj.colorCL = 1;
                                $rootScope.func_color('row', it, 0, sid, 3, '#000000');
                            });
                            d3.select('#mn_X4r_' + (it_r) + '_' + sid).append('rect').attr('id', 'del_X4_dropIDR_' + it_r + '_' + sid).attr('x', 60).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(255,0,0)');
                            d3.select('#mn_X4r_' + (it_r) + '_' + sid).on('mouseover', function () {
                                //$rootScope.action = 1;
                                $(this).fadeTo(1, 1);

                            });
                            d3.select('#mn_X4r_' + (it_r) + '_' + sid).on('mouseout', function () {
                                //$rootScope.action = 0;
                                //$rootScope.$applyAsync();

                                $(this).fadeTo(1, 0);

                            });
                            d3.select('#del_X4_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it_r1 = $rootScope.storeProj.tmpItem[sid].row.length; it_r1 <= $rootScope.storeProj.tmpItem[sid].row.length * ($rootScope.storeProj.tmpItem[sid].col.length + 1); it_r1++) {
                                        if (it_r1 == $rootScope.storeProj.tmpItem[sid].row.length) {
                                            d3.select('#X4_dropIDR_' + (it_r1) + '_' + sid).property('value', '');
                                        } else {
                                            d3.select('#X4_dropIDR_' + (it_r1) + '_' + sid).remove();
                                        }
                                    }

                                    $rootScope.storeProj.dFldRT1R1[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.tmpItem[sid].row.splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_Leg[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_Elem[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.colVar[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.SVG_sim[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.max[sid] = [];
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X4r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;
                                    arrLeg = [];
                                    $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);

                                    //$rootScope.action = 0;
                                    //$rootScope.$applyAsync();
                                    $rootScope.func_Templ4(sid);


                                }
                            );
                            d3.select('#mn_X4r_' + (it_r) + '_' + sid).append('rect').attr('id', 'up_X4_dropIDR_' + it_r + '_' + sid).attr('x', 90).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#up_X4_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it_r = 0; it_r < $rootScope.storeProj.dFldRT1R1[sid].length; it_r++) {
                                        if (it_r === parseInt(this.id.split('_')[3]) && it_r > 0 && $rootScope.storeProj.dFldRT1R1[sid].length > 1) {
                                            $rootScope.func_swap_dflR(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_tmpItem(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_SVG_Leg(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_SVG_Elem(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_colVar(it_r, it_r - 1, sid);
                                            $rootScope.func_swap_sims(it_r, it_r - 1, sid);
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X4r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;

                                    $rootScope.func_Templ4(sid);
                                }
                            );
                            d3.select('#mn_X4r_' + (it_r) + '_' + sid).append('rect').attr('id', 'dw_X4_dropIDR_' + it_r + '_' + sid).attr('x', 120).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                            d3.select('#dw_X4_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                    for (var it_r = 0; it_r < $rootScope.storeProj.dFldRT1R1[sid].length; it_r++) {
                                        if (it_r == parseInt(this.id.split('_')[3]) && it_r < ($rootScope.storeProj.dFldRT1R1[sid].length - 2) && $rootScope.storeProj.dFldRT1R1[sid].length > 1) {
                                            $rootScope.func_swap_dflR(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_tmpItem(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_SVG_Leg(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_SVG_Elem(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_colVar(it_r, it_r + 1, sid);
                                            $rootScope.func_swap_sims(it_r, it_r + 1, sid);
                                        }
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                        $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                        $('#mn_X4r_' + (it) + '_' + sid).remove();
                                    }
                                    $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;

                                    $rootScope.func_Templ4(sid);
                                }
                            );
                            d3.select('#X4_dropIDR_' + (it_r) + '_' + sid).attr('stroke', 'black').text(function (d) {
                                return $rootScope.storeProj.tmpItem[sid].row[it_r].val();
                            });
                            if ($rootScope.storeProj.isoElem[sid] == undefined) {
                                $rootScope.storeProj.isoElem[sid] = [];
                            }
                            if ($rootScope.storeProj.colVar[sid] == undefined) {
                                $rootScope.storeProj.colVar[sid] = [];
                            }
                            for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                                $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                    if ($rootScope.storeProj.dFldCT1C1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                        $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                        $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                    if ($rootScope.storeProj.dFldCT1C1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                        $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                    if ($rootScope.storeProj.dFldRT1R1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                        $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                        $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                    }
                                }
                                $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[it].val().length;
                                for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                    if ($rootScope.storeProj.dFldRT1R1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                        $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                    }
                                }
                                if ($('#mn_X4c_' + (it) + '_' + sid)[0] != undefined) {
                                    $('#mn_X4c_' + (it) + '_' + sid).remove();
                                }
                                if ($('#mn_X4c_' + (it) + '_' + sid)[0] == undefined) {
                                    if ((it % 2 == 0)) {
                                        d3.select('#svgID4_' + sid).append('svg').attr('id', 'mn_X4c_' + ((it)) + '_' + sid).attr('class', 'mnXc').attr('x', 14 + (7 * $rootScope.storeProj.dFldCT1C1[sid][0].descrR) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * midMax - ((28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.grVal[sid].p) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.tmpMax[it] + (112 * (it % 2)) + 'px').attr('y', 16 + parseInt(it / 2) * 34 + (34 * $rootScope.storeProj.dFldRT1R1[sid].length - 1) * parseInt(it / 2)).style('opacity', 0);
                                    }
                                    if ((it % 2 == 1)) {
                                        d3.select('#svgID4_' + sid).append('svg').attr('id', 'mn_X4c_' + ((it)) + '_' + sid).attr('class', 'mnXc').attr('x', 28 + (7 * $rootScope.storeProj.dFldCT1C1[sid][0].descrR) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.grVal[sid].p) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * midMax + (112 * (it % 2)) + 'px').attr('y', 16 + parseInt(it / 2) * 34 + (34 * $rootScope.storeProj.dFldRT1R1[sid].length - 1) * parseInt(it / 2)).style('opacity', 0);
                                    }
                                    d3.select('#mn_X4c_' + (it) + '_' + sid).moveToFront();
                                }
                                d3.select('#mn_X4c_' + (it) + '_' + sid).append('rect').attr('id', 'X4_dropIDC_' + it + '_' + sid).attr('class', 'dropCL').attr('x', 0).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('stroke-width', $rootScope.storeProj.stroke_scale).style('stroke-opacity', '0.5').style('fill-opacity', '0.5').style('fill', 'rgb(166, 166, 166)').style('zIndex', 20);
                                var chk = 0;
                                $('#X4_dropIDC_' + it + '_' + sid).one({
                                    mouseenter: function () {
                                        $(this).css('fill', 'rgb(111, 111, 166)');
                                    },
                                    mouseleave: function () {
                                        $(this).css('fill', 'rgb(166, 166, 166)');
                                    },
                                    drop: function (d) {
                                        if (chk == 0) {
                                            $rootScope.func_svgDropped(3, sid, d);
                                            $rootScope.func_iFace(3, sid);
                                            chk = 1;
                                        }
                                    }
                                });


                                d3.select('#mn_X4c_' + (it) + '_' + sid).append('rect').attr('id', 'col_X4_dropIDC_' + it + '_' + sid).attr('x', 30).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,255,0)');
                                d3.select('#col_X4_dropIDC_' + it + '_' + sid).on('click', function () {
                                    var it = this.id.split('_')[3];
                                    $rootScope.storeProj.colorCL = 1;
                                    $rootScope.func_color('col', 0, it, sid, 3, '#000000');

                                });
                                d3.select('#mn_X4c_' + (it) + '_' + sid).append('rect').attr('id', 'del_X4_dropIDC_' + it + '_' + sid).attr('x', 60).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(255,0,0)');
                                d3.select('#mn_X4c_' + (it) + '_' + sid).on('mouseover', function () {
                                    //$rootScope.action = 1;
                                    $(this).fadeTo(1, 1);

                                });
                                d3.select('#mn_X4c_' + (it) + '_' + sid).on('mouseout', function () {
                                    //$rootScope.action = 0;
                                    //$rootScope.$applyAsync();
                                    $(this).fadeTo(1, 0);

                                });
                                d3.select('#X4_dropIDC_' + (it) + '_' + sid).attr('stroke', 'black').text(function (d) {
                                    return $rootScope.storeProj.tmpItem[sid].col[it].val();
                                });
                                d3.select('#del_X4_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                        for (var it_r1 = $rootScope.storeProj.tmpItem[sid].row.length; it_r1 <= $rootScope.storeProj.tmpItem[sid].row.length * ($rootScope.storeProj.tmpItem[sid].col.length + 1); it_r1++) {
                                            d3.select('#X4_dropIDR_' + (it_r1) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.dFldCT1C1[sid].splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.tmpItem[sid].col.splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.max[sid] = [];
                                        for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                            $rootScope.storeProj.SVG_Leg[sid][it_r].splice(this.id.split('_')[3], 1);
                                            $rootScope.storeProj.SVG_Elem[sid][it_r].splice(this.id.split('_')[3], 1);
                                            $rootScope.storeProj.colVar[sid][it_r].splice(this.id.split('_')[3], 1);
                                            $rootScope.storeProj.SVG_sim[sid][it_r].splice(this.id.split('_')[3], 1);
                                        }
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                            $('#mn_X4c_' + (it) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;
                                        arrLeg = [];
                                        $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);
                                        //$rootScope.action = 0;
                                        //$rootScope.$applyAsync();
                                        $rootScope.func_Templ4(sid);

                                    }
                                );
                                d3.select('#mn_X4c_' + (it) + '_' + sid).append('rect').attr('id', 'dw_X4_dropIDC_' + it + '_' + sid).attr('x', 120).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                                d3.select('#dw_X4_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            if (it == parseInt(this.id.split('_')[3]) && $rootScope.storeProj.dFldCT1C1[sid].length > 1) {
                                                $rootScope.func_swap_dflC(it, it + 1, sid);
                                                $rootScope.func_swap_tmpItemC(it, it + 1, sid);
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Leg[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_LegC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_ElemC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.colVar[sid].length; it_r++) {
                                                    $rootScope.func_swap_colVarC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_sim[sid].length; it_r++) {
                                                    $rootScope.func_swap_simsC(it, it + 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.inpVal[sid].length; it_r++) {
                                                    $rootScope.func_swap_inpValC(it, it + 1, sid, it_r);
                                                }
                                            }
                                        }
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                            $('#mn_X4c_' + (it) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;

                                        $rootScope.func_Templ4(sid);
                                    }
                                );
                                d3.select('#mn_X4c_' + (it) + '_' + sid).append('rect').attr('id', 'up_X4_dropIDC_' + it + '_' + sid).attr('x', 90).attr('y', $rootScope.storeProj.yPosLine[sid]).attr('width', '30px').attr('height', '30px').style('fill', 'rgb(0,0,255)');
                                d3.select('#up_X4_dropIDC_' + (it) + '_' + sid).on('click', function () {
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            if (it == parseInt(this.id.split('_')[3]) && it > 0 && $rootScope.storeProj.dFldCT1C1[sid].length > 1) {
                                                $rootScope.func_swap_dflC(it, it - 1, sid);
                                                $rootScope.func_swap_tmpItemC(it, it - 1, sid);
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Leg[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_LegC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                                    $rootScope.func_swap_SVG_ElemC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.colVar[sid].length; it_r++) {
                                                    $rootScope.func_swap_colVarC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.SVG_sim[sid].length; it_r++) {
                                                    $rootScope.func_swap_simsC(it, it - 1, sid, it_r);
                                                }
                                                for (var it_r = 0; it_r < $rootScope.storeProj.inpVal[sid].length; it_r++) {
                                                    $rootScope.func_swap_inpValC(it, it - 1, sid, it_r);
                                                }
                                            }
                                        }
                                        for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                            $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                            $('#mn_X4c_' + (it) + '_' + sid).remove();
                                        }
                                        $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;

                                        $rootScope.func_Templ4(sid);
                                    }
                                );
                                if ($rootScope.storeProj.isoElem[sid][it_r] == undefined) {
                                    $rootScope.storeProj.isoElem[sid][it_r] = [];
                                }
                                if ($rootScope.storeProj.isoElem[sid][it_r][it] == undefined) {
                                    $rootScope.storeProj.isoElem[sid][it_r][it] = {};
                                }
                                if ($rootScope.storeProj.colVar[sid][it_r] == undefined) {
                                    $rootScope.storeProj.colVar[sid][it_r] = [];
                                }
                                if ($rootScope.storeProj.colVar[sid][it_r][it] == undefined) {
                                    $rootScope.storeProj.colVar[sid][it_r][it] = {};
                                }
                                d3.select('#X4_dropIDR_' + ((it_r + 1) + ($rootScope.storeProj.tmpItem[sid].row.length * (it + 1))) + '_' + sid).remove();
                                if (it > 1 && it % 2 == 0) {
                                    d3.select('.T4rowDIVCL_' + sid).append('text').attr('id', 'X4_dropIDR_' + ((it_r + 1) + ($rootScope.storeProj.tmpItem[sid].row.length * (it + 1))) + '_' + sid);

                                    d3.select('#X4_dropIDR_' + ((it_r + 1) + ($rootScope.storeProj.tmpItem[sid].row.length * (it + 1))) + '_' + sid).attr('x', 22).attr('y', ((34 * ($rootScope.storeProj.tmpItem[sid].row.length * (parseInt(it / 2)))) + (48 + 34 * (parseInt(it / 2))) + (34 * (it_r + parseInt(it / 2) + 1)))).attr('font-family', 'Arial, "Helvetica Neue", Helvetica').attr('font-size', '0.9em').attr('stroke', 'black').attr('stroke-width', 0.1).text(function (d) {
                                        return $rootScope.storeProj.tmpItem[sid].row[it_r].val();
                                    });
                                }
                                for (var it_iso = 0; it_iso < $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it]); it_iso++) {
                                    if ($rootScope.storeProj.SVG_Elem[sid] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r][it] != undefined) {
                                        $rootScope.storeProj.isoElem[sid][it_r][it] = {};
                                        if (!$($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML.match('id=')) {
                                            var tempSVG = $($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML.replace('<svg ', '<svg  id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '"');
                                            $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML(tempSVG)[1];
                                        } else {
                                            if ($.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[4] == undefined) {
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[2];
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;

                                            } else {
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][it][0])[0].innerHTML)[4];
                                                $rootScope.storeProj.isoElem[sid][it_r][it].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;

                                            }
                                        }

                                        if (it_iso > 0 && it_iso % ($rootScope.storeProj.grVal[sid].v) == 0) {
                                            $rootScope.storeProj.grVal[sid].p += 1;
                                        }

                                        /*
                                         else {
                                         if (tmpVal == 0) {
                                         $rootScope.storeProj.isoElem[sid][it_r][it].iso = $.parseHTML('<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '" class="simCL" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28" enable-background="new 0 0 500 500" xml:space="preserve"><rect fill="#000000" stroke="#000000" x="-1" width="28" height="28"/></svg>')[2];
                                         d3.select('#c1ISOID_' + it + '_' + sid)
                                         .append('g')
                                         .attr('class', 'g1CL_' + it_r + '_' + it + '_' + sid).attr('id', function () {
                                         return 'gc1ID_' + it_r + '_' + it + '_' + it_iso + '_' + sid;
                                         })
                                         .attr('transform', function () {
                                         var x = 216 + (28 + parseInt(parseInt($rootScope.storeProj.valSc[sid]))) *it_iso + ((38 + parseInt(parseInt($rootScope.storeProj.valSc[sid])))+ 38*tmpMax[it])
                                         var y = 64 + 34 * it_r;
                                         $rootScope.storeProj.scale[sid].x = x;
                                         $rootScope.storeProj.scale[sid].y = y;
                                         return 'translate(' + x + ',' + y + ')';
                                         })
                                         .append(function () {
                                         return $rootScope.storeProj.isoElem[sid][it_r][it].iso;
                                         });

                                         }
                                         }
                                         */

                                        if ($rootScope.storeProj.colVar[sid][it_r][it] != undefined) {
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('path').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('circle').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('rect').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('text').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('line').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('polygon').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').css('stroke-width', 0).css('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).css('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][it].iso).find('pattern').attr('stroke-width', 0).attr('stroke', $rootScope.storeProj.colVar[sid][it_r][it]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][it]);
                                            }
                                        }
                                    }
                                    $rootScope.$apply();
                                    d3.select('#c4ISOID_' + it + '_' + sid)
                                        .append('g')
                                        .attr('class', 'g4CL_' + it_r + '_' + it + '_' + sid)
                                        .attr('transform', function () {
                                            if (it % 2 == 0) {
                                                var x = 26 + (7 * $rootScope.storeProj.dFldCT1C1[sid][0].descrR) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * midMax - ((28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.grVal[sid].p) - ((28 + parseInt($rootScope.storeProj.valSc[sid])) * it_iso) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.tmpMax[it] + (112 * (it % 2));
                                            }
                                            if (it % 2 == 1) {
                                                var x = 26 + (7 * $rootScope.storeProj.dFldCT1C1[sid][0].descrR) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * $rootScope.storeProj.grVal[sid].p) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * it_iso) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * midMax + (112 * (it % 2));
                                            }
                                            var y = 64 + 34 * (parseInt(it / 2)) + it_r * 34;
                                            if (it > 1 && (it % 2 == 0 || it % 2 == 1)) {
                                                y = 64 + parseInt(it / 2) * 34 + it_r * 34 + (34 * $rootScope.storeProj.dFldRT1R1[sid].length - 1) * parseInt(it / 2);
                                            }
                                            $rootScope.storeProj.scale[sid].x = x;
                                            $rootScope.storeProj.scale[sid].y = y;
                                            return 'translate(' + x + ',' + y + ')';
                                        })
                                        .append(function () {
                                            return $rootScope.storeProj.isoElem[sid][it_r][it].iso;
                                        });
                                }
                                $rootScope.storeProj.grVal[sid].p = 0;
                            }
                        }

                        midMax = 0;
                        if ($rootScope.storeProj.tmpItem[sid].col.length > 0 && $rootScope.storeProj.tmpItem[sid].row.length > 0) {
                            for (var it = 0; it < $rootScope.storeProj.tmpLeg[sid].length; it++) {
                                d3.select('#svgVal_' + it + '_3_' + sid).attr('opacity', '1');
                                d3.select('#numVal_' + it + '_3_' + sid).attr('opacity', '1');
                            }
                        } else {
                            for (var it = 0; it < $rootScope.storeProj.tmpLeg[sid].length; it++) {
                                d3.select('#svgVal_' + it + '_3_' + sid).attr('opacity', '0');
                                d3.select('#numVal_' + it + '_3_' + sid).attr('opacity', '0');
                            }
                        }
                        for (var it_s = 0; it_s < $rootScope.storeProj.tmpLeg[sid].length; it_s++) {
                            $('#svgVal_' + it_s + '_3_' + sid).children().remove();

                            d3.select('#svgVal_' + it_s + '_3_' + sid).append('g').append(function () {
                                if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["4"] != undefined) {
                                    if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_3_' + sid + '"'))["1"];
                                        return tmpLeg;
                                    } else {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["4"];
                                        tmpLeg.id = 'svgLeg_' + it_s + '_3_' + sid;
                                        return tmpLeg;
                                    }
                                }
                                if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["2"] != undefined) {
                                    if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_3_' + sid + '"'))["1"];
                                        return tmpLeg;
                                    } else {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["2"];
                                        tmpLeg.id = 'svgLeg_' + it_s + '_3_' + sid;
                                        return tmpLeg;
                                    }
                                }
                                if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["1"] != undefined) {
                                    if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_3_' + sid + '"'))["1"];
                                        return tmpLeg;
                                    } else {
                                        var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["1"];
                                        tmpLeg.id = 'svgLeg_' + it_s + '_3_' + sid;
                                        return tmpLeg;
                                    }
                                }

                            });
                            /*
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('path').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('path').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('path').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('circle').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('circle').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('circle').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('rect').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('rect').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('rect').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('text').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('text').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('text').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('line').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('line').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('line').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('polygon').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('polygon').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('polygon').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             if ($('#svgLeg_' + it_s + '_0_' + sid).find('pattern').length > 0) {
                             $('#svgLeg_' + it_s + '_0_' + sid).find('pattern').css('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).css('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             $('#svgLeg_' + it_s + '_0_' + sid).find('pattern').attr('stroke', $rootScope.storeProj.tmpLeg[sid][it_s].color).attr('fill', $rootScope.storeProj.tmpLeg[sid][it_s].color);
                             }
                             */
                        }
                    }
                }
                //DOM has finished rendering
            }, 0, false);
        };
        $rootScope.func_Templ5 = function (sid) {

            $timeout(function () {
                func_dCol();
                $rootScope.storeProj.colors[sid] = ["#5b9254", "#e64639", "#1a4e53", "#d99a00", "#cccccc", "#000000"];
                $('.descrCL').css('outline', '0');
                $('.descrCL').css('outline-offset', '-2px');

                $('#tmplID_0_' + sid).css('outline', '5px auto -webkit-focus-ring-color');
                $('#tmplID_0_' + sid).css('outline-offset', '-2px');

                $('.templCL').css('outline', '0');
                $('.templCL').css('outline-offset', '-2px');

                $('#Templ1_' + sid).css('outline', '5px auto -webkit-focus-ring-color');
                $('#Templ1_' + sid).css('outline-offset', '-2px');
                $rootScope.storeProj.max[sid] = [];
                $rootScope.storeProj.max3[sid] = [];




                if ($rootScope.storeProj.inpVal[sid] == undefined) {
                    $rootScope.storeProj.inpVal[sid] = [];
                }
                if ($rootScope.storeProj.tmpItem[sid] != undefined && $rootScope.storeProj.tmpItem[sid].row != undefined) {
                    for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].row.length; it++) {
                        if ($rootScope.storeProj.inpVal[sid][it] == undefined) {
                            $rootScope.storeProj.inpVal[sid][it] = [];
                        }
                        if ($rootScope.storeProj.SVG_Leg[sid][it] != undefined) {
                            for (var it_1 = 0; it_1 < $rootScope.storeProj.tmpItem[sid].col.length; it_1++) {
                                if ($rootScope.storeProj.inpVal[sid][it][it_1] == undefined) {
                                    if ($rootScope.storeProj.SVG_Leg[sid][it][it_1] != undefined) {
                                        $rootScope.storeProj.inpVal[sid][it][it_1] = $rootScope.storeProj.SVG_Leg[sid][it][it_1].valt;
                                    } else {
                                        $rootScope.storeProj.inpVal[sid][it][it_1] = 1;
                                    }
                                }
                            }
                        }
                    }
                }
                $rootScope.func_maxValue(sid);
                d3.selection.prototype.moveToFront = function () {
                    return this.each(function () {
                        this.parentNode.appendChild(this);
                    });
                };
                d3.selection.prototype.moveToBack = function () {
                    return this.each(function () {
                        var firstChild = this.parentNode.firstChild;
                        if (firstChild) {
                            this.parentNode.insertBefore(this, firstChild);
                        }
                    });
                };
                $rootScope.storeProj.tmpID = 4;
                slides[sid].tmp = 4;
                $rootScope.$apply();

                if ($rootScope.storeProj.tmpCR[sid] != undefined) {
                    $("#toolbox_" + sid).width(300);
                    //wenn Maximalzahl in einer Kolumne undefiniert dann wird sie leer definiert
                    if ($rootScope.storeProj.max[sid] == undefined) {
                        $rootScope.storeProj.max[sid] = [];
                    }
                    // wenn die bereits gedroppten Zeilen definiert sind
                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        //dann geh die Zeilen durch
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            //wenn eine spalte definiert sind
                            if ($rootScope.storeProj.tmpItem[sid].col != undefined) {
                                //Dann geh die spalte durch
                                for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                                    //wenn max in ner spalte undefiniert ist dann setze 6
                                    if ($rootScope.storeProj.max[sid][it] == undefined) {
                                        $rootScope.storeProj.max[sid][it] = 6;
                                    }
                                }
                            }
                        }
                        var tmpMax = [];
                        tmpMax[0] = 0;
                        tmpMax[1] = 6;
                        //Dann geh die Spalten durch die schon gedroppt werden
                        for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                            //Dan geh die Zeilen durch die schon gedroppt wurden
                            for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                                //es ist so das tmpItems id ist so aufgebaut id_row_col
                                //als erster nimmt man die Zeile und dann sie Spalte
                                // wenn max an der Spaltenstelle kleiner ist als das alles gerundet und  dividiert durch nen komischen wert dann setzt sie gleich
                                if ($rootScope.storeProj.max[sid][it] < $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it])) {
                                    $rootScope.storeProj.max[sid][it] = $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it]);
                                }
                                // wenn Gruppierung von v auf 5 ist wird spaltenposition auf das vorherige gesetzt
                                if ($rootScope.storeProj.grVal[sid].v == 5) {
                                    $rootScope.storeProj.grVal[sid].r[it] = $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it]) / $rootScope.storeProj.grVal[sid].v;
                                }
                                // wenn Gruppierung von v auf 10 ist wird spaltenposition auf das vorherige gesetzt
                                if ($rootScope.storeProj.grVal[sid].v == 10) {
                                    $rootScope.storeProj.grVal[sid].r[it] = $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[it][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][it]) / $rootScope.storeProj.grVal[sid].v;
                                }
                                // wenn v auf 0 ist wird spaltenposition auf 0 gesetzt
                                if ($rootScope.storeProj.grVal[sid].v == 0) {
                                    $rootScope.storeProj.grVal[sid].r[it] = 0;
                                }
                            }
                        }
                        //geht max durch setzt den tmpMax bo auf den 0 auf 0
                        for (var it = 0; it < $rootScope.storeProj.max[sid].length; it++) {
                            tmpMax[it + 1] = 0;
                            // dann geht er nochmal alle durch und summiert max werte + den grValr Werten
                            for (var it1 = 0; it1 <= it; it1++) {
                                tmpMax[it + 1] += $rootScope.storeProj.max[sid][it1] + $rootScope.storeProj.grVal[sid].r[it1];
                            }
                        }
                    }
                    //setzt grVal Position auf 0
                    $rootScope.storeProj.grVal[sid].p = 0;
                    //geht die gedragten Spalten durch und übergibt werte
                    for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                        $rootScope.storeProj.dFldCT1C1[sid][it].vc = parseInt($rootScope.storeProj.valSc[sid]);
                        $rootScope.storeProj.dFldCT1C1[sid][it].grv = $rootScope.storeProj.grVal[sid].v;
                        $rootScope.storeProj.dFldCT1C1[sid][it].grp = $rootScope.storeProj.grVal[sid].p;
                        $rootScope.storeProj.dFldCT1C1[sid][it].max = tmpMax[it];
                        $rootScope.storeProj.dFldCT1C1[sid][it].rlen = $rootScope.storeProj.dFldRT1R1[sid].length;
                    }
                    //geht die gedragten Reihen durch und übergibt werte
                    for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                        $rootScope.storeProj.dFldRT1R1[sid][it].vc = parseInt($rootScope.storeProj.valSc[sid]);
                        $rootScope.storeProj.dFldRT1R1[sid][it].grv = $rootScope.storeProj.grVal[sid].v;
                        $rootScope.storeProj.dFldRT1R1[sid][it].grp = $rootScope.storeProj.grVal[sid].p;
                        //$rootScope.storeProj.dFldRT1R1[sid][it].max = $rootScope.storeProj.max[sid][0];
                        $rootScope.storeProj.dFldRT1R1[sid][it].clen = $rootScope.storeProj.dFldCT1C1[sid].length;

                    }

                    if ($rootScope.storeProj.tmpItem[sid].row != undefined) {
                        for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                            //Ab hier gehts ums Menü
                            //wenn mn_x1r_Zeilenanzahl definiert ist dann lösche es
                            if ($('#mn_X5r_' + (it_r) + '_' + sid)[0] != undefined) {
                                $('#mn_X5r_' + (it_r) + '_' + sid).remove();
                            }
                            //wenn es nicht definiert ist dann nimm das svg und mach daraus ein löschen und farbcoder menü für die Zeilen
                            if ($('#mn_X5r_' + (it_r) + '_' + sid)[0] == undefined) {
                                d3.select("#svgID5_" + sid).append('svg').attr('id', 'mn_X5r_' + ((it_r)) + '_' + sid).attr('class', 'mnXr').attr('x', 11).attr('y', 30 + 34 * (it_r + 1) + 'px').style('opacity', 0);
                                d3.select('#mn_X5r_' + (it_r) + '_' + sid).moveToFront();
                            }
                            //dem menü werden einige css sachen übergeben
                            d3.select('#mn_X5r_' + (it_r) + '_' + sid).append('rect').attr('id', 'X5_dropIDR_' + it_r + '_' + sid).attr('class', 'dropCL').attr('x', 0).attr('y', 0).attr('width', '110px').attr('height', '28px').style('stroke-width', '1').style('stroke-opacity', '0.5').style('fill-opacity', '0.5').style('fill', 'rgb(166, 166, 166)').style('zIndex', 20);
                            //dann zu den events gelistet mit farbe herumgesielt
                            var chk = 0;
                            $('#X5_dropIDR_' + it_r + '_' + sid).bind({
                                mouseenter: function () {
                                    $(this).css('fill', 'rgb(111, 111, 166)');
                                },
                                mouseleave: function () {
                                    $(this).css('fill', 'rgb(166, 166, 166)');
                                },
                                drop: function (d) {
                                    if (chk == 0) {
                                        $rootScope.func_svgDropped(4, sid, d);
                                        $rootScope.func_iFace(4, sid);
                                        chk = 1;
                                    }
                                }
                            });
                            //wenn er darein dropt dann soll ne funktion aufgerufen werden
                            $('#X5_dropIDR_' + it_r + '_' + sid).on('drop', function (d, i) {
                                return $rootScope.func_svgDropped(4, sid, d);
                            });
                            //colorpickerknopf wird erstellt
                            d3.select('#mn_X5r_' + (it_r) + '_' + sid).append('rect').attr('id', 'col_X5_dropIDR_' + it_r + '_' + sid).attr('x', 110).attr('y', 0).attr('width', '28px').attr('height', '28px').style('fill', 'rgb(0,255,0)');
                            //colorpicer wird zugewiesen
                            d3.select('#col_X5_dropIDR_' + it_r + '_' + sid).on('click', function () {
                                var it = this.id.split('_')[3];
                                $rootScope.func_color('row', it, 0, sid, 4, '#000000');
                            });
                            //löschnknopf wird erstellt
                            d3.select('#mn_X5r_' + (it_r) + '_' + sid).append('rect').attr('id', 'del_X5_dropIDR_' + it_r + '_' + sid).attr('x', 138).attr('y', 0).attr('width', '28px').attr('height', '28px').style('fill', 'rgb(255,0,0)');
                            //verschwindet wenn nicht maus darüber
                            $('#mn_X5r_' + (it_r) + '_' + sid).hover(function () {
                                $(this).fadeTo(1, 1);
                            }, function () {
                                $(this).fadeTo(1, 0);
                            });
                            //löschen wird darin enabled löscht das gante aus dem array
                            d3.select('#del_X5_dropIDR_' + (it_r) + '_' + sid).on('click', function () {
                                $rootScope.storeProj.dFldRT1R1[sid].splice(this.id.split('_')[3], 1);
                                $rootScope.storeProj.tmpItem[sid].row.splice(this.id.split('_')[3], 1);
                                $rootScope.storeProj.SVG_Leg[sid].splice(this.id.split('_')[3], 1);
                                $rootScope.storeProj.SVG_Elem[sid].splice(this.id.split('_')[3], 1);
                                $rootScope.storeProj.colVar[sid].splice(this.id.split('_')[3], 1);
                                $rootScope.storeProj.max[sid] = [];
                                //löscht das menü
                                for (var it = 0; it < $rootScope.storeProj.dFldRT1R1[sid].length; it++) {
                                    $rootScope.storeProj.dFldRT1R1[sid][it].idR = it;
                                    $('#mn_X5r_' + (it) + '_' + sid).remove();
                                }
                                //rendert alles nochmal neu
                                $rootScope.storeProj.ctrDrT1R1[sid] = $rootScope.storeProj.dFldRT1R1[sid].length;
                                $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);

                                if ($rootScope.storeProj.dFldRT1R1[sid].length == 1) {
                                    // $rootScope.storeProj.dFldCT1C1[sid].splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.dFldCT1C1[sid] = [$rootScope.storeProj.dFldCT1C1[sid][0]];
                                    // $rootScope.storeProj.tmpItem[sid].col.splice(this.id.split('_')[3], 1);
                                    $rootScope.storeProj.tmpItem[sid].col = [];
                                    $('#c5ISOID_0_' + sid).children().remove();
                                    $rootScope.storeProj.max[sid] = [];
                                    for (var it_r = 0; it_r < $rootScope.storeProj.SVG_Elem[sid].length; it_r++) {
                                        $rootScope.storeProj.SVG_Leg[sid][it_r].splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.SVG_Elem[sid][it_r].splice(this.id.split('_')[3], 1);
                                        $rootScope.storeProj.colVar[sid][it_r].splice(this.id.split('_')[3], 1);
                                    }
                                    for (var it = 0; it < $rootScope.storeProj.dFldCT1C1[sid].length; it++) {
                                        $rootScope.storeProj.dFldCT1C1[sid][it].idC = it;
                                        $('#mn_X1c_' + (it) + '_' + sid).remove();
                                    }
                                    $(".shorttooltip").remove();
                                    $rootScope.storeProj.ctrDcT1C1[sid] = $rootScope.storeProj.dFldCT1C1[sid].length;
                                    $rootScope.storeProj.tmpLeg[sid] = $rootScope.func_chkLeg(sid);
                                }
                                $rootScope.storeProj.$apply();
                                $(".region").css({"fill-opacity": "", "fill": ""});
                                $rootScope.func_Templ5(sid);
                            });
                            //gibt den text des gedrioppten in das menü ////HIEEEEEEEEEEEEERRRRRRR
                            d3.select('#X5_dropIDR_' + (it_r) + '_' + sid).attr('stroke', 'black').text(function (d) {
                                return $rootScope.storeProj.tmpItem[sid].row[it_r].val();
                            });
                            d3.select("#Row_dropIDR_" + (it_r) + '_' + sid).attr('stroke', 'black').text(function () {
                                return $rootScope.storeProj.tmpItem[sid].row[it_r].val();
                            });


                            //wenn undefiniert bei slide dann neu definieren
                            if ($rootScope.storeProj.isoElem[sid] == undefined) {
                                $rootScope.storeProj.isoElem[sid] = [];
                            }
                            //wenn colVar bei slide undefiniert dann neu definieren
                            if ($rootScope.storeProj.colVar[sid] == undefined) {
                                $rootScope.storeProj.colVar[sid] = [];
                            }

                            $rootScope.storeProj.tmpItem[sid].col = [];
                            var retval = [];
                            $(".Plans_" + sid + " .region").each(function () {
                                retval.push($(this).attr('id'))
                            });
                            //console.log(retval);
                            $(".Plans_" + sid + " .region").css({"fill-opacity": 0.5, "fill": "black"});
                            var count = 0;
                            //$rootScope.tmpItem[sid].col = [];
                            $(".shorttooltip").remove();
                            if ($rootScope.storeProj.tmpCR[sid] == 0) {
                                table : for (var los = 0; los < $rootScope.storeProj.items[0].length; los++) {
                                    for (var set = 0; set < $rootScope.storeProj.cardcontroll[sid].set.length; set++) {
                                        if ("id_0_" + los == $rootScope.storeProj.cardcontroll[sid].set[set].ref.replace("#", "")) {
                                            var country = $("#id_0_" + los);

                                            $rootScope.storeProj.tmpItem[sid].col[count] = country;

                                            for (var m = 0; m < $rootScope.storeProj.tmpItem[sid].row.length; m++) {
                                                if ($rootScope.storeProj.SVG_Elem[sid][m] == undefined) {
                                                    $rootScope.storeProj.SVG_Elem[sid][m] = [];
                                                    $rootScope.storeProj.SVG_sim[sid][m] = [];
                                                    $rootScope.storeProj.SVG_Leg[sid][m] = [];
                                                }
                                            }

                                            if($rootScope.storeProj.SVG_Elem[sid][it_r][count] == undefined) {
                                                $rootScope.func_initDropped(4, sid, "T5_dropIDC_" + count + "_" + sid);
                                            }

                                            $rootScope.func_maxValue(sid);

                                            $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[count].val().length;
                                            $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[count].val().length;
                                            for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                                if ($rootScope.storeProj.dFldCT1C1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                                    $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                                    $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                                }
                                            }
                                            $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                            for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                                if ($rootScope.storeProj.dFldCT1C1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                                    $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                                }
                                            }
                                            $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                            $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                            for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                                if ($rootScope.storeProj.dFldRT1R1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                                    $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                                    $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                                }
                                            }
                                            $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[count].val().length;
                                            for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                                if ($rootScope.storeProj.dFldRT1R1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                                    $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                                }
                                            }


                                            //wenn die x posierion undefiniert dann neu definieren
                                            if ($rootScope.storeProj.isoElem[sid][it_r] == undefined) {
                                                $rootScope.storeProj.isoElem[sid][it_r] = [];
                                            }
                                            //wemm bei beiden positonen auch neu definieren
                                            if ($rootScope.storeProj.isoElem[sid][it_r][count] == undefined) {
                                                $rootScope.storeProj.isoElem[sid][it_r][count] = {};
                                            }
                                            //wenn die x posierion undefiniert dann neu definieren
                                            if ($rootScope.storeProj.colVar[sid][it_r] == undefined) {
                                                $rootScope.storeProj.colVar[sid][it_r] = [];
                                            }
                                            //wemm bei beiden positonen auch neu definieren
                                            if ($rootScope.storeProj.colVar[sid][it_r][count] == undefined) {
                                                $rootScope.storeProj.colVar[sid][it_r][count] = {};
                                            }

                                            if($rootScope.storeProj.cardcontroll[sid].vis == 1){
                                                $(".Plans_"+sid).append("<svg id='toolbox_" + sid + "_" + count + "' class='shorttooltip' width='0' transform='scale(0.3)' data-country='" + $rootScope.storeProj.cardcontroll[sid].set[set].country + "' >"+
                                                    "<rect width='100%' height='100%' fill='#ffcc33' stroke='black'/>" +
                                                    "<text x='3' y='30' font-size='25' font-weight='bold' fill='black'>" + $rootScope.storeProj.cardcontroll[sid].set[set].country.split("-")[0].replace("_"," ") + "</text>" +
                                                    "<g id='c5ISOID_0_" + sid + "_" + count + "'></g>" +
                                                    "</svg>");
                                                $(".Plans_" + sid + " #" + $rootScope.storeProj.cardcontroll[sid].set[set].country).css({"fill-opacity": "","fill": "white"});
                                            }
                                            count++;
                                            if (count >= $rootScope.storeProj.dFldCT1C1[sid].length) {
                                                $rootScope.func_newD(1, sid);
                                            }
                                            if($rootScope.storeProj.cardcontroll[sid].vis == 0){
                                                $(".Plans_" + sid + " #" + $rootScope.storeProj.cardcontroll[sid].set[set].country).css({"fill-opacity": "", "fill": ""});
                                            }
                                            continue table;
                                        }
                                    }
                                    if ($rootScope.storeProj.items[0][los].value != "") {
                                        for (var it = 0; it < retval.length; it++) {
                                            var names = retval[it].split("-");
                                            for(var i = 0; i < names.length; i ++) {
                                                if (names[i].toUpperCase() == $rootScope.storeProj.items[0][los].value.toUpperCase().replace(' ', '_')) {
                                                    var country = $("#id_0_" + los);

                                                    $rootScope.storeProj.tmpItem[sid].col[count] = country;

                                                    for (var m = 0; m < $rootScope.storeProj.tmpItem[sid].row.length; m++) {
                                                        if ($rootScope.storeProj.SVG_Elem[sid][m] == undefined) {
                                                            $rootScope.storeProj.SVG_Elem[sid][m] = [];
                                                            $rootScope.storeProj.SVG_sim[sid][m] = [];
                                                            $rootScope.storeProj.SVG_Leg[sid][m] = [];
                                                        }
                                                    }

                                                    if($rootScope.storeProj.SVG_Elem[sid][it_r][count] == undefined){
                                                        $rootScope.func_initDropped(4, sid, "T5_dropIDC_" + count + "_" + sid);
                                                    }


                                                    $rootScope.func_maxValue(sid);

                                                    $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[count].val().length;
                                                    $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[count].val().length;
                                                    for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                                        if ($rootScope.storeProj.dFldCT1C1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                                            $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                                            $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                                        }
                                                    }
                                                    $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                                    for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                                        if ($rootScope.storeProj.dFldCT1C1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                                            $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                                        }
                                                    }
                                                    $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                                    $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                                    for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                                        if ($rootScope.storeProj.dFldRT1R1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                                            $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                                            $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                                        }
                                                    }
                                                    $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[count].val().length;
                                                    for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                                        if ($rootScope.storeProj.dFldRT1R1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                                            $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                                        }
                                                    }


                                                    //wenn die x posierion undefiniert dann neu definieren
                                                    if ($rootScope.storeProj.isoElem[sid][it_r] == undefined) {
                                                        $rootScope.storeProj.isoElem[sid][it_r] = [];
                                                    }
                                                    //wemm bei beiden positonen auch neu definieren
                                                    if ($rootScope.storeProj.isoElem[sid][it_r][count] == undefined) {
                                                        $rootScope.storeProj.isoElem[sid][it_r][count] = {};
                                                    }
                                                    //wenn die x posierion undefiniert dann neu definieren
                                                    if ($rootScope.storeProj.colVar[sid][it_r] == undefined) {
                                                        $rootScope.storeProj.colVar[sid][it_r] = [];
                                                    }
                                                    //wemm bei beiden positonen auch neu definieren
                                                    if ($rootScope.storeProj.colVar[sid][it_r][count] == undefined) {
                                                        $rootScope.storeProj.colVar[sid][it_r][count] = {};
                                                    }

                                                    if($rootScope.storeProj.cardcontroll[sid].vis == 1){
                                                        $(".Plans_" + sid + " #" + retval[it]).css({"fill-opacity": "","fill": "white"});
                                                        $(".Plans_"+sid).append("<svg id='toolbox_" + sid + "_" + count + "' class='shorttooltip' width='0' transform='scale(0.3)' data-country='" + retval[it] + "' >"+
                                                            "<rect width='100%' height='100%' fill='#ffcc33' stroke='black'/>" +
                                                            "<text x='3' y='30' font-size='25' font-weight='bold' fill='black'>" + retval[it].split("-")[0].replace("_"," ") + "</text>" +
                                                            "<g id='c5ISOID_0_" + sid + "_" + count + "'></g>" +
                                                            "</svg>")
                                                    }
                                                    count++;
                                                    if (count >= $rootScope.storeProj.dFldCT1C1[sid].length) {
                                                        $rootScope.func_newD(1, sid);
                                                    }
                                                    if($rootScope.storeProj.cardcontroll[sid].vis == 0){
                                                        $(".Plans_" + sid + " #" + retval[it]).css({"fill-opacity": "", "fill": ""});
                                                    }
                                                    continue table;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if ($rootScope.storeProj.tmpCR[sid] == 1) {
                                table : for (var los = 0; los < $rootScope.storeProj.items.length; los++) {
                                    for (var set = 0; set < $rootScope.storeProj.cardcontroll[sid].set.length; set++) {
                                        if ("id_" + los + "_0" == $rootScope.storeProj.cardcontroll[sid].set[set].ref.replace("#", "")) {
                                            var country = $("#id_" + los + "_0");

                                            $rootScope.storeProj.tmpItem[sid].col[count] = country;

                                            for (var m = 0; m < $rootScope.storeProj.tmpItem[sid].row.length; m++) {
                                                if ($rootScope.storeProj.SVG_Elem[sid][m] == undefined) {
                                                    $rootScope.storeProj.SVG_Elem[sid][m] = [];
                                                    $rootScope.storeProj.SVG_sim[sid][m] = [];
                                                    $rootScope.storeProj.SVG_Leg[sid][m] = [];
                                                }
                                            }

                                            if($rootScope.storeProj.SVG_Elem[sid][it_r][count] == undefined) {
                                                $rootScope.func_initDropped(4, sid, "T5_dropIDC_" + count + "_" + sid);
                                            }

                                            $rootScope.func_maxValue(sid);

                                            $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[count].val().length;
                                            $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[count].val().length;
                                            for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                                if ($rootScope.storeProj.dFldCT1C1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                                    $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                                    $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                                }
                                            }
                                            $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                            for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                                if ($rootScope.storeProj.dFldCT1C1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                                    $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                                }
                                            }
                                            $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                            $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                            for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                                if ($rootScope.storeProj.dFldRT1R1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                                    $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                                    $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                                }
                                            }
                                            $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[count].val().length;
                                            for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                                if ($rootScope.storeProj.dFldRT1R1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                                    $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                                }
                                            }


                                            //wenn die x posierion undefiniert dann neu definieren
                                            if ($rootScope.storeProj.isoElem[sid][it_r] == undefined) {
                                                $rootScope.storeProj.isoElem[sid][it_r] = [];
                                            }
                                            //wemm bei beiden positonen auch neu definieren
                                            if ($rootScope.storeProj.isoElem[sid][it_r][count] == undefined) {
                                                $rootScope.storeProj.isoElem[sid][it_r][count] = {};
                                            }
                                            //wenn die x posierion undefiniert dann neu definieren
                                            if ($rootScope.storeProj.colVar[sid][it_r] == undefined) {
                                                $rootScope.storeProj.colVar[sid][it_r] = [];
                                            }
                                            //wemm bei beiden positonen auch neu definieren
                                            if ($rootScope.storeProj.colVar[sid][it_r][count] == undefined) {
                                                $rootScope.storeProj.colVar[sid][it_r][count] = {};
                                            }
                                            if($rootScope.storeProj.cardcontroll[sid].vis == 1){
                                                $(".Plans_"+sid).append("<svg id='toolbox_" + sid + "_" + count + "' class='shorttooltip' width='0' transform='scale(0.3)' data-country='" + $rootScope.storeProj.cardcontroll[sid].set[set].country + "' >"+
                                                    "<rect width='100%' height='100%' fill='#ffcc33' stroke='black'/>" +
                                                    "<text x='3' y='30' font-size='25' font-weight='bold' fill='black'>" + $rootScope.storeProj.cardcontroll[sid].set[set].country.split("-")[0].replace("_"," ") + "</text>" +
                                                    "<g id='c5ISOID_0_" + sid + "_" + count + "'></g>" +
                                                    "</svg>");
                                                $(".Plans_" + sid + " #" + $rootScope.storeProj.cardcontroll[sid].set[set].country).css({"fill-opacity": "","fill": "white"});
                                            }
                                            count++;
                                            if (count >= $rootScope.storeProj.dFldCT1C1[sid].length) {
                                                $rootScope.func_newD(1, sid);
                                            }

                                            if($rootScope.storeProj.cardcontroll[sid].vis == 0){
                                                $(".Plans_" + sid + " #" + $rootScope.storeProj.cardcontroll[sid].set[set].country).css({"fill-opacity": "", "fill": ""});
                                            }
                                            continue table;
                                        }
                                    }
                                    if ($rootScope.storeProj.items[los][0].value != "") {
                                        for (var it = 0; it < retval.length; it++) {
                                            var names = retval[it].split("-");
                                            for(var i = 0; i < names.length; i ++) {
                                                if (names[i].toUpperCase() == $rootScope.storeProj.items[los][0].value.toUpperCase().replace(' ', '_')) {
                                                    var country = $("#id_" + los + "_0");

                                                    $rootScope.storeProj.tmpItem[sid].col[count] = country;

                                                    for (var m = 0; m < $rootScope.storeProj.tmpItem[sid].row.length; m++) {
                                                        if ($rootScope.storeProj.SVG_Elem[sid][m] == undefined) {
                                                            $rootScope.storeProj.SVG_Elem[sid][m] = [];
                                                            $rootScope.storeProj.SVG_sim[sid][m] = [];
                                                            $rootScope.storeProj.SVG_Leg[sid][m] = [];
                                                        }
                                                    }

                                                    if($rootScope.storeProj.SVG_Elem[sid][it_r][count] == undefined) {
                                                        $rootScope.func_initDropped(4, sid, "T5_dropIDC_" + count + "_" + sid);
                                                    }

                                                    $rootScope.func_maxValue(sid);

                                                    $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[count].val().length;
                                                    $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[count].val().length;
                                                    for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                                        if ($rootScope.storeProj.dFldCT1C1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                                            $rootScope.storeProj.dFldCT1C1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                                            $rootScope.storeProj.tmpLeg[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                                        }
                                                    }
                                                    $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                                    for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                                        if ($rootScope.storeProj.dFldCT1C1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                                            $rootScope.storeProj.dFldCT1C1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                                        }
                                                    }
                                                    $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                                    $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[it_r].val().length;
                                                    for (var itr = 0; itr < $rootScope.storeProj.tmpItem[sid].row.length; itr++) {
                                                        if ($rootScope.storeProj.dFldRT1R1[sid][0].descrR < $rootScope.storeProj.tmpItem[sid].row[itr].val().length) {
                                                            $rootScope.storeProj.dFldRT1R1[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                                            $rootScope.storeProj.tmpLeg[sid][0].descrR = $rootScope.storeProj.tmpItem[sid].row[itr].val().length;
                                                        }
                                                    }
                                                    $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[count].val().length;
                                                    for (var itc = 0; itc < $rootScope.storeProj.tmpItem[sid].col.length; itc++) {
                                                        if ($rootScope.storeProj.dFldRT1R1[sid][0].descrC < $rootScope.storeProj.tmpItem[sid].col[itc].val().length) {
                                                            $rootScope.storeProj.dFldRT1R1[sid][0].descrC = $rootScope.storeProj.tmpItem[sid].col[itc].val().length;
                                                        }
                                                    }


                                                    //wenn die x posierion undefiniert dann neu definieren
                                                    if ($rootScope.storeProj.isoElem[sid][it_r] == undefined) {
                                                        $rootScope.storeProj.isoElem[sid][it_r] = [];
                                                    }
                                                    //wemm bei beiden positonen auch neu definieren
                                                    if ($rootScope.storeProj.isoElem[sid][it_r][count] == undefined) {
                                                        $rootScope.storeProj.isoElem[sid][it_r][count] = {};
                                                    }
                                                    //wenn die x posierion undefiniert dann neu definieren
                                                    if ($rootScope.storeProj.colVar[sid][it_r] == undefined) {
                                                        $rootScope.storeProj.colVar[sid][it_r] = [];
                                                    }
                                                    //wemm bei beiden positonen auch neu definieren
                                                    if ($rootScope.storeProj.colVar[sid][it_r][count] == undefined) {
                                                        $rootScope.storeProj.colVar[sid][it_r][count] = {};
                                                    }
                                                    if($rootScope.storeProj.cardcontroll[sid].vis == 1){
                                                        $(".Plans_"+sid).append("<svg id='toolbox_" + sid + "_" + count + "' class='shorttooltip' width='0' transform='scale(0.3)' data-country='" + retval[it] + "' >"+
                                                            "<rect width='100%' height='100%' fill='#ffcc33' stroke='black'/>" +
                                                            "<text x='3' y='30' font-size='25' font-weight='bold' fill='black'>" + retval[it].split("-")[0].replace("_"," ") + "</text>" +
                                                            "<g id='c5ISOID_0_" + sid + "_" + count + "'></g>" +
                                                            "</svg>");
                                                        $(".Plans_" + sid + " #" + retval[it]).css({"fill-opacity": "","fill": "white"});
                                                    }
                                                    count++;
                                                    if (count > $rootScope.storeProj.dFldCT1C1[sid].length) {
                                                        $rootScope.func_newD(1, sid);
                                                    }
                                                    if($rootScope.storeProj.cardcontroll[sid].vis == 0){
                                                        $(".Plans_" + sid + " #" + retval[it]).css({"fill-opacity": "", "fill": ""});
                                                    }
                                                    continue table;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // generating amount of similar ones
                    if ($rootScope.storeProj.tmpItem[sid].col.length > 0 && $rootScope.storeProj.tmpItem[sid].row.length > 0) {
                        for (var it = 0; it < $rootScope.storeProj.tmpLeg[sid].length; it++) {
                            d3.select('#svgVal_' + it + '_0_' + sid).attr('opacity', '1');
                            d3.select('#numVal_' + it + '_0_' + sid).attr('opacity', '1');
                        }
                    } else {
                        for (var it = 0; it < $rootScope.storeProj.tmpLeg[sid].length; it++) {
                            d3.select('#svgVal_' + it + '_0_' + sid).attr('opacity', '0');
                            d3.select('#numVal_' + it + '_0_' + sid).attr('opacity', '0');
                        }
                    }
                    $rootScope.$apply();
                    for (var it_s = 0; it_s < $rootScope.storeProj.tmpLeg[sid].length; it_s++) {
                        $('#svgVal_' + it_s + '_4_' + sid).children().remove();
                        //löscht kinder des 0 svg udn fügt gleich wider hinzu
                        d3.select('#svgVal_' + it_s + '_4_' + sid).append('g').append(function () {
                            //wenn an der 4 position nichts ist
                            if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["4"] != undefined) {
                                //und id nicht drinnen ist dann mach ein neues svg element SVG_LEG
                                if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                    var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_4_' + sid + '"'))["1"];
                                    return tmpLeg;
                                } else {
                                    //anderfalls leg id fest und setzt 4 fest
                                    var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["4"];
                                    tmpLeg.id = 'svgLeg_' + it_s + '_4_' + sid;
                                    return tmpLeg;
                                }
                            }
                            //das geliche mit 2
                            if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["2"] != undefined) {
                                if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                    var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_4_' + sid + '"'))["1"];
                                    return tmpLeg;
                                } else {
                                    var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["2"];
                                    tmpLeg.id = 'svgLeg_' + it_s + '_4_' + sid;
                                    return tmpLeg;
                                }
                            }
                            //und 1
                            if ($.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["1"] != undefined) {
                                if (!$rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.match('id=')) {
                                    var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML.replace('<svg ', '<svg id="svgLeg_' + it_s + '_4_' + sid + '"'))["1"];
                                    return tmpLeg;
                                } else {
                                    var tmpLeg = $.parseHTML($rootScope.storeProj.tmpLeg[sid][it_s].elem["0"].innerHTML)["1"];
                                    tmpLeg.id = 'svgLeg_' + it_s + '_4_' + sid;
                                    return tmpLeg;
                                }
                            }

                        });
                    }
                }

                //Wenn hover visualiserung
                if($rootScope.storeProj.cardcontroll[sid].vis == 0){
                    if($(".tooltip_"  + sid).css("opacity") == 1){
                        var countryname = $(".tooltip_" + sid).attr("data-country");
                        var col;
                        gesettete: for(var c = 0; c <  $rootScope.storeProj.cardcontroll[sid].set.length; c++){
                            for(var setcol= 0; setcol < $rootScope.storeProj.tmpItem[sid].col.length; setcol++){
                                if($rootScope.storeProj.tmpItem[sid].col[setcol][0].id ==  $rootScope.storeProj.cardcontroll[sid].set[c].ref && $rootScope.storeProj.cardcontroll[sid].set[c].country == countryname){
                                    col = setcol;
                                    break gesettete;
                                }
                            }
                        }

                        if( col == undefined){
                            for(var g = 0; g < $rootScope.storeProj.tmpItem[sid].col.length; g++){
                                if(countryname.toUpperCase().includes($rootScope.storeProj.tmpItem[sid].col[g].val().replace(' ','_').toUpperCase())){
                                    col = g;
                                    break;
                                }
                            }
                        }
                        $rootScope.generategraph(col,sid);
                    }
                }

                //Wenn visualiserung stickpunkt
                if($rootScope.storeProj.cardcontroll[sid].vis == 1) {
                    $(".insideacountry").remove();
                    if($rootScope.storeProj.tmpItem[sid].col != undefined && $rootScope.storeProj.tmpItem[sid].col.length > 0){
                        for(var col = 0; col < $rootScope.storeProj.tmpItem[sid].col.length; col++){
                            var box  = $("#d-" +  $("#toolbox_" + sid + "_" + col).attr("data-country"));
                            $("#toolbox_" + sid + "_" + col).attr("x",parseInt(box.attr("x"))/0.3).attr("y",parseInt(box.attr("y"))/0.3);

                            var dragResize = d3.behavior.drag().on('drag', function() {
                                // Determine resizer position relative to resizable (parent)
                                try{
                                    var x = d3.mouse(this.parentNode)[0];
                                    var y = d3.mouse(this.parentNode)[1];
                                }catch(err){
                                    return;
                                }

                                // Avoid negative or really small widths
                                x = Math.max(1, x);
                                y = Math.max(1, y);

                                this.setAttribute('x',x/0.3);
                                this.setAttribute('y',y/0.3);
                            });
                            d3.selectAll(".shorttooltip").call(dragResize);

                            var tmpMax = [];
                            tmpMax[0] = 0;
                            tmpMax[1] = 6;


                            if ($rootScope.storeProj.inpVal[sid][it] == undefined) {
                                $rootScope.storeProj.inpVal[sid][it] = [];
                            }
                            if ($rootScope.storeProj.SVG_Leg[sid][it] != undefined) {
                                for (var it_1 = 0; it_1 < $rootScope.storeProj.tmpItem[sid].col.length; it_1++) {
                                    if ($rootScope.storeProj.inpVal[sid][it][it_1] == undefined) {
                                        if ($rootScope.storeProj.SVG_Leg[sid][it][it_1] != undefined) {
                                            $rootScope.storeProj.inpVal[sid][it][it_1] = $rootScope.storeProj.SVG_Leg[sid][it][it_1].valt;
                                        } else {
                                            $rootScope.storeProj.inpVal[sid][it][it_1] = 1;
                                        }
                                    }
                                }
                            }
                            for (var gol = 0; gol < $rootScope.storeProj.max[sid].length; gol++) {
                                tmpMax[gol + 1] = 0;
                                for (var it1 = 0; it1 <= gol; it1++) {
                                    tmpMax[gol + 1] += $rootScope.storeProj.max[sid][it1];
                                }
                            }
                            $("#c5ISOID_0_" + sid + "_"+ col).children().remove();

                            d3.select("#inside_" + sid).append("g").attr("id","insidecountry_" + sid + "_" + col).attr("class", "insideacountry");
                            var isinline = true;
                            var country = $(".Plans_" + sid + " #" + $("#toolbox_" + sid + "_" + col).attr("data-country"));


                            var rowit_r = 0;
                            var x = undefined;
                            var y = (country[0].getBBox().y/0.3);
                            var countryoffset = 0;
                            inlinevis: for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {

                                var checker;
                                if ($rootScope.storeProj.tmpCR[sid] == 0){
                                    checker = $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[col][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][col]);
                                }else{
                                    checker = $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[col][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][col]);
                                }
                                if(country[0].getBBox().width * country[0].getBBox().height > 8 * 8 * checker && isinline){

                                    for (it_iso = 0; it_iso < checker; it_iso++) {

                                        if ($rootScope.storeProj.SVG_Elem[sid] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r][0] != undefined) {
                                            $rootScope.storeProj.isoElem[sid][it_r][col] = {};
                                            //wenn kein element mit ner id drinnen in SVG ist dann mach eins und replace das mit einigen werten
                                            if (!$($rootScope.storeProj.SVG_Elem[sid][it_r][col][0])[0].innerHTML.match('id=')) {
                                                var tempSVG = $($rootScope.storeProj.SVG_Elem[sid][it_r][col][0])[0].innerHTML.replace('<svg ', '<svg  id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '"');
                                                //weise das dann weise HTML dem isoElem zu
                                                $rootScope.storeProj.isoElem[sid][it_r][col].iso = $.parseHTML(tempSVG)[1];
                                            } else {
                                                //wenn geparste svg html an der 4 Stelle undefiniert ist dann dann soll er die id neu sezten und die 2 Stelle setzten
                                                if ($.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][col][0])[0].innerHTML)[4] == undefined) {
                                                    $rootScope.storeProj.isoElem[sid][it_r][col].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][col][0])[0].innerHTML)[2];
                                                    $rootScope.storeProj.isoElem[sid][it_r][col].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;

                                                } else {
                                                    //wenn alles richtig dann  genauso setzten sowie id
                                                    $rootScope.storeProj.isoElem[sid][it_r][col].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][col][0])[0].innerHTML)[4];
                                                    $rootScope.storeProj.isoElem[sid][it_r][col].iso.id = 'SVGid_' + it_r + '_0_' + it_iso + '_' + sid;

                                                }
                                            }
                                        }
                                        if (it_iso > 0 && it_iso % ($rootScope.storeProj.grVal[sid].v) == 0) {
                                            $rootScope.storeProj.grVal[sid].p += 1;
                                        }
                                        //alle blöcke auswählen und ein g hinzufügen und id ist zusammengestzt aus position svg und slider

                                        vertical :do{
                                            do{
                                                x = (country[0].getBBox().x/0.3) + countryoffset + (7 * $rootScope.storeProj.dFldRT1R1[sid][0].descrR) + (28 * $rootScope.storeProj.grVal[sid].p) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * rowit_r) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * tmpMax[0];
                                                var pt = $(".Plans_" +sid)[0].createSVGPoint();
                                                pt.x = x * 0.3;
                                                pt.y = y * 0.3;

                                                pt = pt.matrixTransform($(".Plans_" +sid)[0].getScreenCTM());

                                                if (x < (country[0].getBBox().x + country[0].getBBox().width) / 0.3 && x + 21 < (country[0].getBBox().x + country[0].getBBox().width) / 0.3) {
                                                    if(document.elementFromPoint(pt.x,pt.y).id == country[0].id){
                                                        break vertical;
                                                    }
                                                }else{
                                                    break;
                                                }
                                                countryoffset = countryoffset + 2;
                                            }while(true);

                                            y = y + 34;
                                            countryoffset = 0;
                                            rowit_r = 0;
                                            if(y > (country[0].getBBox().y + country[0].getBBox().height)/0.3){
                                                y = undefined;
                                                x = undefined;
                                                break;
                                            }
                                        }while(true);


                                        if(x == undefined || y == undefined){
                                            d3.select("#insidecountry_" + sid + "_" + col).remove();
                                            isinline = false;
                                            it_r = -1;
                                            continue inlinevis;
                                        }

                                        d3.select("#insidecountry_" + sid + "_" + col)
                                            .append("g")
                                            .attr("id","inlineblock_" + sid + "_" + col + "_" + it_iso)
                                            .attr('transform', function () {
                                                return 'translate(' + x + ',' + y + ')';
                                            })
                                            .append(function () {
                                                return $rootScope.storeProj.isoElem[sid][it_r][col].iso;
                                            });

                                        rowit_r++;
                                        //block hat so ungefähr 15 und compiled 21
                                        //console.log(country[0].getBBox());
                                        //console.log($("#insidecountry_" + sid + "_" + col)[0].getBoundingClientRect());
                                        //console.log($("#inside_" + sid)[0].getBBox());
                                        //ckT3_r mit 0 definieren
                                        if (ckT3_r[sid] == undefined) {
                                            ckT3_r[sid] = 0;
                                        }
                                        if (ckT3_r[sid] == 0 || $rootScope.storeProj.colVar[sid][it_r][col] == undefined) {
                                            // wenn mehrere path gefunden worden sind dann füg css und gib sie einer color
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('path').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('path').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('path').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                                            }
                                            // wenn mehrere circle gefunden worden sind dann füg css und gib sie einer color
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('circle').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('circle').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('circle').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                                            }
                                            // wenn mehrere rect gefunden worden sind dann füg css und gib sie einer color
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('rect').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('rect').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('rect').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                                            }
                                            // wenn mehrere text gefunden worden sind dann füg css und gib sie einer color
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('text').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('text').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('text').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                                            }
                                            // wenn mehrere line gefunden worden sind dann füg css und gib sie einer color
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('line').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('line').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('line').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                                            }
                                            // wenn mehrere polygon gefunden worden sind dann füg css und gib sie einer color
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('polygon').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('polygon').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('polygon').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                                            }
                                            // wenn mehrere pattern gefunden worden sind dann füg css und gib sie einer color
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('pattern').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('pattern').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('pattern').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                                            }
                                        }
                                        // wenn colVar nicht undefinier ist dann
                                        if ($rootScope.storeProj.colVar[sid][it_r][col] != undefined) {
                                            //wenn ein oder mehr paths gefunden worden sind dann füg css und gcolib sie ine vordefinierte color
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('path').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('path').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('path').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                            }
                                            //wenn ein oder mehr circles worden sind dann füg css und gib sie ine vordefinierte color
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('circle').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('circle').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('circle').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                            }
                                            //wenn ein oder mehr rects worden sind dann füg css und gib sie ine vordefinierte color
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('rect').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('rect').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('rect').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                            }
                                            //wenn ein oder mehr text worden sind dann füg css und gib sie ine vordefinierte color
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('text').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('text').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('text').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                            }
                                            //wenn ein oder mehr lines worden sind dann füg css und gib sie ine vordefinierte color
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('line').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('line').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('line').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                            }
                                            //wenn ein oder mehr polygone gefunden worden sind dann füg css und gib sie ine vordefinierte color
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('polygon').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('polygon').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('polygon').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                            }
                                            //wenn ein oder mehr pattern gefunden worden sind dann füg css und gib sie ine vordefinierte color
                                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('pattern').length > 0) {
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('pattern').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('pattern').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                            }
                                        }

                                    }
                                    continue;
                                }

                                isinline = false;

                                d3.select("#toolbox_" + sid + "_" + col).append("text").attr("x",22).attr("y",(65 + 32 * it_r)).attr("fill","black").text($rootScope.storeProj.tmpItem[sid].row[it_r].val());
                                for (var it_iso = 0; it_iso < checker; it_iso++) {
                                    if ($rootScope.storeProj.SVG_Elem[sid] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r][0] != undefined) {
                                        $rootScope.storeProj.isoElem[sid][it_r][col] = {};
                                        //wenn kein element mit ner id drinnen in SVG ist dann mach eins und replace das mit einigen werten
                                        if (!$($rootScope.storeProj.SVG_Elem[sid][it_r][col][0])[0].innerHTML.match('id=')) {
                                            var tempSVG = $($rootScope.storeProj.SVG_Elem[sid][it_r][col][0])[0].innerHTML.replace('<svg ', '<svg  id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '"');
                                            //weise das dann weise HTML dem isoElem zu
                                            $rootScope.storeProj.isoElem[sid][it_r][col].iso = $.parseHTML(tempSVG)[1];
                                        } else {
                                            //wenn geparste svg html an der 4 Stelle undefiniert ist dann dann soll er die id neu sezten und die 2 Stelle setzten
                                            if ($.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][col][0])[0].innerHTML)[4] == undefined) {
                                                $rootScope.storeProj.isoElem[sid][it_r][col].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][col][0])[0].innerHTML)[2];
                                                $rootScope.storeProj.isoElem[sid][it_r][col].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;

                                            } else {
                                                //wenn alles richtig dann  genauso setzten sowie id
                                                $rootScope.storeProj.isoElem[sid][it_r][col].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][col][0])[0].innerHTML)[4];
                                                $rootScope.storeProj.isoElem[sid][it_r][col].iso.id = 'SVGid_' + it_r + '_0_' + it_iso + '_' + sid;

                                            }
                                        }
                                    }
                                    if (it_iso > 0 && it_iso % ($rootScope.storeProj.grVal[sid].v) == 0) {
                                        $rootScope.storeProj.grVal[sid].p += 1;
                                    }
                                    //alle blöcke auswählen und ein g hinzufügen und id ist zusammengestzt aus position svg und slider
                                    d3.select("#c5ISOID_0_" + sid + "_"+ col)
                                        .append('g')
                                        .attr('class', 'g5CL_' + it_r + '_0_' + sid).attr('id', function () {
                                        return 'gc5ID_' + it_r + '_0_' + it_iso + '_' + sid;
                                    })
                                    //transformiere das gane
                                        .attr('transform', function () {
                                            //x koordinate 46 + 7 * der länge +28 * Gruppierungsposition
                                            //y koordinate ist 64 + 34 * anzahl der Zeile
                                            var x = 46 + (7 * $rootScope.storeProj.dFldRT1R1[sid][0].descrR) + (28 * $rootScope.storeProj.grVal[sid].p) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * it_iso) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * tmpMax[0] + (112 * 0);
                                            var y = 45 + 34 * it_r;

                                            return 'translate(' + x + ',' + y + ')';
                                        })
                                        .append(function () {
                                            return $rootScope.storeProj.isoElem[sid][it_r][col].iso;
                                        });
                                    //ckT3_r mit 0 definieren
                                    if (ckT3_r[sid] == undefined) {
                                        ckT3_r[sid] = 0;
                                    }
                                    if (ckT3_r[sid] == 0 || $rootScope.storeProj.colVar[sid][it_r][col] == undefined) {
                                        // wenn mehrere path gefunden worden sind dann füg css und gib sie einer color
                                        if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('path').length > 0) {
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('path').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('path').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                                        }
                                        // wenn mehrere circle gefunden worden sind dann füg css und gib sie einer color
                                        if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('circle').length > 0) {
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('circle').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('circle').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                                        }
                                        // wenn mehrere rect gefunden worden sind dann füg css und gib sie einer color
                                        if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('rect').length > 0) {
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('rect').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('rect').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                                        }
                                        // wenn mehrere text gefunden worden sind dann füg css und gib sie einer color
                                        if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('text').length > 0) {
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('text').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('text').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                                        }
                                        // wenn mehrere line gefunden worden sind dann füg css und gib sie einer color
                                        if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('line').length > 0) {
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('line').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('line').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                                        }
                                        // wenn mehrere polygon gefunden worden sind dann füg css und gib sie einer color
                                        if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('polygon').length > 0) {
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('polygon').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('polygon').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                                        }
                                        // wenn mehrere pattern gefunden worden sind dann füg css und gib sie einer color
                                        if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('pattern').length > 0) {
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('pattern').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('pattern').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                                        }
                                    }
                                    // wenn colVar nicht undefinier ist dann
                                    if ($rootScope.storeProj.colVar[sid][it_r][col] != undefined) {
                                        //wenn ein oder mehr paths gefunden worden sind dann füg css und gcolib sie ine vordefinierte color
                                        if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('path').length > 0) {
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('path').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('path').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                        }
                                        //wenn ein oder mehr circles worden sind dann füg css und gib sie ine vordefinierte color
                                        if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('circle').length > 0) {
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('circle').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('circle').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                        }
                                        //wenn ein oder mehr rects worden sind dann füg css und gib sie ine vordefinierte color
                                        if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('rect').length > 0) {
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('rect').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('rect').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                        }
                                        //wenn ein oder mehr text worden sind dann füg css und gib sie ine vordefinierte color
                                        if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('text').length > 0) {
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('text').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('text').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                        }
                                        //wenn ein oder mehr lines worden sind dann füg css und gib sie ine vordefinierte color
                                        if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('line').length > 0) {
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('line').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('line').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                        }
                                        //wenn ein oder mehr polygone gefunden worden sind dann füg css und gib sie ine vordefinierte color
                                        if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('polygon').length > 0) {
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('polygon').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('polygon').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                        }
                                        //wenn ein oder mehr pattern gefunden worden sind dann füg css und gib sie ine vordefinierte color
                                        if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('pattern').length > 0) {
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('pattern').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                            $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('pattern').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                        }
                                    }
                                }

                            }
                            if(isinline){
                                $("#toolbox_" + sid + "_" + col).remove();
                            }
                        }
                        for(col = 0; col < $rootScope.storeProj.tmpItem[sid].col.length; col++){
                            var obj = $("#c5ISOID_0_" + sid + "_"+ col);
                            if(obj[0] != undefined){
                                var x = obj[0].getBBox().width + obj[0].getBBox().x + 20;
                                if (x >= 300) {
                                    $("#toolbox_" + sid + "_" + col).attr("width", x);
                                }else{
                                    $("#toolbox_" + sid + "_" + col).attr("width", 300);
                                }
                                var y = obj[0].getBBox().height + obj[0].getBBox().y + 3;
                                if (y > 80) {
                                    $("#toolbox_" + sid + "_" + col).attr("height", y);
                                }else{
                                    $("#toolbox_" + sid + "_" + col).attr("height", 80);
                                }
                            }
                        }
                    }
                }

            }, 0, false);
        };
// ...
        $rootScope.func_renderT1 = function (sid, obj_arr) {
            // d3 exclusive rendering
        };
        $rootScope.func_renderT2 = function (sid, obj_arr) {
            // d3 exclusive rendering
        };
        $rootScope.func_renderT3 = function (sid, obj_arr) {
            // d3 exclusive rendering
        };
        $rootScope.func_renderT4 = function (sid, obj_arr) {
            // d3 exclusive rendering
        };
        $rootScope.func_newD = function (swDrop, it) {
            if ($rootScope.tmpID == 0 || $rootScope.tmpID == 1 || $rootScope.tmpID == 2 || $rootScope.tmpID == 3 ||  $rootScope.tmpID == 4) {
                if (swDrop == 0) {
                    $rootScope.storeProj.dFldRT1R1[it][$rootScope.storeProj.ctrDrT1R1[it]] = {'idR': $rootScope.storeProj.ctrDrT1R1[it]};
                    $rootScope.storeProj.ctrDrT1R1[it]++;
                }
                if (swDrop == 1) {
                    $rootScope.storeProj.dFldCT1C1[it][$rootScope.storeProj.ctrDcT1C1[it]] = {'idC': $rootScope.storeProj.ctrDcT1C1[it]};
                    $rootScope.storeProj.dFldCT1C1[it][$rootScope.storeProj.ctrDcT1C1[it]].max = 4;
                    $rootScope.storeProj.ctrDcT1C1[it]++;
                }
            }

        };
        $rootScope.func_swapDim = function (cntArr) {
            var tmpArr = [];
            for (var it_r = 0; it_r < cntArr.length; it_r++) {
                for (var it = 0; it < cntArr[it_r].length; it++) {
                    tmpArr[it] = [];
                }
            }
            for (var it_r = 0; it_r < cntArr.length; it_r++) {
                for (var it = 0; it < cntArr[it_r].length; it++) {
                    tmpArr[it][it_r] = cntArr[it_r][it];
                }
            }
            return tmpArr;
        };
         $rootScope.func_xlsxImp = function (cntArr, val) {
            $rootScope.storeProj.ck = 1;
            $rootScope.load = true;
            $rootScope.storeProj.items = [];
            if (val == 0) {
                $rootScope.cntArrSw = cntArr; //$rootScope.func_swapDim(cntArr);
            } else {
                $rootScope.cntArrSw = $rootScope.func_swapDim(cntArr);
            }
            for (var it_r = 0; it_r < $rootScope.cntArrSw.length; it_r++) {
                $rootScope.storeProj.items[it_r] = [];
                for (var it = 0; it < $rootScope.cntArrSw[it_r].length; it++) {
                    /*
                     $rootScope.storeProj.items[it_r][it] = {'draggable': false, 'value': '', 'row': it_r, 'col': it};
                     if (it_r == 0) {
                     $rootScope.storeProj.items[it_r][it] = {'draggable': true, 'value': '', 'row': it_r, 'col': it};
                     }
                     if (it == 0) {
                     $rootScope.storeProj.items[it_r][it] = {'draggable': true, 'value': '', 'row': it_r, 'col': it};
                     }
                     */
                    if ($rootScope.cntArrSw[it_r][it] != undefined) {
                        $rootScope.storeProj.items[it_r][it] = {
                            'draggable': false,
                            'value': $rootScope.cntArrSw[it_r][it].v,
                            'row': it_r,
                            'col': it
                        };
                        if (it_r == 0) {
                            $rootScope.storeProj.items[it_r][it] = {
                                'draggable': true,
                                'value': $rootScope.cntArrSw[it_r][it].w,
                                'row': it_r,
                                'col': it
                            };
                        }
                        if (it == 0) {
                            $rootScope.storeProj.items[it_r][it] = {
                                'draggable': true,
                                'value': $rootScope.cntArrSw[it_r][it].w,
                                'row': it_r,
                                'col': it
                            };
                        }
                    } else {
                        $rootScope.storeProj.items[it_r][it] = {
                            'draggable': false,
                            'value': 0,
                            'row': it_r,
                            'col': it
                        };
                        if (it_r == 0) {
                            $rootScope.storeProj.items[it_r][it] = {
                                'draggable': true,
                                'value': '',
                                'row': it_r,
                                'col': it
                            };
                        }
                        if (it == 0) {
                            $rootScope.storeProj.items[it_r][it] = {
                                'draggable': true,
                                'value': '',
                                'row': it_r,
                                'col': it
                            };
                        }
                    }

                }

            }
            $rootScope.storeProj.itemsD = $rootScope.storeProj.items;
            $rootScope.$applyAsync();
        };
        $rootScope.func_edit = function () {
            $rootScope.storeProj.ck = 0;
            if ($rootScope.storeProj.addChk == 0) {
                $rootScope.load = true;
                $rootScope.storeProj.items = [];
                for (var it_r = 0; it_r <= $rootScope.storeProj.ctrR; it_r++) {
                    $rootScope.storeProj.items[it_r] = [];
                    for (var it = 0; it <= $rootScope.storeProj.ctrC; it++) {
                        /*
                         $rootScope.storeProj.items[it_r][it] = {'draggable': false, 'value': '', 'row': it_r, 'col': it};
                         if (it_r == 0) {
                         $rootScope.storeProj.items[it_r][it] = {'draggable': true, 'value': '', 'row': it_r, 'col': it};
                         }
                         if (it == 0) {
                         $rootScope.storeProj.items[it_r][it] = {'draggable': true, 'value': '', 'row': it_r, 'col': it};
                         }
                         */
                        $rootScope.storeProj.items[it_r][it] = {
                            'draggable': false,
                            'value': '',
                            'row': it_r,
                            'col': it
                        };
                        if (it_r == 0) {
                            $rootScope.storeProj.items[it_r][it] = {
                                'draggable': true,
                                'value': '',
                                'row': it_r,
                                'col': it
                            };
                        }
                        if (it == 0) {
                            $rootScope.storeProj.items[it_r][it] = {
                                'draggable': true,
                                'value': '',
                                'row': it_r,
                                'col': it
                            };
                        }
                    }
                }
                for (var itr = 0; itr < 3; itr++) {
                    $rootScope.func_addCells(1);
                    $rootScope.func_addCells(0);
                }
                $rootScope.storeProj.addChk = 0;
            }
            // if import and comeback addChk = 0
        };
        var it = 0;
        $rootScope.saveData = (function () {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            return function (blob, fileName) {
                var url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
            };
        }());
        $rootScope.writeDownloadLink = function (sid, svgID) {
            if ($("#svgID" + svgID + "_" + sid).length > 0) {
                $('.mnXr').remove();
                $('.mnXc').remove();

                console.log($rootScope.storeProj.scale[sid].x);
                console.log($rootScope.storeProj.scale[sid].y);
                var ts = $("#svgID" + svgID + "_" + sid);
                var svg = ts.clone(true);
                svg.css('width', $('.GID_' + $rootScope.storeProj.slideID)[0].getBoundingClientRect().width);
                svg.css('height', $('.GID_' + $rootScope.storeProj.slideID)[0].getBoundingClientRect().height + (34 * $rootScope.storeProj.tmpLeg[$rootScope.storeProj.slideID].length));
                svg.each(function () {
                    $(this)[0].setAttribute('viewBox', '0 0 ' + $('.GID_' + $rootScope.storeProj.slideID)[0].getBoundingClientRect().width + ' ' + $('.GID_' + $rootScope.storeProj.slideID)[0].getBoundingClientRect().height + (34 * $rootScope.storeProj.tmpLeg[$rootScope.storeProj.slideID].length) + '');
                });
                svg.find('g').removeAttr('ng-if');
                svg.find('g').removeAttr('ng-repeat');
                svg.find('rect').removeAttr('ng-attr-x');
                svg.find('rect').removeAttr('ng-attr-y');
                svg.find('rect').removeAttr('x-lvl-drop-target');
                svg.find('rect').removeAttr('lvl-drop-target');
                svg.find('rect').removeAttr('x-on-drop');
                svg.find('text').removeAttr('ng-attr-x');
                svg.find('text').removeAttr('ng-attr-y');
                svg.find('text').removeAttr('ng-mouseleave');
                svg.find('text').removeAttr('ng-mouseover');
                svg.find('text').removeAttr('ng-click');

                // Wiener Zeitung -> Formate zur Auswahl beim Exportieren + fine adjustment

                var svgData = svg[0].outerHTML;
                var cleanedSvgString = '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' + svgData;
                var svgBlob = new Blob([cleanedSvgString], {type: "image/svg+xml;charset=utf-8"});
                var svgUrl = URL.createObjectURL(svgBlob);
                var downloadLink = document.createElement("a");
                downloadLink.href = svgUrl;
                downloadLink.download = 'exp' + it + '.svg';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
//you can download svg file by right click menu.
                /*
                 var svgBlob = new Blob([pdf], { type: "application/pdf; charset=utf-8" });
                 var svgUrl = URL.createObjectURL(svgBlob);
                 var downloadLink = document.createElement("a");
                 downloadLink.href = svgUrl;
                 downloadLink.download = "exported_" + it + ".svg";

                 */
                it++;
            }
        };
        $rootScope.func_color = function (cr, it_r, it_c, sid, tmpV, defaultColor, colorScale) {
            var self = this;
            var rainbow = ["#5b9254", "#e64639", "#1a4e53", "#d99a00", "#cccccc", "#000000"];
            colorScale = colorScale || rainbow;
            var color = function (i) {
                return colorScale[i];
            };
            defaultColor = defaultColor || color(0);

            self.pickedColor = defaultColor;
            self.picked = function (color) {
                if (cr == 'row') {
                    for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].col.length; it++) {
                        $rootScope.storeProj.colVar[sid][it_r][it] = color;
                    }
                }
                if (cr == 'col') {
                    for (var it = 0; it < $rootScope.storeProj.isoElem[sid].length; it++) {
                        $rootScope.storeProj.colVar[sid][it][it_c] = color;
                    }
                }
                $rootScope.storeProj.colorCL = 0;
                $rootScope.func_iFace(tmpV, sid);
            };
            var clicked = function () {
                if (typeof self.pickedColor == 'undefined') {
                    d3.select("#colorID").selectAll("svg").remove();
                } else {
                    self.picked(self.pickedColor);
                }
                $('#colorID').children().remove();
            };

            var pie = d3.layout.pie().sort(null);
            var arc = d3.svg.arc().innerRadius(45).outerRadius(110);

            var svg = d3.select("#colorID")
                .append("svg")
                .attr('x', 170)
                .attr("width", 360)
                .attr("height", 360)
                .on("click", clicked)
                .append("g")
                .attr("transform", "translate(180,180)");

            var plate = svg.append("circle")
                .attr("fill", defaultColor)
                .attr("stroke", "#fff")
                .attr("stroke-width", 4)
                .attr("r", 75)
                .attr("cx", 0)
                .attr("cy", 0)
                .on("click", clicked);

            svg.datum([1, 1, 1, 1, 1, 1])
                .selectAll("path")
                .data(pie)
                .enter()
                .append("path")
                .attr("fill", function (d, i) {
                    return color(i);
                })
                .attr("stroke", "#fff")
                .attr("stroke-width", 4)
                .attr("d", arc)
                .on("mouseover", function () {
                    var fill = d3.select(this).attr("fill");
                    self.pickedColor = fill;
                    plate.attr("fill", fill);

                })
                .on("click", clicked);
        };
        $rootScope.func_reentry = function (swCells) {
            if (swCells == 0) {
                $rootScope.storeProj.items[$rootScope.storeProj.ctrR] = [];
                for (var it = 0; it <= $rootScope.storeProj.ctrC; it++) {
                    $rootScope.storeProj.items[$rootScope.storeProj.ctrR][it] = {
                        'draggable': false,
                        'value': '',
                        'row': $rootScope.storeProj.ctrR,
                        'col': it
                    };
                    if ($rootScope.storeProj.ctrR == 0) {
                        $rootScope.storeProj.items[$rootScope.storeProj.ctrR][it] = {
                            'draggable': true,
                            'value': '',
                            'row': $rootScope.storeProj.ctrR,
                            'col': it
                        };
                    }
                    if (it == 0) {
                        $rootScope.storeProj.items[$rootScope.storeProj.ctrR][it] = {
                            'draggable': true,
                            'value': '',
                            'row': $rootScope.storeProj.ctrR,
                            'col': it
                        };
                    }

                }
            }
            if (swCells == 1) {
                for (var it_r = 0; it_r <= $rootScope.storeProj.ctrR; it_r++) {
                    $rootScope.storeProj.items[it_r][$rootScope.storeProj.ctrC] = {
                        'draggable': false,
                        'value': '',
                        'row': it_r,
                        'col': $rootScope.storeProj.ctrC
                    };
                    if (it_r == 0) {
                        $rootScope.storeProj.items[it_r][$rootScope.storeProj.ctrC] = {
                            'draggable': true,
                            'value': '',
                            'row': it_r,
                            'col': $rootScope.storeProj.ctrC
                        };
                    }
                    if ($rootScope.storeProj.ctrC == 0) {
                        $rootScope.storeProj.items[it_r][$rootScope.storeProj.ctrC] = {
                            'draggable': true,
                            'value': '',
                            'row': it_r,
                            'col': $rootScope.storeProj.ctrC
                        };
                    }
                }
            }
        };
        $rootScope.func_addCells = function (swCells) {
            if (swCells == 0) {
                $rootScope.storeProj.ctrR++;
            }
            if (swCells == 1) {
                $rootScope.storeProj.ctrC++;
            }
            $rootScope.func_reentry(swCells);
            $('#btnC').css('left', 9 * ($rootScope.storeProj.ctrC + 1) + 1.2 + 'em');
        };
        $rootScope.func_edit();
        $('.tabCL').on(
            'dragover',
            function (e) {
                e.preventDefault();
                e.stopPropagation();
            }
        );
        $('.tabCL').on(
            'dragenter',
            function (e) {
                e.preventDefault();
                e.stopPropagation();
            }
        );
        $('.tabCL').on(
            'drop',
            function (e) {
                if (e.originalEvent.dataTransfer) {
                    if (e.originalEvent.dataTransfer.files.length) {
                        e.preventDefault();
                        e.stopPropagation();
                        $rootScope.func_uploadXLSX(e.originalEvent.dataTransfer.files);
                    }
                }
            }
        );
        $rootScope.func_import = function () {
            $(".mainCtnr").append('<input id="fileIDX" name="Datei" type="file"  style="display:none" accept="xlsx" />');
            var element = $("#fileIDX");
            element.trigger('click');
            element.fileupload({
                add: function () {
                    $rootScope.func_uploadXLSX(element[0].files);
                    $("#fileIDX").remove();
                }
            });
        };
        $rootScope.func_uploadXLSX = function (xlsx_file) {
            $rootScope.storeProj.name = xlsx_file[0].name;
            $rootScope.reader.onload = function (err_load) {
                var data = err_load.target.result;
                $rootScope.workbook = XLSX.read(data, {type: 'binary'});
                $rootScope.sheet_name = $rootScope.workbook.SheetNames[0];
                $rootScope.worksheet = $rootScope.workbook.Sheets[$rootScope.sheet_name];
                var nextRow = 0;
                var excelinjson = XLSX.utils.sheet_to_json($rootScope.worksheet, {header: 1, raw: true}); //dazu
                //var out = convertEurostat(excelinjson, nextRow);
                var out = "";
                // CLS previous plots
                // d3.selectAll('.').remove();
                // Functionsaufruf für Excel-Array manipulation
                if ($rootScope.storeProj.name.split('.').pop() == "xlsx")
                    out = convertOpenWorldBank(excelinjson, nextRow, []);

                if ($rootScope.storeProj.name.split('.').pop() == "xls")
                    out = convertEurostat(excelinjson, nextRow, []);

                if (out == undefined) {
                    $rootScope.func_xlsxProc($rootScope.worksheet, $rootScope.sheet_name);
                }
                else {
                    $rootScope.func_xlsxImp(out, 0);       //bei xslxImp wird was verändert
                }
            };
            $rootScope.reader.readAsBinaryString(xlsx_file[0]);
        };

        function convertOpenWorldBank(excelinjson, nextRow, outputFile) {
            var count = 0;
            var simpleXlsx = 0;

            var i = 1;
            for (var z = 0; z < excelinjson[i][z].length; z++) {
                if (isNaN(excelinjson[i][z]) && (z > 0 && z < 4)) {
                    console.log(isNaN(excelinjson[i][z]));
                    simpleXlsx = 1;
                }
            }

            if (simpleXlsx == 0) {
                for (var i = nextRow; i < excelinjson.length; i++) {

                    nextRow = i + 1;
                    outputFile[count] = excelinjson[i];
                    if (excelinjson[i].length > 0 && excelinjson[i][0] !== undefined) {

                        //Delete Colums
                        for (var z = 1; z < excelinjson[i].length; z++) {
                            if (z < excelinjson[i].length - 3) {
                                excelinjson[i][z] = excelinjson[i][z + 3];
                            }
                            else
                                delete excelinjson[i][z];

                            console.log(excelinjson[i][z]);
                        }

                        for (var j = 0; j < excelinjson[i].length; j++) {
                            var parseDoubleValue = parseInt(excelinjson[i][j]);
                            if (isNaN(parseDoubleValue)) {
                                parseDoubleValue = excelinjson[i][j];
                            }
                            outputFile[count][j] = {w: excelinjson[i][j], v: parseDoubleValue};
                        }
                        count++;
                        break;
                    }
                }

                if (nextRow < excelinjson.length) {
                    for (var i = nextRow; i < excelinjson.length; i++) {
                        nextRow = i + 1;
                        outputFile[count] = excelinjson[i];
                        // Leerzeilen erkennen => neue Tabelle
                        if (excelinjson[i].length == 0) {
                            break;
                        }
                        for (var z = 1; z < excelinjson[i].length; z++) {
                            if (z < excelinjson[i].length - 3) {
                                excelinjson[i][z] = excelinjson[i][z + 3];
                            }
                            else
                                delete excelinjson[i][z];
                        }

                        for (var j = 0; j < excelinjson[i].length; j++) {
                            var parseDoubleValue = parseInt(excelinjson[i][j]);
                            if (isNaN(parseDoubleValue)) {
                                parseDoubleValue = excelinjson[i][j];
                            }
                            outputFile[count][j] = {w: excelinjson[i][j], v: parseDoubleValue};
                        }
                        count++;
                    }
                }
                return outputFile;
            } else {
                return undefined;
            }
        }

        function convertEurostat(excelinjson, nextRow, outputFile) {
            //outputFile=[];
            var count = 0;
            // Foreach Tabelle
            while (nextRow < excelinjson.length) {
                var hasGeoTime = false;
                //document.write('<table>');

                for (var i = nextRow; i < excelinjson.length; i++) {
                    nextRow = i + 1;

                    if (excelinjson[i].length > 0 && excelinjson[i][0] !== undefined && (excelinjson[i][0].toUpperCase() === "GEO/TIME" || excelinjson[i][0].toUpperCase() === "GEO\\TIME")) {
                        hasGeoTime = true;
                        outputFile[count] = excelinjson[i];

                        for (var j = 0; j < excelinjson[i].length; j++) {
                            var parseDoubleValue = parseInt(excelinjson[i][j]);
                            if (isNaN(parseDoubleValue)) {
                                parseDoubleValue = excelinjson[i][j];
                            }
                            outputFile[count][j] = {w: excelinjson[i][j], v: parseDoubleValue};
                        }
                        count++;
                        break;
                    }

                }

                if (hasGeoTime === true && nextRow < excelinjson.length) {
                    for (var i = nextRow; i < excelinjson.length; i++) {
                        nextRow = i + 1;
                        outputFile[count] = excelinjson[i];
                        if (excelinjson[i].length == 0) {
                            break;
                        }
                        for (var j = 0; j < excelinjson[i].length; j++) {
                            var parseDoubleValue = parseInt(excelinjson[i][j]);
                            if (isNaN(parseDoubleValue)) {
                                parseDoubleValue = excelinjson[i][j];
                            }
                            outputFile[count][j] = {w: excelinjson[i][j], v: parseDoubleValue};
                        }
                        count++;
                    }
                }
                return outputFile;
            }
        }

        $rootScope.func_xlsxProc = function (worksheet, sheet_name) {
            // If the Excel-sheet is changed the view is CLS
            // d3.select('#').remove();
            $rootScope.cntArr = [];
            $rootScope.table_limit = {};
            $rootScope.table_limit = $rootScope.func_lmtRC(worksheet[sheet_name]);
            $rootScope.limit = $rootScope.table_limit;
            for (var it = ("" + (($rootScope.table_limit.start[0])).charCodeAt(0) - 64); it <= ("" + (($rootScope.table_limit.stop[0])).charCodeAt(0) - 64); it++) {
                $rootScope.cntArr[it - 1] = [];
                for (var it_r = $rootScope.table_limit.start[1]; it_r <= $rootScope.table_limit.stop[1]; it_r++) {
                    //console.log(worksheet[sheet_name]["" + String.fromCharCode(65 + it) + it_r]);
                    // Legend: t: str, numb; v: value; w: strValue; h: strHierarchy  True
                    $rootScope.cntArr[it - 1][it_r - 1] = worksheet[sheet_name]["" + String.fromCharCode(64 + it) + it_r];
                }
            }
            $rootScope.func_xlsxImp($rootScope.cntArr, 1);
        };
        $rootScope.func_lmtRC = function (work_table) {
            $rootScope.ref_not = work_table["!ref"].split(':');
            $rootScope.limit = {};
            $rootScope.limit.start = $rootScope.ref_not[0].match(/[a-zA-Z]+|[0-9]+/g);
            $rootScope.limit.stop = $rootScope.ref_not[1].match(/[a-zA-Z]+|[0-9]+/g);
            return $rootScope.limit;
        };
        /*
         $rootScope.$watch(function () {
         if ($rootScope.storeProj.colorCL == 0) {
         if ($rootScope.action == 0) {
         $rootScope.func_iFace(slides[$rootScope.storeProj.slideID].tmp, $rootScope.storeProj.slideID);
         //$rootScope.$applyAsync();

         }
         }
         });
         */

        $rootScope.carddrop = function(dragEl, Region, sid){
            if($rootScope.storeProj.tmpCR[sid] == 0){
                if(dragEl.split("_")[1] != "0"){
                    return;
                }
                for(var l = 0; l < $rootScope.storeProj.cardcontroll[sid].set.length; l++){
                    if($rootScope.storeProj.cardcontroll[sid].set[l].ref == dragEl){
                        $rootScope.storeProj.cardcontroll[sid].set.splice(l,1);
                    }
                }
            }
            if($rootScope.storeProj.tmpCR[sid] == 1){
                if(dragEl.split("_")[2] != "0"){
                    return;
                }
                for(var l = 0; l < $rootScope.storeProj.cardcontroll[sid].set.length; l++){
                    if($rootScope.storeProj.cardcontroll[sid].set[l].ref == dragEl){
                        $rootScope.storeProj.cardcontroll[sid].set.splice(l,1);
                    }
                }
            }
            $rootScope.storeProj.cardcontroll[sid].set.push({ref: dragEl, country: Region.replace("d-","")});
            $rootScope.func_Templ5(sid);
        };

        $rootScope.generategraph = function(col,sid) {
            var tmpMax = [];
            tmpMax[0] = 0;
            tmpMax[1] = 6;


            for (var it = 0; it < $rootScope.storeProj.tmpItem[sid].row.length; it++) {
                if ($rootScope.storeProj.inpVal[sid][it] == undefined) {
                    $rootScope.storeProj.inpVal[sid][it] = [];
                }
                if ($rootScope.storeProj.SVG_Leg[sid][it] != undefined) {
                    for (var it_1 = 0; it_1 < $rootScope.storeProj.tmpItem[sid].col.length; it_1++) {
                        if ($rootScope.storeProj.inpVal[sid][it][it_1] == undefined) {
                            if ($rootScope.storeProj.SVG_Leg[sid][it][it_1] != undefined) {
                                $rootScope.storeProj.inpVal[sid][it][it_1] = $rootScope.storeProj.SVG_Leg[sid][it][it_1].valt;
                            } else {
                                $rootScope.storeProj.inpVal[sid][it][it_1] = 1;
                            }
                        }
                    }
                }
                for (var gol = 0; gol < $rootScope.storeProj.max[sid].length; gol++) {
                    tmpMax[gol + 1] = 0;
                    for (var it1 = 0; it1 <= gol; it1++) {
                        tmpMax[gol + 1] += $rootScope.storeProj.max[sid][it1];
                    }
                }
                $('#c5ISOID_0_' + sid).children().remove();
                for (var it_r = 0; it_r < $rootScope.storeProj.tmpItem[sid].row.length; it_r++) {
                    var checker;
                    if ($rootScope.storeProj.tmpCR[sid] == 0){
                        checker = $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].col[col][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][col]);
                    }else{
                        checker = $rootScope.func_round($rootScope.storeProj.items[$rootScope.storeProj.tmpItem[sid].col[col][0].id.split('_')[1]][$rootScope.storeProj.tmpItem[sid].row[it_r][0].id.split('_')[2]].value / $rootScope.storeProj.inpVal[sid][it_r][col]);
                    }
                    for (var it_iso = 0; it_iso < checker; it_iso++) {
                        if ($rootScope.storeProj.SVG_Elem[sid] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r] != undefined && $rootScope.storeProj.SVG_Elem[sid][it_r][0] != undefined) {
                            $rootScope.storeProj.isoElem[sid][it_r][col] = {};
                            //wenn kein element mit ner id drinnen in SVG ist dann mach eins und replace das mit einigen werten
                            if (!$($rootScope.storeProj.SVG_Elem[sid][it_r][col][0])[0].innerHTML.match('id=')) {
                                var tempSVG = $($rootScope.storeProj.SVG_Elem[sid][it_r][col][0])[0].innerHTML.replace('<svg ', '<svg  id="SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid + '"');
                                //weise das dann weise HTML dem isoElem zu
                                $rootScope.storeProj.isoElem[sid][it_r][col].iso = $.parseHTML(tempSVG)[1];
                            } else {
                                //wenn geparste svg html an der 4 Stelle undefiniert ist dann dann soll er die id neu sezten und die 2 Stelle setzten
                                if ($.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][col][0])[0].innerHTML)[4] == undefined) {
                                    $rootScope.storeProj.isoElem[sid][it_r][col].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][col][0])[0].innerHTML)[2];
                                    $rootScope.storeProj.isoElem[sid][it_r][col].iso.id = 'SVGid_' + it_r + '_' + it + '_' + it_iso + '_' + sid;

                                } else {
                                    //wenn alles richtig dann  genauso setzten sowie id
                                    $rootScope.storeProj.isoElem[sid][it_r][col].iso = $.parseHTML($($rootScope.storeProj.SVG_Elem[sid][it_r][col][0])[0].innerHTML)[4];
                                    $rootScope.storeProj.isoElem[sid][it_r][col].iso.id = 'SVGid_' + it_r + '_0_' + it_iso + '_' + sid;

                                }
                            }
                        }
                        if (it_iso > 0 && it_iso % ($rootScope.storeProj.grVal[sid].v) == 0) {
                            $rootScope.storeProj.grVal[sid].p += 1;
                        }
                        //alle blöcke auswählen und ein g hinzufügen und id ist zusammengestzt aus position svg und slider
                        d3.select('#c5ISOID_0_' + sid)
                            .append('g')
                            .attr('class', 'g5CL_' + it_r + '_0_' + sid).attr('id', function () {
                            return 'gc5ID_' + it_r + '_0_' + it_iso + '_' + sid;
                        })
                        //transformiere das gane
                            .attr('transform', function () {
                                //x koordinate 46 + 7 * der länge +28 * Gruppierungsposition
                                //y koordinate ist 64 + 34 * anzahl der Zeile
                                var x = 46 + (7 * $rootScope.storeProj.dFldRT1R1[sid][0].descrR) + (28 * $rootScope.storeProj.grVal[sid].p) + ((28 + parseInt($rootScope.storeProj.valSc[sid])) * it_iso) + (28 + parseInt($rootScope.storeProj.valSc[sid])) * tmpMax[0] + (112 * 0);
                                var y = 45 + 34 * it_r;

                                return 'translate(' + x + ',' + y + ')';
                            })
                            //appende das svg
                            .append(function () {
                                return $rootScope.storeProj.isoElem[sid][it_r][col].iso;
                            });
                        //ckT3_r mit 0 definieren
                        if (ckT3_r[sid] == undefined) {
                            ckT3_r[sid] = 0;
                        }

                        if (ckT3_r[sid] == 0 || $rootScope.storeProj.colVar[sid][it_r][col] == undefined) {
                            // wenn mehrere path gefunden worden sind dann füg css und gib sie einer color
                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('path').length > 0) {
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('path').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('path').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                            }
                            // wenn mehrere circle gefunden worden sind dann füg css und gib sie einer color
                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('circle').length > 0) {
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('circle').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('circle').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                            }
                            // wenn mehrere rect gefunden worden sind dann füg css und gib sie einer color
                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('rect').length > 0) {
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('rect').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('rect').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                            }
                            // wenn mehrere text gefunden worden sind dann füg css und gib sie einer color
                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('text').length > 0) {
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('text').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('text').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                            }
                            // wenn mehrere line gefunden worden sind dann füg css und gib sie einer color
                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('line').length > 0) {
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('line').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('line').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                            }
                            // wenn mehrere polygon gefunden worden sind dann füg css und gib sie einer color
                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('polygon').length > 0) {
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('polygon').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('polygon').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                            }
                            // wenn mehrere pattern gefunden worden sind dann füg css und gib sie einer color
                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('pattern').length > 0) {
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('pattern').css('stroke', $rootScope.storeProj.colors[sid][col]).css('fill', $rootScope.storeProj.colors[sid][col]);
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('pattern').attr('stroke', $rootScope.storeProj.colors[sid][col]).attr('fill', $rootScope.storeProj.colors[sid][col]);
                            }
                        }
                        // wenn colVar nicht undefinier ist dann
                        if ($rootScope.storeProj.colVar[sid][it_r][col] != undefined) {
                            //wenn ein oder mehr paths gefunden worden sind dann füg css und gcolib sie ine vordefinierte color
                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('path').length > 0) {
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('path').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('path').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                            }
                            //wenn ein oder mehr circles worden sind dann füg css und gib sie ine vordefinierte color
                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('circle').length > 0) {
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('circle').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('circle').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                            }
                            //wenn ein oder mehr rects worden sind dann füg css und gib sie ine vordefinierte color
                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('rect').length > 0) {
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('rect').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('rect').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                            }
                            //wenn ein oder mehr text worden sind dann füg css und gib sie ine vordefinierte color
                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('text').length > 0) {
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('text').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('text').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                            }
                            //wenn ein oder mehr lines worden sind dann füg css und gib sie ine vordefinierte color
                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('line').length > 0) {
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('line').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('line').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                            }
                            //wenn ein oder mehr polygone gefunden worden sind dann füg css und gib sie ine vordefinierte color
                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('polygon').length > 0) {
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('polygon').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('polygon').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                            }
                            //wenn ein oder mehr pattern gefunden worden sind dann füg css und gib sie ine vordefinierte color
                            if ($($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('pattern').length > 0) {
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('pattern').css('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).css('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                                $($rootScope.storeProj.isoElem[sid][it_r][col].iso).find('pattern').attr('stroke', $rootScope.storeProj.colVar[sid][it_r][col]).attr('fill', $rootScope.storeProj.colVar[sid][it_r][col]);
                            }
                        }
                    }
                }
            }
            try {
                var obj = $("#c5ISOID_0_" + sid);
                var x = obj[0].getBBox().width + obj[0].getBBox().x + 50;
                if (x >= 300) {
                    $("#toolbox_" + sid).width(x);
                } else {
                    $("#toolbox_" + sid).width(300);
                }
                obj = $("#Row_dropIDR_" + $rootScope.storeProj.tmpItem[sid].row.length + "_" + sid);
                if (obj != undefined && !isNaN(obj.attr("y"))) {
                    var y = obj[0].getBBox().y;
                    if (y > 220) {
                        $("#toolbox_" + sid).attr("height", y);
                    }
                }
            } catch (e) {
            }
        };

        $rootScope.setmap = function (mapid,visid,sid){
            $(".tooltip_"  + sid).css("opacity",0);
            $rootScope.storeProj.cardcontroll[sid].map = mapid;
            $rootScope.storeProj.cardcontroll[sid].vis = visid;
            $rootScope.storeProj.cardcontroll[sid].set = [];
            //$rootScope.$apply();



            angular.element(document).ready(function () {
                if($rootScope.storeProj.cardcontroll[sid].vis == 0){
                    $rootScope.func_Templ5(sid);
                    $(".shorttooltip").remove();
                    $(".insideacountry").remove();
                    $(".Plans_" + sid)[0].addEventListener("wheel",(function(e) {
                        e.preventDefault();
                        var l = ((e.clientY - $(".view2").offset().top) / $(".tElem").height());
                        var hula = $(".tElem")[0].scrollHeight;
                        var nachher = (1 - (e.clientY - $(".view2").offset().top) / $(".tElem").height()) * $(".tElem")[0].scrollHeight;
                        $(".tElem")[0].scrollTop = nachher;
                        $(document).bind("keydown",function(g){
                            if(g.ctrlKey){
                                var fired = ($(".tElem").height() - $(".menuID").height() -1) < ($(".Plans").height() - e.deltaY * 2);
                                if(fired){
                                    $(".Plans").height($(".Plans").height() - e.deltaY * 2);
                                }
                            }
                        });
                    }));
                    $(".Plans_" + sid).mouseout(function() {
                        $(document).unbind("keydown");
                    });
                    $( ".region" ).mouseover(function(d) {
                        if($(".tooltip_"  + sid).css("opacity") != 1){
                            var countryname = d.target.id;
                            //KLAUS
                            if( $(".Plans" +  sid + " #" + countryname).css("fill-opacity") != "0.5"){


                                if($rootScope.storeProj.tmpItem[sid].row != undefined && $rootScope.storeProj.tmpItem[sid].col != undefined && $rootScope.storeProj.tmpItem[sid].row != 0 &&  $rootScope.storeProj.tmpItem[sid].col != 0){

                                    var col;

                                    gesettete: for(var c = 0; c <  $rootScope.storeProj.cardcontroll[sid].set.length; c++){
                                        for(var setcol= 0; setcol < $rootScope.storeProj.tmpItem[sid].col.length; setcol++){
                                            if($rootScope.storeProj.tmpItem[sid].col[setcol][0].id ==  $rootScope.storeProj.cardcontroll[sid].set[c].ref && $rootScope.storeProj.cardcontroll[sid].set[c].country == countryname){
                                                col = setcol;
                                                break gesettete;
                                            }
                                        }
                                    }

                                    if( col == undefined){
                                        for(var g = 0; g < $rootScope.storeProj.tmpItem[sid].col.length; g++){
                                            if(countryname.toUpperCase().includes($rootScope.storeProj.tmpItem[sid].col[g].val().replace(' ','_').toUpperCase())){
                                                col = g;
                                                break;
                                            }
                                        }
                                    }
                                    if(col != undefined) {
                                        $rootScope.generategraph(col,sid);
                                        $("#" +countryname).click(function(d) {
                                            d3.select(".tooltip_"  + sid).style("pointer-events","all").style("opacity", 1);
                                        });
                                    }else{
                                        return;
                                    }

                                }else{
                                    return;
                                }
                                d3.select(".tooltip_" + sid).transition().duration(200).style("opacity", .9); //200 millisekunden bis tooltip 0.9 opacity hat
                                d3.select(".tooltip_" + sid + " h4").html(countryname.split('-')[0].replace("_"," "));
                                d3.select(".tooltip_" + sid).attr("data-country",countryname);
                                var offset = $(".view2").offset();
                                //html von tooltip wird so verändert wie die funktion sagt
                                d3.select(".tooltip_" + sid)
                                    .style("left", (d.clientX - offset.left) + "px")      //wo das event stattfindet auf der x
                                    .style("top", (d.clientY - offset.top - 25 ) + "px");// wo das event stattfindet auf der y  -28 px
                            }
                        }
                    }).mouseout(function(){
                        if($(".tooltip_"  + sid).css("opacity") != 1){
                            d3.select(".tooltip_" + sid).transition().duration(300).style("opacity", 0);  //500 millisekunden zum verschwinden
                        }
                    });
                    $(".countrhoverdrop").click(function(e){
                        e.stopPropagation();
                    });
                    $(".tooltip_"  + sid).on("click",function(d) {
                        if($(".tooltip_"  + sid).css("opacity") == 1){
                            d3.select(".tooltip_"  + sid).transition().duration(500).style("opacity", 0);  //500 millisekunden zum verschwinden
                            d3.select(".tooltip_"  + sid).style("pointer-events","none");
                        }
                    });
                }
                if($rootScope.storeProj.cardcontroll[sid].vis == 1){
                    $rootScope.func_Templ5(sid);
                    $(".Plans_" + sid).unbind();
                    $( ".region" ).unbind();
                }
            });
        };
    }
    ])
;
myApp.directive('asyncDir', function () {
    return {
        link: function (scope, elem) {
            elem.on('click', function (e) {
                e.stopPropagation();
            });
        }
    };
});
myApp.directive('inHTML', function () {
    function link(scope, element, attrs) {

        var update = function () {
            element.html(scope.html);
        };

        attrs.$observe('html', function (value) {
            update();
        });
    }

    return {
        link: link,
        scope: {
            html: '='
        }
    };
});
myApp.directive('dNav', function () {
    return {
        templateUrl: './nav/nav.html'
    };
});

myApp.directive('kartenDragger', ['$rootScope', 'uuid', function ($rootScope, uuid) {
    return {
        restrict: 'A',
        scope: {
            onDrop: '&'
        },
        link: function (scope, el, attrs, controller) {
            var id = attrs.id;
            //schauen ob id festgelegt ist
            if (!id) {
                id = uuid.new();
                angular.element(el).attr("id", id);
            }
            // wenn man über nen scheiss ist der das erlaubt muss man das machen sonst gethts ned
            el.bind("dragover", function (e) {
                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }
                //gibt irgenden kack effekt rein
                e.originalEvent.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
                return false;
            });

            el.bind("drop", function (e) {
                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }

                if (e.stopPropagation) {
                    e.stopPropagation(); // Necessary. Allows us to drop.
                }
                var data = e.originalEvent.dataTransfer.getData("text");

                scope.onDrop({dragEl: data, dropRegion: id});
            });


            // wenn LVL-DRAg start passier dann die lvl-taget zum document geben
            $rootScope.$on("LVL-DRAG-START", function () {
                var el = document.getElementById(id);
                angular.element(el).addClass("regiontarget");
                $(".shorttooltip").remove();
            });
            // wenn LVL-DRAg end passier dann die targets und over weggeben
            $rootScope.$on("LVL-DRAG-END", function () {
                var el = document.getElementById(id);
                angular.element(el).removeClass("regiontarget");
                $rootScope.func_Templ5($rootScope.storeProj.slideID);
            });
        }
    };
}]);
myApp.directive('lvlDraggable', ['$rootScope', 'uuid', function ($rootScope, uuid) {
    return {
        restrict: 'A',
        link: function (scope, el, attrs, controller) {
            angular.element(el).attr("draggable", "true");
            var id = attrs.id;
            if (!id) {
                id = uuid.new();
                angular.element(el).attr("id", id);
            }
            el.bind("dragstart", function (e) {
                e.originalEvent.dataTransfer.setData('text', id);
                $rootScope.$emit("LVL-DRAG-START");
            });

            el.bind("dragend", function (e) {
                $rootScope.$emit("LVL-DRAG-END");
            });
        }
    };
}]);
myApp.directive('lvlDropTarget', ['$rootScope', 'uuid', function ($rootScope, uuid) {
    return {
        restrict: 'A',
        scope: {
            onDrop: '&'
        },
        link: function (scope, el, attrs, controller) {
            var id = attrs.id;
            if (!id) {
                id = uuid.new();
                angular.element(el).attr("id", id);
            }
            el.bind("dragover", function (e) {
                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }

                e.originalEvent.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
                return false;
            });

            el.bind("dragenter", function (e) {
                // this / e.target is the current hover target.
                angular.element(e.target).addClass('lvl-over');
            });

            el.bind("dragleave", function (e) {
                angular.element(e.target).removeClass('lvl-over');  // this / e.target is previous target element.
            });

            el.bind("drop", function (e) {
                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }

                if (e.stopPropagation) {
                    e.stopPropagation(); // Necessary. Allows us to drop.
                }
                var data = e.originalEvent.dataTransfer.getData("text");
                var dest = document.getElementById(id);
                var src = document.getElementById(data);

                scope.onDrop({dragEl: data, dropEl: id});
            });

            $rootScope.$on("LVL-DRAG-START", function () {
                var el = document.getElementById(id);
                angular.element(el).addClass("lvl-target");
            });

            $rootScope.$on("LVL-DRAG-END", function () {
                var el = document.getElementById(id);
                angular.element(el).removeClass("lvl-target");
                angular.element(el).removeClass("lvl-over");
                $('.cellCL').removeAttr('disabled');
            });
        }
    };
}]);
myApp.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.style = function () {
                return {
                    'height': (newValue.h - 100) + 'px',
                    'width': (newValue.w - 100) + 'px'
                };
            };

        }, true);

        w.bind('resize', function () {
            if ($('.cnt_res').height() - $('.view1').height() > 100) {
                $('.templ').css('height', $('.cnt_res').height() - ($('.view1').height()) + 'px');
            }
        });
    }
});