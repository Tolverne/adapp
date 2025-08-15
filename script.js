// Character state object
let character = {
    skinColor: '#fdbcb4',
    hairColor: '#8B4513',
    hairStyle: 'normal',
    eyeColor: '#333333',
    eyeStyle: 'normal',
    mouthColor: '#ff1493',
    mouthStyle: 'smile',
    topColor: '#FF6B6B',
    topStyle: 'shirt',
    bottomColor: '#4ECDC4',
    bottomStyle: 'pants',
    shoeColor: '#8B4513',
    shoeStyle: 'sneakers'
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateCharacter();
    
    // Add some initial sparkles
    setTimeout(() => {
        for(let i = 0; i < 10; i++) {
            setTimeout(() => createSparkle(), i * 200);
        }
    }, 1000);
});

function initializeEventListeners() {
    // Color picker event listeners
    document.getElementById('skinColor').addEventListener('input', function(e) {
        character.skinColor = e.target.value;
        updateCharacter();
        createSparkles(3);
    });

    document.getElementById('hairColor').addEventListener('input', function(e) {
        character.hairColor = e.target.value;
        updateCharacter();
        createSparkles(3);
    });

    document.getElementById('eyeColor').addEventListener('input', function(e) {
        character.eyeColor = e.target.value;
        updateCharacter();
        createSparkles(3);
    });

    document.getElementById('mouthColor').addEventListener('input', function(e) {
        character.mouthColor = e.target.value;
        updateCharacter();
        createSparkles(3);
    });

    document.getElementById('topColor').addEventListener('input', function(e) {
        character.topColor = e.target.value;
        updateCharacter();
        createSparkles(3);
    });

    document.getElementById('bottomColor').addEventListener('input', function(e) {
        character.bottomColor = e.target.value;
        updateCharacter();
        createSparkles(3);
    });

    document.getElementById('shoeColor').addEventListener('input', function(e) {
        character.shoeColor = e.target.value;
        updateCharacter();
        createSparkles(3);
    });

    // Style button handlers
    document.querySelectorAll('.style-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Handle theme buttons differently
            if (this.dataset.theme) {
                applyTheme(this.dataset.theme);
                return;
            }

            // Find the parent style-options container
            const styleOptions = this.closest('.style-options');
            const category = styleOptions.dataset.category;
            
            if (category) {
                // Remove selected class from all buttons in this category
                styleOptions.querySelectorAll('.style-btn').forEach(b => b.classList.remove('selected'));
                
                // Add selected class to clicked button
                this.classList.add('selected');
                
                // Update character property
                const style = this.dataset.style;
                character[category] = style;
                
                updateCharacter();
                createSparkles(3);
            }
        });
    });

    // Reset button handler
    document.getElementById('resetBtn').addEventListener('click', resetCharacter);
}

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerHTML = '✨';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    
    const sparklesContainer = document.getElementById('sparkles');
    if (sparklesContainer) {
        sparklesContainer.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 2000);
    }
}

function createSparkles(count) {
    for(let i = 0; i < count; i++) {
        setTimeout(() => createSparkle(), i * 100);
    }
}

// Create sparkles periodically
setInterval(createSparkle, 800);

function updateCharacter() {
    // Update skin color
    const head = document.getElementById('characterHead');
    const leftArm = document.getElementById('leftArm');
    const rightArm = document.getElementById('rightArm');
    
    if (head) head.style.background = character.skinColor;
    if (leftArm) leftArm.style.background = character.skinColor;
    if (rightArm) rightArm.style.background = character.skinColor;
    
    // Update hair
    const hair = document.getElementById('characterHair');
    if (hair) {
        hair.style.background = character.hairColor;
        hair.className = 'character-hair';
        
        if (character.hairStyle === 'bald') {
            hair.style.display = 'none';
        } else {
            hair.style.display = 'block';
            if (character.hairStyle === 'curly') {
                hair.classList.add('hair-curly');
            } else if (character.hairStyle === 'spiky') {
                hair.classList.add('hair-spiky');
            } else if (character.hairStyle === 'pigtails') {
                hair.classList.add('hair-pigtails');
            }
        }
    }
    
    // Update eyes
    const leftEye = document.getElementById('leftEye');
    const rightEye = document.getElementById('rightEye');
    const eyes = [leftEye, rightEye].filter(eye => eye);
    
    eyes.forEach((eye, index) => {
        eye.style.background = character.eyeColor;
        
        if (character.eyeStyle === 'big') {
            eye.style.width = '20px';
            eye.style.height = '20px';
            eye.style.borderRadius = '50%';
        } else if (character.eyeStyle === 'small') {
            eye.style.width = '10px';
            eye.style.height = '10px';
            eye.style.borderRadius = '50%';
        } else if (character.eyeStyle === 'wink' && index === 0) {
            eye.style.width = '15px';
            eye.style.height = '3px';
            eye.style.borderRadius = '0';
        } else {
            eye.style.width = '15px';
            eye.style.height = '15px';
            eye.style.borderRadius = '50%';
        }
    });
    
    // Update mouth
    const mouth = document.getElementById('characterMouth');
    if (mouth) {
        mouth.style.borderColor = character.mouthColor;
        
        if (character.mouthStyle === 'big-smile') {
            mouth.style.width = '30px';
            mouth.style.height = '15px';
            mouth.style.borderRadius = '0 0 20px 20px';
            mouth.style.borderTop = 'none';
        } else if (character.mouthStyle === 'surprised') {
            mouth.style.width = '15px';
            mouth.style.height = '15px';
            mouth.style.borderRadius = '50%';
            mouth.style.borderTop = '2px solid ' + character.mouthColor;
        } else if (character.mouthStyle === 'neutral') {
            mouth.style.width = '20px';
            mouth.style.height = '2px';
            mouth.style.borderRadius = '0';
            mouth.style.borderTop = '2px solid ' + character.mouthColor;
            mouth.style.borderBottom = '2px solid ' + character.mouthColor;
            mouth.style.borderLeft = 'none';
            mouth.style.borderRight = 'none';
        } else {
            mouth.style.width = '20px';
            mouth.style.height = '10px';
            mouth.style.borderRadius = '0 0 20px 20px';
            mouth.style.borderTop = 'none';
            mouth.style.borderLeft = '2px solid ' + character.mouthColor;
            mouth.style.borderRight = '2px solid ' + character.mouthColor;
            mouth.style.borderBottom = '2px solid ' + character.mouthColor;
        }
    }
    
    // Update top/body
    const body = document.getElementById('characterBody');
    if (body) {
        body.style.background = character.topColor;
        
        if (character.topStyle === 'dress') {
            body.style.width = '120px';
            body.style.height = '140px';
            body.style.borderRadius = '20px 20px 60px 60px';
        } else if (character.topStyle === 'hoodie') {
            body.style.width = '100px';
            body.style.height = '120px';
            body.style.borderRadius = '30px 30px 20px 20px';
        } else if (character.topStyle === 'tank') {
            body.style.width = '90px';
            body.style.height = '120px';
            body.style.borderRadius = '20px';
        } else {
            body.style.width = '100px';
            body.style.height = '120px';
            body.style.borderRadius = '20px';
        }
    }
    
    // Update bottom/legs
    const legs = document.getElementById('characterLegs');
    if (legs) {
        legs.style.background = character.bottomColor;
        
        if (character.bottomStyle === 'none' || character.topStyle === 'dress') {
            legs.style.display = 'none';
        } else {
            legs.style.display = 'block';
            if (character.bottomStyle === 'shorts') {
                legs.style.height = '60px';
                legs.style.borderRadius = '15px';
            } else if (character.bottomStyle === 'skirt') {
                legs.style.borderRadius = '15px 15px 40px 40px';
                legs.style.height = '80px';
            } else {
                legs.style.height = '100px';
                legs.style.borderRadius = '15px';
            }
        }
    }
    
    // Update shoes
    const shoes = document.getElementById('characterShoes');
    if (shoes) {
        shoes.style.background = character.shoeColor;
        shoes.style.border = '3px solid #333';
        
        if (character.shoeStyle === 'boots') {
            shoes.style.height = '40px';
            shoes.style.borderRadius = '15px';
        } else if (character.shoeStyle === 'sandals') {
            shoes.style.height = '15px';
            shoes.style.background = 'transparent';
            shoes.style.borderTop = '5px solid ' + character.shoeColor;
            shoes.style.borderBottom = '5px solid ' + character.shoeColor;
            shoes.style.borderLeft = 'none';
            shoes.style.borderRight = 'none';
        } else {
            shoes.style.height = '30px';
            shoes.style.borderRadius = '50px';
            shoes.style.background = character.shoeColor;
        }
    }
}

function applyTheme(theme) {
    if (theme === 'alien') {
        character.skinColor = '#90EE90';
        character.eyeColor = '#FF0000';
        character.eyeStyle = 'big';
        character.hairColor = '#800080';
        character.hairStyle = 'spiky';
        character.topColor = '#C0C0C0';
        character.bottomColor = '#696969';
        character.shoeColor = '#2F4F4F';
        character.mouthColor = '#00FF00';
    } else if (theme === 'robot') {
        character.skinColor = '#C0C0C0';
        character.eyeColor = '#00FFFF';
        character.eyeStyle = 'small';
        character.hairStyle = 'bald';
        character.topColor = '#708090';
        character.bottomColor = '#2F4F4F';
        character.shoeColor = '#696969';
        character.mouthColor = '#00FFFF';
        character.mouthStyle = 'neutral';
    } else if (theme === 'princess') {
        character.skinColor = '#FFE4E1';
        character.hairColor = '#FFD700';
        character.hairStyle = 'curly';
        character.eyeColor = '#87CEEB';
        character.eyeStyle = 'big';
        character.topColor = '#FF69B4';
        character.topStyle = 'dress';
        character.bottomColor = '#DA70D6';
        character.bottomStyle = 'none';
        character.shoeColor = '#FF69B4';
        character.shoeStyle = 'flats';
        character.mouthColor = '#FF1493';
        character.mouthStyle = 'smile';
    } else if (theme === 'superhero') {
        character.skinColor = '#DEB887';
        character.hairColor = '#000000';
        character.hairStyle = 'normal';
        character.eyeColor = '#0000FF';
        character.eyeStyle = 'normal';
        character.topColor = '#DC143C';
        character.topStyle = 'shirt';
        character.bottomColor = '#000080';
        character.bottomStyle = 'pants';
        character.shoeColor = '#DC143C';
        character.shoeStyle = 'boots';
        character.mouthColor = '#FF1493';
        character.mouthStyle = 'smile';
    }
    
    updateColorPickers();
    updateStyleButtons();
    updateCharacter();
    
    // Create lots of sparkles for theme change
    createSparkles(15);
}

function updateColorPickers() {
    const colorInputs = {
        'skinColor': character.skinColor,
        'hairColor': character.hairColor,
        'eyeColor': character.eyeColor,
        'mouthColor': character.mouthColor,
        'topColor': character.topColor,
        'bottomColor': character.bottomColor,
        'shoeColor': character.shoeColor
    };
    
    Object.keys(colorInputs).forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.value = colorInputs[id];
        }
    });
}

function updateStyleButtons() {
    // Reset all selections
    document.querySelectorAll('.style-btn').forEach(btn => {
        if (!btn.dataset.theme) {
            btn.classList.remove('selected');
        }
    });
    
    // Select appropriate buttons based on current character state
    const styleMapping = {
        'hairStyle': character.hairStyle,
        'eyeStyle': character.eyeStyle,
        'mouthStyle': character.mouthStyle,
        'topStyle': character.topStyle,
        'bottomStyle': character.bottomStyle,
        'shoeStyle': character.shoeStyle
    };
    
    Object.keys(styleMapping).forEach(category => {
        const styleOptions = document.querySelector(`[data-category="${category}"]`);
        if (styleOptions) {
            const targetBtn = styleOptions.querySelector(`[data-style="${styleMapping[category]}"]`);
            if (targetBtn) {
                targetBtn.classList.add('selected');
            }
        }
    });
}

function resetCharacter() {
    character = {
        skinColor: '#fdbcb4',
        hairColor: '#8B4513',
        hairStyle: 'normal',
        eyeColor: '#333333',
        eyeStyle: 'normal',
        mouthColor: '#ff1493',
        mouthStyle: 'smile',
        topColor: '#FF6B6B',
        topStyle: 'shirt',
        bottomColor: '#4ECDC4',
        bottomStyle: 'pants',
        shoeColor: '#8B4513',
        shoeStyle: 'sneakers'
    };
    
    updateColorPickers();
    updateStyleButtons();
    updateCharacter();
    
    // Create lots of sparkles for reset
    createSparkles(20);
}
