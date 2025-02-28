// Global variable to track if user has been verified
let userVerified = false;

async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    const chatBox = document.getElementById('chat-box');

    if (!userInput) return;  // Prevent sending empty messages

    // Check if user is already verified or needs verification
    if (!userVerified) {
        const recaptchaResponse = grecaptcha.getResponse();
        
        if (!recaptchaResponse) {
            // Display error message in chat
            const errorMessage = document.createElement('div');
            errorMessage.className = 'system-message';
            errorMessage.textContent = "Please complete the CAPTCHA verification.";
            chatBox.appendChild(errorMessage);
            return;
        } else {
            // Mark user as verified
            userVerified = true;
            
            // Optionally hide the reCAPTCHA after verification
            document.getElementById('recaptcha').style.display = 'none';
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'system-message success';
            successMessage.textContent = "Verification successful! You can now chat freely.";
            chatBox.appendChild(successMessage);
        }
    }

    // Display user message
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    // Clear input field
    document.getElementById('user-input').value = '';

    try {
        // If user is verified, we still need to send the last valid reCAPTCHA response
        // or for subsequent messages, we can send a flag indicating prior verification
        let requestBody = { prompt: userInput };
        
        if (userVerified) {
            requestBody.user_verified = true;
            // You might also want to add a session token or the last valid reCAPTCHA response
            if (grecaptcha.getResponse()) {
                requestBody.recaptcha_response = grecaptcha.getResponse();
            }
        }

        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        console.log("Server response:", data);

        // Display AI response
        const aiResponse = document.createElement('div');
        aiResponse.className = 'ai-response';
        aiResponse.textContent = data.response;
        chatBox.appendChild(aiResponse);

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error("Error:", error);
        
        // Display error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'system-message';
        errorMessage.textContent = "An error occurred. Please try again.";
        chatBox.appendChild(errorMessage);
    }
}

// Add enter key functionality
document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });
});