let userVerified = false; // global variable tracking if user has been verified

async function sendMessage() { // async function, loads script as soon as it’s available
    const userInput = document.getElementById('user-input').value.trim(); // gets value of element with user-input id, removes whitespace in value
    const chatBox = document.getElementById('chat-box'); // gets chat box element

    if (!userInput) return;  // if no user input, return nothing

    if (!userVerified) { // if user is not verified
        const recaptchaResponse = grecaptcha.getResponse(); // get reCAPTCHA response
        
        if (!recaptchaResponse) { // if no reCAPTCHA response
            const errorMessage = document.createElement('div'); // create element: <div></div>
            errorMessage.className = 'ai-response error-message'; // add class to element: <div class="ai-response error-message"></div>
            errorMessage.textContent = "Please complete the CAPTCHA verification."; // textContent treats text as plain text
            chatBox.appendChild(errorMessage); // append error message to chat box
            return;
        } else { // if reCAPTCHA response exists
            userVerified = true; // set userVerified to true
            document.getElementById('recaptcha').style.display = 'none'; // hide reCAPTCHA element after user is verified
        }
    }

    const userMessage = document.createElement('div'); // create element: <div></div>
    userMessage.className = 'user-message'; // add class to element: <div class="user-message"></div>
    userMessage.textContent = userInput; // textContent treats text as plain text
    chatBox.appendChild(userMessage); // append user message to chat box
    document.getElementById('user-input').value = ''; // clear user input field (return to empty)

    try { // try block to test for errors while code is executed 
        let requestBody = { prompt: userInput }; // create object with prompt key and userInput value
        
        if (userVerified) { // if user is verified
            requestBody.user_verified = true; // add user_verified = true to requestBody object
            if (grecaptcha.getResponse()) { // if reCAPTCHA response exists
                requestBody.recaptcha_response = grecaptcha.getResponse(); // add recaptcha_response to requestBody object
            }
        }

        const response = await fetch('/chat', { // fetch data from /chat route
            method: 'POST', // POST method
            headers: { 'Content-Type': 'application/json' }, // header type
            body: JSON.stringify(requestBody) // convert requestBody object to JSON string
        });

        const data = await response.json(); // convert response to JSON format
        console.log("Server response:", data);

        const aiResponse = document.createElement('div'); // create element: <div></div>
        aiResponse.className = 'ai-response'; // add class to element: <div class="ai-response"></div>
        aiResponse.textContent = data.response; // textContent treats text as plain text
        chatBox.appendChild(aiResponse); // append AI response to chat box

        chatBox.scrollTop = chatBox.scrollHeight; // scroll to bottom of chat box
    } catch (error) { // catch block to handle errors
        console.error("Error:", error);

        const errorMessage = document.createElement('div'); // create element: <div></div>
        errorMessage.className = 'ai-response error-message'; // add class to element: <div class="ai-response error-message"></div>
        errorMessage.textContent = "An error occurred. Please try again."; // textContent treats text as plain text
        chatBox.appendChild(errorMessage); // append error message to chat box
    }
}

// event listener; waits for DOM to load before executing function
document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box'); // gets chat box element
    const starterMessage = document.createElement('div'); // create element: <div></div>
    starterMessage.className = 'ai-response'; // add class to element: <div class="ai-response"></div>
    starterMessage.textContent = "Ask me anything about product management. For example: What is product sense? How can I surface the right problems to solve? How can I understand my users? How can I validate value? How can I write a product vision? How do I live in the future? How do I decide what to build? How do I change the status quo? How do I know if I've achieved product market fit? How do I know if I should pivot?"; // textContent treats text as plain text
    chatBox.appendChild(starterMessage); // append starter message to chat box

    const userInput = document.getElementById('user-input'); // gets user input element
    userInput.addEventListener('keypress', function(event) { // event listener for keypress
        if (event.key === 'Enter') { // if key is Enter
            event.preventDefault(); // prevent default action
            sendMessage(); // call sendMessage function
        }
    });
});