/* TABS */
$(document).foundation({
    tab: {
      callback : function (tab) {
        console.log(tab);
      }
    }
});

/* MOBILE MENU 
$('.off-canvas-wrap').foundation('offcanvas', 'toggle', 'move-right');*/

/* ACCORDIONS */
$('#report, #report2, #report3').on('click', '.centered_cell', function() {
	$(this).parent().next('.details_wrap').fadeToggle();
});
$(".connect_btn, .cancel_btn").click(function(){
    $(".connection_box").fadeToggle();
});
$('.username_link').click(function(){
    $(this).toggleClass('active');
    $('.user_menu').toggle();
});















