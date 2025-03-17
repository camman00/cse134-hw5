// Define the custom element <project-card>
class ProjectCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      const image = this.getAttribute('image') || '';
      const alt = this.getAttribute('alt') || '';
      const caption = this.getAttribute('caption') || '';
      const title = this.getAttribute('title') || '';
      const date = this.getAttribute('date') || '';
      const description = this.getAttribute('description') || '';
      const readMoreUrl = this.getAttribute('read-more-url') || '#';
  
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            margin: 1rem;
            border: 1px solid #333;
            border-radius: 4px;
            overflow: hidden;
            background-color: #fff;
            color: #000;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          .card {
            display: flex;
            flex-direction: column;
          }
          .card img {
            width: 100%;
            height: auto;
            object-fit: cover;
          }
          .card figcaption {
            padding: 0.5em;
            font-size: 1rem;
            text-align: center;
            background-color: #d32f2f;
            color: #fff;
          }
          .card-content {
            padding: 1rem;
          }
          .card-content header h3 {
            margin: 0;
            font-size: 1.25rem;
          }
          .card-content header p {
            margin: 0.5em 0;
            font-size: 0.9rem;
          }
          .card-content p {
            margin: 0.5em 0;
            font-size: 1rem;
          }
          .card-content a {
            color: #d32f2f;
            text-decoration: none;
            font-weight: bold;
          }
        </style>
        <div class="card">
          <img src="${image}" alt="${alt}">
          <figcaption>${caption}</figcaption>
          <div class="card-content">
            <header>
              <h3>${title}</h3>
              <p>Posted on <time datetime="${date}">${date}</time></p>
            </header>
            <p>${description}</p>
            <a href="${readMoreUrl}">Read More</a>
          </div>
        </div>
      `;
    }
  }
  
  customElements.define('project-card', ProjectCard);
  
  // URL for remote JSON data (if needed)
  const JSON_BIN_URL = 'https://api.jsonbin.io/v3/b/67d7ba848960c979a57312de';
  
  // Populate project cards from given data
  function populateCards(projects) {
    const container = document.querySelector('.blog-cards');
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
  
    projects.forEach(project => {
      const card = document.createElement('project-card');
      card.setAttribute('image', project.image);
      card.setAttribute('alt', project.alt);
      card.setAttribute('caption', project.caption);
      card.setAttribute('title', project.title);
      card.setAttribute('date', project.date);
      card.setAttribute('description', project.description);
      card.setAttribute('read-more-url', project.readMoreUrl);
      container.appendChild(card);
    });
  }
  
  // Load local data from localStorage
  function loadLocalData() {
    const stored = localStorage.getItem('projects');
    if (stored) {
      const projects = JSON.parse(stored);
      console.log('Loading from localStorage:', projects);
      populateCards(projects);
    } else {
      alert('No local data found. Please reload the page to initialize local data.');
    }
  }
  
  // Load remote data from JSONBin and update localStorage
  function loadRemoteData() {
    fetch(JSON_BIN_URL, {
        headers: {
            "X-Access-Key": "$2a$10$AeHLmmZcC1HuHq1aMJN/s.wZOYIDlLeoVO4.MCJtSjQLlw5.d/UBu"
        }
    })
      .then(response => response.json())
      .then(data => {
        const projects = data.record; // Extract 'record' from JSONBin response
        console.log('Loading from remote:', projects);
        
        // Update localStorage for future use
        localStorage.setItem('projects', JSON.stringify(projects));
  
        // Populate UI with the new data
        populateCards(projects);
      })
      .catch(error => {
        console.error('Error fetching remote data:', error);
        alert('Error fetching remote data.');
      });
  }
  
  // On document load, check localStorage; if missing, load from local projects.json
  document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem('projects')) {
      fetch('projects.json')
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('projects', JSON.stringify(data));
          console.log('Local projects loaded from projects.json and stored in localStorage.');
        })
        .catch(error => console.error('Error loading projects.json:', error));
    } else {
      console.log('LocalStorage already initialized with projects data.');
    }
  
    // Set up event listeners for the buttons
    const btnLocal = document.getElementById('load-local');
    const btnRemote = document.getElementById('load-remote');
  
    if (btnLocal) {
      btnLocal.addEventListener('click', loadLocalData);
    }
    if (btnRemote) {
      btnRemote.addEventListener('click', loadRemoteData);
    }
  });
  