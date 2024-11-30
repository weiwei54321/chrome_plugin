(function () {
    chrome.storage.sync.get(['aiEnabled'], function(result) {
      if (result.aiEnabled !== false) { 

    const chatBox = document.createElement('div');
    chatBox.id = 'chatBox';
    chatBox.style.display = 'none';  
    chatBox.innerHTML = `
        <h3>AI 聊天機器人</h3>
        <div id="chatMessages"></div>
        <input type="text" id="userInput" placeholder="輸入您的訊息..." />
        <button id="sendMessageButton">發送訊息</button>
        <button id="clearChatButton">清除聊天紀錄</button>
    `;
    document.body.appendChild(chatBox);

    const chatToggleButton = document.createElement('button');
    chatToggleButton.id = 'chatToggleButton';
    chatToggleButton.innerHTML = '💬';
    document.body.appendChild(chatToggleButton);

       chatToggleButton.addEventListener('click', () => {
        chatBox.style.display = chatBox.style.display === 'none' ? 'flex' : 'none';
    });

       loadChatHistory();

       document.getElementById('sendMessageButton').addEventListener('click', async function () {
        const userInput = document.getElementById('userInput').value;
        if (userInput.trim() === '') return;

               displayMessage(userInput, 'userMessage');

               saveMessageToLocalStorage(userInput, 'userMessage');

               document.getElementById('userInput').value = '';

               const aiResponse = await getAIResponse(userInput);
        displayMessage(aiResponse, 'aiMessage');

               saveMessageToLocalStorage(aiResponse, 'aiMessage');
    });

       document.getElementById('clearChatButton').addEventListener('click', function () {
        localStorage.removeItem('chatHistory');
        document.getElementById('chatMessages').innerHTML = '';
    });

                                              async function getAIResponse(userInput) {
        try {
            const response = await fetch(`https://api.allorigins.win/raw?url=https://s.c-power.top/apii/ai-api-98277498659042875394867329453438524907530.php?query=${encodeURIComponent(userInput)}`, {
                method: 'GET'
            });

            if (!response.ok) {
                console.error('Network response was not ok. Status:', response.status, response.statusText);
                return `無法連接到 AI，請稍後再試。錯誤碼: ${response.status}`;
            }

            const data = await response.text(); 
            return data || 'AI 回應錯誤，請稍後再試。';
        } catch (error) {
            console.error('Error fetching AI response:', error);
            return `無法連接到 AI，請稍後再試。錯誤信息: ${error.message}`;
        }
    }
                                                         
   
function displayMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);

       messageElement.innerHTML = marked.parse(message);
    document.getElementById('chatMessages').appendChild(messageElement);

       document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
}

       function saveMessageToLocalStorage(message, type) {
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        chatHistory.push({ message, type });
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }

       function loadChatHistory() {
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        chatHistory.forEach(item => {
            displayMessage(item.message, item.type);
        });
    }

       chatToggleButton.style.position = 'fixed';
    chatToggleButton.style.bottom = '20px';
    chatToggleButton.style.right = '20px';

    let isDragging = false;
    let offsetX, offsetY;

    chatToggleButton.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - chatToggleButton.getBoundingClientRect().left;
        offsetY = e.clientY - chatToggleButton.getBoundingClientRect().top;

        document.addEventListener('mousemove', onMouseMove);
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
    });

    function onMouseMove(event) {
        if (isDragging) {
            chatToggleButton.style.left = event.pageX - offsetX + 'px';
            chatToggleButton.style.top = event.pageY - offsetY + 'px';
        }
    }

    chatToggleButton.ondragstart = function() {
        return false;
    };
}
});
})();