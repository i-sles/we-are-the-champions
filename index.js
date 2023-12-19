import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://solo-realtime-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsementList")

const inputFieldEl = document.getElementById("input-field")
const publishButtonEl = document.getElementById("publish-button")
const endorsementListEl = document.getElementById("endorsement-list")

publishButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(endorsementListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(endorsementListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearEndorsementListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToEndorsementListEl(currentItem)
        }    
    } else {
        endorsementListEl.innerHTML = "No items here... yet"
    }
})

function clearEndorsementListEl() {
    endorsementListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToEndorsementListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `endorsementList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    endorsementListEl.append(newEl)
}

