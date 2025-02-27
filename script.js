 // Game state variables
 let score = 0;
 let timeLeft = 30;
 let timer;
 let flippedCards = [];
 let matchedPairs = 0;
 let canFlip = true;

 // Category items
 const categories = {
     fruits: ['🍎', '🍌', '🍇', '🍊', '🍓', '🍐', '🥝', '🍍'],
     emojis: ['😀', '😍', '🎮', '🎸', '🌟', '🎨', '🎭', '🎪'],
     animals: ['🐶', '🐱', '🐼', '🦁', '🐘', '🦒', '🦊', '🐧'],
     planets: ['🌎', '🌍', '🌏', '⭐', '🌙', '☄️', '🌠', '🌞'],
     flags: ['🏁', '🚩', '🎌', '🏴', '🏳️', '🏳️‍🌈', '🏴‍☠️', '⚐']
 };

 function startGame(category) {
     // Reset game state
     score = 0;
     timeLeft = 30;
     matchedPairs = 0;
     flippedCards = [];
     canFlip = true;
     document.getElementById('score').textContent = score;
     
     // Create and shuffle cards
     const items = categories[category];
     const cardPairs = [...items, ...items];
     const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);
     
     // Create card grid
     const cardGrid = document.getElementById('cardGrid');
     cardGrid.innerHTML = '';
     shuffledCards.forEach((item, index) => {
         const card = document.createElement('div');
         card.classList.add('card');
         card.style.width = '100%';
         card.style.aspectRatio = '1';
         card.style.backgroundColor = '#fff';
         card.style.borderRadius = '10px';
         card.style.cursor = 'pointer';
         card.style.display = 'flex';
         card.style.justifyContent = 'center';
         card.style.alignItems = 'center';
         card.style.fontSize = '2rem';
         card.style.transform = 'rotateY(180deg)';
         card.style.transition = 'transform 0.3s';
         
         card.dataset.value = item;
         card.dataset.index = index;
         card.addEventListener('click', () => handleCardClick(card));
         cardGrid.appendChild(card);
     });

     // Start timer
     startTimer();
 }

 function handleCardClick(card) {
     if (!canFlip || flippedCards.includes(card) || card.classList.contains('matched')) {
         return;
     }

     // Flip card
     card.style.transform = 'rotateY(0deg)';
     card.textContent = card.dataset.value;
     flippedCards.push(card);

     if (flippedCards.length === 2) {
         canFlip = false;
         checkMatch();
     }
 }

 function checkMatch() {
     const [card1, card2] = flippedCards;
     const match = card1.dataset.value === card2.dataset.value;

     if (match) {
         card1.classList.add('matched');
         card2.classList.add('matched');
         score += 10;
         matchedPairs++;
         document.getElementById('score').textContent = score;

         if (matchedPairs === 8) {
             endGame(true);
         }
     } else {
         setTimeout(() => {
             card1.style.transform = 'rotateY(180deg)';
             card2.style.transform = 'rotateY(180deg)';
             card1.textContent = '';
             card2.textContent = '';
         }, 1000);
     }

     setTimeout(() => {
         flippedCards = [];
         canFlip = true;
     }, 1000);
 }

 function startTimer() {
     clearInterval(timer);
     timer = setInterval(() => {
         timeLeft--;
         document.getElementById('timer').textContent = timeLeft;
         if (timeLeft === 0) {
             endGame(false);
         }
     }, 1000);
 }

 function endGame(isWin) {
     clearInterval(timer);
     canFlip = false;
     setTimeout(() => {
         alert(isWin ? `Congratulations! Your score: ${score}` : `Game Over! Your score: ${score}`);
         document.querySelector('.landing-page').style.display = 'block';
         document.querySelector('.game-container').style.display = 'none';
     }, 500);
 }

 // Event listeners
 document.addEventListener('DOMContentLoaded', function() {
     const categoryButtons = document.querySelectorAll('.category-btn');
     categoryButtons.forEach(button => {
         button.addEventListener('click', () => {
             const category = button.dataset.category;
             document.querySelector('.landing-page').style.display = 'none';
             document.querySelector('.game-container').style.display = 'block';
             startGame(category);
         });
     });
 });