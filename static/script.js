const sendForm = document.getElementById('SendForm');

sendForm.addEventListener('submit', function (e) { /* !!! ЭТА ФУН. ОБРАБ. СОБЫТИЕ SUBMIT*/

    e.preventDefault(); /*//!!! ОЧЕНЬ ВАЖНАЯ ИНСТРУКЦИЯ - "НЕ ПЕРЕЗАГРУЖАЙ СТРАНИЦУ!"*/
    
    let userName = document.getElementById("user_name_input");
    if (userName == null || userName.value == "")
    {
        alert("Пустое имя пользователя.");
        exit;
    }

    const formData = new FormData(sendForm); /*formData - объект хранящий данные формы*/

    let user_name_input_let = document.getElementById('user_name_input').value;

    let body = {
        user_name: user_name_input_let,
      };

    let json_body = JSON.stringify(body);
       
    fetch('/', {

        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: json_body

    }).then(function (response) {

        
        console.log(response);
        return response.text();

    }).then(function (text) {

        //let resp = JSON.parse(text);
        console.log(text);
        let resp = JSON.parse(text);  
        //alert("Готово");
        ShowResult(user_name_input_let,resp.isUserExist)
        return resp.isUserExist;
        //return resp.isUserExist;

    }).catch(function (err) {
        console.error(err);
    });

});


function clear_value(obj_id, event) {
    code = (event.charCode) ? event.charCode : event.keyCode;
    if (code != 9 && code != 16) {
        document.getElementById(obj_id).value = '';
    }
}


function format_name(e) {

    var target = e.target || e.srcElement;
    //target.value = target.value.replace(/^[a-zA-Zа-яА-Я0-9 ]+$/g, '');
    target.value = target.value.replace(/(?:[\/\\\[\]\:\|\<\>\+\=\;\,\?\*\%])/g, '');//

    var cursorPos = get_cursor_position(target);
    if (cursorPos == -1) {
        cursorPos = 0;
    }
    var deltaPos = 0;

    var lengthBefore = target.value.length;
    //target.value = target.value.replace(/\s+/g, '').replace(/\s+$/, '');
    // target.value = format_num(target.value);
    // if (!deltaPos && (target.value.length - lengthBefore) > 0) {
    //     deltaPos = target.value.length - lengthBefore;
    // }
    // if (!deltaPos && target.value[cursorPos + deltaPos] == ' ' && target.value[cursorPos + deltaPos - 1] == ' ') {
    //     deltaPos += 2;
    // }
    set_cursor_position(target, cursorPos + deltaPos);


    return true;
}


function countSymbSting(Str, Sym) {

    let amo = (Str.split(Sym).length - 1);

    return amo;

}



function get_cursor_position(inputEl) {
    if (document.selection && document.selection.createRange) {
        var range = document.selection.createRange().duplicate();
        if (range.parentElement() == inputEl) {
            range.moveStart('textedit', -1);
            return range.text.length;
        }
    } else if (inputEl.selectionEnd) {
        return inputEl.selectionEnd;
    } else
        return -1;
}


function set_cursor_position(inputEl, position) {
    if (inputEl.setSelectionRange) {
        inputEl.focus();
        inputEl.setSelectionRange(position, position);
    } else if (inputEl.createTextRange) {
        var range = inputEl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', position);
        range.moveStart('character', position);
        range.select();
    }
}
