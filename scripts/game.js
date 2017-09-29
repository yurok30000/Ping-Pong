function game() {

    var score = {
        pA: 0,
        pB: 0,
        update: function () {
            $("#score > p").text(score.pA + ':' + score.pB)
        }
    }

    $("<div/>").attr("id", "content").appendTo("body");
    $("<div/>").attr("id", "game").appendTo("#content");
    $("<div/>").attr("id", "paddleA").appendTo("#game");
    $("<div/>").attr("id", "paddleB").appendTo("#game");
    $("<div/>").attr("id", "ball").appendTo("#game");
    $('<div/>').attr('id', 'score').append(
        $("<p/>").css({
            "text-align": "center",
            "font-size": "large"
        }
        ).text(score.pA + ':' + score.pB)
    ).appendTo('#game');

    var ball = {
        speed: 3,
        x: 290,
        y: 140,
        directionX: 1,
        directionY: 1
    };

    var pA = {
        speed: 3,
        x1: $("#paddleA").position().left,
        x2: $("#paddleA").position().left + $("#paddleA").width(),
        y1: $("#paddleA").position().top,
        y2: $("#paddleA").position().top + $("#paddleA").height(),
        update: function () {
            this.y1 = $("#paddleA").position().top;
            this.y2 = this.y1 + $("#paddleA").height();
        }
    };

    var pB = {
        speed: 3,
        x1: $("#paddleB").position().left,
        x2: $("#paddleB").position().left + $("#paddleB").width(),
        y1: $("#paddleB").position().top,
        y2: $("#paddleB").position().top + $("#paddleB").height(),
        update: function () {
            this.y1 = $("#paddleB").position().top;
            this.y2 = this.y1 + $("#paddleB").height();
        }
    };



    var directions = {};
    var speed = 4;

    paddleA = $("#paddleA");
    paddleB = $("#paddleB");

    $('html').keyup(stop).keydown(charMovement);

    function charMovement(e) {
        directions[e.which] = true;
        //  console.log(directions)
    }

    function stop(e) {
        delete directions[e.which];
        //   console.log(directions)
    }

    function moveA(e) {
        for (var i in directions) {

            if (paddleA.position().top > 0 && i == 87) {
                paddleA.css("top", (paddleA.position().top - speed) + "px");
            }

            if (paddleA.position().top < ($("#game").height() - paddleA.height()) && i == 83) {
                paddleA.css("top", (paddleA.position().top + speed) + "px");
            }
        }
        pA.update();
    }

    function moveB(e) {
        for (var i in directions) {

            if (paddleB.position().top > 0 && i == 38) {
                paddleB.css("top", (paddleB.position().top - speed) + "px");
            }

            if (paddleB.position().top < ($("#game").height() - paddleB.height()) && i == 40) {
                paddleB.css("top", (paddleB.position().top + speed) + "px");
            }
        }
        pB.update();
    }

    var pauseBall = false;

    // Control movement of the ball doing collision checking
    function moveBall() {
        var gameWidth = parseInt($("#game").width());
        var gameHeight = parseInt($("#game").height());

        if (pauseBall) return;




        // Check collision to the bottom border and change the moving orientation on Y axis
        if (ball.y + ball.speed * ball.directionY > (gameHeight - parseInt($("#ball").height()))) {
            ball.directionY = -1
        }

        // Check collision to the top border and change the moving orientation on Y axis
        if (ball.y + ball.speed * ball.directionY < 0) {
            ball.directionY = 1
        }

        // Check collision to the left border and change the moving orientation on X axis
        if (ball.x + ball.speed * ball.directionX > (gameWidth - parseInt($("#ball").width()))) {
            ball.directionX = -1
            ball.x = 290;
            ball.y = 140;
            pauseBall = true;

            score.pA = score.pA + 1
            console.log('score:', score)
            score.update();


            $('#ball').animate({ "left": ball.x, "top": ball.y }, 2000, function () { pauseBall = false; });
            return;
        }

        // Check collision to the right border and change the moving orientation on X axis
        if (ball.x + ball.speed * ball.directionX < 0) {
            ball.directionX = 1
            ball.x = 290;
            ball.y = 140;
            pauseBall = true;

            score.pB = score.pB + 1
            console.log('score:', score)
            score.update();

            $('#ball').animate({ "left": ball.x, "top": ball.y }, 2000, function () { pauseBall = false; });
            return;

        }

        if (
            ball.x + ball.speed * ball.directionX < pA.x2 &&
            ball.y + ball.speed * ball.directionY > pA.y1 &&
            ball.y + ball.speed * ball.directionY < pA.y2
        ) {
            ball.directionX = 1


        }

        if (
            ball.x + ball.speed * ball.directionX > pB.x1 &&
            ball.y + ball.speed * ball.directionY > pB.y1 &&
            ball.y + ball.speed * ball.directionY < pB.y2
        ) {
            ball.directionX = -1

        }

        // Update ball position on X and Y axes based on speed and orientation
        ball.x += ball.speed * ball.directionX;
        ball.y += ball.speed * ball.directionY;
        //ball.y = 140;

        // Render the updated ball position
        $("#ball").css({ "left": ball.x, "top": ball.y });
    }



    setInterval(function () {
        moveBall();
        moveA();
        moveB();
    }, 15);

}