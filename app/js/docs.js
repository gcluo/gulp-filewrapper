;(function($){
  'use strict';

  var touchend = 'ontouchend' in window ? 'touchend' : 'click';

  // 俱乐部页面
  $(document)
    /*
      点击主菜单操作：
      1. 背景图片模糊
      2. 当点击会员权益菜单时，显示子菜单
    */
    .on(touchend, '.club-nav > li', function(){
      // 1
      $('.club-bg:not(.blur)').addClass('blur');
      // 2
      $(this).data('target') === 'cMember'
        ? $('.vip-nav').addClass('shown').children('li.active').removeClass('active')
        : $('.vip-nav').removeClass('shown');
    })
    /*
      菜单交互操作
      1. 当前菜单高亮
      2. 显示内容区域
      3. 点击相应地菜单切换不同内容
      4. 权益子菜单内容显示后，'close'变成'返回', 否则保持'close'
      5. 如果是从'返回'按钮进权益子菜单，消除高亮
    */
    .on(touchend, '[data-target]', function(e){
      if(e.target.nodeName === 'A') {
        return;
      }

      // 1
      $(this).addClass('active').siblings('.active').removeClass('active');
      // 2
      $('.club-container').addClass('active');
      // 3 
      $('#' + $(this).data('target')).addClass('shown').siblings('.shown').removeClass('shown');
      // 4
      /^s/.test($(this).data('target')) 
        ? $('.btn-close').addClass('btn-return')
        : $('.btn-return').removeClass('btn-return');
      // 5
      $(this).hasClass('btn-close') && $('.vip-nav > li.active').removeClass('active');
    })
    /*
      关闭按钮，页面重置成初始状态
      1. 关闭子菜单；
      2. 主菜单高亮项还原
      3. 主内容区隐藏
      4. 当前内容隐藏
      5. 背景恢复清晰
    */
    .on(touchend, '.btn-close:not(.btn-return)', function(){
      // 1
      $('.vip-nav').removeClass('shown');
      // 2
      $('.club-nav > li.active').removeClass('active');
      // 3
      $('.club-container.active').removeClass('active');
      // 4
      $('.club-content > section.shown').removeClass('shown');
      // 5
      $('.club-bg.blur').removeClass('blur')
    })
    /*
      关闭俱乐部互动全屏4板块
    */
    .on(touchend, '.full-content.shown', function(e){
      if(e.target.nodeName === 'A') {
        return;
      }
      $(this).removeClass('shown');
    });

})(jQuery);
