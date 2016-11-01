/**
* Author: huangjiajia
* Description: 弹框插件
* Version: 1.0
*/
;(function ($, win) {

	/**
	* 步骤：
	* 1. 创建Dialog对象
	* 2. 创建公共的生成html结构的函数
	*/

	// 创建Dialog对象  
	var Dialog = {};

	// 重置Dialog的原型链
	Dialog.fn = Dialog.prototype = function () {};

	// 定义公共函数
	var openDialog = function(options) {
		var type    = options.type    || 'open',
			title   = options.title   || '',
			content = options.content || '',
			btn     = options.btn     || [''],
			index   = options.index   || +new Date() + 99999,
			yes     = options.yes     || function () {},
			cancel  = options.cancel  || function () {},
			seconds = options.seconds,
			showBg  = options.showBg  || true,
			html    = '';

			// console.log(options,'options',title)

		// 判断是哪种类型的弹框
		switch(type) {
			case 'msg':
				break;
			case 'confirm':
				html = '';
				html += '<div class="dialog dialog-' + index + '" style="">';
				html += '<div class="dialog-inner">';
				html += '<div class="dialog-close-btn">X</div>';
				html += '<div class="dialog-title dialog-title-wrap">';
				html += '<span>' + title + '</span>';
				html += '</div>';
				html += '<div class="dialog-content">' + content;
				html += '</div>';
				html += '<div class="dialog-footer">';
				html += '<div class="btn-group">';
				html += '<button class="dialog-btn dialog-ok-btn">确定</button>';
				html += '<button class="dialog-btn dialog-cancel-btn">取消</button>';
				html += '</div>';
				html += '</div>';
				html += '</div>';
				html += '</div>';
				break;
			case 'open':
				html = '';
				html += '<div class="dialog">';
				html += '<div class="dialog-inner">';
				html += '<div class="dialog-close-btn">X</div>';
				html += '<div class="dialog-title dialog-title-wrap">';
				html += '<span>测试</span>';
				html += '</div>';
				html += '<div class="dialog-content">';
				html += '</div>';
				html += '<div class="dialog-footer">';
				html += '<div class="btn-group">';
				html += '<button class="dialog-btn dialog-ok-btn">确定</button>';
				html += '<button class="dialog-btn dialog-cancel-btn">取消</button>';
				html += '</div>';
				html += '</div>';
				html += '</div>';
				html += '</div>';

				break;
		}

		// 判断是否显示背景
		showBg && openBg(index);
		$('body').append(html);

		// 位置居中
		setPosition('.dialog-' + index);

		// 监听浏览器窗口变化
		$(window).resize(function () {
			console.log('----');

			setPosition('.dialog-' + index)
		});
		
		// 拖拽功能
		$('.dialog-title-wrap').on('mousedown',function (event) {
			var e = event || window.event;

			moveTitleElem = $(this);

			if(this.setCapture) {
				this.setCapture();
			}
			else if(window.captureEvents) {
				window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
			}

			moveDialogElem = moveTitleElem.closest('.dialog');

			movePointsStartPos = {'x': e.clientX, 'y': e.clientY};
			moveElemStartPos = {'top': parseInt(moveDialogElem.css('top')), 'left': parseInt(moveDialogElem.css('left'))};

			moveTitleElem.css('cursor','move');

			document.onmousemove = documentMouseMove;
		});

		$('.dialog-title-wrap').on('mouseup', function (event) {
			moveTitleElem.css('cursor','default');

			if (this.releaseCapture) {
				this.releaseCapture();
			}
			else if (window.releaseEvents) {
				window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)

				console.log(Event.MOUSEMOVE , Event.MOUSEUP)
			}

			document.onmousemove = null;
		});

		return index;		
	};

	var setPosition = function (dialogDom) {
		var $dialog   = $(dialogDom),
			width     = $dialog.width(),
			height    = $dialog.height(),
			winWidth  = window.innerWidth,
			winHeight = window.innerHeight,
			docHeight = $(document).height(),
			left      = 0,
			top       = 0;

			// 判断当前弹框的宽度、高度是否大于当前屏幕的宽、高
			if(width >= winWidth) {
				width = winWidth - 100;
				$Dialog.css('width',width + 'px');
			}

			if(height >= winHeight) {
				height = winHeight - 100;
				$dialog.css('height',height + 'px');
			}

			docHeight > winHeight && (winWidth = winWidth - 17);

			left      = (winWidth - width) / 2,
			top       = (winHeight - height) / 2; 

		// console.log(winWidth,winHeight,width,height,left,top,docHeight)

		$dialog.css({
			'left': left + 'px',
			'top' : top + 'px'
		});
		console.log(winWidth,winHeight,'oooooooooo')

	}

	// 显示背景
	var openBg = function (index) {
		var html = '<div class="dialog-bg dialog-bg-' + index + '">';
		$('body').append(html);
	}

	// 确认弹框
	Dialog.confirm = function (options) {
		// var param = {},
			// param.type    = 'confirm',
			// param.title   = options.title,
			// param.content = options.content || '',
			// param.btn     = options.btn     || ['确定','取消'],
			// param.yes     = options.yes,
			// param.cancel  = options.cancel

			options.type = 'confirm';

		return openDialog(options);
	};

	var moveDialogElem     = null,
		moveTitleElem      = null,
		movePointsStartPos = null,
		moveElemStartPos   = null;
	var documentMouseMove = function (event) {
		var e     = event || window.event,
			pos   = {'x': e.clientX, 'y': e.clientY},
			diffX = movePointsStartPos.x - pos.x,
			diffY = movePointsStartPos.y - pos.y;

		moveTitleElem.css('cursor','move');

		moveDialogElem.css({
			'top' : (moveElemStartPos.top - diffY) + 'px',
			'left': (moveElemStartPos.left - diffX) + 'px'
		})
	};

	win.Dialog = Dialog;

})(jQuery,window)