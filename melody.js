/*

2015.7.7
感情の起伏、心の移り変わりを波長にして、
それを音楽へと変換したい。
考えられるプロパティは以下

・高低、音階 noteNum
・強弱、音量 velocity
・間隔、リズム noteOffTime
・フレーズの繰り返し、（思い出し。）

苦難と、救い、そして未来を表現する
さて、それをどうコードにするのだろうか？

また、イベントは何にするか。

*/

/////////////////////////////// 変数
inlets = 3;
outlets = 3;

//var midi;
var tsk;
/////////////////////////////// 変数

function loadbang(){//setUP
    //midi = new Phone(120,60,140,1000);
    //tsk = new Task(midi.noteOff,midi);
}

function bang(){//draw
    //midi.noteOn();
    
    //メロディを作る
    var mel = new Melody();
    //メロディをプレイ
    mel.run();
}

/////////////////////////////// Phone Class

var Phone = function(statusByte,noteNum,velocity,noteOffTime){
    this.statusByte = statusByte;
    this.noteNum = noteNum;
    this.velocity = velocity;
    this.noteOffTime = noteOffTime;
    this.touch = true;
}

Phone.prototype.noteOn = function(){
    if(this.touch){
        outlet(2,this.statusByte);
        outlet(1,this.velocity);
        outlet(0,this.noteNum);
        this.touch = false;
        tsk.schedule(this.noteOffTime);
    }
}

Phone.prototype.noteOff = function(){
    outlet(2,this.statusByte);
    outlet(1,0);
    outlet(0,this.noteNum);
    this.touch = true;
}
/////////////////////////////// Phone Class

/////////////////////////////// Melody Class

var Melody = function(){
    this.array = new Array(10);
    for(i=0;i<this.array.length; i++){
        this.array[i] = new Phone(0,getRandomArbitary(0,128),getRandomArbitary(0,128),getRandomArbitary(190,1000));//ランダムで仮に引数を入れて実装してみる
    }
}

Melody.prototype.player = function(){
    var on = getRandomArbitary(0,9);
    //post(on);
    tsk = new Task(this.array[on].noteOff,this.array[on]);
    this.array[on].noteOn();
}

Melody.prototype.run = function(){
    this.player();
}
/////////////////////////////// Melody Class

function getRandomArbitary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}