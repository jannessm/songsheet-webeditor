<!DOCTYPE html>
<html>

<head>
    <!-- for FF, Chrome, Opera -->
    <link rel="icon" type="image/png" href="./asset/logo-16.png" sizes="16x16">
    <link rel="icon" type="image/png" href="./asset/logo-32.png" sizes="32x32">

    <!-- for IE -->
    <link rel="icon" type="image/x-icon" href="./asset/logo.ico">
    <link rel="shortcut icon" type="image/x-icon" href="./asset/logo.ico" />

    <title>B.and Songsheet Editor</title>

    <!-- Load Styles -->
    <link rel="stylesheet" type="text/css" href="./styles/style.css">
    <link rel="stylesheet" type="text/css" href="./styles/buttons.css">
    <link rel="stylesheet" type="text/css" href="./styles/wysiwyg.css">
    <link rel="stylesheet" type="text/css" href="./styles/scrollbar.css">
    <link rel="stylesheet" type="text/css" href="./styles/standart-elements.css">
    <link rel="stylesheet" type="text/css" href="styles/fonts/fonts.css">


    <!-- Load scripts -->
    <script src="./script/wysiwyg.js" type="text/javascript"></script>
    <script src="./script/utils.js" type="text/javascript"></script>
</head>

<body>

<!-- Preview Section -->
<section class="section--preview" style="width: 100% !important;height: 100% !important" onclick="eval_click(event)">
    <div id="previewRenderer" style="margin: 10px 30px;" class="full-page"></div>
    <div id="help" style="opacity: 0;"></div>
</section>
<footer><b><span style="float: right">created By Jannes Magnusson, Niels Rösel</span></b> v1.0.3</footer>

<script type="text/javascript">
    let songJson;

    document.body.onkeydown = function(event){
        if(event.keyCode === 39 || event.keyCode === 40)
            scroll_down();
        else if(event.keyCode === 37 || event.keyCode === 38)
            scroll_up();
    };

    function preview() {
        generate(false);
        let wysiwyg = new Wysiwyg(true);
        let prev = wysiwyg.convert(songJson);
        document.getElementById("previewRenderer").innerHTML = prev;
    }

    async function update(){
        while(true){
            callAjax('/get_tmp.php?filename=<?php echo $_GET['id'];?>', function(res){
               document.getElementById("previewRenderer").innerHTML = res;
            });
            await sleep(1000);
        }
    }
    function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function scroll_up(){
        let height = (document.getElementsByClassName('section--preview')[0]).offsetHeight * 0.75;
        scrollTo(document.getElementsByClassName('section--preview')[0],
            (document.getElementsByClassName('section--preview')[0]).scrollTop - height,
            400);
    }
    function scroll_down(){
        let height = (document.getElementsByClassName('section--preview')[0]).offsetHeight * 0.75;
        scrollTo(document.getElementsByClassName('section--preview')[0],
            (document.getElementsByClassName('section--preview')[0]).scrollTop + height,
            400);
    }
    function eval_click(e){
        let total_width = (document.getElementsByClassName('section--preview')[0]).offsetWidth;
        if(e.clientX < total_width/2)
            scroll_up();
        else
            scroll_down();
    }

    function scrollTo(element, to, duration) {
        let start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;

        let animateScroll = function(){
            currentTime += increment;
            let val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }

    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    update();
</script>
</body>

</html>