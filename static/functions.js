let IsUserExistGlobal;

function ResetIndex()
{
    window.location.reload();
}

function DeleteInfoDiv()
{
    let item = document.getElementById('checked_result_box_id');
    item.parentNode.removeChild(item);
}

function sleep(milliseconds) 
{
    const date = Date.now();
    let currentDate = null;

    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
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