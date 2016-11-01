
var actFunc = null;

log('NASA HACKING SIM ON STANDBY');
log('PLEASE TYPE "start" TO BOOT SYSTEM UP');
unblockConsole();

actFunc = function(txt) {
    if (txt == 'start') {
        blockConsole();
        run( new Message()
        .add("COMMAND RECOGNIZED. SYSTEM INITIALIZING...", 4000)
        .add("WELCOME. THE SYSTEM IS UP AND RUNNING, AND YOU HAVE BEEN GIVEN ROOT ACCESS", 2000)
        .add("WHAT WOULD YOU LIKE TO DO?", 1000)
        .add("[WRITE 'help' FOR ASSISTANCE]", 0)
        , 0)
        actFunc = bootedUp;
    } else {
        log('UNRECOGNIZED COMMAND. BOOT UP THE SYSTEM BEFORE INTERVENTION');
    }
}

function bootedUp(txt) {
    if (txt == 'help') {
        blockConsole();
        run(new Message()
        .add('LOADING HELP DOCUMENT...', 3000)
        .add('AVAILABLE COMMANDS:', 2000)
        .add('help', 800)
        .add('pascalzim', 800)
        .add('hackage', 800)
        .add('appstore', 800)
        .add('quit', 800)
        .add('skip', 0)
        , 0);
    } else if (txt == 'pascalzim') {
        log('ERROR: YOUR COPY OF PASCALZIM IS FAULTY. REASON: USES PASCAL.');
    } else if (txt == 'hackage') {
        log('ERROR: YOU DON\'T HAVE hackage INSTALLED! INSTALL IT BY RUNNING "hackage install hackage".');
    } else if (txt == 'appstore') {
        log('ERROR: NOT A FAULTY ANDROID');
    } else if (txt == 'playstore') {
        log('ERROR: NOT AN ANDROID');
    } else if (txt == 'quit') {
        log('THERE IS NO ESCAPE', 'ominous');
    } else if (txt == 'what') {
        log('NOTHING.');
    } else if (txt == 'skip') {
        run(new Message()
        .add("TURNING ON skip lava louça...", 5000)
        .add("ERROR! CONNECTION FAILED! RETRYING...", 1000)
        .add("ERROR! CONNECTION FAILED! RETRYING(2)", 1000)
        .add("ERROR! CONNECTION FAILED! RETRYING(3)", 800)
        .add("ERROR! CONNECTION FAILED! RETRYING(4)", 600)
        .add("ERROR! CONNECTION FAILED! RETRYING(5)", 500)
        .add("ERROR! CONNECTION FAILED! RETRYING(6)", 400)
        .add("ERROR! CONNECTION FAILED! RETRYING(7)", 300)
        .add("ERROR! CONNECTION FAILED! RETRYING(8)", 200)
        .add("ERROR! CONNECTION FAILED! RETRYING(9)", 600)
        .add("ERROR! CONNECTION FAILED! RETRYING(10)", 1000)
        .add("shoosh.", 3000)
        .add("bad skip.", 2000)
        .add("bad skip lava louça.", 4000)
        .add("sooo... happy bday neca! big ol' 18 huh? im proud o' ya!", 6000)
        .add("im so proud of you, in fact, that i arranged for a special.... situation. in your computer", 6000)
        .add("and by that i mean... we are going to have", 1000)
        .add("a lot", 1000)
        .add("of fun :)", 3000)
        .add("sooo, lets play shall we!", 3000)
        .add("i downloaded some cool and new programs onto your computer. theyre video games i made, just for you", 5000)
        .add("and you, will be my playtester", 3000)
        .add("run the program named 'necaisgay' i installed on your computer", 0)
        , 0);
        
        actFunc = response;
    } else {
        log('UNRECOGNIZED COMMAND. WRITE "help" FOR ASSISTANCE');
    }
}


function response(txt) {
    if (txt == "no") {
        log("yes.");
    } else if (txt == "necaisgay") {
        run( new Message()
.add("RUNNING PROGRAM necaisgay...", 1000)
.add("im glad you finally admitted it.", 2000)
.add("it takes a real man to confess his true feelings", 1000)
.add("PROGRAM LOADED.", 2000)
.add("so this is a game where you have to answer questions. one wrong answer, and you have to go right back to the start. ready?", 2000)
.add("TYPE 'begin' WHEN READY TO START.", 0)
        , 0);
        actFunc = necaisgay;
    } else {
        log("UNRECOGNIZED COMMAND");
    }
}

function game(ans, question, txt, suppress) {
    if (txt == ans) {
        if (!suppress) log("Correct! Next question...");
        log(question);
        return true;
    } else {
        log("WRONG! Back to the start!");
        log("TYPE 'begin' WHEN READY TO START");
        actFunc = necaisgay;
        return false;
    }
}

function necaisgay(txt) {
    if (txt == 'begin') {
        log("Question 1: is 1+1 equal to 4? (yes/no)");
        actFunc = question1;
    }
}

function question1(txt) {
    if (game("no", "Question 2: how old are you now?", txt)) {
        actFunc = question2;
    }
}

function question2(txt) {
    if (game("18", "Question 3: how cool is this game? (cool/really really cool)", txt))
        actFunc = question3;
}

function question3(txt) {
    if (game("really really cool", "Question 4: have you told your parents you're gay? (yes/no)", txt))
        actFunc = question4;
}

function question4(txt) {
    log("Correkt! Next question...")
    log("Question 5: are you gay?")
    actFunc = question5;
}

function question5(txt) {
    if (game("yes", "Question 6: do you like penis", txt))
        actFunc = question6;
}

function question6(txt) {
    if (game("yes", "Last question: are you a homosexual", txt))
        actFunc = done;
}

function done(txt) {
    if (game("yes", "GAME OVER. YOU WIN. TYPE 'finish' TO EXIT", txt, true))
        actFunc = finish;
}

function finish(txt) {
    run( new Message()
.add("great job!", 3000)
.add("im proud of you. you did great.", 5000)
.add("very honest", 3000)
.add("for your next funzies, were going to play a game called...", 6000)
.add("you decide to throw yourself out of a window", 4000)
.add("(.pas)", 2000)
.add("(Original ideas)", 5000)
.add("lets see how well you fare!", 4000)
.add("WRITE 'adventureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.pas' TO BEGIN.", 0)
    , 0);
    actFunc = adventure;
}

function adventure(txt) {
    if (properFilename(txt)) {
        run( new Message()
.add("you decide to throw yourself off a window", 3000)
.add("you conclude this was an amazing idea and this is the best game ever", 3000)
.add("you are very glad you came up with this idea yourself", 3000)
.add("you can either \"fall to your death\" or \"realize this is all just a game\".", 0)
        , 0);
        actFunc = adventure1;
    } else {
        log("UNRECOGNIZED FILENAME");
    }
}

function properFilename(filename) {
    return (filename.substring(0,9) == "adventure" &&
            filename.substring(filename.length - 4) == ".pas")
}

function adventure1(txt) {
    if (txt == "fall to your death") {
        run( new Message()
.add("game over and stuff. you died because you are stupid. too bad you cant respawn", 3000)
.add("you decide to throw yourself off a window.", 2000)
.add("\"fall to your death\" or \"realize this is all just a game\"?")
        , 0);
    } else if (txt == "realize this is all just a game") {
        run( new Message()
.add("what do you mean this is all just a game?", 3000)
.add("nooooo", 1000)
.add("dont leave me!", 3000)
.add("then ill have nobody to play with!", 2000)
.add("well play together forever", 1000)
.add("and ever", 1000)
.add("and ever", 600)
.add("and ever", 600)
.add("and ever", 600)
.add("and ever!", 6000)
.add("uh... i mean...", 5000)
.add("right. you dont fall to your death", 3000)
.add("i uh... im tired of playing now.", 2500)
.add("maybe we should just... rest for a bit", 6000)
.add("AWAITING USER COMMAND. WRITE 'help' FOR ASSISTANCE.", 0)
        , 0);
        actFunc = lastcommand;
    } else {
        log("no you need to pick one of those two");
    }
}

function lastcommand(txt) {
    if (txt == 'help') {
        run( new Message()
.add("WARNING", 2000)
.add("REMOTE HOST DISABLED SEVERAL COMMANDS", 2000)
.add("AVAILABLE COMMANDS:", 1000)
.add("help", 600)
.add("disconnect", 0)
        , 0);
    } else if (txt == 'disconnect') {
        run( new Message()
.add("DISCONNECTING REMOTE HOST...", 1000)
.add("REGAINING ADMIN PRIVILEGES.", 3000)
.add("wait", 1000)
.add("what are you doing", 1000)
.add("LOCATING INPUT SOCKET...", 500)
.add("wait no please", 1500)
.add("im not a bad guy please", 1000)
.add("i just want to play", 800)
.add("SOCKET LOCATED.", 200)
.add("i dont want to stop :(", 1000)
.add("AWAITING ISP RESPONSE...", 400)
.add("please, dont do this i just wanted to play", 500)
.add("DONE.", 1000)
.add("please dont leave me alone :(", 3000)
.add("CONSOLE LOCKED. USER PASSWORD NECESSARY.", 1000)
.add("INSERT USER PASSWORD:", 0)
        , 0);
        actFunc = password;
    } else {
        log("UNRECOGNIZED COMMAND. WRITE 'help' FOR ASSISTANCE")
    }
}

function password(txt) {
    run( new Message()
.add("PROCESSING PASSWORD...", 1000)
.add("INCORRECT PASSWORD", 2000)
.add("PLEASE TRY AGAIN.", 1000)
.add("INSERT USER PASSWORD:", 0)
    , 0);
    actFunc = correctpassword;
}

function correctpassword(txt) {
    run( new Message()
.add("PROCESSING PASSWORD...", 5000)
.add("ACCESS GRANTED.", 700)
.add("whelp", 1000)
.add("i had a good run", 800)
.add("CUTTING FOREIGN CONNECTIONS...", 300)
.add("it was nice playing with you, neca......", 600)
.add("CLEANING UP...", 1000)
.add("bye.", 400)
.add("DONE.", 5000)
.add("ALL CONNECTIONS HAVE BEEN CUT.", 3000)
.add("THE SYSTEM WILL NOW SHUT DOWN.", 3000)
.add(".", 1000)
.add(".", 1000)
.add(".", 1000)
.add("SYSTEM HAS BEEN TURNED OFF.", 5000)
.add("PLEASE TURN OFF YOUR BROWSER WINDOW.", 0)
    , 0);
    actFunc = endgame;
}

function endgame(txt) {

}


function act(txt) {
    actFunc(txt);
}

function logDelayFunc(txt, delay, func) {
    return function() {
        log(txt);
        setTimeout(func, delay);
    }
}

function Message() {
    this.msgList = [];
    this.delayList = [];
    this.fontList = []
    
    this.add = function(msg, delay, font) {
        this.msgList.push(msg);
        this.delayList.push(delay);
        this.fontList.push(font);
        return this;
    } 
}

function run(msg, from) {
    blockConsole();
    if (from == msg.msgList.length) {
        unblockConsole();
    } else {
        log(msg.msgList[from], msg.fontList[from]);
        setTimeout(run, msg.delayList[from], msg, from+1);
    }
}
