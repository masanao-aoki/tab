;(function($) {
	$.fn.aoTabs = function(options) {
	
	var defaults = {
		'tabSelects' : "#tab-select",
		'tabMain' : "#tabs"
	}

	var setting = $.extend( defaults, options );

	ActionFlag = false;
	$tabMain = $(this).find(setting['tabMain']);
	$tabSelect = $(this).find(setting['tabSelects']);
	tabsIds = [];
	setHash = window.location.hash.split("#")[1];

	//すべて消す処理
	function allHide() {
		$tabMain.find('> *').hide();
	}

	//有効なタブボタンにActiveをつける
	function addActive(hashs) {
		$tabSelect.find("a").removeClass("active");
		$tabSelect.find("a[href="+"#"+hashs+"]").addClass("active");
	}

	//1番目を表示
	function showFirst(ids) {
		$tabMain.find("[data-tabsId*="+ids+"]").show();
		addActive(ids);
	}

	//タブの切り替え処理
	function tabSwitching(ns,winHeight) {
		setHash = window.location.hash.split("#")[1];
		$tabMain.find('> *').each(function() {
			if(ns == $(this).attr("data-tabsId")) {
				allHide();
				addActive($(this).attr("data-tabsId"));
				$("[data-tabsId*="+ns+"]").fadeIn();
			}
		})
	}

	//　フラグチェック
	function flagCheck(setHash) {
		for(var i = 0; i < tabsIds.length; i++ ) {
			if( tabsIds.indexOf(setHash) >= 0) {
				ActionFlag = true;
			}
		}
	}


	//初期表示の処理
	function showCheck() {

		flagCheck(setHash);
		if(!ActionFlag) {
			showFirst($tabMain.find('> *').eq(0).attr("data-tabsId"));
		}
		else {
			$tabMain.find('> *').each(function() {
				if(setHash == $(this).attr("data-tabsId")) {
					allHide();
					showFirst($(this).attr("data-tabsId"));
				}
				
			});
		}
	}

	function addId() {
		$tabSelect.find("a").each(function(i) {
			tabsIds[i] = $(this).attr("href").split("#")[1];
		});
		$tabMain.find('> *').each(function(i) {
			$(this).attr("data-tabsId",tabsIds[i]);
		});
	}

	allHide();
	addId();
	showCheck();
	$tabSelect.find("a").click(function() {
		tabSwitching($(this).attr("href").split("#")[1]);
	});

}
})(jQuery);