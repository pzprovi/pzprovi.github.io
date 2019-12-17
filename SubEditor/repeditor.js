; (function (window, document, undefined) {
    var tests = [];

    /**
     *
     * RepEditorPrototype is the constructor for RepEditor
     *
     * @class
     * @access public
     */

    var RepEditorPrototype = {
        _version: '1.0',
        _config: {
            'classPrefix': '',
            'enableClasses': true,
            'enableJSClass': true,
            'usePrefixes': true
        },

        _q: [],
        _delay: 40,
        _mirrorCheck: 0,

		addNewRow: function(id, w1, w2, w3, w4, w5){					   	  
			$('#repeditor').append('<div class="input-group">'+
								   '    <div class="row"> '+
								   '        <div class="input-group-prepend"> '+
								   '            <span class="input-group-text" id="'+id+'">'+id+'</span> '+
								   '            <span class="input-group-text col-sm-2">'+w1+'</span> '+
								   '            <span class="input-group-text">'+w2+'</span> '+	                          
								   '      		<textarea id="v'+id+'" name="v'+id+'" class="form-control col-5" rows="2" placeholder="" required>'+w3+'</textarea> '+
								   '   			<textarea class="form-control" rows="2" placeholder="" required>'+w4+'</textarea> '+
								   '  		</div>'+
								   '	</div> '+
								   '</div>');	    	    	 
		},

		load: function(){
		
		},

		clear: function(){	
			$( "#repeditor" ).empty();
		},
				
		save: function(id)
		{   
			return $('#v'+id+'').text();		
		},

        isNull: function (o) {
            if (o == null || o == "undefined") {
                return true;
            }
            return false;
        },

        isNull2: function (o) {
            if (o == null || o == "undefined") {
                return true;
            }
            return false;
        }
      

    };



    // Fake some of Object.create so we can force non test results to be non "own" properties.
    var RepEditor = function () { };
    RepEditor.prototype = RepEditorPrototype;

    // Leak RepEditor globally when you `require` it rather than force it here.
    // Overwrite name so constructor name is nicer :D
    RepEditor = new RepEditor();



    /**
     * is returns a boolean if the typeof an obj is exactly type.
     *
     * @access private
     * @function is
     * @param {*} obj - A thing we want to check the type of
     * @param {string} type - A string to compare the typeof against
     * @returns {boolean}
     */

    function is(obj, type) {
        return typeof obj === type;
    }
    ;

    var classes = [];

    /**
     * Run through all tests and detect their support in the current UA.
     *
     * @access private
     */

    function testRunner() {
        var featureNames;
     
    };
 
    // Leak RepEditor namespace
    window.RepEditor = RepEditor;

    ;

})(window, document);


(function ($) {
    // $(window).load(function (){  });
    // $(document).load(function (){  });

    $(document).ready(function () {

    });

    $(window).bind("load", function () {
                 
        RepEditor.clear();
				
	    var id = 1;
	    var w1 = '00:00:03,420 --> 00:00:05,169';
	    var w2 = 'Priviusly in Emergency. There was dark night and all people are sleeping.';
	    var w3 = 'В предишния епизод. Тя има човешко тяло със синтетичен ИИ(изкуствен интелект)?';
	    var w4 = 'В предишния епизод. Тя има човешко тяло със синтетичен ИИ?';
	    var w5 = '';	
		RepEditor.addNewRow(id, w1, w2, w3, w4, w5);
		
		var rr = RepEditor.save(id);
                 
    });

})($);
