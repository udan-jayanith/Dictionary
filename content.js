function render(array, word){

     function setValues(i){
          const information = array[i]

          const synonyms = document.querySelector('.synonyms')
          synonyms.innerHTML = `Synonyms: ${information.synonyms[0]}`

          const partOfSpeech = document.querySelector('.part-of-speech')
          partOfSpeech.innerHTML = information.partOfSpeech

          const definition = document.querySelector('.definition')
          definition.innerHTML = 'Definition: '+ information.definitions[0].definition

          const wordTitle = document.querySelector('.word-title')
          wordTitle.innerHTML = `Word: ${word}`

     }

     setValues(0)


     const backButton = document.querySelector('.back-button')
     const forwardButton = document.querySelector('.forward-button')
     const position = document.querySelector('.position')

     const items = array.length-1
     let currentPosition = 0

     backButton.addEventListener('click', ()=>{
          if(currentPosition == 0) currentPosition = items
          else currentPosition--

          setValues(currentPosition)
          position.innerHTML = currentPosition+1
     }) 

     forwardButton.addEventListener('click', ()=>{
          if(currentPosition == items) currentPosition = 0
          else currentPosition++

          setValues(currentPosition)
          position.innerHTML = currentPosition+1

     })
}

const GSR = document.querySelector('.WE0UJf')
if(GSR !== null) {
     const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

     let word = document.querySelector('.JgzqYd span')
     let finalWord = ' '
     
     if(!word){
          word = document.getElementById('APjFqb')
          let array = word.value.toLowerCase().split(' ')

          for(let i = 0; i<array.length; i++){
               if(array[i]=='meaning' &&
                  array[i+1]=='of' ||
                  array[i]=='definition' &&
                  array[i+1]=='of'
                 ) finalWord = array[i+2]
               else if(array.length == 2 &&
                  array[1]=='meaning'||
                  array[1]=='definition'
               ) finalWord = array[0]
               else finalWord = ' '
               
          }

     }else finalWord = word.innerText
     
     fetch(url + finalWord)
     .then(response => {
          return response.json()
     }).then(json => {

          let array = []

          for(let i = 0; i<json.length; i++){
               const respons = json[i].meanings

               for(let ind = 0; ind<respons.length; ind++){
                    array.push(respons[ind])
               }
          }

          function audio(){
               if(!json[0].phonetics[0]) return '#'
               else return json[0].phonetics[0].audio
          }


          GSR.innerHTML += 
          `
          <div class="word-definition">
               <h2 class="word-title">Word: Null</h2>
               
               <div class="word-details">

                    <span class="synonyms">Synonyms: Null</span>
                    <span class="part-of-speech">Null</span>

                    <div class="controls">
                    <button class="back-button"> < </button>
                    <span class="position">1</span>
                    <button class="forward-button"> > </button>
                    </div>
               
               </div>
               
               <p class="definition">Definition: Null</p>

               <audio controls class="audioControl">
                    <source src="${audio()}" class = "audioPlayer">
               </audio>

          </div>
          `

          render(array, finalWord)   

     }).catch(err =>{ console.log(err)})


}


const styles = 
`
.word-definition {
     border: 1px solid #ccc;
     padding: 20px;
     margin: 10px;
     background-color: #f9f9f9;
     max-width: 50%;
   }
   
   .word-definition h2 {
     font-size: 1.2em;
     color: #333;
   }
   
   .word-definition .b {
     display: flex;
     justify-content: space-between;
     margin-bottom: 10px;
   }
   
   .word-definition .part-of-speech,
   .word-definition .synonyms {
     font-size: 0.9em;
     color: #666;
   }

   .synonyms{
     margin-right: 14px;
   }
   
   .word-definition p {
     font-size: 1em;
     line-height: 1.5;
   }
   
   .word-definition .switch-buttons {
     display: flex;
     align-items: center;
   }
   
   .word-definition .switch-buttons button {
     background: none;
     border: none;
     cursor: pointer;
   }
   
   .word-definition .position {
     margin: 0 10px;
   }
   
   .controls{
     margin-left: 14px;
     button{
          background-color: transparent;
          border: 0px solid transparent;
          width: min-content;
     }

     button:hover{
          font-weight: 600;
     }
   }

   .word-details{
     display: flex;
   }
`

const styleSheet = document.createElement("style")
styleSheet.textContent = styles
document.head.appendChild(styleSheet)

