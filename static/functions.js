function UserValidation1(e)
{
    var nameRegex = /^[a-zA-Zа-яА-Я0-9 ]+$/;
    target.value = target.value.replace(/^[^a-zA-Zа-яА-Я0-9 ]+$/g, '');
    var validUsername = e.target.value.match(nameRegex);
    if(validUsername == null){
        alert("Имя пользователя введено неверно.");
        document.frm.firstName.focus();
        return false;
    }
    return true;
}

function ResetIndex()
{
    window.location.reload();

}

function DeleteInfoDiv()
{
    let item = document.getElementById('checked_result_box_id');
    item.parentNode.removeChild(item);
}

function BackButtonToCheckButton()
{

}

function CreateInputDiv()
{
    let parent = document.getElementById('border_nice_id');
    let infoLabel = document.createElement('label');
    
    if(isUserExist)
    {
        infoLabel.appendChild(document.createTextNode("Пользователь " + userName + " есть."));
        infoLabel.classList.add("checked_result_label_positive");
    }
    else
    {
        infoLabel.appendChild(document.createTextNode("Пользователя " + userName + " нет."));
        infoLabel.classList.add("checked_result_label_negative");
    }

    let wrapDiv = document.createElement('div');
    wrapDiv.classList.add("checked_result_box");
    wrapDiv.appendChild(infoLabel);

    parent.lastChild.after(wrapDiv);
}

function InfoDivToInputDiv()
{
    DeleteInfoDiv();
    CreateInputDiv();
}

function IsUserExist(userName)
{
    if(userName.length==3)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function DeleteInputNode()
{
    let item = document.getElementById('input_box_id');
    item.parentNode.removeChild(item);
}

function DeleteCheckButton()
{
    let parent = document.getElementById('action_butt_id');
    let child = document.getElementById('action_butt_text_id'); 
    parent.removeChild(child);
}

function CreateBackButton()
{
    let parent = document.getElementById('action_butt_id');
    let button = document.createElement('p');
    let сontent = document.createTextNode("Назад");

    button.classList.add("butt");
    button.appendChild(сontent);
    button.onclick = ResetIndex;

    parent.lastChild.after(button);
}

function CheckButtonToBackButton()
{
    DeleteCheckButton();
    CreateBackButton();
}


function CreateInfoDiv(userName, isUserExist)
{
    let parent = document.getElementById('border_nice_id');
    let infoLabel = document.createElement('label');
    
    if(isUserExist)
    {
        infoLabel.appendChild(document.createTextNode("Пользователь " + userName + " есть."));
        infoLabel.classList.add("checked_result_label_positive");
    }
    else
    {
        infoLabel.appendChild(document.createTextNode("Пользователя " + userName + " нет."));
        infoLabel.classList.add("checked_result_label_negative");
    }

    let wrapDiv = document.createElement('div');
    wrapDiv.classList.add("checked_result_box");
    wrapDiv.id = 'checked_result_box_id';
    wrapDiv.appendChild(infoLabel);

    parent.lastChild.after(wrapDiv);
}

function ShowResult(userName,isUserExist)
{
    DeleteInputNode();
    CreateInfoDiv(userName,isUserExist);
    CheckButtonToBackButton();
}


function CheckUser()
{
    let userName = document.getElementById("user_name_input");
    if (userName == null || userName.value == "")
    {
        alert("Пустое имя пользователя.");
        exit;
    }

    ShowResult(userName.value,IsUserExist(userName.value))
}