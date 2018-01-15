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
    <link rel="stylesheet" type="text/css" href="./styles/fonts.css">


    <!-- Load scripts -->
    <script src="./script/wysiwyg.js" type="text/javascript"></script>
    <script src="./script/utils.js" type="text/javascript"></script>
</head>

<body>

<!-- Preview Section -->
<section class="section--preview" style="width: 100% !important;height: 100% !important">
    <div id="previewRenderer" style="margin: 10px 30px;" class="full-page"></div>
    <div id="help" style="opacity: 0;"></div>
</section>
<footer><b><span style="float: right">created By Jannes Magnusson, Niels Rösel</span></b> v1.0.3</footer>

<script type="text/javascript">
    let songJson;

    function preview() {
        generate(false);
        let wysiwyg = new Wysiwyg(true);
        let prev = wysiwyg.convert(songJson);
        document.getElementById("previewRenderer").innerHTML = prev;
    }

    async function update(){
        while(true){
            callAjax('/get_tmp.php?filename=<?php echo $_GET['id'];?>', function(res){
                console.log(res);
               document.getElementById("previewRenderer").innerHTML = res;
            });
            await sleep(1000);
        }
    }
    function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    update();
</script>
</body>

</html>