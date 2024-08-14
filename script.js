// Initialize the LivePerson SDK with your credentials
lpTag.agentSDK.init({
    //accountId: 'your-account-id', // Replace with your LivePerson account ID
    //accessToken: 'your-access-token' // Replace with your LivePerson access token
});

document.getElementById('generateButton').addEventListener('click', function () {
    const numQuickReplies = document.getElementById('numQuickReplies').value;
    const quickRepliesContainer = document.getElementById('quickRepliesContainer');
    quickRepliesContainer.innerHTML = ''; // Clear previous inputs

    for (let i = 1; i <= numQuickReplies; i++) {
        const label = document.createElement('label');
        label.innerText = `Quick Reply ${i}:`;
        quickRepliesContainer.appendChild(label);

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `quickReply${i}`;
        input.placeholder = `Enter Quick Reply ${i}`;
        quickRepliesContainer.appendChild(input);
    }

    document.getElementById('sendButton').style.display = 'block';
});

document.getElementById('sendButton').addEventListener('click', function () {
    const conversationId = document.getElementById('conversationId').value;
    const numQuickReplies = document.getElementById('numQuickReplies').value;
    const quickReplies = [];

    for (let i = 1; i <= numQuickReplies; i++) {
        const text = document.getElementById(`quickReply${i}`).value;
        if (text) {
            quickReplies.push({ title: text, payload: `quick_reply_${i}` });
        }
    }

    if (conversationId && quickReplies.length > 0) {
        sendQuickReplies(conversationId, quickReplies);
    } else {
        alert('Please enter a Conversation ID and at least one quick reply.');
    }
});

function sendQuickReplies(conversationId, quickReplies) {
    try {
        const message = {
            type: 'structured',
            structured: {
                type: 'quick_replies',
                content: {
                    text: 'Choose an option:',
                    quick_replies: quickReplies
                }
            }
        };

        // Use the lpTag.agentSDK.cmdNames.writeSC command
        lpTag.agentSDK.cmdNames.writeSC({
            payload: message,
            conversationId: conversationId // Specifies which conversation to send the message to
        });

        alert('Quick replies sent successfully!');
    } catch (error) {
        console.error('Error sending quick replies:', error);
        alert('Error sending quick replies.');
    }
}
