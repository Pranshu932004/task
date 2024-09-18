 // Toggle Theme
 function toggleTheme() {
    const currentTheme = document.body.classList.toggle('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
}
document.body.classList.add(localStorage.getItem('theme') || 'light');

// SPA Navigation
function navigate(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
}

// Carousel/Slider functionality
let currentIndex = 0;
function nextSlide() {
    const slides = document.getElementById('slides');
    const totalSlides = slides.children.length;
    currentIndex = (currentIndex + 1) % totalSlides;
    slides.style.transform = `translateX(${-currentIndex * 300}px)`; // Adjust for image width
}

// Form Validation
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if (!name || !email) {
        document.getElementById('error').textContent = 'All fields are required';
    } else {
        document.getElementById('error').textContent = '';
        console.log('Form submitted:', { name, email });
    }
});

// Fetch Data from JSONPlaceholder
async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    const list = document.getElementById('dataList');
    data.slice(0, 5).forEach(post => {
        const item = document.createElement('li');
        item.textContent = post.title;
        list.appendChild(item);
    });
}
fetchData();

// Capitalize Sentence
function capitalizeWords(sentence) {
    return sentence.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}
const sentence = 'hello world from the javascript tasks';
document.getElementById('capitalizedResult').textContent = capitalizeWords(sentence);



document.getElementById('squareButton').addEventListener('click', () => {
    const numberToSquare = parseFloat(document.getElementById('numberInput').value);
    if (!isNaN(numberToSquare)) {
        squareAfterDelay(numberToSquare, (result) => {
            document.getElementById('result').innerText = `The square of ${numberToSquare} is ${result}`;
        });
    } else {
        document.getElementById('result').innerText = 'Please enter a valid number.';
    }
});

// Square a number after delay (using async/await)
async function squareNumber(num) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(num * num);
        }, 1000);  // 1-second delay
    });
}

// Event listener for squaring a number
document.getElementById('squareButton').addEventListener('click', async function() {
    const number = document.getElementById('numberInputSquare').value;
    const result = await squareNumber(number);  // Awaiting the result
    document.getElementById('squareResult').textContent = `Square: ${result}`;
});

// Curry function implementation
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);  // If enough arguments are passed, invoke the original function
        } else {
            return function(...nextArgs) {
                return curried(...args, ...nextArgs);  // Collect arguments recursively
            };
        }
    };
}

// Example function for currying: adding three numbers
function add(a, b, c) {
    return a + b + c;
}

// Curried version of the add function
const curriedAdd = curry(add);

// Event listener for curried function
document.getElementById('addButtonCurried').addEventListener('click', function() {
    const firstNumber = parseInt(document.getElementById('firstNumberCurried').value);
    const secondNumber = parseInt(document.getElementById('secondNumberCurried').value);
    const thirdNumber = parseInt(document.getElementById('thirdNumberCurried').value);
    const result = curriedAdd(firstNumber)(secondNumber)(thirdNumber);  // Currying in action
    document.getElementById('curriedResult').textContent = `Sum: ${result}`;
});

// Compose Function Example
document.getElementById('composeButton').addEventListener('click', function() {
    const number = parseInt(document.getElementById('numberInputCompose').value);
    const result = compose(square, double)(number);
    document.getElementById('composeResult').textContent = `Result: ${result}`;
});

const compose = (f, g) => x => f(g(x));
const square = x => x * x;
const double = x => x * 2;

// Flatten Nested Array Example
document.getElementById('flattenButton').addEventListener('click', function() {
    const arrayInput = document.getElementById('arrayInput').value;
    const nestedArray = JSON.parse(arrayInput);
    const flattenedArray = flatten(nestedArray);
    document.getElementById('flattenResult').textContent = `Flattened Array: ${JSON.stringify(flattenedArray)}`;
});

function flatten(arr) {
    return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
}

// Calculate Area of a Circle
document.getElementById('calculateButton').addEventListener('click', function() {
    const radius = parseFloat(document.getElementById('radiusInput').value);
    const area = Math.PI * radius * radius;
    document.getElementById('areaResult').textContent = `Area: ${area.toFixed(2)}`;
});

// Higher-order function to log input and output
function logInputOutput(fn) {
    return function(...args) {
        console.log(`Input: ${args}`);
        const result = fn(...args);
        console.log(`Output: ${result}`);
        return result;
    };
}

// Simple add function
function addNumbers(a, b) {
    return a + b;
}

// Wrap the `addNumbers` function using the higher-order function
const loggedAddNumbers = logInputOutput(addNumbers);

// Event listener for the log input/output example
document.getElementById('logButton').addEventListener('click', function() {
    const firstNumber = parseInt(document.getElementById('firstNumberLog').value);
    const secondNumber = parseInt(document.getElementById('secondNumberLog').value);
    const result = loggedAddNumbers(firstNumber, secondNumber);  // Uses logged version
    document.getElementById('logResult').textContent = `Sum: ${result}`;
});

// Extract First and Last Name
document.getElementById('extractButton').addEventListener('click', function() {
    const fullName = document.getElementById('userNameInput').value.split(' ');
    const firstName = fullName[0];
    const lastName = fullName[fullName.length - 1];
    document.getElementById('nameResult').textContent = `First Name: ${firstName}, Last Name: ${lastName}`;
});

// Add Element to Array Example
let array = [1, 2, 3];
document.getElementById('originalArrayDisplay').textContent = `Original Array: ${JSON.stringify(array)}`;

document.getElementById('addElementButton').addEventListener('click', function() {
    const element = document.getElementById('elementInput').value;
    array.push(element);
    document.getElementById('resultArrayDisplay').textContent = `Updated Array: ${JSON.stringify(array)}`;
});

 
//  Generate a navigation menu from an array of page names
function generateMenu(pageNames) {
    const nav = document.createElement('nav');
    pageNames.forEach(page => {
        const link = document.createElement('a');
        link.href = `javascript:void(0);`;
        link.onclick = () => navigate(page.toLowerCase());
        link.textContent = page;
        nav.appendChild(link);
    });
    document.body.prepend(nav);
}


