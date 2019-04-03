document.getElementById("btn_send1").onclick = btn_pressed1;
document.getElementById("btn_send2").onclick = btn_pressed2;

getDate1();

getFireBaseRef();

function btn_pressed1() {
  var p_strMsg1 = document.getElementById("msg1").value;
  if (p_strMsg1 != null && p_strMsg1.length > 0) {
    var p_strMsg2 = "User1:" + p_strMsg1;
    var div = document.createElement("div");
    var p = document.createElement("p");
    var p_time = document.createElement("p");
    p_time.setAttribute('class', 'clearfix right2 time');
    p_time.innerHTML = getDate2();
    p.setAttribute('class', 'clearfix msg');
    p.style.position = "relative";
    p.style.animation = "example2 1s 1";
    p.innerText = p_strMsg1;
    p.style.padding = "15px";
    //div.appendChild(p);

    var div2 = document.createElement("div");
    var p2 = document.createElement("p");
    var p2_time = document.createElement("p");
    p2_time.setAttribute('class', 'clearfix left2 time');
    p2_time.innerHTML = getDate2();
    p2.setAttribute('class', 'clearfix other_user');
    p2.style.position = "relative";
    p2.style.animation = "example 1s 1";
    p2.innerText = p_strMsg2;
    p2.style.padding = "15px";
    //div2.appendChild(p2);

    var area_1 = document.getElementById("id_1");
    var area_2 = document.getElementById("id_2");

    area_1.appendChild(p);
    area_1.appendChild(p_time);
    area_2.appendChild(p2);
    area_2.appendChild(p2_time);
    area_1.scrollTop = area_1.scrollHeight;
    area_2.scrollTop = area_2.scrollHeight;
    document.getElementById("msg1").value = "";
    //document.getElementById("btn_send1").focus();
  } else {
    alert("Please enter something!!!");
  }
}

function btn_pressed2() {
  var p_strMsg1 = document.getElementById("msg2").value;
  db.push({msg:btoa(p_strMsg1)});
  if (p_strMsg1 != null && p_strMsg1.length > 0) {
    var p_strMsg2 = "User2:" + p_strMsg1;
    var div = document.createElement("div");
    var p = document.createElement("p");
    var p_time = document.createElement("p");
    p_time.setAttribute('class', 'clearfix right2 time');
    p_time.innerHTML = getDate2();
    p.setAttribute('class', ' clearfix msg');
    p.style.position = "relative";
    p.style.animation = "example2 1s 1";
    p.innerText = p_strMsg1;
    p.style.padding = "15px";
    div.appendChild(p);

    var div2 = document.createElement("div");
    var p2 = document.createElement("p");
    var p2_time = document.createElement("p");
    p2_time.setAttribute('class', 'clearfix left2 time');
    p2_time.innerHTML = getDate2();
    p2.setAttribute('class', 'clearfix other_user');
    p2.style.position = "relative";
    p2.style.animation = "example 1s 1";
    p2.innerText = p_strMsg2;
    p2.style.padding = "15px";
    //div2.appendChild(p2);

    var area_1 = document.getElementById("id_1");
    var area_2 = document.getElementById("id_2");

    area_1.appendChild(p2);
    area_1.appendChild(p2_time);
    area_2.appendChild(p);
    area_2.appendChild(p_time);
    area_1.scrollTop = area_1.scrollHeight;
    area_2.scrollTop = area_2.scrollHeight;
    document.getElementById("msg2").value = "";
  } else {
    alert("Please enter something!!!")
  }
}

function enter_pressed1(e) {
  if (e.which == 13 || e.keyCode == 13) {
    btn_pressed1();
    return false;
  }
  return true;
}

function enter_pressed2(e) {
  if (e.which == 13 || e.keyCode == 13) {
    btn_pressed2();
    return false;
  }
  return true;
}

function clear_chat1() {
  document.getElementById("id_1").innerHTML = '';
}

function clear_chat2() {
  document.getElementById("id_2").innerHTML = '';
}

function getDate1() {

  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var _date = new Date().toString().split(" ");
  var str = "Copyright @Krushna Sharma," + _date[2] + " " + _date[1] + " " + parseInt(_date[3]) % 100 + " " + _date[4];
  document.getElementById("copyright").innerText = str;
  console.log(str);
}

function getDate2() {

  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var _date = new Date().toString().split(" ");
  var str = _date[2] + " " + _date[1] + " " + parseInt(_date[3]) % 100 + " " + _date[4];
  return str;
}

function getFireBaseRef() {


   db = firebase.database().ref('/message');


  db.once('value', function(datasnapshot) {
    renderMessage(datasnapshot)
  });


  db.limitToLast(1).on('child_added', function(datasnapshot) {
    renderMessage(datasnapshot)
  });


}


function renderMessage(datasnapshot){

      //console.log(datasnapshot.val());
      var a = datasnapshot.val();
      console.log(a);
      const msgIds = Object.keys(a);
      var msgDiv = document.getElementById('database');
  
      msgIds.forEach(msgId => {
        const msgObj = a[msgId];
        console.log(msgObj);
        var div = document.createElement('div');
        div.setAttribute('class', 'round');
        if(typeof msgObj==="string"){
          div.innerText = msgObj;
        }else{
          div.innerText = msgObj.msg;
        }

       
        div.style.position = 'relative';
        div.style.animation = 'example 1s 1';
        msgDiv.appendChild(div);
      });
  
      msgDiv.scrollTop = msgDiv.scrollHeight;
}