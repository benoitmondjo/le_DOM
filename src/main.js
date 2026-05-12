function createAndStyleElement(tag, className = '', content = ''){
  
  const element = document.createElement(tag)
  if(className) element.className = className;
  if(content) element.innerHTML = content;

  return element;

}

function showSection(section){

  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'))
  section.classList.add('active')
}

async function fetchData(){
  const dataContainer = document.querySelector('.data-container');
  dataContainer.innerHTML = "";

  const loadingElement = createAndStyleElement('div', 'loading', 'chargement en cours...');
  dataContainer.append(loadingElement)

  try{
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await res.json();

     setTimeout(()=>{
      dataContainer.removeChild(loadingElement);
      data.slice(0, 5).forEach(item => {
        const title = createAndStyleElement("h2", '', item.title);
        const body = createAndStyleElement("p", '', item.body)
      
        dataContainer.appendChild(title)
        dataContainer.appendChild(body)
      })
     }, 600)
  }
  catch(err){
    dataContainer.removeChild(loadingElement);
    dataContainer.textContent = " Une erreur s'est produite. Veuillez reesseyez plutard."
  }
}

function setupCounter(element){
  let counter = 0;
  const setCounter = (count)=>{
    counter = count;
    element.innerHTML = `<button>${count}</button>`
  }
  element.addEventListener('click', ()=> setCounter(counter+1));
  setCounter(0)
}

function closeSubMenu(){
  const submenu = document.querySelector('.sub-menu');
  if(submenu.classList.contains('active')){
    submenu.classList.remove('active')
  }
}

function createPage(){
  const app =  document.getElementById("app");

  const nav = createAndStyleElement("nav");
  const homeLink = createAndStyleElement("a", '', 'Home');
  const aboutLink = createAndStyleElement("a", '','A propos');
  const fetchDataLink = createAndStyleElement("a", '', 'Fetch');
  const networkLink = createAndStyleElement("a", '', 'Reseaux');

  const mainContent = createAndStyleElement("div",  'main-content');
  const footer = createAndStyleElement("footer", '', `<p>&copy 2026 JAVASCRIPT DOM, Tous droits reserves. </p> <p> <a href="#" target="_blank">Twitter X</a>|
	<a href="#" target="_blank">Facebbok</a>|
	<a href="#" target="_blank">Linkedine</a> </p>`);

  const homeSection = createAndStyleElement("div", 'section active',
    `<h2>Bienvebu sur JS DOM</h2> <p>Cliquez le button pour augmenter le compteur</p> <div id="counter" class="counter"></div>`
  )

  const aboutSection = createAndStyleElement('div', 'section', `Page entierement cree en JS.`)

  const dataSection = createAndStyleElement('div', 'section data-container')

  nav.append(homeLink)
  nav.append(aboutLink)
  nav.append(fetchDataLink)
  nav.append(networkLink)
  app.append(nav)

  const submenu = createAndStyleElement('div', 'sub-menu', `<a href="#" target="_blank">Twitter X</a>  <a href="#" target="_blank">Facebbok</a> <a href="#" target="_blank">Linkedine</a>`)
  nav.append(submenu);
  document.addEventListener('click', (e)=>{
    if(!nav.contains(e.target)){
      submenu.classList.remove('active')
    }
  })

  app.append(mainContent)
  app.append(footer)

  mainContent.append(homeSection)
  mainContent.append(aboutSection)
  mainContent.append(dataSection)


  homeLink.addEventListener('click', ()=>{
      showSection(homeSection)
      closeSubMenu();
  })

  aboutLink.addEventListener('click', ()=>{
      showSection(aboutSection)
      closeSubMenu();
  })

  fetchDataLink.addEventListener('click', ()=>{
      showSection(dataSection);
      fetchData();
      closeSubMenu();
  })

  networkLink.addEventListener('click', (e)=>{
      e.stopPropagation();
      submenu.classList.toggle('active')
  })

  const counterElement = document.getElementById("counter")
  setupCounter(counterElement)

}

createPage();
