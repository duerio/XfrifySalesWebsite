var ContactUs = function () {

    return {
        //main function to initiate the module
        init: function () {
			var map;
			$(document).ready(function(){
			  map = new GMaps({
				div: '#map',
	            lat: 56.183209,
				lng: -3.561459,
			  });
			   var marker = map.addMarker({
	            lat: 56.183209,
				lng: -3.561459,
				    title: 'VME Retail Systems Ltd.',
		            infoWindow: {
		                content: "<b>VME Retail Systems Ltd.</b></br> Main Street,</br> Crook Of Devon,</br> Kinross - Fife,</br> KY13 0UQ"
		            }
		        });

			   marker.infoWindow.open(map, marker);
			});
        }
    };

}();