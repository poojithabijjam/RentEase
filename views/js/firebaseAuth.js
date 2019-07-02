
 function checkIfLoggedIn(){
    // user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged(function(user){
        if ( user ) {
            console.log( 'User signed in' )
            console.log( user )
            var photoURL = user.photoURL
            
            // document.getElementById('google-pic')
            //         .setAttribute('src', photoURL)            
           // do logged in stuff
            
        //     document.getElementById('Gsignin')
        //     .setAttribute('style', 'display: none; visibility: hidden')                    
        //     document.getElementById('signout')
        //     .setAttribute('style', 'display: inline-block; visibility: visible')  
         location.replace('homeScreen')
            
        } else {
            console.log( 'User not signed in.' )
         // do not logged in stuff
            // document.getElementById('Gsignin')
            // .setAttribute('style', 'display: inline-block; visibility: visible')
            // document.getElementById('signout')
            // .setAttribute('style', 'display: none; visibility: hidden')                
        }
    })

}
window.onload = function(){
    checkIfLoggedIn()
}
function signOut(){
    firebase.auth().signOut()
    
    document.getElementById('google-pic')
    .setAttribute('src', '')
    
    // checkIfLoggedIn()
}

function signInWithGoogle(){
 var googleAuthProvider = new firebase.auth.GoogleAuthProvider

firebase.auth().signInWithPopup(googleAuthProvider)
.then( function(data) {
 console.log(data)
 var photoURL = data.additionalUserInfo.profile.picture
 
 var idToken = data.credential.idToken
 localStorage.setItem('firebase-idToken', idToken)
 localStorage.setItem('google-photo', photoURL)
// var user = data.user
 // document.getElementById('google-pic')
 //         .setAttribute('src', photoURL)
 // var user = firebase.auth().currentUser        

 // document.getElementById('google-displayName')
 //        .setAttribute('value', user.displayName)
         
 checkIfLoggedIn()
})
.catch( function(error) {
 console.log(error)
 // checkIfLoggedIn()
})
}