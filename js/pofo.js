(($)=>{
  
  // 클래스 형태
  // 클래스 첫글자는 대문자, 이어지는 두단어도 두번째 대문자 :파스칼케이스 기법
  class Pofo {
    init(){
      this.header();
      this.section1();
      this.section2();
      this.section3();
      this.section4();
      this.section5();
      this.section6();
      this.section7();
      this.section8();
      this.section9();
      this.quick();
      this.goTop();
    }
    header(){


      //스크롤 이벤트
      let upDown = '';
      let newTop = $(window).scrollTop();
      let oldTop = newTop;

      $(window).scroll(function(){

        newTop = $(window).scrollTop();

        upDown = oldTop - newTop > 0 ? 'UP' : 'DOWN';
        if(upDown==='UP'){
          $('#header').removeClass('hide');
          $('#header').addClass('show');
        }
        if(upDown==='DOWN'){
          $('#header').removeClass('show');
          $('#header').addClass('hide');
        }
        if(newTop===0){
          $('#header').removeClass('show');
        }

        oldTop = newTop;

      });

      
      let t = false;
      let t2 = false;


      //모바일메뉴 버튼 이벤트
      $('.mobile-btn').on({
        click: function(){
          $(this).toggleClass('on');
          $('#nav').stop().slideToggle(300);
        }
      });


      $('.sub').stop().slideUp(0);  //

      // 반응형 시 메인메뉴 이벤트
      $(window).resize(function(){
        resizeNav();
      });

      //반응형 네비게이션 함수
      function resizeNav(){

           if( $(window).width()<=991){
            $('#nav').stop().fadeOut(0);

            t2 = false; // pc 토글 초기화

            if(t===false){
            t = true;

            // 메인메뉴/서브메뉴 이벤트
            $('.main-btn').bind({
              click: function(event){
                $(this).next().stop().slideToggle(300);
              }
            });
             // 마우스 오버 이벤트 삭제
             $('.main-btn').off('mouseenter');
             $('.sub').fadeOut(300);

            }

           }
           else{   // 데스크탑 사이즈 일때

            t = false; //모바일 토글 초기화
            $('#nav').stop().fadeIn(0);
            $('.mobile-btn').removeClass('on');   // x표시 인 햄버거 메뉴바 원래대로 초기화!

            if(t2===false){

              t2 = true;

              // 마우스 클릭 이벤트 삭제
              $('.main-btn').off('click');

              $('.main-btn').on('mouseenter');
              $('.sub').stop().slideUp(0);

              // 메인메뉴/서브메뉴 이벤트
              $('.main-btn').on({
                mouseenter: function(){
                  $('.sub').stop().fadeOut(0);
                  $(this).next().stop().fadeIn(300);
                }
              });
            
              $('#nav').on({
                mouseleave: function(){
                  $('.sub').fadeOut(300);
                }
              });
            
              // 서브-서브 메뉴 이벤트
              $('.sub-btn').on({
                mouseenter: function(){
                  $('.sub-sub').fadeOut(0);
                  $(this).next().fadeIn(300);
                }
              });
            
              $('.sub').on({
                mouseleave: function(){
                  $(this).fadeOut(300);
                }
              });
              // 초기화
              $('.col24').on({
                mouseleave: function(){
                  $('.sub-sub').fadeOut(300);
                }
              });

            }

           }

      }

      resizeNav();  // 로딩시 실행


    }
    section1(){
      let cnt=0;
      let n = $('#section1 .slide').length-3;
      let setId = '';
      let setId2 = '';

      // 마우스 드래그 이벤트
      let mouseStart = '';
      let mouseEnd = '';
      let result = ''; 
      let dragStart = '';
      let dragEnd = '';
      let mouseDown = false;


      // 슬라이드 너비 반응형 구하기
      // 너비와 높이가 단 1 픽셀이라도 변경되면 동작한다
      // 크기변경이 없으면 절대 동작하지 않는다
      let winW = $(window).width();
      $(window).resize(function(){
        winW = $(window).width();  //반응형 창너비 구하기
        // console.log('창너비', winW);
        $('.slide-wrap').stop().animate({left:-winW*cnt}, 600);
        return winW;
      });

      // console.log('창너비', winW);
      // console.log(0 - $('.slide-wrap').offset().left-winW);



      // 1. 메인슬라이드함수
      function mainSlide(){
        $('#section1 .slide-wrap').stop().animate({left:-winW*cnt}, 1000,'easeInOutQuint', function(){
          cnt>n?cnt=0:cnt;
          cnt<0?cnt=n:cnt;
          $('#section1 .slide-wrap').stop().animate({left:-winW*cnt}, 0);
        });
      }
      //2. 다음카운트함수
      function nextCount(){
        cnt++;
        mainSlide();
      }
      //2-1. 이전카운트함수
      function prevCount(){
        cnt--;
        mainSlide();
      }
      //3. 자동타이머함수
      function autoTimer(){
        setId = setInterval(nextCount,3000);
      }
      autoTimer();

      //4. 중지타이머함수
      function pauseFn(){      
        let count = 0;
        clearInterval(setId);
        clearInterval(setId2); //타이머 카운트 중에 마우스 클릭하면 다시 카운트가 0으로 돌아가도록 하는 역할
        setId2 = setInterval(function(){
          count++;
          if(count>=5){
            clearInterval(setId);
            clearInterval(setId2); //5초가 넘어가면 카운트 멈춰라!
            nextCount(); // 타이머 즉각 실행 
            autoTimer(); // 3초 후에
          }
        },1000);
      }


      // 마우스 드래그 이벤트

      $('#section1 .slide-container').on({
        mousedown: function(e){
          mouseStart = e.clientX;

          // 중지되고 난 후 5초간 아무 터치가 없으면 다시 자동타이머 호출 실행 
          pauseFn();

          dragStart = e.clientX - $('.slide-wrap').offset().left-winW;
          mouseDown = true;
        },
        mouseup: function(e){
          mouseEnd = e.clientX;
          result = mouseStart - mouseEnd > 0 ? 'NEXT' : 'PREV';
          if(result==='NEXT'){
            if( !$('#section1 .slide-wrap').is(':animated') ){
              nextCount();
            }
          }
          if(result==='PREV'){
            if( !$('#section1 .slide-wrap').is(':animated') ){
              prevCount();
            }
          }
          mouseDown = false;
        },
        mousemove: function(e){
          if(!mouseDown) return;
          dragEnd = e.clientX;
          $('#section1 .slide-wrap').css({left: dragEnd - dragStart });

        },
        mouseleave: function(e){
          if(!mouseDown) return;
          mouseEnd = e.clientX;
          result = mouseStart - mouseEnd > 0 ? 'NEXT' : 'PREV';
          if(result==='NEXT'){
            if( !$('#section1 .slide-wrap').is(':animated') ){
            }
            nextCount();
          }
          if(result==='PREV'){
            if( !$('#section1 .slide-wrap').is(':animated') ){
            }
            prevCount();
          }
          mouseDown = false;

        }

      });


      //모바일 전용 핑거 터치 이벤트
      $('#section1 .slide-container').on({
        touchstart: function(e){   //==== mousedown
          mouseStart = e.originalEvent.changedTouches[0].clientX;    // 핑거 터치용 시작좌표 찾기
          pauseFn();
          dragStart = e.originalEvent.changedTouches[0].clientX - $('#section1 .slide-wrap').offset().left-winW;
          mouseDown = true;
        },
        touchend: function(e){     //==== mouseup
          mouseEnd = e.originalEvent.changedTouches[0].clientX;
          result = mouseStart - mouseEnd > 0 ? 'NEXT' : 'PREV';
          if(result==='NEXT'){
            if( !$('#section1 .slide-wrap').is(':animated') ){
              nextCount();
            }
          }
          if(result==='PREV'){
            if( !$('#section1 .slide-wrap').is(':animated') ){
              prevCount();
            }
          }
          mouseDown = false;
        },
        touchmove: function(e){    //==== mousemove
          if(!mouseDown) return;
          dragEnd = e.originalEvent.changedTouches[0].clientX;
          $('#section1 .slide-wrap').css({left: dragEnd - dragStart });
        }

      });


    }
    section2(){

      //스크롤 이벤트
      //섹션2번이 노출되면 패럴럭스 구현 추가 클래스로!
      const sec2Top = $('#section2').offset().top-$(window).height();  // 각 섹션탑값에서 현재창 높이를 빼면 0보다 큰 양수가 됨 
      $(window).scroll(function(){
        if($(window).scrollTop() > sec2Top ){  
          $('#section2').addClass('sec2Ani');
          return;
        }

        if($(window).scrollTop()===0){
          $('#section2').removeClass('sec2Ani');
          return;
        }

      });
    }
    section3(){
      
      //스크롤 이벤트 
      const sec3Top = $('#section3').offset().top - $(window).height();

      $(window).scroll(function(){
        if( $(window).scrollTop() > sec3Top ){
          $('#section3').addClass('sec3Ani');
          return; 
        }
        if($(window).scrollTop()===0){
          $('#section3').removeClass('sec3Ani');
          return;
        }
      });

    }
    section4(){
      
      //갤러리버튼 클릭 이벤트
      // 클릭시 갤러리 이미지 재배치
      //새로고침 발생 삭제 
      //idx 는 버튼 클릭 번호를 저장하는 섹션4 내부의 전역변수

      let idx = 0; //처음에 화면 8개 배치

      let winW =  $(window).width();
      let cols = 4; // 해상도 크기별 조건문  4 3 2 1
      let imgW = winW/cols;   //= 475.75px
      let imgH = imgW*0.8125;
      let n = $('.gallery-list').length; //갤러리의 총 갯수
      let h = $('.gallery-list.hide').length;
      let rows = Math.ceil((n-h)/cols);  


      // 스크롤 패럴럭스
      let sec4Top = $('#section4').offset().top - $(window).height();
      let scr = false;  // 섹션 4에서 버튼 누르고 스크롤 했을 때 반복을 막기 위해서 true,false 로 판별해줘야함

      $(window).scroll(function(){

        if( $(window).scrollTop() >= sec4Top ){
          if(scr===false){   
            scr = true;  // (스크롤)애니메이션 1회만 진행했다.
            $('#section4').addClass('sec4Ani');
          }

        }
        if( $(window).scrollTop()===0 ){
          scr = false;      // 스크롤 계속 반복
          $('#section4').removeClass('sec4Ani');
          return;
        }

      });


    //로딩시 한번 강제 실행
      setTimeout(galleryMain, 100);  // 로딩시 0.1초 후에 강제 실행 


      //반응형 윈도우 리사이즈
      $(window).resize(function(){
        galleryMain();
      });


      $('.gallery-btn').each(function(index){
        $(this).on({
          click: function(e){
            e.preventDefault();
            idx = index; 
            galleryMain();

            $('.gallery-btn').removeClass('on');
            $(this).addClass('on');

            $('#section4').removeClass('sec4Ani');

          }
        });
      });

      //갤러리 이미지 재배치 함수
      function galleryMain(){

         winW =  $(window).width();
         cols = 4;

          if(winW>=1280){
            cols = 4;
          }
          else if(winW>=1024){
            cols = 3;
          }
          else if(winW>=600){
            cols = 2;
          }
          else {
            cols = 1;
          }

         imgW = winW/cols; 
         imgH = imgW*0.8125;
        
        $('.gallery-list').removeClass('zoomin');
        $('.gallery-list').stop().animate({width:imgW,height:imgH}).removeClass('hide');
        $('.gallery-list .img-wrap').css({width:imgW});


        if(idx===0){    //8개

          switch(cols){
            case 4:
              $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
              $('.gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
              $('.gallery-list').eq(3).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
    
              $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
              $('.gallery-list').eq(6).show().stop().animate({left:imgW*2,top:imgH*1}, 300);
              $('.gallery-list').eq(7).show().stop().animate({left:imgW*3,top:imgH*1}, 300);
              break;
            case 3:
              $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
              $('.gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);

              $('.gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              $('.gallery-list').eq(4).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
              $('.gallery-list').eq(5).show().stop().animate({left:imgW*2,top:imgH*1}, 300);

              $('.gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
              $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*2}, 300);
              break;
            case 2:
              $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);

              $('.gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              $('.gallery-list').eq(3).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
    
              $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
              $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*2}, 300);

              $('.gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
              $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*3}, 300);
              break;

            default:
              $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              $('.gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
              $('.gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*3}, 300); 
              $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
              $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*5}, 300);
              $('.gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*6}, 300);
              $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*7}, 300);

          }
          
        }
        else if(idx===1){   //3개

          $('.gallery-list').eq(0).hide().addClass('hide');
          $('.gallery-list').eq(2).hide().addClass('hide');
          $('.gallery-list').eq(3).hide().addClass('hide');
          $('.gallery-list').eq(5).hide().addClass('hide');
          $('.gallery-list').eq(7).hide().addClass('hide');

          switch(cols){
            case 4:
              $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(4).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
              $('.gallery-list').eq(6).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
              break;
            case 3:
              $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(4).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
              $('.gallery-list').eq(6).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
              break;
            case 2:
              $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(4).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
              $('.gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              break;

            default:
              $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              $('.gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
          }


        }
        else if(idx===2){   //6개

          $('.gallery-list').eq(1).hide().addClass('hide');
          $('.gallery-list').eq(3).hide().addClass('hide');

          switch(cols){
            case 4:
              $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
              $('.gallery-list').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
              $('.gallery-list').eq(5).show().stop().animate({left:imgW*3,top:imgH*0}, 300);   
              $('.gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
              break;
            case 3:
              $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
              $('.gallery-list').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
              $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);   
              $('.gallery-list').eq(6).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
              $('.gallery-list').eq(7).show().stop().animate({left:imgW*2,top:imgH*1}, 300);
              break;
            case 2:
              $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
              $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);   
              $('.gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
              $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*2}, 300);
              break;

            default:
              $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
              $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*3}, 300);   
              $('.gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
              $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*5}, 300);
          }
          
        }
        else if(idx===3){   //4개

          $('.gallery-list').eq(6).hide().addClass('hide');
          $('.gallery-list').eq(7).hide().addClass('hide');
          $('.gallery-list').eq(3).hide().addClass('hide');
          $('.gallery-list').eq(4).hide().addClass('hide');

          switch(cols){
            case 4:
              $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
              $('.gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
              $('.gallery-list').eq(5).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
              break;
            case 3:
              $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
              $('.gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
              $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              break;
            case 2:
              $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
              $('.gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
              break;

            default:
              $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              $('.gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
              $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
          }
          
        }
        else if(idx===4){   //2개

          $('.gallery-list').eq(0).hide().addClass('hide');
          $('.gallery-list').eq(1).hide().addClass('hide');
          $('.gallery-list').eq(2).hide().addClass('hide');
          $('.gallery-list').eq(4).hide().addClass('hide');
          $('.gallery-list').eq(5).hide().addClass('hide');
          $('.gallery-list').eq(6).hide().addClass('hide');

          switch(cols){
            case 4:
              $('.gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
              break;
            case 3:
              $('.gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
              break;
            case 2:
              $('.gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
              break;

            default:
              $('.gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
          }
          
        }
        else if(idx===5){   //5개

          $('.gallery-list').eq(1).hide().addClass('hide');
          $('.gallery-list').eq(3).hide().addClass('hide');
          $('.gallery-list').eq(6).hide().addClass('hide');

          switch(cols){
            case 4:
              $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
              $('.gallery-list').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
              $('.gallery-list').eq(5).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
              $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              break;
            case 3:
              $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
              $('.gallery-list').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
              $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              $('.gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
              break;
            case 2:
              $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
              $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              $('.gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
              $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
              break;

            default:
              $('.gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
              $('.gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              $('.gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
              $('.gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
              $('.gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
          }

        }


        //갤러리 줄 수 
        // rows = Math.ceil((총갯수-hide갯수)/칸수);
        // 자신의 선택자 위치에서 찾는 함수는 hasClass()

        // hide 클래스가 몇개인지 찾기
        h = $('.gallery-list.hide').length;
        rows = Math.ceil((n-h)/cols);  // 줄수는 hide 갯수를 가져온 뒤에 높이를 정한다.
        $('.gallery-wrap').stop().animate({height:imgH*rows}, 300);

        
        //줌효과 
        $('.gallery-list').addClass('zoomin');

      }

    }
    section5(){

      // SVG 애니메이션
      // 시간과 픽셀수를 가지고 움직이는 애니메이션을 창작하는 것
      //1. SVG 원형 총(Total) 길이(Length)를 구현한다.
      //== getTotalLength 라는 명령어(함수) = svg 원형 객체의 총 길이를 px 단위로 구한다.
      // 원형 박스 선택자의 자식요소 circle 그래픽 디자인 요소

      function svgAnimation(){

        const svgObj = $('.ring-front circle');
        let svgArr = [];  // 원형 svg배열
        let piece = []; // 1마디
        let perSize = [];
        let per = [.9, .75, .9, .62];
        let second = 2; 
        let sum = [0,0,0,0];
        let setId = [0,0,0,0];


        
        $.each(svgObj, function(idx, obj){

        //1. 원형 총 길이 확인하기 
        // console.log( idx,obj, obj.getTotalLength() );   // 객체 번호(몇번 원형인지 파악하기 위해) , 원형 정보 , 해당 원형의 총 길이(stroke)
        svgArr[idx] = obj.getTotalLength();

        //2. 각 요소의 전체길이 대입 (4개) = 초기설정
        $(obj).css( {strokeDasharray : svgArr[idx] });
        $(obj).css( {strokeDashoffset : svgArr[idx] });

        //3. 각 요소의 퍼센트 길이 구하기
        perSize[idx] = svgArr[idx] * per[idx];  


        //4. 각 요소의 토막(마디)의 길이 구하기
        piece[idx] = (perSize[idx]/second)/100;  //1초를 100으로 나눈 값 (0.01초당)= 더 빨리 움직이게하기 위해

        //5. 각 마디를 카운트 = 타이머 이용 
        function sumfn(){
          sum[idx] += piece[idx];
          if(sum[idx] > perSize[idx]){
            clearInterval(setId[idx]);
          }
          else{
            $(obj).css({ strokeDashoffset: svgArr[idx] - sum[idx] });
            $('.count-num').eq(idx).html( Math.ceil(sum[idx]/svgArr[idx]*100) + '%' );
          }
          
        }

        //6. 애니메이션 구현


        //7. 타이머 설정
        setId[idx] = setInterval(sumfn, 10);


        });


      }

       // 스크롤 패럴럭스
       let sec5Top = $('#section5').offset().top - $(window).height();
       let t = false; 
      
       $(window).scroll(function(){
      
         if( $(window).scrollTop() >= sec5Top ){
           if(t===false){   
             t = true;  // (스크롤)애니메이션 1회만 진행했다.
             $('#section5').addClass('sec5AniScr');
             svgAnimation();
           }
         
         }
         if( $(window).scrollTop()===0 ){
           t = false;      // 스크롤 계속 반복
           $('#section5').removeClass('sec5AniScr');
         }

     });
      
    }
    section6(){
      
      let sec6Top = $('#section6').offset().top - $(window).height();
      let t = false;

      $(window).scroll(function(){
        if( $(window).scrollTop() > sec6Top ){
          if(t===false){
            t = true;
            $('#section6').addClass('sec6Ani');
          }
        }
        if( $(window).scrollTop()===0 ){
          t = false;
          $('#section6').removeClass('sec6Ani');
        }
      });

    }
    section7(){
      let winH = $(window).height()
      let sec7Top = $('#section7').offset().top - winH;
      let t = false;

      $(window).scroll(function(){
        if($(window).scrollTop() > sec7Top ){
          if(t===false){
            t = true;
            $('#section7').addClass('sec7Ani');
          }
        }
        if($(window).scrollTop()===0){
          t = false;
          $('#section7').removeClass('sec7Ani');
        }
      });
    }
    section8(){
      
      let winH = $(window).height()
      let sec8Top = $('#section8').offset().top - winH;
      let t = false;

      $(window).scroll(function(){
        if($(window).scrollTop() > sec8Top ){
          if(t===false){
            t = true;
            $('#section8').addClass('sec8Ani');
          }
        }
        if($(window).scrollTop()===0){
          t = false;
          $('#section8').removeClass('sec8Ani');
        }
      });
      
    }
    section9(){

      let winH = $(window).height()
      let sec9Top = $('#section9').offset().top - winH;
      let t = false;

      $(window).scroll(function(){
        if($(window).scrollTop() > sec9Top ){
          if(t===false){
            t = true;
            $('#section9').addClass('sec9Ani');
          }
        }
        if($(window).scrollTop()===0){
          t = false;
          $('#section9').removeClass('sec9Ani');
        }
      });
      
    }
    footer(){
      
    }

    //===================================================================



    quick(){

      let quickTop = ($(window).height() - $('#quickBox').height() )/2-200;

      $(window).scroll(function(){
        $('#quickBox').stop().animate({top: quickTop + $(window).scrollTop() }, 300, 'easeOutQuad');
      });
    }

    goTop(){
      $(window).scroll(function(){
        if($(window).scrollTop() > 100){
          $('#goTopBox').stop().fadeIn(300);
        } 
        else{
          $('#goTopBox').stop().fadeOut(300);
        }     
      });

      $('.goTop-btn').on({
        click: function(){
          $('html, body').stop().animate({scrollTop:0}, 600);
        }
      });


    }




  }
  const newPofo = new Pofo();  // 객체 임의로 생성한 후 아래에 변수.init 으로 만들어줌

  newPofo.init();

})(jQuery);