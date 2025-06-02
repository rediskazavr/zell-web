document.addEventListener('DOMContentLoaded', function() {
    const textOutput = document.getElementById('text-output');
    const animateBtn = document.getElementById('animate-btn');
    
    const finalText = "5Kb8kLf9zgWQnogidDA76MzPL6TsZZY36hWXMssSzNydYXYB9KF";
    const animationChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/\\~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    animateBtn.addEventListener('click', function() {
        if (animateBtn.textContent === "Copy Token") {
            copyToClipboard();
        } else {
            startTextAnimation();
        }
    });
    
    function startTextAnimation() {
        animateBtn.disabled = true;
        animateBtn.textContent = "Waiting...";
        textOutput.textContent = '';
        
        let currentText = new Array(finalText.length).fill('');
        
        const animationInterval = setInterval(() => {
            let isAnimationComplete = true;
            
            for (let i = 0; i < finalText.length; i++) {
                if (currentText[i] !== finalText[i]) {
                    currentText[i] = getRandomChar();
                    isAnimationComplete = false;
                }
            }
            
            textOutput.textContent = currentText.join('');
            
            if (isAnimationComplete) {
                clearInterval(animationInterval);
                animateBtn.disabled = false;
                animateBtn.textContent = "Copy Token";
                return;
            }
            
            replaceRandomChars(currentText, 3);
        }, 50);
    }
    
    function getRandomChar() {
        return animationChars[Math.floor(Math.random() * animationChars.length)];
    }
    
    function replaceRandomChars(currentText, count) {
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * finalText.length);
            currentText[randomIndex] = finalText[randomIndex];
        }
    }
    
    function copyToClipboard() {
        navigator.clipboard.writeText(finalText)
            .then(() => {
                animateBtn.textContent = "Token copyed!";
                setTimeout(() => {
                    animateBtn.textContent = "Copy Again";
                }, 2000);
            })
            .catch(err => {
                console.error('Error: ', err);
                animateBtn.textContent = "Error";
            });
    }
});