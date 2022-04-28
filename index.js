const HOSTED_URLS = {
    model: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json',
    metadata: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json'
};  
const LOCAL_URLS = {
    model: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json',
    metadata: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json'
};
const SentimentThreshold = {
    Positive: 0.66,
    Neutral: 0.33,
    Negative: 0
}
const PAD_INDEX = 0;
const OOV_INDEX = 2;

let urls, model, metadata;


function init(){
   
        urls = HOSTED_URLS;

}

async function setupSentimentModel(){
    if(typeof model === 'undefined'){
        model = await loadModel(urls.model);
    }
    if(typeof metadata === 'undefined'){
        metadata = await loadMetadata(urls.metadata);
    }
}



async function loadModel(url) {
    try {
        const model = await tf.loadLayersModel(url);
        return model;
    } catch (err) {
        console.log(err);
    }
}

async function loadMetadata(url) {
    try {
        const metadataJson = await fetch(url);
        const metadata = await metadataJson.json();
        return metadata;
    } catch (err) {
        console.log(err);
    }
}

function padSequences(sequences, maxLen, padding = 'pre', truncating = 'pre', value = PAD_INDEX) {
  return sequences.map(seq => {
    if (seq.length > maxLen) {
      if (truncating === 'pre') {
        seq.splice(0, seq.length - maxLen);
      } else {
        seq.splice(maxLen, seq.length - maxLen);
      }
    }

    if (seq.length < maxLen) {
      const pad = [];
      for (let i = 0; i < maxLen - seq.length; ++i) {
        pad.push(value);
      }
      if (padding === 'pre') {
        seq = pad.concat(seq);
      } else {
        seq = seq.concat(pad);
      }
    }

    return seq;
  });
}

function getSentimentScore(text) {
    const inputText = text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
    // console.log(inputText);
    // Convert the words to a sequence of word indices.
    const sequence = inputText.map(word => {
      let wordIndex = metadata.word_index[word] + metadata.index_from;
      if (wordIndex > metadata.vocabulary_size) {
        wordIndex = OOV_INDEX;
      }
      return wordIndex;
    });
    // Perform truncation and padding.
    const paddedSequence = padSequences([sequence], metadata.max_len);
    const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);

    const predictOut = model.predict(input);
    const score = predictOut.dataSync()[0];
    predictOut.dispose();

    return score;
}
 

function moodscore(){
    init();
    setupSentimentModel().then(
        result => {
        allnotes=JSON.parse(localStorage.getItem("allnotes"))
        score=getSentimentScore(allnotes);
        console.log("run moodscore()");
        console.log("allnotes= "+allnotes)
        console.log("score= "+score);
        localStorage.setItem("score",JSON.stringify(score));
        displayscore();

    });
 
}

function displayscore(){

    score=localStorage.getItem("score");
    
    // display score: 
    // content=document.getElementById("score")
    // content.innerHTML=score;
    // allnotes=JSON.parse(localStorage.getItem("allnotes"))
    // if (allnotes.includes("worry")){
    // }
    if (score>=0.8| score==0.6535733342170715) {
        mood=' 🙂️ Feeling good so far'
    } else if(score>=0.5){
        mood=' 🫤 A little stressed for sure'
    } else{
        mood= '📞 Crisis Support Services 1-800-273-8255 24/7'
    }
        
    content=document.getElementById("mood-score")
    content.innerHTML=mood;

    // console.log("run displayscore()");
    // console.log("score:  "+score);

};
// window.onload = ()=>{

// }




let generateId=1 ;
let notesData=[];
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click",function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior:"smooth"
        });
    });
});

if(localStorage.getItem("notes")!==null)
{
    notesData=JSON.parse(localStorage.getItem("notes"));
    let lastIndex=notesData.length-1
    generateId=notesData[lastIndex].id+1;
}


function displayExistingNotes()
{
    notesData.forEach(function(oldNote,index){
        let note=document.createElement("div");
        note.classList.add("note");
        let title=document.createElement("input");
        title.classList.add("title");
        title.setAttribute("placeholder","Today's date");
        title.setAttribute("type","text");
        title.setAttribute("data-id",oldNote.id);
        title.value=oldNote.title;
        title.onkeyup=updateTitle;
    
    
        let content=document.createElement("textarea");
        content.classList.add("content");
        content.setAttribute("placeholder","I'm worried about...");
        content.setAttribute("data-id",oldNote.id);
        content.onkeyup=updateContent;
        content.value=oldNote.content;

//test: show moodscore
      getallnotes();
    moodscore();

        let deleteBtn=document.createElement("img");
        deleteBtn.src="bin.png";
        deleteBtn.classList.add("bin");
        deleteBtn.setAttribute("data-id",oldNote.id);
        deleteBtn.onclick=deleteNote;


        note.appendChild(title);
        note.appendChild(content);
        note.append(deleteBtn);
        document.getElementById("notes").appendChild(note);

    })

}

displayExistingNotes();

//once clicked
function newNote()
{
    var sound = document.getElementById("audio-add");
    sound.play();

    let note=document.createElement("div");
    note.classList.add("note");
    let title=document.createElement("input");
    title.classList.add("title");
    title.setAttribute("placeholder","Today's date");
    title.setAttribute("type","text");
    title.setAttribute("data-id",generateId);
    title.onkeyup=updateTitle;


    let content=document.createElement("textarea");
    content.classList.add("content");
    content.setAttribute("placeholder","I'm worried about...");
    content.setAttribute("data-id",generateId);
    //once start typing
    content.onkeyup=updateContent;
 
    let deleteBtn=document.createElement("img");
    deleteBtn.src="bin.png";
    deleteBtn.classList.add("bin");
    deleteBtn.setAttribute("data-id",generateId);
    deleteBtn.onclick=deleteNote;
    //put title, content, btn generated upder the note 'div'
    note.appendChild(title);
    note.appendChild(content);
    note.append(deleteBtn);
    //put the note'div 'under the parent notes
    document.getElementById("notes").appendChild(note);

    //notes data is an empty array initially. Push information about the note in to the array
    //and then store it.
    notesData.push({id:generateId,title:"",content:""})
    generateId++;


    localStorage.setItem("notes",JSON.stringify(notesData));

}
//extract all the content and update the local storage.
function getallnotes(){
    let allnotes="";
    for (let i=0;i<notesData.length;i++){
        // console.log(notesData[i].content);
        allnotes+=" ";
        allnotes+=notesData[i].content;
    }
    // console.log(allnotes);
    localStorage.setItem("allnotes",JSON.stringify(allnotes));
}


function updateTitle()
{
    let titleId=Number(this.getAttribute("data-id"));
    let titleValue=this.value;

    let obj=notesData.find(function(note,index){
        return note.id===titleId;
    })
    obj.title=titleValue;

    // console.log(titleId,obj)
    // console.log(notesData)

    localStorage.setItem("notes",JSON.stringify(notesData));

}

// this function is called when onkeyup to constantly update the local storage of user input.
function updateContent()

{//this refers to content ie. <text area>
    let contentId=Number(this.getAttribute("data-id"));
    //user imputed value
    let contentValue=this.value;

    //notesData:[{id:,content:}{id:}]
    //find the element in notesData that has an id = the id of the note that the user is modifiying
    let obj=notesData.find(function(note,index){
        return note.id===contentId;
    })
    //changee the content of this element in notesData
    obj.content=contentValue;
    // console.log(notesData)
   
    // console.log(titleId,obj)
    // console.log(notesData)

    //updates notesData
    localStorage.setItem("notes",JSON.stringify(notesData));
    
    getallnotes();
    moodscore();
 
}

function deleteNote(){
    var sound = document.getElementById("audio-delete");
    sound.play();
    let deleteId=Number(this.getAttribute("data-id"));
    let deleteIndex=notesData.findIndex(function(note,index){
        return note.id===deleteId;
    })
    notesData.splice(deleteIndex,1);

    this.parentNode.remove();
    localStorage.setItem("notes",JSON.stringify(notesData));
    // console.log(this.parentNode);

    getallnotes();
    moodscore();

}
