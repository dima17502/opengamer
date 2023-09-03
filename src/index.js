
/*
        специальные эффекты: бессмертие на 10 сек, замедляют или ускоряют ракеты
        эффекты падают, держатся на земле 5 секунд и исчезают
        на 2 уровне от ракет остается радиоактивные пепел и надо держаться в воздухе, эффект можно выйти за рамки игры
        у геймера есть джетпак
        ракеты появляются, держатся 3 секунды потом падают
        Описание: тренируйте реакцию, уворачивайтесь от ракет как можно дольше
        сложность должна увеличиваться 

        - режим мирный атом
        - выживание
        - подвисает полет бонусов раз в секунду
        - player реагирует на нажатие клавиши с лагом
        - не работает перемещения игрока по клику
        - 3 ошибки в мирном режиме
        - сделать 3 уровня в режиме выживания 1 2 3 меняется только mis_gen_speed 323 283 223-easy 173- middle 149 -- hard проходимо
        -- insane 139 легкий, средний, тяжелый, безумный, пользовательский открывается после тяжелого
        следующий уровень открывает только после прохождения первого



        Допилить
        - 

        -научиться делать куки, и загружаться из кук пользователя сохраняя результаты
        - после "пробуем еще?" нужно добавить кнопку в Меню, дизайн взять с элемента yessure

      -  ракеты подвисают пизда
      -анимация отображается во время а не после рекламы

*/
import bridge from '@vkontakte/vk-bridge';
bridge.send("VKWebAppInit", {});

var gf_color = "#fff";
var info_width = 650;
var info_height = "auto";
var start_mt_bonus = -40;
var start_mt_missile = -100;
var bonus_width = 40;       //40*40
var bonus_height = 40;
var bonus_counter = 0;
var game_status = 0;
var x1 = 0;
var x2 = x1 + player_width;
var y1 = 0;
var y2 = y1 + player_height;
var player_active = 0;
var max_missiles = 18;
var max_bonuses = 17;
var free_bonuses = [];
var free_missiles = [];
var active_bonuses = {};
var missile_active = {};
var secs = 0;
var clock_id = 0;
var bonus_dict = {};
var missile_dict = {};
var moves = 0;
var missile_speed = 20;
var missile_step = 2;
var dif_param = 3;
var bonus_step = 1;
var bonus_init_id = 0;
var missile_init_id = 0;
var bon_gen_speed = 709;
var bon_move_speed = 11;
var mis_gen_speed = 139;
var mis_move_speed = 11;
var date = new Date();
var date2 = 1;
var date3 = 0;
var date4 = 1;
var player_mt0 = 595;
var created_bonuses = 50;
var created_missiles = 100;
var ad_time = 5000;
var player_width = 80;
var player_height = 106;
var gf_width = 700;
var gf_height = 700;
var missile_width = 39;
var missile_height = 100;
var music_width = 60;
var music_height = 60;
var page_width = 400;
var page_height = 300;
var levels_width = 400;
var levels_height = 400;
var warning_width = 400;
var warning_height = 200;
var win_bar_width = 400;
var win_bar_height = 160;
var custom_menu_width = 400;
var custom_menu_height = 300;
var sure_width = 400;
var sure_height = 150;
var available_lvl = 1;
var regime = 0;
var peaceful_mode = 0;
var zero_atoms = 0;
var level_dict = {"easy": 1, "peasy":1, "medium":2,"pmedium":2, "hard":3, "phard":3, "custom":4, "pcustom":4};
var num_to_level = {1:"easy", 2:"medium", 3:"hard", 4:"custom"};
var level_options = {1: 423, 2:173, 3:149};
var plevel_options = {1: 332, 2:267, 3:233};
var current_lvl = 1;
var win_time = 60;
var pause_width = 60;
var pause_height = 60;
var home_width =   62;
var home_height = 62;
var heart_width = 56;       // 35 * 28
var heart_height = 48;
var text_60sec = "Продержитесь 60 секунд уворачиваясь от ракет \n Управление перетаскиванием персонажа /стрелками' / зажатым курсором или пальцем. \nПауза - пробел \nУдачи!";
var text_peaceful = "Ловите атомы в течение минуты, до того как они упадут на землю. \nУ вас 3 жизни. \nУправление зажатым курсором, пальцем, клавишами 'wasd'. \nПауза - пробел. Удачи!";
var player_lifes = 3;
var peaceful_available = 1;
var temp_lvl = 1;
var star_width = 40;
var star_height = 40;
var gray_path_value = "url('./images/star_icon_gray2.svg')";
var gold_path_value = "url('./images/star_icon3.svg')";
var change1_id = 0;
var change2_id = 0;
var change3_id = 0;
var music_on = 1;
var last_song = './audios/main_theme.mp3';
var ad_width = 890;
var ad_height = 600;
var mobile_mode = 0;
var x = window.matchMedia("(max-width: 700px)");
var s_width = window.innerWidth;            // 360 * 736
var s_height = window.innerHeight;
//alert([s_width, s_height]);
if(s_width < 900)
    mobile_mode = 1;
var vk_width = s_width;
var vk_height = s_height;
if(mobile_mode == 0)
{
    vk_width = 900;
    vk_height = 750;
}
var coef_x = parseFloat(parseInt(vk_width)  / 900);
var coef_y = parseFloat(parseInt(vk_height)  / 750);
var star_dict = {1:0,2:0,3:0, 4:0};
var open_levels = {1:1,2:0, 3:0, 4:0};
var open_plevels = {1:1, 2:0, 3:0, 4:0};
var cookie_lifetime = 8640000;
var level_colors = ["#3e7","#39f","#e37","orange"];
var ac_token = "";
main();


function main()
{
    date3 = new Date();
    //get_access_token();

    adaptate();
    set_area();                 //
    create_ad_warning();

    create_main_page();         //
    
    create_level_page();        //
    create_plevel_page();       //
    create_warning();           
    
    create_start_and_info();    //
    create_game_field();        //
    create_clock();             //
    create_bonus_bar();         //
    create_player();            //
    create_missiles();          
    create_bonuses();
    create_lose_bar();
    create_win_bar();
    create_custom_menu();
    create_pause_button();
    create_home_button();
    create_sure_bar();
    create_lifes_bar();         
    create_stars();             //
    create_audio_button();      //
    check_ad();
    //deleteCookie("opengamer");
    //update_cookies();
    get_cookies();
    update_levels();
}




function get_cookies()
{
    var success = 0;
    var cookie;
    const promise1 = bridge.send('VKWebAppStorageGet', {
        keys: [
          'opengamer'
        ]})
        .then((data) => { 
          if (data.keys) {
             cookie = data.keys[0].value;
             alert(cookie);
             alert(Object.values(data.keys[0]));
             alert(Object.keys(data.keys[0]));

            if(cookie)
            {
                alert(1);

                for(var i = 0; i < 4; i++)
                {
                    open_levels[i + 1] = parseInt(cookie[i]);
                    if(open_levels[i+1] == 1)
                        available_lvl = i%4 + 1;
                }
                for(var i = 4; i < 8; i++)
                {
                    open_plevels[i % 4 + 1] = parseInt(cookie[i]);
                    if(open_plevels[i%4+1] == 1)
                        peaceful_available = i%4 + 1;
                }
                for(var i = 8; i < 12; i++)
                    star_dict[i%4 + 1] = parseInt(cookie[i]);
            }
            else
            {
                open_levels = {1:1,2:0, 3:0, 4:0};
                open_plevels = {1:1, 2:0, 3:0, 4:0};
                star_dict = {1:0,2:0,3:0, 4:0};
            }
           success = 1;
          }
        })
        .catch((error) => {
            //alert(2);
           
           
           
        });
        alert([Object.values(open_levels), Object.values(open_plevels)]);


    /*
    var cookie = localStorage.getItem("opengamer");
    //localStorage.removeItem("opengamer");
    if(cookie)
    {
        for(var i = 0; i < 4; i++)
        {
            open_levels[i + 1] = parseInt(cookie[i]);
            if(open_levels[i+1] == 1)
                available_lvl = i%4 + 1;
        }
        for(var i = 4; i < 8; i++)
        {
            open_plevels[i % 4 + 1] = parseInt(cookie[i]);
            if(open_plevels[i%4+1] == 1)
                peaceful_available = i%4 + 1;
        }
        for(var i = 8; i < 12; i++)
            star_dict[i%4 + 1] = parseInt(cookie[i]);
    }
    else
    {
        open_levels = {1:1,2:0, 3:0, 4:0};
        open_plevels = {1:1, 2:0, 3:0, 4:0};
        star_dict = {1:0,2:0,3:0, 4:0};
    }
    */
  // alert(promise1.keys[0]['value']);
}

function update_cookies()
{
    // level plevel stars
    var cookies = "";
    for(var i in open_levels)
        cookies += open_levels[i].toString();
    for(var i in open_plevels)
        cookies += open_plevels[i].toString();
    for(var i in star_dict)
        cookies += star_dict[i].toString();

    //localStorage.setItem("opengamer", cookies);
    bridge.send('VKWebAppStorageSet', {
        key: 'opengamer',
        value: cookies
       })
       .then((data) => { 
         if (data.result) {
           // Значение переменной задано
         }
       })
       .catch((error) => {
         // Ошибка
         console.log(error);
       });
}
function adaptate()
{
    //alert([s_width, s_height]);

    if(s_width < 800)
    {
        mobile_mode = 1;
        
    }
    else
    {
    
    }
}


function create_ad_warning()
{
    const adlem = document.createElement("div");
    adlem.id = "adWarning";
    adlem.style.position = "absolute";
    adlem.style.background = "url('./images/cat_warning.jpg')";
    //alert(adlem.style.background);
    adlem.style.border = "3px solid black";
    adlem.style.width = ad_width + "px";
    adlem.style.height = ad_height + "px";
    adlem.style.marginTop = "100px";
    adlem.style.display = "none";
    adlem.style.zIndex = "1000";
    const wind = document.getElementById("window");
    wind.appendChild(adlem);
    wind.style.overflow = "hidden";
}

function create_audio_button()
{
    const home = document.getElementById("homeBtn");
    //alert(home.id);
    const audio = document.createElement("audio");
    audio.id = "audio";
    audio.setAttribute('src', './audios/main_theme.mp3');
    audio.loop = true;
    const music = document.createElement("div");
    music.id = "music";
    music.style.position = "absolute";
    music.style.width = parseInt(music_width*(coef_x+ coef_y)/2) + "px";
    music.style.height = parseInt(music_height*(coef_x+ coef_y)/2) + "px";
    music.style.background = "url('./images/music_on2.svg')";
    music.style.backgroundSize = "cover";
    music.style.backgroundRepeat = "no-repeat";
    //music.style.borderRadius = "50%";
    music.style.marginLeft = (vk_width - parseInt(music.style.width) - parseInt(coef_x * 10)) + "px";
    music.style.marginTop =  (parseInt(home.style.marginTop) - parseInt(1.5 * parseInt(music.style.height))) + "px";
    music.style.opacity = "0.8";
    music.onclick = music_clicked;
    music.onmouseover = mouse_over_music;
    music.onmouseout = mouse_out_music;
    const wind = document.getElementById("window");
    wind.appendChild(audio);
    wind.appendChild(music);
    audio.play();
}

function mouse_over_music(event)
{
    const music = event.target;
    music.style.opacity = "1";
    music.style.cursor = "pointer";
}

function mouse_out_music(event)
{
    const music = event.target;
    music.style.opacity = "0.8";
    music.style.cursor = "default";
}

function music_clicked()
{
    const music = document.getElementById("music");
    const audio = document.getElementById("audio");
    if(music_on == 1)
    {
        music_on = 0;
        audio.pause();
        music.style.background = "url('./images/music_off2.svg')";
        music.style.backgroundSize = "cover";
        music.style.backgroundRepeat = "no-repeat";
    }
    else
    {
        music_on = 1;
        music.style.background = "url('./images/music_on2.svg')";
        music.style.backgroundSize = "cover";
        music.style.backgroundRepeat = "no-repeat";
        audio.setAttribute('src', last_song);
        audio.loop = "true";
        audio.play();
    }
}
function set_main_theme()
{
        const audio = document.getElementById("audio");
        audio.setAttribute('src', './audios/main_theme.mp3');
        last_song = './audios/main_theme.mp3';
        audio.currentTime = 0;
        if(music_on)
            audio.play();
}

function set_play_theme()
{
    const audio = document.getElementById("audio");
    audio.setAttribute('src', './audios/play_theme.mp3');
    audio.currentTime = 0;
    last_song = './audios/play_theme.mp3';
    if(music_on)
        audio.play();
}

function create_stars()
{
    for(var j = 1; j <= 5; j++)
    {
        const starBar = document.createElement("div");
        starBar.id = "starBar" + j;
        starBar.style.position = 'absolute';
        starBar.style.width = "auto";
        starBar.style.height = "auto";
        //starBar.style.border = "1px solid black";
        for(var i = 1; i <= 3; i++)
        {
            const starlem = document.createElement("div");
            starlem.id = j + "s" + i;

            starlem.style.position = "relative";
            starlem.style.width = parseInt((coef_x)*1.3 * star_width) + "px";
            starlem.style.height = parseInt((coef_x) *1.3* star_height) + "px";
            //starlem.style.display = "inline-block";
            starlem.style.background = gray_path_value;
            starlem.style.backgroundSize = "cover";
            starlem.style.backgroundRepeat = "no-repeat";
            starlem.style.display = "none";
            starBar.appendChild(starlem);
        }

        starBar.style.display = "none";
        const wind = document.getElementById("window");
        wind.appendChild(starBar);
    }
}

function hide_stars()
{
    for(var i = 1; i <= 5; i++)
    {
        const starBar = document.getElementById("starBar" + i);
        starBar.style.display = "none";
    }
}

function display_stars()
{
    const plvpage = document.getElementById("plevelPage");
    var rectpage = plvpage.getBoundingClientRect();
    for(var i = 1; i <= min_v(3, peaceful_available); i++)
    {
        const lvl = document.getElementById("p" + num_to_level[i]);
        const starbar = document.getElementById("starBar" + i);
        var star_num = star_dict[i];
        var rect = lvl.getBoundingClientRect();
        starbar.style.display = "block";
        for(var j = 1; j <= 3; j++)
        {
            const elem = document.getElementById(i + "s" + j);
            if(j <= star_num)
                elem.style.background = gold_path_value;
            else
                elem.style.backround = gray_path_value;
            elem.style.backgroundSize = "cover";
            elem.style.backgroundRepeat = "no-repeat";
            elem.style.display = "inline-block";
        }
        const star = document.getElementById("1s1");

        starbar.style.marginLeft =   parseInt(rectpage.right - 3  * parseInt(star.style.width) - (coef_x*1.3) * 30) + "px";
        starbar.style.marginTop = rect.top + ((rect.bottom - rect.top)  - parseInt(star.style.height)) / 2 + "px";
    }
}

function display_animated_stars()
{
    const winbar = document.getElementById("winBar");
    const starbar = document.getElementById("starBar5");
    const mainlem = document.getElementById("mainBtn");
    const star = document.getElementById(5 + "s" + 1);

    var rect = winbar.getBoundingClientRect();
    var rect2 = mainlem.getBoundingClientRect();
    //starbar.style.marginLeft =  parseInt((rect.right - rect.left - 3* parseInt(star.style.width))/2) + "px";
    //starbar.style.marginTop = rect2.top - parseInt(star.style.height) - 5 + "px";
    starbar.style.display = "inline-block";
    starbar.style.position = "relative";
    starbar.style.width = "100%";
    starbar.style.marginTop = "10px";
    //starbar.style.border = "1px solid red";
    winbar.insertBefore(starbar, mainlem);

    for(var i = 1; i <= 3; i++)
    {
        const star = document.getElementById(5 + "s" + i);
        if(i <= player_lifes)
            star.style.background = gold_path_value;
        else
            star.style.background = gray_path_value;
        star.style.backgroundSize = "cover";
        star.style.width = parseInt(star.style.width) * 1.4 + "px";
        star.style.height = parseInt(star.style.height) * 1.4 + "px";
        star.style.backgroundRepeat = "no-repeat";
        star.style.opacity = "0";
        star.style.display = "inline-block";
    }
    starbar.style.display = "block";
    //starbar.style.border = "1px solid black";
    
    
    var star1id = setTimeout(show_first_star, 500)
    var star2id = setTimeout(show_second_star, 1000);
    var star3id = setTimeout(show_third_star, 1500);
    clearInterval(change1_id);
    clearInterval(change2_id);
    clearInterval(change3_id);
    
}

function show_first_star()
{
    change1_id = setInterval(change_first_opacity, 10);
}

function show_second_star()
{
    change2_id = setInterval(change_second_opacity, 10);
}

function show_third_star()
{
    change3_id = setInterval(change_third_opacity, 10);
}

function change_first_opacity()
{
    const star = document.getElementById("5s1");
    var op = parseFloat(star.style.opacity) + 0.02;
    if(op <= 1)
    {
        star.style.opacity = op ;
    }
    else
        clearInterval(change1_id);
}


function change_second_opacity()
{
    const star = document.getElementById("5s2");
    var op = parseFloat(star.style.opacity) + 0.02;
    if(op <= 1)
        star.style.opacity = op;
    else
        clearInterval(change2_id);
 
}


function change_third_opacity()
{
    const star = document.getElementById("5s3");
    var op = parseFloat(star.style.opacity) + 0.02;
    if(op <= 1)
        star.style.opacity = op;
    else
        clearInterval(change3_id);
 
}

function create_pause_button()
{
    const pause = document.createElement("div");
    pause.id = "pauseBtn";
    pause.style.position = "absolute";
    pause.style.display = "inline";
    pause.style.width = parseInt((coef_x + coef_y)/2 * pause_width) + "px";
    pause.style.height = parseInt((coef_x+coef_y)/2 * pause_height) + "px";
    pause.style.background = "url('./images/pause_icon2.svg')";
    pause.style.backgroundSize = "cover";
    pause.style.backgroundRepeat = "no-repeat";
    pause.style.borderRadius = "50%";
    pause.style.marginLeft = vk_width - parseInt(pause.style.width) - parseInt(coef_x * 10) + "px";
    pause.style.marginTop = parseInt(vk_height/2) - parseInt(pause.style.height) + "px";
    pause.onclick = pause_clicked;
    pause.onmouseover = mouse_over_pause;
    pause.onmouseout = mouse_out_pause;

    pause.style.display = "none";
    const wind = document.getElementById("window");
    wind.appendChild(pause);

}

function pause_clicked()
{
    if(game_status == 1)
    {
        game_status = 2;
        const pause = document.getElementById("pauseBtn");
        pause.style.background = "url('./images/play_icon2.svg')";
        pause.style.backgroundSize = "cover";
        pause.style.backgroundRepeat = "no-repeat";
    }
    else if(game_status == 2)
    {
        game_status = 1;
        const pause = document.getElementById("pauseBtn");
        pause.style.background = "url('./images/pause_icon.svg')";
        pause.style.backgroundSize = "cover";
        pause.style.backgroundRepeat = "no-repeat";
    }

}

function create_lifes_bar()
{
    const lifes = document.createElement("div");
    lifes.id = "lifesBar";
    lifes.style.position = "absolute";
    lifes.style.marginLeft = parseInt(coef_x * 775) + "px";
    lifes.style.width = parseInt( (coef_x + coef_y ) /2 * heart_width) + "px";
    lifes.style.height = parseInt((coef_x + coef_y ) /2 * heart_height ) + "px";

    lifes.style.background = "url('./images/heart_icon4.svg')";
    lifes.style.backgroundSize = "cover";
    lifes.style.backgroundRepeat = "no-repeat";
    lifes.style.marginTop = parseInt(coef_y * 200) + "px";
    const lc = document.createElement("div");
    lc.id = "lifesCounter";
    lc.style.position = "absolute";
    lc.style.marginTop = parseInt(lifes.style.marginTop) + parseInt(lifes.style.height)  + "px";
    lc.style.marginLeft = parseInt(lifes.style.marginLeft) + 10 + "px";
    lc.innerText = "x3";
    lc.style.fontSize = (coef_x + coef_y) * 1.2 + "em";
    lc.style.display = "none";
    lifes.style.display = "none";
    const wind = document.getElementById("window");
    wind.appendChild(lifes);
    wind.appendChild(lc);

}

function create_plevel_page()
{
    var t = parseInt(coef_y * 10) + "px " + parseInt(coef_x * 10) + "px";
    const levels = document.createElement("div");
    levels.id = "plevelPage";
    levels.style.marginLeft = "13%";
    levels.style.width = "70%";
    levels.style.height = "auto";
    levels.innerText = "Выберите уровень";
    levels.style.fontSize = (coef_x  + coef_y)*0.9+ "em";
    levels.style.background = "rgba(255,255,255,0.8)";
    levels.style.border = "3px solid black";
    levels.style.padding = t;
    levels.style.textAlign = "center";
    levels.style.marginTop = parseInt(coef_y * 200) + "px";
    levels.style.position = "absolute";

    const easy = document.createElement("div");
    easy.id = "peasy";
    easy.style.position = "relative";
    easy.innerText = "Легкий";
    easy.style.width = "90%";
    easy.style.marginLeft = "3%";
    easy.onclick = level_chosen;
    easy.onmouseover = mouse_over_level;
    easy.onmouseout = mouse_out_level;
    easy.style.background = "#3e7";
    easy.style.padding = t;
    easy.style.marginTop = parseInt(coef_y *30) +"px";
    easy.style.display = "block";
    easy.style.borderRadius = "5%";

    const med = document.createElement("div");
    med.id = "pmedium";
    med.style.position = "relative";
    med.innerText = "Средний";
    med.style.width = "90%";
    med.style.marginLeft = "3%";
    med.onclick = level_chosen;
    med.onmouseover = mouse_over_level;
    med.onmouseout = mouse_out_level;
    med.style.background = "#777";
    med.style.padding = t;
    med.style.marginTop = parseInt(coef_y * 20) + "px";
    med.style.display = "block";
    med.style.borderRadius = "5%";

    const hard = document.createElement("div");
    hard.id = "phard";
    hard.style.position = "relative";
    hard.innerText = "Сложный";
    hard.style.width = "90%";
    hard.style.marginLeft = "3%";
    hard.onclick = level_chosen;
    hard.onmouseover = mouse_over_level;
    hard.onmouseout = mouse_out_level;
    hard.style.background = "#777";
    hard.style.padding = t;
    hard.style.marginTop = parseInt(coef_y * 20) + "px";
    hard.style.display = "block";
    hard.style.borderRadius = "5%";

    const custom = document.createElement("div");
    custom.id = "pcustom";
    custom.style.position = "relative";
    custom.innerText = "Пользовательский";
    custom.style.width = "90%";
    custom.style.marginLeft = "3%";
    custom.onclick = level_chosen;
    custom.onmouseover = mouse_over_level;
    custom.onmouseout = mouse_out_level;
    custom.style.background = "#777";
    custom.style.padding = t;
    custom.style.marginTop = parseInt(coef_y * 20) + "px";
    custom.style.display = "block";
    custom.style.borderRadius = "5%";
    custom.style.marginBottom = "10px";

    levels.style.display = "none";
    levels.appendChild(easy);
    levels.appendChild(med);
    levels.appendChild(hard);
    levels.appendChild(custom);
    const wind = document.getElementById("window");
    wind.appendChild(levels);

}




function create_sure_bar()
{
    const sure = document.createElement("div");
    sure.id = "sureBar";
    //sure.style.marginLeft = parseInt(coef_x * 200) + "px";
    sure.style.marginLeft = "20%";
    //sure.style.width = parseInt(coef_x * sure_width) + "px";
    sure.style.width = "50%";
    //sure.style.height = parseInt(coef_y * sure_height) + "px";
    sure.style.height = "auto";
    sure.style.fontSize = (coef_x + coef_y) + "em";
    sure.style.background = "#fff";
    sure.style.border = "3px solid black";
    sure.style.padding = parseInt(coef_y * 10) + "px " + parseInt(coef_x * 10) + "px";
    sure.style.textAlign = "center";
    //sure.style.marginTop = parseInt(coef_y *250) + "px";
    sure.style.marginTop = parseInt(vk_height * 0.35) + "px";
    sure.style.position = "absolute";

    const par = document.createElement("div");
    par.id = "sureText";
    par.innerText = "Вы уверены?";
    par.style.position = "relative";
    par.style.width = "100%";
    par.style.display = "block";
    par.style.marginBottom = "5px";

    const yeslem = document.createElement("div");
    yeslem.id = "yesSure";
    yeslem.style.position = "relative";
   // yeslem.innerText = "В меню";
    //yeslem.style.width = "auto";
    yeslem.style.marginLeft = "0";
    yeslem.onclick = yes_sure;
    yeslem.onmouseover = mouse_over_yes;
    yeslem.onmouseout = mouse_out_yes;
    yeslem.style.background = "#39f";
    yeslem.style.fontSize =  min_v(coef_x,coef_y)+ "em";
    yeslem.style.padding = parseInt(coef_y * 10) + "px " + parseInt(coef_x * 10) + "px";
    yeslem.style.width = "40%";
    yeslem.style.display = "inline-block";
    /*
    yeslem.style.marginTop = parseInt(coef_y * 20) + "px";
    yeslem.style.marginBottom = parseInt(coef_y * 10) + "px";
    yeslem.style.height = parseInt(coef_y * 30) + "px";
    yeslem.style.lineHeight = parseInt(coef_y * 30) + "px";
    yeslem.style.verticalAlign = "middle";
    yeslem.style.display = "inline";
    yeslem.style.borderRadius = "5%";
*/
    const yestext = document.createElement("span");
    yestext.id = 'yestext';
    yestext.onclick = yes_sure;
    yestext.innerText = "В меню";
    yestext.style.display = "inline-block";
    yestext.style.transform = "scale(1, " + (coef_y / coef_x) + ")";
    yeslem.appendChild(yestext);

    const cancel = document.createElement("div");
    cancel.id = "cancel";
    cancel.style.marginLeft = "5%";
    cancel.onclick = cancel_sure;
    cancel.onmouseover = mouse_over_cancel;
    cancel.onmouseout = mouse_out_cancel;
    cancel.style.background = "#3e7";
    cancel.style.fontSize = min_v(coef_x, coef_y) + "em";
    cancel.style.width = "40%";
    cancel.style.display = "inline-block";
    cancel.style.padding = parseInt(coef_y * 10) + "px " + parseInt(coef_x * 10) + "px";

    /*
    cancel.style.position = "relative";
    cancel.style.verticalAlign = "middle";
    cancel.style.marginLeft = "10%";    
    cancel.style.marginTop = parseInt(coef_y * 20) + "px";
    cancel.style.marginBottom = parseInt(coef_y * 10) + "px";
    cancel.style.lineHeight = parseInt(coef_y * 30) + "px";
    cancel.style.height = parseInt(coef_y * 30) + "px";
    cancel.style.display = "inline";
    cancel.style.borderRadius = "5%";
*/

    const canceltext = document.createElement("span");
    canceltext.id = 'canceltext';
    canceltext.onclick = cancel_sure;
    canceltext.innerText = "Отмена";
    canceltext.style.display = "inline-block";
    canceltext.style.transform = "scale(1, " + (coef_y / coef_x) + ")";
    cancel.appendChild(canceltext);
    
    yeslem.appendChild(yestext);
    sure.style.display = "none";
    sure.appendChild(par);
    sure.appendChild(yeslem);
    sure.appendChild(cancel);

    const wind = document.getElementById("window");
    wind.appendChild(sure);
}

function yes_sure()
{
    const sure = document.getElementById("sureBar");
    sure.style.display = "none";
    game_status = 0;
    set_main_theme();
    home_clicked();
}

function cancel_sure()
{
    const gf = document.getElementById("gameField");
    gf.style.opacity = "1.0";
    const sure = document.getElementById("sureBar");
    sure.style.display = "none";
    game_status = 1;
}

function mouse_over_cancel()
{
    const cancel = document.getElementById("cancel");
    cancel.style.cursor = "pointer";
    cancel.style.border = "1px solid black";
}

function mouse_out_cancel()
{
    const cancel = document.getElementById("cancel");
    cancel.style.cursor = "default";
    cancel.style.border = "none";
}


function mouse_over_yes()
{
    const yeslem = document.getElementById("yesSure");
    yeslem.style.cursor = "pointer";
    yeslem.style.border = "1px solid black";
}

function mouse_out_yes()
{
    const yeslem = document.getElementById("yesSure");
    yeslem.style.cursor = "default";
    yeslem.style.border = "none";

}

function mouse_over_pause()
{
    const pause = document.getElementById("pauseBtn");
    pause.style.cursor = "pointer";
    pause.style.border = "1px solid black";
}

function mouse_out_pause()
{
    const pause = document.getElementById("pauseBtn");
    pause.style.cursor = "default";
    pause.style.border = "none";
}


function create_home_button()
{
    const home = document.createElement("div");
    home.id = "homeBtn";
    home.style.position = "absolute";
    home.style.display = "inline";
    home.style.width = parseInt((coef_x+ coef_y) / 2 * home_width) + "px";
    home.style.height = parseInt((coef_x + coef_y)/2* home_height) + "px";
    home.style.background = "url('./images/home_icon2.svg')";
    //alert([home.style.width, home.style.height]);
    home.style.backgroundSize = "cover";
    home.style.backgroundRepeat = "no-repeat";
    home.style.borderRadius = "50%";
    home.style.opacity = "0.8";
    home.style.marginLeft = (vk_width  - parseInt(coef_x * 10) - parseInt(home.style.width)) + "px";
    home.style.marginTop = parseInt(coef_y * 600) + "px";
    home.onclick = home_clicked;
    home.onmouseover = mouse_over_home;
    home.onmouseout = mouse_out_home;

    //home.style.display = "none";
    const wind = document.getElementById("window");
    wind.appendChild(home);
}

function mouse_over_home()
{
    const home = document.getElementById("homeBtn");
    home.style.opacity = "1.0";
    home.style.cursor = "pointer";
}

function mouse_out_home()
{
    const home = document.getElementById("homeBtn");
    home.style.opacity = "0.8";
    home.style.cursor = "default";
}

function home_clicked()
{
    if(game_status == 0)
    {
        //alert(1);
        display_main();
        hide_stars();
        const lvl_page = document.getElementById("levelPage");
        lvl_page.style.display = "none";
        const plvl_page = document.getElementById("plevelPage");
        plvl_page.style.display = "none";

        const mainlem = document.getElementById("mainPage");
        mainlem.style.display = "block";
    }
    else
    {
        game_status = 0;
        const gf = document.getElementById("gameField");
        gf.style.opacity = "0.5";
        const sure = document.getElementById("sureBar");
        sure.style.display = "block";
    }
}


function create_main_page()
{
    const page = document.createElement("div");
    page.id = "mainPage";
    page.style.width = "70%";
    page.style.marginLeft = "13%";
    page.style.height = "auto";
    page.innerText = "Выберите режим игры";
    page.style.fontSize = (coef_x + coef_y) + "em";
    page.style.background = "rgba(255,255,255,0.8)";
    page.style.border = "3px solid black";
    page.style.padding = parseInt(coef_y * 10) + "px " + parseInt(coef_x * 10) + "px";
    page.style.textAlign = "center";
    page.style.marginTop = parseInt(200 * coef_y) + "px";
    page.style.position = "absolute";

    const peace = document.createElement("div");
    peace.id = "peaceful";
    peace.style.position = "relative";
    peace.innerText = "Мирный атом";
    peace.style.width = "80%";
    peace.style.marginLeft = "7%";
    peace.onclick = start_peaceful_mode;
    peace.onmouseover = mouse_over_regime;
    peace.onmouseout = mouse_out_regime;
    peace.style.background = "#1b5";
    peace.style.padding = parseInt(coef_y * 20) + "px " + parseInt(coef_x * 10)+ "px";
    peace.style.marginTop = parseInt(coef_y * 30) + "px";
    peace.style.height = "auto";
    peace.style.display = "block";
    peace.style.borderRadius = "5%";

    const surlem = document.createElement("div");
    surlem.id = "survival";
    surlem.style.position = "relative";
    surlem.innerText = "Вспышка сверху";
    surlem.style.width = "80%";
    surlem.style.marginLeft = "7%";
    surlem.onclick = choose_survival;
    surlem.onmouseover = mouse_over_regime;
    surlem.onmouseout = mouse_out_regime;
    surlem.style.background = "#e37";
    surlem.style.padding = parseInt(coef_y * 20) + "px " + parseInt(coef_x * 10)+ "px";
    surlem.style.marginTop = parseInt(coef_y * 30) + "px";
    surlem.style.height = "auto";
    surlem.style.display = "block";
    surlem.style.borderRadius = "5%";
    surlem.style.marginBottom = "10px";
    page.appendChild(peace);
    page.appendChild(surlem);

    const wind = document.getElementById("window");
    wind.appendChild(page);
    

}

function create_level_page()
{
    var t = parseInt(coef_y * 10) + "px " + parseInt(coef_x * 10) + "px";

    const levels = document.createElement("div");
    levels.id = "levelPage";
    levels.style.marginLeft = "13%";
    levels.style.width = "70%";
    levels.style.height = "auto";
    levels.innerText = "Выберите уровень";
    levels.style.fontSize = (coef_x  + coef_y)*0.9+ "em";
    levels.style.background = "rgba(255,255,255,0.8)";
    levels.style.border = "3px solid black";
    levels.style.padding = t;
    levels.style.textAlign = "center";
    levels.style.marginTop = parseInt(coef_y * 200) + "px";
    levels.style.position = "absolute";
    
    const easy = document.createElement("div");
    easy.id = "easy";
    easy.style.position = "relative";
    easy.innerText = "Легкий";
    easy.style.width = "90%";
    easy.style.marginLeft = "3%";
    easy.onclick = level_chosen;
    easy.onmouseover = mouse_over_level;
    easy.onmouseout = mouse_out_level;
    easy.style.background = "#3e7";
    easy.style.padding = t;
    easy.style.marginTop = parseInt(coef_y *30) +"px";
    easy.style.display = "block";
    easy.style.borderRadius = "5%";

    const med = document.createElement("div");
    med.id = "medium";
    med.style.position = "relative";
    med.innerText = "Средний";
    med.style.width = "90%";
    med.style.marginLeft = "3%";
    med.onclick = level_chosen;
    med.onmouseover = mouse_over_level;
    med.onmouseout = mouse_out_level;
    med.style.background = "#777";
    med.style.padding = t;
    med.style.marginTop = parseInt(coef_y * 20) + "px";
    med.style.display = "block";
    med.style.borderRadius = "5%";

    const hard = document.createElement("div");
    hard.id = "hard";
    hard.style.position = "relative";
    hard.innerText = "Сложный";
    hard.style.width = "90%";
    hard.style.marginLeft = "3%";
    hard.onclick = level_chosen;
    hard.onmouseover = mouse_over_level;
    hard.onmouseout = mouse_out_level;
    hard.style.background = "#777";
    hard.style.padding = t;
    hard.style.marginTop = parseInt(coef_y * 20) + "px";
    hard.style.display = "block";
    hard.style.borderRadius = "5%";

    const custom = document.createElement("div");
    custom.id = "custom";
    custom.style.position = "relative";
    custom.innerText = "Пользовательский";
    custom.style.width = "90%";
    custom.style.marginLeft = "3%";
    custom.onclick = level_chosen;
    custom.onmouseover = mouse_over_level;
    custom.onmouseout = mouse_out_level;
    custom.style.background = "#777";
    custom.style.padding = t;
    custom.style.marginTop = parseInt(coef_y * 20) + "px";
    custom.style.display = "block";
    custom.style.borderRadius = "5%";
    custom.style.marginBottom = "10px";
    levels.style.display = "none";
    levels.appendChild(easy);
    levels.appendChild(med);
    levels.appendChild(hard);
    levels.appendChild(custom);


    const wind = document.getElementById("window");
    wind.appendChild(levels);

}

function create_warning()
{
    const warn = document.createElement("div");
    warn.innerText = "Сначала пройдите предыдущий уровень";
    warn.style.fontSize = (coef_x + coef_y)+ "em";
    warn.style.background = "#fff";
    warn.style.border = "3px solid black";
    warn.style.padding = parseInt(coef_y * 10) + "px " + parseInt(coef_x * 10) + "px";
    warn.style.textAlign = "center";
    warn.id = "warning";
    warn.style.marginLeft = parseInt(coef_x * 200) + "px";
    //warn.style.width = parseInt(coef_x * warning_width) + "px";
    warn.style.width = "50%";
    warn.style.height = parseInt(coef_y * warning_height) + "px";
    warn.style.marginTop = parseInt(coef_y * 200) + "px";
    warn.style.position = "relative";
    
    const ok = document.createElement("div");
    ok.id = "okBtn";
    ok.style.position = "absolute";
    ok.innerText = "Ок";
    ok.style.width = "70%";
    ok.style.marginLeft = "10%";
    //ok.style.marginLeft = "auto";
    ok.onclick = clicked_ok;
    ok.onmouseover = mouse_over_ok;
    ok.onmouseout = mouse_out_ok;
    ok.style.background = "#3e7";
    ok.style.padding = parseInt(coef_y * 10) + "px " + parseInt(coef_x * 10) + "px";
    ok.style.marginTop = parseInt(coef_y * 30) + "px";
    ok.style.height = "auto";
    ok.style.display = "block";
    ok.style.borderRadius = "5%";

    warn.style.display = "none";
    warn.appendChild(ok);
    const wind = document.getElementById("window");
    wind.appendChild(warn);

}



function mouse_over_ok(event)
{
    const elem = document.elementFromPoint(event.x, event.y);
    elem.style.border = "2px solid black"; 
    elem.style.cursor = "pointer";
}

function mouse_out_ok()
{
    const ok = document.getElementById("okBtn")
    ok.style.border = "none";
    ok.style.cursor = "default";
}

function clicked_ok()
{
        const lvpage = document.getElementById("levelPage");
        const plvpage = document.getElementById("plevelPage");
        const warn = document.getElementById("warning");

        warn.style.display = "none";
        if(regime == "survival")
            lvpage.style.display = "block";
        else
        {
            plvpage.style.display = "block";
            display_stars();
        }
}

function mouse_over_level(event)
{
    const elem = document.elementFromPoint(event.x, event.y);
    elem.style.border = "2px solid black"; 
    elem.style.cursor = "pointer";
    if(regime == "peaceful")
    {
        var sid = "starBar" + level_dict[elem.id];
        const starbar = document.getElementById(sid);
        var mt = parseInt(starbar.style.marginTop) + 2;
        starbar.style.marginTop = mt + "px";
    }

}

function mouse_out_level(event)
{
    const easy = document.getElementById("easy");
    const med = document.getElementById("medium");
    const hard = document.getElementById("hard");
    const custom = document.getElementById("custom");
    const peasy = document.getElementById("peasy");
    const pmed = document.getElementById("pmedium");
    const phard = document.getElementById("phard");
    const pcustom = document.getElementById("pcustom");
    
    if(regime == "survival")
    {
        easy.style.border = "none";
        med.style.border = "none";
        hard.style.border = "none";
        custom.style.border = "none";
        easy.style.cursor = "default";
        med.style.cursor = "default";
        hard.style.cursor = "default";
        custom.style.cursor = "default";
    }
    else
    {
        peasy.style.border = "none";
        pmed.style.border = "none";
        phard.style.border = "none";
        pcustom.style.border = "none";
        peasy.style.cursor = "default";
        pmed.style.cursor = "default";
        phard.style.cursor = "default";
        pcustom.style.cursor = "default";
        if(event.target.id != "pcustom")
        {
            var sid = "starBar" + level_dict[event.target.id];
            const starbar = document.getElementById(sid);
            var mt = parseInt(starbar.style.marginTop) - 2;
            starbar.style.marginTop = mt + "px";
        }
    
    }

}

function mouse_over_regime(event)
{
    const elem = document.elementFromPoint(event.x, event.y);

    elem.style.border = "2px solid black"; 
    elem.style.cursor = "pointer";
}

function mouse_out_regime(event)
{
    const elem = document.getElementById("peaceful")
    const elem2 = document.getElementById("survival");
    elem2.style.border = "none";
    elem2.style.cursor = "default";
    elem.style.border = "none";
    elem.style.cursor = "default";
    
}


function level_chosen(event)
{
    const lvl = document.elementFromPoint(event.x, event.y);
    const lvpage = document.getElementById("levelPage");
    const plvpage = document.getElementById("plevelPage");
    hide_stars();
    plvpage.style.display = "none";
    lvpage.style.display = "none";

    temp_lvl = available_lvl;
    if(regime == "peaceful")
        temp_lvl = peaceful_available;
    if(level_dict[lvl.id] > temp_lvl)
    {
        //alert([temp_lvl, available_lvl, level_dict[lvl.id]]);
        const warn = document.getElementById("warning");
        warn.style.display = "block";
    }
    else
    {
        current_lvl = level_dict[lvl.id];

        if(current_lvl == 4)
        {
            const cuslem = document.getElementById("customMenu");
            const textlem = document.getElementById("ptext");
            if(regime == "peaceful")
                textlem.innerText = "Укажите скорость падения атомов";
            else
                textlem.innerText = "Выберите скорость движения ракет";
            
            cuslem.style.display = "block";
        }
        else
        {
            const infolem = document.getElementById("info");
            const textlem = document.getElementById("text");

            if(regime == "survival")
                textlem.innerText = text_60sec;
            else
                textlem.innerText = text_peaceful;
            infolem.style.display = "block";
            set_play_theme();
            mis_gen_speed = level_options[current_lvl];
            if(regime == "peaceful")
                bon_gen_speed = plevel_options[current_lvl];
        }
    }

    
}

function create_custom_menu()
{
    const cuslem = document.createElement("div");
    cuslem.id = "customMenu";
    //cuslem.innerText = "Выберите скорость ракет";
    cuslem.style.fontSize = (coef_x + coef_y) + "em";
    cuslem.style.background = "#fff";
    cuslem.style.border = "3px solid black";
    cuslem.style.padding = parseInt(coef_y * 10) + "px " + parseInt(coef_x * 10) + "px";
    cuslem.style.textAlign = "center";
    cuslem.style.marginLeft = parseInt(coef_x * 200) + "px";
    cuslem.style.width = custom_menu_width + "px";
    cuslem.style.height = custom_menu_height + "px";;
    cuslem.style.marginTop = parseInt(coef_y * 200) + "px";
    cuslem.style.position = "relative";
    
    const textlem = document.createElement("div");
    textlem.id = "ptext";
    textlem.style.position = "absolute";
    textlem.style.fontSize = (coef_x + coef_y) /2 * 0.8 + "em";
    textlem.style.width = "100%";
    textlem.style.height = "auto";
        

    const range = document.createElement("input");
    range.id = "range";
    range.style.position = "absolute";
    range.setAttribute('type', 'range');
    range.setAttribute('min', '0');
    range.setAttribute('max', '100');
    range.setAttribute('step', '0.1');
    range.setAttribute('value', '50');
    range.style.width = "70%";
    range.style.height = "auto";
    range.style.marginLeft = "10%";
    range.style.padding = parseInt(coef_y * 10) + "px " + parseInt(coef_x * 10) + "px";
    range.style.marginTop = parseInt(coef_y * 130) + "px";
    range.style.display = "block";
    range.oninput = input_range;
    
    const output = document.createElement("output");
    output.id = "rangeOutput";
    output.innerText = "50";
    output.style.position = "absolute";
    output.style.display = "block";
    output.style.width = "95%";
    output.style.marginTop = parseInt(coef_y * 90) + "px";
    output.textContent = range.value;
    /*
    const outcont = document.createElement("div");
    outcont.style.marginTop = "40px";
    outcont.id = "outputContainer";
    outcont.appendChild(output);
    */

    const choose = document.createElement("div");
    choose.id = "chooseBtn";
    choose.innerText = "Выбрать";
    choose.onclick = speed_chosen;
    choose.style.fontSize = (coef_x + coef_y) / 2 * 1.8 + "em";
 
    choose.style.position = "absolute";
    choose.style.width = "70%";
    choose.style.marginLeft = "10%";
    choose.onmouseover = mouse_over_choose;
    choose.onmouseout = mouse_out_choose;
    choose.style.background = "#3e7";
    choose.style.padding = parseInt(coef_y * 10) + "px " + parseInt(coef_x * 10) + "px";
    choose.style.marginTop = parseInt(coef_y * 190) + "px";
    choose.style.height = "auto";
    choose.style.display = "block";
    choose.style.borderRadius = "5%";

    cuslem.style.display = "none";
    cuslem.appendChild(textlem);
    cuslem.appendChild(range);
    cuslem.appendChild(output);
    cuslem.appendChild(choose);

    const wind = document.getElementById("window");
    wind.appendChild(cuslem);

}

function mouse_over_choose(event)
{
    const choose = document.elementFromPoint(event.x, event.y);

    choose.style.border = "2px solid black"; 
    choose.style.cursor = "pointer";
}

function mouse_out_choose()
{
    const choose = document.getElementById("chooseBtn");
    choose.style.cursor = "default";
    choose.style.border = "none";

}

function speed_chosen()
{
    const output = document.getElementById("rangeOutput");
    var val = output.value;
    if(val == 0)
    {
        peaceful_mode = 1;
        if(regime == "peaceful")
        {
            zero_atoms = 1;
        }
    }
    else if(regime == "survival")
    {
        mis_gen_speed = 7 + parseInt(10000 / val);
        if(mis_gen_speed % 2 == 0)
            mis_gen_speed += 1;
    }
    else
    {   
        
        bon_gen_speed = 7 + parseInt(3000 / val);
        if(bon_gen_speed % 2 == 0)
            bon_gen_speed += 1;
    }
    const cuslem = document.getElementById("customMenu");
    const infolem = document.getElementById("info");
    cuslem.style.display = "none";
    infolem.style.display = "block";
    set_play_theme();

}

function input_range(event)
{
    const range = document.getElementById("range");
    const output = document.getElementById("rangeOutput");

    output.textContent = event.target.value;
   // output.value = range.value;
}

function choose_survival()
{
    regime = "survival";
    peaceful_mode = 0;
    const page = document.getElementById("mainPage");
    page.style.display = "none";
    const levels = document.getElementById("levelPage");
    levels.style.display = "block";
}


function start_peaceful_mode()
{
    regime = "peaceful";
    peaceful_mode = 1;
    const page = document.getElementById("mainPage");
    page.style.display = "none"; // legend: ловите атомы до того как они упадут на землю. Допускается пропустить 2 атома. Управление зажатым курсором, пальцем, клавишами wasd, пауза пробел. Удачи!
    /*
    const textlem = document.getElementById("text");
    const info = document.getElementById("info");
    textlem.innerText = text_peaceful;
    info.style.display = "block";
    */
    const plvl_page = document.getElementById("plevelPage");
    plvl_page.style.display = "block";
    display_stars();
    //const startlem = document.getElementById("startBtn");
    //startlem.style.display = "block";
}

function create_start_and_info()
{
    const infolem = document.createElement("div");
    infolem.id = "info";
    infolem.style.position = "absolute";
    infolem.style.display = "block";
    infolem.style.marginTop = parseInt(coef_y * 200) + "px";
    infolem.style.width = parseInt(coef_x * info_width) + "px";
    //infolem.style.height = parseInt(coef_y * info_height) + "px";
    infolem.style.height = "auto";
    infolem.style.border = "3px solid black";
    //infolem.style.textAlign = "center";
    infolem.style.background = "rgba(255,255,255,0.8)";
    infolem.style.marginLeft = parseInt(100 * coef_x) + "px";
    infolem.style.padding = parseInt(coef_y * 20)+ "px " + parseInt(coef_x * 20) + "px"; 
    infolem.style.fontSize = (coef_x+coef_y) / 2 * 1.5 + "em";
    const textlem = document.createElement("div");
    textlem.id = "text";
    //textlem.innerText = text_60sec;
    textlem.style.position = "absolute";
    textlem.style.width = "100%";
    textlem.style.height = "auto";
    
    const startlem = document.createElement("button");
    startlem.id = "startBtn";
    startlem.onclick = new_game;
    startlem.innerText = "Поехали!";
    startlem.style.marginLeft  = parseInt(coef_x * 200) + "px";
    startlem.style.marginTop = parseInt(coef_y * 200) + "px";
    startlem.style.display = "block";
    startlem.style.padding = parseInt(coef_y * 20)+ "px " + parseInt(coef_x * 20) + "px"; 
    startlem.style.fontSize = (coef_x + coef_y) / 2 * 1.6 + "em";
    startlem.style.position = "relative";
    startlem.style.border = "3px solid black";
    startlem.style.background = "#a2f5b4";
    startlem.style.borderRadius = "20%";
    startlem.onmouseover = mouse_over_start;
    startlem.onmouseout = mouse_out_start;

    infolem.appendChild(textlem);
    const wind = document.getElementById("window");
    infolem.style.display = "none";
    infolem.appendChild(startlem);
    wind.appendChild(infolem);

}

function mouse_over_start()
{
    const startlem = document.getElementById("startBtn");
     startlem.style.background = "blue";
     startlem.style.cursor = "pointer";
     startlem.style.color = "white";
}

function mouse_out_start()
{
    const startlem = document.getElementById("startBtn");
    startlem.style.background = "#a2f5b4";
    startlem.style.cursor = "default";
    startlem.style.color = "black";
}

function set_area()
{
   // document.body.style.background = "url('./images/back.jpg')";
    document.body.style.background = "green";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";
    document.body.style.padding = "0;"
    document.body.style.height = "100%";
    document.body.style.fontFamily = "Open Sans";
    const wind_lem = document.createElement("div");
    wind_lem.id = "window";
    //wind_lem.style.marginTop = "-10px";
    //wind_lem.style.marginLeft = "-10px";
    wind_lem.style.position = "absolute";
    wind_lem.style.display = "block";
    wind_lem.style.overflow = "hidden";
    wind_lem.style.width = vk_width +"px";
    wind_lem.style.height = vk_height + "px";
    //wind_lem.style.border = "1px solid blue";
    wind_lem.style.background = "url('./images/back_900_750.jpg')";
    wind_lem.style.backgroundRepeat = "no-repeat";
    wind_lem.style.backgroundSize = "cover";
    document.body.appendChild(wind_lem);
}



function new_game()
{
    date2 = new Date();
    const infolem = document.getElementById("info");
    const gf = document.getElementById("gameField");
    const statlem = document.getElementById("clockBar");
    const belem = document.getElementById("bonusBar");
    const player = document.getElementById("player");
    const pause = document.getElementById("pauseBtn");
    const bc = document.getElementById("bonusCounter");
    if(regime == "peaceful")
    {
        const lifes = document.getElementById("lifesBar");
        const lc = document.getElementById("lifesCounter");
        lifes.style.display = "block";
        lc.style.display = "block";
    }
    bc.style.display = "block";
    pause.style.display = "block";
    player.style.display = "block";
    player.style.opacity = "1.0";
    set_body();
    statlem.style.display = "block";
    belem.style.display = "block";
    infolem.style.display = "none";
    gf.style.background  = "rgba(255, 255, 255, 0.8)";
    gf.style.display = "block";

    game_status = 1;
    start_clock();
    if(peaceful_mode == 0 && regime == "survival")
    {
        var start_mis_id = setTimeout(init_missiles, mis_gen_speed*3);
    }
    
    if(zero_atoms == 0)
        var start_bon_id = setTimeout(init_bonuses, bon_gen_speed);
    
}
function set_body()
{
    document.body.onkeydown = key_pressed;
    document.body.onmousemove = mouse_moved;
}
function create_game_field()
{
    date4 = new Date();
    const wind = document.getElementById("window");
    const gf = document.createElement("div");
    gf.id = "gameField";
    gf.style.position = "absolute";
    gf.style.display = "none";
    gf.style.width = parseInt(coef_x * gf_width) + "px";
    gf.style.background  = "rgba(255, 255, 255, 0.8)";
    gf.style.marginLeft = parseInt(coef_x * 30) + "px";
    gf.style.marginTop = parseInt(coef_y * 25) + "px";
    gf.style.height = parseInt(coef_y * gf_height) + "px";
    gf.style.border = "5px solid black";
    gf.style.background = gf_color;
    wind.appendChild(gf);
}




function create_clock()
{
    const statlem = document.createElement("div");
    statlem.id = "clockBar";
    statlem.style.position = "absolute";
    statlem.style.width = "auto";
    statlem.innerText = "01:00";
    statlem.style.marginLeft = parseInt(coef_x * 775) + "px";
    statlem.style.marginTop = parseInt(coef_y * 25) + "px";
    statlem.style.fontSize = (coef_x + coef_y) / 2 * 1.5 + "em";
    statlem.style.border = "2px solid black";
    statlem.style.padding = parseInt(coef_y * 5) +"px " + parseInt(coef_x * 5) + "px";
    statlem.style.background = "white";
    statlem.style.display = "none";
    const wind = document.getElementById("window");
    wind.appendChild(statlem);
}


function create_bonus_bar()
{
    /*
    const belem = document.createElement("div");
    belem.id = "bonusBar";
    belem.style.position = "absolute";
    belem.style.marginLeft = parseInt(coef_x * 775) + "px";
    belem.style.padding = parseInt(coef_y * 10) + "px " + parseInt(coef_x * 10) + "px";
    belem.style.background = "url('./images/atom_icon.jpg')";
    belem.style.width = parseInt(coef_x * 30) + "px";
    belem.style.height = parseInt(coef_x * 30) + "px";
    belem.style.border = "2px solid black";
    belem.style.borderRadius = "50%";
    belem.style.marginTop = parseInt(coef_y * 100) + "px";
    const bc = document.createElement("div");
    bc.id = "bonusCounter";
    bc.style.fontSize = (coef_x + coef_y) / 2 * 2.7 + "em";
    belem.appendChild(bc);
    bc.style.position = "relative";
    bc.style.marginLeft = parseInt(coef_x * 50) + "px";
    bc.innerText = "0";
    bc.style.verticalAlign = "middle";
    bc.style.lineHeight =  parseInt(coef_y * 30) + "px";
    bc.style.paddingBottom = parseInt(coef_y * 5) + "px";
    belem.style.display = "none";
    const wind = document.getElementById("window");
    wind.appendChild(belem);
    */
    const belem = document.createElement("div");
    belem.id = "bonusBar";
    belem.style.position = "absolute";
    belem.style.marginLeft = parseInt(coef_x * 775) + "px";
    belem.style.width = parseInt( 1.2*(coef_x + coef_y ) /2 * bonus_width) + "px";
    belem.style.height = parseInt(1.2*(coef_x + coef_y ) /2 * bonus_height ) + "px";
    belem.style.background = "url('./images/atom_icon.jpg')";

    belem.style.backgroundSize = "cover";
    belem.style.backgroundRepeat = "no-repeat";
    belem.style.borderRadius = "50%";
    belem.style.marginTop = parseInt(coef_y * 100) + "px";
    const bc = document.createElement("div");
    bc.id = "bonusCounter";
    bc.style.position = "absolute";
    bc.style.marginTop = parseInt(belem.style.marginTop) + parseInt(belem.style.height)  + "px";
    bc.style.marginLeft = parseInt(belem.style.marginLeft) + 10 + "px";
    bc.innerText = "0";
    bc.style.fontSize = (coef_x + coef_y) * 1.2 + "em";
    bc.style.display = "none";
    belem.style.display = "none";
    const wind = document.getElementById("window");
    wind.appendChild(belem);
    wind.appendChild(bc);
}


function create_player()
{
    const gf = document.getElementById("gameField");
    const player = document.createElement("div");
    player.id = "player";
    player.style.position = "absolute";
    player.style.background = "url('images/open7.svg')";
    player.style.backgroundSize = "cover";
    player.style.backgroundRepeat = "no-repeat";

    player.style.width = parseInt((coef_x+coef_y)/2 * player_width) + "px";
    player.style.height = parseInt((coef_y +coef_x) / 2* player_height)  + "px";
    player.style.marginTop = (parseInt(gf.style.height) - parseInt(player.style.height)) + "px";
    player.style.border = "none";
    player.style.marginLeft = "0";
    //player.style.display = "inline";
    player.onclick = player_clicked;
    player.onmousedown = player_catched;
    player.onmouseup = player_uncatched;
    player.ontouchstart = player_catched;
    player.ontouchend = player_uncatched;
    document.body.ontouchmove = mouse_moved;
    gf.appendChild(player);
}


function key_pressed(event)
{
    if(game_status == 1)
    {
        const player = document.getElementById("player");

        if(event.keyCode == "37" || event.keyCode == "65")
        {
            if(x1 - 1 > 0)
            {
                x2 -= 20;
                x1 -= 20;
                var ml = parseInt(player.style.marginLeft) - 20;
                player.style.marginLeft = ml + "px";
            }
        }
        else if(event.keyCode == "38" || event.keyCode == "87")
        {
            if(y2 + 2 < gf_height)
            {
               // alert(1);
                y2 += 20;
                y1 += 20;
                var mt = parseInt(player.style.marginTop);
                player.style.marginTop = mt - 20 + "px";
            }
        }
        else if(event.keyCode == "39" || event.keyCode == "68")
        {
            if(x2 + 1 < gf_width)
            {
                //alert(1);
                x2 += 20;
                x1 += 20;
                var ml = parseInt(player.style.marginLeft) + 20;
                player.style.marginLeft = ml + "px";

            }

        }
        else if(event.keyCode == "40" || event.keyCode == "83")
        {
            if(y1 - 5  > 0)
            {
               // alert(1);
                y1 -= 20;
                y2 -= 20;
                var mt = parseInt(player.style.marginTop);
                player.style.marginTop = mt + 20 + "px";
            }
        }
        else if(event.keyCode == "32")
        {
            pause_clicked();
        }
    }
    else if(event.keyCode == "32" && game_status == 2)
        pause_clicked();
}


function player_clicked()
{
    if(game_status == 1)
    {
        if(player_active == 0)
            player_active = 1;
        else
            player_active = 0;
    }
}

function player_catched()
{
    player_active = 1;
}

function player_uncatched()
{
    player_active = 0;
}

function mouse_moved(e)
{
    
    if(game_status == 1)
    {
        const player = document.getElementById("player");
        const gf = document.getElementById("gameField");
        var gf_w = parseInt(gf.style.width);
        var gf_h = parseInt(gf.style.height);
        var p_h = parseInt(player.style.height);
        if(player_active)
        {
            var nx1, nx2,ny1,ny2;
            var cx, cy;
            if(mobile_mode == 0)
            {
                nx1 = e.clientX - parseInt(parseInt(player.style.width)*3/4);
                ny1 = e.clientY - parseInt(parseInt(player.style.height)*3/4);
                cx = e.clientX;
                cy = e.clientY;
            }
            else
            {
                nx1 = e.touches[0].clientX - parseInt(parseInt(player.style.width)*3/4);
                ny1 = e.touches[0].clientY - parseInt(parseInt(player.style.height)*3/4);
                cx = e.touches[0].clientX;
                cy = e.touches[0].clientY;
            }
            nx2 = nx1 + parseInt(player.style.width);
            ny2 = ny1 + parseInt(player.style.height);
            
            if(nx1 >= 0 && nx2 <= gf_w)
            {
                player.style.marginLeft = cx - parseInt(parseInt(player.style.width)*3/4) + "px";
                x1 = nx1;
                x2 = nx2;
            }
            else if(nx1 < 0)
            {
                player.style.marginLeft = "0";
                x1 = 0;
                x2 = parseInt(player.style.width);
            }
            else if(nx2 > gf_w)
            {
                player.style.marginLeft = gf_w - parseInt(player.style.width) + "px";
                x1 = gf_w - parseInt(player.style.width);
                x2 = gf_w;
            }
            if(ny1 >= 0 && ny2 <= gf_h)
            {
                player.style.marginTop = cy - parseInt(parseInt(player.style.height)*3/4) + "px";
                y2 = gf_h - parseInt(player.style.marginTop);
                y1 = y2 - p_h;
            }
            else if(ny1 < 0)
            {
                player.style.marginTop = "0";
                y2 = gf_h;
                y1 = y2 - parseInt(player.style.height);
            }
            else if(ny2 > gf_h)
            {
                
                player.style.marginTop = gf_h - p_h + "px";
                y1 = 0;
                y2 = p_h;
                
            }
        }
    }
}


function create_missiles()
{
    
    const wind = document.getElementById("window");
    const gf = document.getElementById("gameField");
    
    for(var i = 0; i < 100; i++)
    {
        const mislem = document.createElement("div");
        mislem.id = i+"m";
        mislem.style.position = "absolute";
        mislem.style.width = parseInt(coef_x * missile_width) + "px";
        mislem.style.marginLeft = i * parseInt(coef_x * missile_width) + "px";
        mislem.style.height = parseInt(coef_x * missile_height)  + "px";
        mislem.style.background = "url('images/black_missile2.png')";
        mislem.style.backgroundSize = "cover";
        mislem.style.backgroundRepeat = "no-repeat";
        mislem.style.marginTop = parseInt(coef_x * (-100)) + "px";
        gf.appendChild(mislem);
        free_missiles.push(i+"m");
    }
    
    gf.style.overflow = "hidden";

    
}



function create_bonuses()
{
    const gf = document.getElementById("gameField");
   
    
    for(var i = 0; i < 50; i++)
    {
        const bonlem = document.createElement("div");
        bonlem.id = i+"b";
        bonlem.style.position = "absolute";
        bonlem.style.width = parseInt(coef_x * bonus_width) + "px";
        bonlem.style.marginLeft = i * parseInt(bonlem.style.width) + "px";
        bonlem.style.height = bonlem.style.width;
        bonlem.style.background = "url('./images/atom_icon32_32.jpg')";
        bonlem.style.backgroundSize = "cover";
        bonlem.style.backgroundRepeat = "no-repeat";
        bonlem.style.borderRadius = "50%";
        bonlem.style.marginTop = -1*parseInt(bonlem.style.height) - 10 + "px";
        gf.appendChild(bonlem);
        free_bonuses.push(i+"b");
    }

}


function init_bonuses()
{
   
    bonus_init_id = setInterval(gen_bonuses, bon_gen_speed);

}

function gen_bonuses()
{
    if(game_status == 1)
    {
        var new_bon = free_bonuses.shift();
        const bonlem = document.getElementById(new_bon);
        const gf = document.getElementById("gameField");
        bonus_step = max_v(3, parseInt(secs / 10));
        
        var salt = new Date();
        var ml = parseInt(Math.random()*10000*(salt%4159))%(parseInt(gf.style.width) - parseInt(bonlem.style.width));
        bonlem.style.marginLeft = ml + "px";
        active_bonuses[new_bon] = 1;
        var bonus_id = setInterval(move_bonuses, bon_move_speed);
        bonus_dict[new_bon] = bonus_id;
    }
}

function init_missiles()
{
    missile_init_id = setInterval(gen_missiles, mis_gen_speed);

}

function gen_missiles()
{
    if(game_status == 1)
    {
        
        var new_mis = free_missiles.shift();
        const mislem = document.getElementById(new_mis);
        var salt = new Date();
    
        var ml = (parseInt(Math.random()*10000*(salt%4159))%(max_missiles)) * parseInt(mislem.style.width);
        mislem.style.marginLeft = ml + "px";
        missile_active[new_mis] = 1;
        //missile_step = max_v(1, parseInt(secs / 10));
    
        missile_step = 3;

        //dif_param = 3 - min_v(2, parseInt(secs / 10));   добавляет режим матрицы к 20-ой секунде
        dif_param = 3;
        if(ml % dif_param  == 0)
        {
            var missile_id = setInterval(move_missiles, mis_move_speed);
            missile_dict[new_mis] = missile_id;
        }
       
    }
}
function mouse_over_mainBtn(event)
{
    const mainbtn = document.getElementById("mainBtn");
    mainbtn.style.border = "2px solid black";
    mainbtn.style.cursor = "pointer";
}

function mouse_out_mainBtn()
{
    const mainbtn = document.getElementById("mainBtn");
    mainbtn.style.border = "none";
    mainbtn.style.cursor = "default";
}

function start_clock()
{
    
    clock_id = setInterval(change_time, 1000);
    //clock_id2 = setTimeout(change_time, 2000);

}

function max_v(a, b)
{
    if(a > b)
        return a;
    else    
        return b;   
}

function change_time()
{
    if(game_status == 1 && secs < win_time)
    {
        const clem = document.getElementById("clockBar");
        secs += 1;
        var tsecs = 1;
        if(secs <= 60)
            tsecs = 60 - secs;
        var mins = parseInt(tsecs / 60);
        
        var text_secs = tsecs % 60;
        var text_mins = mins;
        if (mins < 10)
            text_mins = "0" + mins;
        if(text_secs < 10)
            text_secs = "0" + text_secs;
        clem.innerText = text_mins + ":" + text_secs;
    }
    else if(game_status == 1 && secs == win_time)
    {
        game_status = 0;
        secs = 0;
        temp_lvl = available_lvl;
        if(regime == "peaceful")
            temp_lvl = peaceful_available;
        if(temp_lvl == current_lvl && current_lvl != 4)
        {
            temp_lvl += 1;
            if(regime == "peaceful")
            {
                open_plevels[temp_lvl] = 1;
            }
            else
                open_levels[temp_lvl] = 1;
            update_levels();

        }
        if(regime == "peaceful")
            peaceful_available = temp_lvl;
        else
            available_lvl = temp_lvl;
        //hide_pause_button();
        if(regime == "peaceful")
        {
            if(player_lifes > star_dict[current_lvl])
                star_dict[current_lvl] = player_lifes;
        }
        update_cookies();
        display_win_bar();
    }
}
function update_levels()
{

    alert('from update');
    alert(Object.values(open_levels));
    for(var i = 0; i < 4; i++)
    {
        const lvl = document.getElementById(num_to_level[i + 1]);
        if(open_levels[i+1] == 1)
            lvl.style.background = level_colors[i];
        else
            lvl.style.background = "#777";
    }
    for(var i = 0; i < 4; i++)
    {
        const lvl = document.getElementById("p" + num_to_level[i + 1]);
        if(open_plevels[i+1] == 1)
            lvl.style.background = level_colors[i];
        else
            lvl.style.background = "#777";
    }
}

function hide_pause_button()
{
    const pause = document.getElementById("pauseBtn");
    pause.style.display = "none";
}
function display_win_bar()
{
    if (regime == "survival")
        show_ad();
    const gf = document.getElementById("gameField");
    const winbar = document.getElementById("winBar");
    gf.style.opacity = "0.5";
    winbar.style.display = "block";
    if(regime == "peaceful")
        display_animated_stars();
}

function min_v( a,  b)
{
    if(a < b)
        return a;
    return b;
}

function move_missiles()
{
    if(game_status == 1)
    {
        const gf = document.getElementById("gameField");
        var gf_h = parseInt(gf.style.height);
        for(var mis_id in missile_active)
        {
            if(missile_active[mis_id] == 1)
            {
                const mislem = document.getElementById(mis_id);
                var mt = parseInt(mislem.style.marginTop);
                var my1 = gf_h - mt;
                var mx1 = parseInt(mislem.style.marginLeft);
                var my2 = my1 - parseInt(mislem.style.height);
                var mx2 = mx1 + parseInt(mislem.style.width);
                if(mx1 >= x1 && mx1 <= x2 && my2 >= y1 && my2 <= y2 || 
                    mx2 >= x1 && mx2 <= x2 && my2 >= y1 && my2 <= y2)
                {
                    clearInterval(missile_dict[mis_id]);
                    game_status = 0;
                    //hide_pause_button();
                    display_lose_bar();
                }
                else if( mt + missile_step <= gf_h)
                {
                    mislem.style.marginTop = mt + missile_step + "px";
                }   
                else if(mt < gf_h)
                {
                    mislem.style.marginTop = gf_h + "px";
                } 
                else if(mt == gf_h)
                {
                    clearInterval(missile_dict[mis_id]);
                    missile_active[mis_id] = 0;
                    mislem.style.marginTop = -1*parseInt(mislem.style.height) + "px";
                    free_missiles.push(mis_id);
                }
            }
        }
    }
}

function create_win_bar()
{
    const winlem = document.createElement("div");
    winlem.id = "winBar";
    //winlem.style.marginLeft = parseInt(coef_x * 200) + "px";
    //winlem.style.width = parseInt(coef_x * (win_bar_width +30)) + "px";
    winlem.style.width = "60%"
    winlem.style.marginLeft = "15%";
    //winlem.style.height = parseInt(coef_y * win_bar_height) + "px";;
    winlem.style.height = "auto";
    winlem.innerText = "Получилось!       ";
    winlem.style.fontSize = (coef_x + coef_y) + "em";
    winlem.style.background = "#fff";
    winlem.style.border = "3px solid black";
    winlem.style.padding = parseInt(coef_y * 10) + "px " + parseInt(coef_x * 10) + "px";
    winlem.style.textAlign = "center";
    winlem.style.marginTop = parseInt(coef_y *250) + "px";
    winlem.style.position = "absolute";
    
    const mainlem = document.createElement("div");
    mainlem.id = "mainBtn";
    mainlem.style.position = "relative";
    mainlem.innerText = "В меню";
    mainlem.style.width = "80%";
    //mainlem.style.width = parseInt(0.7 * win_bar_width) + "px";
    mainlem.style.marginLeft = "8%";
    mainlem.onclick = display_main;
    mainlem.onmouseover = mouse_over_mainBtn;
    mainlem.onmouseout = mouse_out_mainBtn;
    mainlem.style.background = "#3e7";
    mainlem.style.padding = parseInt(coef_y * 10) + "px " + parseInt(coef_x * 10) + "px";
    mainlem.style.marginTop = parseInt((coef_y + coef_x)/2 * 15) + "px";
    mainlem.style.height = "auto";
    mainlem.style.display = "block";
    mainlem.style.borderRadius = "5%";
    mainlem.style.marginBottom = "5px";

    winlem.style.display = "none";
    winlem.appendChild(mainlem);
    const wind = document.getElementById("window");
    wind.appendChild(winlem);
}

function display_main()
{
    set_main_theme();
    set_default();
    const lvl_page = document.getElementById("levelPage");
    const plvl_page = document.getElementById("plevelPage");
    const gf = document.getElementById("gameField");
    const statlem = document.getElementById("clockBar");
    const belem = document.getElementById("bonusBar");
    const player = document.getElementById("player");
    const winlem = document.getElementById("winBar");
    const pause = document.getElementById("pauseBtn");
    const info = document.getElementById("info");
    const sure = document.getElementById("sureBar");
    const lifes = document.getElementById("lifesBar");
    const lc = document.getElementById("lifesCounter");
    const bc = document.getElementById("bonusCounter");
    hide_stars();
    bc.style.display = "none";
    lc.style.display = "none";
    lifes.style.display = "none";
    sure.style.display = "none";
    info.style.display = "none";
    pause.style.display = "none";
    winlem.style.display = "none";
    gf.style.display = "none";
    statlem.style.display = "none";
    belem.style.display = "none";
    player.style.display = "none";
    if(regime == "survival")
        lvl_page.style.display = "block";
    else
    {
        plvl_page.style.display = "block";
        display_stars();
        //alert(2);
    }
}

function create_lose_bar()
{
    const rb = document.createElement("div");
    rb.id="loseBar";
    rb.style.position = "absolute";
    rb.style.width = "50%";
    rb.style.height = "auto";
    rb.style.marginLeft = parseInt(coef_x * 220) + "px";
    rb.style.fontSize = (coef_x + coef_y) + "em";
    rb.style.marginTop = parseInt(coef_y * 280) + "px";
    
    rb.style.padding = parseInt(coef_y * 20) + "px " + parseInt(coef_x * 20) + "px";
    rb.style.border = "3px solid black";
    rb.style.fontFamily = "Open Sans";
    rb.innerText = "Не вышло... Пробуем ещё?\n";
    rb.style.background = "white";

    const yeslem = document.createElement("div");
    yeslem.id = "yesBtn";
    yeslem.style.position = "relative";
    yeslem.innerText = "Да";
    yeslem.style.verticalAlign = "middle";
    yeslem.style.fontSize = (coef_x + coef_y ) / 2 * 1.3 + "em";
    yeslem.style.marginTop = parseInt(coef_y * 20) + "px";
    yeslem.style.background = "#3c3";
    yeslem.style.width = "60%";
    yeslem.style.display  = "block";
    yeslem.style.height = "auto";
    //yeslem.style.margin = "auto";
    yeslem.style.padding = parseInt(coef_y * 10) + "px " + parseInt(coef_x * 20) + "px";
    yeslem.style.textAlign = "center";
    yeslem.style.verticalAlign = "middle";
    yeslem.style.borderRadius = "5%";
    yeslem.style.marginLeft = "15%";
    yeslem.onmouseover = mouse_over_choice;
    yeslem.onmouseout = mouse_out_choice;
    yeslem.onclick = restart;
    yeslem.style.border = "2px solid black";
    rb.appendChild(yeslem);
    rb.style.display = "none";
    const wind = document.getElementById("window");
    wind.appendChild(rb);
    
}
//  выбор уровня - проигрыш - попробовать снова - меню 

function mouse_over_choice(event)
{
    const ch = document.getElementById("yesBtn")
    ch.style.cursor = "pointer";
    ch.style.background = "blue";
    ch.style.color = "white";
}

function mouse_out_choice()
{
    const yesb = document.getElementById("yesBtn");
    yesb.style.cursor = "default";
    yesb.style.background = "#3c3";
    yesb.style.color = "black";
   
    
}

function display_lose_bar()
{
    show_ad();
    const gf = document.getElementById("gameField");
    gf.style.opacity = "0.5";
    const rb = document.getElementById("loseBar");
    rb.style.display = "block";
}

function restart()
{

    set_default();
    new_game();
}

function set_default()
{
    const lb = document.getElementById("loseBar");
    lb.style.display = "none";
    secs = 0;
    const clem = document.getElementById("clockBar");
    clem.innerText = "01:00";
    const player = document.getElementById("player");
    const gf = document.getElementById("gameField");
    gf.style.opacity = "1.0";
    if(regime == "peaceful")
    {
        const lc = document.getElementById("lifesCounter");
        lc.innerText = "x3";
    }
    zero_atoms = 0;
    player.style.marginTop = (parseInt(gf.style.height) - parseInt(player.style.height)) + "px";
    player.style.marginLeft = "0px";
    player_lifes = 3;
    x1 = 0;
    x2 = x1 + parseInt(player.style.width);
    y1 = 0;
    y2 = y1 + parseInt(player.style.height);
    bonus_counter = 0;
    const bonuslem = document.getElementById("bonusCounter");
    bonuslem.innerText = "0";
    player_active = 0;
    missile_step = 1;
    clearInterval(bonus_init_id);
    clearInterval(missile_init_id);
    clearInterval(clock_id);
    for(var bonus_id in bonus_dict)
    {
        clearInterval(bonus_dict[bonus_id]);
    }
    for(var mis_id in missile_dict)
    {
        clearInterval(missile_dict[mis_id]);
    }
    for(var mis_id in missile_active)
    {
        missile_active[mis_id] = 0;
        const mislem = document.getElementById(mis_id);
        mislem.style.marginTop = -1*parseInt(mislem.style.height) + "px";
    }
    for(var bon_id in active_bonuses)
    {
        active_bonuses[bon_id] = 0;
        const bonlem = document.getElementById(bon_id);
        bonlem.style.marginTop = -1*parseInt(bonlem.style.height) + "px";
    }
    free_bonuses = [];
    free_missiles = [];
    for(var i = 0;i < created_bonuses; i++)
        free_bonuses.push(i + "b");
    for(var i = 0;i < created_missiles; i++)
        free_missiles.push(i + "m");
    bonus_dict = {};
    missile_dict = {};
    missile_active = {};
    active_bonuses = {};
    mis_move_speed = 19;
}
function check_ad()
{
    bridge.send('VKWebAppCheckNativeAds', { ad_format: 'interstitial' })
    .then((data) => {
    if (data.result) {
      // Предзагруженная реклама есть.
      // Теперь можно создать кнопку
      // "Посмотрите рекламу".   
      // ...
            
    } else {
        if(mobile_mode == 0)
        {
            const adlem = document.getElementById("adWarning");
            adlem.style.display = "block";
        }
       // alert("Пожалуйста, выключите блокировщик рекламы. Я так не могу работать :(");
    }
     })
    .catch((error) => { alert("здесь должна быть какая-то ошибка"); /* Ошибка */  });
}
function show_ad()
{
    check_ad();
    bridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' })
    .then((data) => {
    if (data.result)
        console.log('Реклама показана');
    else
        alert('Ошибка при показе');
    })
    .catch((error) => { alert(2); /* Ошибка */ });
}

function move_bonuses()
{
    if(game_status == 1)
    {
        const gf = document.getElementById("gameField");
        var gf_h = parseInt(gf.style.height);
        for(var key in active_bonuses)
        {
            if(active_bonuses[key] == 1)
            {
                const bonlem = document.getElementById(key);
                var mt = parseInt(bonlem.style.marginTop);
                var by1 = parseInt(gf.style.height) - mt;
                var bx1 = parseInt(bonlem.style.marginLeft);
                var by2 = by1 - parseInt(bonlem.style.height);
                var bx2 = bx1 + parseInt(bonlem.style.width);
            
                if(bx1 >= x1 && bx1 <= x2 && by2 >= y1 && by2 <= y2 || 
                    bx2 >= x1 && bx2 <= x2 && by2 >= y1 && by2 <= y2)
                {
                    //alert([bx1,x1,])
                    const bb = document.getElementById("bonusCounter");
                    bonus_counter += 1;
                    bb.innerText = bonus_counter;
                    active_bonuses[key] = 0;
                    bonlem.style.marginTop = -1* parseInt(bonlem.style.height) + "px";
                    free_bonuses.push(key);
                    clearInterval(bonus_dict[key]);
                }
                else if( mt + bonus_step <= gf_h)
                {
                    bonlem.style.marginTop = mt + bonus_step + "px";
                }   
                else if(mt < gf_h)
                {
                    bonlem.style.marginTop = gf_h + "px";
                } 
                else if(mt == gf_h)
                {
                    clearInterval(bonus_dict[key]);
                    active_bonuses[key] = 0;
                    bonlem.style.marginTop = -1*parseInt(bonlem.style.height) + "px";
                    free_bonuses.push(key);
                    if(regime == "peaceful")
                    {
                        const lifes = document.getElementById("lifesCounter");
                        player_lifes -= 1;
                        lifes.innerText = "x" + player_lifes;
                        if(player_lifes <= 0)
                        {
                            game_status = 0;
                            display_lose_bar();
                        }
                    }
                }
            }
        }
        
    }

}