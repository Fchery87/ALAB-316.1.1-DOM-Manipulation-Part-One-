//+ DOM Manipulation Part 1: Getting Started ======= 
// Select and cache the <main> element in a variable named mainEl.
// Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
// Hint: Assign a string that uses the CSS var() function like this: 'var(--main-bg)'.
// Set the content of mainEl to <h1>DOM Manipulation</h1>. There are a variety of ways to do this; pick whichever one that you think works best in this situation.
// Add a class of flex-ctr to mainEl.
// Hint: Use the Element.classList API.

const mainEl = document.querySelector('main');

mainEl.style.backgroundColor = 'var(--main-bg)';

mainEl.innerHTML = '<h1>DOM Manipulation</h1>';

mainEl.classList.add('flex-ctr');

//+ DOM Manipulation Part 1: Creating a Menu Bar ======= 

// Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
// Set the height of the topMenuEl element to be 100%.
// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
// Add a class of flex-around to topMenuEl.

const topMenuEl = document.getElementById('top-menu');

topMenuEl.style.height = '100%';

topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';

topMenuEl.classList.add('flex-around');

// Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
// Set the height subMenuEl element to be "100%".
// Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
// Add the class of flex-around to the subMenuEl element.

//! DOM Manipulation Part 2: Creating the Submenu  =======

const subMenuEl = document.getElementById('sub-menu');

// subMenuEl.style.height = '100%';

subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';

// subMenuEl.classList.add('flex-around');

subMenuEl.style.position = 'absolute';

subMenuEl.style.top = '0';

//+ DOM Manipulation Part 1: Adding Menu Buttons ======= 

// Iterate over the entire menuLinks array and for each "link" object:
// Create an <a> element.
// On the new element, add an href attribute with its value set to the href property of the "link" object.
// Set the new element's content to the value of the text property of the "link" object.
// Append the new element to the topMenuEl element.

// Menu data structure
var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];
  
  menuLinks.forEach(link => {
    const menuLink = document.createElement('a');
    
    menuLink.href = link.href;
    
   menuLink.textContent = link.text;
    
    topMenuEl.appendChild(menuLink);
  });

  //! DOM Manipulation Part 2: Adding Menu Interaction  =======

  const topMenuLinks = topMenuEl.querySelectorAll('a');

topMenuEl.addEventListener('click', function(event) {
  event.preventDefault();
  
  if (!event.target.matches('a')) return;
  
  const clickedLink = event.target;
  
  topMenuLinks.forEach(link => {
    if (link === clickedLink) {
      link.classList.toggle('active');
    } else {
      link.classList.remove('active');
    }
  });

  //! DOM Manipulation Part 2: Adding Submenu Interaction  =======

  if (!clickedLink.classList.contains('active')) {
    subMenuEl.style.top = '0';
  } else {
    const linkIndex = Array.from(topMenuLinks).indexOf(clickedLink);
    const linkData = menuLinks[linkIndex];
    if (linkData.subLinks) {
      subMenuEl.style.top = '100%';
      buildSubmenu(linkData.subLinks);
    } else {
      subMenuEl.style.top = '0';
    }
  }
});

function buildSubmenu(subLinks) {
  subMenuEl.innerHTML = '';
  subLinks.forEach(link => {
    const submenuLink = document.createElement('a');
    submenuLink.href = link.href;
    submenuLink.textContent = link.text;
    subMenuEl.appendChild(submenuLink);
  });
}

subMenuEl.addEventListener('click', function(event) {
  event.preventDefault();
  
  if (!event.target.matches('a')) return;
  
  subMenuEl.style.top = '0';
  
  topMenuLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
});

  